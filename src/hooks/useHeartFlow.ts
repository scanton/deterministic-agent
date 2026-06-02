import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatMessage, FlowStep, HeartData, TileOption } from '../types'
import { INITIAL_HEART_DATA } from '../types'
import { getOccasionTiles } from '../config/occasions'
import { AGE_RANGES, RECIPIENTS } from '../config/recipients'
import { FORMAT_FAMILIES, PHOTO_BASED_TYPES } from '../config/cardTypes'
import { getStylesForFamily } from '../config/artStyles'
import { getTonesForOccasion } from '../config/tones'
import { getFormatsForContext } from '../config/textFormats'

let msgCounter = 0
function makeId() {
  return `msg-${++msgCounter}-${Math.random().toString(36).slice(2, 7)}`
}

function buildStampyMessage(
  step: FlowStep,
  heartData: HeartData,
): Omit<ChatMessage, 'id'> {
  const { dateDriven, evergreen } = getOccasionTiles()

  switch (step) {
    case 'entry':
      return {
        type: 'stampy',
        text: "Hi, I'm Stampy! I help you create cards that actually feel personal: real designs, real ink, delivered to your door. Free to start. What would you like to do?",
        isEntry: true,
      }

    case 'occasion': {
      const allTiles = [...dateDriven, ...evergreen]
      return {
        type: 'stampy',
        text: "What's the occasion?",
        tiles: allTiles,
        tileColumns: 3,
        showSkip: false,
      }
    }

    case 'recipient':
      return {
        type: 'stampy',
        text: 'Who is this for?',
        tiles: RECIPIENTS,
        tileColumns: 3,
        showSkip: false,
      }

    case 'recipient_context':
      return {
        type: 'stampy',
        text: `Tell us a little more about them — totally optional.`,
        ageRangeTiles: AGE_RANGES,
        contextPrompt: 'Anything else we should know? (hobbies, personality, inside jokes...)',
        showSkip: true,
        skipLabel: 'Skip this step',
      }

    case 'format_family':
      return {
        type: 'stampy',
        text: 'What kind of card do you want to make?',
        tiles: FORMAT_FAMILIES.map(f => ({
          value: f.value,
          label: f.label,
          description: f.descriptor,
          gradient: f.gradient,
          emoji: f.emoji,
        })),
        tileColumns: 2,
        showSkip: false,
      }

    case 'format_subtype': {
      const family = FORMAT_FAMILIES.find(f => f.value === heartData.formatFamily)
      return {
        type: 'stampy',
        text: `Which type of ${family?.label ?? 'card'}?`,
        tiles: family?.subtypes ?? [],
        tileColumns: 3,
        showSkip: false,
      }
    }

    case 'photo_upload':
      return {
        type: 'stampy',
        text: 'Add the photos you want to include. You can upload one or more.',
        showSkip: true,
        skipLabel: 'No photos — skip',
      }

    case 'art_style': {
      const styles = getStylesForFamily(heartData.formatFamily)
      return {
        type: 'stampy',
        text: 'Pick a style.',
        tiles: styles,
        tileColumns: 3,
        showSkip: false,
      }
    }

    case 'tone': {
      const tones = getTonesForOccasion(heartData.occasion)
      return {
        type: 'stampy',
        text: "What's the vibe?",
        tiles: tones,
        tileColumns: 2,
        showSkip: false,
      }
    }

    case 'text_format': {
      const formats = getFormatsForContext(heartData.occasion, heartData.tone)
      return {
        type: 'stampy',
        text: 'How should the inside of the card read?',
        tiles: formats,
        tileColumns: 3,
        showSkip: false,
      }
    }

    case 'handoff':
      return {
        type: 'stampy',
        text: "Perfect — I have everything I need. Let me put together some text concepts for your card.",
        isHandoff: true,
        heartSummary: heartData,
      }

    case 'agent':
      return {
        type: 'stampy',
        text: "Here are 4 text concepts for your card. Pick one to start, or tell me what you'd like to change.",
      }

    default:
      return { type: 'stampy', text: '' }
  }
}

