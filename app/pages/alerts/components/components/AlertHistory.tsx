import { useEffect, useState } from 'react';

import { AmpelStatus, RulesetHistory } from '../../types/types';
import { AlertChart } from './AlertChart';
import { AlertTable } from './AlertTable';
import { StatusLegend } from './StatusLegend';
import { Switcher } from './Switcher';

interface AlertHistoryProps {
  history: RulesetHistory;
}

/**
 * A component to display a history of alerts for a given ruleset.
 *
 * @param {{ history: RulesetHistory }} props
 * @prop {RulesetHistory} history - The history object containing alert data for the ruleset.
 * @returns {React.ReactNode } The rendered alert history component.
 */
// eslint-disable-next-line no-undef
export function AlertHistory({ history }: AlertHistoryProps): React.ReactNode {
  const convertAmpelStatusToFillColor = (status: AmpelStatus): string => {
    switch (status) {
      case AmpelStatus.RED:
        return 'rgba(251, 207, 232, 0.7)';
      case AmpelStatus.YELLOW:
        return 'rgba(254, 243, 199, 0.7)';
      case AmpelStatus.GREEN:
        return 'rgba(243, 244, 246, 0.7)';
    }
  };

  const transformedData = history.data
    .sort((a, b) => {
      if (a.date.getTime() === b.date.getTime()) {
        return 0;
      } else if (a.date.getTime() < b.date.getTime()) {
        return -1;
      }
      return 1;
    })
    .map((h) => {
      return {
        date: h.date,
        analyteValue: h.analyteValue,
        ampelStatus: h.ampelStatus,
        ampelStatusFillColor: convertAmpelStatusToFillColor(h.ampelStatus),
        unit: history.data[0].unit,
        analyteName: h.analyteName,
      };
    });
  const [enabledChart, setEnabledChart] = useState(false);
  const historyHeight = 475;
  const hasMoreThanOneDataPoint = transformedData.length > 1;

  useEffect(() => {
    setEnabledChart(false);
  }, [history]);

  return (
    <>
      <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-4 lg:gap-x-12'>
        <div className='lg:col-span-3'>
          {enabledChart ? (
            <AlertChart transformedData={transformedData} height={historyHeight} />
          ) : (
            <AlertTable transformedData={transformedData} height={historyHeight} />
          )}
        </div>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <StatusLegend />
        </div>
      </div>
      {hasMoreThanOneDataPoint && (
        <Switcher
          label={enabledChart ? 'Als Tabelle anzeigen' : 'Als Diagram anzeigen'}
          onChange={(newState) => {
            setEnabledChart(newState);
          }}
          initialState={enabledChart}
        />
      )}
    </>
  );
}
