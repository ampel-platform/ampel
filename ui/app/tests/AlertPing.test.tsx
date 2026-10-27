import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AlertPing } from '../pages/alerts/components/components/AlertPing';
import { AlertType } from '../pages/alerts/types/types';

describe('AlertPing', () => {
  it.each([
    [AlertType.Warning, 'bg-alert-warning'],
    [AlertType.Critical, 'bg-alert-critical'],
    [AlertType.Green, 'bg-alert-success'],
  ])('renders the right color for type %s', (type, expectedClass) => {
    const { container } = render(<AlertPing type={type} />);
    const ping = container.querySelector('.animate-ping');
    const dot = container.querySelector('span.relative.inline-flex.h-4.w-4.rounded-full');

    expect(ping?.className).toContain(expectedClass);
    expect(dot?.className).toContain(expectedClass);
  });
});
