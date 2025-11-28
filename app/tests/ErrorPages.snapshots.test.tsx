import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { BadRequest } from '../error/BadRequest';
import { DefaultError } from '../error/DefaultError';
import { Forbidden } from '../error/Forbidden';
import { MaintenanceError } from '../error/MaintenanceError';
import { NotFound } from '../error/NotFound';
import { Timeout } from '../error/Timeout';
import { TooManyRequests } from '../error/TooManyRequests';
import { Unauthorized } from '../error/Unauthorized';
import { ServerError } from '../error/ServerError';

describe('error pages snapshots', () => {
  it('BadRequest', () => expect(render(<BadRequest />).container).toMatchSnapshot());
  it('Unauthorized', () => expect(render(<Unauthorized />).container).toMatchSnapshot());
  it('Forbidden', () => expect(render(<Forbidden />).container).toMatchSnapshot());
  it('NotFound', () => expect(render(<NotFound />).container).toMatchSnapshot());
  it('Timeout', () => expect(render(<Timeout />).container).toMatchSnapshot());
  it('TooManyRequests', () =>
    expect(render(<TooManyRequests retryAfterMs={30_000} />).container).toMatchSnapshot());
  it('MaintenanceError', () =>
    expect(render(<MaintenanceError retryAfterMs={30_000} />).container).toMatchSnapshot());
  it('DefaultError', () => expect(render(<DefaultError />).container).toMatchSnapshot());
  it('ServerError', () =>
    expect(render(<ServerError retryAfterMs={30_000} />).container).toMatchSnapshot());
});
