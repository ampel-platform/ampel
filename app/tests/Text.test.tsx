import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('Test', () => {
  it('should render', () => {
    const { getByText } = render(<div>test</div>);
    expect(getByText('test')).toBeInTheDocument();
  });
});
