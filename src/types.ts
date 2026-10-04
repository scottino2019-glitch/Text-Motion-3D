export type AnimationType = 
  | 'bounce' 
  | 'wave' 
  | 'float' 
  | 'pulse' 
  | 'shimmer' 
  | 'wobble' 
  | 'pop' 
  | 'rainbow';

export interface TextLine {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  isUppercase: boolean;
  colorPresetId?: string;
  customColors?: {
    gradientTop: string;
    gradientBottom: string;
    bevelHighlight: string;
    outlineColor: string;
    extrusionColor: string;
  };
  offsetY: number;
  badgeEmoji?: string;
  badgePosition?: 'left' | 'right' | 'replace-o';
}

export interface ColorPalette {
  id: string;
  name: string;
  nameIt: string;
  gradientTop: string;
  gradientBottom: string;
  bevelHighlight: string;
  outlineColor: string;
  extrusionColor: string;
  backingHullColor: string;
  shadowColor: string;
}

export interface BadgeItem {
  id: string;
  emoji: string;
  name: string;
  xRatio: number; // 0 to 1 relative to text box
  yRatio: number;
  scale: number;
  rotation: number;
  animationDelay: number;
}

export interface AnimationConfig {
  type: AnimationType;
  speed: number; // 0.5 to 2.5
  intensity: number; // 0 to 2
  durationSeconds: number; // for looping export (e.g. 2s, 3s, 4s)
  fps: number; // 24, 30, 60
  sparklesEnabled: boolean;
}

export interface BackgroundConfig {
  type: 'transparent' | 'nature_olive' | 'sunny_garden' | 'cozy_coffee' | 'gradient_sunset' | 'gradient_pastel' | 'solid' | 'custom_image';
  solidColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  customImageDataUrl?: string;
  blur: number;
  brightness: number;
}

export interface Style3DConfig {
  extrusionDepth: number; // 0 to 40
  extrusionAngle: number; // degrees (e.g. 90 = downwards, 110 = down-right)
  bevelWidth: number; // outline thickness
  showGloss: boolean;
  showBackingPlate: boolean;
  backingPlatePadding: number;
  backingPlateColor: string;
  shadowBlur: number;
  shadowOpacity: number;
}

export interface TextGraphicProject {
  id: string;
  title: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | 'auto';
  lines: TextLine[];
  palette: ColorPalette;
  style3D: Style3DConfig;
  animation: AnimationConfig;
  background: BackgroundConfig;
  badges: BadgeItem[];
}

export interface TemplateProject {
  id: string;
  name: string;
  category: 'buongiorno' | 'caffe' | 'feste' | 'notte' | 'affetto';
  thumbnailEmoji: string;
  description: string;
  data: Partial<TextGraphicProject>;
}

export interface ExportSettings {
  format: 'gif' | 'video' | 'png';
  width: number;
  height: number;
  fps: number;
  duration: number;
  transparentBackground: boolean;
}
