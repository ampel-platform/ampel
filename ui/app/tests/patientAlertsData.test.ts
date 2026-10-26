/* eslint-env node */
import process from 'node:process';

import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  extractError,
  loadAlertsForCase,
  loadMetadataForCase,
  normalizeError,
  pickPrimaryError,
  toNumericStatus,
} from '../error/patientAlertsData';
import type { StatusError } from '../error/patientAlertsTypes';
import { AmpelResultRepository } from '../pages/alerts/AmpelResultRepository';
import { MedicalCaseMetadataRepository } from '../pages/alerts/MedicalCaseMetadataRepository';
import { FakeDemoAmpelResultRepository } from './DemoFakeAmpelResultRepository';
import { FakeAmpelResultRepository } from './FakeAmpelResultRepository';

vi.mock('../pages/alerts/AmpelResultRepository', () => ({
  AmpelResultRepository: { getByMedicalCaseId: vi.fn() },
}));

vi.mock('../pages/alerts/MedicalCaseMetadataRepository', () => ({
  MedicalCaseMetadataRepository: { getByMedicalCaseId: vi.fn() },
}));

describe('patientAlertsData helpers', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('uses fake repositories when running in test or demo mode', async () => {
    const fakeSpy = vi.spyOn(FakeAmpelResultRepository, 'uiFakesToApi').mockResolvedValue({
      medicalCaseId: 'TEST',
    } as unknown as StatusError);
    const demoSpy = vi.spyOn(FakeDemoAmpelResultRepository, 'uiDemoFakesToApi').mockResolvedValue({
      medicalCaseId: 'DEMO',
    } as unknown as StatusError);

    const testResult = await loadAlertsForCase('CASE-1', { isTest: true, isDemo: false });
    expect(fakeSpy).toHaveBeenCalledWith('CASE-1');
    expect(testResult).toEqual({ medicalCaseId: 'TEST' });

    const demoResult = await loadAlertsForCase('CASE-2', { isTest: false, isDemo: true });
    expect(demoSpy).toHaveBeenCalledWith('CASE-2');
    expect(demoResult).toEqual({ medicalCaseId: 'DEMO' });
  });

  it('logs errors in dev mode and normalizes fetch Response errors', async () => {
    process.env.NODE_ENV = 'development';
    const consoleSpy = vi.spyOn(globalThis.console, 'error').mockImplementation(() => {});
    const response = new Response('teapot', { status: 418, statusText: 'Teapot' });
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockRejectedValue(response);

    const result = await loadAlertsForCase('CASE-DEV', { isTest: false, isDemo: false });

    expect(consoleSpy).toHaveBeenCalledWith('[dev] loadAlertsForCase failed', response);
    expect(result).toBeInstanceOf(Error);
    const statusError = result as StatusError;
    expect(statusError.status).toBe(418);
    expect(statusError.headers).toBeInstanceOf(Headers);
  });

  it('normalizes thrown errors by coercing status fields', async () => {
    const err = Object.assign(new Error('Service unavailable'), { status: '504' });
    vi.mocked(AmpelResultRepository.getByMedicalCaseId).mockRejectedValue(err);

    const result = await loadAlertsForCase('CASE-ERR', { isTest: false, isDemo: false });

    expect(result).toBeInstanceOf(Error);
    expect((result as StatusError).status).toBe(504);
  });

  it('maps unknown metadata errors to status 500', async () => {
    vi.mocked(MedicalCaseMetadataRepository.getByMedicalCaseId).mockRejectedValue('kaputt');

    const result = await loadMetadataForCase('CASE-META', { isTest: false, isDemo: false });
    expect(result).toBeInstanceOf(Error);
    expect((result as StatusError).status).toBe(500);
  });

  it('converts status inputs consistently', () => {
    expect(toNumericStatus(404)).toBe(404);
    expect(toNumericStatus('503')).toBe(503);
    expect(toNumericStatus('bad')).toBeNull();
    expect(toNumericStatus(undefined)).toBeNull();
  });

  it('normalizes diverse error shapes and helpers', () => {
    const response = new Response('gone', { status: 410 });
    const normalizedResponse = normalizeError(response);
    expect(normalizedResponse.status).toBe(410);

    const stringStatus = Object.assign(new Error('oops'), { status: '502' });
    const normalizedError = normalizeError(stringStatus);
    expect(normalizedError.status).toBe(502);

    const rejected = extractError({ status: 'rejected', reason: stringStatus });
    expect(rejected?.status).toBe(502);

    const resolved = extractError({ status: 'fulfilled', value: stringStatus });
    expect(resolved?.status).toBe(502);

    const primary = pickPrimaryError(normalizedError, normalizedResponse);
    expect(primary?.status).toBe(502);
  });
});
