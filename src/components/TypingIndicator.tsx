import StampyAvatar from './StampyAvatar'
import './TypingIndicator.css'

export default function TypingIndicator() {
  return (
    <div className="typing-row">
      <StampyAvatar size={32} />
      <div className="typing-bubble">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  )
}
