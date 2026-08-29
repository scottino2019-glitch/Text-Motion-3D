import React, { useState, useEffect } from 'react';
import { X, Download, Film, Image as ImageIcon, Sparkles, Check, AlertCircle, Loader2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TextGraphicProject, ExportSettings } from '../types';
import { exportAnimationAsGif, exportAnimationAsVideo, exportSingleFramePng, ExportProgress } from '../utils/exporter';

interface ExportModalProps {
  isOpen: boolean;
  project: TextGraphicProject;
  onClose: () => void;
}

export function ExportModal({ isOpen, project, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<'gif' | 'video' | 'png'>('gif');
  const [resolution, setResolution] = useState<'standard' | 'hd' | 'fhd'>('hd');
  const [fps, setFps] = useState<number>(30);
  const [duration, setDuration] = useState<number>(project.animation.durationSeconds || 3);
  const [transparentBg, setTransparentBg] = useState<boolean>(project.background.type === 'transparent');

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progressState, setProgressState] = useState<ExportProgress | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFormat, setResultFormat] = useState<'gif' | 'video' | 'png' | null>(null);
  const [resultFileName, setResultFileName] = useState<string>('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isExporting) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExporting, onClose]);

  // When opening modal, keep transparentBg synced if changed in editor
  useEffect(() => {
    if (isOpen) {
      setTransparentBg(project.background.type === 'transparent');
    }
  }, [isOpen, project.background.type]);

  if (!isOpen) return null;

  const handleFormatChange = (newFormat: 'gif' | 'video' | 'png') => {
    setFormat(newFormat);
    // If the previous generated result was for another format, clear it so user can immediately generate the new format
    if (resultFormat !== newFormat) {
      setResultUrl(null);
      setProgressState(null);
      setResultFormat(null);
    }
  };

  const handleResetForNewExport = () => {
    setResultUrl(null);
    setProgressState(null);
    setResultFormat(null);
  };

  const getExportDimensions = () => {
    const ratio = project.aspectRatio;
    let baseW = 900;

    if (resolution === 'standard') {
      baseW = 640;
    } else if (resolution === 'hd') {
      baseW = 900;
    } else {
      baseW = 1280;
    }

    if (ratio === '1:1') {
      return { width: baseW, height: baseW };
    } else if (ratio === '9:16') {
      return { width: Math.round(baseW * 0.5625), height: baseW };
    } else if (ratio === '4:3') {
      return { width: baseW, height: Math.round(baseW * 0.75) };
    } else {
      // 16:9
      return { width: baseW, height: Math.round(baseW * 0.5625) };
    }
  };

  const handleStartExport = async () => {
    setIsExporting(true);
    setResultUrl(null);
    setResultFormat(null);
    setProgressState({
      progress: 0,
      statusText: 'Inizializzazione rendering...',
      stage: 'rendering',
    });

    const dims = getExportDimensions();
    const settings: ExportSettings = {
      format,
      width: dims.width,
      height: dims.height,
      fps,
      duration,
      transparentBackground: transparentBg,
    };

    try {
      if (format === 'gif') {
        const { url, fileName } = await exportAnimationAsGif(project, settings, (p) => {
          setProgressState(p);
        });
        setResultUrl(url);
        setResultFormat('gif');
        setResultFileName(fileName);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } else if (format === 'video') {
        const { url, fileName } = await exportAnimationAsVideo(project, settings, (p) => {
          setProgressState(p);
        });
        setResultUrl(url);
        setResultFormat('video');
        setResultFileName(fileName);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } else {
        // PNG Sticker
        const { url, fileName } = exportSingleFramePng(project, dims.width, dims.height, transparentBg);
        setResultUrl(url);
        setResultFormat('png');
        setResultFileName(fileName);
        setProgressState({
          progress: 100,
          statusText: 'Sticker PNG pronto!',
          stage: 'done',
        });
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      console.error(err);
      setProgressState({
        progress: 0,
        statusText: `Errore durante l'esportazione: ${err?.message || 'Errore sconosciuto'}`,
        stage: 'error',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = resultFileName || `scritta-3d.${format === 'video' ? 'mp4' : format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1A1A1A]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        // Click outside closes modal (if not actively rendering)
        if (e.target === e.currentTarget && !isExporting) {
          onClose();
        }
      }}
    >
      <div
        className="bg-[#FEF9F0] border-4 border-[#1A1A1A] rounded-3xl max-w-xl w-full shadow-[8px_8px_0px_0px_#1A1A1A] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header with ALWAYS visible high-contrast Close button */}
        <div className="sticky top-0 z-30 bg-[#FEF9F0] px-5 py-4 border-b-3 border-[#1A1A1A] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF3D00] text-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#1A1A1A] uppercase tracking-wide">
                Esporta Creazione 3D
              </h2>
              <p className="text-[11px] sm:text-xs text-[#555] font-semibold">
                Scarica in GIF, Video MP4 o Immagine PNG ad alta qualità
              </p>
            </div>
          </div>

          {/* Prominent, guaranteed visible Close Button */}
          <button
            onClick={onClose}
            disabled={isExporting}
            className="w-10 h-10 rounded-xl bg-white hover:bg-[#FF3D00] hover:text-white text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center justify-center transition-all active:translate-y-0.5 cursor-pointer disabled:opacity-40"
            title="Chiudi finestra"
            aria-label="Chiudi finestra"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Format Selection Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-[#1A1A1A] uppercase tracking-wider">
                1. Scegli Formato
              </label>
              {resultUrl && (
                <span className="text-[11px] font-bold text-[#008f24] bg-[#E8F8EC] px-2 py-0.5 rounded-md border border-[#008f24]/30">
                  ✓ File pronto in basso
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* GIF */}
              <button
                onClick={() => handleFormatChange('gif')}
                disabled={isExporting}
                className={`p-3 rounded-2xl border-2 border-[#1A1A1A] text-center flex flex-col items-center gap-1 transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 ${
                  format === 'gif'
                    ? 'bg-[#FFD700] text-[#1A1A1A] font-black shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#FF3D00] stroke-[2.5]" />
                <span className="text-xs font-black">GIF Animata</span>
                <span className="text-[10px] text-[#666] font-semibold">WhatsApp / Chat</span>
              </button>

              {/* Video */}
              <button
                onClick={() => handleFormatChange('video')}
                disabled={isExporting}
                className={`p-3 rounded-2xl border-2 border-[#1A1A1A] text-center flex flex-col items-center gap-1 transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 ${
                  format === 'video'
                    ? 'bg-[#33CCFF] text-[#1A1A1A] font-black shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <Film className="w-5 h-5 text-[#1A1A1A] stroke-[2.5]" />
                <span className="text-xs font-black">Video Animato</span>
                <span className="text-[10px] text-[#666] font-semibold">MP4 / Social / Reel</span>
              </button>

              {/* PNG */}
              <button
                onClick={() => handleFormatChange('png')}
                disabled={isExporting}
                className={`p-3 rounded-2xl border-2 border-[#1A1A1A] text-center flex flex-col items-center gap-1 transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 ${
                  format === 'png'
                    ? 'bg-[#00FF41] text-[#1A1A1A] font-black shadow-[3px_3px_0px_0px_#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <ImageIcon className="w-5 h-5 text-[#1A1A1A] stroke-[2.5]" />
                <span className="text-xs font-black">Immagine PNG</span>
                <span className="text-[10px] text-[#666] font-semibold">Sticker Singolo HD</span>
              </button>
            </div>
          </div>

          {/* Quality & Resolution Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white p-4 rounded-2xl border-3 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] text-xs">
            {/* Resolution */}
            <div>
              <label className="block text-[#666] font-black uppercase text-[11px] mb-1.5">
                Risoluzione
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['standard', 'hd', 'fhd'] as const).map((res) => (
                  <button
                    key={res}
                    disabled={isExporting}
                    onClick={() => {
                      setResolution(res);
                      if (resultUrl) handleResetForNewExport();
                    }}
                    className={`py-1.5 rounded-xl border-2 border-[#1A1A1A] text-[11px] font-black transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 ${
                      resolution === res
                        ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                        : 'bg-neutral-50 text-[#666] hover:bg-[#FFF7D6]'
                    }`}
                  >
                    {res === 'standard' ? '640p' : res === 'hd' ? '900p HD' : '1080p FHD'}
                  </button>
                ))}
              </div>
            </div>

            {/* FPS */}
            {format !== 'png' && (
              <div>
                <label className="block text-[#666] font-black uppercase text-[11px] mb-1.5">
                  Fluidità (FPS)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[24, 30, 60].map((f) => (
                    <button
                      key={f}
                      disabled={isExporting}
                      onClick={() => {
                        setFps(f);
                        if (resultUrl) handleResetForNewExport();
                      }}
                      className={`py-1.5 rounded-xl border-2 border-[#1A1A1A] text-[11px] font-black transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer disabled:opacity-50 ${
                        fps === f
                          ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                          : 'bg-neutral-50 text-[#666] hover:bg-[#FFF7D6]'
                      }`}
                    >
                      {f} fps
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Transparent sticker option */}
            <div className="sm:col-span-2 pt-2 border-t-2 border-neutral-100 flex items-center justify-between">
              <label htmlFor="transparent-export-checkbox" className="text-[#1A1A1A] font-bold text-xs cursor-pointer flex items-center gap-2">
                <span>Esporta come Adesivo con Sfondo Trasparente</span>
              </label>
              <input
                id="transparent-export-checkbox"
                type="checkbox"
                disabled={isExporting}
                checked={transparentBg}
                onChange={(e) => {
                  setTransparentBg(e.target.checked);
                  if (resultUrl) handleResetForNewExport();
                }}
                className="w-4 h-4 accent-[#FF3D00] rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Rendering Progress Indicator */}
          {isExporting && progressState && (
            <div className="p-4 bg-white rounded-2xl border-3 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-[#1A1A1A] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#FF3D00]" />
                  {progressState.statusText}
                </span>
                <span className="font-mono text-[#FF3D00] text-sm">
                  {progressState.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#EEE] h-3 rounded-full border-2 border-[#1A1A1A] overflow-hidden">
                <div
                  className="bg-[#00FF41] h-full transition-all duration-150"
                  style={{ width: `${progressState.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Export Completed Box (with Download & Multi-Export options) */}
          {!isExporting && resultUrl && (
            <div className="p-4 bg-white rounded-2xl border-3 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-2">
                <span className="text-xs font-black text-[#008f24] flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  {progressState?.statusText || 'File generato con successo!'}
                </span>
                <span className="text-[11px] font-mono text-[#666] font-bold">
                  {resultFileName}
                </span>
              </div>

              {/* Media Preview */}
              <div className="max-h-48 rounded-xl overflow-hidden border-2 border-[#1A1A1A] bg-[#FEF9F0] flex items-center justify-center p-2 shadow-inner">
                {resultFormat === 'video' ? (
                  <video
                    src={resultUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-h-44 rounded-lg object-contain"
                  />
                ) : (
                  <img
                    src={resultUrl}
                    alt="Anteprima Creazione"
                    className="max-h-44 object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Primary Download Button */}
              <button
                onClick={handleDownload}
                className="w-full py-3.5 bg-[#00FF41] hover:bg-[#1eff57] text-[#1A1A1A] font-black text-sm uppercase tracking-wider rounded-2xl border-3 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Salva sul Dispositivo ({resultFileName})</span>
              </button>

              {/* Seamless Multi-Export Quick Switcher */}
              <div className="pt-2 border-t-2 border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-black uppercase text-[#666]">
                  Vuoi scaricare anche un altro formato?
                </span>
                <div className="flex items-center gap-2">
                  {resultFormat !== 'gif' && (
                    <button
                      onClick={() => handleFormatChange('gif')}
                      className="px-2.5 py-1 text-[11px] font-black bg-[#FFD700] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-lg shadow-[1px_1px_0px_0px_#1A1A1A] hover:bg-[#ffe234] transition-all cursor-pointer"
                    >
                      + GIF Animata
                    </button>
                  )}
                  {resultFormat !== 'video' && (
                    <button
                      onClick={() => handleFormatChange('video')}
                      className="px-2.5 py-1 text-[11px] font-black bg-[#33CCFF] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-lg shadow-[1px_1px_0px_0px_#1A1A1A] hover:bg-[#52d6ff] transition-all cursor-pointer"
                    >
                      + Video MP4
                    </button>
                  )}
                  {resultFormat !== 'png' && (
                    <button
                      onClick={() => handleFormatChange('png')}
                      className="px-2.5 py-1 text-[11px] font-black bg-[#00FF41] text-[#1A1A1A] border-2 border-[#1A1A1A] rounded-lg shadow-[1px_1px_0px_0px_#1A1A1A] hover:bg-[#2eff65] transition-all cursor-pointer"
                    >
                      + Sticker PNG
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Generate Button (Shown whenever there is no result or when switching format) */}
          {(!resultUrl || resultFormat !== format) && !isExporting && (
            <div className="pt-1">
              <button
                onClick={handleStartExport}
                disabled={isExporting}
                className="w-full py-3.5 bg-[#FF3D00] hover:bg-[#ff5722] text-white font-black text-sm uppercase tracking-wider rounded-2xl border-3 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
                <span>
                  Genera e Scarica {format === 'gif' ? 'GIF Animata' : format === 'video' ? 'Video MP4' : 'Sticker PNG'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer with Close Button */}
        <div className="bg-[#FEF9F0] px-5 py-3.5 border-t-3 border-[#1A1A1A] flex items-center justify-between flex-shrink-0">
          <button
            onClick={handleResetForNewExport}
            disabled={isExporting || !resultUrl}
            className="flex items-center gap-1.5 text-xs font-black text-[#666] hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nuovo rendering</span>
          </button>

          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-5 py-2 bg-white hover:bg-[#FFF7D6] text-[#1A1A1A] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A] transition-all active:translate-y-0.5 cursor-pointer disabled:opacity-40"
          >
            Chiudi Finestra
          </button>
        </div>
      </div>
    </div>
  );
}
