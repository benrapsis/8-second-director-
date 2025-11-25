import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsView from './components/ResultsView';
import { generateDirectorCuts } from './services/geminiService';
import { AppState, DirectorResponse } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [data, setData] = useState<DirectorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (idea: string, characterName: string) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const result = await generateDirectorCuts(idea, characterName);
      setData(result);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to generate director's cuts. Please check your API key and try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 selection:bg-amber-500/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        
        {appState === AppState.IDLE && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in">
             <div className="text-center space-y-4 max-w-2xl">
                <h2 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                  Visualize Your Masterpiece
                </h2>
                <p className="text-zinc-400 text-lg">
                  Turn a single idea into a shot-by-shot production plan. 
                  We generate 8-second cuts with perfect prompts for AI video models.
                </p>
             </div>
             <InputForm onSubmit={handleCreate} appState={appState} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
            <InputForm onSubmit={() => {}} appState={appState} />
            <p className="text-zinc-500 mt-8 font-mono text-sm">Processing scene logic & visual styles...</p>
          </div>
        )}

        {appState === AppState.ERROR && (
           <div className="flex flex-col items-center justify-center min-h-[50vh]">
             <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-xl flex items-center gap-4 max-w-lg">
                <AlertCircle size={24} />
                <p>{error}</p>
             </div>
             <button 
                onClick={handleReset}
                className="mt-6 px-6 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
             >
                Try Again
             </button>
           </div>
        )}

        {appState === AppState.SUCCESS && data && (
          <ResultsView data={data} onReset={handleReset} />
        )}

      </main>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default App;