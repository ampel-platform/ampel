import { AmpelStatus } from '../../types/types';
import { StatusIcon } from './StatusIcon';

interface AlertTableDataPoint {
  date: Date;
  analyteValue: number;
  ampelStatus: AmpelStatus;
  ampelStatusFillColor: string;
  unit: string;
  analyteValueName: string;
}

interface AlertTableProps {
  transformedData: AlertTableDataPoint[];
}

/**
 * A table component to display a list of analyte values with their respective ampel status.
 * The table will show the date, analyte value, and ampel status for each row in the given data.
 * The ampel status is represented by a colored circle and the status number.
 * The color of the circle is determined by the status number (1 = red, 2 = yellow, 3 = green).
 * The table will be scrollable if there are more rows than can fit in the given space.
 * @param {{ transformedData: AlertTableDataPoint[] }} props
 * @returns {React.ReactNode }
 */
// eslint-disable-next-line no-undef
export function AlertTable({ transformedData }: AlertTableProps): React.ReactNode {
  function formatDate(date: Date): string {
    return date.toLocaleString('de-DE', { hour12: false, timeZone: 'Europe/Berlin' });
  }

  const sortedData = [...transformedData].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className='pr-12'>
      <div className='w-full overflow-auto rounded-xl border border-gray-200 shadow-sm'>
        <table className='min-w-full divide-y divide-gray-200 text-sm'>
          <thead className='bg-gray-50 text-left'>
            <tr>
              <th className='px-6 py-3 font-medium text-gray-700'>
                Datum & Uhrzeit des Messzeitpunktes
              </th>
              <th className='px-6 py-3 font-medium text-gray-700'>Analyt</th>
              <th className='px-6 py-3 font-medium text-gray-700'>Wert ({transformedData[0].unit})</th>
              <th className='px-6 py-3 font-medium text-gray-700'>Status</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {sortedData.map((row, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td className='whitespace-nowrap px-6 py-4 text-gray-900'>
                  {formatDate(row.date)}
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-gray-900'>{row.analyteValueName}</td>
                <td className='whitespace-nowrap px-6 py-4 text-gray-900'>{row.analyteValue}</td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='flex items-center gap-2'>
                    <div className={`h-3 w-3 rounded-full ${row.ampelStatusFillColor}`} />
                    <svg width={14} height={14}>
                      <StatusIcon ampelStatus={row.ampelStatus} cx={7} cy={7} index={0} />
                    </svg>
                    <span className='text-gray-700'>
                    {row.ampelStatus === 1 && <span>Normal</span>}
                    {row.ampelStatus === 2 && <span>Warnung</span>}
                    {row.ampelStatus === 3 && <span>Kritisch</span>}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{' '}
    </div>
  );
}
