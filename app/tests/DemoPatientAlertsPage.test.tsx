import { act, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Suspense } from 'react';

vi.stubEnv('VITE_TEST_DATA_VIEW', 'demo');
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
  const { FakeDemoAmpelResultRepository } = await import('../tests/DemoFakeAmpelResultRepository');
  const [data, medicalCaseMetadata] = await Promise.all([
    FakeDemoAmpelResultRepository.uiDemoFakesToApi('CASEID'),
    FakeDemoAmpelResultRepository.generateDemoFakePatientMetaData(),
  ]);
  return {
    ...actual,
    useLoaderData: () => ({
      case_id: 'CASEID',
      alertsResult: data,
      metadataResult: medicalCaseMetadata,
    }),
    useNavigation: () => ({ state: 'idle' }),
  };
});

const { default: PatientAlertsPageController } =
  await import('../pages/alerts/PatientAlertsPageController');

describe('PatientAlertsPage Demo Mode', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div />}>
          <PatientAlertsPageController />
        </Suspense>,
      );
    });
  });

  it('shows the fictive yellow Testalarm ruleset', async () => {
    expect(await screen.findByText('Testalarm')).toBeInTheDocument();
  });

  it('keeps yellow/green cards non-clickable in demo while red stays clickable', async () => {
    const warning = (await screen.findAllByTestId('warning-alert-card'))[0];
    await warning.click();
    expect(screen.queryByTestId('overlay-back-navigation')).not.toBeInTheDocument();

    const green = (await screen.findAllByTestId('inconspicuous-state-card'))[0];
    await green.click();
    expect(screen.queryByTestId('overlay-back-navigation')).not.toBeInTheDocument();

    const red = (await screen.findAllByTestId('critical-alert-card'))[0];
    await red.click();
    expect(await screen.findByTestId('overlay-back-navigation')).toBeInTheDocument();
  });
});
