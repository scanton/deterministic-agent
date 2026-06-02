import type { TileOption } from '../types'

export const TEXT_FORMATS: TileOption[] = [
  {
    value: 'classic',
    label: 'Classic Message',
    description: 'Warm, flowing prose — timeless',
    gradient: 'linear-gradient(135deg, #1e3a8a, #60a5fa)',
    emoji: '💬',
  },
  {
    value: 'poem',
    label: 'Poem',
    description: 'Rhyming verse with feeling',
    gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
    emoji: '📜',
  },
  {
    value: 'limerick',
    label: 'Limerick',
    description: 'Humorous five-line AABBA',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    emoji: '🎵',
  },
  {
    value: 'haiku',
    label: 'Haiku',
    description: 'Three lines. Spare. Evocative.',
    gradient: 'linear-gradient(135deg, #14532d, #86efac)',
    emoji: '🌸',
  },
  {
    value: 'pun',
    label: 'Pun / Wordplay',
    description: 'Groan-worthy, delightful',
    gradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
    emoji: '😏',
  },
  {
    value: 'one_liner',
    label: 'One-Liner',
    description: 'Short and unforgettable',
    gradient: 'linear-gradient(135deg, #dc2626, #fb7185)',
    emoji: '🎯',
  },
  {
    value: 'quote',
    label: 'Quote',
    description: 'A borrowed line that carries the feeling',
    gradient: 'linear-gradient(135deg, #374151, #9ca3af)',
    emoji: '🗣️',
  },
  {
    value: 'song_lyric',
    label: 'Song Lyric-Style',
    description: 'Rhythmic, verse-chorus feel',
    gradient: 'linear-gradient(135deg, #831843, #f9a8d4)',
    emoji: '🎤',
  },
  {
    value: 'letter',
    label: 'Letter',
    description: 'Long-form, intimate, personal',
    gradient: 'linear-gradient(135deg, #78350f, #fde68a)',
    emoji: '✉️',
  },
  {
    value: 'list',
    label: 'List',
    description: '"10 reasons why you\'re amazing"',
    gradient: 'linear-gradient(135deg, #0c4a6e, #38bdf8)',
    emoji: '📋',
  },
  {
    value: 'joke',
    label: 'Joke with Punchline',
    description: 'Setup. Pause. Punchline.',
    gradient: 'linear-gradient(135deg, #4338ca, #818cf8)',
    emoji: '🥁',
  },
  {
    value: 'acrostic',
    label: 'Acrostic',
    description: 'First letters spell their name',
    gradient: 'linear-gradient(135deg, #701a75, #e879f9)',
    emoji: '🔤',
  },
]

// Formats to suppress by occasion
const SUPPRESSED_BY_OCCASION: Record<string, string[]> = {
  'sympathy / loss': ['limerick', 'pun', 'one_liner', 'joke'],
}

// Formats to surface first by tone
const PROMOTED_BY_TONE: Record<string, string[]> = {
  'warm / heartfelt': ['letter', 'classic', 'poem'],
  'quiet / sincere': ['letter', 'classic', 'quote'],
  'funny': ['limerick', 'one_liner', 'pun', 'joke'],
  'funny + warm': ['limerick', 'pun', 'list'],
  'roast / edgy': ['one_liner', 'joke', 'list'],
  'dark / irreverent': ['one_liner', 'joke', 'haiku'],
}

export function getFormatsForContext(occasion: string | null, tone: string | null): TileOption[] {
  const suppressed = new Set(SUPPRESSED_BY_OCCASION[occasion ?? ''] ?? [])
  const promoted = tone ? (PROMOTED_BY_TONE[tone] ?? []) : []

  const available = TEXT_FORMATS.filter(f => !suppressed.has(f.value))
  if (promoted.length === 0) return available

  const promotedFormats = promoted
    .map(v => available.find(f => f.value === v))
    .filter(Boolean) as TileOption[]
  const rest = available.filter(f => !promoted.includes(f.value))
  return [...promotedFormats, ...rest]
}
