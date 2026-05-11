import React from 'react';
import { PresetSelector } from '../controls/PresetSelector.jsx';
import { ExportButtons } from '../export/ExportButtons.jsx';

export function Header() {
  return (
    <header
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'rgba(17,24,39,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 50,
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <div style={{
          width:36, height:36, borderRadius:10,
          background:'rgba(0,212,255,0.08)',
          border:'1px solid rgba(0,212,255,0.18)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.4}/>
            <path d="M2 12L12 17L22 12" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.65}/>
          </svg>
        </div>
        <div>
          <h1 style={{ fontSize:18, fontWeight:800, letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>
            Silicon<span style={{ color:'var(--accent-cyan)' }}>Q</span>
          </h1>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-muted)', fontFamily:"'JetBrains Mono', monospace" }}>
            Quantum Statistical Simulator
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
        <div style={{ width:220 }}>
          <PresetSelector />
        </div>
        <ExportButtons targetId="chart-render-target" />
      </div>
    </header>
  );
}
