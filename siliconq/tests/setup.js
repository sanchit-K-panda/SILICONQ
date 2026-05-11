import '@testing-library/jest-dom';
import { vi } from 'vitest';

// ResizeObserver mock for Recharts/D3
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mute console errors to keep test output clean, per requirements
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});
