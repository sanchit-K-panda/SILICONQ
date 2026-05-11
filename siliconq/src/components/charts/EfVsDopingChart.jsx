import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { useSimulationStore } from '../../store/simulationStore.js';

const TOOLTIP_STYLE = { backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)', color: '#f3f4f6', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', padding: 12, fontSize: 12 };
const AXIS_TICK = { fill: '#94a3b8', fontSize: 11 };

const safeLogFormat = (val) => {
  if (val <= 0 || !isFinite(val)) return '0';
  return val.toExponential(0);
};

export const EfVsDopingChart = React.memo(function EfVsDopingChart() {
  const data = useSimulationStore((s) => s.EfVsDopingData);
  const dopingType = useSimulationStore((s) => s.dopingType);
  const donorConc = useSimulationStore((s) => s.donorConc);
  const acceptorConc = useSimulationStore((s) => s.acceptorConc);
  const results = useSimulationStore((s) => s.results);

  if (!data || data.length === 0) return null;

  const currentDoping = dopingType === 'p-type' ? acceptorConc : donorConc;
  const currentEf = results.Ef;
  const isIntrinsic = dopingType === 'intrinsic';

  return (
    <div style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top:20, right:24, left:16, bottom:36 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="N" scale="log" type="number" domain={[1e12,1e20]}
            tickFormatter={safeLogFormat} stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Doping (cm⁻³)', position:'insideBottom', offset:-24, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <YAxis stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Ef − Ei (eV)', angle:-90, position:'insideLeft', offset:0, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE}
            formatter={(v, name) => [Number(v).toFixed(4), name === 'Ef_N' ? 'N-Type Ef' : 'P-Type Ef']}
            labelFormatter={(l) => `N: ${safeLogFormat(l)} cm⁻³`}
            cursor={{ stroke:'#94a3b8', strokeWidth:1, strokeDasharray:'4 4' }}
          />
          <Legend verticalAlign="top" height={32} iconType="circle"
            wrapperStyle={{ fontWeight:600, fontSize:11, paddingBottom:8 }}
          />
          <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 6" opacity={0.5} />
          <Line type="monotone" dataKey="Ef_N" name="N-Type" stroke="#00ff88" dot={false} strokeWidth={2.5} isAnimationActive={false} />
          <Line type="monotone" dataKey="Ef_P" name="P-Type" stroke="#ff4d6d" dot={false} strokeWidth={2.5} isAnimationActive={false} />
          {!isIntrinsic && (
            <ReferenceDot x={currentDoping} y={currentEf} r={6}
              fill="#030712" stroke="#ffd166" strokeWidth={2.5}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
