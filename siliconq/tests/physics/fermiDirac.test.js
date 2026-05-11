import { describe, it, expect } from 'vitest';
import { generateFDArray } from '../../src/physics/fermiDirac.js';

describe('Fermi Dirac', () => {
  it('evaluates f(Ef) = 0.5', () => {
    const Ef = 0.5;
    // Force the exact point by passing nPoints=3 across [0, 1.0]
    const data = generateFDArray(Ef, 300, 0, 1.0, 3);
    const centerPoint = data.find(p => Math.abs(p.E - Ef) < 1e-4);
    expect(centerPoint.fE).toBeCloseTo(0.5, 5);
  });

  it('stays within 0-1 range and monotonically decreases', () => {
    const data = generateFDArray(0.5, 300, 0, 1.12, 50);
    const f1 = data.find(p => p.E > 0.1).fE;
    const f2 = data.find(p => p.E > 0.5).fE;
    const f3 = data.find(p => p.E > 0.9).fE;
    
    expect(f1).toBeGreaterThan(f2);
    expect(f2).toBeGreaterThan(f3);
    expect(f1).toBeLessThanOrEqual(1);
    expect(f3).toBeGreaterThanOrEqual(0);
  });

  it('generates valid array respecting max points', () => {
    const data = generateFDArray(0.5, 300, 0, 1.12, 50);
    expect(data.length).toBe(50);
    expect(data[0].E).toBeLessThan(data[data.length-1].E);
    expect(data[0].fE).toBeGreaterThan(data[data.length-1].fE);
  });
});
