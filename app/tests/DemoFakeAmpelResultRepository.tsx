import { AmpelStatus, Ruleset, RulesetHistory } from '../pages/alerts/types/types';
import {
  ApiResult,
  ApiResultCollection,
  ApiScoringSystemResults,
  ApiStatus,
  MedicalCaseMetadataApiResult,
} from '../pages/alerts/types/types-api';

const SKIP_FAKE_DELAY =
  (typeof globalThis !== 'undefined' &&
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
      ?.VITE_FAST_FAKE === '1') ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FAST_FAKE === '1');
const sleep = (ms: number): Promise<void> =>
  new Promise((r) =>
    typeof globalThis.setTimeout === 'function' ? globalThis.setTimeout(r, ms) : r(),
  );
const maybeSleep = (ms: number): Promise<void> => (SKIP_FAKE_DELAY ? Promise.resolve() : sleep(ms));

/**
 * Returns realistic demo history values for AKI (Kreatinin, LCRE_S).
 * Timestamps use Europe/Berlin summer time (+02:00) so the table renders exact values.
 */
function generateDemoAkiHistoryData(): RulesetHistory {
  return {
    data: [
      {
        date: new Date('2023-06-23T11:57:00+02:00'),
        analyteValue: 218,
        ampelStatus: AmpelStatus.RED,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-22T12:31:00+02:00'),
        analyteValue: 217,
        ampelStatus: AmpelStatus.RED,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-21T12:57:00+02:00'),
        analyteValue: 212,
        ampelStatus: AmpelStatus.RED,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-20T12:02:00+02:00'),
        analyteValue: 204,
        ampelStatus: AmpelStatus.RED,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-19T12:49:00+02:00'),
        analyteValue: 201,
        ampelStatus: AmpelStatus.RED,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-18T09:34:00+02:00'),
        analyteValue: 172,
        ampelStatus: AmpelStatus.RED,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-17T13:52:00+02:00'),
        analyteValue: 72,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-16T12:46:00+02:00'),
        analyteValue: 72,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-15T12:37:00+02:00'),
        analyteValue: 66,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-14T12:37:00+02:00'),
        analyteValue: 67,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-13T12:26:00+02:00'),
        analyteValue: 68,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-12T12:17:00+02:00'),
        analyteValue: 69,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-11T12:51:00+02:00'),
        analyteValue: 68,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-10T12:35:00+02:00'),
        analyteValue: 69,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-09T12:45:00+02:00'),
        analyteValue: 72,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-08T18:34:00+02:00'),
        analyteValue: 65,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-08T12:44:00+02:00'),
        analyteValue: 76,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-07T12:23:00+02:00'),
        analyteValue: 70,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-06T12:15:00+02:00'),
        analyteValue: 75,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-05T13:21:00+02:00'),
        analyteValue: 77,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-04T12:55:00+02:00'),
        analyteValue: 82,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-03T13:17:00+02:00'),
        analyteValue: 85,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-02T12:19:00+02:00'),
        analyteValue: 83,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-06-01T14:46:00+02:00'),
        analyteValue: 98,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-05-31T18:56:00+02:00'),
        analyteValue: 106,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-05-28T14:22:00+02:00'),
        analyteValue: 89,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
      {
        date: new Date('2023-05-21T13:55:00+02:00'),
        analyteValue: 98,
        ampelStatus: AmpelStatus.GREEN,
        unit: 'µmol/l',
        analyteName: 'LCRE_S',
      },
    ],
  };
}

/**
 * Generates a fake PatientMetaData object using provided patient and case IDs.
 * The function returns a mock patient metadata with a static name, sex, and a random birthdate.
 *
 * @param {string} patient_id - The unique identifier for the patient.
 * @param {string} case_id - The unique identifier for the case.
 * @returns {PatientMetaData} The generated fake patient metadata.
 */

async function generateDemoFakePatientMetaData(): Promise<MedicalCaseMetadataApiResult> {
  await maybeSleep(1000);
  return {
    id: 'med-123',
    patient: {
      id: '123456',
      firstname: 'Max',
      lastname: 'Musterfrau',
      dateOfBirth: '1991-07-30T15:20:16Z',
      sex: 'female',
    },
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
      resultTime: new Date('2023-06-23T11:57:00+02:00'),
      history: generateDemoAkiHistoryData(),
      // links: [
      //   {
      //     displayText: 'Deximed',
      //     href: 'https://deximed.de/home/klinische-themen/niere-harnwege/krankheiten/nierenerkrankungen/nierenfunktionseinschraenkung-akute-aki',
      //   },
      //   {
      //     displayText: 'SOP',
      //     href: '#',
      //   },
      //   {
      //     displayText: 'Labor',
      //     href: '#',
      //   },
      // ],
    },
  ];
}

const enumToApi = (s: AmpelStatus): ApiStatus =>
  s === AmpelStatus.RED ? 'red' : s === AmpelStatus.YELLOW ? 'yellow' : 'green';

export async function uiDemoFakesToApi(case_id: string): Promise<ApiResultCollection> {
  await maybeSleep(1000);

  const rulesets = generateDemoFakeRulesets();

  const scoringSystems: ApiScoringSystemResults[] = rulesets.map((rs, idx) => {
    const hist = [...(rs.history?.data ?? [])].sort((a, b) => a.date.getTime() - b.date.getTime());

    const safeHist =
      hist.length > 0
        ? hist
        : [{ date: rs.resultTime, analyteValue: 0, ampelStatus: rs.ampelStatus }];

    const results: ApiResult[] = safeHist.map((h, i, arr) => ({
      status: enumToApi(h.ampelStatus),
      severity: '',
      severityComment: i === arr.length - 1 ? (rs.message ?? '') : null,
      analyteName: 'LCRE_S',
      analyteValue: h.analyteValue,
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
