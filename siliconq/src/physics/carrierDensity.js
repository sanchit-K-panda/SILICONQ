import { CONSTANTS, clampT, safeExp } from './constants.js';
import { egSilicon } from './varshni.js';
import { nc, nv } from './effectiveDOS.js';

export function ni(T) {
  const tClamp = clampT(T);
  const eg = egSilicon(tClamp);
  const n_c = nc(tClamp);
  const n_v = nv(tClamp);
  
  const exponent = -eg / (2 * CONSTANTS.k * tClamp);
  const val = Math.sqrt(n_c * n_v) * safeExp(exponent);
  return isFinite(val) ? val : 0;
}

export function computeCarriers(T, Nd, Na) {
  const tClamp = clampT(T);
  const niValue = ni(tClamp);
  
  const ndNum = Number(Nd) || 0;
  const naNum = Number(Na) || 0;
  
  const diff = (ndNum - naNum) / 2;
  const n = diff + Math.sqrt(diff * diff + niValue * niValue);
  const p = n > 0 ? (niValue * niValue) / n : 0;
  
  const isDegenerate = ndNum > 1e18 || naNum > 1e18;
  
  return {
    n: isFinite(n) ? n : 0,
    p: isFinite(p) ? p : 0,
    ni: niValue,
    isDegenerate
  };
}
