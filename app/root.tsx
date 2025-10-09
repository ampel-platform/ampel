import { LinksFunction } from '@remix-run/node';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import type { JSX } from 'react';
import React from 'react';

import { ErrorBoundaryBody } from './ErrorBoundaryBody';
import styles from './tailwind.css?url';
import { getServerEnv } from './utils/env.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loader = () => json({ ENV: getServerEnv() });

// eslint-disable-next-line import/no-default-export
export default function App(): React.ReactNode {
  const { ENV } = useLoaderData<typeof loader>();
  return (
    <html lang='de'>
      <head>
        <title>AMPEL-CDSS</title>
        <Links />
        <meta charSet='utf-8' />
        <Meta />
      </head>
      <body className='w-screen overflow-x-hidden'>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)};`,
          }}
        />
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
