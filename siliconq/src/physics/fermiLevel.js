import { CONSTANTS, clampT } from './constants.js';
import { nc, nv } from './effectiveDOS.js';

export function intrinsicLevel(T) {
  const tClamp = clampT(T);
  const n_v = nv(tClamp);
  const n_c = nc(tClamp);
  
  const val = (3 * CONSTANTS.k * tClamp / 4) * Math.log(n_v / n_c);
  return isFinite(val) ? val : 0;
}

export function fermiLevel(T, n, p, niValue) {
  const tClamp = clampT(T);
  const ei = intrinsicLevel(tClamp);
  
  let ef = ei;
  const kT = CONSTANTS.k * tClamp;
  
  if (n > p && niValue > 0) {
    const ratio = Math.max(1e-30, n / niValue);
    ef = ei + kT * Math.log(ratio);
  } else if (p > n && niValue > 0) {
    const ratio = Math.max(1e-30, p / niValue);
    ef = ei - kT * Math.log(ratio);
  }
  
  return isFinite(ef) ? ef : ei;
}
