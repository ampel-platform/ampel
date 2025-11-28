import React from 'react';

import { errorHeadingStyle } from './errorStyles';

export const Unauthorized = (): React.ReactNode => (
  <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 style={errorHeadingStyle}>Fehlende Berechtigungen</h1>
      <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
        Sie haben keine Berechtigung, diese Seite zu sehen.
      </p>
      <br />
    </div>
  </div>
);
