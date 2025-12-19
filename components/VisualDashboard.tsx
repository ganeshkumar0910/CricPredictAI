
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell
} from 'recharts';
import { PredictionResult } from '../types';

interface VisualDashboardProps {
  data: PredictionResult;
  playerName: string;
}

const VisualDashboard: React.FC<VisualDashboardProps> = ({ data, playerName }) => {
  const skillData = [
    { subject: 'Vs Pace', A: data.performanceAgainstPace, fullMark: 100 },
    { subject: 'Vs Spin', A: data.performanceAgainstSpin, fullMark: 100 },
    { subject: 'Aggression', A: data.riskLevel === 'Low' ? 30 : data.riskLevel === 'Medium' ? 65 : 90, fullMark: 100 },
    { subject: 'Momentum', A: data.phasedAnalysis[0]?.intensity || 50, fullMark: 100 },
    { subject: 'Milestones', A: (data.probabilityOfFifty + data.probabilityOfThirty) / 1.5, fullMark: 100 },
  ];

  const milestones = [
    { label: '30+', value: data.probabilityOfThirty, color: 'bg-blue-500' },
    { label: '50+', value: data.probabilityOfFifty, color: 'bg-emerald-500' },
    { label: '100+', value: data.probabilityOfHundred, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* Top Level Scoreboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Projection', val: data.expectedRuns.avg, sub: `${data.expectedRuns.min}-${data.expectedRuns.max} Range`, color: 'text-blue-400' },
          { label: 'Strike Rate', val: data.strikeRate, sub: 'Projected Tempo', color: 'text-emerald-400' },
          { label: 'Primary Threat', val: data.primaryThreat, sub: 'Dangerous Matchup', color: 'text-red-400', isText: true },
          { label: 'Risk Rating', val: data.riskLevel, sub: 'Batting Approach', color: data.riskLevel === 'High' ? 'text-orange-500' : 'text-blue-400', isText: true },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <div className={`w-12 h-12 rounded-full bg-current ${stat.color}`}></div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color} truncate`}>{stat.val}</p>
            <p className="text-[10px] text-slate-600 mt-1 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trajectory Analysis */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Projected Run Trajectory</h3>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full border border-blue-500/20">Live Simulation</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.phasedAnalysis}>
                <defs>
                  <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="phase" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="expectedRuns" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRuns)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milestone Probabilities */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Milestone Likelihood</h3>
          <div className="space-y-6 flex-grow flex flex-col justify-center">
            {milestones.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold tracking-tighter">
                  <span className="text-slate-400">{m.label}</span>
                  <span className="text-white">{m.value}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${m.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matchup Radar */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Technical Profile</h3>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} fontWeight="bold" />
                <Radar name={playerName} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight & Advice */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-500 bg-amber-500/5 flex-grow">
            <h3 className="text-sm font-black uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Technical Scouting Report
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
              "{data.technicalAdvice}"
            </p>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-blue-500 bg-blue-500/5">
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3">Key Strategic Insights</h3>
            <ul className="space-y-2">
              {data.keyInsights.slice(0, 3).map((insight, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualDashboard;
