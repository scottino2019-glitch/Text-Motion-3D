import React from 'react';
import { Palette, Box, Sparkles, Sliders, Shield, SunMedium } from 'lucide-react';
import { TextGraphicProject, ColorPalette } from '../types';
import { COLOR_PALETTES } from '../constants/presets';

interface StyleControlsProps {
  project: TextGraphicProject;
  onUpdateProject: (updater: (prev: TextGraphicProject) => TextGraphicProject) => void;
}

export function StyleControls({ project, onUpdateProject }: StyleControlsProps) {
  const handleSelectPalette = (pal: ColorPalette) => {
    onUpdateProject((prev) => ({
      ...prev,
      palette: pal,
      style3D: {
        ...prev.style3D,
        backingPlateColor: pal.backingHullColor || prev.style3D.backingPlateColor,
      },
      // Also apply to lines that don't have custom overrides
      lines: prev.lines.map((l) => ({
        ...l,
        customColors: undefined,
      })),
    }));
  };

  const handleUpdateStyle3D = (updates: Partial<typeof project.style3D>) => {
    onUpdateProject((prev) => ({
      ...prev,
      style3D: { ...prev.style3D, ...updates },
    }));
  };

  const handleUpdateCustomColors = (key: keyof ColorPalette, value: string) => {
    onUpdateProject((prev) => ({
      ...prev,
      palette: {
        ...prev.palette,
        [key]: value,
      },
      // Sync lines so users immediately see their custom picked color
      lines: prev.lines.map((l) =>
        l.customColors
          ? {
              ...l,
              customColors: {
                ...l.customColors,
                ...(key === 'gradientTop' ? { gradientTop: value } : {}),
                ...(key === 'gradientBottom' ? { gradientBottom: value } : {}),
                ...(key === 'outlineColor' ? { outlineColor: value } : {}),
                ...(key === 'extrusionColor' ? { extrusionColor: value } : {}),
              },
            }
          : l
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Preset Color Palettes */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
          <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Palette di Colori 3D
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COLOR_PALETTES.map((pal) => {
            const isSelected = project.palette.id === pal.id;
            return (
              <button
                key={pal.id}
                onClick={() => handleSelectPalette(pal)}
                className={`p-2.5 rounded-xl border-2 text-left flex flex-col gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFD700] border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-white border-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                {/* Visual Swatch */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full border border-[#1A1A1A] shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${pal.gradientTop}, ${pal.gradientBottom})`,
                    }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-[#1A1A1A]"
                    style={{ backgroundColor: pal.outlineColor }}
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-[#1A1A1A]"
                    style={{ backgroundColor: pal.backingHullColor }}
                  />
                </div>

                <span className="text-[11px] font-black text-[#1A1A1A] truncate">
                  {pal.nameIt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Depth & Extrusion Sliders */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
          <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Effetti 3D, Spessore &amp; Rilievi
          </h2>
        </div>

        <div className="space-y-4">
          {/* Extrusion Depth */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#666] mb-1">
              <span>Profondità 3D (Estrusione)</span>
              <span className="font-mono text-[#FF3D00] font-black">
                {project.style3D.extrusionDepth}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              value={project.style3D.extrusionDepth}
              onChange={(e) => handleUpdateStyle3D({ extrusionDepth: parseInt(e.target.value) })}
              className="w-full accent-[#FF3D00] h-2 bg-[#EEE] rounded-lg border border-[#1A1A1A] cursor-pointer"
            />
          </div>

          {/* Bevel Width */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#666] mb-1">
              <span>Spessore Bordo &amp; Contorno</span>
              <span className="font-mono text-[#FF3D00] font-black">
                {project.style3D.bevelWidth}px
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={project.style3D.bevelWidth}
              onChange={(e) => handleUpdateStyle3D({ bevelWidth: parseInt(e.target.value) })}
              className="w-full accent-[#FF3D00] h-2 bg-[#EEE] rounded-lg border border-[#1A1A1A] cursor-pointer"
            />
          </div>

          {/* Angle */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#666] mb-1">
              <span>Angolo Direzione 3D</span>
              <span className="font-mono text-[#FF3D00] font-black">
                {project.style3D.extrusionAngle}°
              </span>
            </div>
            <input
              type="range"
              min="45"
              max="135"
              value={project.style3D.extrusionAngle}
              onChange={(e) => handleUpdateStyle3D({ extrusionAngle: parseInt(e.target.value) })}
              className="w-full accent-[#FF3D00] h-2 bg-[#EEE] rounded-lg border border-[#1A1A1A] cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="pt-2 border-t-2 border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Gloss Toggle */}
            <label className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer hover:bg-[#FFF7D6] transition">
              <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                Riflesso Lucido (Gloss)
              </span>
              <input
                type="checkbox"
                checked={project.style3D.showGloss}
                onChange={(e) => handleUpdateStyle3D({ showGloss: e.target.checked })}
                className="w-4 h-4 accent-[#FF3D00] rounded cursor-pointer"
              />
            </label>

            {/* Backing Plate Toggle */}
            <label className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer hover:bg-[#FFF7D6] transition">
              <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                Targa Sagomata
              </span>
              <input
                type="checkbox"
                checked={project.style3D.showBackingPlate}
                onChange={(e) => handleUpdateStyle3D({ showBackingPlate: e.target.checked })}
                className="w-4 h-4 accent-[#FF3D00] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Advanced Custom Color Pickers */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
          <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
            Personalizzazione Fine Colori
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-black uppercase text-[#666] mb-1">
              Colore Superiore
            </label>
            <div className="flex items-center gap-2 bg-[#FEF9F0] p-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <input
                type="color"
                value={project.palette.gradientTop}
                onChange={(e) => handleUpdateCustomColors('gradientTop', e.target.value)}
                className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase">
                {project.palette.gradientTop}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-[#666] mb-1">
              Colore Inferiore
            </label>
            <div className="flex items-center gap-2 bg-[#FEF9F0] p-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <input
                type="color"
                value={project.palette.gradientBottom}
                onChange={(e) => handleUpdateCustomColors('gradientBottom', e.target.value)}
                className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase">
                {project.palette.gradientBottom}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-[#666] mb-1">
              Contorno Bordo
            </label>
            <div className="flex items-center gap-2 bg-[#FEF9F0] p-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <input
                type="color"
                value={project.palette.outlineColor}
                onChange={(e) => handleUpdateCustomColors('outlineColor', e.target.value)}
                className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase">
                {project.palette.outlineColor}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-[#666] mb-1">
              Fianco 3D
            </label>
            <div className="flex items-center gap-2 bg-[#FEF9F0] p-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <input
                type="color"
                value={project.palette.extrusionColor}
                onChange={(e) => handleUpdateCustomColors('extrusionColor', e.target.value)}
                className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase">
                {project.palette.extrusionColor}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-[#666] mb-1">
              Targa Sfondo
            </label>
            <div className="flex items-center gap-2 bg-[#FEF9F0] p-1.5 rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
              <input
                type="color"
                value={project.palette.backingHullColor || '#2D6A4F'}
                onChange={(e) => handleUpdateCustomColors('backingHullColor', e.target.value)}
                className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-[#1A1A1A] uppercase">
                {project.palette.backingHullColor || '#2D6A4F'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
