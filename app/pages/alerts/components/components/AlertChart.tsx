import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AmpelStatus } from '../../types/types';
import { StatusIcon } from './StatusIcon';

interface AlertChartDataPoint {
  date: Date;
  analyteValue: number;
  ampelStatus: AmpelStatus;
  ampelStatusFillColor: string;
  unit: string;
  analyteName: string;
}

interface AlertChartProps {
  transformedData: AlertChartDataPoint[];
}

/**
 * Renders an alert chart displaying analyte values over time with respective ampel statuses.
 * The chart includes a line plot with customized icons representing the ampel status at each data point.
 * The last data point is highlighted with specific shapes based on the ampel status:
 * - Red circle for status 1
 * - Yellow triangle for status 2
 * - Green square for status 3
 * The chart is responsive and includes tooltips, grid lines, and labeled axes.
 *
 * @param {Object} props - The component props
 * @param {AlertChartDataPoint[]} props.transformedData - Array of data points to be plotted
 * @returns {React.ReactNode } The rendered alert chart component
 */

// eslint-disable-next-line no-undef
export function AlertChart({ transformedData }: AlertChartProps): React.ReactNode {
  return (
    <div className='flex w-full flex-col gap-y-4'>
      <span className='font-medium text-gray-600'>{transformedData[0].analyteName}</span>
      <ResponsiveContainer width='100%' height={400}>
        <ComposedChart
          width={500}
          height={400}
          data={transformedData}
          margin={{ top: 20, right: 60, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <Tooltip 
            formatter={(value) => [`${value} ${transformedData[0].unit}`, transformedData[0].analyteName]} 
            />
          <Line
            name={'Leitanalyt'}
            isAnimationActive={false}
            yAxisId='value'
            dataKey='analyteValue'
            stroke='rgba(91, 33, 182, 0.7)'
            dot={(props) => {
              const { index } = props;
              const isLastPoint = index === transformedData.length - 1;
              const ampelStatus = props.points[index].payload.ampelStatus;

              if (isLastPoint) {
                return (
                  <>
                    <circle
                      key={`last-circle-${index}`}
                      cx={props.cx}
                      cy={props.cy - 12}
                      r={5}
                      fill={ampelStatus === AmpelStatus.RED ? 'red' : 'white'}
                      stroke='black'
                      strokeWidth={1}
                    />
                    <polygon
                      key={`last-triangle-${index}`}
                      points={`${props.cx},${props.cy - 5} ${props.cx - 6},${props.cy + 6} ${props.cx + 6},${props.cy + 6}`}
                      fill={ampelStatus === AmpelStatus.YELLOW ? 'yellow' : 'white'}
                      stroke='black'
                      strokeWidth={1}
                    />
                    <rect
                      key={`last-square-${index}`}
                      x={props.cx - 5.5}
                      y={props.cy + 8}
                      width={11}
                      height={11}
                      fill={ampelStatus === AmpelStatus.GREEN ? 'limegreen' : 'white'}
                      stroke='black'
                      strokeWidth={1}
                    />
                  </>
                );
              }

              return (
                <StatusIcon key={`status-icon-${index}`} ampelStatus={ampelStatus} cx={props.cx} cy={props.cy} index={index} />
              );
            }}
          />

          <XAxis
            dataKey='date'
            padding={{ right: 100 }}
            label={{ value: 'Datum', position: 'insideBottomRight', offset: -5 }}
            tickFormatter={(date: Date) =>
              date instanceof Date
                ? date.toLocaleString('de-DE', { hour12: false, timeZone: 'Europe/Berlin' })
                : String(date)
            }
          />
          <YAxis
            yAxisId='value'
            dataKey='analyteValue'
            label={{ value: transformedData[0].unit, angle: 45, position: 'insideLeft' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
