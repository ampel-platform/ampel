import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import React from 'react';
import {
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import styles from './tailwind.css?url';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

// eslint-disable-next-line import/no-default-export
export default function App(): React.ReactNode {
  return (
    <html lang='en'>
      <head>
        <title>AMPEL-CDSS</title>
        <Links />
        <meta charSet='utf-8' />
        <Meta />
      </head>
      <body className='w-screen overflow-x-hidden'>
        <div className='flex h-screen w-screen flex-row gap-x-20'>
          {/* <Sidebar /> */} {/* disabled but will be in future important for admin dashboard*/}
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




export function ErrorBoundary() {
  const error = useRouteError();

  ErrorBoundaryBody(isRouteErrorResponse(error), error);
}

export function ErrorBoundaryBody(isRouteErrorResponse: boolean, error: any) {
  if (isRouteErrorResponse) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
