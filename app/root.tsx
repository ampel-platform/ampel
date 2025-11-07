import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import type { JSX } from 'react';
import React from 'react';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';
import styles from './tailwind.css?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

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

/**
 * Only provide a custom ErrorBoundary in production.
 * In dev, Remix’s error overlay will show because no ErrorBoundary is exported.
 */
let ErrorBoundaryImpl: undefined | (() => JSX.Element);
if (!import.meta.env.PROD) {
  // TODO: Next Step clean up and add
  // if (isRouteErrorResponse(err)) {
  //   switch (err.status) {
  //     case 400: return <BadRequest/>;
  //     case 401: return <Unauthorized/>;
  //     case 403: return <Forbidden/>;
  //     case 404: return <NotFound/>;            // deine 404-Seite
  //     case 408: return <Timeout/>;
  //     case 409: return <Conflict/>;
  //     case 410: return <Gone/>;
  //     case 412: return <PreconditionFailed/>;
  //     case 415: return <UnsupportedMediaType/>;
  //     case 422: return <Validation data={err.data}/>;
  //     case 429: return <TooManyRequests retryAfter={err.headers.get("Retry-After")}/>;
  //     case 500: return <ServerError/>;
  //     case 502: return <BadGateway/>;
  //     case 503: return <ServiceUnavailable retryAfter={err.headers.get("Retry-After")}/>;
  //     case 504: return <GatewayTimeout/>;
  //     default:  return <HttpError status={err.status}/>;
  //   }
  // }
  // // Nicht-HTTP-Fehler: Netzwerk/CORS/abgebrochene Requests, Programmfehler
  // return <CrashPage/>;
  ErrorBoundaryImpl = function ErrorBoundary(): JSX.Element {
    const error = useRouteError();
    return ErrorBoundaryBody(isRouteErrorResponse(error), error);
  };
}
export { ErrorBoundaryImpl as ErrorBoundary };
