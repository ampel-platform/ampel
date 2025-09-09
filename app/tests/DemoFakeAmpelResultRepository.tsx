import { faker } from '@faker-js/faker';

import { RulesetHistory } from '../pages/alerts/types/types';
import { AmpelStatus, Ruleset } from '../pages/alerts/types/types';
import {
  ApiResult,
  ApiResultCollection,
  ApiScoringSystemResults,
  ApiStatus,
  PatientApiResult,
} from '../pages/alerts/types/types-api';

/**
 * Generates a fake RulesetHistory object with 8 data points.
 * Each data point has a random date within the last 5 days, a random analyte value between 0 and 50, and a random ampel status between 1 and 3 (inclusive).
 * @returns {RulesetHistory} The generated fake history data.
 */
function generateDemoFakeHistoryData(ampelStatus: AmpelStatus, seed: number): RulesetHistory {
  faker.seed(seed);
  const refDate = new Date('2025-07-30T00:00:00Z');

  const data = Array.from({ length: 8 }, () => ({
    date: faker.date.recent({ days: 5, refDate }),
    analyteValue: faker.number.int({ min: 0, max: 50 }),
    ampelStatus: faker.number.int({ min: 1, max: 3 }),
    unit: 'µmol/l',
    analyteName: 'LCRE_S',
  }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((d, idx, arr) => (idx === arr.length - 1 ? { ...d, ampelStatus } : d));

  return { data };
}

/**
 * Generates a fake PatientMetaData object using provided patient and case IDs.
 * The function returns a mock patient metadata with a static name, sex, and a random birthdate.
 *
 * @param {string} patient_id - The unique identifier for the patient.
 * @param {string} case_id - The unique identifier for the case.
 * @returns {PatientMetaData} The generated fake patient metadata.
 */

async function generateDemoFakePatientMetaData(): Promise<PatientApiResult> {
  await sleep(1000);
  return {
    name: 'Max Mustermann',
    patientId: '123456',
    sex: 'männlich',
    birthdate: new Date('1985-07-30T15:20:16Z'),
  };
}

/**
 * Generates an array of fake rulesets with associated metadata (ampel status, message, result time, history, and links).
 * The function returns an array of 11 mock rulesets, each with a different set of properties.
 * The rulesets are:
 * - Akute Nierenschädigung [AKIN 1, Vancomycin]
 * - Hypokaliämie
 *
 * @returns {Ruleset[]} The generated array of fake rulesets.
 */
function generateDemoFakeRulesets(): Ruleset[] {
  return [
    {
      ruleset: 'AKI',
      ampelStatus: AmpelStatus.RED,
      message:
        'Der Kreatininanstieg weist auf eine akute Nierenschädigung im Zusammenhang mit einer Vancomycintherapie hin (AKIN-Stadium 1 nach KDIGO-Kriterien). Weiterführende Diagnostik- und Therapiemaßnahmen (KDIGO-Bundle) empfohlen.',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateDemoFakeHistoryData(AmpelStatus.RED, 1),
      links: [
        {
          displayText: 'Deximed',
          href: 'https://deximed.de/home/klinische-themen/niere-harnwege/krankheiten/nierenerkrankungen/nierenversagen-akutes#allgemeine-informationen-atiologie-und-pathogenese',
        },
        {
          displayText: 'Labor',
          href: '#',
        },
      ],
    },
  ];
}

const enumToApi = (s: AmpelStatus): ApiStatus =>
  s === AmpelStatus.RED ? 'red' : s === AmpelStatus.YELLOW ? 'yellow' : 'green';

export async function uiDemoFakesToApi(case_id: string): Promise<ApiResultCollection> {
  // add a sleep to simulate loading time
  await sleep(1000);

  const rulesets = generateDemoFakeRulesets(); // ← your long list with history

  const scoringSystems: ApiScoringSystemResults[] = rulesets.map((rs, idx) => {
    const hist = [...(rs.history?.data ?? [])].sort((a, b) => a.date.getTime() - b.date.getTime());

    const safeHist =
      hist.length > 0
        ? hist
        : [{ date: rs.resultTime, analyteValue: NaN, ampelStatus: rs.ampelStatus }];

    const results: ApiResult[] = safeHist.map((h, i, arr) => ({
      status: enumToApi(h.ampelStatus), // ✅ ApiStatus literal
      severity: '', // your UI fake has no separate severity
      severityComment: i === arr.length - 1 ? (rs.message ?? '') : null,
      analyteName: rs.ruleset, // no analyte in UI fake → reuse ruleset name
      analyteValue: String(h.analyteValue ?? ''),
      analyteValueUnit: 'µmol/l',
      analyteMeasuringTime: h.date.toISOString(),
      resultCreationTime: new Date(h.date.getTime() + 60_000).toISOString(),
      metaInformation:
        i === arr.length - 1
          ? { fake: true, seedIndex: idx, point: i, links: rs.links ?? [] }
          : { fake: true, seedIndex: idx, point: i },
    }));

    return {
      scoringSystemName: rs.ruleset,
      scoringSystemVersion: 'v0',
      results,
    } satisfies ApiScoringSystemResults;
  });

  return {
    medicalCaseId: case_id,
    scoringSystems,
  } satisfies ApiResultCollection;
}

export const FakeDemoAmpelResultRepository = {
  uiDemoFakesToApi: uiDemoFakesToApi,
  generateDemoFakePatientMetaData: generateDemoFakePatientMetaData,
};

// eslint-disable-next-line no-undef
export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
