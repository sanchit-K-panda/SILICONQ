import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import { formatScientific } from '../../utils/formatNumber.js';

const MetricCard = React.memo(({ label, value, unit, color, glow }) => {
  const handleCopy = () => {
    const text = formatScientific(value);
    if (text !== 'N/A') navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="sq-card"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
      aria-label={`Copy ${label} value`}
      title="Click to copy"
      style={{
        cursor:'pointer',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        minWidth:0,
        ...(glow ? { borderColor: `${color}22`, boxShadow: `0 0 16px ${color}0a` } : {}),
      }}
    >
      <span className="sq-label" style={{ marginBottom:8 }}>{label}</span>
      <div style={{ display:'flex', alignItems:'baseline', gap:6, minWidth:0 }}>
        <span style={{
          fontSize:20,
          fontWeight:700,
          fontFamily:"'JetBrains Mono', monospace",
          color: color || 'var(--text-primary)',
          lineHeight:1,
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap',
        }}>
          {formatScientific(value)}
        </span>
        <span style={{ fontSize:11, color:'var(--text-muted)', fontFamily:"'JetBrains Mono', monospace", flexShrink:0 }}>
          {unit}
        </span>
      </div>
    </div>
  );
});

export function ResultsPanel() {
  const results = useSimulationStore((state) => state.results);
  if (!results) return null;

  return (
    <div style={{
      display:'grid',
      gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',
      gap:10,
      width:'100%',
    }}>
      <MetricCard label="Electron (n)"      value={results.n}  unit="cm⁻³" color="var(--accent-cyan)"   glow />
      <MetricCard label="Hole (p)"           value={results.p}  unit="cm⁻³" color="var(--accent-red)"    glow />
      <MetricCard label="Intrinsic (nᵢ)"    value={results.ni} unit="cm⁻³" color="var(--accent-yellow)" />
      <MetricCard label="Fermi Level (Ef)"   value={results.Ef} unit="eV"   color="var(--text-primary)"  />
      <MetricCard label="Bandgap (Eg)"       value={results.Eg} unit="eV"   color="var(--text-primary)"  />
      <MetricCard label="Eff. DOS (Nc)"      value={results.Nc} unit="cm⁻³" color="var(--text-muted)"    />
      <MetricCard label="Eff. DOS (Nv)"      value={results.Nv} unit="cm⁻³" color="var(--text-muted)"    />
    </div>
  );
}
