import type { TileOption } from '../types'

export const TONES: TileOption[] = [
  {
    value: 'warm / heartfelt',
    label: 'Warm & Heartfelt',
    description: 'Genuine, loving, from the heart',
    gradient: 'linear-gradient(135deg, #be123c, #fda4af)',
    emoji: '❤️',
  },
  {
    value: 'quiet / sincere',
    label: 'Quiet & Sincere',
    description: 'Simple, honest, no fanfare',
    gradient: 'linear-gradient(135deg, #374151, #9ca3af)',
    emoji: '🕊️',
  },
  {
    value: 'funny',
    label: 'Funny & Lighthearted',
    description: 'Pure humor, maximum laughs',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    emoji: '😂',
  },
  {
    value: 'funny + warm',
    label: 'Funny but Sweet',
    description: 'Makes them laugh and feel loved',
    gradient: 'linear-gradient(135deg, #7c3aed, #f59e0b)',
    emoji: '🥰',
  },
  {
    value: 'proud / celebratory',
    label: 'Bold & Celebratory',
    description: 'Big energy, big moment',
    gradient: 'linear-gradient(135deg, #854d0e, #fde047)',
    emoji: '🎉',
  },
  {
    value: 'encouraging',
    label: 'Encouraging',
    description: 'Uplifting, you\'ve got this energy',
    gradient: 'linear-gradient(135deg, #166534, #86efac)',
    emoji: '💪',
  },
  {
    value: 'nostalgic / reflective',
    label: 'Nostalgic',
    description: 'Remembering, looking back warmly',
    gradient: 'linear-gradient(135deg, #78350f, #fcd34d)',
    emoji: '🌅',
  },
  {
    value: 'playful / whimsical',
    label: 'Playful & Whimsical',
    description: 'Silly, light, full of personality',
    gradient: 'linear-gradient(135deg, #4338ca, #f9a8d4)',
    emoji: '🦄',
  },
  {
    value: 'roast / edgy',
    label: 'Cheeky Roast',
    description: 'Playful ribbing, affectionate edge',
    gradient: 'linear-gradient(135deg, #dc2626, #fb923c)',
    emoji: '🔥',
  },
  {
    value: 'dark / irreverent',
    label: 'Dark Humor',
    description: 'Goes there. You\'ve been warned.',
    gradient: 'linear-gradient(135deg, #1c1917, #57534e)',
    emoji: '💀',
  },
]

// Occasions where certain tones should be suppressed or surfaced differently
const SUPPRESSED_TONES: Record<string, string[]> = {
  'sympathy / loss': ['funny', 'roast / edgy', 'dark / irreverent', 'playful / whimsical'],
}

export function getTonesForOccasion(occasion: string | null): TileOption[] {
  if (!occasion) return TONES
  const suppressed = SUPPRESSED_TONES[occasion] ?? []
  return TONES.filter(t => !suppressed.includes(t.value))
}
