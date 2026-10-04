import React from 'react';
import { Plus, Trash2, Calendar, Type, Smile, ArrowUp, ArrowDown, MoveVertical, Palette } from 'lucide-react';
import { TextGraphicProject, TextLine, BadgeItem } from '../types';
import { AVAILABLE_FONTS, POPULAR_EMOJIS, getFormattedCurrentDate } from '../constants/presets';

interface TextControlsProps {
  project: TextGraphicProject;
  onUpdateProject: (updater: (prev: TextGraphicProject) => TextGraphicProject) => void;
}

export function TextControls({ project, onUpdateProject }: TextControlsProps) {
  const dateInfo = getFormattedCurrentDate();

  const handleUpdateLine = (index: number, updates: Partial<TextLine>) => {
    onUpdateProject((prev) => {
      const newLines = [...prev.lines];
      newLines[index] = { ...newLines[index], ...updates };
      return { ...prev, lines: newLines };
    });
  };

  const handleAddLine = () => {
    onUpdateProject((prev) => {
      const newLine: TextLine = {
        id: `line-${Date.now()}`,
        text: 'Nuova Scritta',
        fontFamily: 'Fredoka',
        fontSize: 56,
        letterSpacing: 1,
        isUppercase: false,
        offsetY: 0,
      };
      return { ...prev, lines: [...prev.lines, newLine] };
    });
  };

  const handleRemoveLine = (index: number) => {
    if (project.lines.length <= 1) return;
    onUpdateProject((prev) => {
      const newLines = prev.lines.filter((_, i) => i !== index);
      return { ...prev, lines: newLines };
    });
  };

  const handleInsertTodayDate = (lineIndex: number, format: 'full' | 'dayName' | 'dayAndMonth') => {
    let dateText = dateInfo.fullDate;
    if (format === 'dayName') dateText = dateInfo.dayName;
    if (format === 'dayAndMonth') dateText = dateInfo.dayAndMonth;

    handleUpdateLine(lineIndex, { text: dateText });
  };

  const handleInsertEmoji = (lineIndex: number, emoji: string) => {
    const current = project.lines[lineIndex]?.text || '';
    const newText = current ? `${current} ${emoji}` : emoji;
    handleUpdateLine(lineIndex, { text: newText });
  };

  const handleAddBadge = (emoji: string) => {
    onUpdateProject((prev) => {
      const currentBadges = prev.badges || [];
      const slots = [
        { xRatio: 0.85, yRatio: 0.20, rot: 12 },  // Top-Right
        { xRatio: 0.15, yRatio: 0.20, rot: -12 }, // Top-Left
        { xRatio: 0.85, yRatio: 0.80, rot: -8 },  // Bottom-Right
        { xRatio: 0.15, yRatio: 0.80, rot: 10 },  // Bottom-Left
        { xRatio: 0.50, yRatio: 0.14, rot: 0 },   // Top-Center
        { xRatio: 0.50, yRatio: 0.86, rot: 5 },   // Bottom-Center
      ];
      const slot = slots[currentBadges.length % slots.length];
      const newBadge: BadgeItem = {
        id: `badge-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        emoji,
        name: `Adesivo ${emoji}`,
        xRatio: slot.xRatio,
        yRatio: slot.yRatio,
        scale: 1.3,
        rotation: slot.rot,
        animationDelay: (currentBadges.length * 0.25) % 1,
      };
      return { ...prev, badges: [...currentBadges, newBadge] };
    });
  };

  const handleUpdateBadge = (id: string, updates: Partial<BadgeItem>) => {
    onUpdateProject((prev) => ({
      ...prev,
      badges: (prev.badges || []).map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

  const handleRemoveBadge = (id: string) => {
    onUpdateProject((prev) => ({
      ...prev,
      badges: prev.badges.filter((b) => b.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Lines List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
            <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Righe di Testo ({project.lines.length})
            </h2>
          </div>
          <button
            onClick={handleAddLine}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF3D00] hover:bg-[#ff5722] text-white border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Aggiungi Riga</span>
          </button>
        </div>

        {project.lines.map((line, index) => (
          <div
            key={line.id}
            className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[5px_5px_0px_0px_#1A1A1A] transition-all"
          >
            {/* Header of line item */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FFD700] text-[#1A1A1A] border-2 border-[#1A1A1A] text-xs font-black flex items-center justify-center shadow-[1px_1px_0px_0px_#1A1A1A]">
                  {index + 1}
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                  {index === 0 ? 'Titolo Principale' : index === 1 ? 'Sottotitolo' : `Riga ${index + 1}`}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Uppercase toggle */}
                <button
                  onClick={() => handleUpdateLine(index, { isUppercase: !line.isUppercase })}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border-2 border-[#1A1A1A] transition-all ${
                    line.isUppercase
                      ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                      : 'bg-neutral-100 text-[#666] hover:bg-[#FFF7D6]'
                  }`}
                  title="Attiva/Disattiva MAIUSCOLO"
                >
                  aA
                </button>

                {/* Delete line */}
                {project.lines.length > 1 && (
                  <button
                    onClick={() => handleRemoveLine(index)}
                    className="p-1.5 text-[#1A1A1A] hover:bg-[#FF3D00] hover:text-white border-2 border-transparent hover:border-[#1A1A1A] rounded-lg transition"
                    title="Elimina riga"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>

            {/* Text Input */}
            <div className="relative">
              <input
                type="text"
                value={line.text}
                onChange={(e) => handleUpdateLine(index, { text: e.target.value })}
                placeholder="Inserisci testo qui..."
                className="w-full px-3.5 py-2.5 bg-[#FEF9F0] border-2 border-[#1A1A1A] focus:bg-[#FFF7D6] focus:border-[#1A1A1A] rounded-xl text-sm font-bold text-[#1A1A1A] placeholder-neutral-400 outline-none transition"
              />
            </div>

            {/* Quick Date Helper Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[10px] uppercase font-black text-[#666] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#1A1A1A]" /> Data Rapida:
              </span>
              <button
                type="button"
                onClick={() => handleInsertTodayDate(index, 'dayName')}
                className="px-2.5 py-1 bg-white hover:bg-[#FFF7D6] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-lg text-xs font-bold shadow-[2px_2px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                {dateInfo.dayName}
              </button>
              <button
                type="button"
                onClick={() => handleInsertTodayDate(index, 'dayAndMonth')}
                className="px-2.5 py-1 bg-white hover:bg-[#FFF7D6] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-lg text-xs font-bold shadow-[2px_2px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                {dateInfo.dayAndMonth}
              </button>
            </div>

            {/* Quick Emoji Helper for this Line */}
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
              <span className="text-[10px] uppercase font-black text-[#666] flex items-center gap-1 mr-0.5">
                <Smile className="w-3 h-3 text-[#FF3D00]" /> Emoji nel Testo:
              </span>
              {['☀️', '🌻', '🌸', '☕', '❤️', '✨', '⭐', '🌈', '🎉', '🍰', '🍀', '🔥', '🥐', '🍓', '🥑', '🦋'].map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => handleInsertEmoji(index, em)}
                  className="w-7 h-7 bg-white hover:bg-[#FFD700] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-lg text-sm flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
                  title={`Inserisci ${em} in questa riga`}
                >
                  {em}
                </button>
              ))}
            </div>

            {/* Font Selector & Size Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-black uppercase text-[#666] mb-1">
                  Carattere Font
                </label>
                <select
                  value={line.fontFamily}
                  onChange={(e) => handleUpdateLine(index, { fontFamily: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-xs font-bold text-[#1A1A1A] outline-none focus:bg-[#FFF7D6] cursor-pointer shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  {AVAILABLE_FONTS.map((font) => (
                    <option key={font.id} value={font.id}>
                      {font.name} ({font.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-black uppercase text-[#666] mb-1">
                  <span>Grandezza Testo</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateLine(index, { fontSize: Math.max(16, line.fontSize - 4) })}
                      className="w-6 h-6 rounded-lg bg-white hover:bg-[#FFD700] text-[#1A1A1A] font-black text-sm flex items-center justify-center border-2 border-[#1A1A1A] shadow-[1px_1px_0px_0px_#1A1A1A] cursor-pointer active:translate-y-0.5"
                      title="Riduci font"
                    >
                      -
                    </button>
                    <span className="font-mono text-[#FF3D00] font-black min-w-[40px] text-center text-xs">{line.fontSize}px</span>
                    <button
                      type="button"
                      onClick={() => handleUpdateLine(index, { fontSize: Math.min(130, line.fontSize + 4) })}
                      className="w-6 h-6 rounded-lg bg-white hover:bg-[#FFD700] text-[#1A1A1A] font-black text-sm flex items-center justify-center border-2 border-[#1A1A1A] shadow-[1px_1px_0px_0px_#1A1A1A] cursor-pointer active:translate-y-0.5"
                      title="Aumenta font"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="16"
                  max="120"
                  step="2"
                  value={line.fontSize}
                  onChange={(e) => handleUpdateLine(index, { fontSize: parseInt(e.target.value) || 20 })}
                  className="w-full accent-[#FF3D00] h-2.5 bg-[#EEE] rounded-lg border-2 border-[#1A1A1A] cursor-pointer mt-1"
                />
                <div className="grid grid-cols-5 gap-1 mt-2">
                  {[
                    { label: 'Piccolo', size: 24 },
                    { label: 'Normale', size: 36 },
                    { label: 'Medio', size: 48 },
                    { label: 'Grande', size: 64 },
                    { label: 'Gigante', size: 80 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleUpdateLine(index, { fontSize: preset.size })}
                      className={`text-[10px] py-1 rounded-lg font-bold border-2 transition-all cursor-pointer text-center ${
                        line.fontSize === preset.size
                          ? 'bg-[#FFD700] text-[#1A1A1A] border-[#1A1A1A] shadow-[1px_1px_0px_0px_#1A1A1A]'
                          : 'bg-white text-[#555] border-[#1A1A1A] hover:bg-[#FFF7D6]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Line Color Customizer */}
            <div className="pt-2 border-t-2 border-[#1A1A1A]/10 mt-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black uppercase text-[#1A1A1A] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#FF3D00]" />
                  Colori di questa riga:
                </span>
                {line.customColors && (
                  <button
                    type="button"
                    onClick={() => handleUpdateLine(index, { customColors: undefined })}
                    className="text-[10px] text-[#FF3D00] font-black underline hover:text-[#D90429] cursor-pointer"
                  >
                    Ripristina palette globale
                  </button>
                )}
              </div>

              {/* Quick Color Swatches */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { name: 'Giallo Sole', top: '#FFF885', bot: '#FCA311', out: '#2D6A4F', ext: '#1B4332' },
                  { name: 'Oro & Miele', top: '#FFE494', bot: '#D48B00', out: '#472200', ext: '#2E1500' },
                  { name: 'Rosa Fragola', top: '#FF99C8', bot: '#FF3366', out: '#800F2F', ext: '#590D22' },
                  { name: 'Azzurro Mare', top: '#A0F0ED', bot: '#0096C7', out: '#03045E', ext: '#023E8A' },
                  { name: 'Arancio Fuoco', top: '#FFD166', bot: '#EF476F', out: '#3A015C', ext: '#240046' },
                  { name: 'Verde Lime', top: '#CCFF00', bot: '#10B981', out: '#4C1D95', ext: '#2E1065' },
                  { name: 'Viola Caramella', top: '#E0AAFF', bot: '#7B2CBF', out: '#240046', ext: '#10002B' },
                  { name: 'Bianco Puro', top: '#FFFFFF', bot: '#E0E0E0', out: '#1A1A1A', ext: '#000000' }
                ].map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    title={swatch.name}
                    onClick={() =>
                      handleUpdateLine(index, {
                        customColors: {
                          gradientTop: swatch.top,
                          gradientBottom: swatch.bot,
                          bevelHighlight: '#FFFFFF',
                          outlineColor: swatch.out,
                          extrusionColor: swatch.ext,
                        },
                      })
                    }
                    className="w-7 h-7 rounded-lg border-2 border-[#1A1A1A] shadow-[1px_1px_0px_0px_#1A1A1A] hover:scale-110 transition-transform cursor-pointer relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${swatch.top}, ${swatch.bot})`,
                    }}
                  />
                ))}

                {/* Custom Color Pickers inline */}
                <div className="flex items-center gap-2 ml-auto">
                  <label className="flex items-center gap-1 text-[10px] font-bold text-[#444] cursor-pointer bg-white px-2 py-1 rounded-lg border border-[#1A1A1A]">
                    <span>Sopra:</span>
                    <input
                      type="color"
                      value={line.customColors?.gradientTop || project.palette.gradientTop}
                      onChange={(e) =>
                        handleUpdateLine(index, {
                          customColors: {
                            gradientTop: e.target.value,
                            gradientBottom: line.customColors?.gradientBottom || project.palette.gradientBottom,
                            bevelHighlight: '#FFFFFF',
                            outlineColor: line.customColors?.outlineColor || project.palette.outlineColor,
                            extrusionColor: line.customColors?.extrusionColor || project.palette.extrusionColor,
                          },
                        })
                      }
                      className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-[10px] font-bold text-[#444] cursor-pointer bg-white px-2 py-1 rounded-lg border border-[#1A1A1A]">
                    <span>Sotto:</span>
                    <input
                      type="color"
                      value={line.customColors?.gradientBottom || project.palette.gradientBottom}
                      onChange={(e) =>
                        handleUpdateLine(index, {
                          customColors: {
                            gradientTop: line.customColors?.gradientTop || project.palette.gradientTop,
                            gradientBottom: e.target.value,
                            bevelHighlight: '#FFFFFF',
                            outlineColor: line.customColors?.outlineColor || project.palette.outlineColor,
                            extrusionColor: line.customColors?.extrusionColor || project.palette.extrusionColor,
                          },
                        })
                      }
                      className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                    />
                  </label>
                  <label className="flex items-center gap-1 text-[10px] font-bold text-[#444] cursor-pointer bg-white px-2 py-1 rounded-lg border border-[#1A1A1A]">
                    <span>Bordo:</span>
                    <input
                      type="color"
                      value={line.customColors?.outlineColor || project.palette.outlineColor}
                      onChange={(e) =>
                        handleUpdateLine(index, {
                          customColors: {
                            gradientTop: line.customColors?.gradientTop || project.palette.gradientTop,
                            gradientBottom: line.customColors?.gradientBottom || project.palette.gradientBottom,
                            bevelHighlight: '#FFFFFF',
                            outlineColor: e.target.value,
                            extrusionColor: line.customColors?.extrusionColor || project.palette.extrusionColor,
                          },
                        })
                      }
                      className="w-4 h-4 rounded cursor-pointer border-none bg-transparent"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Decorative Badges & Emojis */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3.5 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
            <h3 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Decorazioni &amp; Emoji 3D
            </h3>
          </div>
          <span className="text-[10px] font-black text-[#666] uppercase">Clicca per aggiungere</span>
        </div>

        {/* Emojis palette */}
        <div className="flex flex-wrap gap-2">
          {POPULAR_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleAddBadge(emoji)}
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#FFD700] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center justify-center text-xl transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              title={`Aggiungi ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Active badges list */}
        {project.badges && project.badges.length > 0 && (
          <div className="pt-3 border-t-2 border-[#1A1A1A]/10 space-y-3">
            <span className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider block">
              Adesivi &amp; Decorazioni Attive ({project.badges.length}):
            </span>
            <div className="space-y-2.5">
              {project.badges.map((b) => (
                <div
                  key={b.id}
                  className="p-3 bg-[#FEF9F0] border-2 border-[#1A1A1A] rounded-xl space-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-1 bg-white border border-[#1A1A1A] rounded-lg shadow-[1px_1px_0px_0px_#1A1A1A]">
                        {b.emoji}
                      </span>
                      <span className="text-xs font-black text-[#1A1A1A]">{b.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(b.id)}
                      className="px-2 py-1 bg-white hover:bg-[#FF3D00] hover:text-white border-2 border-[#1A1A1A] rounded-lg text-xs font-black transition flex items-center gap-1 cursor-pointer"
                      title="Elimina adesivo"
                    >
                      <Trash2 className="w-3 h-3 stroke-[2.5]" />
                      <span>Rimuovi</span>
                    </button>
                  </div>

                  {/* Position Chips */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] font-black uppercase text-[#666] mr-1">Posizione:</span>
                    {[
                      { label: '↗ Alto DX', x: 0.85, y: 0.20 },
                      { label: '↖ Alto SX', x: 0.15, y: 0.20 },
                      { label: '↘ Basso DX', x: 0.85, y: 0.80 },
                      { label: '↙ Basso SX', x: 0.15, y: 0.80 },
                      { label: '⊙ Centro', x: 0.50, y: 0.50 },
                    ].map((pos) => {
                      const isActive = Math.abs(b.xRatio - pos.x) < 0.08 && Math.abs(b.yRatio - pos.y) < 0.08;
                      return (
                        <button
                          key={pos.label}
                          type="button"
                          onClick={() => handleUpdateBadge(b.id, { xRatio: pos.x, yRatio: pos.y })}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#FFD700] text-[#1A1A1A] border-[#1A1A1A] font-black shadow-[1px_1px_0px_0px_#1A1A1A]'
                              : 'bg-white text-[#444] border-neutral-300 hover:border-[#1A1A1A]'
                          }`}
                        >
                          {pos.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Size Chips */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] font-black uppercase text-[#666] mr-1">Grandezza:</span>
                    {[
                      { label: 'Piccolo', s: 0.9 },
                      { label: 'Medio', s: 1.3 },
                      { label: 'Grande', s: 1.8 },
                      { label: 'Maxi', s: 2.3 },
                    ].map((sz) => {
                      const isActive = Math.abs(b.scale - sz.s) < 0.2;
                      return (
                        <button
                          key={sz.label}
                          type="button"
                          onClick={() => handleUpdateBadge(b.id, { scale: sz.s })}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#33CCFF] text-[#1A1A1A] border-[#1A1A1A] font-black shadow-[1px_1px_0px_0px_#1A1A1A]'
                              : 'bg-white text-[#444] border-neutral-300 hover:border-[#1A1A1A]'
                          }`}
                        >
                          {sz.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
