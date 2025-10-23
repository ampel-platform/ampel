import { faker } from '@faker-js/faker';

import { AmpelStatus, Ruleset, RulesetHistory } from '../pages/alerts/types/types';
import {
  ApiResult,
  ApiResultCollection,
  ApiScoringSystemResults,
  ApiStatus,
  MedicalCaseMetadataApiResult,
} from '../pages/alerts/types/types-api';

/**
 * Generates a fake RulesetHistory object with 8 data points.
 * Each data point has a random date within the last 5 days, a random analyte value between 0 and 50, and a random ampel status between 1 and 3 (inclusive).
 * @returns {RulesetHistory} The generated fake history data.
 */
function generateFakeHistoryData(ampelStatus: AmpelStatus, seed: number): RulesetHistory {
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

// für refeding RFS 30%

/**
 * Generates a fake PatientMetaData object using provided patient and case IDs.
 * The function returns a mock patient metadata with a static name, sex, and a random birthdate.
 *
 * @param {string} patient_id - The unique identifier for the patient.
 * @param {string} case_id - The unique identifier for the case.
 * @returns {PatientMetaData} The generated fake patient metadata.
 */

async function generateFakePatientMetaData(): Promise<MedicalCaseMetadataApiResult> {
  await sleep(1000);
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
 * - Anämie
 * - Refeeding Syndrom
 * - Hyperkalzämie
 * - Sepsis
 * - Hypokaliämie
 * - Hypocalcämie
 * - Hyponatriämie
 * - Laktatämie
 * - Diabetes
 * - Fibrinogenmangel
 * - Hyperglykämie
 * - Procalcitonin-Monitoring
 *
 * @returns {Ruleset[]} The generated array of fake rulesets.
 */
function generateFakeRulesets(): Ruleset[] {
  return [
    {
      ruleset: 'AKI',
      severity: 'AKIN 3 VANC',
      ampelStatus: AmpelStatus.RED,
      message:
        'Der Kreatininanstieg weist auf eine akute Nierenschädigung im Zusammenhang mit einer Vancomycintherapie hin (AKIN-Stadium 1 nach KDIGO-Kriterien). Weiterführende Diagnostik- und Therapiemaßnahmen (KDIGO-Bundle) empfohlen.',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.RED, 1),
      links: [
        {
          displayText: 'Deximed',
          href: 'https://deximed.de/home/klinische-themen/niere-harnwege/krankheiten/nierenerkrankungen/nierenfunktionseinschraenkung-akute-aki',
        },
        {
          displayText: 'Labor',
          href: '#',
        },
      ],
    },
    {
      ruleset: 'Anämie',
      severity: 'KPok|EKok',
      ampelStatus: AmpelStatus.YELLOW,
      message:
        "<p>Laut Querschnittsleitlinie der BÄK (2020) ist die Transfusion eines Blutbeutels bei Hb < 4,3 mmol/l dringend zu erwägen.</p><br>Bitte reflektieren Sie patientenspezifisch:<br><p style='margin-left: 10px'>- <b>allg. Risikofaktoren,</b><br>- <b>Klinik</b><br>- <b>Ischämietypische EKG</b>-Veränderungen<br>- <b>Labor</b> und betreiben Sie ggf. <b>weitere Diagnostik.</b></p><br>Bei Transfusion denken Sie bitte frühzeitig an Kreuzblut. Ein Transfusionserfolg sollte innerhalb von 24h überprüft werden.\"",
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.YELLOW, 2),
      links: [
        {
          displayText: 'Deximed',
          href: 'https://deximed.de/home/klinische-themen/blut/symptome/anaemie-bei-erwachsenen',
        },
        {
          displayText: 'Labor',
          href: '#',
        },
      ],
    },
    {
      ruleset: 'Refeeding Syndrom',
      severity: 'RFS 30%',
      ampelStatus: AmpelStatus.RED,
      message:
        'Laborchemische Diagnose eines Refeedingsyndroms. Es wird empfohlen tägliche Kontrollen von Kalium, Magnesium und Phosphat bis zum Elektrolytausgleich vorzunehmen und das Ernährungsteam zu involvieren. Einem RFS ähnelnde Elektrolytentgleisungen sind auch bei Hirntraumata und nach Leberoperationen beschrieben. Bitte prüfen Sie die Indikation.',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.RED, 3),
      links: [
        {
          displayText: 'Deximed',
          href: 'https://deximed.de/home/klinische-themen/geriatrie/krankheiten/stoffwechsel-ernaehrung/mangelernaehrung#verlauf-komplikationen-und-prognose-komplikationen',
        },
        {
          displayText: 'SOP',
          href: 'http://roxtra.medizin.uni-leipzig.de/Roxtra/index.aspx?FileID=82421',
        },
        {
          displayText: 'Labor',
          href: '#',
        },
      ],
    },
    {
      ruleset: 'Hyperkalzämie',
      ampelStatus: AmpelStatus.RED,
      message:
        'Bei lebensbedrohlich erhöhtem Kalzium wurde bislang keine Therapiekontrolle durchgeführt. Die Diagnostik der Ursache sowie Therapie wird empfohlen. Die Kontrolle des Behandlungserfolgs nach spätestens 12 Stunden wurde überschritten.',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.RED, 4),
      links: [
        {
          displayText: 'Deximed',
          href: 'https://deximed.de/home/klinische-themen/endokrinologie-stoffwechsel/symptome/hyperkalzaemie#diagnostik-diagnostische-uberlegungen',
        },
        {
          displayText: 'Labor',
          href: '#',
        },
      ],
    },
    {
      ruleset: 'Sepsis',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion einer potentiellen Sepsiskonstellation',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 5),
    },
    {
      ruleset: 'Hypokaliämie',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hypokaliämie',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 6),
    },
    {
      ruleset: 'Hypocalcämie',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hypocalcämie',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 7),
    },
    {
      ruleset: 'Hyponatriämie',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hyponatriämie',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 8),
    },
    {
      ruleset: 'Laktatämie',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message:
        'Detektion eines Infektionsgeschehens und Sicherstellung einer Konsequenz (Nachkontrolle)',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 9),
    },
    {
      ruleset: 'Diabetes',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion von bisher nicht kodiertem Diabetes mellitus',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 10),
    },
    {
      ruleset: 'Fibrinogenmangel',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion von unbekanntem Fibrinogenmangel',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 11),
    },
    {
      ruleset: 'Hyperglykämie',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message:
        'Detektion von anhaltenden Hyperglykämien bzw. solchen ohne Konsequenz (Nachkontrolle)',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 12),
    },
    {
      ruleset: 'Procalcitonin-Monitoring',
      severity: 'ANAKIN SKYWALKER',
      ampelStatus: AmpelStatus.GREEN,
      message: 'Detektion eines nicht adäquaten Procalcitoninabfalls',
      resultTime: new Date('2025-07-30T15:20:16Z'),
      history: generateFakeHistoryData(AmpelStatus.GREEN, 13),
    },
  ];
}

const enumToApi = (s: AmpelStatus): ApiStatus =>
  s === AmpelStatus.RED ? 'red' : s === AmpelStatus.YELLOW ? 'yellow' : 'green';

export async function uiFakesToApi(case_id: string): Promise<ApiResultCollection> {
  // add a sleep to simulate loading time
  await sleep(1000);

  const rulesets = generateFakeRulesets(); // ← your long list with history

  const scoringSystems: ApiScoringSystemResults[] = rulesets.map((rs, idx) => {
    const hist = [...(rs.history?.data ?? [])].sort((a, b) => a.date.getTime() - b.date.getTime());

    const safeHist =
      hist.length > 0
        ? hist
        : [{ date: rs.resultTime, analyteValue: NaN, ampelStatus: rs.ampelStatus }];

    const results: ApiResult[] = safeHist.map((h, i, arr) => ({
      status: enumToApi(h.ampelStatus),
      severity: rs.severity,
      severityComment: i === arr.length - 1 ? (rs.message ?? '') : null,
      analyteName: rs.ruleset,
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

export const FakeAmpelResultRepository = {
  uiFakesToApi: uiFakesToApi,
  generateFakePatientMetaData: generateFakePatientMetaData,
};

// eslint-disable-next-line no-undef
export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
