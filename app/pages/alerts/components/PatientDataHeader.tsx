import { BookOpenText, Mail, Phone, Signature } from 'lucide-react';
import React from 'react';
import { preload } from 'react-dom';

import LampeLogo from '../../../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../../../assets/UKL_Logo_Vektor.svg';
import { SexUI } from '../types/types';

preload(LampeLogo, { as: 'image' });
preload(UklLogo, { as: 'image' });

const ticketLink =
  'http://s070000010.medizin.uni-leipzig.de:8020/sap/bc/webdynpro/sap/zpm_meldung?sap-client=100';
const contactPhone = '0341 - 97 114';
const mtNummer = 'XXX XXX';
const gebrauchsanweisungLink = '';

interface PatientMetaDataHeaderProps {
  medicalCaseId: string;
  patientId?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  dateOfBirth?: Date | string | null;
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
    <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-[1fr_auto] md:items-end'>
      <div className='min-w-0'>
        <span className='break-words text-xl font-medium text-gray-700 sm:text-2xl md:text-3xl'>
          {safeFirstname} {safeLastname} (*{dobText} | {sexLetter})
        </span>

        <div className='mt-1 flex flex-wrap items-baseline gap-x-10 gap-y-1'>
          <span className='whitespace-nowrap'>
            <span className='mr-2 text-gray-600'>Patientennummer</span>
            <span className='text-violet-800'>{safePatientId}</span>
          </span>
          <span>
            <span className='mr-2 text-gray-600'>Fallnummer</span>
            <span className='text-violet-800'>{safeMedicalCaseId}</span>
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 grid-rows-[auto_auto] items-start justify-start gap-x-6 gap-y-1 md:grid-cols-[auto_auto] md:justify-end'>
        <img
          src={LampeLogo}
          alt='LAMPE Logo'
          className='col-[1] row-[1] h-8 sm:h-9 md:h-12 lg:h-14'
        />
        <img
          src={UklLogo}
          alt='UKL Logo'
          className='col-[2] row-[1] mr-4 h-8 sm:h-9 md:h-12 lg:h-14'
        />

        <span className='col-[1] row-[2] flex items-center gap-1 text-sm text-blue-600 sm:text-base'>
          <Mail className='h-4 w-4 text-gray-600' />
          <a
            href={ticketLink}
            target='_blank'
            rel='noreferrer noopener'
            className='whitespace-nowrap underline decoration-blue-400 underline-offset-2 hover:text-blue-800'
          >
            Servicedesk Medizintechnik
          </a>
        </span>
        <span className='col-[1] row-[3] flex items-center gap-1 text-sm text-gray-600 sm:text-base'>
          <Phone className='h-4 w-4' />
          <span className='whitespace-nowrap'>{contactPhone}</span>
        </span>
        <span className='col-[2] row-[2] flex items-center gap-1 text-sm text-blue-600 sm:text-base'>
          <BookOpenText className='h-4 w-4 text-gray-600' />
          <a
            href={gebrauchsanweisungLink}
            target='_blank'
            rel='noreferrer noopener'
            className='whitespace-nowrap underline decoration-blue-400 underline-offset-2 hover:text-blue-800'
          >
            Gebrauchsanweisung
          </a>
        </span>
        <span className='col-[2] row-[3] flex items-center gap-1 text-sm text-gray-600 sm:text-base'>
          <Signature className='h-4 w-4' />
          <span className='whitespace-nowrap'> MT-Nummer: {mtNummer}</span>
        </span>
      </div>
    </div>
  );
}
