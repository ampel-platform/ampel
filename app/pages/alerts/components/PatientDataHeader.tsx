import { Mail, Phone } from 'lucide-react';
import React from 'react';

import Logo from '../../../../assets/UKL_Logo_Vektor.svg';
import { SexUI } from '../types/types';

const contactEmail = 'ampel@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

interface PatientMetaDataHeaderProps {
  medicalCaseId: string;
  patientId?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  dateOfBirth?: Date | string | null; // allow ISO strings from tests/loaders
  sex?: SexUI | null;
}

function formatDob(d: Date | string | null | undefined): string {
  if (!d) return 'kein Geburtsdatum';
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return 'kein Geburtsdatum';
  return date.toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' });
}

/**
 * A component to display patient metadata (firstname, lastname, patient ID, case ID, sex, birthdate)
 * in a consistent and visually appealing way.
 * @param {{ fistname: string; lastname: string; patientId: string; medicalCaseId: string; sex: "mänlich" | "weiblich" | "unbekannt"; dateOfBirth: Date }} props
 * @returns {React.ReactNode }
 */
export function PatientMetaDataHeader({
  firstname,
  lastname,
  patientId,
  medicalCaseId,
  sex,
  dateOfBirth,
}: PatientMetaDataHeaderProps): React.ReactNode {
  const safeFirstname = firstname || 'Unbekannt';
  const safeLastname = lastname || 'Unbekannt';
  const safePatientId = patientId || 'Unbekannt';
  const safeMedicalCaseId = medicalCaseId || 'Unbekannt';
  const dobText = formatDob(dateOfBirth);
  const sexLetter = ((sex ?? 'unbekannt') as string).charAt(0).toUpperCase();

  return (
    <div className='flex flex-col gap-y-2'>
      <span className='top-0 flex flex-wrap items-end justify-between gap-3'>
        <span className='break-words text-2xl font-medium text-gray-700 sm:text-3xl'>
          {safeFirstname} {safeLastname} (*{dobText} | {sexLetter})
        </span>
        <img
          src={Logo}
          alt='UKL Logo'
          className='h-8 max-w-full pr-0 sm:h-10 sm:pr-10 md:h-12 lg:h-14'
        />
      </span>

      <div className='flex flex-wrap items-baseline justify-between gap-x-14 gap-y-1'>
        <span className='flex flex-wrap items-baseline gap-x-14 gap-y-1'>
          <span className='whitespace-nowrap'>
            <span className='mr-2 text-gray-600'>Patientennummer</span>
            <span className='text-violet-800'>{safePatientId}</span>
          </span>
          <span>
            <span className='mr-2 text-gray-600'>Fallnummer</span>
            <span className='text-violet-800'>{safeMedicalCaseId}</span>
          </span>
        </span>

        <span className='flex flex-wrap items-baseline gap-x-1 gap-y-1'>
          <span className='mr-10 flex items-center gap-1 text-gray-600'>
            <Mail className='color-gray h-5 w-5 shrink-0' aria-hidden='true' />
            <span className='whitespace-nowrap'>{contactEmail}</span>
          </span>
          <span className='flex items-center gap-1 text-gray-600'>
            <Phone className='color-gray h-5 w-5 shrink-0' aria-hidden='true' />
            <span className='whitespace-nowrap'>{contactPhone}</span>
          </span>
        </span>
      </div>
    </div>
  );
}
