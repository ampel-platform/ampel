import { AmpelResult } from "./types";

import { faker } from '@faker-js/faker';
import { PatientMetaData, RulesetHistory } from './types';
import { AmpelStatus, Ruleset } from './types';


const BASE_URL = '/v1/medicalcases';

export const AmpelResultRepository = {
/**
 * Fetches the AmpelResult for a given medical case ID.
 *
 * @param id - The unique identifier of the medical case.
 * @returns A promise that resolves to the AmpelResult of the specified medical case.
 * @throws Will throw an error if the network request fails or the response is not successful.
 */


// case und patient ID? oder wirklch nur case ID? Möglichkeit das zu bekommen: wird in den link pfad mit eingefügt von sap?
  async getByMedicalCaseId(id: number): Promise<AmpelResult> {
    try {
      const response = await fetch(`${BASE_URL}/${id}/ampelresults`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error [${response.status}]: ${errorText}`);
        throw new Error(
          `Fehler beim Abrufen der AMPEL-Ergebnisse (Fall ${id}): ${response.statusText}`
        );
      }

      const data: AmpelResult = await response.json();
      return data;

    } catch (error: unknown) {
      console.error('Netzwerk- oder Serverfehler beim Abruf von AMPEL-Ergebnissen:', error);
      if (error instanceof Error) {
        throw new Error(
          `Fehler beim Abrufen der AMPEL-Ergebnisse: ${error.message}`
        );
      } else {
        throw new Error('Unbekannter Fehler beim Abrufen der AMPEL-Ergebnisse');
      }
    }
  },
};





/**
 * Generates a fake RulesetHistory object with 8 data points.
 * Each data point has a random date within the last 5 days, a random analyte value between 0 and 50, and a random ampel status between 1 and 3 (inclusive).
 * @returns {RulesetHistory} The generated fake history data.
 */
function generateFakeHistoryData(): RulesetHistory {
  return {
    data: Array.from({ length: 8 }).map(() => ({
      date: faker.date.recent({ days: 5 }),
      analyteValue: faker.number.int({ min: 0, max: 50 }),
      ampelStatus: faker.number.int({ min: 1, max: 3 }),
    })),
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

function generateFakePatientMetaData(patient_id: string, case_id: string): PatientMetaData {
  return {
    name: 'Max Mustermann',
    patientId: patient_id,
    caseId: case_id,
    sex: 'männlich',
    birthdate: faker.date.birthdate(),
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
        ruleset: 'Akute Nierenschädigung [AKIN 1, Vancomycin]',
        ampelStatus: AmpelStatus.RED,
        message:
          'Der Kreatininanstieg weist auf eine akute Nierenschädigung im Zusammenhang mit einer Vancomycintherapie hin (AKIN-Stadium 1 nach KDIGO-Kriterien). Weiterführende Diagnostik- und Therapiemaßnahmen (KDIGO-Bundle) empfohlen.',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
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
      {
        ruleset: 'Anämie',
        ampelStatus: AmpelStatus.YELLOW,
        message:
          "<p>Laut Querschnittsleitlinie der BÄK (2020) ist die Transfusion eines Blutbeutels bei Hb < 4,3 mmol/l dringend zu erwägen.</p><br>Bitte reflektieren Sie patientenspezifisch:<br><p style='margin-left: 10px'>- <b>allg. Risikofaktoren,</b><br>- <b>Klinik</b><br>- <b>Ischämietypische EKG</b>-Veränderungen<br>- <b>Labor</b> und betreiben Sie ggf. <b>weitere Diagnostik.</b></p><br>Bei Transfusion denken Sie bitte frühzeitig an Kreuzblut. Ein Transfusionserfolg sollte innerhalb von 24h überprüft werden.\"",
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
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
        ampelStatus: AmpelStatus.RED,
        message:
          'Laborchemische Diagnose eines Refeedingsyndroms. Es wird empfohlen tägliche Kontrollen von Kalium, Magnesium und Phosphat bis zum Elektrolytausgleich vorzunehmen und das Ernährungsteam zu involvieren. Einem RFS ähnelnde Elektrolytentgleisungen sind auch bei Hirntraumata und nach Leberoperationen beschrieben. Bitte prüfen Sie die Indikation.',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
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
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
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
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion einer potentiellen Sepsiskonstellation',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Hypokaliämie',
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hypokaliämie',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Hypocalcämie',
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hypocalcämie',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Hyponatriämie',
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion und Sicherstellung einer Konsequenz (Nachkontrolle) bei Hyponatriämie',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Laktatämie',
        ampelStatus: AmpelStatus.GREEN,
        message:
          'Detektion eines Infektionsgeschehens und Sicherstellung einer Konsequenz (Nachkontrolle)',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Diabetes',
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion von bisher nicht kodiertem Diabetes mellitus',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Fibrinogenmangel',
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion von unbekanntem Fibrinogenmangel',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Hyperglykämie',
        ampelStatus: AmpelStatus.GREEN,
        message:
          'Detektion von anhaltenden Hyperglykämien bzw. solchen ohne Konsequenz (Nachkontrolle)',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
      {
        ruleset: 'Procalcitonin-Monitoring',
        ampelStatus: AmpelStatus.GREEN,
        message: 'Detektion eines nicht adäquaten Procalcitoninabfalls',
        resultTime: faker.date.recent(),
        history: generateFakeHistoryData(),
      },
  ];
}

export const FakeAlertRepository = {
  getFakePatientMetaData: generateFakePatientMetaData,
  getFakeRulesets: generateFakeRulesets,
};
