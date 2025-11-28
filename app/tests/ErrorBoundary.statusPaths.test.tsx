import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
    useLoaderData: vi.fn(),
  };
});

import { useRouteError, isRouteErrorResponse } from 'react-router';

let ErrorBoundary: (typeof import('../pages/alerts/PatientAlertsPageController'))['ErrorBoundary'];

describe('ErrorBoundary status paths', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv('VITE_TEST_DATA_VIEW', 'test');
    vi.mocked(useRouteError).mockReset();
    vi.mocked(isRouteErrorResponse).mockReset();
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);
    ({ ErrorBoundary } = await import('../pages/alerts/PatientAlertsPageController'));
  });

  afterEach(() => {
    cleanup();
  });

  const cases: Array<[number, any, RegExp]> = [
    [400, { status: 400, statusText: 'Bad Request' }, /Fallnummer wurde nichts gefunden/],
    [422, { status: 422, statusText: 'Bad Request' }, /Fallnummer wurde nichts gefunden/],
    [401, { status: 401, statusText: 'Unauthorized' }, /Fehlende Berechtigungen/],
    [403, { status: 403, statusText: 'Forbidden' }, /Verboten/],
    [404, { status: 404, statusText: 'Not Found' }, /Der Patient wurde nicht gefunden/],
    [410, { status: 410, statusText: 'Not Found' }, /Der Patient wurde nicht gefunden/],
    [408, { status: 408, statusText: 'Timeout' }, /zu lange gedauert/],
    [
      429,
      { status: 429, statusText: 'Too Many Requests', headers: { 'retry-after': '30' } },
      /Die Anfrage hat zu lange gedauert/,
    ],
    [
      500,
      { status: 500, statusText: 'Bad Gateway', headers: { 'retry-after': '300' } },
      /Serverfehler/,
    ],
    [
      502,
      { status: 502, statusText: 'Bad Gateway', headers: { 'retry-after': '300' } },
      /Serverfehler/,
    ],
    [
      503,
      { status: 503, statusText: 'Service Unavailable', headers: { 'retry-after': '300' } },
      /Wartungsfenster/,
    ],
    [
      504,
      { status: 504, statusText: 'Bad Gateway', headers: { 'retry-after': '300' } },
      /Serverfehler/,
    ],
  ];

  it.each(cases)('renders %s view', (_status, routeErr, matcher) => {
    vi.mocked(useRouteError).mockReturnValue(routeErr as any);
    render(<ErrorBoundary />);
    expect(screen.getByText(matcher)).toBeInTheDocument();
  });

  it('renders maintenance view for HTTP errors thrown as Error instances (e.g. fetch)', () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(new Error('HTTP Error: 502 Bad Gateway') as any);

    render(<ErrorBoundary />);

    expect(screen.getByText(/Serverfehler/)).toBeInTheDocument();
  });

  it('falls back to DefaultError for non-HTTP errors', () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(new Error('boom'));
    render(<ErrorBoundary />);
    expect(screen.getByText(/Unerwartete Ansicht/)).toBeInTheDocument();
  });

  it('falls back to DefaultError for unknown values', () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(12345 as any);
    render(<ErrorBoundary />);
    expect(screen.getByText(/Unerwartete Ansicht/)).toBeInTheDocument();
  });
});
