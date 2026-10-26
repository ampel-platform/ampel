/* eslint-env browser */
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  retryAfterMs?: number | null;
  id?: string;
  updateMs?: number;
  log?: boolean;
}

export function Countdown({
  retryAfterMs = 30000,
  id = 'reload-countdown',
  updateMs = 250,
  log = false,
}: CountdownProps): React.ReactNode {
  const totalMs = Math.max(0, Math.floor(retryAfterMs ?? 0));
  const stepMs = Math.max(100, Math.floor(updateMs ?? 0));
  const [remainingMs, setRemainingMs] = useState<number>(totalMs);

  useEffect(() => {
    const globalWindow =
      typeof globalThis.window === 'undefined' ? undefined : (globalThis.window as Window);
    if (!globalWindow) return;
    if (log) {
      globalWindow.console?.log(`Countdown gestartet: ${Math.ceil(totalMs / 1000)}s`);
    }

    const reload = (): void => globalWindow.location.reload();
    if (totalMs <= 0) {
      reload();
      return;
    }

    const end = Date.now() + totalMs;
    let timer: number | undefined;

    const tick = (): void => {
      const rem = Math.max(0, end - Date.now());
      setRemainingMs(rem);
      if (rem <= 0) {
        reload();
        return;
      }
      timer = globalWindow.setTimeout(tick, stepMs);
    };

    timer = globalWindow.setTimeout(tick, stepMs);

    return (): void => {
      if (timer !== undefined) globalWindow.clearTimeout(timer);
    };
  }, [log, stepMs, totalMs]);

  const displaySec = Math.max(0, Math.ceil(remainingMs / 1000));
  return <span id={id}>{displaySec}</span>;
}