function getNextStep(current: FlowStep, heartData: HeartData): FlowStep {
  switch (current) {
    case 'entry': return 'occasion'
    case 'occasion': return 'recipient'
    case 'recipient': return 'recipient_context'
    case 'recipient_context': return 'format_family'
    case 'format_family': return 'format_subtype'
    case 'format_subtype':
      return heartData.primaryType && PHOTO_BASED_TYPES.has(heartData.primaryType)
        ? 'photo_upload'
        : 'art_style'
    case 'photo_upload': return 'art_style'
    case 'art_style': return 'tone'
    case 'tone': return 'text_format'
    case 'text_format': return 'handoff'
    case 'handoff': return 'agent'
    default: return 'agent'
  }
}

export function useHeartFlow() {
  const [step, setStep] = useState<FlowStep>('entry')
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: makeId(), ...buildStampyMessage('entry', INITIAL_HEART_DATA) },
  ])
  const [heartData, setHeartData] = useState<HeartData>(INITIAL_HEART_DATA)
  const [isTyping, setIsTyping] = useState(false)
  const [recipientContextText, setRecipientContextText] = useState('')
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null)

  const heartDataRef = useRef(heartData)
  heartDataRef.current = heartData
  const stepRef = useRef(step)
  stepRef.current = step

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: makeId() }])
  }, [])

  const advanceToStep = useCallback((nextStep: FlowStep, updatedData: HeartData) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setStep(nextStep)
      const msg = buildStampyMessage(nextStep, updatedData)
      addMessage(msg)
    }, 1200)
  }, [addMessage])

  const handleTileSelect = useCallback((
    tile: TileOption,
    field: keyof HeartData,
    labelField?: keyof HeartData,
  ) => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      [field]: tile.value,
      ...(labelField ? { [labelField]: tile.label } : {}),
    }
    setHeartData(updatedData)

    addMessage({ type: 'user', text: `${tile.emoji ? tile.emoji + ' ' : ''}${tile.label}` })

    const nextStep = getNextStep(stepRef.current, updatedData)
    advanceToStep(nextStep, updatedData)
  }, [addMessage, advanceToStep])

  const handleEntryChoice = useCallback((choice: 'create' | 'browse') => {
    if (choice === 'browse') {
      addMessage({ type: 'user', text: 'Browse the Library' })
      addMessage({ type: 'stampy', text: "The library experience is coming soon! For now, let me help you create something completely custom." })
      setTimeout(() => {
        advanceToStep('occasion', heartDataRef.current)
      }, 800)
      return
    }
    addMessage({ type: 'user', text: 'Create from Scratch' })
    advanceToStep('occasion', heartDataRef.current)
  }, [addMessage, advanceToStep])

  const handleOccasionSelect = useCallback((tile: TileOption) => {
    handleTileSelect(tile, 'occasion', 'occasionLabel')
  }, [handleTileSelect])

  const handleRecipientSelect = useCallback((tile: TileOption) => {
    handleTileSelect(tile, 'relationship')
  }, [handleTileSelect])

  const handleAgeRangeSelect = useCallback((tile: TileOption) => {
    setSelectedAgeRange(tile.value)
  }, [])

  const handleRecipientContextSubmit = useCallback(() => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      recipientAgeRange: selectedAgeRange,
      recipientContext: recipientContextText.trim() || null,
    }
    setHeartData(updatedData)

    const parts: string[] = []
    if (selectedAgeRange) {
      const label = ['child','teen','young_adult','adult','senior'].includes(selectedAgeRange)
        ? { child: 'Child (under 12)', teen: 'Teen (12–17)', young_adult: 'Young Adult (18–29)', adult: 'Adult (30–64)', senior: 'Senior (65+)' }[selectedAgeRange] ?? selectedAgeRange
        : selectedAgeRange
      parts.push(label)
    }
    if (recipientContextText.trim()) parts.push(`"${recipientContextText.trim()}"`)

    addMessage({ type: 'user', text: parts.length ? parts.join(' · ') : 'Skipped' })
    advanceToStep('format_family', updatedData)
  }, [selectedAgeRange, recipientContextText, addMessage, advanceToStep])

  const handleFormatFamilySelect = useCallback((tile: TileOption) => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      formatFamily: tile.value,
      formatFamilyLabel: tile.label,
    }
    setHeartData(updatedData)
    addMessage({ type: 'user', text: `${tile.emoji ? tile.emoji + ' ' : ''}${tile.label}` })
    advanceToStep('format_subtype', updatedData)
  }, [addMessage, advanceToStep])

  const handleFormatSubtypeSelect = useCallback((tile: TileOption) => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      primaryType: tile.value,
      primaryTypeLabel: tile.label,
    }
    setHeartData(updatedData)
    addMessage({ type: 'user', text: `${tile.emoji ? tile.emoji + ' ' : ''}${tile.label}` })
    const next = getNextStep('format_subtype', updatedData)
    advanceToStep(next, updatedData)
  }, [addMessage, advanceToStep])

  const handleArtStyleSelect = useCallback((tile: TileOption) => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      artStyleId: tile.value,
      artStyleName: tile.label,
    }
    setHeartData(updatedData)
    addMessage({ type: 'user', text: `${tile.emoji ? tile.emoji + ' ' : ''}${tile.label}` })
    advanceToStep('tone', updatedData)
  }, [addMessage, advanceToStep])

  const handleToneSelect = useCallback((tile: TileOption) => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      tone: tile.value,
      toneLabel: tile.label,
    }
    setHeartData(updatedData)
    addMessage({ type: 'user', text: `${tile.emoji ? tile.emoji + ' ' : ''}${tile.label}` })
    advanceToStep('text_format', updatedData)
  }, [addMessage, advanceToStep])

  const handleTextFormatSelect = useCallback((tile: TileOption) => {
    const updatedData: HeartData = {
      ...heartDataRef.current,
      insideTextFormat: tile.value,
      insideTextFormatLabel: tile.label,
    }
    setHeartData(updatedData)
    addMessage({ type: 'user', text: `${tile.emoji ? tile.emoji + ' ' : ''}${tile.label}` })
    advanceToStep('handoff', updatedData)
  }, [addMessage, advanceToStep])

  const handlePhotoSkip = useCallback(() => {
    addMessage({ type: 'user', text: 'No photos — skipping' })
    advanceToStep('art_style', heartDataRef.current)
  }, [addMessage, advanceToStep])

  const handleHandoffProceed = useCallback(() => {
    addMessage({ type: 'user', text: 'See my text concepts →' })
    advanceToStep('agent', heartDataRef.current)
  }, [addMessage, advanceToStep])

  const handleFreeTextInput = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const currentStep = stepRef.current
    const currentData = heartDataRef.current

    const updatedData: HeartData = {
      ...currentData,
      freeTextOverrides: {
        ...currentData.freeTextOverrides,
        [currentStep]: trimmed,
      },
    }
    setHeartData(updatedData)
    addMessage({ type: 'user', text: trimmed })

    const nextStep = getNextStep(currentStep, updatedData)
    advanceToStep(nextStep, updatedData)
  }, [addMessage, advanceToStep])

  const reset = useCallback(() => {
    setStep('entry')
    setMessages([{ id: makeId(), ...buildStampyMessage('entry', INITIAL_HEART_DATA) }])
    setHeartData(INITIAL_HEART_DATA)
    setIsTyping(false)
    setRecipientContextText('')
    setSelectedAgeRange(null)
  }, [])

  return {
    step,
    messages,
    heartData,
    isTyping,
    selectedAgeRange,
    recipientContextText,
    setRecipientContextText,
    handleEntryChoice,
    handleOccasionSelect,
    handleRecipientSelect,
    handleAgeRangeSelect,
    handleRecipientContextSubmit,
    handleFormatFamilySelect,
    handleFormatSubtypeSelect,
    handleArtStyleSelect,
    handleToneSelect,
    handleTextFormatSelect,
    handlePhotoSkip,
    handleHandoffProceed,
    handleFreeTextInput,
    reset,
  }
}
