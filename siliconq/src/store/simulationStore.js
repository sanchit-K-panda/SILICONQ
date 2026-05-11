import { create } from 'zustand';
import { clampT } from '../physics/constants.js';
import { egSilicon } from '../physics/varshni.js';
import { nc, nv } from '../physics/effectiveDOS.js';
import { ni, computeCarriers } from '../physics/carrierDensity.js';
import { fermiLevel } from '../physics/fermiLevel.js';
import { generateFDArray } from '../physics/fermiDirac.js';

const clampDoping = (d) => Number.isNaN(d) ? 1e16 : Math.max(1e12, Math.min(1e20, d));

const computeAll = (state) => {
  const T = clampT(state.temperature);
  const type = state.dopingType;
  
  let Nd = 0;
  let Na = 0;
  if (type === 'n-type') Nd = clampDoping(state.donorConc);
  if (type === 'p-type') Na = clampDoping(state.acceptorConc);
  
  const Eg = egSilicon(T);
  const Nc = nc(T);
  const Nv = nv(T);
  const niValue = ni(T);
  const carriers = computeCarriers(T, Nd, Na);
  const Ef = fermiLevel(T, carriers.n, carriers.p, niValue);
  
  const warnings = [];
  if (carriers.isDegenerate) {
    warnings.push('Degenerate approximation: Carrier stats may be inaccurate.');
  }

  // 1. Fermi-Dirac array (Ev=0, Ec=Eg)
  const Ef_abs = Eg / 2 + Ef; 
  const fermiDiracData = generateFDArray(Ef_abs, T, 0, Eg);
  
  // 2 & 3. Carrier vs Temp & Ef vs Temp sweeps
  const carrierData = [];
  const efData = [];
  for (let tStep = 100; tStep <= 700; tStep += 10) {
    const niT = ni(tStep);
    const carT = computeCarriers(tStep, Nd, Na);
    const efT = fermiLevel(tStep, carT.n, carT.p, niT);
    
    carrierData.push({ T: tStep, n: carT.n, p: carT.p, ni: niT });
    efData.push({ T: tStep, Ef: efT });
  }

  // 4. Ef vs Doping sweep
  const EfVsDopingData = [];
  for (let i = 0; i < 100; i++) {
    const exponent = 12 + i * (8 / 99);
    const N_dop = Math.pow(10, exponent);
    
    const carN = computeCarriers(T, N_dop, 0);
    const efN = fermiLevel(T, carN.n, carN.p, niValue);
    
    const carP = computeCarriers(T, 0, N_dop);
    const efP = fermiLevel(T, carP.n, carP.p, niValue);
    
    EfVsDopingData.push({ N: N_dop, Ef_N: efN, Ef_P: efP });
  }

  return {
    results: { ni: niValue, n: carriers.n, p: carriers.p, Ef, Eg, Nc, Nv, warnings },
    fermiDiracData,
    carrierVsTempData: carrierData,
    EfVsTempData: efData,
    EfVsDopingData
  };
};

const initialState = {
  temperature: 300,
  dopingType: 'n-type',
  donorConc: 1e16,
  acceptorConc: 0,
};

export const useSimulationStore = create((set) => ({
  ...initialState,
  ...computeAll(initialState),

  setTemperature: (temp) => set((state) => {
    const clamped = clampT(temp);
    const next = { ...state, temperature: clamped };
    return { ...next, ...computeAll(next) };
  }),
  setDopingType: (type) => set((state) => {
    const next = { ...state, dopingType: type };
    return { ...next, ...computeAll(next) };
  }),
  setDonorConc: (conc) => set((state) => {
    const clamped = clampDoping(conc);
    const next = { ...state, donorConc: clamped };
    return { ...next, ...computeAll(next) };
  }),
  setAcceptorConc: (conc) => set((state) => {
    const clamped = clampDoping(conc);
    const next = { ...state, acceptorConc: clamped };
    return { ...next, ...computeAll(next) };
  }),
  recomputeSimulation: () => set((state) => ({ ...state, ...computeAll(state) })),
}));
