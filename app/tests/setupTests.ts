import {
  toBeInTheDocument /* weitere Matcher falls nötig */,
} from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend({ toBeInTheDocument /* , weitere matcher */ });
