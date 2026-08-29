import React from 'react';
import { Activity, Gauge, Flame, Sparkles, Clock, Zap } from 'lucide-react';
import { TextGraphicProject, AnimationType } from '../types';

interface AnimationControlsProps {
  project: TextGraphicProject;
  onUpdateProject: (updater: (prev: TextGraphicProject) => TextGraphicProject) => void;
}

const ANIMATION_TYPES: { id: AnimationType; name: string; icon: string; desc: string }[] = [
  { id: 'bounce', name: 'Molleggio & Rimbalzo', icon: '🦘', desc: 'Effetto elastico dinamico stile cartoon' },
  { id: 'wave', name: 'Onda Sinusoidale', icon: '🌊', desc: 'Movimento fluido a onda tra le lettere' },
  { id: 'float', name: 'Galleggiamento Dolce', icon: '☁️', desc: 'Oscillazione soffice nell\'aria' },
  { id: 'pulse', name: 'Battito & Pulsazione', icon: '💓', desc: 'Ingrandimento ritmico 3D' },
  { id: 'shimmer', name: 'Bagliore Scintillante', icon: '✨', desc: 'Luce riflessa che scorre sul testo' },
  { id: 'wobble', name: 'Oscillazione 3D', icon: '🤹', desc: 'Inclinazione e bilanciamento morbido' },
  { id: 'pop', name: 'Pop & Drop Festoso', icon: '🎈', desc: 'Scatti a molla allegri e cadenzati' },
  { id: 'rainbow', name: 'Cangiante Arcobaleno', icon: '🌈', desc: 'Tinte di colore animate in continuo' },
];

export function AnimationControls({ project, onUpdateProject }: AnimationControlsProps) {
  const handleSetType = (type: AnimationType) => {
    onUpdateProject((prev) => ({
      ...prev,
      animation: { ...prev.animation, type },
    }));
  };

  const handleUpdate = (updates: Partial<typeof project.animation>) => {
    onUpdateProject((prev) => ({
      ...prev,
      animation: { ...prev.animation, ...updates },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Animation Presets Grid */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
          <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Tipo di Animazione Movimento
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ANIMATION_TYPES.map((anim) => {
            const isSelected = project.animation.type === anim.id;
            return (
              <button
                key={anim.id}
                onClick={() => handleSetType(anim.id)}
                className={`p-3 rounded-2xl border-2 border-[#1A1A1A] text-left flex items-start gap-3 transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#33CCFF] text-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <span className="text-2xl">{anim.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-[#1A1A1A] flex items-center justify-between">
                    <span>{anim.name}</span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D00] border border-[#1A1A1A]"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#555] font-medium leading-tight mt-0.5">
                    {anim.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Speed & Dynamics Sliders */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
          <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Velocità &amp; Intensità
          </h2>
        </div>

        <div className="space-y-4">
          {/* Speed */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#666] mb-1">
              <span>Velocità di Riproduzione</span>
              <span className="font-mono text-[#FF3D00] font-black">
                {project.animation.speed.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.4"
              step="0.1"
              value={project.animation.speed}
              onChange={(e) => handleUpdate({ speed: parseFloat(e.target.value) })}
              className="w-full accent-[#FF3D00] h-2 bg-[#EEE] rounded-lg border border-[#1A1A1A] cursor-pointer"
            />
          </div>

          {/* Intensity */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#666] mb-1">
              <span>Ampiezza Movimento (Rimbalzo)</span>
              <span className="font-mono text-[#FF3D00] font-black">
                {Math.round(project.animation.intensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={project.animation.intensity}
              onChange={(e) => handleUpdate({ intensity: parseFloat(e.target.value) })}
              className="w-full accent-[#FF3D00] h-2 bg-[#EEE] rounded-lg border border-[#1A1A1A] cursor-pointer"
            />
          </div>

          {/* Loop Duration */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#666] mb-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
                Durata Loop per Esportazione
              </span>
              <span className="font-mono text-[#FF3D00] font-black">
                {project.animation.durationSeconds} secondi
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 3, 4, 5].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleUpdate({ durationSeconds: sec })}
                  className={`py-2 rounded-xl text-xs font-black border-2 border-[#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                    project.animation.durationSeconds === sec
                      ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6]'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
