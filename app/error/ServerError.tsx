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
export function ServerError({
  retryAfterMs = 30000,
  id = 'reload-countdown',
  updateMs = 250,
  log = false,
}: CountdownProps): ReactNode {
  return (
    <ErrorLayout>
      <title>LAMPE-CDSS</title>
      <meta charSet='utf-8' />
      <h1 style={errorHeadingStyle}>System nicht erreichbar</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Die LAMPE ist aktuell nicht erreichbar. In{' '}
        <Countdown retryAfterMs={retryAfterMs} id={id} updateMs={updateMs} log={log} /> Sekunden
        wird eine erneute Verbindung aufgebaut. Nehmen sie Kontakt mit uns auf, falls das Problem
        weiterhin besteht oder wiederholt auftritt.
      </p>
      <br />
    </ErrorLayout>
  );
}
