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
global.ResizeObserver = ResizeObserver;

expect.extend({ toBeInTheDocument /* , weitere matcher */ });
