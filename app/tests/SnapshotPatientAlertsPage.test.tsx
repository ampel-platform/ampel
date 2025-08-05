import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PatientAlertsPageController from '../pages/alerts/PatientAlertsPageController';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: () => ({ patient_id: 'TESTID', case_id: 'CASEID' }),
  };
});

describe('PatientAlertsPage Integration', () => {
  it('displays all main sections & patient data correctly and shows the correct number of critical, warning, and inconspicuous alerts', () => {
    
    const { container } = render(<PatientAlertsPageController />);
    // snapshot test
    expect(container).toMatchSnapshot();

    // Headlines prüfen
    expect(screen.getByText(/Kritische Zustände/)).toBeInTheDocument();
    expect(screen.getByText(/Warnende Zustände/)).toBeInTheDocument();
    expect(screen.getByText(/Unauffällige Zustände/)).toBeInTheDocument();

    // Cards zählen (exakte Zahl siehe Faker)
    expect(screen.getAllByTestId('critical-alert-card').length).toBe(3);
    expect(screen.getAllByTestId('warning-alert-card').length).toBe(1);
    expect(screen.getAllByTestId('inconspicuous-state-card').length).toBe(9);
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

    // Button Switcher zum anzeigen der Tabelle statt Diagramm
    const switcher = screen.getByTestId('switcher');
    await switcher.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('alert-overlay-open-table');

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

    // Button Switcher zum anzeigen der Tabelle statt Diagramm
    const switcher = await screen.getByTestId('switcher');
    await switcher.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('alert-overlay-open-table');

    // Detailsansicht schließen
    await closeButton.click();

    // Snapshot test
    expect(document.body).toMatchSnapshot('warning-overlay-closed');
  });
});
