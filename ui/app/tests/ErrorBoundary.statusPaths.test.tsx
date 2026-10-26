import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const useRouteErrorMock = vi.hoisted(() => vi.fn());
const isRouteErrorResponseMock = vi.hoisted(() => vi.fn());

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useRouteError: useRouteErrorMock,
    isRouteErrorResponse: isRouteErrorResponseMock,
  };
});

const { ErrorBoundary } = await import('../error/patientAlertsErrors');

const renderBoundary = (
  routeError: unknown,
  { routeErrorResponse = true }: { routeErrorResponse?: boolean } = {},
): void => {
  isRouteErrorResponseMock.mockReturnValue(routeErrorResponse);
  useRouteErrorMock.mockReturnValue(routeError);
  render(<ErrorBoundary />);
};

describe('ErrorBoundary status paths', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TEST_DATA_VIEW', 'test');
    useRouteErrorMock.mockReset();
    isRouteErrorResponseMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  const cases: Array<[number, any, RegExp]> = [
    [400, { status: 400, statusText: 'Bad Request' }, /Keine CDSS-Daten zur Fallnummer/],
    [422, { status: 422, statusText: 'Bad Request' }, /Keine CDSS-Daten zur Fallnummer/],
    [401, { status: 401, statusText: 'Unauthorized' }, /Fehlende Berechtigungen/],
    [403, { status: 403, statusText: 'Forbidden' }, /Verboten/],
    [404, { status: 404, statusText: 'Not Found' }, /Keine CDSS-Daten zur Fallnummer/],
    [410, { status: 410, statusText: 'Not Found' }, /Keine CDSS-Daten zur Fallnummer/],
    [408, { status: 408, statusText: 'Timeout' }, /zu lange gedauert/],
    [
      429,
      { status: 429, statusText: 'Too Many Requests', headers: { 'retry-after': '30' } },
      /Zu viele Anfragen in kurzer Zeit/,
    ],
    [
      500,
      { status: 500, statusText: 'Bad Gateway', headers: { 'retry-after': '300' } },
      /System nicht erreichbar/,
    ],
    [
      502,
      { status: 502, statusText: 'Bad Gateway', headers: { 'retry-after': '300' } },
      /System nicht erreichbar/,
    ],
    [
      503,
      { status: 503, statusText: 'Service Unavailable', headers: { 'retry-after': '300' } },
      /System nicht erreichbar/,
    ],
    [
      504,
      { status: 504, statusText: 'Bad Gateway', headers: { 'retry-after': '300' } },
      /System nicht erreichbar/,
    ],
  ];

  it.each(cases)('renders %s view', (_status, routeErr, matcher) => {
    renderBoundary(routeErr);
    expect(screen.getByText(matcher)).toBeInTheDocument();
  });

  it('renders maintenance view for HTTP errors thrown as Error instances (e.g. fetch)', () => {
    renderBoundary(new Error('HTTP Error: 502 Bad Gateway'), { routeErrorResponse: false });
    expect(screen.getByText(/System nicht erreichbar/)).toBeInTheDocument();
  });

  it('falls back to DefaultError for non-HTTP errors', () => {
    renderBoundary(new Error('boom'), { routeErrorResponse: false });
    expect(screen.getByText(/Unerwartete Ansicht/)).toBeInTheDocument();
  });

  it('falls back to DefaultError for unknown values', () => {
    renderBoundary(12345, { routeErrorResponse: false });
    expect(screen.getByText(/Unerwartete Ansicht/)).toBeInTheDocument();
  });
});
