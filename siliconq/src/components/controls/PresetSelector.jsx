import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';

const PRESETS = [
  { label: 'Apple A17 Pro (3nm TSMC)',            temp: 358, type: 'n-type',    nd: 5e18, na: 0 },
  { label: 'Snapdragon 8 Gen 3 (4nm Samsung)',    temp: 345, type: 'n-type',    nd: 2e18, na: 0 },
  { label: 'Intel Core i9-14900K (Intel 7)',       temp: 373, type: 'n-type',    nd: 1e17, na: 0 },
  { label: 'AMD Ryzen 9 7950X (5nm TSMC)',         temp: 363, type: 'p-type',    nd: 0,    na: 3e18 },
  { label: 'NVIDIA H100 (4nm TSMC)',               temp: 353, type: 'n-type',    nd: 8e18, na: 0 },
  { label: 'Qualcomm X75 5G Modem',                temp: 338, type: 'n-type',    nd: 1e17, na: 0 },
  { label: 'Samsung Exynos 2400 (4nm)',            temp: 348, type: 'p-type',    nd: 0,    na: 4e18 },
  { label: 'MediaTek Dimensity 9300 (4nm)',        temp: 340, type: 'n-type',    nd: 2e18, na: 0 },
  { label: 'Intel Gaudi 3 AI Accelerator',         temp: 368, type: 'n-type',    nd: 6e18, na: 0 },
  { label: 'Google Tensor G4 (4nm Samsung)',       temp: 350, type: 'p-type',    nd: 0,    na: 2e18 },
  { label: 'AMD MI300X (5nm TSMC)',                temp: 358, type: 'n-type',    nd: 7e18, na: 0 },
  { label: 'Intrinsic Si — Room Temp',             temp: 300, type: 'intrinsic', nd: 0,    na: 0 },
  { label: 'Cryogenic CMOS (Quantum QPU)',         temp: 100, type: 'n-type',    nd: 1e16, na: 0 },
];

export function PresetSelector() {
  const setTemperature = useSimulationStore((state) => state.setTemperature);
  const setDopingType = useSimulationStore((state) => state.setDopingType);
  const setDonorConc = useSimulationStore((state) => state.setDonorConc);
  const setAcceptorConc = useSimulationStore((state) => state.setAcceptorConc);

  const handleSelect = (e) => {
    const idx = Number(e.target.value);
    if (idx === -1) return;
    const p = PRESETS[idx];
    setTemperature(p.temp);
    setDopingType(p.type);
    setDonorConc(p.nd);
    setAcceptorConc(p.na);
  };

  return (
    <div style={{ position:'relative', width:'100%' }}>
      <select
        id="preset-select"
        onChange={handleSelect}
        defaultValue="-1"
        aria-label="Load preset scenario"
        style={{
          appearance:'none',
          WebkitAppearance:'none',
          width:'100%',
          padding:'8px 32px 8px 12px',
          fontSize:12,
          fontWeight:600,
          background:'rgba(17,24,39,0.8)',
          border:'1px solid var(--border)',
          borderRadius:8,
          color:'var(--text-primary)',
          cursor:'pointer',
          outline:'none',
          transition:'border-color 0.2s',
          fontFamily:'inherit',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor='var(--accent-cyan)'}
        onBlur={(e) => e.currentTarget.style.borderColor='var(--border)'}
      >
        <option value="-1" disabled>Load scenario…</option>
        {PRESETS.map((p, i) => (
          <option key={i} value={i}>{p.label}</option>
        ))}
      </select>
      <div style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', color:'var(--text-muted)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
