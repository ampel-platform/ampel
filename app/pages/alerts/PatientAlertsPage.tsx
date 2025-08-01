/* eslint-disable import/no-default-export */
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactNode, useEffect, useState } from 'react';

import { FakeAlertRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { AlertType, AmpelStatus, PatientMetaData } from './types';
import { PatientAlertsPageInner } from './PatientAlertsPageInner';
export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<{ patient_id: string; case_id: string }> => {
  const { patient_id, case_id } = params;

  if (!patient_id || !case_id) {
    throw new Response('Not Found', { status: 404 });
  }

  return { patient_id, case_id };
};

/**
 * Displays a page with alerts for a given patient and case.
 *
 * @returns A JSX element representing the page
 */

// eslint-disable-next-line no-undef
export default function PatientAlertsPage(): React.ReactNode {
  const { patient_id, case_id } = useLoaderData<typeof loader>();
  
  const [patientMetaData, setPatientMetaData] = useState(null as unknown as PatientMetaData);
  const [rulesetsByStatus, setRulesetsByStatus] = useState(
    new Map<AmpelStatus, ReactNode[]>([
      [AmpelStatus.RED, []],
      [AmpelStatus.YELLOW, []],
      [AmpelStatus.GREEN, []],
    ]),
  );


  useEffect(() => {
    setPatientMetaData(FakeAlertRepository.getFakePatientMetaData(patient_id || '', case_id || ''));

    const rulesets = FakeAlertRepository.getFakeRulesets();

    const rulesetsByStatus: Map<AmpelStatus, ReactNode[]> = new Map([
      [AmpelStatus.RED, []],
      [AmpelStatus.YELLOW, []],
      [AmpelStatus.GREEN, []],
    ]);
    rulesets.forEach((rs) => {
      switch (rs.ampelStatus) {
        case AmpelStatus.RED:
          rulesetsByStatus.get(AmpelStatus.RED)?.push(
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
          rulesetsByStatus.get(AmpelStatus.YELLOW)?.push(
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
          rulesetsByStatus
            .get(AmpelStatus.GREEN)
            ?.push(
              <InconspicuousStateCard
                key={rs.ruleset}
                title={rs.ruleset}
                description={rs.message || ''}
                creationTime={rs.resultTime}
              />,
            );
          break;
      }
    });

    setRulesetsByStatus(rulesetsByStatus);
  }, []);

   return (
    <PatientAlertsPageInner
      patientMetaData={patientMetaData}
      rulesetsByStatus={rulesetsByStatus}
    />
  );
}
