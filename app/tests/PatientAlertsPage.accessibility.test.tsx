import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PatientAlertsPage } from '../pages/alerts/PatientAlertsPage';
import { AmpelStatus } from '../pages/alerts/types/types';

describe('PatientAlertsPage accessibility', () => {
  const rulesetsByStatus = new Map<AmpelStatus, React.ReactNode[]>([
    [AmpelStatus.RED, []],
    [AmpelStatus.YELLOW, []],
    [AmpelStatus.GREEN, []],
  ]);

  it('exposes an accessible toggle for inconspicuous states', () => {
    const { container } = render(
      <PatientAlertsPage rulesetsByStatus={rulesetsByStatus} showHeader={false} />,
    );

    const toggle = screen.getByRole('button', { name: /Unauffällige Zustände/i });
    const section = container.querySelector('#inconspicuous-states-section');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(section?.classList.contains('invisible')).toBe(true);
    expect(section?.classList.contains('pointer-events-none')).toBe(true);

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(section?.classList.contains('visible')).toBe(true);
    expect(section?.classList.contains('translate-x-0')).toBe(true);
    expect(section?.classList.contains('opacity-100')).toBe(true);
    expect(section?.classList.contains('invisible')).toBe(false);
    expect(section?.classList.contains('pointer-events-none')).toBe(false);
  });
});
