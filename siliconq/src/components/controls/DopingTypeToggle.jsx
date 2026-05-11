import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';

const TYPES = [
  { value: 'intrinsic', label: 'Intrinsic', bg: 'var(--accent-yellow)' },
  { value: 'n-type',    label: 'N-Type',     bg: 'var(--accent-green)' },
  { value: 'p-type',    label: 'P-Type',     bg: 'var(--accent-red)' },
];

export function DopingTypeToggle() {
  const dopingType = useSimulationStore((state) => state.dopingType);
  const setDopingType = useSimulationStore((state) => state.setDopingType);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
      <span className="sq-label">Material Type</span>
      <div
        role="group"
        style={{
          display:'flex',
          padding:3,
          borderRadius:10,
          background:'rgba(255,255,255,0.04)',
          border:'1px solid var(--border)',
          gap:3,
        }}
      >
        {TYPES.map((type) => {
          const active = dopingType === type.value;
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => setDopingType(type.value)}
              aria-pressed={active}
              style={{
                flex:1,
                padding:'8px 4px',
                fontSize:11,
                fontWeight:700,
                letterSpacing:'0.05em',
                textTransform:'uppercase',
                border:'none',
                borderRadius:8,
                cursor:'pointer',
                transition:'all 0.2s',
                background: active ? type.bg : 'transparent',
                color: active ? 'var(--bg-primary)' : 'var(--text-muted)',
                boxShadow: active ? `0 2px 8px ${type.bg}33` : 'none',
              }}
            >
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
