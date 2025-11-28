import { act, render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, afterAll, describe, expect, it, vi } from 'vitest';
import { Suspense } from 'react';

vi.stubEnv('VITE_TEST_DATA_VIEW', 'test');
vi.stubEnv('VITE_FAST_FAKE', '1');

beforeAll(() => {
  Object.defineProperty(window.HTMLElement.prototype, 'scrollTo', {
    value: () => {},
    writable: true,
  });
});
afterAll(() => {
  vi.useRealTimers();
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  const { FakeAmpelResultRepository } = await import('../tests/FakeAmpelResultRepository');
  const [data, medicalCaseMetadata] = await Promise.all([
    FakeAmpelResultRepository.uiFakesToApi('CASEID'),
    FakeAmpelResultRepository.generateFakePatientMetaData(),
  ]);
  const alertsData = Promise.resolve(data);
  const metadataData = Promise.resolve(medicalCaseMetadata);
  return {
    ...actual,
    useLoaderData: () => ({
      case_id: 'CASEID',
    }),
  };
});

const { default: PatientAlertsPageController } =
  await import('../pages/alerts/PatientAlertsPageController');

describe('PatientAlertsPage Integration', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div />}>
          <PatientAlertsPageController />
        </Suspense>,
      );
    });
  });

  it('displays all main sections & counts (snapshot stable)', async () => {
    await screen.findAllByTestId('critical-alert-card');
    await screen.findByText(/Kritische Zustände/);
    await screen.findByText(/Warnende Zustände/);
    await screen.findByText(/Unauffällige Zustände/);

    expect((await screen.findAllByTestId('critical-alert-card')).length).toBe(3);
    expect((await screen.findAllByTestId('warning-alert-card')).length).toBe(1);
    expect((await screen.findAllByTestId('inconspicuous-state-card')).length).toBe(9);

    expect(document.body).toMatchSnapshot('page-initial');
  });

  it('opens & closes the detail view of critical alerts (snapshots)', async () => {
    const btn = (await screen.findAllByTestId('critical-alert-card'))[0];
    await btn.click();

    const close = await screen.findByTestId('overlay-back-navigation');
    expect(close).toBeInTheDocument();

    expect(document.body).toMatchSnapshot('alert-overlay-open');

    const switcher = await screen.findByTestId('switcher');
    await switcher.click();

    expect(document.body).toMatchSnapshot('alert-overlay-open-diagramm');

    await close.click();

    expect(document.body).toMatchSnapshot('alert-overlay-closed');
  });

  it('opens & closes the detail view of warning alerts (snapshots)', async () => {
    const btn = (await screen.findAllByTestId('warning-alert-card'))[0];
    await btn.click();

    const close = await screen.findByTestId('overlay-back-navigation');
    expect(close).toBeInTheDocument();

    expect(document.body).toMatchSnapshot('warning-overlay-open');

    const switcher = await screen.findByTestId('switcher');
    await switcher.click();

    expect(document.body).toMatchSnapshot('warning-overlay-open-diagramm');

    await close.click();

    expect(document.body).toMatchSnapshot('warning-overlay-closed');
  });
});
