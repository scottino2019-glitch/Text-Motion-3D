import React, { useState } from 'react';
import { Wand2, Check, Sparkles, Search, Layers, Play, CheckCircle2 } from 'lucide-react';
import { TEMPLATE_PROJECTS } from '../constants/presets';
import { TemplateProject } from '../types';

interface TemplatesControlProps {
  onApplyTemplate: (templateId: string) => void;
  currentTemplateTitle?: string;
}

export function TemplatesControl({ onApplyTemplate, currentTemplateTitle }: TemplatesControlProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tutti', icon: '✨' },
    { id: 'buongiorno', label: 'Buongiorno', icon: '☀️' },
    { id: 'caffe', label: 'Caffè', icon: '☕' },
    { id: 'feste', label: 'Auguri', icon: '🎂' },
    { id: 'notte', label: 'Notte', icon: '🌙' },
    { id: 'affetto', label: 'Amore', icon: '❤️' },
  ];

  const filtered = TEMPLATE_PROJECTS.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.data.lines && t.data.lines.some((l) => l.text.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Category Pills & Search */}
      <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-[#FF3D00] stroke-[3]" />
            <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
              Catalogo Modelli Pronti ({TEMPLATE_PROJECTS.length})
            </h2>
          </div>
          <span className="text-[10px] font-black text-[#666] uppercase">Clicca per applicare</span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 stroke-[2.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca tra i modelli (es. Sabato, Caffè, Compleanno)..."
            className="w-full pl-9 pr-3 py-2 bg-[#FEF9F0] border-2 border-[#1A1A1A] rounded-xl text-xs font-bold text-[#1A1A1A] outline-none focus:bg-[#FFF7D6]"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1 ${
                selectedCategory === c.id
                  ? 'bg-[#FF3D00] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  : 'bg-white text-[#444] border-neutral-300 hover:border-[#1A1A1A] hover:bg-[#FFF7D6]'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates List Cards */}
      <div className="space-y-3">
        {filtered.map((t) => {
          const pal = t.data.palette;
          const anim = t.data.animation;
          const lines = t.data.lines || [];

          return (
            <div
              key={t.id}
              className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all space-y-3"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#FFF7D6] border-2 border-[#1A1A1A] flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#1A1A1A] shrink-0">
                    {t.thumbnailEmoji}
                  </span>
                  <div>
                    <h3 className="text-xs font-black uppercase text-[#1A1A1A] tracking-wide">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#EEE] rounded border border-[#1A1A1A]">
                        {t.data.aspectRatio || '16:9'}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#33CCFF] text-[#1A1A1A] rounded border border-[#1A1A1A]">
                        {anim?.type || 'bounce'}
                      </span>
                    </div>
                  </div>
                </div>

                {pal && (
                  <div className="flex items-center gap-1 shrink-0 p-1 bg-neutral-100 rounded-lg border border-neutral-300">
                    <div
                      className="w-4 h-4 rounded-full border border-[#1A1A1A]"
                      style={{
                        background: `linear-gradient(135deg, ${pal.gradientTop}, ${pal.gradientBottom})`,
                      }}
                      title="Sfumatura"
                    />
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-[#1A1A1A]"
                      style={{ backgroundColor: pal.outlineColor }}
                      title="Bordo"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#555] font-medium leading-relaxed">
                {t.description}
              </p>

              {/* Preview Lines */}
              <div className="p-2 bg-[#FEF9F0] rounded-xl border border-[#1A1A1A]/15 space-y-1">
                {lines.map((l, idx) => (
                  <div key={l.id || idx} className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFD700] text-[8px] font-black flex items-center justify-center border border-[#1A1A1A]">
                      {idx + 1}
                    </span>
                    <span className="truncate">{l.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onApplyTemplate(t.id)}
                className="w-full py-2 px-3 bg-[#FFD700] hover:bg-[#ffe033] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#FF3D00] stroke-[2.5]" />
                <span>Usa Questo Modello</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
