/* eslint-disable import/no-default-export */
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';

import { FakeDemoAmpelResultRepository } from '../../tests/DemoFakeAmpelResultRepository';
import { FakeAmpelResultRepository } from '../../tests/FakeAmpelResultRepository';
import { AmpelResultRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { PatientAlertsPage } from './PatientAlertsPage';
import { apiToRulesets } from './types/api-to-ui';
import { AlertType, AmpelStatus, type PatientMetaData } from './types/types';
import { ApiResultCollection, PatientApiResult } from './types/types-api';

const isTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';
const isDemo = import.meta.env?.VITE_TEST_DATA_VIEW === 'demo';

interface LoaderData {
  case_id: string;
  data: ApiResultCollection;
  patientData?: PatientApiResult;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<LoaderData> {
  const case_id = params.case_id;
  if (!case_id) throw new Response('case_id fehlt', { status: 404 });
  return loadAlertsForCase(case_id);
}

async function loadAlertsForCase(case_id: string): Promise<LoaderData> {
  let data: ApiResultCollection;
  let patientData: PatientApiResult;

  if (isTest) {
    [data, patientData] = await Promise.all([
      FakeAmpelResultRepository.uiFakesToApi(case_id),
      FakeAmpelResultRepository.generateFakePatientMetaData(),
    ]);
  } else if (isDemo) {
    [data, patientData] = await Promise.all([
      FakeDemoAmpelResultRepository.uiDemoFakesToApi(case_id),
      FakeDemoAmpelResultRepository.generateDemoFakePatientMetaData(),
    ]);
  } else {
    // NOTE: Must be browser-safe in SPA mode.
    // If AmpelResultRepository uses fetch/XHR to your API, it’s fine.
    // If it imports Node-only modules, gate those behind SSR or refactor to HTTP calls.
    [data, patientData] = await Promise.all([
      AmpelResultRepository.getByMedicalCaseId(case_id),
      FakeAmpelResultRepository.generateFakePatientMetaData(),
    ]);
  }

  return { case_id, data, patientData };
}

// eslint-disable-next-line no-undef
export default function PatientAlertsPageController(): React.ReactNode {
  const { data, patientData, case_id } = useLoaderData<LoaderData>();

  if (!data || !patientData || !case_id) return null;

  const patientMetaData: PatientMetaData = useMemo(() => {
    return {
      name: patientData.name,
      patientId: patientData.patientId,
      caseId: case_id,
      sex: patientData.sex,
      birthdate: new Date(patientData.birthdate),
    };
  }, [patientData, case_id]);

  const rulesetsByStatus = useMemo(() => {
    const grouped = new Map<AmpelStatus, ReactNode[]>([
      [AmpelStatus.RED, []],
      [AmpelStatus.YELLOW, []],
      [AmpelStatus.GREEN, []],
    ]);

    const rulesets = apiToRulesets(data);
    for (const rs of rulesets) {
      switch (rs.ampelStatus) {
        case AmpelStatus.RED:
          grouped.get(AmpelStatus.RED)!.push(
            <AlertCard
              key={rs.ruleset}
              type={AlertType.Critical}
              title={rs.ruleset}
              creationTime={rs.resultTime}
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
          break;
        case AmpelStatus.YELLOW:
          grouped.get(AmpelStatus.YELLOW)!.push(
            <AlertCard
              key={rs.ruleset}
              type={AlertType.Warning}
              title={rs.ruleset}
              creationTime={rs.resultTime}
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
          break;
        case AmpelStatus.GREEN:
          grouped
            .get(AmpelStatus.GREEN)!
            .push(
              <InconspicuousStateCard
                key={rs.ruleset}
                title={rs.ruleset}
                creationTime={rs.resultTime}
              />,
            );
          break;
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
          DEMO 09.09.2025
        </div>
      )}
      <PatientAlertsPage patientMetaData={patientMetaData} rulesetsByStatus={rulesetsByStatus} />
    </div>
  );
}
