import { useEffect, useRef, useState } from 'react'
import { useHeartFlow } from '../hooks/useHeartFlow'
import type { ChatMessage } from '../types'
import StampyAvatar from './StampyAvatar'
import ProgressBar from './ProgressBar'
import TileGrid from './TileGrid'
import TypingIndicator from './TypingIndicator'
import HandoffSummary from './HandoffSummary'
import AgentConcepts from './AgentConcepts'
import './StampyWidget.css'

function MessageBubble({
  msg,
  flow,
  isLatest,
}: {
  msg: ChatMessage
  flow: ReturnType<typeof useHeartFlow>
  isLatest: boolean
}) {
  const [contextText, setContextText] = useState('')
  void contextText

  if (msg.type === 'user') {
    return (
      <div className="msg-row msg-row--user">
        <div className="bubble bubble--user">{msg.text}</div>
      </div>
    )
  }

  // Only the latest stampy message shows interactive elements
  const isActive = isLatest && !flow.isTyping

  return (
    <div className="msg-row msg-row--stampy">
      <StampyAvatar size={32} />
      <div className="bubble-group">
        {msg.text && <div className="bubble bubble--stampy">{msg.text}</div>}

        {/* Entry point buttons */}
        {msg.isEntry && isActive && (
          <div className="entry-buttons">
            <button className="entry-btn entry-btn--primary" onClick={() => flow.handleEntryChoice('create')}>
              <span className="entry-btn-icon">✨</span>
              <div>
                <div className="entry-btn-title">Create from Scratch</div>
                <div className="entry-btn-sub">Build something completely custom</div>
              </div>
            </button>
            <button className="entry-btn" onClick={() => flow.handleEntryChoice('browse')}>
              <span className="entry-btn-icon">🔍</span>
              <div>
                <div className="entry-btn-title">Customize from 10k+ Templates</div>
                <div className="entry-btn-sub">Find a card you love and make it yours</div>
              </div>
            </button>
          </div>
        )}

        {/* Standard tile grids */}
        {msg.tiles && msg.tiles.length > 0 && isActive && !msg.isEntry && (
          <TileGrid
            tiles={msg.tiles}
            columns={msg.tileColumns ?? 3}
            onSelect={tile => {
              switch (flow.step) {
                case 'occasion': flow.handleOccasionSelect(tile); break
                case 'recipient': flow.handleRecipientSelect(tile); break
                case 'format_family': flow.handleFormatFamilySelect(tile); break
                case 'format_subtype': flow.handleFormatSubtypeSelect(tile); break
                case 'art_style': flow.handleArtStyleSelect(tile); break
                case 'tone': flow.handleToneSelect(tile); break
                case 'text_format': flow.handleTextFormatSelect(tile); break
              }
            }}
          />
        )}

        {/* Recipient context step */}
        {msg.ageRangeTiles && isActive && (
          <div className="recipient-context">
            <div className="context-section-label">Age range</div>
            <TileGrid
              tiles={msg.ageRangeTiles}
              columns={3}
              selectedValue={flow.selectedAgeRange}
              onSelect={flow.handleAgeRangeSelect}
            />
            <div className="context-section-label" style={{ marginTop: 10 }}>
              Anything else? <span className="optional-tag">optional</span>
            </div>
            <textarea
              className="context-textarea"
              placeholder={msg.contextPrompt}
              value={flow.recipientContextText}
              onChange={e => flow.setRecipientContextText(e.target.value)}
              rows={2}
            />
            <div className="context-actions">
              {msg.showSkip && (
                <button className="skip-btn" onClick={flow.handleRecipientContextSubmit}>
                  {msg.skipLabel ?? 'Skip'}
                </button>
              )}
              <button className="context-next-btn" onClick={flow.handleRecipientContextSubmit}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Photo upload step */}
        {flow.step === 'photo_upload' && !msg.ageRangeTiles && !msg.tiles && isActive && (
          <div className="photo-upload-area">
            <div className="photo-drop-zone">
              <span className="photo-drop-icon">📸</span>
              <span className="photo-drop-text">Click or drag photos here</span>
              <span className="photo-drop-sub">JPG, PNG, HEIC up to 20MB each</span>
            </div>
            <button className="skip-btn" onClick={flow.handlePhotoSkip} style={{ marginTop: 8 }}>
              No photos — skip this step
            </button>
          </div>
        )}

        {/* Handoff summary */}
        {msg.isHandoff && msg.heartSummary && isActive && (
          <HandoffSummary heartData={msg.heartSummary} onProceed={flow.handleHandoffProceed} />
        )}

        {/* Agent concepts */}
        {flow.step === 'agent' && msg.type === 'stampy' && !msg.isHandoff && !msg.tiles && !msg.isEntry && isActive && (
          <AgentConcepts heartData={flow.heartData} />
        )}
      </div>
    </div>
  )
}

export default function StampyWidget() {
  const flow = useHeartFlow()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [inputVal, setInputVal] = useState('')

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [flow.messages, flow.isTyping])

  const handleSend = () => {
    const trimmed = inputVal.trim()
    if (!trimmed) return
    flow.handleFreeTextInput(trimmed)
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const showInput = flow.step !== 'entry' && flow.step !== 'recipient_context'

  return (
    <div className="widget-frame">
      {/* Header */}
      <div className="widget-header">
        <div className="widget-header-left">
          <StampyAvatar size={26} />
          <span className="widget-title">Stampy</span>
        </div>
        <div className="widget-header-right">
          <button className="header-icon-btn" title="New conversation" onClick={flow.reset}>↺</button>
          <button className="header-icon-btn" title="Expand">⊡</button>
          <button className="header-icon-btn" title="Minimize">−</button>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar step={flow.step} />

      {/* Chat messages */}
      <div className="chat-area">
        {flow.messages.map((msg, i) => {
          // Find index of last stampy message to mark it as the active one
          const lastStampyIdx = flow.messages.reduce(
            (last, m, idx) => (m.type === 'stampy' ? idx : last), -1
          )
          return (
            <MessageBubble
              key={msg.id}
              msg={msg}
              flow={flow}
              isLatest={i === lastStampyIdx}
            />
          )
        })}
        {flow.isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      {showInput && (
        <div className="input-area">
          <div className="input-row">
            <button className="input-icon-btn" title="Add reference images">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </button>
            <input
              className="chat-input"
              placeholder="Write your message..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="input-icon-btn" title="Voice input">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
            <button
              className={`send-btn ${inputVal.trim() ? 'send-btn--active' : ''}`}
              onClick={handleSend}
              disabled={!inputVal.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 12L22 2L12 22L10 14L2 12Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Feedback button */}
      <div className="feedback-strip">
        <button className="feedback-btn">
          <span style={{ opacity: 0.7 }}>☹</span> Give Feedback
        </button>
      </div>
    </div>
  )
}
