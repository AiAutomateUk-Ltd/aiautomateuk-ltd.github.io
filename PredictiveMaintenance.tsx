
import React, { useState } from 'react';
import { analyzePredictiveMaintenance } from '../geminiService';
import { MaintenanceReport } from '../types';
import { 
  Cpu, 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  RefreshCcw,
  Zap,
  Gauge
} from 'lucide-react';

const MOCK_SENSORS = [
  { sensor: 'Vibration-X', value: '4.2', unit: 'mm/s', status: 'normal' },
  { sensor: 'Bearing Temp', value: '72.4', unit: '°C', status: 'warning' },
  { sensor: 'Lubricant pH', value: '6.8', unit: 'pH', status: 'normal' },
  { sensor: 'Motor Load', value: '88', unit: '%', status: 'warning' },
];

const PredictiveMaintenance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MaintenanceReport | null>(null);

  const handleAnalysis = async () => {
    setLoading(true);
    const result = await analyzePredictiveMaintenance(MOCK_SENSORS);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 border border-slate-800 p-8 rounded-[32px]">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Predictive Maintenance Analysis</h2>
          <p className="text-slate-400 max-w-lg">
            Leverage Gemini 2.5 Flash to analyze real-time sensor streams and predict potential failures before they occur.
          </p>
        </div>
        <button 
          onClick={handleAnalysis}
          disabled={loading}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 shrink-0"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
          {loading ? 'Analyzing Neural Patterns...' : 'Run AI Diagnostic'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sensor Grid */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Real-time Ingest
            </h3>
            <div className="space-y-4">
              {MOCK_SENSORS.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex justify-between items-center group hover:border-emerald-500/30 transition-colors">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{s.sensor}</p>
                    <p className="text-xl font-bold text-white">{s.value} <span className="text-sm font-normal text-slate-500">{s.unit}</span></p>
                  </div>
                  <div className={`p-2 rounded-lg ${s.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <Gauge className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
              <RefreshCcw className="w-3 h-3" /> Refresh Streams
            </button>
          </div>
        </div>

        {/* AI Output */}
        <div className="lg:col-span-2">
          {report ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="p-8 border-b border-slate-800 bg-emerald-500/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl">
                      <Zap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">AI Diagnostic Report</h3>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-400 text-sm font-bold">
                    Confidence: {report.confidence}%
                  </div>
                </div>
                <p className="text-lg text-slate-200 leading-relaxed font-medium">
                  {report.prediction}
                </p>
              </div>
              <div className="p-8 space-y-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Actionable Recommendations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800 hover:bg-slate-900/50 transition-colors">
                      <div className="mt-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[32px] p-12 text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                <BrainCircuit className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">Awaiting Neural Link</h3>
              <p className="text-slate-500 max-w-sm">
                Connect your industrial sensors and trigger a diagnostic scan to receive AI-powered maintenance forecasts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictiveMaintenance;
