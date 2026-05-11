import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import { CONSTANTS } from '../../physics/constants.js';

export function TemperatureSlider() {
  const temperature = useSimulationStore((state) => state.temperature);
  const setTemperature = useSimulationStore((state) => state.setTemperature);
  const kT = (temperature * CONSTANTS.k * 1000).toFixed(2);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <label htmlFor="temp-slider" className="sq-label" style={{ cursor:'pointer' }}>
          Temperature
        </label>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2 }}>
          <span style={{ fontSize:15, fontWeight:700, fontFamily:"'JetBrains Mono', monospace", color:'var(--accent-yellow)', lineHeight:1 }}>
            {temperature} K
          </span>
          <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:"'JetBrains Mono', monospace" }}>
            kT = {kT} meV
          </span>
        </div>
      </div>
      <input
        id="temp-slider"
        type="range"
        min="100"
        max="700"
        step="1"
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
        aria-label="Temperature slider"
        aria-valuetext={`${temperature} Kelvin`}
      />
    </div>
  );
}
