import { describe, it, expect } from 'vitest';
import { egSilicon } from '../../src/physics/varshni.js';

describe('Varshni Equation', () => {
  it('calculates Eg at 300K approximately equal to 1.12eV', () => {
    const eg = egSilicon(300);
    expect(eg).toBeCloseTo(1.124, 2);
  });

  it('returns finite outputs', () => {
    expect(Number.isFinite(egSilicon(100))).toBe(true);
    expect(Number.isFinite(egSilicon(700))).toBe(true);
  });

  it('exhibits monotonic bandgap reduction with temperature', () => {
    const eg100 = egSilicon(100);
    const eg300 = egSilicon(300);
    const eg700 = egSilicon(700);
    expect(eg100).toBeGreaterThan(eg300);
    expect(eg300).toBeGreaterThan(eg700);
  });
});
