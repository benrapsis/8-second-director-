import React, { useState } from 'react';
import { Cut } from '../types';
import { Copy, Check, Video, Camera, Lightbulb, Aperture } from 'lucide-react';

interface CutCardProps {
  cut: Cut;
}

const CutCard: React.FC<CutCardProps> = ({ cut }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullDetails = `[SCENE ${cut.sequence}: ${cut.title}]
--------------------------------------------------
ACTION & DIALOGUE:
${cut.action_description}

VISUAL SPECS:
- Camera: ${cut.visuals.camera_movement}
- Angle: ${cut.visuals.angle}
- Lighting: ${cut.visuals.lighting}
- Lens: ${cut.visuals.lens_choice}

AI GENERATION PROMPT:
${cut.generated_prompt}
--------------------------------------------------`;

    navigator.clipboard.writeText(fullDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Connector Line */}
      <div className="absolute left-6 -top-8 bottom-0 w-px bg-zinc-800 group-last:bottom-auto group-last:h-full z-0"></div>

      <div className="relative z-10 flex gap-6 mb-8 last:mb-0">
        {/* Sequence Number */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-400 font-mono text-lg font-bold shadow-lg group-hover:border-amber-500 group-hover:text-amber-500 transition-colors">
            {cut.sequence}
          </div>
        </div>

        {/* Content Card */}
        <div className="flex-grow bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all hover:bg-zinc-900/60">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-start bg-zinc-900/50">
            <div className="pr-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Video size={16} className="text-amber-500" />
                {cut.title}
              </h3>
              <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                {cut.action_description}
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
               <span className="px-2 py-1 bg-zinc-950 rounded border border-zinc-800 text-xs font-mono text-zinc-500">
                00:08s
              </span>
              <button
                onClick={handleCopy}
                className={`
                  flex items-center justify-center w-8 h-8 rounded-lg border transition-all
                  ${copied 
                    ? 'bg-green-500/10 border-green-500/30 text-green-500' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700'
                  }
                `}
                title="Copy All Details"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Technical Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 bg-zinc-950/30 border-b border-zinc-800">
            <div className="flex items-start gap-3">
              <Camera size={16} className="text-zinc-500 mt-1" />
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-600 font-bold">Movement & Angle</span>
                <p className="text-sm text-zinc-300">{cut.visuals.camera_movement}, {cut.visuals.angle}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lightbulb size={16} className="text-zinc-500 mt-1" />
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-600 font-bold">Lighting</span>
                <p className="text-sm text-zinc-300">{cut.visuals.lighting}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:col-span-2">
              <Aperture size={16} className="text-zinc-500 mt-1" />
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-600 font-bold">Lens & Optics</span>
                <p className="text-sm text-zinc-300">{cut.visuals.lens_choice}</p>
              </div>
            </div>
          </div>

          {/* Prompt Section */}
          <div className="bg-black/40">
             <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-white/5">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Visual Prompt</span>
             </div>
            <div className="p-6">
              <p className="font-mono text-sm text-amber-100/90 leading-relaxed">
                {cut.generated_prompt}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CutCard;