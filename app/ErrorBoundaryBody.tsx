import Logo from '../assets/ampel-logo.svg';
const SUPPORT_MAIL = 'ampel@medizin.uni-leipzig.de';

/**
 * Renders an error boundary body component.
 *
 * @param {boolean} isRouteErrorResponse - Indicates whether the error is a route error response.
 * @param {any} error - The error to be displayed.
 * @returns {JSX.Element} The rendered error boundary body component.
 */
export function ErrorBoundaryBody(isRouteErrorResponse: boolean, error: any) {
  const subject = 'AMPEL-CDSS-Fehler';
  if (isRouteErrorResponse) {
    const body = `Fehler: ${error.status} ${error.statusText}\n\n${error.data} : ${error.stack}`;
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={Logo} width={300} alt='AMPEL Logo' />
        <h1>Unerwartete Ansicht</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
          ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte
          helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
        </p>
        <a href={`mailto:${SUPPORT_MAIL}?subject=${subject}&body=${body}`}>E-Mail an Support</a>
      </div>
    );
  } else if (error instanceof Error) {
    const body = `Fehler: ${error.message} \n\n ${error.stack}`;
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={Logo} width={300} alt='AMPEL Logo' />
        <h1>Unerwartete Ansicht</h1>
        <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
          Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
          ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte
          helfen Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
        </p>
        <a href={`mailto:${SUPPORT_MAIL}?subject=${subject}&body=${body}`}>E-Mail an Support</a>
      </div>
    );
  }
  const body = `Fehler: ${error} \n\n ${error.stack} \n\n ${error.message} \n\n ${error.data} \n\n ${error.statusText}`;
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={Logo} width={300} alt='AMPEL Logo' />
      <h1>Unerwartete Ansicht</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
        ist moeglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte helfen
        Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
      </p>
      <a href={`mailto:${SUPPORT_MAIL}?subject=${subject}&body=${body}`}>E-Mail an Support</a>
    </div>
  );
}
