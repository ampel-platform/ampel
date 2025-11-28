import {
  AmpelResultRepository,
  type AmpelResultResponse,
} from '../pages/alerts/AmpelResultRepository';
import { MedicalCaseMetadataRepository } from '../pages/alerts/MedicalCaseMetadataRepository';
import { MedicalCaseMetadataApiResult } from '../pages/alerts/types/types-api';
import { FakeDemoAmpelResultRepository } from '../tests/DemoFakeAmpelResultRepository';
import { FakeAmpelResultRepository } from '../tests/FakeAmpelResultRepository';
import { StatusError } from './patientAlertsTypes';

export interface DataSourceFlags {
  isTest: boolean;
  isDemo: boolean;
}

function isDevMode(): boolean {
  if (typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'development') {
    return true;
  }

  const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env?.NODE_ENV;
  if (nodeEnv === 'development') return true;

  return false;
}

function logDevError(source: string, error: unknown): void {
  if (!isDevMode()) return;
  const logger = (globalThis as { console?: Console }).console;
  logger?.error?.(`[dev] ${source} failed`, error);
}

export async function loadAlertsForCase(
  caseId: string,
  { isTest, isDemo }: DataSourceFlags,
): Promise<AmpelResultResponse> {
  try {
    if (isTest) {
      return await FakeAmpelResultRepository.uiFakesToApi(caseId);
    }
    if (isDemo) {
      return await FakeDemoAmpelResultRepository.uiDemoFakesToApi(caseId);
    }
    const result = await AmpelResultRepository.getByMedicalCaseId(caseId);
    if (result instanceof Error) {
      logDevError('loadAlertsForCase', result);
    }
    return result;
  } catch (err) {
    logDevError('loadAlertsForCase', err);
    if (err instanceof Error) {
      const errorWithStatus = err as StatusError;
      const numericStatus = toNumericStatus(errorWithStatus.status);
      errorWithStatus.status = numericStatus === null ? undefined : numericStatus;
      return errorWithStatus as AmpelResultResponse;
    }
    if (err instanceof Response) {
      const asError = new Error(err.statusText || 'HTTP Error') as StatusError;
      asError.status = err.status;
      asError.headers = err.headers;
      return asError as AmpelResultResponse;
    }
    return new Error(String(err)) as AmpelResultResponse;
  }
}

export async function loadMetadataForCase(
  caseId: string,
  { isTest, isDemo }: DataSourceFlags,
): Promise<MedicalCaseMetadataApiResult | StatusError> {
  try {
    if (isTest) return FakeAmpelResultRepository.generateFakePatientMetaData();
    if (isDemo) return FakeDemoAmpelResultRepository.generateDemoFakePatientMetaData();
    return await MedicalCaseMetadataRepository.getByMedicalCaseId(caseId);
  } catch (err) {
    logDevError('loadMetadataForCase', err);
    if (err instanceof Response) {
      const asError = new Error(err.statusText || 'HTTP Error') as StatusError;
      asError.status = err.status;
      asError.headers = err.headers;
      return asError;
    }
    if (err instanceof Error) {
      const errorWithStatus = err as StatusError;
      const numericStatus = toNumericStatus(errorWithStatus.status);
      errorWithStatus.status = numericStatus === null ? undefined : numericStatus;
      return errorWithStatus;
    }
    const unknown = new Error(String(err)) as StatusError;
    unknown.status = 500;
    return unknown;
  }
}

export function toNumericStatus(status: unknown): number | null {
  if (typeof status === 'number' && Number.isFinite(status)) return status;
  if (typeof status === 'string') {
    const parsed = Number(status);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function normalizeError(err: unknown): StatusError {
  if (err instanceof Response) {
    const asError = new Error(err.statusText || 'HTTP Error') as StatusError;
    asError.status = err.status;
    asError.headers = err.headers;
    return asError;
  }
  if (err instanceof Error) {
    const errorWithStatus = err as StatusError;
    const numericStatus = toNumericStatus(errorWithStatus.status);
    errorWithStatus.status = numericStatus === null ? undefined : numericStatus;
    return errorWithStatus;
  }
  const unknown = new Error(String(err)) as StatusError;
  unknown.status = 500;
  return unknown;
}

export function extractError(result: PromiseSettledResult<unknown>): StatusError | null {
  if (result.status === 'rejected') return normalizeError(result.reason);
  if (result.value instanceof Error) return normalizeError(result.value);
  return null;
}

export function pickPrimaryError(
  alertsError: StatusError | null,
  metadataError: StatusError | null,
): StatusError | null {
  return alertsError ?? metadataError;
}
