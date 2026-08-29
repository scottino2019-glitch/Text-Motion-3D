import { ColorPalette, TextGraphicProject, BadgeItem } from '../types';

export const AVAILABLE_FONTS = [
  { id: 'Fredoka', name: 'Fredoka Rounded', category: 'Puffy / Arrotondato', weights: '700' },
  { id: 'Baloo 2', name: 'Baloo Candy', category: 'Dolce / Morbido', weights: '800' },
  { id: 'Titan One', name: 'Titan 3D', category: 'Massiccio 3D', weights: '400' },
  { id: 'Luckiest Guy', name: 'Luckiest Cartoon', category: 'Cartoon & Fumetto', weights: '400' },
  { id: 'Bungee', name: 'Bungee Block', category: 'Squadrato Pop', weights: '400' },
  { id: 'Righteous', name: 'Righteous Retro', category: 'Moderno 3D', weights: '400' },
  { id: 'Shrikhand', name: 'Shrikhand Bold', category: 'Vintage / Spesso', weights: '400' },
  { id: 'Pacifico', name: 'Pacifico Corsivo', category: 'Corsivo Elegante', weights: '400' },
  { id: 'Bangers', name: 'Bangers Comic', category: 'Fumetto Dinamico', weights: '400' },
  { id: 'Sniglet', name: 'Sniglet Bubble', category: 'Bolle Paffuto', weights: '800' },
  { id: 'Chewy', name: 'Chewy Gummy', category: 'Gommoso Morbido', weights: '400' },
  { id: 'Grandstander', name: 'Grandstander', category: 'Giocoso', weights: '900' },
  { id: 'Paytone One', name: 'Paytone Bold', category: 'Compatto Spesso', weights: '400' },
  { id: 'Rubik Bubbles', name: 'Rubik Bubbles', category: 'Super Bubble', weights: '400' },
  { id: 'Montserrat', name: 'Montserrat Black', category: 'Pulito & Forte', weights: '900' },
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'buongiorno_sole',
    name: 'Sole & Giardino (Come Foto)',
    nameIt: 'Sole & Giardino',
    gradientTop: '#FFF885',
    gradientBottom: '#FCA311',
    bevelHighlight: '#FFFFFF',
    outlineColor: '#2D6A4F',
    extrusionColor: '#1B4332',
    backingHullColor: '#52B788',
    shadowColor: 'rgba(0, 0, 0, 0.45)',
  },
  {
    id: 'candy_strawberry',
    name: 'Fragola & Vaniglia',
    nameIt: 'Fragola & Vaniglia',
    gradientTop: '#FF99C8',
    gradientBottom: '#FF3366',
    bevelHighlight: '#FFFFFF',
    outlineColor: '#800F2F',
    extrusionColor: '#590D22',
    backingHullColor: '#FFB3C1',
    shadowColor: 'rgba(50, 10, 20, 0.4)',
  },
  {
    id: 'golden_honey',
    name: 'Oro & Miele Reale',
    nameIt: 'Oro & Miele',
    gradientTop: '#FFE494',
    gradientBottom: '#D48B00',
    bevelHighlight: '#FFFFFF',
    outlineColor: '#472200',
    extrusionColor: '#2E1500',
    backingHullColor: '#7A4300',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  {
    id: 'ocean_cyan',
    name: 'Oceano & Menta',
    nameIt: 'Oceano & Menta',
    gradientTop: '#A0F0ED',
    gradientBottom: '#0096C7',
    bevelHighlight: '#FFFFFF',
    outlineColor: '#03045E',
    extrusionColor: '#023E8A',
    backingHullColor: '#48CAE4',
    shadowColor: 'rgba(2, 62, 138, 0.45)',
  },
  {
    id: 'sunset_coral',
    name: 'Tramonto & Viola',
    nameIt: 'Tramonto & Viola',
    gradientTop: '#FFB703',
    gradientBottom: '#D90429',
    bevelHighlight: '#FFF0F5',
    outlineColor: '#3A015C',
    extrusionColor: '#240046',
    backingHullColor: '#7209B7',
    shadowColor: 'rgba(36, 0, 70, 0.5)',
  },
  {
    id: 'neon_lime_violet',
    name: 'Cyber Pop Neon',
    nameIt: 'Cyber Pop',
    gradientTop: '#CCFF00',
    gradientBottom: '#10B981',
    bevelHighlight: '#FFFFFF',
    outlineColor: '#4C1D95',
    extrusionColor: '#2E1065',
    backingHullColor: '#8B5CF6',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  {
    id: 'marshmallow_pastel',
    name: 'Pastello Zucchero Filato',
    nameIt: 'Zucchero Filato',
    gradientTop: '#E0AAFF',
    gradientBottom: '#7B2CBF',
    bevelHighlight: '#FFFFFF',
    outlineColor: '#240046',
    extrusionColor: '#10002B',
    backingHullColor: '#C77DFF',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
  },
  {
    id: 'choco_caramel',
    name: 'Cioccolato & Caramello',
    nameIt: 'Cioccolato & Caramello',
    gradientTop: '#E9C46A',
    gradientBottom: '#E76F51',
    bevelHighlight: '#FFF8E7',
    outlineColor: '#3E1F12',
    extrusionColor: '#26140B',
    backingHullColor: '#8B4513',
    shadowColor: 'rgba(0, 0, 0, 0.55)',
  },
];

export const POPULAR_EMOJIS = [
  '☀️', '🌻', '🌸', '☕', '❤️', '✨', '⭐', '🌈', '🦋', '🍰', '🎂', '🌙', '🎉', '🍀', '🌼', '🐝', '🥐', '🍓', '🥑', '🎁'
];

export function getFormattedCurrentDate(): { dayName: string; dayAndMonth: string; fullDate: string } {
  const now = new Date();
  const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  
  const dayName = dayNames[now.getDay()];
  const dayNum = now.getDate();
  const monthName = monthNames[now.getMonth()];
  const year = now.getFullYear();

  return {
    dayName: `Buon ${dayName}`,
    dayAndMonth: `${dayNum} ${monthName} ${year}`,
    fullDate: `${dayName} ${dayNum} ${monthName} ${year}`
  };
}

export const TEMPLATE_PROJECTS: { id: string; name: string; thumbnailEmoji: string; data: Partial<TextGraphicProject> }[] = [
  {
    id: 'buongiorno_sabato_replica',
    name: 'Buongiorno & Buon Sabato (Esatto della foto)',
    thumbnailEmoji: '☀️',
    data: {
      title: 'Buongiorno Buon Sabato',
      aspectRatio: '16:9',
      palette: COLOR_PALETTES[0],
      style3D: {
        extrusionDepth: 16,
        extrusionAngle: 90,
        bevelWidth: 10,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 16,
        backingPlateColor: '#2D6A4F',
        shadowBlur: 20,
        shadowOpacity: 0.55,
      },
      animation: {
        type: 'bounce',
        speed: 1.2,
        intensity: 1.2,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'nature_olive',
        blur: 2,
        brightness: 95,
      },
      lines: [
        {
          id: 'line-1',
          text: 'BUONGIORNO',
          fontFamily: 'Fredoka',
          fontSize: 44,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
          customColors: {
            gradientTop: '#FFF570',
            gradientBottom: '#FF9E00',
            bevelHighlight: '#FFFFFF',
            outlineColor: '#22573F',
            extrusionColor: '#143627',
          }
        },
        {
          id: 'line-2',
          text: 'Buon Sabato',
          fontFamily: 'Fredoka',
          fontSize: 32,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
          customColors: {
            gradientTop: '#FFE066',
            gradientBottom: '#F77F00',
            bevelHighlight: '#FFFFFF',
            outlineColor: '#22573F',
            extrusionColor: '#143627',
          }
        },
        {
          id: 'line-3',
          text: '29 Agosto 2026',
          fontFamily: 'Fredoka',
          fontSize: 22,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
          customColors: {
            gradientTop: '#FF99C8',
            gradientBottom: '#E63946',
            bevelHighlight: '#FFFFFF',
            outlineColor: '#22573F',
            extrusionColor: '#143627',
          }
        }
      ],
      badges: [
        {
          id: 'b-sun',
          emoji: '☀️',
          name: 'Sole Raggiante',
          xRatio: 0.31,
          yRatio: 0.23,
          scale: 1.35,
          rotation: 12,
          animationDelay: 0.1,
        },
        {
          id: 'b-sparkle1',
          emoji: '✨',
          name: 'Scintilla',
          xRatio: 0.88,
          yRatio: 0.18,
          scale: 0.9,
          rotation: -10,
          animationDelay: 0.3,
        }
      ]
    }
  },
  {
    id: 'buona_domenica',
    name: 'Buona Domenica di Sole',
    thumbnailEmoji: '🌻',
    data: {
      title: 'Buona Domenica',
      aspectRatio: '1:1',
      palette: COLOR_PALETTES[0],
      style3D: {
        extrusionDepth: 14,
        extrusionAngle: 90,
        bevelWidth: 8,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 14,
        backingPlateColor: '#2D6A4F',
        shadowBlur: 18,
        shadowOpacity: 0.5,
      },
      animation: {
        type: 'wave',
        speed: 1.3,
        intensity: 1.1,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'sunny_garden',
        blur: 1,
        brightness: 100,
      },
      lines: [
        {
          id: 'l1',
          text: 'BUONA',
          fontFamily: 'Titan One',
          fontSize: 44,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'DOMENICA',
          fontFamily: 'Titan One',
          fontSize: 44,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: 'Con Tanta Gioia 🌻',
          fontFamily: 'Pacifico',
          fontSize: 28,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-sunflower',
          emoji: '🌻',
          name: 'Girasole',
          xRatio: 0.82,
          yRatio: 0.45,
          scale: 1.2,
          rotation: 15,
          animationDelay: 0.2,
        }
      ]
    }
  },
  {
    id: 'buon_caffe',
    name: 'Pausa Caffè del Buongiorno',
    thumbnailEmoji: '☕',
    data: {
      title: 'Pausa Caffè',
      aspectRatio: '1:1',
      palette: COLOR_PALETTES[7],
      style3D: {
        extrusionDepth: 15,
        extrusionAngle: 95,
        bevelWidth: 9,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 16,
        backingPlateColor: '#3E1F12',
        shadowBlur: 20,
        shadowOpacity: 0.5,
      },
      animation: {
        type: 'float',
        speed: 1.0,
        intensity: 1.0,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'cozy_coffee',
        blur: 3,
        brightness: 90,
      },
      lines: [
        {
          id: 'l1',
          text: 'UN BUON',
          fontFamily: 'Luckiest Guy',
          fontSize: 38,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'CAFFÈ ☕',
          fontFamily: 'Luckiest Guy',
          fontSize: 46,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: 'Per Iniziare alla Grande!',
          fontFamily: 'Fredoka',
          fontSize: 24,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: []
    }
  },
  {
    id: 'buon_compleanno',
    name: 'Buon Compleanno Festoso',
    thumbnailEmoji: '🎂',
    data: {
      title: 'Buon Compleanno',
      aspectRatio: '1:1',
      palette: COLOR_PALETTES[1],
      style3D: {
        extrusionDepth: 18,
        extrusionAngle: 90,
        bevelWidth: 9,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 18,
        backingPlateColor: '#800F2F',
        shadowBlur: 22,
        shadowOpacity: 0.55,
      },
      animation: {
        type: 'pop',
        speed: 1.4,
        intensity: 1.3,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'gradient_pastel',
        blur: 0,
        brightness: 100,
      },
      lines: [
        {
          id: 'l1',
          text: 'TANTI AUGURI',
          fontFamily: 'Titan One',
          fontSize: 38,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'BUON COMPLEANNO',
          fontFamily: 'Titan One',
          fontSize: 32,
          letterSpacing: 1,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: '🎉 Festa & Allegria 🎂',
          fontFamily: 'Fredoka',
          fontSize: 26,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-cake',
          emoji: '🎂',
          name: 'Torta',
          xRatio: 0.15,
          yRatio: 0.25,
          scale: 1.25,
          rotation: -12,
          animationDelay: 0.1,
        },
        {
          id: 'b-party',
          emoji: '🎉',
          name: 'Coriandoli',
          xRatio: 0.85,
          yRatio: 0.25,
          scale: 1.25,
          rotation: 15,
          animationDelay: 0.25,
        }
      ]
    }
  },
  {
    id: 'buonanotte_sogni',
    name: 'Buonanotte & Sogni d\'Oro',
    thumbnailEmoji: '🌙',
    data: {
      title: 'Buonanotte Sogni d\'Oro',
      aspectRatio: '1:1',
      palette: COLOR_PALETTES[4],
      style3D: {
        extrusionDepth: 14,
        extrusionAngle: 90,
        bevelWidth: 8,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 16,
        backingPlateColor: '#240046',
        shadowBlur: 24,
        shadowOpacity: 0.6,
      },
      animation: {
        type: 'shimmer',
        speed: 1.1,
        intensity: 1.0,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'gradient_sunset',
        blur: 0,
        brightness: 90,
      },
      lines: [
        {
          id: 'l1',
          text: 'DOLCE NOTTE',
          fontFamily: 'Pacifico',
          fontSize: 42,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'Sogni d\'Oro ✨',
          fontFamily: 'Fredoka',
          fontSize: 34,
          letterSpacing: 2,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-moon',
          emoji: '🌙',
          name: 'Luna',
          xRatio: 0.85,
          yRatio: 0.22,
          scale: 1.4,
          rotation: 15,
          animationDelay: 0.15,
        }
      ]
    }
  }
];
