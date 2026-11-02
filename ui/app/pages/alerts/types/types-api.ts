import { z } from 'zod';
/* eslint-disable no-redeclare */

/** Backend-Enum */
export const ApiStatus = z.enum(['green', 'yellow', 'red', 'none']);
export type ApiStatus = z.infer<typeof ApiStatus>;

/** Ein Result innerhalb eines Scoring-Systems */
export const ApiResult = z.object({
  score: ApiStatus,
  severity: z.string().nullable().optional(),
  severityComment: z.string().nullable().optional(),
  analyteName: z.string(),
  analyteValue: z.number(),
  analyteValueUnit: z.string(),
  analyteMeasuringTime: z.string(),
  resultCreationTime: z.string()
});
export type ApiResult = z.infer<typeof ApiResult>;

/** Ergebnisse pro Scoring-System */
export const ApiScoringSystemResults = z.object({
  scoringSystemName: z.string(),
  scoringSystemVersion: z.string(),
  scores: z.array(ApiResult),
});
export type ApiScoringSystemResults = z.infer<typeof ApiScoringSystemResults>;

export const ApiResultCollection = z.object({
  medicalCaseId: z.string(),
  scoringSystems: z.array(ApiScoringSystemResults),
});
export type ApiResultCollection = z.infer<typeof ApiResultCollection>;

export const SexAPI = z.enum(['male', 'female', 'unknown']);
export type SexAPI = z.infer<typeof SexAPI>;

export const MedicalCaseMetadataApiResult = z.object({
  id: z.string(),
  medicalCaseId: z.string(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  sex: SexAPI,
});
export type MedicalCaseMetadataApiResult = z.infer<typeof MedicalCaseMetadataApiResult>;
