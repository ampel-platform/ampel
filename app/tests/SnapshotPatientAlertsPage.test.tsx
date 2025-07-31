import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import TestPatientAlertsPage from '../pages/alerts/TestPatientAlertsPage';

// Mock useLoaderData (wie gehabt)
vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: () => ({ patient_id: 'TESTID', case_id: 'CASEID' }),
  };
});

describe('PatientAlertsPage Integration', () => {
  it('zeigt alle Hauptbereiche & Patientendaten korrekt an und zeigt die richtige Anzahl der Kritischen, Warnenden und unauffälligen Alerts korrekt an', () => {
    
    const { container } = render(<TestPatientAlertsPage />);
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

    it('öffnet & schließt die Detailansicht der Kritischen Alerts und Überprüft das Vorhandensein des Hinweises, Weiterführende Links, Legende, Tabelle, Diagramm und der Close-Button', async () => {
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
    
    it('öffnet & schließt die Detailansicht der Warnenden Alerts und Überprüft das Vorhandensein des Hinweises, Weiterführende Links, Legende, Tabelle, Diagramm und der Close-Button', async () => {
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
