import { ColorPalette, TextGraphicProject, BadgeItem, TemplateProject } from '../types';

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

export const TEMPLATE_PROJECTS: TemplateProject[] = [
  {
    id: 'buongiorno_sabato_replica',
    name: 'Buongiorno & Buon Sabato',
    category: 'buongiorno',
    thumbnailEmoji: '☀️',
    description: 'Stile originale esatto della foto: giallo caldo, verde ulivo e sole 3D raggiante',
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
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.35,
          rotation: 12,
          animationDelay: 0.1,
        },
        {
          id: 'b-sparkle1',
          emoji: '✨',
          name: 'Scintilla',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.0,
          rotation: -10,
          animationDelay: 0.3,
        }
      ]
    }
  },
  {
    id: 'buona_domenica',
    name: 'Buona Domenica di Sole',
    category: 'buongiorno',
    thumbnailEmoji: '🌻',
    description: 'Font massiccio cartoon con girasole 3D e ondeggiamento festoso',
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
          text: 'Con Tanta Gioia & Relax',
          fontFamily: 'Fredoka',
          fontSize: 26,
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
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.3,
          rotation: 15,
          animationDelay: 0.2,
        },
        {
          id: 'b-sun',
          emoji: '☀️',
          name: 'Sole',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.2,
          rotation: -10,
          animationDelay: 0.4,
        }
      ]
    }
  },
  {
    id: 'buon_lunedi',
    name: 'Buon Lunedì & Nuova Settimana',
    category: 'buongiorno',
    thumbnailEmoji: '🚀',
    description: 'Energia ed entusiasmo per ripartire alla grande con pop 3D e scintille',
    data: {
      title: 'Buon Lunedì',
      aspectRatio: '16:9',
      palette: COLOR_PALETTES[5], // neon lime violet
      style3D: {
        extrusionDepth: 16,
        extrusionAngle: 90,
        bevelWidth: 9,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 16,
        backingPlateColor: '#4C1D95',
        shadowBlur: 20,
        shadowOpacity: 0.55,
      },
      animation: {
        type: 'pop',
        speed: 1.3,
        intensity: 1.2,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'gradient_sunset',
        blur: 0,
        brightness: 95,
      },
      lines: [
        {
          id: 'l1',
          text: 'BUON LUNEDÌ',
          fontFamily: 'Bungee',
          fontSize: 40,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'Buon Inizio Settimana',
          fontFamily: 'Fredoka',
          fontSize: 30,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: 'Carica & Sorrisi per Oggi!',
          fontFamily: 'Fredoka',
          fontSize: 22,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-rocket',
          emoji: '🚀',
          name: 'Razzo',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.3,
          rotation: 15,
          animationDelay: 0.1,
        },
        {
          id: 'b-fire',
          emoji: '🔥',
          name: 'Fuoco',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.2,
          rotation: -12,
          animationDelay: 0.3,
        }
      ]
    }
  },
  {
    id: 'buon_caffe',
    name: 'Pausa Caffè del Buongiorno',
    category: 'caffe',
    thumbnailEmoji: '☕',
    description: 'Atmosfera calda e accogliente con toni cioccolato, caramello e tazzina fumante',
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
          text: 'CAFFÈ',
          fontFamily: 'Luckiest Guy',
          fontSize: 48,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: 'Per iniziare alla grande!',
          fontFamily: 'Fredoka',
          fontSize: 24,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-coffee',
          emoji: '☕',
          name: 'Caffè',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.4,
          rotation: 10,
          animationDelay: 0.2,
        },
        {
          id: 'b-croissant',
          emoji: '🥐',
          name: 'Cornetto',
          xRatio: 0.15,
          yRatio: 0.80,
          scale: 1.3,
          rotation: -15,
          animationDelay: 0.4,
        }
      ]
    }
  },
  {
    id: 'buon_pomeriggio',
    name: 'Buon Pomeriggio Dolce',
    category: 'caffe',
    thumbnailEmoji: '🍰',
    description: 'Pasticceria cartoon golosa, torta alla crema e fragole zuccherine',
    data: {
      title: 'Buon Pomeriggio',
      aspectRatio: '1:1',
      palette: COLOR_PALETTES[1], // strawberry
      style3D: {
        extrusionDepth: 14,
        extrusionAngle: 90,
        bevelWidth: 8,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 15,
        backingPlateColor: '#800F2F',
        shadowBlur: 18,
        shadowOpacity: 0.5,
      },
      animation: {
        type: 'bounce',
        speed: 1.1,
        intensity: 1.1,
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
          text: 'BUON',
          fontFamily: 'Baloo 2',
          fontSize: 42,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'POMERIGGIO',
          fontFamily: 'Baloo 2',
          fontSize: 42,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: 'Una dolce pausa per te',
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
          emoji: '🍰',
          name: 'Torta',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.35,
          rotation: 12,
          animationDelay: 0.1,
        },
        {
          id: 'b-strawberry',
          emoji: '🍓',
          name: 'Fragola',
          xRatio: 0.15,
          yRatio: 0.80,
          scale: 1.25,
          rotation: -10,
          animationDelay: 0.3,
        }
      ]
    }
  },
  {
    id: 'buon_compleanno',
    name: 'Buon Compleanno Festoso',
    category: 'feste',
    thumbnailEmoji: '🎂',
    description: 'Torta con candeline, coriandoli e scritte 3D elastiche piene di allegria',
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
          text: 'Festa, Gioia & Sorrisi!',
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
          yRatio: 0.20,
          scale: 1.3,
          rotation: -12,
          animationDelay: 0.1,
        },
        {
          id: 'b-party',
          emoji: '🎉',
          name: 'Coriandoli',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.3,
          rotation: 15,
          animationDelay: 0.25,
        }
      ]
    }
  },
  {
    id: 'tanti_auguri',
    name: 'Tanti Auguri & Festa Rainbow',
    category: 'feste',
    thumbnailEmoji: '🎉',
    description: 'Effetto arcobaleno dinamico, coriandoli e palloncini per celebrazioni speciali',
    data: {
      title: 'Tanti Auguri Rainbow',
      aspectRatio: '16:9',
      palette: COLOR_PALETTES[4], // sunset coral
      style3D: {
        extrusionDepth: 16,
        extrusionAngle: 90,
        bevelWidth: 9,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 16,
        backingPlateColor: '#3A015C',
        shadowBlur: 20,
        shadowOpacity: 0.5,
      },
      animation: {
        type: 'rainbow',
        speed: 1.2,
        intensity: 1.2,
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
          text: 'AUGURISSIMI',
          fontFamily: 'Luckiest Guy',
          fontSize: 46,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'Che sia un Giorno Speciale!',
          fontFamily: 'Fredoka',
          fontSize: 28,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-party',
          emoji: '🎉',
          name: 'Festa',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.35,
          rotation: 12,
          animationDelay: 0.1,
        },
        {
          id: 'b-rainbow',
          emoji: '🌈',
          name: 'Arcobaleno',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.3,
          rotation: -10,
          animationDelay: 0.3,
        }
      ]
    }
  },
  {
    id: 'buonanotte_sogni',
    name: 'Buonanotte & Sogni d\'Oro',
    category: 'notte',
    thumbnailEmoji: '🌙',
    description: 'Tramonto serale viola e arancio con luna 3D e luccichii magici',
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
          text: 'Sogni d\'Oro',
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
          yRatio: 0.20,
          scale: 1.4,
          rotation: 15,
          animationDelay: 0.15,
        },
        {
          id: 'b-star',
          emoji: '⭐',
          name: 'Stella',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.2,
          rotation: -12,
          animationDelay: 0.35,
        }
      ]
    }
  },
  {
    id: 'dolce_notte',
    name: 'Dolce Notte a Domani',
    category: 'notte',
    thumbnailEmoji: '⭐',
    description: 'Stelle dorate, blu notte profondo e galleggiamento rilassante',
    data: {
      title: 'Dolce Notte a Domani',
      aspectRatio: '16:9',
      palette: COLOR_PALETTES[3], // ocean cyan
      style3D: {
        extrusionDepth: 14,
        extrusionAngle: 90,
        bevelWidth: 8,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 14,
        backingPlateColor: '#03045E',
        shadowBlur: 20,
        shadowOpacity: 0.55,
      },
      animation: {
        type: 'float',
        speed: 0.9,
        intensity: 0.9,
        durationSeconds: 3,
        fps: 30,
        sparklesEnabled: true,
      },
      background: {
        type: 'solid',
        solidColor: '#0B0F19',
        blur: 0,
        brightness: 100,
      },
      lines: [
        {
          id: 'l1',
          text: 'BUONA NOTTE',
          fontFamily: 'Fredoka',
          fontSize: 42,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'Ci vediamo domani!',
          fontFamily: 'Pacifico',
          fontSize: 28,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-star',
          emoji: '⭐',
          name: 'Stella',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.35,
          rotation: 12,
          animationDelay: 0.2,
        },
        {
          id: 'b-moon',
          emoji: '🌙',
          name: 'Luna',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.3,
          rotation: -10,
          animationDelay: 0.4,
        }
      ]
    }
  },
  {
    id: 'ti_voglio_bene',
    name: 'Ti Voglio Bene / Dolce Amore',
    category: 'affetto',
    thumbnailEmoji: '❤️',
    description: 'Cuori pulsanti 3D, sfumatura rosso fragola e testo romantico',
    data: {
      title: 'Ti Voglio Bene',
      aspectRatio: '1:1',
      palette: COLOR_PALETTES[1],
      style3D: {
        extrusionDepth: 16,
        extrusionAngle: 90,
        bevelWidth: 9,
        showGloss: true,
        showBackingPlate: true,
        backingPlatePadding: 16,
        backingPlateColor: '#800F2F',
        shadowBlur: 20,
        shadowOpacity: 0.5,
      },
      animation: {
        type: 'pulse',
        speed: 1.2,
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
          text: 'TI VOGLIO',
          fontFamily: 'Titan One',
          fontSize: 42,
          letterSpacing: 2,
          isUppercase: true,
          offsetY: 0,
        },
        {
          id: 'l2',
          text: 'Tanto Bene',
          fontFamily: 'Pacifico',
          fontSize: 36,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        },
        {
          id: 'l3',
          text: 'Sei una persona speciale',
          fontFamily: 'Fredoka',
          fontSize: 24,
          letterSpacing: 1,
          isUppercase: false,
          offsetY: 0,
        }
      ],
      badges: [
        {
          id: 'b-heart',
          emoji: '❤️',
          name: 'Cuore',
          xRatio: 0.85,
          yRatio: 0.20,
          scale: 1.4,
          rotation: 12,
          animationDelay: 0.1,
        },
        {
          id: 'b-sparkle',
          emoji: '✨',
          name: 'Scintilla',
          xRatio: 0.15,
          yRatio: 0.20,
          scale: 1.2,
          rotation: -10,
          animationDelay: 0.3,
        }
      ]
    }
  }
];
