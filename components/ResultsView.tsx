import React from 'react';
import { DirectorResponse } from '../types';
import CutCard from './CutCard';
import { Download } from 'lucide-react';

interface ResultsViewProps {
  data: DirectorResponse;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  const handleDownloadScript = () => {
    const content = `
TITLE: ${data.title}
LOGLINE: ${data.logline}
MOOD: ${data.mood}

${data.cuts.map(cut => `
--- CUT ${cut.sequence} (${cut.title}) ---
ACTION: ${cut.action_description}
VISUALS: ${cut.visuals.camera_movement}, ${cut.visuals.angle}, ${cut.visuals.lighting}, ${cut.visuals.lens_choice}
PROMPT: ${cut.generated_prompt}
`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title.replace(/\s+/g, '_').toLowerCase()}_script.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      {/* Project Summary */}
      <div className="mb-12 text-center">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase">
          {data.mood}
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">{data.title}</h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          {data.logline}
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
            <button 
                onClick={handleDownloadScript}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-sm"
            >
                <Download size={16} />
                Export Script
            </button>
            <button 
                onClick={onReset}
                className="px-4 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
                Start New Project
            </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative py-8 pl-4 sm:pl-0">
        {data.cuts.map((cut) => (
          <CutCard key={cut.sequence} cut={cut} />
        ))}
      </div>

      {/* Footer Finisher */}
      <div className="text-center py-12 border-t border-zinc-900 mt-8">
         <p className="text-zinc-600 font-mono text-sm">-- END SCENE --</p>
      </div>
    </div>
  );
};

export default ResultsView;
