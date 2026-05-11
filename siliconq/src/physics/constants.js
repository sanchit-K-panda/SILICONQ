export const CONSTANTS = {
  k: 8.617e-5,
  Eg_300: 1.12,
  Nc_300: 2.8e19,
  Nv_300: 1.04e19,
  ni_300: 1.5e10,
  m0: 9.109e-31,
  me_eff: 1.08 * 9.109e-31,
  mh_eff: 0.81 * 9.109e-31,
};

export const clampT = (T) => Number.isNaN(T) ? 300 : Math.max(100, Math.min(700, T));

export const safeExp = (x) => {
  if (Number.isNaN(x)) return 1;
  if (x > 709) return Math.exp(709);
  if (x < -700) return 0;
  return Math.exp(x);
};
