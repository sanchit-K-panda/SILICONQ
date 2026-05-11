import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';

const PRESETS = [
  { label: 'Si at 300K Intrinsic',       temp: 300, type: 'intrinsic', nd: 1e16, na: 0 },
  { label: 'Si at 300K N-type 1e16',     temp: 300, type: 'n-type',    nd: 1e16, na: 0 },
  { label: 'Si at 300K P-type 1e16',     temp: 300, type: 'p-type',    nd: 0,    na: 1e16 },
  { label: 'High-temp intrinsic 500K',   temp: 500, type: 'intrinsic', nd: 1e16, na: 0 },
  { label: 'Freeze-out demo 100K',       temp: 100, type: 'n-type',    nd: 1e16, na: 0 },
  { label: 'Degenerate N-type 1e19',     temp: 300, type: 'n-type',    nd: 1e19, na: 0 },
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
