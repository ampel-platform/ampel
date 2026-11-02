import { AmpelStatus, type RulesetHistory } from '../../types/types';

const AMPEL_STATUS_FILL_COLORS: Record<AmpelStatus, string> = {
  [AmpelStatus.RED]: 'rgba(251, 207, 232, 0.7)',
  [AmpelStatus.YELLOW]: 'rgba(254, 243, 199, 0.7)',
  [AmpelStatus.GREEN]: 'rgba(243, 244, 246, 0.7)',
};

export function getAmpelStatusFillColor(status: AmpelStatus): string {
  return AMPEL_STATUS_FILL_COLORS[status];
}

export function getLatestSeverity(history?: RulesetHistory | null): string | null | undefined {
  if (!history?.data?.length) return undefined;

  let latestSeverity: string | null | undefined = undefined;
  let latestTimestamp = Number.NEGATIVE_INFINITY;

  for (const entry of history.data) {
    const ts = entry.date.getTime();
    if (ts >= latestTimestamp) {
      latestTimestamp = ts;
      latestSeverity = entry.severity;
    }
  }

  return latestSeverity;
}
