import { ReactNode } from 'react';
import { preload } from 'react-dom';

import LampeLogo from '../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../assets/UKL_Logo_Vektor.svg';

preload(LampeLogo, { as: 'image' });
preload(UklLogo, { as: 'image' });

interface CountdownProps {
  retryAfterMs: number | null;
  id?: string;
  updateMs?: number;
  log?: boolean;
}

/** Zeigt verbleibende Sekunden in ein <span> und aktualisiert per <script>. */
export function MaintenanceError({
  retryAfterMs = 30000,
  id = 'reload-countdown',
  updateMs = 250,
  log = false,
}: CountdownProps): ReactNode {
  const total = Math.max(0, Math.floor(retryAfterMs!));
  const initialSec = Math.max(0, Math.ceil(total / 1000));
  const js = `(function(){
    var end = Date.now() + ${total};
    var span = document.getElementById(${JSON.stringify(id)});
    if(!span) return;
    ${log ? 'console.log("Countdown gestartet: ' + initialSec + 's");' : ''}
    function tick(){
      var rem = Math.max(0, end - Date.now());
      var sec = Math.ceil(rem / 1000);
      span.textContent = String(sec);
      if(rem <= 0) window.location.reload();
      setTimeout(tick, ${Math.max(100, Math.floor(updateMs))});
    }
    tick();
  })();`;

  return (
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <title>LAMPE-CDSS</title>
      <meta charSet='utf-8' />
      <img src={UklLogo} width={300} alt='UKL Logo' />
      <br />
      <img src={LampeLogo} width={150} alt='Lampe Logo' />
      <h1>Wartungsfenster</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Geplante Wartung. Die Anwendung ist vorübergehend nicht verfügbar. Die Seite wird in{' '}
        <span id={id}>{initialSec}</span>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: js }} /> Sekunden
        automatisch neu geladen.
      </p>
      <br />
    </div>
  );
}
