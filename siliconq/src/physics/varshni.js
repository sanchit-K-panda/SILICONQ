import { clampT } from './constants.js';

export function egSilicon(T) {
  const tClamp = clampT(T);
  const eg = 1.170 - (4.73e-4 * tClamp * tClamp) / (tClamp + 636);
  return isFinite(eg) ? eg : 1.12;
}
