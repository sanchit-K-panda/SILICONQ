import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';

export function DopingSlider({ type, disabled }) {
  const isDonor = type === 'donor';
  const val = useSimulationStore((state) => isDonor ? state.donorConc : state.acceptorConc);
  const setVal = useSimulationStore((state) => isDonor ? state.setDonorConc : state.setAcceptorConc);

  const exponent = Math.log10(val);
  const label = isDonor ? 'Donor (Nd)' : 'Acceptor (Na)';
  const displayVal = val.toExponential(2).replace('e+', 'e');
  const color = isDonor ? 'var(--accent-green)' : 'var(--accent-red)';

  return (
    <div style={{
      display:'flex', flexDirection:'column', gap:10, width:'100%',
      opacity: disabled ? 0.25 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      filter: disabled ? 'grayscale(1)' : 'none',
      transition: 'opacity 0.3s, filter 0.3s',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <label htmlFor={`doping-${type}`} className="sq-label" style={{ cursor:'pointer' }}>
          {label}
        </label>
        <span style={{ fontSize:14, fontWeight:700, fontFamily:"'JetBrains Mono', monospace", color, lineHeight:1 }}>
          {displayVal}
          <span style={{ fontSize:10, color:'var(--text-muted)', marginLeft:4 }}>cm⁻³</span>
        </span>
      </div>
      <input
        id={`doping-${type}`}
        type="range"
        min="12"
        max="20"
        step="0.1"
        value={exponent}
        onChange={(e) => setVal(Math.pow(10, Number(e.target.value)))}
        disabled={disabled}
        className={isDonor ? '--green' : '--red'}
        aria-label={`${label} slider`}
        aria-valuetext={`${displayVal} inverse cubic centimeters`}
      />
    </div>
  );
}
