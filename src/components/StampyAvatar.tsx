export default function StampyAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#c0392b" />
        </radialGradient>
      </defs>
      {/* Heart shape */}
      <path
        d="M24 40 C24 40 6 28 6 17 C6 11.5 10.5 7 16 7 C19.5 7 22.5 8.8 24 11.5 C25.5 8.8 28.5 7 32 7 C37.5 7 42 11.5 42 17 C42 28 24 40 24 40Z"
        fill="url(#heartGrad)"
      />
      {/* Left horn */}
      <path d="M13 7 L10 2 L16 5 Z" fill="#c0392b" />
      {/* Right horn */}
      <path d="M35 7 L38 2 L32 5 Z" fill="#c0392b" />
      {/* Eyes */}
      <ellipse cx="19" cy="20" rx="2.5" ry="3" fill="white" />
      <ellipse cx="29" cy="20" rx="2.5" ry="3" fill="white" />
      <circle cx="19.5" cy="20.5" r="1.2" fill="#1a1a1a" />
      <circle cx="29.5" cy="20.5" r="1.2" fill="#1a1a1a" />
      {/* Smile */}
      <path d="M18 27 Q24 32 30 27" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <ellipse cx="15" cy="26" rx="3" ry="2" fill="#ff9999" opacity="0.6" />
      <ellipse cx="33" cy="26" rx="3" ry="2" fill="#ff9999" opacity="0.6" />
    </svg>
  )
}
