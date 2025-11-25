import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, User } from 'lucide-react';
import { AppState } from '../types';

interface InputFormProps {
  onSubmit: (idea: string, characterName: string) => void;
  appState: AppState;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, appState }) => {
  const [idea, setIdea] = useState('');
  const [characterName, setCharacterName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea, characterName.trim());
    }
  };

  const isLoading = appState === AppState.LOADING;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-1 shadow-2xl shadow-black/50">
        <form onSubmit={handleSubmit} className="relative flex flex-col">
          
          {/* Character Name Input */}
          <div className="relative group border-b border-zinc-800/50">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-500 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              disabled={isLoading}
              placeholder="Main Character Name (Optional)"
              className="w-full bg-zinc-950 text-zinc-200 placeholder-zinc-600 pl-12 pr-4 py-4 rounded-t-xl focus:outline-none focus:bg-zinc-900 transition-all text-base font-medium"
            />
          </div>

          {/* Main Idea Input */}
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isLoading}
            placeholder="Describe your scene or movie concept here... e.g., 'A futuristic samurai walking through a rainy neon marketplace in Tokyo, seeking a hidden temple.'"
            className="w-full h-40 bg-zinc-950 text-zinc-100 placeholder-zinc-600 p-6 rounded-b-xl resize-none focus:outline-none focus:bg-zinc-900/50 transition-all text-lg font-light leading-relaxed"
          />
          
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">
              {idea.length} chars
            </span>
            <button
              type="submit"
              disabled={!idea.trim() || isLoading}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-300
                ${!idea.trim() || isLoading 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-900/20 hover:shadow-amber-500/20 transform hover:-translate-y-0.5'
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Directing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Action!</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Suggestions */}
      {appState === AppState.IDLE && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center text-sm">
          <span className="text-zinc-500 py-1">Try:</span>
          {['Cyberpunk Noir Detective', 'Peaceful Zen Garden Timelapse', 'High Speed F1 Race'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setIdea(suggestion)}
              className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputForm;