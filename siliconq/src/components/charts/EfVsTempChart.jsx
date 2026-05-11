import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea, ResponsiveContainer } from 'recharts';
import { useSimulationStore } from '../../store/simulationStore.js';

const TOOLTIP_STYLE = { backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)', color: '#f3f4f6', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', padding: 12, fontSize: 12 };
const AXIS_TICK = { fill: '#94a3b8', fontSize: 11 };

export const EfVsTempChart = React.memo(function EfVsTempChart() {
  const data = useSimulationStore((s) => s.EfVsTempData);
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top:20, right:24, left:16, bottom:36 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="T" type="number" domain={[100,700]} stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Temperature (K)', position:'insideBottom', offset:-24, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <YAxis stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Ef − Ei (eV)', angle:-90, position:'insideLeft', offset:0, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE}
            formatter={(v) => [Number(v).toFixed(4), 'Ef − Ei']}
            labelFormatter={(l) => `T: ${l} K`}
            cursor={{ stroke:'#94a3b8', strokeWidth:1, strokeDasharray:'4 4' }}
          />
          <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 6" opacity={0.5} />
          <ReferenceArea x1={100} x2={150} fill="#111827" fillOpacity={0.7} />
          <ReferenceArea x1={150} x2={450} fill="#00d4ff" fillOpacity={0.02} />
          <ReferenceArea x1={450} x2={700} fill="#ff4d6d" fillOpacity={0.02} />
          <Line type="monotone" dataKey="Ef" stroke="#ffd166" dot={false} strokeWidth={2.5} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
