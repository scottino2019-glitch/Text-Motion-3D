import React, { useRef } from 'react';
import { Image as ImageIcon, Sparkles, Upload, EyeOff, TreeDeciduous, Coffee, Sunset } from 'lucide-react';
import { TextGraphicProject, BackgroundConfig } from '../types';

interface BackgroundControlsProps {
  project: TextGraphicProject;
  onUpdateProject: (updater: (prev: TextGraphicProject) => TextGraphicProject) => void;
}

const BG_PRESETS: {
  id: BackgroundConfig['type'];
  name: string;
  desc: string;
  icon: any;
  colorPreview: string;
}[] = [
  {
    id: 'nature_olive',
    name: 'Ulivo & Giardino d\'Estate',
    desc: 'Luce calda tra gli ulivi (Come nella foto di riferimento)',
    icon: TreeDeciduous,
    colorPreview: 'linear-gradient(135deg, #66744f, #849363, #5a4f3b)',
  },
  {
    id: 'sunny_garden',
    name: 'Giardino Fiorito al Sole',
    desc: 'Toni verdi e raggi dorati radianti',
    icon: Sparkles,
    colorPreview: 'linear-gradient(135deg, #7d8f58, #968962, #fef08a)',
  },
  {
    id: 'cozy_coffee',
    name: 'Bar & Aroma di Caffè',
    desc: 'Atmosfera calda e profonda color tostatura',
    icon: Coffee,
    colorPreview: 'linear-gradient(135deg, #582f0e, #331800, #1e0c00)',
  },
  {
    id: 'gradient_sunset',
    name: 'Tramonto Magico',
    desc: 'Sfumatura calda dal viola all\'arancio dorato',
    icon: Sunset,
    colorPreview: 'linear-gradient(135deg, #2b0938, #6a1b9a, #ff6f00)',
  },
  {
    id: 'gradient_pastel',
    name: 'Pastello Zucchero Filato',
    desc: 'Colori tenui, morbidi e luminosi',
    icon: Sparkles,
    colorPreview: 'linear-gradient(135deg, #fbcfe8, #e0e7ff, #fed7aa)',
  },
  {
    id: 'transparent',
    name: 'Trasparente (Adesivo/Sticker)',
    desc: 'Senza sfondo, ideale per sticker WhatsApp e GIF',
    icon: EyeOff,
    colorPreview: 'repeating-conic-gradient(#475569 0% 25%, #1e293b 0% 50%) 50% / 12px 12px',
  },
  {
    id: 'solid',
    name: 'Colore Tinta Unita',
    desc: 'Sfondo uniforme a tinta piatta',
    icon: ImageIcon,
    colorPreview: '#0f172a',
  },
];

export function BackgroundControls({ project, onUpdateProject }: BackgroundControlsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectType = (type: BackgroundConfig['type']) => {
    onUpdateProject((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        type,
      },
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onUpdateProject((prev) => ({
        ...prev,
        background: {
          ...prev.background,
          type: 'custom_image',
          customImageDataUrl: dataUrl,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Background Options Grid */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
            <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Scelta dello Sfondo
            </h2>
          </div>
          <span className="text-[10px] font-black text-[#666] uppercase">Personalizzabile</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BG_PRESETS.map((preset) => {
            const isSelected = project.background.type === preset.id;
            const Icon = preset.icon;

            return (
              <button
                key={preset.id}
                onClick={() => handleSelectType(preset.id)}
                className={`p-3 rounded-2xl border-2 border-[#1A1A1A] text-left flex items-start gap-3 transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00FF41] text-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl shrink-0 border-2 border-[#1A1A1A] shadow-sm flex items-center justify-center text-white"
                  style={{ background: preset.colorPreview }}
                >
                  <Icon className="w-5 h-5 drop-shadow stroke-[2.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-[#1A1A1A] flex items-center justify-between">
                    <span>{preset.name}</span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D00] border border-[#1A1A1A]"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#555] font-medium leading-tight mt-0.5">
                    {preset.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Image Upload */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
          <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Carica la tua Foto di Sfondo
          </h2>
        </div>

        <p className="text-xs text-[#555] font-medium">
          Usa una tua fotografia o immagine personalizzata dal computer o telefono:
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-[#FFD700] hover:bg-[#ffe033] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 stroke-[3]" />
            <span>Scegli Foto dal Dispositivo</span>
          </button>

          {project.background.type === 'custom_image' && project.background.customImageDataUrl && (
            <span className="text-xs text-[#008f24] font-black flex items-center gap-1 bg-[#d4fce1] px-2.5 py-1 rounded-lg border border-[#008f24]">
              ✓ Foto caricata con successo!
            </span>
          )}
        </div>
      </div>

      {/* Solid Color Picker (if solid) */}
      {project.background.type === 'solid' && (
        <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-2 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <label className="block text-xs font-black uppercase text-[#666]">
            Scegli il Colore Tinta Unita
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={project.background.solidColor || '#0F172A'}
              onChange={(e) =>
                onUpdateProject((prev) => ({
                  ...prev,
                  background: { ...prev.background, solidColor: e.target.value },
                }))
              }
              className="w-10 h-10 rounded-xl border-2 border-[#1A1A1A] bg-transparent cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A]"
            />
            <span className="text-xs font-mono font-bold text-[#1A1A1A]">
              {project.background.solidColor || '#0F172A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
