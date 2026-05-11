import { describe, it, expect } from 'vitest';
import { nc, nv } from '../../src/physics/effectiveDOS.js';
import { CONSTANTS } from '../../src/physics/constants.js';

describe('Effective DOS', () => {
  it('calculates Nc at 300K correctly', () => {
    expect(nc(300)).toBeCloseTo(CONSTANTS.Nc_300, -10);
  });

  it('calculates Nv at 300K correctly', () => {
    expect(nv(300)).toBeCloseTo(CONSTANTS.Nv_300, -10);
  });

  it('increases with temperature and contains no NaN', () => {
    const nc100 = nc(100);
    const nc700 = nc(700);
    expect(Number.isNaN(nc100)).toBe(false);
    expect(nc700).toBeGreaterThan(nc100);
  });
});
