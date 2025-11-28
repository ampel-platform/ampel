import { act, cleanup, render, screen } from '@testing-library/react';
import React, { Suspense } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.stubEnv('VITE_TEST_DATA_VIEW', 'prod');
vi.stubEnv('VITE_FAST_FAKE', '1');

const useLoaderDataMock = vi.fn(() => ({ case_id: 'CASE-123' }));

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useLoaderData: useLoaderDataMock,
  };
});

vi.mock('../pages/alerts/AmpelResultRepository', () => ({
  AmpelResultRepository: { getByMedicalCaseId: vi.fn() },
}));

vi.mock('../pages/alerts/MedicalCaseMetadataRepository', () => ({
  MedicalCaseMetadataRepository: { getByMedicalCaseId: vi.fn() },
}));

const { default: PatientAlertsPageController } =
  await import('../pages/alerts/PatientAlertsPageController');
const { AmpelResultRepository } = await import('../pages/alerts/AmpelResultRepository');
const { MedicalCaseMetadataRepository } =
  await import('../pages/alerts/MedicalCaseMetadataRepository');
const buildAlertsSample = (caseId: string) => ({
  medicalCaseId: caseId,
  scoringSystems: [
    {
      scoringSystemName: 'Probe',
      scoringSystemVersion: '1.0',
      results: [
        {
          status: 'red' as const,
          severity: 'hoch',
          severityComment: 'Achtung',
          analyteName: 'Na',
          analyteValue: 1,
          analyteValueUnit: 'mmol/l',
          analyteMeasuringTime: new Date('2025-01-01T00:00:00Z').toISOString(),
          resultCreationTime: new Date('2025-01-01T00:05:00Z').toISOString(),
          metaInformation: null,
        },
      ],
    },
  ],
});

const buildMetadataSample = (caseId: string) => ({
  id: caseId,
  patient: {
    id: 'P-1',
    firstname: 'Max',
    lastname: 'Mustermann',
    dateOfBirth: '1990-01-01T00:00:00Z',
    sex: 'female' as const,
  },
});

describe('PatientAlertsPageController partial errors', () => {
  beforeEach(() => {
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockReset();
    vi.mocked(MedicalCaseMetadataRepository.getByMedicalCaseId).mockReset();
    useLoaderDataMock.mockReturnValue({ case_id: 'CASE-123' });
  });

  afterEach(() => {
    cleanup();
    useLoaderDataMock.mockClear();
  });

  it('shows server error page when alerts return 502', async () => {
    const http502 = new Error('HTTP Error: 502 Bad Gateway');
    // mimic fetch-style extras so our error-mapping picks up the status and headers
    (http502 as Error & { status?: number; headers?: Headers }).status = 502;
    vi.mocked(MedicalCaseMetadataRepository.getByMedicalCaseId).mockResolvedValue(
      buildMetadataSample('CASE-789'),
    );
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockRejectedValue(http502);

    await act(async () => {
      render(
        <Suspense fallback={<div data-testid='loader' />}>
          <PatientAlertsPageController />
        </Suspense>,
      );
    });

    expect(await screen.findByTestId('alerts-error')).toBeInTheDocument();
    expect(await screen.findByText(/Serverfehler/i)).toBeInTheDocument();
  });

  it('shows inline metadata error while alerts still render', async () => {
    vi.mocked(MedicalCaseMetadataRepository.getByMedicalCaseId).mockRejectedValue(
      new Response('not found', { status: 404 }),
    );
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockResolvedValue(
      buildAlertsSample('CASE-123'),
    );

    await act(async () => {
      render(
        <Suspense fallback={<div data-testid='loader' />}>
          <PatientAlertsPageController />
        </Suspense>,
      );
    });

    expect(await screen.findByTestId('metadata-error')).toBeInTheDocument();
    expect(await screen.findByText(/Der Patient wurde nicht gefunden/i)).toBeInTheDocument();
    expect(screen.queryByTestId('alerts-error')).toBeNull();
    expect(await screen.findAllByTestId('critical-alert-card')).not.toHaveLength(0);
  });

  it('shows metadata server error inline for 502 responses', async () => {
    const http502 = new Error('HTTP Error: 502 Bad Gateway');
    (http502 as Error & { status?: number }).status = 502;
    vi.mocked(MedicalCaseMetadataRepository.getByMedicalCaseId).mockRejectedValue(http502);
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockResolvedValue(
      buildAlertsSample('CASE-123'),
    );

    await act(async () => {
      render(
        <Suspense fallback={<div data-testid='loader' />}>
          <PatientAlertsPageController />
        </Suspense>,
      );
    });

    expect(await screen.findByTestId('metadata-error')).toBeInTheDocument();
    expect(await screen.findByText(/Serverfehler/i)).toBeInTheDocument();
    expect(screen.queryByTestId('alerts-error')).toBeNull();
    expect(await screen.findAllByTestId('critical-alert-card')).not.toHaveLength(0);
  });

  it('shows inline alerts error while metadata still renders', async () => {
    useLoaderDataMock.mockReturnValue({ case_id: 'CASE-456' });
    vi.mocked(MedicalCaseMetadataRepository.getByMedicalCaseId).mockResolvedValue(
      buildMetadataSample('CASE-456'),
    );
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockRejectedValue(
      new Error('Service offline'),
    );

    await act(async () => {
      render(
        <Suspense fallback={<div data-testid='loader' />}>
          <PatientAlertsPageController />
        </Suspense>,
      );
    });

    expect(await screen.findByTestId('alerts-error')).toBeInTheDocument();
    expect(await screen.findByText(/Unerwartete Ansicht/i)).toBeInTheDocument();
    expect(screen.queryByTestId('metadata-error')).toBeNull();
    expect(await screen.findByText(/Patientennummer/i)).toBeInTheDocument();
  });
});
