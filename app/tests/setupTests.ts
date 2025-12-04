import { toBeInTheDocument, toHaveTextContent } from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
// eslint-disable-next-line no-undef
(globalThis as typeof globalThis & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver =
  ResizeObserver;

expect.extend({ toBeInTheDocument, toHaveTextContent });
