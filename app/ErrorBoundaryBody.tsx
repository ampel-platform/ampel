import type { JSX } from 'react';

import Logo from '../assets/UKL_Logo_Vektor.svg';
/**
 * Renders an error boundary body component.
 *
 * @param {boolean} isRouteErrorResponse - Indicates whether the error is a route error response.
 * @param {any} error - The error to be displayed.
 * @returns {JSX.Element} The rendered error boundary body component.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

const contactEmail = 'ampel@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

export function ErrorBoundaryBody(isRouteErrorResponse: boolean, error: any): JSX.Element {
  if (isRouteErrorResponse) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={Logo} width={300} alt='UKL Logo' />
        <h1>Unerwartete Ansicht</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
          ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte
          helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
        </p>

        <p className='whitespace-nowrap'>{contactEmail}</p>

        <p className='whitespace-nowrap'>
          {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
        </p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={Logo} width={300} alt='UKL Logo' />
        <h1>Unerwartete Ansicht</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
          ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte
          helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
        </p>

        <p className='whitespace-nowrap'>{contactEmail}</p>

        <p className='whitespace-nowrap'>
          {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
        </p>
      </div>
    );
  }
  return (
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <img src={Logo} width={300} alt='UKL Logo' />
      <h1>Unerwartete Ansicht</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
        ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte helfen
        Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
      </p>

      <p className='whitespace-nowrap'>{contactEmail}</p>

      <p className='whitespace-nowrap'>
        {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
      </p>
    </div>
  );
}
