
import React from 'react';
import { PredictionInputs, PredictionResult } from './types';
import { predictPerformance } from './services/geminiService';
import InputSection from './components/InputSection';
import VisualDashboard from './components/VisualDashboard';

const App: React.FC = () => {
  const [prediction, setPrediction] = React.useState<PredictionResult | null>(null);
  const [lastInputs, setLastInputs] = React.useState<PredictionInputs | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePredict = async (inputs: PredictionInputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictPerformance(inputs);
      setPrediction(result);
      setLastInputs(inputs);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate prediction. Please ensure you have a valid API Key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">CricPredict <span className="text-blue-500">AI</span></h1>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
            <span>Powered by Gemini 3</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <span>Live Stats Analysis</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Input Form */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold mb-2">Performance <br/>Predictor</h2>
              <p className="text-slate-400">Predict any batsman's performance using advanced machine learning reasoning.</p>
            </div>
            <InputSection onPredict={handlePredict} isLoading={loading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-8">
            {prediction && lastInputs ? (
              <div>
                <div className="flex items-end gap-3 mb-6">
                  <h2 className="text-4xl font-black">{lastInputs.batsmanName}</h2>
                  <span className="text-slate-500 pb-1.5 font-medium">vs {lastInputs.opponentTeam}</span>
                </div>
                <VisualDashboard data={prediction} playerName={lastInputs.batsmanName} />
              </div>
            ) : !loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-800 rounded-3xl">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Awaiting Parameters</h3>
                <p className="text-slate-500 max-w-sm">Enter the match details on the left to generate a comprehensive AI-driven performance prediction.</p>
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-b-indigo-500 rounded-full animate-spin-slow"></div>
                  </div>
                </div>
                <p className="mt-8 text-xl font-medium animate-pulse">Analyzing player matchups & venue history...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} CricPredict AI Analytics. For educational and simulation purposes only.</p>
        </div>
      </footer>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
