import React, { useState, useEffect } from 'react';
import { X, Wand2, Check, Sparkles, Search, Layers, Play, Ratio } from 'lucide-react';
import { TEMPLATE_PROJECTS } from '../constants/presets';
import { TemplateProject } from '../types';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (templateId: string) => void;
  currentTemplateId?: string;
}

export function TemplatesModal({
  isOpen,
  onClose,
  onApplyTemplate,
  currentTemplateId,
}: TemplatesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Tutti', count: TEMPLATE_PROJECTS.length, icon: '✨' },
    { id: 'buongiorno', label: 'Buongiorno & Settimana', count: TEMPLATE_PROJECTS.filter((t) => t.category === 'buongiorno').length, icon: '☀️' },
    { id: 'caffe', label: 'Caffè & Pomeriggio', count: TEMPLATE_PROJECTS.filter((t) => t.category === 'caffe').length, icon: '☕' },
    { id: 'feste', label: 'Compleanno & Auguri', count: TEMPLATE_PROJECTS.filter((t) => t.category === 'feste').length, icon: '🎂' },
    { id: 'notte', label: 'Buonanotte & Sogni', count: TEMPLATE_PROJECTS.filter((t) => t.category === 'notte').length, icon: '🌙' },
    { id: 'affetto', label: 'Amore & Affetto', count: TEMPLATE_PROJECTS.filter((t) => t.category === 'affetto').length, icon: '❤️' },
  ];

  const filteredTemplates = TEMPLATE_PROJECTS.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.data.lines && t.data.lines.some((l) => l.text.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border-4 border-[#1A1A1A] rounded-3xl shadow-[10px_10px_0px_0px_#1A1A1A] my-auto overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#FFD700] border-b-4 border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#1A1A1A] flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] text-xl">
              🪄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                  Libreria Modelli 3D Pronti
                </h2>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-[#FF3D00] text-white border-2 border-[#1A1A1A]">
                  {TEMPLATE_PROJECTS.length} Modelli
                </span>
              </div>
              <p className="text-xs text-[#333] font-medium hidden sm:block">
                Grafiche 3D complete con testo, adesivi animati, sfondi ed effetti pronti in 1 click
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white hover:bg-[#FF3D00] hover:text-white text-[#1A1A1A] border-3 border-[#1A1A1A] flex items-center justify-center shadow-[3px_3px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            title="Chiudi finestra"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 sm:px-7 bg-[#FEF9F0] border-b-2 border-[#1A1A1A]/10 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 stroke-[2.5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca modello (es. Buongiorno, Caffè, Auguri, Domenica, Notte)..."
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-[#1A1A1A] rounded-xl text-xs font-bold text-[#1A1A1A] outline-none focus:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-neutral-500 hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#FF3D00] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[1px_1px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-white text-[#FF3D00]' : 'bg-[#EEE] text-[#555]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-4">
          {filteredTemplates.length === 0 ? (
            <div className="p-12 text-center bg-[#FEF9F0] border-2 border-dashed border-[#1A1A1A]/30 rounded-2xl space-y-2">
              <span className="text-4xl block">🔍</span>
              <p className="text-sm font-bold text-[#1A1A1A]">Nessun modello trovato per i filtri selezionati</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                Mostra tutti i modelli
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((t) => {
                const isCurrent = currentTemplateId === t.id;
                const pal = t.data.palette;
                const anim = t.data.animation;
                const lines = t.data.lines || [];

                return (
                  <div
                    key={t.id}
                    className={`p-4 rounded-2xl border-3 border-[#1A1A1A] transition-all flex flex-col justify-between space-y-3 shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_0px_#1A1A1A] ${
                      isCurrent ? 'bg-[#FFF7D6] ring-2 ring-[#FF3D00]' : 'bg-white hover:bg-[#FEF9F0]'
                    }`}
                  >
                    <div>
                      {/* Top Bar of card */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-10 h-10 rounded-xl bg-white border-2 border-[#1A1A1A] flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                            {t.thumbnailEmoji}
                          </span>
                          <div>
                            <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wide">
                              {t.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#EEE] rounded-md border border-[#1A1A1A]">
                                {t.data.aspectRatio || '16:9'}
                              </span>
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#33CCFF] text-[#1A1A1A] rounded-md border border-[#1A1A1A]">
                                {anim?.type || 'bounce'}
                              </span>
                              {pal && (
                                <div className="flex items-center gap-1 ml-1">
                                  <div
                                    className="w-3.5 h-3.5 rounded-full border border-[#1A1A1A]"
                                    style={{
                                      background: `linear-gradient(135deg, ${pal.gradientTop}, ${pal.gradientBottom})`,
                                    }}
                                  />
                                  <div
                                    className="w-3 h-3 rounded-full border border-[#1A1A1A]"
                                    style={{ backgroundColor: pal.outlineColor }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="text-[10px] font-black uppercase bg-[#00FF41] text-[#1A1A1A] px-2 py-1 rounded-lg border-2 border-[#1A1A1A] shadow-[1px_1px_0px_0px_#1A1A1A] flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> Attivo
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#555] font-medium leading-relaxed mb-3">
                        {t.description}
                      </p>

                      {/* Text Preview Box */}
                      <div className="p-2.5 bg-neutral-100/80 rounded-xl border border-[#1A1A1A]/20 space-y-1">
                        <span className="text-[9px] font-black uppercase text-[#888] tracking-wider block">
                          Contenuto scritte:
                        </span>
                        {lines.map((l, i) => (
                          <div key={l.id || i} className="text-xs font-bold text-[#1A1A1A] flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded bg-white text-[9px] font-black flex items-center justify-center border border-[#1A1A1A]">
                              {i + 1}
                            </span>
                            <span className="truncate">{l.text}</span>
                            <span className="text-[10px] text-neutral-400 font-normal ml-auto shrink-0">
                              {l.fontFamily}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={() => {
                        onApplyTemplate(t.id);
                        onClose();
                      }}
                      className="w-full py-2.5 px-4 bg-[#FFD700] hover:bg-[#ffe033] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-[#FF3D00] stroke-[2.5]" />
                      <span>Applica Questo Modello</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-neutral-50 border-t-2 border-[#1A1A1A]/10 flex items-center justify-between">
          <span className="text-xs text-[#666] font-bold">
            Applicando un modello potrai sempre personalizzare testi, colori e animazioni.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-neutral-100 text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_0px_#1A1A1A] cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
