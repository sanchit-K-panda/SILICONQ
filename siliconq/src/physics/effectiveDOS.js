import { CONSTANTS, clampT } from './constants.js';

export function nc(T) {
  const tClamp = clampT(T);
  const val = CONSTANTS.Nc_300 * Math.pow(tClamp / 300, 1.5);
  return isFinite(val) ? val : CONSTANTS.Nc_300;
}

export function nv(T) {
  const tClamp = clampT(T);
  const val = CONSTANTS.Nv_300 * Math.pow(tClamp / 300, 1.5);
  return isFinite(val) ? val : CONSTANTS.Nv_300;
}
