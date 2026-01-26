import {
  AmpelStatus,
  MedicalCaseMetadata,
  MedicalCasePatientMetadata,
  Ruleset,
  RulesetHistory,
  ScoringSystem as UiScoringSystem,
  SexUI,
} from './types';
import {
  ApiResultCollection,
  type ApiStatus,
  MedicalCaseMetadataApiResult,
  PatientMetadataApiResult,
  SexAPI,
} from './types-api';

const statusToUi = (s: ApiStatus): UiScoringSystem['ampelstatus'] =>
  s === 'green'
    ? AmpelStatus.GREEN
    : s === 'yellow'
      ? AmpelStatus.YELLOW
      : s === 'red'
        ? AmpelStatus.RED
        : AmpelStatus.GREEN;

export function apiToRulesets(apiPayload: unknown): Ruleset[] {
  const parsed = ApiResultCollection.safeParse(apiPayload);
  if (!parsed.success) return [];

  const api = parsed.data;

  return api.scoringSystems.map((ss) => {
    const sorted = [...ss.results].sort(
      (a, b) => Date.parse(a.analyteMeasuringTime) - Date.parse(b.analyteMeasuringTime),
    );
    const latest = sorted[sorted.length - 1];

    const history: RulesetHistory = {
      data: ss.results.map((r) => ({
        date: new Date(r.analyteMeasuringTime),
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
      resultTime: new Date(latest?.analyteMeasuringTime),
      history,
      links: links,
    };
  });
}

function medicalCasePatientMetadataApiToUI(
  apiResponse: PatientMetadataApiResult,
): MedicalCasePatientMetadata {
  return {
    id: apiResponse.id,
    firstname: apiResponse.firstname,
    lastname: apiResponse.lastname,
    dateOfBirth: !apiResponse.dateOfBirth ? null : new Date(apiResponse.dateOfBirth),
    sex: patientSexApiToUI(apiResponse.sex),
  };
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
    patient: apiResponse.patient
      ? medicalCasePatientMetadataApiToUI(apiResponse.patient)
      : undefined,
  };
}
