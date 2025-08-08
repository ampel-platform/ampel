import { z } from 'zod';
/* eslint-disable no-redeclare */

/** Backend-Enum */
export const ApiStatus = z.enum(['GREEN', 'YELLOW', 'RED', 'NONE']);
export type ApiStatus = z.infer<typeof ApiStatus>;

/** Ein Result innerhalb eines Scoring-Systems */
export const ApiResult = z.object({
  status: ApiStatus,
  severity: z.string(),
  severityComment: z.string().nullable().optional(),
  analyteName: z.string(),
  analyteValue: z.string(), // kommt i. d. R. als String
  analyteValueUnit: z.string(),
  analyteMeasuringTime: z.string(), // LocalDateTime-String
  resultCreationTime: z.string(), // LocalDateTime-String
  metaInformation: z.record(z.string(), z.unknown()).nullable().optional(),
});
export type ApiResult = z.infer<typeof ApiResult>;

/** Ergebnisse pro Scoring-System */
export const ApiScoringSystemResults = z.object({
  scoringSystemName: z.string(),
  scoringSystemVersion: z.string(),
  results: z.array(ApiResult), // kann >1 Eintrag haben
});
export type ApiScoringSystemResults = z.infer<typeof ApiScoringSystemResults>;

/** Top-Level Antwort (ResultCollection) */
export const ApiResultCollection = z.object({
  medicalCaseId: z.string(), // z. B. "12345"
  scoringSystems: z.array(ApiScoringSystemResults),
  // Falls dein Backend später Patientendaten mitliefert, hier ergänzen:
  // patientId: z.string().optional(),
  // birthdate: z.string().optional(),
});
export type ApiResultCollection = z.infer<typeof ApiResultCollection>;
