import React from 'react';

import LampeLogo from '../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../assets/UKL_Logo_Vektor.svg';

const contactEmail = 'lampe@uniklinik-leipzig.de';
const contactPhone = '0341 - 97 11342';

export const DefaultError = (): React.ReactNode => (
  <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <img src={UklLogo} width={300} alt='UKL Logo' />
      <br />
      <img src={LampeLogo} width={150} alt='Lampe Logo' />
      <h1>Unerwartete Ansicht</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Diese Seite sollte im regulearen Ablauf nicht erscheinen. Falls Sie diesen Hinweis sehen,
        ist möglicherweise ein Fehler im Aufruf oder in den Anzeigedaten aufgetreten. Bitte helfen
        Sie uns, das Problem zu beheben, indem Sie den Vorfall melden:
      </p>

      <br />
      <p className='whitespace-nowrap'>{contactEmail}</p>

      <p className='whitespace-nowrap'>
        {contactPhone.replace('+49', '0341 -').replace(/\s/g, ' ')}
      </p>
    </div>
  </div>
);
