import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@remix-run/react', () => ({
  useRouteError: vi.fn(),
  isRouteErrorResponse: vi.fn(),
}));

import { useRouteError, isRouteErrorResponse } from '@remix-run/react';
import { ErrorBoundary } from '../root';

describe('ErrorBoundary status paths', () => {
  beforeEach(() => {
    vi.mocked(useRouteError).mockReset();
    vi.mocked(isRouteErrorResponse).mockReset();
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);
  });

  const cases: Array<[number, any]> = [
    [400, { status: 400, statusText: 'Bad Request' }],
    [401, { status: 401, statusText: 'Unauthorized' }],
    [403, { status: 403, statusText: 'Forbidden' }],
    [404, { status: 404, statusText: 'Not Found' }],
    [408, { status: 408, statusText: 'Request Timeout' }],
    [429, { status: 429, statusText: 'Too Many Requests', headers: { 'retry-after': '30' } }],
    [503, { status: 503, statusText: 'Service Unavailable', headers: { 'retry-after': '300' } }],
  ];

  it.each(cases)('renders %s snapshot', (_status, routeErr) => {
    vi.mocked(useRouteError).mockReturnValue(routeErr as any);
    const { container } = render(<ErrorBoundary />);
    expect(container).toMatchSnapshot();
  });

  it('falls back to DefaultError for non-HTTP errors', () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(new Error('boom'));
    const { container } = render(<ErrorBoundary />);
    expect(container).toMatchSnapshot();
  });

  it('falls back to DefaultError for unknown values', () => {
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(12345 as any);
    const { container } = render(<ErrorBoundary />);
    expect(container).toMatchSnapshot();
  });
});
