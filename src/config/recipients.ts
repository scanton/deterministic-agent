import type { TileOption } from '../types'

export const RECIPIENTS: TileOption[] = [
  { value: 'partner_spouse', label: 'Partner / Spouse', gradient: 'linear-gradient(135deg, #be123c, #fda4af)', emoji: '💑' },
  { value: 'mom', label: 'Mom', gradient: 'linear-gradient(135deg, #831843, #f9a8d4)', emoji: '👩' },
  { value: 'dad', label: 'Dad', gradient: 'linear-gradient(135deg, #1c4532, #6ee7b7)', emoji: '👨' },
  { value: 'best_friend', label: 'Best Friend', gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)', emoji: '🫂' },
  { value: 'friend', label: 'Friend', gradient: 'linear-gradient(135deg, #4338ca, #a5b4fc)', emoji: '😊' },
  { value: 'child', label: 'Child', gradient: 'linear-gradient(135deg, #0369a1, #7dd3fc)', emoji: '🧒' },
  { value: 'sibling', label: 'Sibling', gradient: 'linear-gradient(135deg, #0f766e, #5eead4)', emoji: '👫' },
  { value: 'grandparent', label: 'Grandparent', gradient: 'linear-gradient(135deg, #78350f, #fde68a)', emoji: '👴' },
  { value: 'coworker', label: 'Coworker', gradient: 'linear-gradient(135deg, #374151, #9ca3af)', emoji: '💼' },
  { value: 'boss', label: 'Boss', gradient: 'linear-gradient(135deg, #1e3a8a, #60a5fa)', emoji: '🤝' },
  { value: 'mentor', label: 'Mentor', gradient: 'linear-gradient(135deg, #14532d, #86efac)', emoji: '🌟' },
  { value: 'teacher', label: 'Teacher', gradient: 'linear-gradient(135deg, #854d0e, #fde047)', emoji: '📚' },
  { value: 'neighbor', label: 'Neighbor', gradient: 'linear-gradient(135deg, #0c4a6e, #38bdf8)', emoji: '🏡' },
  { value: 'myself', label: 'Myself', gradient: 'linear-gradient(135deg, #701a75, #e879f9)', emoji: '🪞' },
]

export const AGE_RANGES: TileOption[] = [
  { value: 'child', label: 'Child', description: 'Under 12', gradient: 'linear-gradient(135deg, #0369a1, #7dd3fc)', emoji: '🧸' },
  { value: 'teen', label: 'Teen', description: '12–17', gradient: 'linear-gradient(135deg, #4338ca, #a5b4fc)', emoji: '🎮' },
  { value: 'young_adult', label: 'Young Adult', description: '18–29', gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)', emoji: '🎉' },
  { value: 'adult', label: 'Adult', description: '30–64', gradient: 'linear-gradient(135deg, #0f766e, #5eead4)', emoji: '☕' },
  { value: 'senior', label: 'Senior', description: '65+', gradient: 'linear-gradient(135deg, #78350f, #fde68a)', emoji: '🌺' },
]
