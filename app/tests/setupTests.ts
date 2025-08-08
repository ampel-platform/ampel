import {
  toBeInTheDocument /* weitere Matcher falls nötig */,
} from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
// eslint-disable-next-line no-undef
global.ResizeObserver = ResizeObserver;

expect.extend({ toBeInTheDocument /* , weitere matcher */ });
