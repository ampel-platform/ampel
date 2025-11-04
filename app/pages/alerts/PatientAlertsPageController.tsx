/* eslint-disable import/no-default-export */
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';

import { FakeDemoAmpelResultRepository } from '../../tests/DemoFakeAmpelResultRepository';
import { FakeAmpelResultRepository } from '../../tests/FakeAmpelResultRepository';
import { AmpelResultRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { MedicalCaseMetadataRepository } from './MedicalCaseMetadataRepository';
import { PatientAlertsPage } from './PatientAlertsPage';
import { apiToRulesets, medicalCaseMetadataApiToUI } from './types/api-to-ui';
import { AlertType, AmpelStatus } from './types/types';
import { ApiResultCollection, MedicalCaseMetadataApiResult } from './types/types-api';

const isTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';
const isDemo = import.meta.env?.VITE_TEST_DATA_VIEW === 'demo';

interface LoaderData {
  case_id: string;
  data: ApiResultCollection;
  medicalCaseMetadata?: MedicalCaseMetadataApiResult;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
  const case_id = params.case_id;
  if (!case_id) throw new Response('case_id fehlt', { status: 404 });
  return loadAlertsForCase(case_id);
}

async function loadAlertsForCase(case_id: string): Promise<LoaderData> {
  let data: ApiResultCollection;
  let medicalCaseMetadata: MedicalCaseMetadataApiResult;

  if (isTest) {
    [data, medicalCaseMetadata] = await Promise.all([
      FakeAmpelResultRepository.uiFakesToApi(case_id),
      FakeAmpelResultRepository.generateFakePatientMetaData(),
    ]);
  } else if (isDemo) {
    [data, medicalCaseMetadata] = await Promise.all([
      FakeDemoAmpelResultRepository.uiDemoFakesToApi(case_id),
      FakeDemoAmpelResultRepository.generateDemoFakePatientMetaData(),
    ]);
  } else {
    [data, medicalCaseMetadata] = await Promise.all([
      AmpelResultRepository.getByMedicalCaseId(case_id),
      MedicalCaseMetadataRepository.getByMedicalCaseId(case_id),
    ]);
  }
  return { case_id, data, medicalCaseMetadata };
}

// eslint-disable-next-line no-undef
export default function PatientAlertsPageController(): React.ReactNode {
  const { data, medicalCaseMetadata, case_id } = useLoaderData<LoaderData>();

  if (!data || !medicalCaseMetadata || !case_id) return null;

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
      <PatientAlertsPage
        medicalCaseMetadata={medicalCaseMetadataApiToUI(medicalCaseMetadata)}
        rulesetsByStatus={rulesetsByStatus}
      />
    </div>
  );
}
