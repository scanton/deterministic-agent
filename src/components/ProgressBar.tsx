import type { FlowStep } from '../types'
import { STEP_NUMBERS, TOTAL_STEPS } from '../types'
import './ProgressBar.css'

interface Props {
  step: FlowStep
}

export default function ProgressBar({ step }: Props) {
  const stepNum = STEP_NUMBERS[step]
  if (!stepNum) return null

  const pct = Math.round((stepNum / TOTAL_STEPS) * 100)

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">Step {stepNum} of {TOTAL_STEPS}</span>
    </div>
  )
}
