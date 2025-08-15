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

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  return ErrorBoundaryBody(isRouteErrorResponse(error), error);
}
