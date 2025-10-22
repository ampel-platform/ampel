import type {
  AmpelResult,
  Ruleset,
  RulesetHistory,
  ScoringSystem as UiScoringSystem,
} from './types';
import { AmpelStatus } from './types';
import {
  ApiResultCollection,
  type ApiResultCollection as ApiResultCollectionT,
  type ApiStatus,
} from './types-api';

const statusToUi = (s: ApiStatus): UiScoringSystem['ampelstatus'] =>
  s === 'green'
    ? AmpelStatus.GREEN
    : s === 'yellow'
      ? AmpelStatus.YELLOW
      : s === 'red'
        ? AmpelStatus.RED
        : AmpelStatus.GREEN;

function pickLatest<T extends { resultCreationTime: string; analyteMeasuringTime: string }>(
  results: T[],
): T | undefined {
  if (results.length === 0) return undefined;
  return results.reduce<T | undefined>((best, cur) => {
    const bt = Date.parse((best?.resultCreationTime ?? best?.analyteMeasuringTime) || '');
    const ct = Date.parse((cur.resultCreationTime ?? cur.analyteMeasuringTime) || '');
    return !best || ct > bt ? cur : best;
  }, undefined);
}

/** === API-Validierung + Mapping -> UI.AmpelResult (flach pro ScoringSystem) === */
export function mapApiToUi(
  payload: unknown,
  opts?: { fallbackPatient?: number; fallbackBirthdate?: string },
): AmpelResult {
  const api: ApiResultCollectionT = ApiResultCollection.parse(payload);

  const medicalcaseNumber = Number(api.medicalCaseId);
  const medicalcase = Number.isFinite(medicalcaseNumber) ? medicalcaseNumber : 0;

  const patient = opts?.fallbackPatient ?? 0; // solange Backend noch keinen patient liefert
  const birthdate = opts?.fallbackBirthdate ?? ''; // ISO, falls vorhanden

  const scoringsystems: UiScoringSystem[] = api.scoringSystems.map((ss) => {
    const latest = pickLatest(ss.results);

    if (!latest) {
      return {
        name: ss.scoringSystemName,
        version: ss.scoringSystemVersion,
        ampelstatus: AmpelStatus.GREEN,
        analyte: '',
        analytevalue: 0,
        unit: '',
        severity: '',
        severityhint: '',
        meta: {},
      };
    }

    return {
      name: ss.scoringSystemName,
      version: ss.scoringSystemVersion,
      ampelstatus: statusToUi(latest.status),
      analyte: latest.analyteName,
      analytevalue: latest.analyteValue,
      unit: latest.analyteValueUnit,
      severity: latest.severity,
      severityhint: latest.severityComment ?? '',
      meta: latest.metaInformation ?? undefined,
    };
  });

  return { medicalcase, patient, birthdate, scoringsystems };
}

export function apiToRulesets(apiPayload: unknown): Ruleset[] {
  const parsed = ApiResultCollection.safeParse(apiPayload);
  if (!parsed.success) return []; // no data → no cards

  const api = parsed.data;

  return api.scoringSystems.map((ss) => {
    const sorted = [...ss.results].sort(
      (a, b) =>
        Date.parse(a.resultCreationTime ?? a.analyteMeasuringTime) -
        Date.parse(b.resultCreationTime ?? b.analyteMeasuringTime),
    );
    const latest = sorted[sorted.length - 1];

    const history: RulesetHistory = {
      data: ss.results.map((r) => ({
        date: new Date(r.resultCreationTime ?? r.analyteMeasuringTime),
        analyteValue: r.analyteValue,
        severity: r.severity,
        ampelStatus: statusToUi(r.status === 'none' ? 'green' : r.status),
        unit: r.analyteValueUnit,
        analyteName: r.analyteName,
      })),
    };

    const links =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      latest?.metaInformation && Array.isArray((latest.metaInformation as any).links)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((latest.metaInformation as any).links as { displayText: string; href: string }[])
        : [];

    return {
      ruleset: ss.scoringSystemName,
      ampelStatus: statusToUi(
        (latest?.status ?? 'green') === 'none' ? 'green' : (latest?.status ?? 'green'),
      ),
      message: latest?.severityComment ?? latest?.severity ?? '',
      resultTime: new Date(
        latest?.resultCreationTime ?? latest?.analyteMeasuringTime ?? Date.now(),
      ),
      history,
      links: links,
    };
  });
}
