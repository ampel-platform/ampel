/* eslint-disable import/no-default-export */
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ReactNode, useEffect, useState } from 'react';

import { FakeAlertRepository } from './AmpelResultRepository';
import { AlertCard } from './components/AlertCard';
import { AlertDetailOverlay } from './components/AlertDetailOverlay';
import { InconspicuousStateCard } from './components/InconspicuousStateCard';
import { PatientMetaDataHeader } from './components/PatientDataHeader';
import { AlertDetails, AlertType, AmpelStatus, PatientMetaData } from './types';
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
export default function TestPatientAlertsPage(): React.ReactNode {
  const { patient_id, case_id } = useLoaderData<typeof loader>();
  const [detailOverlayData, setDetailOverlayData] = useState(null as unknown as AlertDetails);
  const [detailOverlayVisibilityClasses, setDetailOverlayVisibilityClasses] = useState('left-full');
  const [inconspicuousStatesVisible, setInconspicuousStatesVisible] = useState(false);

  const [patientMetaData, setPatientMetaData] = useState(null as unknown as PatientMetaData);
  const [rulesetsByStatus, setRulesetsByStatus] = useState(
    new Map<AmpelStatus, ReactNode[]>([
      [AmpelStatus.RED, []],
      [AmpelStatus.YELLOW, []],
      [AmpelStatus.GREEN, []],
    ]),
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const displayDetailOverlay = (details: AlertDetails) => {
    setDetailOverlayData(details);
    setDetailOverlayVisibilityClasses('left-0');
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const hideDetailOverlay = () => {
    setDetailOverlayVisibilityClasses('left-full');
  };

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
              onClick={() =>
                displayDetailOverlay({
                  ruleset: rs.ruleset,
                  ampelStatus: AlertType.Critical,
                  message: rs.message,
                  resultTime: rs.resultTime,
                  rulesetHistory: rs.history,
                  links: rs.links || [],
                })
              }
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
              onClick={() =>
                displayDetailOverlay({
                  ruleset: rs.ruleset,
                  ampelStatus: AlertType.Warning,
                  message: rs.message,
                  resultTime: rs.resultTime,
                  rulesetHistory: rs.history,
                  links: rs.links || [],
                })
              }
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
    patientMetaData &&
    rulesetsByStatus && (
      <div className='h-full w-full px-4'>
        <div className='flex h-full w-full flex-col gap-y-10'>
          <PatientMetaDataHeader
            name={patientMetaData.name}
            patientId={patientMetaData.patientId}
            caseId={patientMetaData.caseId}
            sex={patientMetaData.sex}
            birthdate={patientMetaData.birthdate}
          />

          <div className='relative flex h-full w-full flex-col'>
            <div
              className={`absolute z-50 h-full w-full transition-all duration-500 ease-in-out ${detailOverlayVisibilityClasses}`}
            >
              <AlertDetailOverlay data={detailOverlayData} onClose={hideDetailOverlay} />
            </div>

            <div className='flex h-full w-full flex-col gap-y-20'>
              <div className='flex flex-row gap-x-12'>
                <div className='flex w-full flex-col items-start gap-y-4'>
                  <div className='flex flex-row items-baseline gap-x-4'>
                    <span className='text-lg text-gray-600'>Kritische Zustände</span>
                    <span className='rounded-md bg-rose-100 px-3 text-base text-rose-800'>
                      {rulesetsByStatus.get(AmpelStatus.RED)?.length}
                    </span>
                  </div>

                  <div className='grid w-full grid-cols-2 gap-3'>
                    {rulesetsByStatus.get(AmpelStatus.RED)}
                  </div>
                </div>
                <div className='flex w-full flex-col items-start gap-y-4'>
                  <div className='flex flex-row items-baseline gap-x-4'>
                    <span className='text-lg text-gray-600'>Warnende Zustände</span>
                    <span className='rounded-md bg-amber-100 px-3 text-base text-amber-800'>
                      {rulesetsByStatus.get(AmpelStatus.YELLOW)?.length}
                    </span>
                  </div>

                  <div className='grid w-full grid-cols-2 gap-3'>
                    {rulesetsByStatus.get(AmpelStatus.YELLOW)}
                  </div>
                </div>
              </div>

              <div className='flex h-full w-full flex-col gap-y-4'>
                <a
                  className='flex flex-row items-center gap-x-4 text-gray-600 hover:cursor-pointer'
                  onClick={() => setInconspicuousStatesVisible(!inconspicuousStatesVisible)}
                >
                  <span className='text-lg'>Unauffällige Zustände</span>
                  <span className='rounded-md bg-gray-100 px-3 text-base text-gray-800'>
                    {rulesetsByStatus.get(AmpelStatus.GREEN)?.length}
                  </span>
                  {!inconspicuousStatesVisible && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      className='size-4'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  {inconspicuousStatesVisible && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      className='size-4'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </a>

                <div
                  className={`grid grid-cols-3 gap-3 overflow-hidden ${inconspicuousStatesVisible ? 'inline-grid' : 'hidden'}`}
                >
                  {rulesetsByStatus.get(AmpelStatus.GREEN)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
