import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AlertDetailOverlay } from '../pages/alerts/components/AlertDetailOverlay';
import { AlertType, AmpelStatus, type AlertDetails } from '../pages/alerts/types/types';

const baseAlert: AlertDetails = {
  ruleset: 'Probe Alert',
  ampelStatus: AlertType.Warning,
  message: 'Hinweis',
  resultTime: new Date('2024-01-01T00:00:00Z'),
  rulesetHistory: { data: [] },
  links: [],
};

describe('AlertDetailOverlay', () => {
  it('renders safely when history is empty', () => {
    render(<AlertDetailOverlay data={baseAlert} onClose={() => {}} />);

    expect(screen.getByText(/Probe Alert/)).toBeInTheDocument();
    expect(screen.getByText(/Keine Messwerte vorhanden/i)).toBeInTheDocument();
  });

  it('prefers the latest severity from history', () => {
    const data: AlertDetails = {
      ...baseAlert,
      rulesetHistory: {
        data: [
          {
            date: new Date('2024-01-01T00:00:00Z'),
            analyteValue: 1,
            ampelStatus: AmpelStatus.GREEN,
            unit: 'mg/l',
            analyteName: 'Na',
            severity: 'alt',
          },
          {
            date: new Date('2024-02-01T00:00:00Z'),
            analyteValue: 2,
            ampelStatus: AmpelStatus.YELLOW,
            unit: 'mg/l',
            analyteName: 'Na',
            severity: 'neu',
          },
        ],
      },
    };

    render(<AlertDetailOverlay data={data} onClose={() => {}} />);

    expect(screen.getByText(/neu/)).toBeInTheDocument();
  });
});
