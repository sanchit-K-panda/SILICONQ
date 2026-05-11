import { CONSTANTS, clampT, safeExp } from './constants.js';

export function generateFDArray(Ef, T, Ev, Ec, nPoints = 500) {
  const tClamp = clampT(T);
  const kT = CONSTANTS.k * tClamp;
  const result = [];
  
  const E_start = Ev - 0.5;
  const E_end = Ec + 0.5;
  const step = (E_end - E_start) / Math.max(1, nPoints - 1);
  
  for (let i = 0; i < nPoints; i++) {
    const E = E_start + i * step;
    const exponent = (E - Ef) / kT;
    const fE = 1 / (1 + safeExp(exponent));
    result.push({ E, fE });
  }
  
  return result;
}
