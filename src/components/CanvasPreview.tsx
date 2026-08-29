import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, Maximize2, Sparkles, Image as ImageIcon, RotateCcw, Crop } from 'lucide-react';
import { TextGraphicProject } from '../types';
import { drawTextGraphic } from '../utils/canvasRenderer';

interface CanvasPreviewProps {
  project: TextGraphicProject;
  onUpdateProject: (updater: (prev: TextGraphicProject) => TextGraphicProject) => void;
  onOpenExportModal: () => void;
}

export function CanvasPreview({ project, onUpdateProject, onOpenExportModal }: CanvasPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const pausedTimeRef = useRef<number>(0);

  // Aspect ratio dimensions calculation
  const getCanvasDimensions = useCallback(() => {
    const ratio = project.aspectRatio;
    switch (ratio) {
      case '1:1':
        return { width: 900, height: 900 };
      case '9:16':
        return { width: 720, height: 1280 };
      case '4:3':
        return { width: 960, height: 720 };
      case '16:9':
      default:
        return { width: 1080, height: 608 };
    }
  }, [project.aspectRatio]);

  // Main animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = getCanvasDimensions();
    canvas.width = width;
    canvas.height = height;

    const loopDuration = project.animation.durationSeconds || 3;

    const render = (now: number) => {
      let t = 0;
      if (isPlaying) {
        const elapsed = (now - startTimeRef.current) / 1000;
        t = elapsed % loopDuration;
        setCurrentTime(t);
      } else {
        t = pausedTimeRef.current % loopDuration;
      }

      drawTextGraphic(ctx, project, {
        time: t,
        width,
        height,
        isExporting: false,
      });

      if (isPlaying) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      startTimeRef.current = performance.now() - currentTime * 1000;
      animationFrameId.current = requestAnimationFrame(render);
    } else {
      render(performance.now());
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [project, isPlaying, getCanvasDimensions]);

  const togglePlayPause = () => {
    if (isPlaying) {
      pausedTimeRef.current = currentTime;
      setIsPlaying(false);
    } else {
      startTimeRef.current = performance.now() - pausedTimeRef.current * 1000;
      setIsPlaying(true);
    }
  };

  const handleTimeScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    pausedTimeRef.current = val;
    setCurrentTime(val);
    if (isPlaying) {
      startTimeRef.current = performance.now() - val * 1000;
    }
  };

  const handleAspectRatioChange = (ratio: '16:9' | '1:1' | '9:16' | '4:3') => {
    onUpdateProject((prev) => ({ ...prev, aspectRatio: ratio }));
  };

  return (
    <div className="flex flex-col bg-white border-3 sm:border-4 border-[#1A1A1A] rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#1A1A1A]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#1A1A1A] text-white border-b-3 border-[#1A1A1A] text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41] border border-[#1A1A1A] animate-pulse"></span>
            <span>Live 3D Stage</span>
          </div>
          <span className="text-xs bg-white/15 text-[#FFD700] px-2.5 py-0.5 rounded-full font-mono font-bold">
            {currentTime.toFixed(2)}s / {project.animation.durationSeconds}s
          </span>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-700">
          <button
            onClick={() => handleAspectRatioChange('16:9')}
            className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
              project.aspectRatio === '16:9'
                ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            16:9
          </button>
          <button
            onClick={() => handleAspectRatioChange('1:1')}
            className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
              project.aspectRatio === '1:1'
                ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            1:1
          </button>
          <button
            onClick={() => handleAspectRatioChange('9:16')}
            className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
              project.aspectRatio === '9:16'
                ? 'bg-[#FFD700] text-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            9:16
          </button>
        </div>
      </div>

      {/* Canvas Viewport Stage */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center p-4 sm:p-8 bg-[#EFE9DC] min-h-[380px] sm:min-h-[480px] overflow-hidden"
      >
        {/* Stage Dot Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#1A1A1A 1.5px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Decorative stage corner circles */}
        <div className="absolute top-4 left-4 flex gap-1.5 pointer-events-none">
          <div className="w-3 h-3 bg-[#FF3D00] rounded-full border border-[#1A1A1A]"></div>
          <div className="w-3 h-3 bg-[#FFD700] rounded-full border border-[#1A1A1A]"></div>
          <div className="w-3 h-3 bg-[#33CCFF] rounded-full border border-[#1A1A1A]"></div>
        </div>

        <div className="relative max-w-full max-h-[580px] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] border-3 border-[#1A1A1A] flex items-center justify-center bg-white">
          {/* Transparency checkerboard behind if transparent */}
          {project.background.type === 'transparent' && (
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `repeating-conic-gradient(#1A1A1A 0% 25%, transparent 0% 50%)`,
                backgroundSize: '16px 16px',
              }}
            />
          )}
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[560px] object-contain block transition-all"
            style={{
              aspectRatio:
                project.aspectRatio === '1:1'
                  ? '1 / 1'
                  : project.aspectRatio === '9:16'
                  ? '9 / 16'
                  : '16 / 9',
            }}
          />
        </div>
      </div>

      {/* Bottom Animation Controls & Timeline */}
      <div className="px-4 sm:px-6 py-4 bg-white border-t-3 border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4">
        {/* Play / Pause & Scrubber */}
        <div className="flex items-center gap-3.5 flex-1 min-w-[260px]">
          <button
            onClick={togglePlayPause}
            className="w-11 h-11 rounded-2xl bg-[#FFD700] hover:bg-[#ffe033] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-[#1A1A1A] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[3px_3px_0px_0px_#1A1A1A] transition-all flex-shrink-0 cursor-pointer"
            title={isPlaying ? 'Pausa' : 'Riproduci'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current stroke-[2.5]" /> : <Play className="w-5 h-5 fill-current ml-0.5 stroke-[2.5]" />}
          </button>

          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 relative flex items-center">
              <input
                type="range"
                min="0"
                max={project.animation.durationSeconds}
                step="0.02"
                value={currentTime}
                onChange={handleTimeScrub}
                className="w-full accent-[#FF3D00] h-3 bg-[#EEE] rounded-full border-2 border-[#1A1A1A] cursor-pointer"
              />
            </div>
            <div className="bg-[#1A1A1A] text-white px-2.5 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap shadow-[2px_2px_0px_0px_#FFD700]">
              <span className="text-[#FFD700]">{currentTime.toFixed(1)}s</span> / {project.animation.durationSeconds}s
            </div>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2.5">
          {/* Sparkles toggle */}
          <button
            onClick={() =>
              onUpdateProject((prev) => ({
                ...prev,
                animation: {
                  ...prev.animation,
                  sparklesEnabled: !prev.animation.sparklesEnabled,
                },
              }))
            }
            className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#1A1A1A] flex items-center gap-1.5 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              project.animation.sparklesEnabled
                ? 'bg-[#33CCFF] text-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]'
                : 'bg-white text-[#1A1A1A] hover:bg-[#FFF7D6] shadow-[2px_2px_0px_0px_#1A1A1A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF3D00] stroke-[3]" />
            <span>Scintille</span>
          </button>

          {/* Quick Export Button */}
          <button
            onClick={onOpenExportModal}
            className="px-4 py-2 bg-[#FF3D00] hover:bg-[#ff5722] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] transition-all cursor-pointer"
          >
            Esporta
          </button>
        </div>
      </div>
    </div>
  );
}
