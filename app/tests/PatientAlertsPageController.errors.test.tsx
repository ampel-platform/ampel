import { act, cleanup, render, screen } from '@testing-library/react';
import React, { Suspense } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.stubEnv('VITE_TEST_DATA_VIEW', 'prod');
vi.stubEnv('VITE_FAST_FAKE', '1');

const useLoaderDataMock = vi.fn(() => ({
  case_id: 'CASE-123',
  alertsResult: {
    medicalCaseId: 'CASE-123',
    scoringSystems: [],
  },
  metadataResult: {
    id: 'CASE-123',
    patient: null,
  },
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useLoaderData: useLoaderDataMock,
    useNavigation: () => ({ state: 'idle' }),
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
    useLoaderDataMock.mockReturnValue({
      case_id: 'CASE-123',
      alertsResult: buildAlertsSample('CASE-123'),
      metadataResult: buildMetadataSample('CASE-123'),
    });
  });

  afterEach(() => {
    cleanup();
    useLoaderDataMock.mockClear();
  });

  it('shows server error page when alerts return 502', async () => {
    useLoaderDataMock.mockReturnValue({
      case_id: 'CASE-123',
      alertsResult: { message: 'HTTP Error: 502 Bad Gateway', status: 502 },
      metadataResult: buildMetadataSample('CASE-789'),
    });

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
    useLoaderDataMock.mockReturnValue({
      case_id: 'CASE-123',
      alertsResult: buildAlertsSample('CASE-123'),
      metadataResult: { message: 'Not Found', status: 404 },
    });

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
    useLoaderDataMock.mockReturnValue({
      case_id: 'CASE-123',
      alertsResult: buildAlertsSample('CASE-123'),
      metadataResult: { message: 'HTTP Error: 502 Bad Gateway', status: 502 },
    });

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
    useLoaderDataMock.mockReturnValue({
      case_id: 'CASE-456',
      alertsResult: { message: 'Service offline' },
      metadataResult: buildMetadataSample('CASE-456'),
    });

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
