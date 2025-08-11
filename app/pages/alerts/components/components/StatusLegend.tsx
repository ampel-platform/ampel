import React from 'react';

import { StatusIcon } from './StatusIcon';

/**
 * Renders a legend for the status icons used in the application.
 * The legend displays three different statuses:
 * - Red (Rot) for Critical (Kritisch)
 * - Yellow (Gelb) for Warning (Warnung)
 * - Green (Grün) for Normal
 * Each status is accompanied by an icon generated using the StatusIcon component.
 * This component helps users understand the meaning of the status icons
 * that appear in charts and other visualizations.
 */

export function StatusLegend(): React.ReactNode {
  return (
    <div className='mr-14 mt-2 flex flex-col items-start gap-2 text-xs text-gray-600'>
      {[1, 2, 3].map((status) => (
        <div key={status} className='flex items-center gap-1'>
          {/* Dummy cx/cy so the icon renders outside charts */}
          <svg width={14} height={14}>
            <StatusIcon ampelStatus={status} cx={7} cy={7} index={0} />
          </svg>
          {status === 1 && <span>Grün = Normal</span>}
          {status === 2 && <span>Gelb = Warnung</span>}
          {status === 3 && <span>Rot = Kritisch</span>}
        </div>
      ))}
    </div>
  );
}
