import React from 'react';

import { NotFound } from '../error/NotFound';

// eslint-disable-next-line import/no-default-export
export default function CatchallRedirect(): React.ReactNode {
  return <NotFound />;
}
