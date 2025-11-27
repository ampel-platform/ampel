import React from 'react';
import { preload } from 'react-dom';

import LampeLogo from '../../assets/Lampe_Logo_Vektor.svg';
import UklLogo from '../../assets/UKL_Logo_Vektor.svg';

preload(LampeLogo, { as: 'image' });
preload(UklLogo, { as: 'image' });

export const Forbidden = (): React.ReactNode => (
  <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <img src={UklLogo} width={300} alt='UKL Logo' />
      <br />
      <img src={LampeLogo} width={150} alt='Lampe Logo' />
      <h1>Verboten</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Sie dürfen diese Seite nicht sehen.
      </p>
      <br />
    </div>
  </div>
);
