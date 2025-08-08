/* eslint-disable import/no-default-export */
import { json, type LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';

import { FakeAmpelResultRepository } from '../../tests/FakeAmpelResultRepository';
import { AmpelResultRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { PatientAlertsPage } from './PatientAlertsPage';
import { apiToPatientMetaData, apiToRulesets } from './types/api-to-ui';
import { AlertType, AmpelStatus, type PatientMetaData } from './types/types';
import { ApiResultCollection } from './types/types-api';

const isTest = import.meta.env?.VITE_CHART_TEST === '1';

interface LoaderData {
  case_id: string;
  data: ApiResultCollection;
}

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const { case_id } = params;
  if (!case_id) throw new Response('Not Found', { status: 404 });

  let data: ApiResultCollection;
  if (isTest) {
    data = await FakeAmpelResultRepository.uiFakesToApi(case_id);
  } else {
    data = await AmpelResultRepository.getByMedicalCaseId(case_id);
  }

  return json<LoaderData>({ case_id, data });
};

// eslint-disable-next-line no-undef
export default function PatientAlertsPageController(): React.ReactNode {
  const { data } = useLoaderData<LoaderData>();

  const patientMetaData: PatientMetaData = useMemo(() => apiToPatientMetaData(data), [data]);

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
      <PatientAlertsPage patientMetaData={patientMetaData} rulesetsByStatus={rulesetsByStatus} />
    </div>
  );
}
