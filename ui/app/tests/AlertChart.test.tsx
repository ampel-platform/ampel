import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';

import { AlertChart } from '../pages/alerts/components/components/AlertChart';
import { AmpelStatus } from '../pages/alerts/types/types';

vi.mock('recharts', async () => {
  const React = await import('react');
  const { AmpelStatus } = await import('../pages/alerts/types/types');

  return {
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='responsive'>{children}</div>
    ),
    CartesianGrid: () => <div data-testid='grid' />,
    Tooltip: (props: {
      formatter?: (v: unknown) => [string, string];
      labelFormatter?: (label: unknown, payload?: unknown) => string;
    }) => {
      const label = props.labelFormatter?.('2024-01-01T00:00:00.000Z', [
        { payload: { date: new Date('2024-01-01T00:00:00.000Z') } },
      ]);
      const formatted = props.formatter?.(42);
      return (
        <div data-testid='tooltip'>
          <span data-testid='tooltip-label'>{label}</span>
          <span data-testid='tooltip-value'>{formatted?.[0]}</span>
          <span data-testid='tooltip-name'>{formatted?.[1]}</span>
        </div>
      );
    },
    ComposedChart: ({
      data,
      children,
    }: {
      data: unknown[];
      children: React.ReactNode | React.ReactNode[];
    }) => (
      <div data-testid='composed-chart'>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { __dataLength: data?.length })
            : child,
        )}
      </div>
    ),
    Line: (props: {
      dot?: (p: { index: number; cx: number; cy: number; points?: unknown[] }) => React.ReactNode;
      yAxisId?: string;
      __dataLength?: number;
    }) => {
      const length = props.__dataLength ?? 1;
      const points = Array.from({ length }, (_, idx) => ({
        payload: { ampelStatus: idx === length - 1 ? AmpelStatus.YELLOW : AmpelStatus.GREEN },
      }));
      const dots = props.dot
        ? [
            props.dot({ index: 0, cx: 10, cy: 20, points }),
            props.dot({ index: length - 1, cx: 15, cy: 25, points }),
          ]
        : null;
      return (
        <svg data-testid='line' data-yaxis={props.yAxisId}>
          {dots}
        </svg>
      );
    },
    XAxis: (props: {
      tick?: (p: { x: number; y: number; payload: { value: Date } }) => React.ReactNode;
    }) => {
      const tickContent = props.tick?.({
        x: 0,
        y: 0,
        payload: { value: new Date('2024-03-03T03:00:00Z') },
      });
      return (
        <div data-testid='x-axis'>
          <svg>{tickContent}</svg>
        </div>
      );
    },
    YAxis: (props: { yAxisId?: string; label?: { value?: string } }) => (
      <div data-testid={`y-axis-${props.yAxisId}`} data-label={props.label?.value} />
    ),
  };
});

const originalScrollTo = Element.prototype.scrollTo;
const originalRAF = globalThis.requestAnimationFrame;
const originalCAF = globalThis.cancelAnimationFrame;

beforeAll(() => {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
    cb(0);
    return 1 as unknown as number;
  }) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = vi.fn();
  if (!Element.prototype.scrollTo) {
    Element.prototype.scrollTo = vi.fn();
  }
});

afterAll(() => {
  globalThis.requestAnimationFrame = originalRAF;
  globalThis.cancelAnimationFrame = originalCAF;
  if (originalScrollTo) {
    Element.prototype.scrollTo = originalScrollTo;
  } else {
    // @ts-expect-error
    delete Element.prototype.scrollTo;
  }
});

const buildData = (count: number) =>
  Array.from({ length: count }, (_, idx) => ({
    date: new Date(`2024-01-${String(idx + 1).padStart(2, '0')}T00:00:00Z`),
    analyteValue: idx + 1,
    ampelStatus: idx === count - 1 ? AmpelStatus.YELLOW : AmpelStatus.GREEN,
    ampelStatusFillColor: '#0f0',
    unit: 'mg/l',
    analyteName: 'Leitanalyt',
  }));

describe('AlertChart', () => {
  it('renders an empty state when no data is present', () => {
    render(<AlertChart transformedData={[]} height={300} />);

    expect(screen.getByText(/Keine Messwerte vorhanden/i)).toBeInTheDocument();
  });

  it('renders a scrollable chart for longer histories and formats ticks/tooltip', () => {
    const data = buildData(10);

    const { container } = render(<AlertChart transformedData={data} height={320} />);

    expect(screen.getByTestId('composed-chart')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis-left')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis-right')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-value').textContent).toContain('mg/l');
    expect(screen.getByTestId('tooltip-name').textContent).toContain('Leitanalyt');
    expect(screen.getByTestId('tooltip-label').textContent).toContain('01.01.2024');
    expect(screen.getByText(/03\.03\.2024/)).toBeInTheDocument();
    expect(container.querySelectorAll('g').length).toBeGreaterThan(0);
  });
});
