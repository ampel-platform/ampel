/* eslint-disable import/no-default-export */
import React, { ReactNode, Suspense, use, useMemo } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';

import { FakeDemoAmpelResultRepository } from '../../tests/DemoFakeAmpelResultRepository';
import { FakeAmpelResultRepository } from '../../tests/FakeAmpelResultRepository';
import { AmpelResultRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { PatientMetaDataHeader } from './components/PatientDataHeader';
import { MedicalCaseMetadataRepository } from './MedicalCaseMetadataRepository';
import { PatientAlertsPage } from './PatientAlertsPage';
import { apiToRulesets, medicalCaseMetadataApiToUI } from './types/api-to-ui';
import { AlertType, AmpelStatus } from './types/types';
import { ApiResultCollection, MedicalCaseMetadataApiResult } from './types/types-api';

const isTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';
const isDemo = import.meta.env?.VITE_TEST_DATA_VIEW === 'demo';

interface LoaderData {
  case_id: string;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
  const case_id = params.case_id;
  if (!case_id) throw new Response('case_id fehlt', { status: 404 });
  // Return only params; promises are started client-side to allow Suspense fallbacks to show.
  return { case_id };
}

async function loadAlertsForCase(case_id: string): Promise<ApiResultCollection> {
  let data: ApiResultCollection;

  if (isTest) {
    data = await FakeAmpelResultRepository.uiFakesToApi(case_id);
  } else if (isDemo) {
    data = await FakeDemoAmpelResultRepository.uiDemoFakesToApi(case_id);
  } else {
    data = await AmpelResultRepository.getByMedicalCaseId(case_id);
  }
  return data;
}

async function loadMetadataForCase(case_id: string): Promise<MedicalCaseMetadataApiResult> {
  if (isTest) return FakeAmpelResultRepository.generateFakePatientMetaData();
  if (isDemo) return FakeDemoAmpelResultRepository.generateDemoFakePatientMetaData();
  return MedicalCaseMetadataRepository.getByMedicalCaseId(case_id);
}

export default function PatientAlertsPageController(): React.ReactNode {
  const { case_id } = useLoaderData<LoaderData>();
  const metadataData = useMemo(() => loadMetadataForCase(case_id), [case_id]);
  const alertsData = useMemo(() => loadAlertsForCase(case_id), [case_id]);

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
      <Suspense
        fallback={
          <div
            data-testid='metadata-skeleton'
            className='h-12 w-full animate-pulse rounded-md bg-gray-100'
            aria-busy='true'
          />
        }
      >
        <MetadataSection metadataPromise={metadataData} />
      </Suspense>
      <Suspense
        fallback={
          <div className='mt-6 space-y-4' aria-busy='true' data-testid='alerts-skeleton'>
            <div className='h-10 w-1/2 animate-pulse rounded-md bg-gray-100' />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='h-40 animate-pulse rounded-xl bg-rose-100' />
              <div className='h-40 animate-pulse rounded-xl bg-amber-100' />
            </div>
          </div>
        }
      >
        <AlertsSection alertsPromise={alertsData} />
      </Suspense>
    </div>
  );
}

function MetadataSection({
  metadataPromise,
}: {
  metadataPromise: Promise<MedicalCaseMetadataApiResult>;
}): React.ReactNode {
  const metadata = medicalCaseMetadataApiToUI(use(metadataPromise));
  return (
    <PatientMetaDataHeader
      medicalCaseId={metadata.id}
      patientId={metadata.patient ? metadata.patient.id : undefined}
      firstname={metadata.patient ? metadata.patient.firstname : undefined}
      lastname={metadata.patient ? metadata.patient.lastname : undefined}
      dateOfBirth={metadata.patient ? metadata.patient.dateOfBirth : undefined}
      sex={metadata.patient ? metadata.patient.sex : 'unbekannt'}
    />
  );
}

function AlertsSection({
  alertsPromise,
}: {
  alertsPromise: Promise<ApiResultCollection>;
}): React.ReactNode {
  const data = use(alertsPromise);

  const rulesetsByStatus = useMemo(() => {
    const grouped = new Map<AmpelStatus, ReactNode[]>([
      [AmpelStatus.RED, []],
      [AmpelStatus.YELLOW, []],
      [AmpelStatus.GREEN, []],
    ]);

    const rulesets = apiToRulesets(data);

    for (const rs of rulesets) {
      const latest = rs?.history?.data?.length
        ? rs.history.data.reduce((acc, cur) => {
            const a = acc?.date instanceof Date ? acc.date.getTime() : -Infinity;
            const c = cur?.date instanceof Date ? cur.date.getTime() : -Infinity;
            return c > a ? cur : acc;
          })
        : null;

      const creationTime =
        rs?.resultTime ?? (latest?.date instanceof Date ? latest.date : undefined);

      if (rs.ampelStatus === AmpelStatus.RED) {
        grouped.get(AmpelStatus.RED)!.push(
          <AlertCard
            key={rs.ruleset}
            type={AlertType.Critical}
            title={rs.ruleset}
            creationTime={creationTime}
            alertDetails={{
              ruleset: rs.ruleset,
              ampelStatus: AlertType.Critical,
              message: rs.message,
              resultTime: rs.resultTime,
              rulesetHistory: rs.history,
              links: rs.links || [],
            }}
            onClick={() => {}}
          />,
        );
      } else if (rs.ampelStatus === AmpelStatus.YELLOW) {
        grouped.get(AmpelStatus.YELLOW)!.push(
          <AlertCard
            key={rs.ruleset}
            type={AlertType.Warning}
            title={rs.ruleset}
            creationTime={creationTime}
            alertDetails={{
              ruleset: rs.ruleset,
              ampelStatus: AlertType.Warning,
              message: rs.message,
              resultTime: rs.resultTime,
              rulesetHistory: rs.history,
              links: rs.links || [],
            }}
            onClick={() => {}}
          />,
        );
      } else if (rs.ampelStatus === AmpelStatus.GREEN) {
        grouped
          .get(AmpelStatus.GREEN)!
          .push(
            <InconspicuousStateCard
              key={rs.ruleset}
              title={rs.ruleset}
              creationTime={creationTime}
            />,
          );
      }
    }

    return grouped;
  }, [data]);

  return (
    <PatientAlertsPage
      showHeader={false}
      medicalCaseMetadata={undefined}
      rulesetsByStatus={rulesetsByStatus}
    />
  );
}
