import React from 'react';
import { ResultsPanel } from '../results/ResultsPanel.jsx';
import { useSimulationStore } from '../../store/simulationStore.js';

export function ResultsBar() {
  const warnings = useSimulationStore((state) => state.warnings);

  return (
    <footer
      style={{
        flexShrink: 0,
        borderTop: '1px solid var(--border)',
        background: 'rgba(17,24,39,0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '16px 24px',
        overflowY: 'auto',
        maxHeight: 280,
      }}
    >
      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <div style={{
          marginBottom: 16,
          padding: '12px 16px',
          background: 'rgba(255,77,109,0.06)',
          border: '1px solid rgba(255,77,109,0.18)',
          borderRadius: 10,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--accent-red)' }} />
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--accent-red)' }}>
              Simulation Warnings
            </span>
          </div>
          <ul style={{ margin:0, padding:0, paddingLeft:16, listStyle:'disc' }}>
            {warnings.map((warn, idx) => (
              <li key={idx} style={{ fontSize:11, color:'rgba(255,77,109,0.8)', fontFamily:"'JetBrains Mono', monospace", lineHeight:1.8 }}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Metrics header */}
      <div className="sq-section-title --cyan">
        <span className="sq-label">Live Metrics</span>
      </div>

      <ResultsPanel />
    </footer>
  );
}
