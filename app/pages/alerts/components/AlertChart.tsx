import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { AmpelStatus } from '../types';
import StatusIcon from './StatusIcon';

type DataPoint = {
  date: string;
  analyteValue: number;
  ampelStatus: AmpelStatus;
  ampelStatusFillColor: string;
};

type AlertChartProps = {
  transformedData: DataPoint[];
};

export default function AlertChart({ transformedData }: AlertChartProps) {
  return (
    <div className='flex flex-col gap-y-4'>
      <span className='font-medium text-gray-600'>Leitanalyt</span>
      <ResponsiveContainer width='100%' aspect={4}>
        <ComposedChart
          width={500}
          height={400}
          data={transformedData}
          margin={{ top: 20, right: 60, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <Tooltip />
          <Line
            name='Leitanalyt'
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
                      cx={props.cx}
                      cy={props.cy - 12}
                      r={5}
                      fill={ampelStatus === 1 ? 'red' : 'white'}
                      stroke='black'
                      strokeWidth={1}
                    />
                    <polygon
                      points={`${props.cx},${props.cy - 5} ${props.cx - 6},${props.cy + 6} ${props.cx + 6},${props.cy + 6}`}
                      fill={ampelStatus === 2 ? 'yellow' : 'white'}
                      stroke='black'
                      strokeWidth={1}
                    />
                    <rect
                      x={props.cx - 5.5}
                      y={props.cy + 8}
                      width={11}
                      height={11}
                      fill={ampelStatus === 3 ? 'limegreen' : 'white'}
                      stroke='black'
                      strokeWidth={1}
                    />
                  </>
                );
              }

              return (
                <StatusIcon ampelStatus={ampelStatus} cx={props.cx} cy={props.cy} index={index} />
              );
            }}
          />

          <XAxis
            dataKey='date'
            padding={{ right: 100 }}
            label={{ value: 'Datum', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            yAxisId='value'
            dataKey='analyteValue'
            label={{ value: 'μl/mol', angle: 45, position: 'insideLeft' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
