import { type JSX } from 'react';

import LampeLogo from '../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../assets/UKL_Logo_Vektor.svg';
/**
 * Renders an error boundary body component.
 *
 * @param {boolean} isRouteErrorResponse - Indicates whether the error is a route error response.
 * @param {any} error - The error to be displayed.
 * @returns {JSX.Element} The rendered error boundary body component.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

const contactEmail = 'lampe@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

export function ErrorBoundaryBody(isRouteErrorResponse: boolean, error: any): JSX.Element {
  if (
    error.status === 500 ||
    error.status === 501 ||
    error.status === 502 ||
    error.status === 503 ||
    error.status === 504
  ) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
        <h1>Wartungsfenster</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Geplante Wartung. Die Anwendung ist voruebergehend nicht verfuegbar. Bitte versuchen Sie
          es in 2 Stunden erneut.
        </p>
        <br />
        <details className='mt-4'>
          <summary className='cursor-pointer list-none text-sm underline hover:no-underline'>
            Helfen Sie uns bei Rueckfragen
          </summary>
          <div className='mt-3 space-y-1'>
            <p className='whitespace-nowrap'>{contactEmail}</p>
            <p className='whitespace-nowrap'>
              {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
            </p>
          </div>
        </details>
      </div>
    );
  }
  if (error?.status === 429 || error?.status === 408) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
        <h1>Die Anfrage hat zu lange gedauert</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Anfrage zu langsam oder unterbrochen.
        </p>
        <br />
      </div>
    );
  }
  if (error?.status === 403) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
        <h1>Fehlende Berechtigungen</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Sie haben keine Berechtigung, diese Seite zu sehen.
        </p>
        <br />
      </div>
    );
  }
  if (error?.status === 400) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
        <h1>Unter der Fallnummer wurde nichts gefunden</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Ungültige oder Fehlende Fallnummer
        </p>
        <br />
      </div>
    );
  }
  if (error?.status === 404) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
        <h1>Der Patient wurde nicht gefunden</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Bitte gleichen Sie die Fallnummer mit der Zustandsanzeige im KIS ab. Pruefen Sie, ob zu
          dieser Fallnummer ein Patient gefuehrt wird und ein LAMPE-Ergebnis (gruen, gelb oder rot)
          vorliegt.
        </p>
        <br />

        <details className='mt-4'>
          <summary className='cursor-pointer list-none text-sm underline hover:no-underline'>
            Kontakt aufnehmen, falls im KIS ein LAMPE-Ergebnis vorliegt.
          </summary>
          <div className='mt-3 space-y-1'>
            <p>
              Danke das sie uns darauf hinweisen das Problem vorliegt, indem Sie den Vorfall
              melden:{' '}
            </p>
            <p className='whitespace-nowrap'>{contactEmail}</p>
            <p className='whitespace-nowrap'>
              {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
            </p>
          </div>
        </details>
      </div>
    );
  }
  if (isRouteErrorResponse) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
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
        <img src={UklLogo} width={300} alt='UKL Logo' />
        <br />
        <img src={LampeLogo} width={150} alt='Lampe Logo' />
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
      <img src={UklLogo} width={300} alt='UKL Logo' />
      <br />
      <img src={LampeLogo} width={150} alt='Lampe Logo' />
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
