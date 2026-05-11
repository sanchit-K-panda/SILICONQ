import { describe, it, expect } from 'vitest';
import { ni, computeCarriers } from '../../src/physics/carrierDensity.js';

describe('Carrier Density', () => {
  it('calculates ni at 300K roughly equal to 1.5e10', () => {
    const niVal = ni(300);
    expect(niVal).toBeGreaterThan(1e9);
    expect(niVal).toBeLessThan(2e10);
  });

  it('resolves N-type doping (Nd=1e16) correctly', () => {
    const res = computeCarriers(300, 1e16, 0);
    expect(res.n).toBeCloseTo(1e16, -10);
    const niVal = ni(300);
    expect(res.n * res.p).toBeCloseTo(niVal * niVal, -15);
  });

  it('resolves intrinsic case correctly (Nd=0, Na=0)', () => {
    const res = computeCarriers(300, 0, 0);
    const niVal = ni(300);
    expect(res.n).toBeCloseTo(niVal, -5);
    expect(res.p).toBeCloseTo(niVal, -5);
  });

  it('returns finite outputs and avoids overflow', () => {
    const res = computeCarriers(300, 1e20, 0);
    expect(Number.isFinite(res.n)).toBe(true);
    expect(Number.isFinite(res.p)).toBe(true);
  });

  it('protects against invalid inputs', () => {
    const res = computeCarriers(300, -10, NaN);
    expect(res.n).toBeGreaterThanOrEqual(0);
    expect(res.p).toBeGreaterThanOrEqual(0);
  });
});
