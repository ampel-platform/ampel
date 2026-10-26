import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HintMessage } from '../pages/alerts/components/components/HintMessage';

describe('HintMessage', () => {
  it('sanitizes unsafe HTML but preserves allowed content', () => {
    const { container } = render(
      <HintMessage
        message={
          'Safe <strong>text</strong><script>alert(1)</script><a href="javascript:alert(1)">bad</a><a href="https://example.com">ok</a>'
        }
      />,
    );

    expect(screen.getByText(/Safe/)).toBeInTheDocument();
    expect(container.querySelectorAll('script')).toHaveLength(0);

    const links = Array.from(container.querySelectorAll('a'));
    expect(links.find((a) => a.textContent === 'bad')?.getAttribute('href')).toBeNull();
    expect(links.find((a) => a.textContent === 'ok')?.getAttribute('href')).toBe(
      'https://example.com',
    );
  });

  it('renders nothing when sanitized content is empty', () => {
    const { container } = render(<HintMessage message={'<script>alert(1)</script>'} />);

    expect(container.firstChild).toBeNull();
  });
});
