import React, { useLayoutEffect, useMemo, useRef } from 'react';
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
import { formatDeBerlin } from './formatDate';
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
  height?: number;
}

interface TickProps {
  x: number;
  y: number;
  payload: { value: string | number | Date };
}

export function AlertChart({ transformedData: data, height }: AlertChartProps): React.ReactNode {
  const pxPerPoint = 80;
  const minWidth = 700;
  const chartWidth = useMemo(() => Math.max(minWidth, data.length * pxPerPoint), [data.length]);

  const scrollerRef = useRef<HTMLDivElement>(null);

  // initial scroll to right (and when data length changes)
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // eslint-disable-next-line no-undef
    const id = requestAnimationFrame(() => {
      el.scrollTo({ left: el.scrollWidth, behavior: 'auto' });
    });
    // eslint-disable-next-line no-undef, @typescript-eslint/explicit-function-return-type
    return () => cancelAnimationFrame(id);
  }, [data.length]);

  const DateTimeTick: React.FC<TickProps> = ({ x, y, payload }) => {
    const v = payload.value instanceof Date ? payload.value : new Date(payload.value);
    const [d, t] = formatDeBerlin(v).split(', ');
    return (
      <g transform={`translate(${x},${y})`}>
        <text textAnchor='middle' fontSize={12}>
          <tspan x={0} dy={0}>
            {d}
          </tspan>
          <tspan x={0} dy={14}>
            {t}
          </tspan>
        </text>
      </g>
    );
  };

  const scroll = data.length > 9;

  return (
    // if length of data is over 9 enable horizontal scroll
    <div
      ref={scrollerRef}
      className={`h-[${height ?? 475}px] w-full ${scroll ? 'overflow-x-auto' : 'overflow-x-hidden'}`}
    >
      <div style={{ width: chartWidth }}>
        <div
          className={`h-[${height ?? 475}px] w-full ${scroll ? 'overflow-x-auto' : 'overflow-x-hidden'}`}
        >
          <div style={{ width: chartWidth }}>
            <ResponsiveContainer width='100%' height={height ?? 475}>
              <ComposedChart data={data} margin={{ top: 30, right: 0, bottom: 0, left: 48 }}>
                <CartesianGrid stroke='#f5f5f5' />
                <Tooltip
                  formatter={(v) => [`${v} ${data[0].unit}`, data[0].analyteName]}
                  labelFormatter={(label, payload) => {
                    const raw = payload?.[0]?.payload?.date ?? label; // robust
                    const d = raw instanceof Date ? raw : new Date(raw);
                    return formatDeBerlin(d); // e.g. "23.06.2023, 09:57"
                  }}
                />

                <Line
                  name='Leitanalyt'
                  isAnimationActive={false}
                  yAxisId='right'
                  dataKey='analyteValue'
                  stroke='rgba(91, 33, 182, 0.7)'
                  dot={(props) => {
                    const { index } = props;
                    const isLast = index === data.length - 1;
                    const ampelStatus = props.points[index].payload.ampelStatus;

                    if (isLast) {
                      return (
                        <g key={`dot-${index}`}>
                          <circle
                            cx={props.cx}
                            cy={props.cy - 12}
                            r={5}
                            fill={ampelStatus === AmpelStatus.RED ? 'red' : 'white'}
                            stroke='black'
                            strokeWidth={1}
                          />
                          <polygon
                            points={`${props.cx},${props.cy - 5} ${props.cx - 6},${props.cy + 6} ${props.cx + 6},${props.cy + 6}`}
                            fill={ampelStatus === AmpelStatus.YELLOW ? 'yellow' : 'white'}
                            stroke='black'
                            strokeWidth={1}
                          />
                          <rect
                            x={props.cx - 5.5}
                            y={props.cy + 8}
                            width={11}
                            height={11}
                            fill={ampelStatus === AmpelStatus.GREEN ? 'limegreen' : 'white'}
                            stroke='black'
                            strokeWidth={1}
                          />
                        </g>
                      );
                    }
                    return (
                      <g key={`dot-${index}`}>
                        <StatusIcon
                          ampelStatus={ampelStatus}
                          cx={props.cx}
                          cy={props.cy}
                          index={index}
                        />
                      </g>
                    );
                  }}
                />

                <XAxis
                  dataKey='date'
                  tick={(props) => <DateTimeTick {...props} />}
                  height={60}
                  tickMargin={8}
                  padding={{ left: 20, right: 40 }}
                  interval={0}
                />
                {data.length > 9 && (
                  <YAxis
                    yAxisId='left'
                    dataKey='analyteValue'
                    domain={['dataMin - 15', 'dataMax + 25']}
                    tickCount={7}
                    label={{ value: data[0].unit, angle: 0, position: 'top', offset: 15 }}
                  />
                )}

                <YAxis
                  yAxisId='right'
                  orientation='right'
                  domain={['dataMin - 15', 'dataMax + 25']}
                  tickCount={7}
                  label={{ value: data[0].unit, angle: 0, position: 'top', offset: 15 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
