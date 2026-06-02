import type { HeartData } from '../types'
import './HandoffSummary.css'

interface Props {
  heartData: HeartData
  onProceed: () => void
}

function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
    </div>
  )
}

export default function HandoffSummary({ heartData, onProceed }: Props) {
  return (
    <div className="handoff-summary">
      <div className="summary-header">Your Card Brief</div>
      <div className="summary-rows">
        <Row label="Occasion" value={heartData.occasionLabel} />
        <Row label="For" value={heartData.relationship?.replace(/_/g, ' ') ?? null} />
        {heartData.recipientAgeRange && (
          <Row label="Age range" value={{
            child: 'Child (under 12)',
            teen: 'Teen (12–17)',
            young_adult: 'Young Adult (18–29)',
            adult: 'Adult (30–64)',
            senior: 'Senior (65+)',
          }[heartData.recipientAgeRange] ?? heartData.recipientAgeRange} />
        )}
        {heartData.recipientContext && (
          <Row label="About them" value={`"${heartData.recipientContext}"`} />
        )}
        <Row label="Card style" value={heartData.formatFamilyLabel} />
        <Row label="Card type" value={heartData.primaryTypeLabel} />
        <Row label="Art style" value={heartData.artStyleName} />
        <Row label="Vibe" value={heartData.toneLabel} />
        <Row label="Inside format" value={heartData.insideTextFormatLabel} />
        {Object.entries(heartData.freeTextOverrides).length > 0 && (
          <Row label="Your words" value={Object.values(heartData.freeTextOverrides).join('; ')} />
        )}
      </div>
      <button className="proceed-btn" onClick={onProceed}>
        See my text concepts →
      </button>
    </div>
  )
}
