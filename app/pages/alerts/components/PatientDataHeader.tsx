import React from 'react';

import Logo from '../../../../assets/UKL_Logo_Vektor.svg';
import { PatientMetaData } from '../types/types';

type PatientMetaDataHeaderProps = PatientMetaData;

/**
 * A component to display patient metadata (name, patient ID, case ID, sex, birthdate)
 * in a consistent and visually appealing way.
 * @param {{ name: string; patientId: string; caseId: string; sex: "m nnlich" | "weiblich"; birthdate: Date }} props
 * @returns {React.ReactNode }
 */
export function PatientMetaDataHeader({
  name,
  patientId,
  caseId,
  sex,
  birthdate,
}: PatientMetaDataHeaderProps): React.ReactNode {
  return (
    <div className='flex flex-col gap-y-2'>
      <span className='top-0 flex flex-wrap items-start justify-between gap-3'>
        <span className='break-words text-2xl font-medium text-gray-700 sm:text-3xl'>
          {name} (*
          {birthdate.toLocaleDateString('de-DE', {
            hour12: false,
            timeZone: 'Europe/Berlin',
          })}{' '}
          | {sex.charAt(0)})
        </span>
        <img
          src={Logo}
          alt='UKL Logo'
          className='h-8 max-w-full pr-0 sm:h-10 sm:pr-10 md:h-12 lg:h-14'
        />
      </span>

      <div className='flex flex-wrap items-baseline gap-x-12 gap-y-1'>
        <span className='whitespace-nowrap'>
          <span className='mr-2 text-gray-600'>Patientennummer</span>
          <span className='text-violet-800'>{patientId}</span>
        </span>

        <span className='whitespace-nowrap'>
          <span className='mr-2 text-gray-600'>Fallnummer</span>
          <span className='text-violet-800'>{caseId}</span>
        </span>
      </div>
    </div>
  );
}
