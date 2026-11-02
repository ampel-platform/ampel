import {AmpelStatus, MedicalCaseMetadata, Ruleset, RulesetHistory, SexUI,} from './types';
import {ApiResultCollection, type ApiStatus, MedicalCaseMetadataApiResult, SexAPI,} from './types-api';

function statusToUi(status: ApiStatus): AmpelStatus {
  switch (status) {
    case "green":
      return AmpelStatus.GREEN;
    case "yellow":
      return AmpelStatus.YELLOW;
    case "red":
      return AmpelStatus.RED;
    default:
      return AmpelStatus.GREEN;
  }
}

export function apiToRulesets(apiPayload: unknown): Ruleset[] {
  const parsed = ApiResultCollection.safeParse(apiPayload);
  if (!parsed.success) return [];

  const api = parsed.data;

  return api.scoringSystems.map((ss) => {
    const sorted = [...ss.scores].sort(
      (a, b) => Date.parse(a.analyteMeasuringTime) - Date.parse(b.analyteMeasuringTime),
    );
    const latest = sorted[sorted.length - 1];

    const history: RulesetHistory = {
      data: ss.scores.map((r) => ({
        date: new Date(r.analyteMeasuringTime),
        analyteValue: r.analyteValue,
        severity: r.severity,
        ampelStatus: statusToUi(r.score === 'none' ? 'green' : r.score),
        unit: r.analyteValueUnit,
        analyteName: r.analyteName,
      })),
    };

    return {
      ruleset: ss.scoringSystemName,
      ampelStatus: statusToUi(
        (latest?.score ?? 'green') === 'none' ? 'green' : (latest?.score ?? 'green'),
      ),
      message: latest?.severityComment ?? latest?.severity ?? '',
      resultTime: new Date(latest?.analyteMeasuringTime),
      history
    };
  });
}

function patientSexApiToUI(sex: SexAPI): SexUI {
  switch (sex) {
    case 'male':
      return 'männlich';
    case 'female':
      return 'weiblich';
    case 'unknown':
      return 'unbekannt';
    default:
      return 'unbekannt';
  }
}

export function medicalCaseMetadataApiToUI(
  apiResponse: MedicalCaseMetadataApiResult,
): MedicalCaseMetadata {
  return {
    id: apiResponse.id,
    medicalCaseId: apiResponse.medicalCaseId,
    firstname: apiResponse.firstname,
    lastname: apiResponse.lastname,
    dateOfBirth: !apiResponse.dateOfBirth ? null : new Date(apiResponse.dateOfBirth),
    sex: patientSexApiToUI(apiResponse.sex),
  };
}
