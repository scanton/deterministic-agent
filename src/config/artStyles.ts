import type { TileOption } from '../types'

interface ArtStyle extends TileOption {
  associatedFamilies: string[]
}

const ALL_STYLES: ArtStyle[] = [
  {
    value: 'watercolor_wash',
    label: 'Watercolor Wash',
    description: 'Soft bleeding color, translucent layers',
    gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    emoji: '🎨',
    associatedFamilies: ['art_illustration', 'craft_handmade', 'text_word'],
  },
  {
    value: 'bold_flat',
    label: 'Bold Flat',
    description: 'Graphic shapes, solid color fills',
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    emoji: '🔶',
    associatedFamilies: ['art_illustration', 'humor_parody', 'format_cards', 'text_word'],
  },
  {
    value: 'vintage_halftone',
    label: 'Vintage Halftone',
    description: 'Retro print dots and aged texture',
    gradient: 'linear-gradient(135deg, #c8a96e, #f5e6c8)',
    emoji: '📻',
    associatedFamilies: ['format_cards', 'humor_parody', 'art_illustration', 'text_word'],
  },
  {
    value: 'pencil_sketch',
    label: 'Pencil Sketch',
    description: 'Hand-drawn linework on paper',
    gradient: 'linear-gradient(135deg, #d3d3d3, #f5f5f5)',
    emoji: '✏️',
    associatedFamilies: ['art_illustration', 'craft_handmade', 'text_word'],
  },
  {
    value: 'digital_painterly',
    label: 'Digital Painterly',
    description: 'Rich brush textures rendered digitally',
    gradient: 'linear-gradient(135deg, #4776e6, #8e54e9)',
    emoji: '🖌️',
    associatedFamilies: ['art_illustration', 'format_cards'],
  },
  {
    value: 'risograph',
    label: 'Risograph Print',
    description: 'Overlapping ink layers, paper texture',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    emoji: '🖨️',
    associatedFamilies: ['art_illustration', 'craft_handmade', 'text_word'],
  },
  {
    value: 'neon_glow',
    label: 'Neon Glow',
    description: 'Electric colors on dark backgrounds',
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    emoji: '💡',
    associatedFamilies: ['text_word', 'art_illustration', 'humor_parody'],
  },
  {
    value: 'pastel_dreamy',
    label: 'Pastel / Dreamy',
    description: 'Soft muted tones, hazy and gentle',
    gradient: 'linear-gradient(135deg, #fddb92, #d1fdff)',
    emoji: '☁️',
    associatedFamilies: ['art_illustration', 'craft_handmade', 'text_word'],
  },
  {
    value: 'paper_cutout',
    label: 'Paper Cutout',
    description: 'Layered cut-paper shapes and shadows',
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
    emoji: '✂️',
    associatedFamilies: ['craft_handmade', 'art_illustration', 'collage_mixed'],
  },
  {
    value: 'photorealistic',
    label: 'Photorealistic',
    description: 'Photography-quality rendering',
    gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
    emoji: '📸',
    associatedFamilies: ['collage_mixed', 'format_cards'],
  },
  {
    value: 'comic_book',
    label: 'Comic Book',
    description: 'Ink outlines, speech bubbles, action',
    gradient: 'linear-gradient(135deg, #ff4b2b, #ff416c)',
    emoji: '💥',
    associatedFamilies: ['humor_parody', 'art_illustration', 'format_cards'],
  },
  {
    value: 'minimalist_line',
    label: 'Minimalist Line Art',
    description: 'Thin single-line drawings, white space',
    gradient: 'linear-gradient(135deg, #e8e8e8, #f8f8f8)',
    emoji: '〰️',
    associatedFamilies: ['text_word', 'art_illustration', 'craft_handmade'],
  },
]

export function getStylesForFamily(formatFamily: string | null): TileOption[] {
  if (!formatFamily) return ALL_STYLES
  const filtered = ALL_STYLES.filter(s => s.associatedFamilies.includes(formatFamily))
  return filtered.length >= 4 ? filtered : ALL_STYLES
}
