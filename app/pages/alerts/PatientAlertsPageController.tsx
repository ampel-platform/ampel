/* eslint-disable import/no-default-export */
import React, { Suspense, useMemo } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';

import {
  DataSourceFlags,
  loadAlertsForCase,
  loadMetadataForCase,
} from '../../error/patientAlertsData';
import {
  ErrorBoundary,
  PageSkeleton,
  renderSectionError,
  SectionErrorBoundary,
} from '../../error/patientAlertsErrors';
import { StatusError } from '../../error/patientAlertsTypes';
import type { AmpelResultResponse } from './AmpelResultRepository';
import { PageContent } from './PatientAlertsContent';
import type { MedicalCaseMetadataApiResult } from './types/types-api';

const isTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';
const isDemo = import.meta.env?.VITE_TEST_DATA_VIEW === 'demo';
const nodeEnv =
  typeof globalThis !== 'undefined'
    ? (globalThis as { process?: { env?: Record<string, string> } }).process?.env?.NODE_ENV
    : undefined;
const isDev = nodeEnv === 'development';

interface LoaderData {
  case_id: string;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
  const case_id = params.case_id;
  if (!case_id) throw new Response('case_id fehlt', { status: 404 });
  // Return only params; promises are started client-side to allow Suspense fallbacks to show.
  return { case_id };
}

export default function PatientAlertsPageController(): React.ReactNode {
  const { case_id } = useLoaderData<LoaderData>();
  const dataFlags: DataSourceFlags = useMemo(() => ({ isTest, isDemo }), [isTest, isDemo]);

  const metadataData = useMemo(() => loadMetadataForCase(case_id, dataFlags), [case_id, dataFlags]);
  const alertsData = useMemo(() => loadAlertsForCase(case_id, dataFlags), [case_id, dataFlags]);
  const combinedPromise = useMemo(
    () =>
      Promise.allSettled([metadataData, alertsData]) as Promise<
        [
          PromiseSettledResult<MedicalCaseMetadataApiResult | StatusError>,
          PromiseSettledResult<AmpelResultResponse>,
        ]
      >,
    [alertsData, metadataData],
  );

  return (
    <div>
      {isTest && (
        <div className='mb-2 inline-block rounded bg-yellow-300 px-2 py-1 text-xs font-semibold text-yellow-900'>
          TEST
        </div>
      )}
      {isDemo && (
        <div className='mb-2 inline-block rounded bg-yellow-300 px-2 py-1 text-xs font-semibold text-yellow-900'>
          DEMO 03.11.2025
        </div>
      )}
      {isDev && (
        <div className='mb-2 inline-block rounded bg-yellow-300 px-2 py-1 text-xs font-semibold text-yellow-900'>
          DEV
        </div>
      )}
      <SectionErrorBoundary
        fallback={(error) => (
          <div className='mt-4' data-testid='alerts-error'>
            {renderSectionError(error)}
          </div>
        )}
      >
        <Suspense fallback={<PageSkeleton />}>
          <PageContent caseId={case_id} combinedPromise={combinedPromise} />
        </Suspense>
      </SectionErrorBoundary>
    </div>
  );
}

// Re-export for router usage
export { ErrorBoundary };
