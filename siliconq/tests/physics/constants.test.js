import { describe, it, expect } from 'vitest';
import { CONSTANTS, clampT, safeExp } from '../../src/physics/constants.js';

describe('Physics Constants', () => {
  it('validates core constants exist and are finite', () => {
    expect(CONSTANTS.k).toBe(8.617e-5);
    expect(Number.isFinite(CONSTANTS.Eg_300)).toBe(true);
    expect(Number.isFinite(CONSTANTS.Nc_300)).toBe(true);
    expect(Number.isFinite(CONSTANTS.Nv_300)).toBe(true);
    expect(Number.isFinite(CONSTANTS.ni_300)).toBe(true);
  });

  it('clamps temperature safely', () => {
    expect(clampT(50)).toBe(100);
    expect(clampT(300)).toBe(300);
    expect(clampT(800)).toBe(700);
    expect(clampT(NaN)).toBe(300);
  });

  it('protects against exponent overflow', () => {
    expect(safeExp(0)).toBe(1);
    expect(safeExp(700)).toBe(Math.exp(700));
    expect(safeExp(800)).toBe(Math.exp(709));
    expect(safeExp(-800)).toBe(0);
  });
});
