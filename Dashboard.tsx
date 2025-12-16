
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Droplets,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const data = [
  { name: '00:00', value: 400 },
  { name: '04:00', value: 300 },
  { name: '08:00', value: 600 },
  { name: '12:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '20:00', value: 900 },
];

const efficiencyData = [
  { time: 'Mon', active: 85, ideal: 100 },
  { time: 'Tue', active: 78, ideal: 100 },
  { time: 'Wed', active: 92, ideal: 100 },
  { time: 'Thu', active: 66, ideal: 100 },
  { time: 'Fri', active: 94, ideal: 100 },
  { time: 'Sat', active: 88, ideal: 100 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:bg-slate-900/60 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Throughput" value="1.2M Units" icon={Activity} color="emerald" trend={12} />
        <StatCard title="Energy Consumption" value="2,450 kWh" icon={Zap} color="amber" trend={-5} />
        <StatCard title="Ambient Temp" value="24.5°C" icon={Thermometer} color="blue" trend={2} />
        <StatCard title="Hydraulic Pressure" value="2,100 PSI" icon={Droplets} color="indigo" trend={-1.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Production Line Efficiency</h3>
              <p className="text-sm text-slate-400">Weekly operational performance vs targets</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="text-xs text-slate-400">Ideal</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="active" stroke="#10b981" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
                <Area type="monotone" dataKey="ideal" stroke="#334155" fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">Live Alerts</h3>
          <p className="text-sm text-slate-400 mb-6">Critical system notifications</p>
          <div className="space-y-4 flex-1">
            {[
              { id: 1, type: 'critical', msg: 'PLC Node #45 Communication Timeout', time: '2m ago' },
              { id: 2, type: 'warning', msg: 'Hydraulic Pressure Variance detected', time: '14m ago' },
              { id: 3, type: 'info', msg: 'Weekly backup scheduled for 02:00 UTC', time: '1h ago' },
              { id: 4, type: 'warning', msg: 'Sensor Calibration due for Unit B', time: '3h ago' },
            ].map(alert => (
              <div key={alert.id} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex gap-4 items-start">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  alert.type === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-200 font-medium leading-tight">{alert.msg}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors">
            View System Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
