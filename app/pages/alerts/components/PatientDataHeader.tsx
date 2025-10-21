import React from 'react';

import Logo from '../../../../assets/UKL_Logo_Vektor.svg';
import { SexUI } from '../types/types';
import { DefaultableMetadataInfo } from './components/DefaultableMetadataInfo';

const contactEmail = 'ampel@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

interface PatientMetadataHeaderProps {
  medicalCaseId: string;
  patientId?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  dateOfBirth?: Date | null;
  sex: SexUI;
}

/**
 * A component to display patient metadata (firstname, lastname, patient ID, case ID, sex, birthdate)
 * in a consistent and visually appealing way.
 * @param {{ fistname: string; lastname: string; patientId: string; caseId: string; sex: "m nnlich" | "weiblich"; birthdate: Date }} props
 * @returns {React.ReactNode }
 */
export function PatientMetaDataHeader({
  medicalCaseId,
  patientId,
  firstname,
  lastname,
  dateOfBirth,
  sex,
}: PatientMetadataHeaderProps): React.ReactNode {
  const patientNameSupplier = (): string | undefined => {
    return !firstname && !lastname ? undefined : (firstname + ' ' + lastname).trim();
  };

  const patientDateOfBirthSupplier = (): string | undefined => {
    return !dateOfBirth
      ? undefined
      : dateOfBirth.toLocaleDateString('de-DE', {
          hour12: false,
          timeZone: 'Europe/Berlin',
        });
  };

  return (
    <div className='flex w-full flex-row items-center'>
      <div className='flex w-full flex-grow rounded-xl bg-gray-50 px-6 py-2 shadow-sm'>
        <span className='flex w-full items-start justify-evenly'>
          <DefaultableMetadataInfo
            title='Name'
            valueSupplier={patientNameSupplier}
            fallbackValue='unbekannt'
          />
          <DefaultableMetadataInfo
            title='Geburtsdatum'
            valueSupplier={patientDateOfBirthSupplier}
            fallbackValue='unbekant'
          />
          <DefaultableMetadataInfo
            title='Geschlecht'
            valueSupplier={() => sex}
            fallbackValue='unbekannt'
          />
          <DefaultableMetadataInfo
            title='Patientennummer'
            valueSupplier={() => patientId}
            fallbackValue='unbekannt'
          />
          <DefaultableMetadataInfo title='Fallnummer' valueSupplier={() => medicalCaseId} />
        </span>
      </div>

      <div className='flex w-full flex-row justify-end'>
        <img src={Logo} alt='UKL Logo' className='pr-0 sm:h-10 sm:pr-10 md:h-12 lg:h-14' />

        <div className='flex flex-col items-baseline gap-x-1 gap-y-1'>
          <span className='whitespace-nowrap text-gray-600'>{contactEmail}</span>

          <span className='whitespace-nowrap text-gray-600'>
            {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
          </span>
        </div>
      </div>
    </div>
  );
}
