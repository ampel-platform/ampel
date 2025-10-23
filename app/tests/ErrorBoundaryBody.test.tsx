import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ErrorBoundaryBody } from '../ErrorBoundaryBody';

describe('ErrorBoundaryBody', () => {
  it('renders a route error response snapshot', () => {
    const error = { status: 404, statusText: 'Not Found', data: 'Seite nicht gefunden' };
    const { container } = render(<>{ErrorBoundaryBody(true, error)}</>);
    expect(container).toMatchSnapshot();
  });

  it('renders an Error instance snapshot', () => {
    const error = new Error('Etwas ist schiefgelaufen');
    error.stack = 'STACKTRACE';
    const { container } = render(<>{ErrorBoundaryBody(false, error)}</>);
    expect(container).toMatchSnapshot();
  });

  it('renders unknown error snapshot', () => {
    const error = 12345;
    const { container } = render(<>{ErrorBoundaryBody(false, error)}</>);
    expect(container).toMatchSnapshot();
  });
});
