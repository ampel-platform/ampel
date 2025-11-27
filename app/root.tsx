import React, { Suspense } from 'react';
import { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { BadRequest } from './error/BadRequest';
import { DefaultError } from './error/DefaultError';
import { Forbidden } from './error/Forbidden';
import { MaintenanceError } from './error/MaintenanceError';
import { NotFound } from './error/NotFound';
import { ServerError } from './error/ServerError';
import { Timeout } from './error/Timeout';
import { TooManyRequests } from './error/TooManyRequests';
import { Unauthorized } from './error/Unauthorized';
import styles from './tailwind.css?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
const isTest = (): boolean => {
  const inVite = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';
  const env =
    typeof globalThis === 'object'
      ? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
      : undefined;
  const inNode = env?.VITE_TEST_DATA_VIEW === 'test' || env?.NODE_ENV === 'test';

  return inVite || Boolean(inNode);
};

// eslint-disable-next-line import/no-default-export
export default function App(): React.ReactNode {
  return (
    <html lang='de'>
      <head>
        <title>LAMPE-CDSS</title>
        <Links />
        <meta charSet='utf-8' />
        <Meta />
      </head>
      <body className='w-screen overflow-x-hidden'>
        <div className='flex h-screen w-screen flex-row gap-x-20'>
          <div className='h-full w-full pl-4 pt-4'>
            <Suspense fallback={<div className='p-4 text-sm text-gray-500'>Lade Inhalte...</div>}>
              <Outlet />
              <ScrollRestoration />
            </Suspense>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

interface Ctx {
  retryAfterMs: number | null;
}

const DEFAULT_RETRY_AFTER_MS = 300000; // 5min

function parseRetryAfterMs(retryAfter: string | null | undefined): number | null {
  if (!retryAfter) return null;

  const numeric = Number(retryAfter);
  if (!Number.isNaN(numeric)) return Math.max(0, numeric) * 1000;

  const dateMs = Date.parse(retryAfter);
  if (!Number.isNaN(dateMs)) return Math.max(0, dateMs - Date.now());

  return null;
}

function extractRetryAfterMs(headers: Headers | Record<string, string> | undefined): number | null {
  if (!headers) return null;

  if (headers instanceof Headers) {
    return parseRetryAfterMs(headers.get('retry-after'));
  }

  return parseRetryAfterMs(headers['retry-after'] ?? headers['Retry-After']);
}

interface ErrorWithStatus {
  status: number;
  headers?: Headers | Record<string, string>;
}

function getHeadersFrom(err: unknown): Headers | Record<string, string> | undefined {
  if (!err || typeof err !== 'object' || !('headers' in err)) return undefined;

  const headers = (err as { headers?: unknown }).headers;
  if (headers instanceof Headers) return headers;
  if (headers && typeof headers === 'object') return headers as Record<string, string>;

  return undefined;
}

function hasStatus(err: unknown): err is ErrorWithStatus {
  if (!err || typeof err !== 'object' || !('status' in err)) return false;
  return typeof (err as { status?: unknown }).status === 'number';
}

function getHttpStatus(err: unknown): { status: number; retryAfterMs: number | null } | null {
  if (isRouteErrorResponse(err)) {
    return { status: err.status, retryAfterMs: extractRetryAfterMs(getHeadersFrom(err)) };
  }

  if (err instanceof Response) {
    return { status: err.status, retryAfterMs: extractRetryAfterMs(err.headers as Headers) };
  }

  if (hasStatus(err)) {
    const status = err.status;
    const retryAfterMs = extractRetryAfterMs(getHeadersFrom(err));
    return { status, retryAfterMs };
  }

  if (err instanceof Error) {
    const match = /HTTP Error:\s*(\d{3})/i.exec(err.message);
    if (match) return { status: Number(match[1]), retryAfterMs: null };
  }

  return null;
}

const byStatus: Partial<Record<number, (ctx: Ctx) => React.ReactNode>> = {
  400: () => <BadRequest />,
  422: () => <BadRequest />,
  401: () => <Unauthorized />,
  403: () => <Forbidden />,
  404: () => <NotFound />,
  410: () => <NotFound />,
  408: () => <Timeout />,
  429: ({ retryAfterMs }) => <TooManyRequests retryAfterMs={retryAfterMs} />,
  500: ({ retryAfterMs }) => <ServerError retryAfterMs={retryAfterMs} />,
  502: ({ retryAfterMs }) => <ServerError retryAfterMs={retryAfterMs} />,
  503: ({ retryAfterMs }) => <MaintenanceError retryAfterMs={retryAfterMs} />,
  504: ({ retryAfterMs }) => <ServerError retryAfterMs={retryAfterMs} />,
};

/**
 * Only provide a custom ErrorBoundary in production.
 * In dev, Remix’s error overlay will show because no ErrorBoundary is exported.
 */
export function ErrorBoundary(): React.ReactNode {
  if (import.meta.env.PROD || isTest()) {
    const err = useRouteError();

    const ctx = getHttpStatus(err);
    if (ctx) {
      const retryAfterMs = ctx.retryAfterMs ?? DEFAULT_RETRY_AFTER_MS;
      const view = byStatus[ctx.status];
      return view ? view({ retryAfterMs }) : <DefaultError />;
    }

    // Nicht-HTTP-Fehler: Netzwerk/CORS/abgebrochene Requests, Programmfehler
    return <DefaultError />;
  }
}
