import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSimulationStore } from '../../store/simulationStore.js';

const TOOLTIP_STYLE = { backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)', color: '#f3f4f6', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', padding: 12, fontSize: 12 };
const AXIS_TICK = { fill: '#94a3b8', fontSize: 11 };

const safeLogFormat = (val) => {
  if (val <= 0 || !isFinite(val)) return '0';
  return val.toExponential(1);
};

export const CarrierVsTempChart = React.memo(function CarrierVsTempChart() {
  const data = useSimulationStore((s) => s.carrierVsTempData);
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <ComposedChart data={data} margin={{ top:20, right:24, left:36, bottom:36 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="T" type="number" domain={[100,700]} stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Temperature (K)', position:'insideBottom', offset:-24, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <YAxis scale="log" domain={[1e4,1e21]} type="number" tickFormatter={safeLogFormat}
            stroke="#94a3b8" tick={AXIS_TICK}
            label={{ value:'Concentration (cm⁻³)', angle:-90, position:'insideLeft', offset:-22, fill:'#f3f4f6', fontSize:13, fontWeight:600 }}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE}
            formatter={(v, name) => [safeLogFormat(v) + ' cm⁻³', name]}
            labelFormatter={(l) => `T: ${l} K`}
            cursor={{ stroke:'#94a3b8', strokeWidth:1, strokeDasharray:'4 4' }}
          />
          <Legend verticalAlign="top" height={32} iconType="circle"
            wrapperStyle={{ fontWeight:600, fontSize:11, paddingBottom:8 }}
          />
          <Line type="monotone" dataKey="n" name="n (electrons)" stroke="#00ff88" dot={false} strokeWidth={2.5} isAnimationActive={false} />
          <Line type="monotone" dataKey="p" name="p (holes)" stroke="#ff4d6d" dot={false} strokeWidth={2.5} isAnimationActive={false} />
          <Line type="monotone" dataKey="ni" name="nᵢ (intrinsic)" stroke="#ffd166" strokeDasharray="5 5" dot={false} strokeWidth={2} isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
});
