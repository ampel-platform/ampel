import React from 'react';

import LampeLogo from '../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../assets/UKL_Logo_Vektor.svg';

const contactEmail = 'lampe@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

export const ServerError = (): React.ReactNode => (
  <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <img src={UklLogo} width={300} alt='UKL Logo' />
    <br />
    <img src={LampeLogo} width={150} alt='Lampe Logo' />
    <h1>Server Fehler</h1>
    <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
      Geplante Wartung. Die Anwendung ist vorübergehend nicht verfügbar. Bitte versuchen Sie es in 2
      Stunden erneut.
    </p>
    <br />
    <details className='mt-4'>
      <summary className='cursor-pointer list-none text-sm underline hover:no-underline'>
        Helfen Sie uns bei Rückfragen
      </summary>
      <div className='mt-3 space-y-1'>
        <p className='whitespace-nowrap'>{contactEmail}</p>
        <p className='whitespace-nowrap'>
          {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
        </p>
      </div>
    </details>
  </div>
);
