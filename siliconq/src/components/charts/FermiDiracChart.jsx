import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { useSimulationStore } from '../../store/simulationStore.js';

const TOOLTIP_STYLE = { backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)', color: '#f3f4f6', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', padding: 12, fontSize: 12 };
const AXIS_TICK = { fill: '#94a3b8', fontSize: 11 };

export const FermiDiracChart = React.memo(function FermiDiracChart() {
  const data = useSimulationStore((s) => s.fermiDiracData);
  const results = useSimulationStore((s) => s.results);

  if (!data || data.length === 0) return null;

  const { Eg, Ef } = results;
  const Ec = Eg;
  const Ev = 0;
  const Ef_abs = Eg / 2 + Ef;

  return (
    <div style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top:20, right:24, left:16, bottom:36 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="E" type="number" domain={['dataMin','dataMax']}
            tickFormatter={(v) => v.toFixed(2)} stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Energy (eV)', position:'insideBottom', offset:-24, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <YAxis domain={[0,1]} stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'f(E)', angle:-90, position:'insideLeft', offset:0, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE}
            formatter={(v) => [v.toFixed(4), 'Probability']}
            labelFormatter={(l) => `E: ${Number(l).toFixed(3)} eV`}
            cursor={{ stroke:'#94a3b8', strokeWidth:1, strokeDasharray:'4 4' }}
          />
          <ReferenceLine x={Ec} stroke="#00d4ff" strokeDasharray="4 4" opacity={0.5} label={{ value:'Ec', fill:'#00d4ff', position:'top', fontSize:11, fontWeight:700 }} />
          <ReferenceLine x={Ev} stroke="#ff4d6d" strokeDasharray="4 4" opacity={0.5} label={{ value:'Ev', fill:'#ff4d6d', position:'bottom', fontSize:11, fontWeight:700 }} />
          <ReferenceLine x={Ef_abs} stroke="#ffd166" strokeWidth={2} label={{ value:'Ef', fill:'#ffd166', position:'top', fontSize:11, fontWeight:700 }} />
          <Line type="monotone" dataKey="fE" stroke="#00d4ff" dot={false} strokeWidth={2.5} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
