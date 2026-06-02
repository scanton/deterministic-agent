import type { TileOption } from '../types'

export interface FormatFamily {
  value: string
  label: string
  descriptor: string
  gradient: string
  emoji: string
  subtypes: TileOption[]
}

// Photo-based primary types that trigger Step 4A (photo upload)
export const PHOTO_BASED_TYPES = new Set([
  'photo_collage',
  'scrapbook_style',
  'memory_board',
  'mood_board',
  'montage',
])

export const FORMAT_FAMILIES: FormatFamily[] = [
  {
    value: 'text_word',
    label: 'Text & Word Cards',
    descriptor: 'When the words are the whole idea',
    gradient: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
    emoji: '✍️',
    subtypes: [
      { value: 'typography_art', label: 'Typography Art', description: 'Bold lettering as design', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', emoji: '𝐀' },
      { value: 'quote_card', label: 'Quote Card', description: 'A single powerful line', gradient: 'linear-gradient(135deg, #1e40af, #60a5fa)', emoji: '💬' },
      { value: 'word_collage', label: 'Word Collage', description: 'Words layered into a shape or scene', gradient: 'linear-gradient(135deg, #1d4ed8, #93c5fd)', emoji: '📝' },
      { value: 'minimalist_text', label: 'Minimalist', description: 'One or two words. Nothing else.', gradient: 'linear-gradient(135deg, #1e3a8a, #bfdbfe)', emoji: '⬜' },
      { value: 'hand_lettered', label: 'Hand-Lettered', description: 'Calligraphy-style script', gradient: 'linear-gradient(135deg, #312e81, #818cf8)', emoji: '🖊️' },
      { value: 'neon_sign', label: 'Neon Sign Style', description: 'Glowing retro neon text', gradient: 'linear-gradient(135deg, #4c1d95, #c084fc)', emoji: '💡' },
    ],
  },
  {
    value: 'art_illustration',
    label: 'Art & Illustration',
    descriptor: 'Built around a single striking image',
    gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
    emoji: '🎨',
    subtypes: [
      { value: 'watercolor', label: 'Watercolor', description: 'Soft, painterly washes of color', gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)', emoji: '🌊' },
      { value: 'digital_illustration', label: 'Digital Illustration', description: 'Clean, polished digital art', gradient: 'linear-gradient(135deg, #6d28d9, #a78bfa)', emoji: '🖥️' },
      { value: 'botanical_floral', label: 'Botanical / Floral', description: 'Lush plants, flowers, leaves', gradient: 'linear-gradient(135deg, #14532d, #86efac)', emoji: '🌿' },
      { value: 'animal_character', label: 'Animal Character', description: 'Illustrated animals as protagonists', gradient: 'linear-gradient(135deg, #78350f, #fbbf24)', emoji: '🦊' },
      { value: 'portrait', label: 'Portrait', description: 'A face or figure as the focus', gradient: 'linear-gradient(135deg, #831843, #f9a8d4)', emoji: '🖼️' },
      { value: 'abstract', label: 'Abstract', description: 'Shape, color, texture — no subject', gradient: 'linear-gradient(135deg, #1e3a8a, #e879f9)', emoji: '🔷' },
      { value: 'vintage_retro', label: 'Vintage / Retro', description: 'Aged, nostalgic illustration style', gradient: 'linear-gradient(135deg, #7f1d1d, #fde68a)', emoji: '📻' },
      { value: 'pop_art', label: 'Pop Art', description: 'Bold outlines, flat color, graphic energy', gradient: 'linear-gradient(135deg, #dc2626, #facc15)', emoji: '💥' },
    ],
  },
  {
    value: 'collage_mixed',
    label: 'Collage & Mixed',
    descriptor: 'Assembled from photos, layers, and fragments',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    emoji: '✂️',
    subtypes: [
      { value: 'photo_collage', label: 'Photo Collage', description: 'Your photos, arranged together', gradient: 'linear-gradient(135deg, #d97706, #fbbf24)', emoji: '📸' },
      { value: 'scrapbook_style', label: 'Scrapbook Style', description: 'Layered with stickers, tape, textures', gradient: 'linear-gradient(135deg, #b45309, #fcd34d)', emoji: '📒' },
      { value: 'memory_board', label: 'Memory Board', description: 'A collection of moments in one frame', gradient: 'linear-gradient(135deg, #92400e, #fde68a)', emoji: '🗓️' },
      { value: 'mood_board', label: 'Mood Board', description: 'Curated images sharing a feeling or aesthetic', gradient: 'linear-gradient(135deg, #78350f, #fef3c7)', emoji: '🎞️' },
      { value: 'montage', label: 'Montage', description: 'Seamlessly blended photo composition', gradient: 'linear-gradient(135deg, #451a03, #fdba74)', emoji: '🖼️' },
      { value: 'cut_paste', label: 'Cut & Paste', description: 'Magazine-style clipped and layered', gradient: 'linear-gradient(135deg, #7c2d12, #fb923c)', emoji: '✂️' },
    ],
  },
  {
    value: 'craft_handmade',
    label: 'Craft & Handmade',
    descriptor: 'The look and feel of something made by hand',
    gradient: 'linear-gradient(135deg, #166534, #86efac)',
    emoji: '🧵',
    subtypes: [
      { value: 'stamped_look', label: 'Stamped Look', description: 'Inky, textured stamp aesthetic', gradient: 'linear-gradient(135deg, #166534, #86efac)', emoji: '🔖' },
      { value: 'embroidery_style', label: 'Embroidery Style', description: 'Thread and stitch patterns on fabric', gradient: 'linear-gradient(135deg, #14532d, #4ade80)', emoji: '🧵' },
      { value: 'paper_cut', label: 'Paper Cut', description: 'Intricate cut-paper silhouettes', gradient: 'linear-gradient(135deg, #064e3b, #6ee7b7)', emoji: '📄' },
      { value: 'painted', label: 'Painted', description: 'Brushstroke texture, hand-applied color', gradient: 'linear-gradient(135deg, #022c22, #a7f3d0)', emoji: '🖌️' },
      { value: 'knit_textile', label: 'Knit / Textile', description: 'Cozy knit or woven patterns', gradient: 'linear-gradient(135deg, #1a3a1a, #bbf7d0)', emoji: '🧶' },
      { value: 'origami', label: 'Origami-Inspired', description: 'Folded paper forms and geometry', gradient: 'linear-gradient(135deg, #0f4c29, #d1fae5)', emoji: '🦢' },
    ],
  },
  {
    value: 'format_cards',
    label: 'Format Cards',
    descriptor: "Cards that look like something you'd instantly recognize",
    gradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
    emoji: '📰',
    subtypes: [
      { value: 'newspaper_front', label: 'Newspaper Front Page', description: 'Breaking news headline about them', gradient: 'linear-gradient(135deg, #0c4a6e, #38bdf8)', emoji: '📰' },
      { value: 'fake_certificate', label: 'Official Certificate', description: 'Fancy certificate for their achievement', gradient: 'linear-gradient(135deg, #1e3a8a, #bfdbfe)', emoji: '📜' },
      { value: 'movie_poster', label: 'Movie Poster', description: 'Theatrical poster starring them', gradient: 'linear-gradient(135deg, #450a0a, #f87171)', emoji: '🎬' },
      { value: 'magazine_cover', label: 'Magazine Cover', description: 'Feature article, headlining them', gradient: 'linear-gradient(135deg, #701a75, #e879f9)', emoji: '📖' },
      { value: 'recipe_card', label: 'Recipe Card', description: 'Ingredients for why they\'re great', gradient: 'linear-gradient(135deg, #78350f, #fde68a)', emoji: '👩‍🍳' },
      { value: 'ticket', label: 'Event Ticket', description: 'Admit one — to celebrate them', gradient: 'linear-gradient(135deg, #064e3b, #6ee7b7)', emoji: '🎟️' },
      { value: 'postcard', label: 'Postcard', description: 'Greetings from wherever they\'ve been', gradient: 'linear-gradient(135deg, #0369a1, #93c5fd)', emoji: '🏝️' },
    ],
  },
  {
    value: 'humor_parody',
    label: 'Humor & Parody',
    descriptor: 'When the joke is built into the format',
    gradient: 'linear-gradient(135deg, #dc2626, #fb7185)',
    emoji: '😂',
    subtypes: [
      { value: 'meme_format', label: 'Meme Format', description: 'The perfect image macro for their occasion', gradient: 'linear-gradient(135deg, #dc2626, #fb7185)', emoji: '😂' },
      { value: 'fake_headline', label: 'Fake Headline', description: 'Breaking news: they\'re amazing', gradient: 'linear-gradient(135deg, #991b1b, #fca5a5)', emoji: '📢' },
      { value: 'parody_ad', label: 'Parody Ad', description: 'Infomercial for their personality', gradient: 'linear-gradient(135deg, #7f1d1d, #fecaca)', emoji: '📺' },
      { value: 'fake_review', label: 'Fake Product Review', description: '5 stars — here\'s why', gradient: 'linear-gradient(135deg, #450a0a, #fda4af)', emoji: '⭐' },
      { value: 'fake_label', label: 'Fake Product Label', description: 'Artisanal small-batch human', gradient: 'linear-gradient(135deg, #881337, #fecdd3)', emoji: '🏷️' },
      { value: 'ransom_note', label: 'Ransom Note Style', description: 'Cut-letter chaos for good reasons', gradient: 'linear-gradient(135deg, #3f3f46, #d4d4d8)', emoji: '✂️' },
    ],
  },
]
