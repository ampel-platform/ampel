import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PatientAlertsPageController from '../pages/alerts/PatientAlertsPageController';
import { ApiResultCollection, PatientApiResult } from '../pages/alerts/types/types-api';
/* eslint-disable no-undef */

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual<typeof import('@remix-run/react')>('@remix-run/react');
  const { FakeAmpelResultRepository } = await import('../tests/FakeAmpelResultRepository');
  let data: ApiResultCollection;
  let patientData: PatientApiResult;
  [data, patientData] = await Promise.all([
    FakeAmpelResultRepository.uiFakesToApi('CASEID'),
    FakeAmpelResultRepository.generateFakePatientMetaData(),
  ]);
  return {
    ...actual,
    useLoaderData: () => ({ case_id: 'CASEID', data, patientData }), // supply what the route expects
  };
});

describe('PatientAlertsPage Integration', async () => {
  it('displays all main sections & patient data correctly and shows the correct number of critical, warning, and inconspicuous alerts', async () => {
    const { container } = render(<PatientAlertsPageController />);

    // snapshot test
    expect(container).toMatchSnapshot();

    // Headlines prüfen
    expect(await screen.getByText(/Kritische Zustände/)).toBeInTheDocument();
    expect(await screen.getByText(/Warnende Zustände/)).toBeInTheDocument();
    expect(await screen.getByText(/Unauffällige Zustände/)).toBeInTheDocument();

    // Cards zählen (exakte Zahl siehe Faker)
    expect(await screen.getAllByTestId('critical-alert-card').length).toBe(3);
    expect(await screen.getAllByTestId('warning-alert-card').length).toBe(1);
    expect(await screen.getAllByTestId('inconspicuous-state-card').length).toBe(9);
  });

  it('opens & closes the detail view of critical alerts and checks for the presence of the hint, further links, legend, table, chart, and the close button', async () => {
    const showCriticalAlertStatesButton = screen.getAllByTestId('critical-alert-card')[0];

    // Initiale Ansicht
    expect(showCriticalAlertStatesButton).toBeInTheDocument();
    expect(screen.queryByTestId('overlay-back-navigation')).not.toBeInTheDocument();

    // Detailsansicht öffnen
    await showCriticalAlertStatesButton.click();

    // Prüfen, dass Overlay angezeigt wird (z.B. anhand eines Test-ID oder anderen markanten Elements)
    const closeButton = screen.getByTestId('overlay-back-navigation');
    expect(closeButton).toBeInTheDocument();

    // Snapshot test
    expect(document.body).toMatchSnapshot('alert-overlay-open');

    // Button Switcher zum anzeigen der Diagramm statt Tabelle
    const switcher = screen.getByTestId('switcher');
    await switcher.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('alert-overlay-open-diagramm');

    // Detailsansicht schließen
    await closeButton.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('alert-overlay-closed');
  });

  it('opens & closes the detail view of warning alerts and checks for the presence of the hint, further links, legend, table, chart, and the close button', async () => {
    const showWarningAlertStatesButton = screen.getAllByTestId('warning-alert-card')[0];

    // Initiale Ansicht
    expect(showWarningAlertStatesButton).toBeInTheDocument();

    // Detailsansicht öffnen
    await showWarningAlertStatesButton.click();

    // Prüfen, dass Overlay angezeigt wird (z.B. anhand eines Test-ID oder anderen markanten Elements)
    const closeButton = screen.getByTestId('overlay-back-navigation');
    expect(closeButton).toBeInTheDocument();

    // Snapshot test
    expect(document.body).toMatchSnapshot('warning-overlay-open');

    // Button Switcher zum anzeigen der Diagramm statt Tabelle
    const switcher = await screen.getByTestId('switcher');
    await switcher.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('alert-overlay-open-diagramm');

    // Detailsansicht schließen
    await closeButton.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('warning-overlay-closed');
  });
});
