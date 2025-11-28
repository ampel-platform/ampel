import React from 'react';

import { ErrorLayout } from './ErrorLayout';
import { errorHeadingStyle } from './errorStyles';

export const Forbidden = (): React.ReactNode => (
  <ErrorLayout>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <h1 style={errorHeadingStyle}>Verboten</h1>
    <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
      Sie dürfen diese Seite nicht sehen.
    </p>
    <br />
  </ErrorLayout>
);
