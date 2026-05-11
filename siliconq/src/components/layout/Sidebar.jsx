import React from 'react';
import { TemperatureSlider } from '../controls/TemperatureSlider.jsx';
import { DopingTypeToggle } from '../controls/DopingTypeToggle.jsx';
import { DopingSlider } from '../controls/DopingSlider.jsx';
import { useSimulationStore } from '../../store/simulationStore.js';

export function Sidebar() {
  const dopingType = useSimulationStore((state) => state.dopingType);

  return (
    <aside
      style={{
        width: 'var(--sidebar-w)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(11,18,32,0.55)',
        borderRight: '1px solid var(--border)',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '24px 20px',
      }}
    >
      {/* Section title */}
      <div className="sq-section-title --yellow">
        <span className="sq-label">Parameters</span>
      </div>

      {/* Temperature */}
      <TemperatureSlider />

      <div className="sq-divider" style={{ margin:'24px 0' }} />

      {/* Doping section */}
      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        <DopingTypeToggle />
        <DopingSlider type="donor"    disabled={dopingType !== 'n-type'} />
        <DopingSlider type="acceptor" disabled={dopingType !== 'p-type'} />
      </div>
    </aside>
  );
}
