import { KolTableStateless } from '@public-ui/react-v19';
import type { CSSProperties, ReactElement } from 'react';

import { AmpelStatus } from '../../types/types';
import { badgeForAmpelStatus } from '../utils/status';
import { formatDeBerlin } from './formatDate';

interface AlertTableDataPoint {
  date: Date;
  analyteValue: number;
  ampelStatus: AmpelStatus;
  ampelStatusFillColor: string;
  unit: string;
  analyteName: string;
}

interface AlertTableProps {
  transformedData: AlertTableDataPoint[];
  height?: number;
}

/**
 * Tabelle der Messwerte mit Ampelstatus, neueste zuerst.
 */
export function AlertTable({ transformedData, height }: AlertTableProps): ReactElement {
  const sortedData = [...transformedData].sort((a, b) => b.date.getTime() - a.date.getTime());
  const unit = transformedData[0]?.unit ?? '';

  const data = sortedData.map((row) => {
    const badge = badgeForAmpelStatus(row.ampelStatus);
    return {
      id: `${row.date.toISOString?.() ?? row.date}-${row.analyteName}`,
      date: formatDeBerlin(row.date),
      analyte: row.analyteName,
      value: `${row.analyteValue} ${row.unit}`,
      status: [{ type: 'badge', _label: badge.label, _color: badge.color }],
    };
  });

  return (
    // Die Höhe geht als Variable an KoliBris eigenen Scroll-Container. Ein eigener
    // overflow-Wrapper würde dessen außen liegenden Fokusrahmen abschneiden.
    <div
      className='w-full'
      style={height ? ({ '--kol-table-max-height': `${height}px` } as CSSProperties) : undefined}
    >
      <KolTableStateless
        _label='Messwerte im Verlauf'
        _headers={{
          horizontal: [
            [
              { label: 'Messzeitpunkt', key: 'date', width: 180 },
              { label: 'Analyt', key: 'analyte', width: 160 },
              { label: `Wert (${unit})`, key: 'value', textAlign: 'right', width: 140 },
              { label: 'Status', key: 'status', type: 'state', width: 130 },
            ],
          ],
        }}
        _data={data}
      />
    </div>
  );
}
