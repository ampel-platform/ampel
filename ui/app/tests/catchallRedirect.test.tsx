import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CatchallRedirect from '../routes/catchall-redirect';

describe('catchall route', () => {
  it('renders not-found content instead of redirecting to a sample case id', () => {
    render(<CatchallRedirect />);

    expect(screen.getByText(/Keine CDSS-Daten zur Fallnummer vorhanden/i)).toBeInTheDocument();
  });
});
