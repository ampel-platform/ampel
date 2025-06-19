import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';
import styles from './tailwind.css?url';
import React from 'react';
import Sidebar from './components/nav/Sidebar';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>AMPEL-CDSS</title>
        <Links />
        <meta charSet="utf-8" />
        <Meta />
      </head>
      <body className="w-screen overflow-x-hidden">
        <div className="w-screen h-screen flex flex-row gap-x-20">
          <Sidebar />
          <div className="w-full h-full pt-4 pl-4">
            <Outlet />
            <ScrollRestoration />
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
