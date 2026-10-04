import React, { useState } from 'react';
import { Type, Palette, Activity, Image as ImageIcon, Sparkles, Download, Layers, ShieldCheck, Wand2 } from 'lucide-react';
import { TextGraphicProject } from './types';
import { TEMPLATE_PROJECTS, getFormattedCurrentDate } from './constants/presets';
import { Header } from './components/Header';
import { CanvasPreview } from './components/CanvasPreview';
import { TextControls } from './components/TextControls';
import { StyleControls } from './components/StyleControls';
import { AnimationControls } from './components/AnimationControls';
import { BackgroundControls } from './components/BackgroundControls';
import { ExportModal } from './components/ExportModal';
import { TemplatesModal } from './components/TemplatesModal';
import { TemplatesControl } from './components/TemplatesControl';

export default function App() {
  // Default project matching the user's reference image exactly
  const [project, setProject] = useState<TextGraphicProject>(() => {
    const template = TEMPLATE_PROJECTS[0];
    return {
      id: 'proj-default',
      title: 'Buongiorno Buon Sabato',
      aspectRatio: '16:9',
      lines: template.data.lines || [],
      palette: template.data.palette || ({} as any),
      style3D: template.data.style3D || ({} as any),
      animation: template.data.animation || ({} as any),
      background: template.data.background || ({} as any),
      badges: template.data.badges || [],
    };
  });

  const [activeTab, setActiveTab] = useState<'templates' | 'text' | 'style' | 'animation' | 'background'>('text');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState<boolean>(false);

  const handleApplyTemplate = (templateId: string) => {
    const found = TEMPLATE_PROJECTS.find((t) => t.id === templateId);
    if (found && found.data) {
      setProject((prev) => ({
        ...prev,
        title: found.data.title || prev.title,
        aspectRatio: (found.data.aspectRatio as any) || prev.aspectRatio,
        lines: found.data.lines ? [...found.data.lines] : prev.lines,
        palette: found.data.palette ? { ...found.data.palette } : prev.palette,
        style3D: found.data.style3D ? { ...found.data.style3D } : prev.style3D,
        animation: found.data.animation ? { ...found.data.animation } : prev.animation,
        background: found.data.background ? { ...found.data.background } : prev.background,
        badges: found.data.badges ? [...found.data.badges] : prev.badges,
      }));
    }
  };

  const handleApplyTodayDate = () => {
    const dateInfo = getFormattedCurrentDate();
    setProject((prev) => {
      const newLines = [...prev.lines];
      if (newLines.length >= 2) {
        newLines[1] = { ...newLines[1], text: dateInfo.dayName };
      }
      if (newLines.length >= 3) {
        newLines[2] = { ...newLines[2], text: dateInfo.dayAndMonth };
      }
      return { ...prev, lines: newLines };
    });
  };

  const handleResetProject = () => {
    handleApplyTemplate(TEMPLATE_PROJECTS[0].id);
  };

  return (
    <div className="min-h-screen bg-[#FEF9F0] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#FFD700] selection:text-[#1A1A1A] relative">
      {/* Background Dot Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: 'radial-gradient(#1A1A1A 1.5px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Header */}
      <Header
        project={project}
        onApplyTemplate={handleApplyTemplate}
        onApplyTodayDate={handleApplyTodayDate}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenTemplatesModal={() => setIsTemplatesModalOpen(true)}
        onResetProject={handleResetProject}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Column: Live 60fps Canvas Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <CanvasPreview
            project={project}
            onUpdateProject={setProject}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />

          {/* Quick Features Highlight Banner */}
          <div className="p-4 bg-white border-3 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] text-xs text-[#1A1A1A] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold">
              <div className="w-5 h-5 rounded-full bg-[#00FF41] border-2 border-[#1A1A1A] flex items-center justify-center">
                <ShieldCheck className="w-3 h-3 text-[#1A1A1A] stroke-[3]" />
              </div>
              <span>
                <strong className="text-[#1A1A1A]">100% Locale &amp; Sicuro</strong>: Rendering Canvas in tempo reale senza server o costi esterni.
              </span>
            </div>
            <span className="text-[11px] bg-[#FFD700] text-[#1A1A1A] px-2.5 py-1 rounded-full border-2 border-[#1A1A1A] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1A1A1A]">
              GIF • Video MP4 • Sticker HD
            </span>
          </div>
        </div>

        {/* Right Column: Customization Suite (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Navigation Tabs - 5 complete tabs including Modelli */}
          <div className="grid grid-cols-5 bg-white p-1.5 sm:p-2 rounded-2xl border-3 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all min-w-0 cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-[#FFD700] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  : 'text-[#1A1A1A] hover:bg-[#FFF7D6] border-2 border-transparent'
              }`}
              title="Catalogo Modelli Pronti"
            >
              <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] text-[#FF3D00] shrink-0" />
              <span className="truncate">Modelli</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`py-2 px-1 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all min-w-0 cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-[#FF3D00] text-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  : 'text-[#1A1A1A] hover:bg-[#FFF7D6] border-2 border-transparent'
              }`}
            >
              <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] shrink-0" />
              <span className="truncate">Testo</span>
            </button>

            <button
              onClick={() => setActiveTab('style')}
              className={`py-2 px-1 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all min-w-0 cursor-pointer ${
                activeTab === 'style'
                  ? 'bg-[#FFD700] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  : 'text-[#1A1A1A] hover:bg-[#FFF7D6] border-2 border-transparent'
              }`}
            >
              <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] shrink-0" />
              <span className="truncate">3D</span>
            </button>

            <button
              onClick={() => setActiveTab('animation')}
              className={`py-2 px-1 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all min-w-0 cursor-pointer ${
                activeTab === 'animation'
                  ? 'bg-[#33CCFF] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  : 'text-[#1A1A1A] hover:bg-[#FFF7D6] border-2 border-transparent'
              }`}
            >
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] shrink-0" />
              <span className="truncate">Moto</span>
            </button>

            <button
              onClick={() => setActiveTab('background')}
              className={`py-2 px-1 rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 transition-all min-w-0 cursor-pointer ${
                activeTab === 'background'
                  ? 'bg-[#00FF41] text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  : 'text-[#1A1A1A] hover:bg-[#FFF7D6] border-2 border-transparent'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] shrink-0" />
              <span className="truncate">Sfondo</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="flex-1">
            {activeTab === 'templates' && (
              <TemplatesControl
                onApplyTemplate={handleApplyTemplate}
                currentTemplateTitle={project.title}
              />
            )}
            {activeTab === 'text' && (
              <TextControls project={project} onUpdateProject={setProject} />
            )}
            {activeTab === 'style' && (
              <StyleControls project={project} onUpdateProject={setProject} />
            )}
            {activeTab === 'animation' && (
              <AnimationControls project={project} onUpdateProject={setProject} />
            )}
            {activeTab === 'background' && (
              <BackgroundControls project={project} onUpdateProject={setProject} />
            )}
          </div>
        </div>
      </main>

      {/* Footer info bar */}
      <footer className="h-9 bg-[#1A1A1A] px-6 sm:px-8 flex items-center justify-between text-[11px] font-black text-neutral-400 uppercase tracking-widest border-t-2 border-[#1A1A1A] relative z-10">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF3D00]"></span>
          Canvas: {project.aspectRatio}
        </span>
        <span className="hidden sm:inline text-[#FFD700]">No Server • Local Engine Only</span>
        <span className="text-[#33CCFF]">FPS: 60 Live</span>
      </footer>

      {/* Templates Modal Dialog */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      {/* Export Modal Dialog */}
      <ExportModal
        isOpen={isExportModalOpen}
        project={project}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
