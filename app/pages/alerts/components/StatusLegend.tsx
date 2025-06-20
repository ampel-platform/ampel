import React from 'react';

import StatusIcon from './StatusIcon';

export default function StatusLegend() {
  return (
    <div className='mt-2 flex flex-col items-start gap-2 text-xs text-gray-600 mr-14'>
      {[1, 2, 3].map((status) => (
        <div key={status} className='flex items-center gap-1'>
          {/* Dummy cx/cy so the icon renders outside charts */}
          <svg width={14} height={14}>
            <StatusIcon ampelStatus={status} cx={7} cy={7} index={0} />
          </svg>
          {status === 1 && <span>Rot = Kritisch</span>}
          {status === 2 && <span>Gelb = Warnung</span>}
          {status === 3 && <span>Grün = Normal</span>}
        </div>
      ))}
    </div>
  );
}
