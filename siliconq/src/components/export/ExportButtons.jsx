import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import { exportPNG } from '../../utils/exportPNG.js';
import { exportCSV } from '../../utils/exportCSV.js';

const btnStyle = {
  padding: '7px 14px',
  fontSize: 12,
  fontWeight: 600,
  background: 'rgba(17,24,39,0.8)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'border-color 0.2s, opacity 0.2s',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
};

export function ExportButtons({ targetId = 'root' }) {
  const temperature = useSimulationStore((state) => state.temperature);
  const dopingType = useSimulationStore((state) => state.dopingType);
  const donorConc = useSimulationStore((state) => state.donorConc);
  const acceptorConc = useSimulationStore((state) => state.acceptorConc);
  const carrierData = useSimulationStore((state) => state.carrierVsTempData);

  const handleExportPNG = () => {
    exportPNG(targetId, `siliconq_chart_T${temperature}.png`);
  };

  const handleExportCSV = () => {
    const Nd = dopingType === 'p-type' ? acceptorConc : donorConc;
    const ndStr = Nd === 0 ? '0' : Nd.toExponential(0).replace('+', '');
    exportCSV(carrierData, `siliconq_T${temperature}_${dopingType}_${ndStr}.csv`);
  };

  const csvDisabled = !carrierData || carrierData.length === 0;

  return (
    <div style={{ display:'flex', gap:8 }}>
      <button
        onClick={handleExportPNG}
        style={btnStyle}
        aria-label="Export visualization to PNG"
        onMouseEnter={(e) => e.currentTarget.style.borderColor='var(--accent-cyan)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor='var(--border)'}
      >
        PNG
      </button>
      <button
        onClick={handleExportCSV}
        disabled={csvDisabled}
        style={{ ...btnStyle, opacity: csvDisabled ? 0.35 : 1, cursor: csvDisabled ? 'not-allowed' : 'pointer' }}
        aria-label="Export raw data to CSV"
        onMouseEnter={(e) => { if(!csvDisabled) e.currentTarget.style.borderColor='var(--accent-cyan)'; }}
        onMouseLeave={(e) => e.currentTarget.style.borderColor='var(--border)'}
      >
        CSV
      </button>
    </div>
  );
}
