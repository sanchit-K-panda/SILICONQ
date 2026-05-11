import React from 'react';
import * as d3 from 'd3';
import { useSimulationStore } from '../../store/simulationStore.js';

export const BandDiagramSVG = React.memo(function BandDiagramSVG() {
  const results = useSimulationStore((s) => s.results);
  const containerRef = React.useRef(null);
  const [dims, setDims] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDims({ width, height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!results || !isFinite(results.Eg) || !isFinite(results.Ef)) return null;

  const { width, height } = dims;

  if (width === 0 || height === 0) {
    return <div ref={containerRef} style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />;
  }

  const pad = 50;
  const Eg = results.Eg;
  const Ef = results.Ef;
  const E_max = Eg / 2 + 0.5;
  const E_min = -Eg / 2 - 0.5;

  const yScale = d3.scaleLinear().domain([E_min, E_max]).range([height - pad, pad]);
  const Ec_y = yScale(Eg / 2);
  const Ev_y = yScale(-Eg / 2);
  const Ef_y = yScale(Ef);
  const Ei_y = yScale(0);

  return (
    <div ref={containerRef} style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} aria-label="Energy Band Diagram" role="img">
      <svg width={width} height={height}>
        <title>Silicon Energy Band Diagram</title>
        <defs>
          <linearGradient id="vGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4d6d" stopOpacity={0.3}/>
            <stop offset="100%" stopColor="#ff4d6d" stopOpacity={0.02}/>
          </linearGradient>
          <linearGradient id="cGlow" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3}/>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity={0.02}/>
          </linearGradient>
          <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/>
          </marker>
        </defs>

        {/* Valence band region */}
        <rect x={pad} y={Ev_y} width={width - pad * 2} height={height - pad - Ev_y} fill="url(#vGlow)"/>
        <line x1={pad} y1={Ev_y} x2={width - pad} y2={Ev_y} stroke="#ff4d6d" strokeWidth={2.5}/>
        <text x={pad - 8} y={Ev_y + 4} fill="#f3f4f6" textAnchor="end" fontSize="12" fontFamily="'JetBrains Mono', monospace" fontWeight="700">Ev</text>

        {/* Conduction band region */}
        <rect x={pad} y={pad} width={width - pad * 2} height={Ec_y - pad} fill="url(#cGlow)"/>
        <line x1={pad} y1={Ec_y} x2={width - pad} y2={Ec_y} stroke="#00d4ff" strokeWidth={2.5}/>
        <text x={pad - 8} y={Ec_y + 4} fill="#f3f4f6" textAnchor="end" fontSize="12" fontFamily="'JetBrains Mono', monospace" fontWeight="700">Ec</text>

        {/* Intrinsic level */}
        <line x1={pad} y1={Ei_y} x2={width - pad} y2={Ei_y} stroke="#94a3b8" strokeDasharray="3 6" strokeWidth={1} opacity={0.5}/>
        <text x={pad - 8} y={Ei_y + 4} fill="#94a3b8" textAnchor="end" fontSize="10" fontFamily="'JetBrains Mono', monospace">Ei</text>

        {/* Fermi level */}
        <line x1={pad} y1={Ef_y} x2={width - pad} y2={Ef_y} stroke="#ffd166" strokeDasharray="8 5" strokeWidth={2.5}/>
        <text x={width - pad + 12} y={Ef_y + 4} fill="#ffd166" textAnchor="start" fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="700">Ef</text>

        {/* Eg annotation */}
        <g transform={`translate(${width / 2}, 0)`}>
          <line x1={0} y1={Ec_y} x2={0} y2={Ev_y} stroke="#94a3b8" strokeWidth={1} markerEnd="url(#arr)" markerStart="url(#arr)" opacity={0.6}/>
          <rect x={-40} y={Ei_y - 12} width={80} height={24} fill="#111827" stroke="rgba(255,255,255,0.08)" strokeWidth={1} rx={6}/>
          <text x={0} y={Ei_y + 4} fill="#f3f4f6" textAnchor="middle" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Eg = {Eg.toFixed(2)} eV
          </text>
        </g>
      </svg>
    </div>
  );
});
