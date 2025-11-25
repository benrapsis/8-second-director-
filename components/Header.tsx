import React from 'react';
import { Clapperboard, Film } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-lg text-black">
            <Clapperboard size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              8 SECOND <span className="text-amber-500">DIRECTOR</span>
            </h1>
            <p className="text-xs text-zinc-400 tracking-wider uppercase">AI Cinematography Assistant</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-sm">
          <Film size={16} />
          <span>v1.0.0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
