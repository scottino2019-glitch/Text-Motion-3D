import { GIFEncoder, quantize, applyPalette } from 'gifenc';
import { TextGraphicProject, ExportSettings } from '../types';
import { drawTextGraphic } from './canvasRenderer';

export interface ExportProgress {
  progress: number; // 0 to 100
  statusText: string;
  stage: 'rendering' | 'encoding' | 'done' | 'error';
  blobUrl?: string;
  fileSize?: string;
  fileName?: string;
}

export async function exportAnimationAsGif(
  project: TextGraphicProject,
  settings: ExportSettings,
  onProgress: (p: ExportProgress) => void
): Promise<{ blob: Blob; url: string; fileName: string }> {
  const { width, height, fps, duration, transparentBackground } = settings;
  const totalFrames = Math.max(1, Math.round(duration * fps));
  const delayMs = Math.round(1000 / fps);

  // Setup offscreen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Impossibile inizializzare il contesto Canvas');
  }

  // If transparent requested for GIF, adjust project config copy
  const projectToRender: TextGraphicProject = {
    ...project,
    background: transparentBackground ? { ...project.background, type: 'transparent' } : project.background
  };

  const gif = GIFEncoder();

  for (let f = 0; f < totalFrames; f++) {
    const time = f / fps;
    
    onProgress({
      progress: Math.round((f / totalFrames) * 80),
      statusText: `Elaborazione frame ${f + 1} di ${totalFrames}...`,
      stage: 'rendering',
    });

    // Draw frame
    drawTextGraphic(ctx, projectToRender, {
      time,
      width,
      height,
      isExporting: true,
    });

    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;

    // Quantize colors (max 256 colors for crisp GIF)
    const palette = quantize(data, 256, {
      format: transparentBackground ? 'rgba4444' : 'rgb565',
    });

    const index = applyPalette(data, palette);

    let transparentIndex = -1;
    if (transparentBackground) {
      // Find transparent color index in palette
      for (let p = 0; p < palette.length; p++) {
        if (palette[p][3] === 0) {
          transparentIndex = p;
          break;
        }
      }
    }

    gif.writeFrame(index, width, height, {
      palette,
      delay: delayMs,
      transparent: transparentIndex !== -1,
      transparentIndex: transparentIndex !== -1 ? transparentIndex : undefined,
      dispose: transparentBackground ? 2 : 1, // 2 = restore background for transparent GIFs
    });

    // Yield to browser event loop
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  onProgress({
    progress: 90,
    statusText: 'Compressione e finalizzazione GIF...',
    stage: 'encoding',
  });

  gif.finish();
  const buffer = gif.bytes();
  const blob = new Blob([buffer], { type: 'image/gif' });
  const url = URL.createObjectURL(blob);
  const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
  const cleanTitle = (project.title || 'scritta-3d-animata').toLowerCase().replace(/[^a-z0-9]/g, '-');
  const fileName = `${cleanTitle}.gif`;

  onProgress({
    progress: 100,
    statusText: `GIF pronta (${sizeMB} MB)!`,
    stage: 'done',
    blobUrl: url,
    fileSize: `${sizeMB} MB`,
    fileName,
  });

  return { blob, url, fileName };
}

export async function exportAnimationAsVideo(
  project: TextGraphicProject,
  settings: ExportSettings,
  onProgress: (p: ExportProgress) => void
): Promise<{ blob: Blob; url: string; fileName: string }> {
  const { width, height, fps, duration } = settings;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Impossibile inizializzare il contesto Canvas');
  }

  // Check supported MIME types for video recording
  const mimeTypes = [
    'video/mp4;codecs=avc1',
    'video/mp4',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];

  let selectedMime = mimeTypes.find((mime) => MediaRecorder.isTypeSupported(mime)) || 'video/webm';
  const isMp4 = selectedMime.includes('mp4');

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 8000000, // 8 Mbps for high quality
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: selectedMime });
      const url = URL.createObjectURL(blob);
      const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
      const cleanTitle = (project.title || 'scritta-3d-animata').toLowerCase().replace(/[^a-z0-9]/g, '-');
      const ext = isMp4 ? 'mp4' : 'webm';
      const fileName = `${cleanTitle}.${ext}`;

      onProgress({
        progress: 100,
        statusText: `Video pronto (${sizeMB} MB)!`,
        stage: 'done',
        blobUrl: url,
        fileSize: `${sizeMB} MB`,
        fileName,
      });

      resolve({ blob, url, fileName });
    };

    recorder.onerror = (err) => {
      onProgress({
        progress: 0,
        statusText: 'Errore durante la registrazione video',
        stage: 'error',
      });
      reject(err);
    };

    recorder.start();

    const totalFrames = Math.round(duration * fps);
    let currentFrame = 0;
    const intervalMs = 1000 / fps;

    const intervalId = setInterval(() => {
      if (currentFrame >= totalFrames) {
        clearInterval(intervalId);
        onProgress({
          progress: 95,
          statusText: 'Finalizzazione video...',
          stage: 'encoding',
        });
        recorder.stop();
        return;
      }

      const time = currentFrame / fps;
      drawTextGraphic(ctx, project, {
        time,
        width,
        height,
        isExporting: true,
      });

      currentFrame++;

      onProgress({
        progress: Math.round((currentFrame / totalFrames) * 90),
        statusText: `Elaborazione frame video ${currentFrame} di ${totalFrames}...`,
        stage: 'rendering',
      });
    }, intervalMs);
  });
}

export function exportSingleFramePng(
  project: TextGraphicProject,
  width: number,
  height: number,
  transparentBackground: boolean = false
): { blob: Blob; url: string; fileName: string } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Contesto Canvas non disponibile');

  const projectToRender: TextGraphicProject = {
    ...project,
    background: transparentBackground ? { ...project.background, type: 'transparent' } : project.background
  };

  drawTextGraphic(ctx, projectToRender, {
    time: 0.5,
    width,
    height,
    isExporting: true,
  });

  const dataUrl = canvas.toDataURL('image/png');
  const cleanTitle = (project.title || 'scritta-3d').toLowerCase().replace(/[^a-z0-9]/g, '-');
  const fileName = `${cleanTitle}.png`;

  // Convert to blob
  const byteString = atob(dataUrl.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: 'image/png' });
  const url = URL.createObjectURL(blob);

  return { blob, url, fileName };
}
