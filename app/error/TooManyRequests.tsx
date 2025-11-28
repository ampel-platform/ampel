import React from 'react';

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
export function TooManyRequests({
  retryAfterMs = 30000,
  id = 'reload-countdown',
  updateMs = 250,
  log = false,
}: CountdownProps): React.ReactNode {
  return (
    <ErrorLayout>
      <title>LAMPE-CDSS</title>
      <meta charSet='utf-8' />
      <h1 style={errorHeadingStyle}>Die Anfrage hat zu lange gedauert</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Anfrage zu langsam oder unterbrochen. Die Seite wird in{' '}
        <Countdown retryAfterMs={retryAfterMs} id={id} updateMs={updateMs} log={log} /> Sekunden
        automatisch neu geladen
      </p>
      <br />
    </ErrorLayout>
  );
}
