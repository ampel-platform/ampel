import React, { ReactNode } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { BadRequest } from './BadRequest';
import { DefaultError } from './DefaultError';
import { Forbidden } from './Forbidden';
import { MaintenanceError } from './MaintenanceError';
import { NotFound } from './NotFound';
import { toNumericStatus } from './patientAlertsData';
import { StatusError } from './patientAlertsTypes';
import { ServerError } from './ServerError';
import { Timeout } from './Timeout';
import { TooManyRequests } from './TooManyRequests';
import { Unauthorized } from './Unauthorized';

export const DEFAULT_RETRY_AFTER_MS = 1000 * 60 * 5; // 5min
export const SECTION_DEFAULT_RETRY_AFTER_MS = DEFAULT_RETRY_AFTER_MS;

function parseRetryAfterMs(retryAfter: string | null | undefined): number | null {
  if (!retryAfter) return null;

  const numeric = Number(retryAfter);
  if (!Number.isNaN(numeric)) return Math.max(0, numeric) * 1000;

  const dateMs = Date.parse(retryAfter);
  if (!Number.isNaN(dateMs)) return Math.max(0, dateMs - Date.now());

  return null;
}

function getHeadersFrom(err: unknown): Headers | Record<string, string> | undefined {
  if (!err || typeof err !== 'object' || !('headers' in err)) return undefined;

  const headers = (err as { headers?: unknown }).headers;
  if (headers instanceof Headers) return headers;
  if (headers && typeof headers === 'object') return headers as Record<string, string>;

  return undefined;
}

function extractRetryAfterMs(headers: Headers | Record<string, string> | undefined): number | null {
  if (!headers) return null;

  if (headers instanceof Headers) {
    return parseRetryAfterMs(headers.get('retry-after'));
  }

  return parseRetryAfterMs(headers['retry-after'] ?? headers['Retry-After']);
}

function parseHttpStatus(err: unknown): { status: number; retryAfterMs: number | null } | null {
  if (isRouteErrorResponse(err)) {
    return { status: err.status, retryAfterMs: extractRetryAfterMs(getHeadersFrom(err)) };
  }

  if (err instanceof Response) {
    return { status: err.status, retryAfterMs: extractRetryAfterMs(getHeadersFrom(err)) };
  }

  if (err && typeof err === 'object' && 'status' in err) {
    const status = toNumericStatus((err as StatusError).status);
    const retryAfterMs = extractRetryAfterMs(getHeadersFrom(err));
    if (status !== null) {
      return { status, retryAfterMs };
    }
  }

  if (err && typeof err === 'object' && 'statusCode' in err) {
    const statusCode = (err as { statusCode?: unknown }).statusCode;
    const status = toNumericStatus(statusCode);
    if (status !== null) return { status, retryAfterMs: extractRetryAfterMs(getHeadersFrom(err)) };
  }

  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: unknown }).response;
    if (response && typeof response === 'object' && 'status' in response) {
      const status = toNumericStatus((response as { status?: unknown }).status);
      if (status !== null) {
        return {
          status,
          retryAfterMs: extractRetryAfterMs(
            getHeadersFrom(response as { headers?: Headers | Record<string, string> }),
          ),
        };
      }
    }
  }

  if (err instanceof Error) {
    const match = /HTTP Error:\s*(\d{3})/i.exec(err.message);
    if (match) return { status: Number(match[1]), retryAfterMs: null };

    // Some environments hide details in cause; inspect it as a last resort
    if (err.cause) {
      const nested = parseHttpStatus(err.cause as unknown);
      if (nested) return nested;
    }
  }

  return null;
}

const sectionByStatus: Partial<
  Record<number, (ctx: { retryAfterMs: number | null }) => ReactNode>
> = {
  400: () => <BadRequest />,
  401: () => <Unauthorized />,
  403: () => <Forbidden />,
  404: () => <NotFound />,
  408: () => <Timeout />,
  410: () => <NotFound />,
  422: () => <BadRequest />,
  429: ({ retryAfterMs }) => (
    <TooManyRequests retryAfterMs={retryAfterMs ?? SECTION_DEFAULT_RETRY_AFTER_MS} />
  ),
  500: ({ retryAfterMs }) => (
    <ServerError retryAfterMs={retryAfterMs ?? SECTION_DEFAULT_RETRY_AFTER_MS} />
  ),
  502: ({ retryAfterMs }) => (
    <ServerError retryAfterMs={retryAfterMs ?? SECTION_DEFAULT_RETRY_AFTER_MS} />
  ),
  503: ({ retryAfterMs }) => (
    <MaintenanceError retryAfterMs={retryAfterMs ?? SECTION_DEFAULT_RETRY_AFTER_MS} />
  ),
  504: ({ retryAfterMs }) => (
    <ServerError retryAfterMs={retryAfterMs ?? SECTION_DEFAULT_RETRY_AFTER_MS} />
  ),
};

function renderHttpError(error: unknown, defaultRetryAfterMs: number): React.ReactNode {
  const ctx = parseHttpStatus(error);
  if (ctx) {
    const view = sectionByStatus[ctx.status];
    if (view) return view({ retryAfterMs: ctx.retryAfterMs ?? defaultRetryAfterMs });
  }

  return <DefaultError />;
}

export function renderSectionError(error: unknown): React.ReactNode {
  return renderHttpError(error, SECTION_DEFAULT_RETRY_AFTER_MS);
}

export function ErrorBoundary(): React.ReactNode {
  const err = useRouteError();
  return renderHttpError(err, DEFAULT_RETRY_AFTER_MS);
}

export class SectionErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback: React.ReactNode | ((error: unknown) => React.ReactNode);
  },
  { error: unknown | null }
> {
  state: { error: unknown | null } = { error: null };

  static getDerivedStateFromError(error: unknown): { error: unknown } {
    return { error };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo): void {
    globalThis.console?.error?.('Section error boundary caught', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      const { fallback } = this.props;
      return typeof fallback === 'function' ? fallback(this.state.error) : fallback;
    }

    return this.props.children;
  }
}

export function SectionErrorPanel({
  error,
  dataTestId,
}: {
  error: unknown;
  dataTestId?: string;
}): React.ReactNode {
  return (
    <div data-testid={dataTestId} className='mt-4'>
      {renderSectionError(error)}
    </div>
  );
}

export function PageSkeleton(): React.ReactNode {
  return (
    <>
      <div
        data-testid='metadata-skeleton'
        className='h-12 w-full animate-pulse rounded-md bg-gray-100'
        aria-busy='true'
      />
      <div className='mt-6 space-y-4' aria-busy='true' data-testid='alerts-skeleton'>
        <div className='h-10 w-1/2 animate-pulse rounded-md bg-gray-100' />
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='h-40 animate-pulse rounded-xl bg-rose-100' />
          <div className='h-40 animate-pulse rounded-xl bg-amber-100' />
        </div>
      </div>
    </>
  );
}
