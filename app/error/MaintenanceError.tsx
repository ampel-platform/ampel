import { ReactNode } from 'react';

import { Countdown } from './Countdown';
import { ErrorLayout } from './ErrorLayout';
import { errorHeadingStyle } from './errorStyles';

interface CountdownProps {
  retryAfterMs?: number | null;
  id?: string;
  updateMs?: number;
  log?: boolean;
}

/** Zeigt verbleibende Sekunden in ein <span> und aktualisiert per client-side timer. */
export function MaintenanceError({
  retryAfterMs = 30000,
  id = 'reload-countdown',
  updateMs = 250,
  log = false,
}: CountdownProps): ReactNode {
  return (
    <ErrorLayout>
      <title>LAMPE-CDSS</title>
      <meta charSet='utf-8' />
      <h1 style={errorHeadingStyle}>Wartungsfenster</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Geplante Wartung. Die Anwendung ist vorübergehend nicht verfügbar. Die Seite wird in{' '}
        <Countdown retryAfterMs={retryAfterMs} id={id} updateMs={updateMs} log={log} /> Sekunden
        automatisch neu geladen.
      </p>
      <br />
    </ErrorLayout>
  );
}
