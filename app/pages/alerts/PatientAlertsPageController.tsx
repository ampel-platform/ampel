/* eslint-disable import/no-default-export */
import { json, type LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';

import { FakeAmpelResultRepository } from '../../tests/FakeAmpelResultRepository';
import { AmpelResultRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { PatientAlertsPage } from './PatientAlertsPage';
import { apiToRulesets } from './types/api-to-ui';
import { AlertType, AmpelStatus, type PatientMetaData } from './types/types';
import { ApiResultCollection, PatientApiResult } from './types/types-api';
import { FakeDemoAmpelResultRepository } from '../../tests/DemoFakeAmpelResultRepository';

const isTest = import.meta.env?.VITE_TEST_DATA_VIEW === 'test';
const isDemo = import.meta.env?.VITE_TEST_DATA_VIEW === 'demo';

interface LoaderData {
  case_id: string;
  data: ApiResultCollection;
  patientData?: PatientApiResult;
}

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const { case_id } = params;
  if (!case_id) throw new Response('case_id fehlt', { status: 404 });

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
   [data, patientData] = await Promise.all([
      AmpelResultRepository.getByMedicalCaseId(case_id),
      FakeAmpelResultRepository.generateFakePatientMetaData(),
    ]);
  }

  return json<LoaderData>({ case_id, data, patientData });
};

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
              message={rs.message}
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
              message={rs.message}
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
                description={rs.message || ''}
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
          DEMO
        </div>
      )}
      <PatientAlertsPage patientMetaData={patientMetaData} rulesetsByStatus={rulesetsByStatus} />
    </div>
  );
}
