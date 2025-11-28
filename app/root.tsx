import React, { Suspense } from 'react';
import { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

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
