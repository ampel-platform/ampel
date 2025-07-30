import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import PatientAlertsPage from '../pages/alerts/PatientAlertsPage';

// Mock useLoaderData (wie gehabt)
vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: () => ({ patient_id: 'TESTID', case_id: 'CASEID' }),
  };
});

describe('PatientAlertsPage Integration', () => {
  it('zeigt alle Hauptbereiche an und zeigt die richtige Anzahl der Kritischen, Warnenden und unauffälligen Alerts korrekt an', () => {
    render(<PatientAlertsPage />);
    // Headlines prüfen
    expect(screen.getByText(/Kritische Zustände/)).toBeInTheDocument();
    expect(screen.getByText(/Warnende Zustände/)).toBeInTheDocument();
    expect(screen.getByText(/Unauffällige Zustände/)).toBeInTheDocument();

    // Counter prüfen (hier ggf. Zahlen anpassen, je nach Inhalt des Fakers)
    expect(screen.getByText(/\d+/, { selector: '.bg-rose-100' })).toBeInTheDocument();
    expect(screen.getByText(/\d+/, { selector: '.bg-amber-100' })).toBeInTheDocument();
    expect(screen.getByText(/\d+/, { selector: '.bg-gray-100' })).toBeInTheDocument();

    // Cards zählen (ggf. exakte Zahl aus dem Faker prüfen)
    expect(screen.getAllByTestId('critical-alert-card').length).toBe(3);
    expect(screen.getAllByTestId('warning-alert-card').length).toBe(1);
    expect(screen.getAllByTestId('inconspicuous-state-card').length).toBe(9);
  });

  //   it('zeigt Patientendaten korrekt an', () => {
  //     render(<PatientAlertsPage />);
  //     // Namen, Patient-ID, Case-ID etc.
  //     expect(screen.getByText(/Patientennummer123/)).toBeInTheDocument();
  //     expect(screen.getByText(/Fallnummer456/)).toBeInTheDocument();
  //     expect(screen.getByText(/Geschlechtmännlich/)).toBeInTheDocument();
  //     expect(screen.getByText(/Geburtsdatum23.9.1988/)).toBeInTheDocument();
  //     // Name des Fake-Patients, wenn gesetzt
  //     expect(screen.getByText('Max Mustermann')).toBeInTheDocument();
  //   });

  //   it('zeigt nach Klick auf einen kritischen Alert das Overlay an', () => {
  //     render(<PatientAlertsPage />);
  //     // Einen beliebigen Alert-Titel aus Faker nehmen
  //     // (hier “test” als Beispiel, passe ggf. an!)
  //     const alert = screen.getByText(/test/i);
  //     fireEvent.click(alert);
  //     // Overlay prüfen
  //     // Falls du ein echtes <dialog> hast:
  //     // expect(screen.getByRole('dialog')).toBeInTheDocument();
  //     // Oder via TestID, falls Overlay ein div ist:
  //     // expect(screen.getByTestId('alert-detail-overlay')).toBeVisible();
  //   });

  //   it('öffnet und schließt die Anzeige unauffälliger Zustände korrekt', () => {
  //     render(<PatientAlertsPage />);
  //     // Button/Auslöser für unauffällige Zustände finden
  //     const link = screen.getByText(/Unauffällige Zustände/);
  //     // Default: nicht sichtbar (d.h. Klasse hidden)
  //     const grid = screen.getByText(/Unauffällige Zustände/).parentElement?.nextElementSibling;
  //     expect(grid).toHaveClass('hidden');
  //     // Öffnen (Klick)
  //     fireEvent.click(link);
  //     // Jetzt sollte sichtbar (inline-grid)
  //     expect(grid).toHaveClass('inline-grid');
  //     // Nochmal klicken -> wieder hidden
  //     fireEvent.click(link);
  //     expect(grid).toHaveClass('hidden');
  //   });

  //   it('zeigt die erwarteten AlertCards und StateCards für alle Status', () => {
  //     render(<PatientAlertsPage />);
  //     // Die Überschriften aller Status prüfen
  //     expect(screen.getByText(/Akute Nierenschädigung [AKIN 1, Vancomycin]/)).toBeInTheDocument();
  //     expect(screen.getByText(/Warnende/)).toBeInTheDocument();
  //     expect(screen.getByText(/Unauffällige/)).toBeInTheDocument();

  //     // Cards zählen (ggf. exakte Zahl aus dem Faker prüfen)
  //     // expect(screen.getAllByTestId('alert-card').length).toBe(2); // Anpassen!
  //     // expect(screen.getAllByTestId('inconspicuous-state-card').length).toBe(1);
  //   });
});
