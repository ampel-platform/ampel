import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';
import Logo from '../assets/ampel-logo.svg';
import React from 'react';

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

const SUPPORT_MAIL = 'ampel@medizin.uni-leipzig.de';



export function ErrorBoundary() {
  const error = useRouteError();

  return ErrorBoundaryBody(isRouteErrorResponse(error), error);
}

export function ErrorBoundaryBody(isRouteErrorResponse: boolean, error: any) {
  const subject = 'AMPEL-CDSS-Fehler';
  if (isRouteErrorResponse) {
    const body = `Fehler: ${error.status} ${error.statusText}\n\n${error.data} : ${error.stack}`;
    return (
     <div style={{ textAlign: 'center' }}>
        <img src={Logo} width={300} alt="AMPEL Logo" />
          <h1>Unerwartete Ansicht</h1>
          <p style={{ maxWidth: '600px' , width: 'fit-content', margin: 'auto'}}>
            Diese Seite sollte im regulearen Ablauf nicht erscheinen.
            Falls Sie diesen Hinweis sehen, ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten.
            Bitte helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
          </p>
        <a
          href={`mailto:${SUPPORT_MAIL}?subject=${subject}&body=${body}`}
        >
          E-Mail an Support
        </a>
      </div>  
    );
  } else if (error instanceof Error) {
    const body = `Fehler: ${error.message} \n\n ${error.stack}`;
    return (
    <div style={{ textAlign: 'center' }}>
        <img src={Logo} width={300} alt="AMPEL Logo" />
          <h1>Unerwartete Ansicht</h1>
          <p style={{ maxWidth: '600px' , width: 'fit-content', margin: 'auto'}}>
            Diese Seite sollte im regulearen Ablauf nicht erscheinen.
            Falls Sie diesen Hinweis sehen, ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten.
            Bitte helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
          </p>
        <a
          href={`mailto:${SUPPORT_MAIL}?subject=${subject}&body=${body}`}
        >
          E-Mail an Support
        </a>
      </div>  
    );
  } else {
    const body = `Fehler: ${error} \n\n ${error.stack} \n\n ${error.message} \n\n ${error.data} \n\n ${error.statusText}`;
     return (<div style={{ textAlign: 'center' }}>
          <img src={Logo} width={300} alt="AMPEL Logo" />
            <h1>Unerwartete Ansicht</h1>
            <p style={{ maxWidth: '600px' , width: 'fit-content', margin: 'auto'}}>
              Diese Seite sollte im regulearen Ablauf nicht erscheinen.
              Falls Sie diesen Hinweis sehen, ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten.
              Bitte helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
            </p>
          <a
            href={`mailto:${SUPPORT_MAIL}?subject=${subject}&body=${body}`}
          >
            E-Mail an Support
          </a>
        </div>) ; 
  }

}

