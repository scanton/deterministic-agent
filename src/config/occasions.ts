import type { TileOption } from '../types'

interface OccasionConfig {
  value: string
  label: string
  gradient: string
  emoji: string
  evergreen: boolean
  // months when this is date-relevant (1-indexed)
  peakMonths?: number[]
  badge?: string
}

const ALL_OCCASIONS: OccasionConfig[] = [
  // Date-driven
  {
    value: 'graduation',
    label: 'Graduation',
    gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    emoji: '🎓',
    evergreen: false,
    peakMonths: [5, 6],
    badge: "It's the season!",
  },
  {
    value: "father's day",
    label: "Father's Day",
    gradient: 'linear-gradient(135deg, #1c4532, #34d399)',
    emoji: '👔',
    evergreen: false,
    peakMonths: [6],
    badge: 'June 15',
  },
  {
    value: 'pride / lgbtq+',
    label: 'Pride',
    gradient: 'linear-gradient(135deg, #7c3aed, #f59e0b, #ef4444)',
    emoji: '🌈',
    evergreen: false,
    peakMonths: [6],
    badge: 'June',
  },
  {
    value: 'kwanzaa / juneteenth',
    label: 'Juneteenth',
    gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)',
    emoji: '✊',
    evergreen: false,
    peakMonths: [6],
    badge: 'June 19',
  },
  {
    value: "mother's day",
    label: "Mother's Day",
    gradient: 'linear-gradient(135deg, #831843, #f9a8d4)',
    emoji: '💐',
    evergreen: false,
    peakMonths: [5],
  },
  {
    value: 'valentine\'s day',
    label: "Valentine's Day",
    gradient: 'linear-gradient(135deg, #9f1239, #fb7185)',
    emoji: '💝',
    evergreen: false,
    peakMonths: [2],
  },
  {
    value: 'halloween',
    label: 'Halloween',
    gradient: 'linear-gradient(135deg, #431407, #f97316)',
    emoji: '🎃',
    evergreen: false,
    peakMonths: [10],
  },
  {
    value: 'christmas / winter holiday',
    label: 'Winter Holiday',
    gradient: 'linear-gradient(135deg, #14532d, #86efac)',
    emoji: '⛄',
    evergreen: false,
    peakMonths: [12],
  },
  {
    value: 'thanksgiving',
    label: 'Thanksgiving',
    gradient: 'linear-gradient(135deg, #78350f, #fbbf24)',
    emoji: '🍂',
    evergreen: false,
    peakMonths: [11],
  },
  {
    value: 'new year',
    label: 'New Year',
    gradient: 'linear-gradient(135deg, #1e1b4b, #818cf8)',
    emoji: '🥂',
    evergreen: false,
    peakMonths: [1, 12],
  },
  // Evergreen
  {
    value: 'birthday',
    label: 'Birthday',
    gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
    emoji: '🎂',
    evergreen: true,
  },
  {
    value: 'anniversary',
    label: 'Anniversary',
    gradient: 'linear-gradient(135deg, #be123c, #fda4af)',
    emoji: '💍',
    evergreen: true,
  },
  {
    value: 'sympathy / loss',
    label: 'Sympathy',
    gradient: 'linear-gradient(135deg, #374151, #9ca3af)',
    emoji: '🕊️',
    evergreen: true,
  },
  {
    value: 'thank you',
    label: 'Thank You',
    gradient: 'linear-gradient(135deg, #0c4a6e, #38bdf8)',
    emoji: '🙏',
    evergreen: true,
  },
  {
    value: 'achievement / congratulations',
    label: 'Congratulations',
    gradient: 'linear-gradient(135deg, #854d0e, #fde047)',
    emoji: '🏆',
    evergreen: true,
  },
  {
    value: 'just because / thinking of you',
    label: 'Just Because',
    gradient: 'linear-gradient(135deg, #0f766e, #5eead4)',
    emoji: '💌',
    evergreen: true,
  },
  {
    value: 'get well soon',
    label: 'Get Well Soon',
    gradient: 'linear-gradient(135deg, #064e3b, #6ee7b7)',
    emoji: '🌻',
    evergreen: true,
  },
  {
    value: 'new baby',
    label: 'New Baby',
    gradient: 'linear-gradient(135deg, #1e40af, #93c5fd)',
    emoji: '👶',
    evergreen: true,
  },
  {
    value: 'wedding',
    label: 'Wedding',
    gradient: 'linear-gradient(135deg, #4a1d96, #ddd6fe)',
    emoji: '💒',
    evergreen: true,
  },
  {
    value: 'retirement',
    label: 'Retirement',
    gradient: 'linear-gradient(135deg, #0c4a6e, #7dd3fc)',
    emoji: '⛳',
    evergreen: true,
  },
  {
    value: 'friendship',
    label: 'Friendship',
    gradient: 'linear-gradient(135deg, #701a75, #e879f9)',
    emoji: '🫂',
    evergreen: true,
  },
  {
    value: 'encouragement / support',
    label: 'Encouragement',
    gradient: 'linear-gradient(135deg, #1e3a8a, #60a5fa)',
    emoji: '💪',
    evergreen: true,
  },
]

function getDateDrivenOccasions(currentMonth: number): OccasionConfig[] {
  const lookahead = [currentMonth, currentMonth === 12 ? 1 : currentMonth + 1]
  return ALL_OCCASIONS
    .filter(o => !o.evergreen && o.peakMonths?.some(m => lookahead.includes(m)))
    .slice(0, 4)
}

function getEvergreenOccasions(): OccasionConfig[] {
  return ALL_OCCASIONS.filter(o => o.evergreen)
}

export function getOccasionTiles(): { dateDriven: TileOption[]; evergreen: TileOption[] } {
  const currentMonth = new Date().getMonth() + 1 // today is June 2026 → 6
  const dateDriven = getDateDrivenOccasions(currentMonth).map(o => ({
    value: o.value,
    label: o.label,
    gradient: o.gradient,
    emoji: o.emoji,
    badge: o.badge,
  }))
  const evergreen = getEvergreenOccasions().map(o => ({
    value: o.value,
    label: o.label,
    gradient: o.gradient,
    emoji: o.emoji,
  }))
  return { dateDriven, evergreen }
}
