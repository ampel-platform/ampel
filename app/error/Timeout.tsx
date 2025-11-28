import React from 'react';

import { ErrorLayout } from './ErrorLayout';
import { errorHeadingStyle } from './errorStyles';

export const Timeout = (): React.ReactNode => (
  <ErrorLayout>
    <title>LAMPE-CDSS</title>
    <meta charSet='utf-8' />
    <h1 style={errorHeadingStyle}>Das hat zu lange gedauert...</h1>
    <p style={{ maxWidth: '600px', width: 'fit-content', margin: 'auto' }}>
      Versuchen sie es ein anderes Mal erneut.
    </p>
    <br />
  </ErrorLayout>
);
