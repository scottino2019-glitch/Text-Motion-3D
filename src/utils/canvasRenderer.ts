import { TextGraphicProject, TextLine, ColorPalette, BadgeItem, Style3DConfig } from '../types';

export interface RenderContextOptions {
  time: number; // in seconds
  width: number;
  height: number;
  scale?: number;
  isExporting?: boolean;
}

// Background images cache for scenic templates
const imageCache: { [key: string]: HTMLImageElement } = {};

export function preloadBackgroundImages() {
  // Generate high quality procedural nature background canvas if needed
}

export function drawTextGraphic(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  options: RenderContextOptions
) {
  const { width, height, time } = options;
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Background
  drawBackground(ctx, project, width, height, time);

  // 2. Compute animation global and line-specific factors
  const { speed, intensity, type, sparklesEnabled } = project.animation;
  const t = time * speed * Math.PI * 2;

  // Global project coordinates
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate layout of all lines
  const lineMetrics = calculateLinesLayout(ctx, project, width, height);

  // 3. Draw Backing Plate (Organic merged puffy pill backing if enabled)
  if (project.style3D.showBackingPlate && lineMetrics.length > 0) {
    drawBackingPlate(ctx, project, lineMetrics, t);
  }

  // 4. Draw 3D Extrusion, Outlines, Gradient Fills, and Gloss for each line
  lineMetrics.forEach((lineData, lineIndex) => {
    drawLine3D(ctx, project, lineData, lineIndex, t, width);
  });

  // 5. Draw 3D Badges / Emojis
  if (project.badges && project.badges.length > 0) {
    drawBadges(ctx, project, lineMetrics, t, width, height);
  }

  // 6. Draw Sparkles & Light Glints
  if (sparklesEnabled) {
    drawSparkles(ctx, project, lineMetrics, t, width, height);
  }

  ctx.restore();
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  width: number,
  height: number,
  time: number
) {
  const { background } = project;

  if (background.type === 'transparent') {
    // If transparent, do not draw background
    return;
  }

  if (background.type === 'solid') {
    ctx.fillStyle = background.solidColor || '#0F172A';
    ctx.fillRect(0, 0, width, height);
    return;
  }

  if (background.type === 'gradient_sunset') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#2b0938');
    grad.addColorStop(0.5, '#6a1b9a');
    grad.addColorStop(1, '#ff6f00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    drawSunRays(ctx, width, height, time, 'rgba(255, 230, 150, 0.08)');
    return;
  }

  if (background.type === 'gradient_pastel') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fbcfe8');
    grad.addColorStop(0.5, '#e0e7ff');
    grad.addColorStop(1, '#fed7aa');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    drawBokehCircles(ctx, width, height, time, ['rgba(255,255,255,0.4)', 'rgba(251,207,232,0.3)', 'rgba(224,231,255,0.3)']);
    return;
  }

  if (background.type === 'cozy_coffee') {
    const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) / 1.1);
    grad.addColorStop(0, '#582f0e');
    grad.addColorStop(0.6, '#331800');
    grad.addColorStop(1, '#1e0c00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    drawBokehCircles(ctx, width, height, time, ['rgba(255,214,165,0.15)', 'rgba(233,196,106,0.12)']);
    return;
  }

  if (background.type === 'custom_image' && background.customImageDataUrl) {
    const cacheKey = background.customImageDataUrl;
    if (!imageCache[cacheKey]) {
      const img = new Image();
      img.src = background.customImageDataUrl;
      img.onload = () => { imageCache[cacheKey] = img; };
      imageCache[cacheKey] = img;
    }
    const img = imageCache[cacheKey];
    if (img && img.complete && img.naturalWidth > 0) {
      // Draw cover
      drawCoverImage(ctx, img, width, height);
      if (background.brightness !== 100) {
        ctx.fillStyle = background.brightness < 100 ? `rgba(0,0,0,${(100 - background.brightness) / 100})` : `rgba(255,255,255,${(background.brightness - 100) / 100})`;
        ctx.fillRect(0, 0, width, height);
      }
      return;
    }
  }

  // Default: 'nature_olive' or 'sunny_garden' (Procedural warm lush olive garden backdrop)
  drawProceduralNatureGarden(ctx, width, height, time, background.type === 'sunny_garden');
}

function drawCoverImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) {
  const imgRatio = img.width / img.height;
  const canvasRatio = width / height;
  let renderW = width;
  let renderH = height;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasRatio > imgRatio) {
    renderH = width / imgRatio;
    offsetY = (height - renderH) / 2;
  } else {
    renderW = height * imgRatio;
    offsetX = (width - renderW) / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
}

function drawProceduralNatureGarden(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  isSunnyGarden: boolean
) {
  // Rich photographic simulation of a sunlit olive tree grove / garden with depth of field
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  if (isSunnyGarden) {
    grad.addColorStop(0, '#5b7044');
    grad.addColorStop(0.3, '#7d8f58');
    grad.addColorStop(0.7, '#968962');
    grad.addColorStop(1, '#564d36');
  } else {
    // Olive grove morning sunlight (matching image exact mood)
    grad.addColorStop(0, '#66744f');
    grad.addColorStop(0.35, '#849363');
    grad.addColorStop(0.65, '#9e9678');
    grad.addColorStop(1, '#5a4f3b');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Soft textured foliage clusters (bokeh dabs)
  const seedNodes = [
    { x: 0.12, y: 0.15, r: 120, c: '#485633' },
    { x: 0.88, y: 0.2, r: 160, c: '#4c5c36' },
    { x: 0.05, y: 0.45, r: 180, c: '#3e4a2b' },
    { x: 0.95, y: 0.55, r: 190, c: '#54633b' },
    { x: 0.35, y: 0.1, r: 110, c: '#5e7041' },
    { x: 0.65, y: 0.12, r: 130, c: '#5e7041' },
    { x: 0.5, y: 0.88, r: 220, c: '#433b2a' },
    { x: 0.2, y: 0.85, r: 150, c: '#362f22' },
    { x: 0.8, y: 0.82, r: 160, c: '#362f22' },
  ];

  seedNodes.forEach((node) => {
    const rx = node.x * width + Math.sin(time * 0.5 + node.x * 10) * 8;
    const ry = node.y * height + Math.cos(time * 0.5 + node.y * 10) * 8;
    const radGrad = ctx.createRadialGradient(rx, ry, 10, rx, ry, node.r);
    radGrad.addColorStop(0, node.c);
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(rx, ry, node.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Warm golden sun flare & sunbeams from top
  const sunX = width * 0.45;
  const sunY = 0;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, width * 0.75);
  sunGrad.addColorStop(0, 'rgba(255, 245, 180, 0.45)');
  sunGrad.addColorStop(0.3, 'rgba(255, 230, 140, 0.22)');
  sunGrad.addColorStop(0.7, 'rgba(255, 210, 100, 0.08)');
  sunGrad.addColorStop(1, 'rgba(255, 210, 100, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft bokeh sun orbs
  drawBokehCircles(ctx, width, height, time, [
    'rgba(255, 255, 220, 0.25)',
    'rgba(255, 240, 180, 0.18)',
    'rgba(220, 245, 190, 0.15)',
  ]);
}

function drawBokehCircles(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, colors: string[]) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const phase = i * 1.618;
    const x = ((Math.sin(phase * 4 + time * 0.3) + 1) / 2) * width;
    const y = ((Math.cos(phase * 3 + time * 0.25) + 1) / 2) * height;
    const r = 25 + (Math.sin(phase + time) + 1) * 25;
    const color = colors[i % colors.length];

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSunRays(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, color: string) {
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(time * 0.05);
  const rays = 16;
  ctx.fillStyle = color;
  for (let i = 0; i < rays; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const angle1 = (i * Math.PI * 2) / rays;
    const angle2 = angle1 + Math.PI / rays / 2;
    const dist = Math.max(width, height) * 1.5;
    ctx.lineTo(Math.cos(angle1) * dist, Math.sin(angle1) * dist);
    ctx.lineTo(Math.cos(angle2) * dist, Math.sin(angle2) * dist);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

// Unicode-compliant emoji matcher including compound emojis, skin tones, zero-width joiners
const EMOJI_REGEX = /(\p{Extended_Pictographic}[\uFE0E\uFE0F\u200D\u{1F3FB}-\u{1F3FF}\p{Extended_Pictographic}]*)/u;

interface TextToken {
  text: string;
  isEmoji: boolean;
  width: number;
}

function tokenizeLineText(ctx: CanvasRenderingContext2D, text: string, fontStr: string, fontSize: number): TextToken[] {
  const parts = text.split(EMOJI_REGEX);
  const tokens: TextToken[] = [];
  
  for (const part of parts) {
    if (!part) continue;
    const isEmoji = EMOJI_REGEX.test(part);
    if (isEmoji) {
      ctx.font = `${Math.round(fontSize * 0.95)}px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
      const w = Math.max(fontSize * 0.95, ctx.measureText(part).width);
      tokens.push({ text: part, isEmoji: true, width: w });
    } else {
      ctx.font = fontStr;
      const w = ctx.measureText(part).width;
      tokens.push({ text: part, isEmoji: false, width: w });
    }
  }
  return tokens;
}

interface RenderedLineData {
  line: TextLine;
  textToDraw: string;
  fontString: string;
  fontSize: number;
  x: number;
  y: number;
  width: number;
  height: number;
  animOffsetY: number;
  animScale: number;
  animRotate: number;
  colors: {
    gradientTop: string;
    gradientBottom: string;
    bevelHighlight: string;
    outlineColor: string;
    extrusionColor: string;
  };
}

function calculateLinesLayout(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  canvasW: number,
  canvasH: number
): RenderedLineData[] {
  const { lines, palette } = project;
  const result: RenderedLineData[] = [];
  if (!lines || lines.length === 0) return result;

  // Scale factor: transforms the user's slider font size (e.g. 24px) to internal canvas resolution
  // so it renders at exactly 24 CSS pixels on the user's screen (no more 4x-downscale to 6px)
  const visualScale = canvasW / 360;
  const spacingScale = canvasH / 720;

  let totalHeight = 0;
  const lineHeights: number[] = [];
  const calculatedFontSizes: number[] = [];

  lines.forEach((line) => {
    let effectiveSize = Math.max(16, Math.round(line.fontSize * visualScale));

    // Prevent horizontal overflow
    const textToDraw = line.isUppercase ? line.text.toUpperCase() : line.text;
    const fontStr = `900 ${effectiveSize}px "${line.fontFamily}", "Fredoka", sans-serif`;
    
    let measuredW = 0;
    if (EMOJI_REGEX.test(textToDraw)) {
      const tokens = tokenizeLineText(ctx, textToDraw, fontStr, effectiveSize);
      measuredW = tokens.reduce((acc, t) => acc + t.width, 0);
    } else {
      ctx.font = fontStr;
      measuredW = ctx.measureText(textToDraw).width;
    }

    const maxAllowedW = canvasW * 0.90;

    if (measuredW > maxAllowedW && measuredW > 0) {
      effectiveSize = Math.max(16, Math.floor(effectiveSize * (maxAllowedW / measuredW)));
    }

    calculatedFontSizes.push(effectiveSize);
    const h = effectiveSize * 1.15;
    lineHeights.push(h);
    totalHeight += h + 14 * spacingScale;
  });

  let currentY = (canvasH - totalHeight) / 2 + (lineHeights[0] || 60) * 0.82;

  lines.forEach((line, index) => {
    const effectiveSize = calculatedFontSizes[index];
    const fontStr = `900 ${effectiveSize}px "${line.fontFamily}", "Fredoka", sans-serif`;
    const textToDraw = line.isUppercase ? line.text.toUpperCase() : line.text;
    
    let lineW = 0;
    if (EMOJI_REGEX.test(textToDraw)) {
      const tokens = tokenizeLineText(ctx, textToDraw, fontStr, effectiveSize);
      lineW = tokens.reduce((acc, t) => acc + t.width, 0);
    } else {
      ctx.font = fontStr;
      lineW = ctx.measureText(textToDraw).width;
    }

    const x = (canvasW - lineW) / 2;
    const y = currentY + (line.offsetY || 0);

    const colors = line.customColors || {
      gradientTop: palette.gradientTop,
      gradientBottom: palette.gradientBottom,
      bevelHighlight: palette.bevelHighlight,
      outlineColor: palette.outlineColor,
      extrusionColor: palette.extrusionColor,
    };

    result.push({
      line,
      textToDraw,
      fontString: fontStr,
      fontSize: effectiveSize,
      x,
      y,
      width: lineW,
      height: effectiveSize,
      animOffsetY: 0,
      animScale: 1,
      animRotate: 0,
      colors,
    });

    if (index < lines.length - 1) {
      currentY += lineHeights[index] + 16 * spacingScale;
    }
  });

  return result;
}

function getLineAnimationTransform(
  type: string,
  lineIndex: number,
  totalLines: number,
  t: number,
  intensity: number
) {
  let animOffsetY = 0;
  let animScale = 1;
  let animRotate = 0;

  const phase = lineIndex * 0.6;

  switch (type) {
    case 'bounce': {
      // Elastic bouncy squash & stretch
      const bounce = Math.abs(Math.sin(t + phase));
      animOffsetY = -bounce * 22 * intensity;
      animScale = 1 + (1 - bounce) * 0.08 * intensity;
      break;
    }
    case 'wave': {
      // Sine wave ripple
      animOffsetY = Math.sin(t + phase * 1.5) * 16 * intensity;
      animRotate = (Math.cos(t + phase * 1.5) * 2.5 * intensity * Math.PI) / 180;
      break;
    }
    case 'float': {
      // Gentle floating cloud
      animOffsetY = Math.sin(t * 0.8 + phase) * 10 * intensity;
      animRotate = (Math.sin(t * 0.6 + phase) * 2 * intensity * Math.PI) / 180;
      break;
    }
    case 'pulse': {
      // Heartbeat pulse
      const p = Math.sin(t * 1.5 + phase);
      animScale = 1 + p * 0.09 * intensity;
      break;
    }
    case 'wobble': {
      // 3D wobble / tilt
      animRotate = (Math.sin(t + phase) * 5 * intensity * Math.PI) / 180;
      animOffsetY = Math.sin(t * 1.8 + phase) * 8 * intensity;
      break;
    }
    case 'pop': {
      // Pop & drop spring
      const drop = Math.sin(t * 1.2 + phase);
      animScale = 1 + Math.max(0, drop) * 0.16 * intensity;
      animOffsetY = -Math.max(0, drop) * 14 * intensity;
      break;
    }
    case 'shimmer': {
      // Subtle float with light shimmer
      animOffsetY = Math.sin(t * 0.7 + phase) * 6 * intensity;
      break;
    }
    case 'rainbow': {
      animOffsetY = Math.sin(t + phase) * 10 * intensity;
      break;
    }
    default:
      break;
  }

  return { animOffsetY, animScale, animRotate };
}

function drawBackingPlate(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  lineMetrics: RenderedLineData[],
  t: number
) {
  const { style3D, palette, animation } = project;
  const padding = style3D.backingPlatePadding * 2.8;
  const depth = style3D.extrusionDepth * 2.4;

  // Calculate composite bounding box around all lines with animation
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  lineMetrics.forEach((lineData, idx) => {
    const { animOffsetY, animScale } = getLineAnimationTransform(
      animation.type,
      idx,
      lineMetrics.length,
      t,
      animation.intensity
    );
    const halfW = (lineData.width * animScale) / 2;
    const midX = lineData.x + lineData.width / 2;
    const topY = lineData.y - lineData.height + animOffsetY;
    const botY = lineData.y + animOffsetY;

    minX = Math.min(minX, midX - halfW);
    maxX = Math.max(maxX, midX + halfW);
    minY = Math.min(minY, topY);
    maxY = Math.max(maxY, botY);
  });

  const plateX = minX - padding;
  const plateY = minY - padding;
  const plateW = maxX - minX + padding * 2;
  const plateH = maxY - minY + padding * 2;
  const radius = Math.min(36, plateH / 2.5);

  ctx.save();

  // Draw Deep Soft Drop Shadow under Backing Plate
  ctx.shadowColor = palette.shadowColor || 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = style3D.shadowBlur * 1.5;
  ctx.shadowOffsetY = style3D.shadowBlur * 0.8;

  const hullColor = style3D.backingPlateColor || palette.backingHullColor || '#2D6A4F';
  const hullExtrusionColor = palette.extrusionColor || '#1B4332';

  // Draw 3D Extruded layers for the backing plate
  const angleRad = (style3D.extrusionAngle * Math.PI) / 180;
  const stepX = Math.cos(angleRad);
  const stepY = Math.sin(angleRad);

  for (let d = depth; d >= 0; d -= 1.5) {
    const ox = stepX * d;
    const oy = stepY * d;
    ctx.fillStyle = d === 0 ? hullColor : hullExtrusionColor;
    drawRoundedRect(ctx, plateX + ox, plateY + oy, plateW, plateH, radius);
    ctx.fill();

    // Reset shadow after first bottom layer so layers don't overdarken
    if (d === depth) {
      ctx.shadowColor = 'transparent';
    }
  }

  // Draw Bright Bevel Ring around Plate
  ctx.strokeStyle = '#52B788'; // Vibrant lime outline
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, plateX, plateY, plateW, plateH, radius);
  ctx.stroke();

  ctx.restore();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : (
    ctx.moveTo(x + r, y),
    ctx.lineTo(x + w - r, y),
    ctx.quadraticCurveTo(x + w, y, x + w, y + r),
    ctx.lineTo(x + w, y + h - r),
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h),
    ctx.lineTo(x + r, y + h),
    ctx.quadraticCurveTo(x, y + h, x, y + h - r),
    ctx.lineTo(x, y + r),
    ctx.quadraticCurveTo(x, y, x + r, y),
    ctx.closePath()
  );
}

function drawLine3D(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  lineData: RenderedLineData,
  lineIndex: number,
  t: number,
  canvasW: number
) {
  const { style3D, animation, palette } = project;
  const { textToDraw, fontString, fontSize, x, y, width, height, colors } = lineData;

  const { animOffsetY, animScale, animRotate } = getLineAnimationTransform(
    animation.type,
    lineIndex,
    project.lines.length,
    t,
    animation.intensity
  );

  ctx.save();

  // Set line transform center
  const centerX = x + width / 2;
  const centerY = y - height / 2 + animOffsetY;

  ctx.translate(centerX, centerY);
  ctx.rotate(animRotate);
  ctx.scale(animScale, animScale);
  ctx.translate(-centerX, -centerY);

  const strokeScale = canvasW / 360;
  const depth = style3D.extrusionDepth * strokeScale;
  const angleRad = (style3D.extrusionAngle * Math.PI) / 180;
  const stepX = Math.cos(angleRad);
  const stepY = Math.sin(angleRad);

  const drawY = y + animOffsetY;

  const extrusionColor = colors.extrusionColor;
  const outlineColor = colors.outlineColor;
  const bevelWidth = Math.max(2, style3D.bevelWidth * strokeScale);

  // Gradient for text fill
  const grad = ctx.createLinearGradient(x, drawY - height, x, drawY);
  if (animation.type === 'rainbow') {
    const hueOffset = (t * 40 + lineIndex * 60) % 360;
    grad.addColorStop(0, `hsl(${hueOffset}, 100%, 75%)`);
    grad.addColorStop(1, `hsl(${(hueOffset + 60) % 360}, 100%, 50%)`);
  } else {
    grad.addColorStop(0, colors.gradientTop);
    grad.addColorStop(0.5, colors.gradientTop);
    grad.addColorStop(1, colors.gradientBottom);
  }

  const hasEmoji = EMOJI_REGEX.test(textToDraw);

  if (!hasEmoji) {
    // Pure text line: original optimized drawing
    ctx.font = fontString;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Drop Shadow on the lowest layer
    ctx.shadowColor = palette.shadowColor || 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = style3D.shadowBlur * strokeScale;
    ctx.shadowOffsetY = style3D.shadowBlur * 0.6 * strokeScale;

    // 1. Draw Multi-Layer 3D Extrusion
    for (let d = depth; d >= 1; d -= Math.max(1, strokeScale * 0.5)) {
      const ox = stepX * d;
      const oy = stepY * d;

      ctx.strokeStyle = extrusionColor;
      ctx.lineWidth = bevelWidth * 2;
      ctx.strokeText(textToDraw, x + ox, drawY + oy);

      ctx.fillStyle = extrusionColor;
      ctx.fillText(textToDraw, x + ox, drawY + oy);

      if (d === depth) {
        ctx.shadowColor = 'transparent';
      }
    }

    // 2. Thick Outer Border / Stroke for Front Face
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = bevelWidth * 2;
    ctx.strokeText(textToDraw, x, drawY);

    // 3. Inner Bevel Ring (Bright accent stroke before fill)
    if (bevelWidth >= 4) {
      ctx.strokeStyle = colors.bevelHighlight || '#FFFFFF';
      ctx.lineWidth = Math.max(2, bevelWidth * 0.7);
      ctx.strokeText(textToDraw, x, drawY - 1);
    }

    // 4. Vibrant Front Gradient Fill
    ctx.fillStyle = grad;
    ctx.fillText(textToDraw, x, drawY);

    // 5. Specular Gloss / Shiny Candy Highlights
    if (style3D.showGloss) {
      drawTextGloss(ctx, textToDraw, x, drawY, height, width, t);
    }
  } else {
    // Mixed text & emoji line: tokenize so emojis retain full color and get cartoon 3D sticker backing
    const tokens = tokenizeLineText(ctx, textToDraw, fontString, fontSize);
    let curX = x;
    const tokenPositions: { token: TextToken; x: number }[] = [];
    tokens.forEach((tok) => {
      tokenPositions.push({ token: tok, x: curX });
      curX += tok.width;
    });

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.shadowColor = palette.shadowColor || 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = style3D.shadowBlur * strokeScale;
    ctx.shadowOffsetY = style3D.shadowBlur * 0.6 * strokeScale;

    // 1. 3D Extrusion
    for (let d = depth; d >= 1; d -= Math.max(1, strokeScale * 0.5)) {
      const ox = stepX * d;
      const oy = stepY * d;

      tokenPositions.forEach(({ token, x: tokX }) => {
        if (!token.isEmoji) {
          ctx.font = fontString;
          ctx.strokeStyle = extrusionColor;
          ctx.lineWidth = bevelWidth * 2;
          ctx.strokeText(token.text, tokX + ox, drawY + oy);

          ctx.fillStyle = extrusionColor;
          ctx.fillText(token.text, tokX + ox, drawY + oy);
        } else {
          // Circular 3D extrusion under emoji sticker
          const emCenterX = tokX + token.width / 2 + ox;
          const emCenterY = drawY - height * 0.40 + oy;
          const emRadius = fontSize * 0.52;
          ctx.beginPath();
          ctx.arc(emCenterX, emCenterY, emRadius, 0, Math.PI * 2);
          ctx.fillStyle = extrusionColor;
          ctx.fill();
        }
      });

      if (d === depth) {
        ctx.shadowColor = 'transparent';
      }
    }

    // 2. Front Face Outer Border
    tokenPositions.forEach(({ token, x: tokX }) => {
      if (!token.isEmoji) {
        ctx.font = fontString;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = bevelWidth * 2;
        ctx.strokeText(token.text, tokX, drawY);

        if (bevelWidth >= 4) {
          ctx.strokeStyle = colors.bevelHighlight || '#FFFFFF';
          ctx.lineWidth = Math.max(2, bevelWidth * 0.7);
          ctx.strokeText(token.text, tokX, drawY - 1);
        }
      } else {
        // Crisp white cartoon sticker base plate for emoji
        const emCenterX = tokX + token.width / 2;
        const emCenterY = drawY - height * 0.40;
        const emRadius = fontSize * 0.52;

        ctx.beginPath();
        ctx.arc(emCenterX, emCenterY, emRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = Math.max(3, bevelWidth * 1.2);
        ctx.stroke();
      }
    });

    // 3. Front Face Fill
    tokenPositions.forEach(({ token, x: tokX }) => {
      if (!token.isEmoji) {
        ctx.font = fontString;
        ctx.fillStyle = grad;
        ctx.fillText(token.text, tokX, drawY);
      } else {
        const emCenterX = tokX + token.width / 2;
        const emCenterY = drawY - height * 0.38;
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#000000';
        ctx.font = `${Math.round(fontSize * 0.95)}px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(token.text, emCenterX, emCenterY);

        // Reset text alignment
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
      }
    });

    // 4. Gloss Sheen on text parts
    if (style3D.showGloss) {
      drawTextGloss(ctx, textToDraw, x, drawY, height, width, t);
    }
  }

  ctx.restore();
}

function drawTextGloss(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  height: number,
  width: number,
  t: number
) {
  ctx.save();

  // Create clipping region to upper half of the text
  ctx.beginPath();
  ctx.rect(x - 10, y - height - 10, width + 20, height * 0.45);
  ctx.clip();

  // Draw semi-transparent white gloss sheen
  const glossGrad = ctx.createLinearGradient(x, y - height, x, y - height * 0.55);
  glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  glossGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.35)');
  glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = glossGrad;
  ctx.fillText(text, x, y);

  // Moving light glare line
  const glarePos = ((t * 0.4) % 2) - 0.5; // -0.5 to 1.5
  if (glarePos >= 0 && glarePos <= 1) {
    const glareX = x + width * glarePos;
    const rayGrad = ctx.createLinearGradient(glareX - 30, y - height, glareX + 30, y);
    rayGrad.addColorStop(0, 'rgba(255,255,255,0)');
    rayGrad.addColorStop(0.5, 'rgba(255,255,255,0.7)');
    rayGrad.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = rayGrad;
    ctx.fillText(text, x, y);
  }

  ctx.restore();
}

function drawBadges(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  lineMetrics: RenderedLineData[],
  t: number,
  width: number,
  height: number
) {
  if (!project.badges || project.badges.length === 0) return;

  const visualScale = width / 360;

  project.badges.forEach((badge) => {
    const badgeX = badge.xRatio * width;
    const badgeY = badge.yRatio * height;

    // Bobbing and rotation animation
    const bob = Math.sin(t + badge.animationDelay * 5) * (8 * (visualScale / 3));
    const rot = (badge.rotation * Math.PI) / 180 + Math.sin(t * 1.2 + badge.animationDelay) * 0.08;
    const pulseScale = badge.scale * (1 + Math.sin(t * 1.5 + badge.animationDelay) * 0.05);

    ctx.save();
    ctx.translate(badgeX, badgeY + bob);
    ctx.rotate(rot);
    ctx.scale(pulseScale, pulseScale);

    if (badge.emoji === '☀️') {
      // Draw rich 3D cartoon sun scaled to canvas resolution
      draw3DSunBadge(ctx, t, visualScale);
    } else {
      // Draw 3D cartoon sticker badge with white backing bubble and glossy arc
      draw3DStickerBadge(ctx, badge, t, visualScale, project.palette, project.style3D);
    }

    ctx.restore();
  });
}

function draw3DStickerBadge(
  ctx: CanvasRenderingContext2D,
  badge: BadgeItem,
  t: number,
  visualScale: number,
  palette: ColorPalette,
  style3D: Style3DConfig
) {
  const r = 36 * visualScale;
  const depth = Math.max(4, 8 * (visualScale / 3));
  const strokeW = Math.max(3, 5 * (visualScale / 3));

  ctx.save();

  // 1. Drop shadow & 3D Extrusion
  ctx.shadowColor = palette.shadowColor || 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 14 * (visualScale / 3);
  ctx.shadowOffsetY = 8 * (visualScale / 3);

  const extColor = palette.extrusionColor || '#1A1A1A';

  // Draw extruded rim downwards
  for (let d = depth; d >= 0; d -= 2) {
    ctx.beginPath();
    ctx.arc(0, d, r + strokeW / 2, 0, Math.PI * 2);
    ctx.fillStyle = extColor;
    ctx.fill();
    if (d === depth) {
      ctx.shadowColor = 'transparent';
    }
  }

  // 2. Thick outer stroke & white sticker backing
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = palette.outlineColor || '#1A1A1A';
  ctx.lineWidth = strokeW;
  ctx.stroke();

  // 3. Subtle cream/pastel radial gradient on the sticker backing for depth
  const innerGrad = ctx.createRadialGradient(0, -r * 0.3, 2, 0, 0, r);
  innerGrad.addColorStop(0, '#FFFFFF');
  innerGrad.addColorStop(0.85, '#FFFBF0');
  innerGrad.addColorStop(1, '#F3ECE0');
  ctx.fillStyle = innerGrad;
  ctx.beginPath();
  ctx.arc(0, 0, r - strokeW / 2, 0, Math.PI * 2);
  ctx.fill();

  // 4. Render Emoji Glyph in pristine native color
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#000000';
  const emojiFontSize = Math.round(r * 1.25);
  ctx.font = `${emojiFontSize}px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge.emoji, 0, 1 * (visualScale / 3));

  // 5. Gloss Sheen Arc across top of sticker
  ctx.beginPath();
  ctx.arc(0, -r * 0.25, r * 0.65, Math.PI * 1.15, Math.PI * 1.85);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 3.5 * (visualScale / 3);
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.restore();
}

function draw3DSunBadge(ctx: CanvasRenderingContext2D, t: number, visualScale: number = 1) {
  const r = 32 * (visualScale / 3 * 2.8);
  const rays = 8;
  const rayLength = 16 * (visualScale / 3 * 2.8);
  const rayWidth = 14 * (visualScale / 3 * 2.8);

  ctx.save();

  // Drop shadow
  ctx.shadowColor = 'rgba(0,0,0,0.45)';
  ctx.shadowBlur = 14 * (visualScale / 3);
  ctx.shadowOffsetY = 8 * (visualScale / 3);

  // 1. Backing 3D Extrusion in Forest Green / Dark Tone (Matching letters)
  ctx.strokeStyle = '#143627';
  ctx.lineWidth = 14 * (visualScale / 3);
  ctx.lineJoin = 'round';

  // Draw rays path
  ctx.beginPath();
  for (let i = 0; i < rays; i++) {
    const angle = (i * Math.PI * 2) / rays + t * 0.2;
    const rx = Math.cos(angle) * (r + rayLength);
    const ry = Math.sin(angle) * (r + rayLength);
    ctx.lineTo(rx, ry);
    const midAngle = angle + Math.PI / rays;
    const mx = Math.cos(midAngle) * (r + 4);
    const my = Math.sin(midAngle) * (r + 4);
    ctx.lineTo(mx, my);
  }
  ctx.closePath();
  ctx.stroke();

  // 2. Thick Outer Border Lime Green
  ctx.strokeStyle = '#22573F';
  ctx.lineWidth = 8 * (visualScale / 3);
  ctx.stroke();

  // 3. Golden Sun Rays Fill
  const rayGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, r + rayLength);
  rayGrad.addColorStop(0, '#FFF570');
  rayGrad.addColorStop(0.7, '#FFB703');
  rayGrad.addColorStop(1, '#FB8500');
  ctx.fillStyle = rayGrad;
  ctx.fill();

  // 4. Center Glowing Sphere
  ctx.shadowColor = 'transparent';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(-8, -8, 4, 0, 0, r);
  coreGrad.addColorStop(0, '#FFFF99');
  coreGrad.addColorStop(0.5, '#FFD166');
  coreGrad.addColorStop(1, '#F77F00');
  ctx.fillStyle = coreGrad;
  ctx.fill();

  // 5. Golden Bevel Outline around center sphere
  ctx.strokeStyle = '#D48B00';
  ctx.lineWidth = 3 * (visualScale / 3);
  ctx.stroke();

  // 6. Gloss Sheen on top of Sun
  ctx.beginPath();
  ctx.arc(0, -6 * (visualScale / 3), r * 0.75, Math.PI * 1.1, Math.PI * 1.9);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 4 * (visualScale / 3);
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.restore();
}

function drawSparkles(
  ctx: CanvasRenderingContext2D,
  project: TextGraphicProject,
  lineMetrics: RenderedLineData[],
  t: number,
  width: number,
  height: number
) {
  if (lineMetrics.length === 0) return;

  const sparkleSeeds = [
    { xRatio: 0.18, yRatio: 0.28, size: 24, speedMult: 1.2, phase: 0 },
    { xRatio: 0.84, yRatio: 0.22, size: 28, speedMult: 1.0, phase: 1.5 },
    { xRatio: 0.76, yRatio: 0.72, size: 22, speedMult: 1.4, phase: 2.8 },
    { xRatio: 0.22, yRatio: 0.78, size: 20, speedMult: 1.1, phase: 4.0 },
    { xRatio: 0.52, yRatio: 0.15, size: 18, speedMult: 1.3, phase: 5.2 },
  ];

  sparkleSeeds.forEach((s) => {
    const sx = s.xRatio * width;
    const sy = s.yRatio * height;
    const life = (Math.sin(t * s.speedMult + s.phase) + 1) / 2; // 0 to 1
    if (life < 0.15) return;

    const scale = life * (s.size / 20);
    const rot = t * 0.8 + s.phase;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(rot);
    ctx.scale(scale, scale);

    // Glowing 4-point star
    const starGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 18);
    starGrad.addColorStop(0, '#FFFFFF');
    starGrad.addColorStop(0.4, 'rgba(255, 255, 200, 0.9)');
    starGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = starGrad;

    // Draw 4-point diamond star
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.quadraticCurveTo(0, 0, 22, 0);
    ctx.quadraticCurveTo(0, 0, 0, 22);
    ctx.quadraticCurveTo(0, 0, -22, 0);
    ctx.quadraticCurveTo(0, 0, 0, -22);
    ctx.closePath();
    ctx.fill();

    // Center point
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  });
}
