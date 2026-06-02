import type { HeartData } from '../types'
import './AgentConcepts.css'

interface Props {
  heartData: HeartData
}

interface Concept {
  id: number
  front: string
  inside: string
}

function generateConcepts(d: HeartData): Concept[] {
  const occ = d.occasionLabel ?? 'this occasion'
  const who = d.relationship?.replace(/_/g, ' ') ?? 'them'
  const fmt = d.insideTextFormatLabel ?? 'message'
  const tone = d.toneLabel ?? ''

  // Generate 4 placeholder concepts contextually
  const isFunny = tone.toLowerCase().includes('funny') || tone.toLowerCase().includes('roast') || tone.toLowerCase().includes('humor')
  const isWarm = tone.toLowerCase().includes('warm') || tone.toLowerCase().includes('heartfelt') || tone.toLowerCase().includes('sincere')

  if (isFunny) {
    return [
      {
        id: 1,
        front: `Happy ${occ}!`,
        inside: `Congratulations on being the kind of ${who} who makes ${occ} worth celebrating. That's not nothing. (It's actually quite a lot.) Love you.`,
      },
      {
        id: 2,
        front: `You know what you are?`,
        inside: `Unreasonably lovable. On ${occ} and all the days around it. Please keep it up. Signed, everyone who knows you.`,
      },
      {
        id: 3,
        front: `Warning:`,
        inside: `This card contains strong feelings about how great you are. Side effects include: warmth, mild embarrassment, and wanting to hug the person who sent it. Happy ${occ}.`,
      },
      {
        id: 4,
        front: `Scientists have confirmed:`,
        inside: `You are, by several measurable standards, the best ${who} in the known universe. Happy ${occ}. (No controls were run. We don't need them.)`,
      },
    ]
  }

  if (isWarm) {
    return [
      {
        id: 1,
        front: `Happy ${occ}`,
        inside: `Some people make every room warmer just by walking in. You're that person for everyone who loves you. Thinking of you today and always.`,
      },
      {
        id: 2,
        front: `For you, on ${occ}`,
        inside: `There are people who stay in your life without needing to be asked. You're one of them. Thank you for being there in the ways that matter most.`,
      },
      {
        id: 3,
        front: `To my ${who}`,
        inside: `The things I want to tell you don't always come easily out loud. So here: you matter. You're loved. This ${occ} and every one that follows.`,
      },
      {
        id: 4,
        front: `Happy ${occ}`,
        inside: `A ${fmt} felt right because some things deserve more than a text message. You're one of those things. I hope you know that.`,
      },
    ]
  }

  return [
    {
      id: 1,
      front: `Happy ${occ}`,
      inside: `Wishing you a wonderful ${occ} filled with everything that makes you happy. Thinking of you today.`,
    },
    {
      id: 2,
      front: `To: You`,
      inside: `${occ} is a good excuse to say what's true every day: you're wonderful and you make my world better. Celebrate big.`,
    },
    {
      id: 3,
      front: `A ${fmt} for your ${occ}`,
      inside: `Here's to you — and to all the reasons you deserve to be celebrated today. Happy ${occ}.`,
    },
    {
      id: 4,
      front: `${occ.charAt(0).toUpperCase() + occ.slice(1)}`,
      inside: `This card is for my favorite ${who}. You already know why. Happy ${occ}.`,
    },
  ]
}

export default function AgentConcepts({ heartData }: Props) {
  const concepts = generateConcepts(heartData)

  return (
    <div className="concepts-container">
      <p className="concepts-intro">
        Here are 4 text concepts based on your brief. Pick one to use, or tell me what you'd like to adjust.
      </p>
      {concepts.map(c => (
        <div key={c.id} className="concept-card">
          <div className="concept-number">Concept {c.id}</div>
          <div className="concept-section">
            <span className="concept-panel-label">Front</span>
            <p className="concept-text">{c.front}</p>
          </div>
          <div className="concept-section">
            <span className="concept-panel-label">Inside</span>
            <p className="concept-text">{c.inside}</p>
          </div>
          <button className="concept-select-btn">Use this concept →</button>
        </div>
      ))}
    </div>
  )
}
