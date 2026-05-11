import { describe, it, expect } from 'vitest';
import { intrinsicLevel, fermiLevel } from '../../src/physics/fermiLevel.js';

describe('Fermi Level', () => {
  it('shifts upward for N-type and downward for P-type', () => {
    const T = 300;
    const Ei = intrinsicLevel(T);
    const Ef_n = fermiLevel(T, 1e16, 1e4, 1.5e10);
    const Ef_p = fermiLevel(T, 1e4, 1e16, 1.5e10);
    
    expect(Ef_n).toBeGreaterThan(Ei);
    expect(Ef_p).toBeLessThan(Ei);
  });

  it('approaches Ei at high temperatures (intrinsic limit)', () => {
    const T = 700;
    const Ei = intrinsicLevel(T);
    const Ef = fermiLevel(T, 1e15, 1e15, 1e17);
    expect(Ef).toBeCloseTo(Ei, 5);
  });

  it('returns finite outputs and avoids NaN propagation', () => {
    const Ei = intrinsicLevel(300);
    expect(Number.isFinite(Ei)).toBe(true);
    
    const Ef_invalid = fermiLevel(300, NaN, NaN, NaN);
    expect(Ef_invalid).toBe(Ei);
  });
});
