import { Sparkles, Download, RefreshCw, Calendar, Flame, Wand2, Layers, Sun } from 'lucide-react';
import { TEMPLATE_PROJECTS, getFormattedCurrentDate } from '../constants/presets';
import { TextGraphicProject } from '../types';

interface HeaderProps {
  project: TextGraphicProject;
  onApplyTemplate: (templateId: string) => void;
  onApplyTodayDate: () => void;
  onOpenExportModal: () => void;
  onOpenTemplatesModal: () => void;
  onResetProject: () => void;
}

export function Header({
  project,
  onApplyTemplate,
  onApplyTodayDate,
  onOpenExportModal,
  onOpenTemplatesModal,
  onResetProject,
}: HeaderProps) {
  const dateInfo = getFormattedCurrentDate();

  return (
    <header className="border-b-4 border-[#FF3D00] bg-[#1A1A1A] text-white sticky top-0 z-30 px-4 sm:px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFD700] rounded-xl rotate-6 flex items-center justify-center text-[#1A1A1A] font-black text-xl border-2 border-white shadow-[3px_3px_0px_0px_#FF3D00] select-none">
            3D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-xl tracking-tighter uppercase text-white flex items-center gap-1.5">
                Text<span className="text-[#FFD700]">Motion</span> 3D
              </h1>
              <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-[#00FF41] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]">
                Local Only
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium hidden sm:block">
              Generatore di scritte 3D animate cartoon, GIF &amp; Video ad alta definizione
            </p>
          </div>
        </div>

        {/* Quick Actions & Templates */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Template presets selector - opens complete templates gallery */}
          <button
            type="button"
            onClick={onOpenTemplatesModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#FFD700] hover:bg-[#FFF7D6] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            title="Sfoglia catalogo modelli pronti"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#FF3D00]" />
            <span>Modelli ({TEMPLATE_PROJECTS.length})</span>
          </button>

          {/* Quick Insert Today's Date */}
          <button
            onClick={onApplyTodayDate}
            title={`Imposta data odierna (${dateInfo.fullDate})`}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#33CCFF] hover:bg-[#52d6ff] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span className="hidden md:inline">Oggi:</span>
            <span>{dateInfo.dayName}</span>
          </button>

          {/* Reset */}
          <button
            onClick={onResetProject}
            title="Ripristina valori predefiniti"
            className="p-2 text-[#1A1A1A] bg-[#FEF9F0] hover:bg-[#FFD700] border-2 border-[#1A1A1A] rounded-xl shadow-[3px_3px_0px_0px_#1A1A1A] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Export CTA */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF3D00] hover:bg-[#ff5722] text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#FFD700] hover:shadow-[4px_4px_0px_0px_white] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>Esporta GIF / Video</span>
          </button>
        </div>
      </div>
    </header>
  );
}
