import React from 'react';
import { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { BadRequest } from './error/BadRequest';
import { DefaultError } from './error/DefaultError';
import { Forbidden } from './error/Forbidden';
import { MaintenanceError } from './error/MaintenanceError';
import { NotFound } from './error/NotFound';
import { Timeout } from './error/Timeout';
import { TooManyRequests } from './error/TooManyRequests';
import { Unauthorized } from './error/Unauthorized';
import styles from './tailwind.css?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
const isTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';

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
            <Outlet />
            <ScrollRestoration />
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
const byStatus: Partial<Record<number, (ctx: Ctx) => React.ReactNode>> = {
  400: () => <BadRequest />,
  401: () => <Unauthorized />,
  403: () => <Forbidden />,
  404: () => <NotFound />,
  408: () => <Timeout />,
  429: ({ retryAfterMs }) => <TooManyRequests retryAfterMs={retryAfterMs} />,
  503: ({ retryAfterMs }) => <MaintenanceError retryAfterMs={retryAfterMs} />,
};

/**
 * Only provide a custom ErrorBoundary in production.
 * In dev, Remix’s error overlay will show because no ErrorBoundary is exported.
 */
export function ErrorBoundary(): React.ReactNode {
  if (import.meta.env.PROD || isTest) {
    const err = useRouteError();

    if (isRouteErrorResponse(err)) {
      const retryAfterMs = 300000; //5min
      const view = byStatus[err.status];
      return view ? view({ retryAfterMs }) : <DefaultError />;
    }

    // Nicht-HTTP-Fehler: Netzwerk/CORS/abgebrochene Requests, Programmfehler
    return <DefaultError />;
  }
}
