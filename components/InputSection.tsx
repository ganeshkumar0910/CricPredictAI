
import React from 'react';
import { 
  PredictionInputs, 
  COMMON_TEAMS, 
  COMMON_CONDITIONS, 
  MATCH_FORMATS, 
  TOSS_CONTEXTS, 
  FORM_LEVELS,
  PITCH_NATURES,
  MATCH_TYPES,
  PLAYER_ROLES,
  PRESSURE_LEVELS
} from '../types';

interface InputSectionProps {
  onPredict: (inputs: PredictionInputs) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = React.useState<PredictionInputs>({
    batsmanName: '',
    opponentTeam: COMMON_TEAMS[0],
    ground: '',
    conditions: COMMON_CONDITIONS[0],
    matchFormat: MATCH_FORMATS[0],
    battingOrder: 3,
    tossContext: TOSS_CONTEXTS[0],
    recentForm: FORM_LEVELS[1],
    pitchNature: PITCH_NATURES[1],
    matchType: MATCH_TYPES[0],
    playerRole: PLAYER_ROLES[1],
    pressureLevel: PRESSURE_LEVELS[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batsmanName || !formData.ground) return;
    onPredict(formData);
  };

  const inputClass = "w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-all text-xs text-slate-200 outline-none";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 block";

  return (
    <div className="glass-panel p-5 rounded-2xl shadow-2xl border-t border-white/5">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Core Details */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-tighter">1. Match Core</h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className={labelClass}>Batsman Name</label>
              <input type="text" placeholder="e.g. Steve Smith" className={inputClass} value={formData.batsmanName} onChange={e => setFormData({...formData, batsmanName: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Format</label>
              <select className={inputClass} value={formData.matchFormat} onChange={e => setFormData({...formData, matchFormat: e.target.value})}>
                {MATCH_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Opponent</label>
              <select className={inputClass} value={formData.opponentTeam} onChange={e => setFormData({...formData, opponentTeam: e.target.value})}>
                {COMMON_TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Tactical Details */}
        <section className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">2. Tactical & Environment</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Venue / Ground</label>
              <input type="text" placeholder="Venue..." className={inputClass} value={formData.ground} onChange={e => setFormData({...formData, ground: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Pitch Type</label>
              <select className={inputClass} value={formData.pitchNature} onChange={e => setFormData({...formData, pitchNature: e.target.value})}>
                {PITCH_NATURES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Match Type</label>
              <select className={inputClass} value={formData.matchType} onChange={e => setFormData({...formData, matchType: e.target.value})}>
                {MATCH_TYPES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Conditions</label>
              <select className={inputClass} value={formData.conditions} onChange={e => setFormData({...formData, conditions: e.target.value})}>
                {COMMON_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Player Context */}
        <section className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-tighter">3. Player Status</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Role</label>
              <select className={inputClass} value={formData.playerRole} onChange={e => setFormData({...formData, playerRole: e.target.value})}>
                {PLAYER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Recent Form</label>
              <select className={inputClass} value={formData.recentForm} onChange={e => setFormData({...formData, recentForm: e.target.value})}>
                {FORM_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Batting Pos</label>
              <input type="number" min="1" max="11" className={inputClass} value={formData.battingOrder} onChange={e => setFormData({...formData, battingOrder: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className={labelClass}>Pressure</label>
              <select className={inputClass} value={formData.pressureLevel} onChange={e => setFormData({...formData, pressureLevel: e.target.value})}>
                {PRESSURE_LEVELS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 ${
            isLoading ? 'bg-slate-700 cursor-not-allowed text-slate-500' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-900/20'
          }`}
        >
          {isLoading ? 'Running Simulation...' : 'Generate Advanced Report'}
        </button>
      </form>
    </div>
  );
};

export default InputSection;
