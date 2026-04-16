import React, { ReactNode, useState } from 'react';

import { AlertDetailOverlay } from './components/AlertDetailOverlay';
import { PatientMetaDataHeader } from './components/PatientDataHeader';
import { AlertDetails, AmpelStatus, MedicalCaseMetadata } from './types/types';

interface PatientAlertsPageProps {
  medicalCaseMetadata?: MedicalCaseMetadata;
  rulesetsByStatus: Map<AmpelStatus, ReactNode[]>;
  showHeader?: boolean;
}

export function PatientAlertsPage({
  medicalCaseMetadata,
  rulesetsByStatus,
  showHeader = true,
}: PatientAlertsPageProps): React.ReactNode {
  const [detailOverlayData, setDetailOverlayData] = useState<AlertDetails | null>(null);
  const [isDetailOverlayVisible, setIsDetailOverlayVisible] = useState(false);
  const [inconspicuousStatesVisible, setInconspicuousStatesVisible] = useState(false);

  const displayDetailOverlay = (details: AlertDetails): void => {
    setDetailOverlayData(details);
    openDetailOverlay();
  };

  const hideDetailOverlay = (): void => {
    setIsDetailOverlayVisible(false);
  };

  const openDetailOverlay = (): void => {
    setIsDetailOverlayVisible(true);
  };

  const handleDetailOverlayTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>): void => {
    if (event.target !== event.currentTarget || isDetailOverlayVisible) return;
    setDetailOverlayData(null);
  };

  function renderAlertCards(status: AmpelStatus): ReactNode[] {
    const nodes = rulesetsByStatus.get(status) || [];

    return nodes.map((child) => {
      interface AlertCardChildProps {
        onClick?: () => void;
        alertDetails?: AlertDetails;
      }
      if (!React.isValidElement<AlertCardChildProps>(child)) return child;

      const childProps = child.props;
      const handleClick = (): void => {
        childProps.onClick?.();
        if (childProps.alertDetails) displayDetailOverlay(childProps.alertDetails);
      };

      return React.cloneElement(child, {
        onClick: handleClick,
      });
    });
  }

  if (!rulesetsByStatus) return null;
  const hasMetadata = Boolean(medicalCaseMetadata);

  return (
    <div className='h-full pl-4'>
      <div className='flex h-full w-full flex-col gap-y-10 pt-4'>
        {showHeader && hasMetadata && medicalCaseMetadata && (
          <PatientMetaDataHeader
            medicalCaseId={medicalCaseMetadata.id}
            patientId={medicalCaseMetadata.patient ? medicalCaseMetadata.patient.id : undefined}
            firstname={
              medicalCaseMetadata.patient ? medicalCaseMetadata.patient.firstname : undefined
            }
            lastname={
              medicalCaseMetadata.patient ? medicalCaseMetadata.patient.lastname : undefined
            }
            dateOfBirth={
              medicalCaseMetadata.patient ? medicalCaseMetadata.patient.dateOfBirth : undefined
            }
            sex={medicalCaseMetadata.patient ? medicalCaseMetadata.patient.sex : 'unbekannt'}
          />
        )}

        <div className='relative flex h-full w-full flex-col overflow-x-hidden'>
          {detailOverlayData && (
            <div
              className={`absolute inset-y-0 left-0 z-50 h-full w-full bg-white transition-[transform,opacity,visibility] duration-300 ease-in-out ${
                isDetailOverlayVisible
                  ? 'visible translate-x-0 animate-alert-detail-overlay-open opacity-100'
                  : 'pointer-events-none invisible translate-x-full opacity-0'
              }`}
              onTransitionEnd={handleDetailOverlayTransitionEnd}
              aria-hidden={!isDetailOverlayVisible}
              data-testid='alert-detail-overlay-panel'
            >
              <AlertDetailOverlay
                data={detailOverlayData}
                onClose={hideDetailOverlay}
                key={detailOverlayData.ruleset}
              />
            </div>
          )}

          <div className='ml-2 flex h-full w-full flex-col gap-y-20 pr-4'>
            <div className='grid grid-cols-1 gap-12 lg:auto-rows-min lg:grid-cols-2'>
              <div className='order-1 flex w-full flex-col items-start gap-y-4 lg:col-span-1'>
                <div className='flex flex-row items-baseline gap-x-4'>
                  <span className='text-lg text-gray-600'>Kritische Zustände</span>
                  <span className='rounded-md bg-rose-100 px-3 text-base text-rose-800'>
                    {rulesetsByStatus.get(AmpelStatus.RED)?.length}
                  </span>
                </div>

                <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2'>
                  {renderAlertCards(AmpelStatus.RED)}
                </div>
              </div>
              <div className='order-2 flex w-full flex-col items-start gap-y-4 lg:col-span-1'>
                <div className='flex flex-row items-baseline gap-x-4'>
                  <span className='text-lg text-gray-600'>Warnende Zustände</span>
                  <span className='rounded-md bg-amber-100 px-3 text-base text-amber-800'>
                    {rulesetsByStatus.get(AmpelStatus.YELLOW)?.length}
                  </span>
                </div>

                <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2'>
                  {renderAlertCards(AmpelStatus.YELLOW)}
                </div>
              </div>
            </div>

            <div className='order-3 flex h-full w-full flex-col gap-y-4 pr-4 lg:col-span-2'>
              <button
                type='button'
                className='flex flex-row items-center gap-x-4 text-gray-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2'
                onClick={() => setInconspicuousStatesVisible(!inconspicuousStatesVisible)}
                aria-expanded={inconspicuousStatesVisible}
                aria-controls='inconspicuous-states-section'
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
                    aria-hidden='true'
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
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </button>

              <div
                id='inconspicuous-states-section'
                className={`grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 xl:grid-cols-3 ${
                  inconspicuousStatesVisible
                    ? 'visible translate-x-0 opacity-100'
                    : 'pointer-events-none invisible translate-x-full opacity-0'
                }`}
              >
                {renderAlertCards(AmpelStatus.GREEN)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
