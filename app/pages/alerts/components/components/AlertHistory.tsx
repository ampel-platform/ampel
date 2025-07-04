import { useState } from 'react';
import { RulesetHistory, AmpelStatus } from '../../types';
import AlertChart from './AlertChart';
import AlertTable from './AlertTable';
import { Switcher } from './Switcher';

type AlertHistoryProps = {
  history: RulesetHistory;
};

/**
 * A component to display a history of alerts for a given ruleset.
 *
 * @param {{ history: RulesetHistory }} props
 * @prop {RulesetHistory} history - The history object containing alert data for the ruleset.
 * @returns {JSX.Element} The rendered alert history component.
 */
export default function AlertHistory({ history }: AlertHistoryProps): JSX.Element {
  const [isChart, setIsChart] = useState(true);
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
        date: h.date.toLocaleString(),
        analyteValue: h.analyteValue,
        ampelStatus: h.ampelStatus,
        ampelStatusFillColor: convertAmpelStatusToFillColor(h.ampelStatus),
      };
    });
  const [enabledChart, setEnabledChart] = useState(true);
  return (
    <>
      <Switcher
        label={enabledChart ? 'Als Tabelle anzeigen' : 'Als Diagram anzeigen'}
        onChange={(newState) => {
          setEnabledChart(newState);
        }}
        initialState={enabledChart} />
      {enabledChart ? (
        <AlertChart transformedData={transformedData} />
      ) : (
        <AlertTable transformedData={transformedData} />
      )}
    </>
  );
}
