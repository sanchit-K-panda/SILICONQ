import React, { useState, useMemo, useCallback } from 'react';
import { Header, Sidebar, ResultsBar } from './components/layout/index.js';
import { FermiDiracChart, CarrierVsTempChart, EfVsTempChart, EfVsDopingChart, BandDiagramSVG } from './components/charts/index.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'var(--bg-primary)', color:'var(--text-primary)' }}>
          <div className="sq-panel" style={{ padding:32, textAlign:'center', maxWidth:400 }}>
            <h1 style={{ fontSize:18, fontWeight:700, color:'var(--accent-red)', marginBottom:12 }}>Render Error</h1>
            <p style={{ color:'var(--text-muted)', fontSize:14 }}>A critical visualization error occurred.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const TABS = [
  { id: 'fermi',     label: 'Fermi-Dirac f(E)',    short: 'f(E)' },
  { id: 'carrier',   label: 'Carrier vs Temp',      short: 'n,p(T)' },
  { id: 'ef_temp',   label: 'Ef vs Temperature',    short: 'Ef(T)' },
  { id: 'ef_doping', label: 'Ef vs Doping',         short: 'Ef(N)' },
  { id: 'band',      label: 'Band Diagram',         short: 'Bands' }
];

const CHART_MAP = {
  fermi:     FermiDiracChart,
  carrier:   CarrierVsTempChart,
  ef_temp:   EfVsTempChart,
  ef_doping: EfVsDopingChart,
  band:      BandDiagramSVG,
};

const MainArea = React.memo(() => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const ChartComponent = CHART_MAP[activeTab];

  return (
    <main style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
      {/* Tab bar */}
      <nav
        role="tablist"
        style={{
          display:'flex', gap:4, padding:'0 24px',
          borderBottom:'1px solid var(--border)',
          background:'rgba(11,18,32,0.4)',
          flexShrink:0, overflowX:'auto',
        }}
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding:'12px 16px',
                fontSize:13,
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
                background:'none',
                border:'none',
                borderBottom: active ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                cursor:'pointer',
                whiteSpace:'nowrap',
                transition:'all 0.2s',
                marginBottom:-1,
                letterSpacing:'0.01em',
              }}
              onMouseEnter={(e) => { if(!active) e.currentTarget.style.color='var(--text-primary)'; }}
              onMouseLeave={(e) => { if(!active) e.currentTarget.style.color='var(--text-muted)'; }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Chart area */}
      <div style={{ flex:1, padding:20, overflow:'hidden', display:'flex', flexDirection:'column' }}>
        <div
          id="chart-render-target"
          className="sq-panel"
          style={{
            flex:1,
            minHeight:420,
            display:'flex',
            flexDirection:'column',
            padding:16,
            position:'relative',
          }}
        >
          <div style={{ flex:1, position:'relative', minHeight:0 }}>
            <div style={{ position:'absolute', inset:0 }}>
              <ChartComponent />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

function App() {
  return (
    <ErrorBoundary>
      <div style={{ display:'flex', flexDirection:'column', height:'100vh', width:'100%', overflow:'hidden', background:'var(--bg-primary)', color:'var(--text-primary)', fontFamily:"'Inter', system-ui, sans-serif" }}>
        <Header />
        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
          <Sidebar />
          <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
            <MainArea />
            <ResultsBar />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
