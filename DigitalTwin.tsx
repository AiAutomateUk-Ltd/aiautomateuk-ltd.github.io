
import React, { useState } from 'react';
import { Play, Pause, RotateCw, Settings2, Info } from 'lucide-react';

const DigitalTwin: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [load, setLoad] = useState(65);

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        {/* Simulator Viewport */}
        <div className="lg:col-span-3 relative bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden group shadow-2xl">
          {/* SVG Industrial Simulator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-10">
            <svg viewBox="0 0 800 500" className="w-full h-full text-slate-700">
              {/* Foundation */}
              <rect x="100" y="400" width="600" height="40" rx="4" fill="currentColor" opacity="0.1" />
              
              {/* Conveyor Belt */}
              <rect x="150" y="300" width="500" height="20" rx="10" fill="currentColor" opacity="0.2" />
              <g className={isSimulating ? 'animate-pulse' : ''}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle 
                    key={i} 
                    cx={170 + i * 42} 
                    cy="310" 
                    r="6" 
                    fill={isSimulating ? '#10b981' : '#334155'} 
                    className={isSimulating ? 'transition-all duration-1000' : ''}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </g>

              {/* Robotic Arm Base */}
              <rect x="350" y="240" width="100" height="60" rx="8" fill="currentColor" opacity="0.3" />
              <g className={`transition-all duration-1000 origin-[400px_270px] ${isSimulating ? 'rotate-12' : ''}`}>
                 <rect x="385" y="100" width="30" height="150" rx="15" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                 <circle cx="400" cy="100" r="20" fill="#10b981" opacity="0.4" className={isSimulating ? 'animate-ping' : ''} />
              </g>

              {/* Data Overlays */}
              {isSimulating && (
                <g className="animate-fade-in">
                  <text x="160" y="280" className="text-[12px] fill-emerald-400 font-mono">FLOW: 12.4m/s</text>
                  <text x="500" y="280" className="text-[12px] fill-emerald-400 font-mono">TEMP: 38°C</text>
                  <line x1="150" y1="300" x2="650" y2="300" stroke="#10b981" strokeWidth="1" strokeDasharray="10 5" className="animate-[dash_2s_linear_infinite]" />
                </g>
              )}
            </svg>
          </div>

          <style>{`
            @keyframes dash {
              to { stroke-dashoffset: -100; }
            }
          `}</style>

          {/* Controls Overlay */}
          <div className="absolute top-8 left-8 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 flex gap-6 items-center">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Model Status</span>
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                {isSimulating ? 'Live Simulation Active' : 'Simulator Standby'}
              </p>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div className="flex gap-2">
              <button 
                onClick={() => setIsSimulating(!isSimulating)}
                className={`p-3 rounded-xl transition-all ${isSimulating ? 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'}`}
              >
                {isSimulating ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all">
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-4">
            <div className="px-4 py-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl text-xs font-mono text-emerald-400">
              LATENCY: 12ms
            </div>
            <div className="px-4 py-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl text-xs font-mono text-emerald-400">
              REFRESH: 60Hz
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white">Simulation Params</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm text-slate-400">Line Load</label>
                  <span className="text-sm font-mono text-emerald-400">{load}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={load} 
                  onChange={(e) => setLoad(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm text-slate-400">Material Density</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option>Polyethylene (High Density)</option>
                  <option>Aluminium Alloy 6061</option>
                  <option>Stainless Steel 304</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
                <span className="text-sm text-slate-300">Gravity Override</span>
                <div className="w-10 h-5 bg-slate-800 rounded-full relative cursor-pointer">
                   <div className="absolute top-1 left-1 w-3 h-3 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3 text-emerald-400">
              <Info className="w-5 h-5" />
              <h4 className="font-bold text-sm">Optimization Note</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on current simulation, increasing conveyor speed by 5% could improve overall throughput without stressing mechanical joints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
