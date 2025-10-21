import { z } from 'zod';
/* eslint-disable no-redeclare */

/** Backend-Enum */
export const ApiStatus = z.enum(['green', 'yellow', 'red', 'none']);
export type ApiStatus = z.infer<typeof ApiStatus>;

/** Ein Result innerhalb eines Scoring-Systems */
export const ApiResult = z.object({
  status: ApiStatus,
  severity: z.string().nullable().optional(),
  severityComment: z.string().nullable().optional(),
  analyteName: z.string(),
  analyteValue: z.number(), // kommt i. d. R. als String
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
  results: z.array(ApiResult),
});
export type ApiScoringSystemResults = z.infer<typeof ApiScoringSystemResults>;

export const ApiResultCollection = z.object({
  medicalCaseId: z.string(),
  scoringSystems: z.array(ApiScoringSystemResults),
});
export type ApiResultCollection = z.infer<typeof ApiResultCollection>;

export const PatientApiResult = z.object({
  name: z.string(),
  patientId: z.string(),
  sex: z.enum(['männlich', 'weiblich']),
  birthdate: z.date(),
});
export interface PatientApiResult {
  name: string;
  patientId: string;
  sex: 'männlich' | 'weiblich';
  birthdate: Date;
}
