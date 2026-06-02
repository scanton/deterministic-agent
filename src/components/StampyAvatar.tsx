export default function StampyAvatar({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/stampy-icon.png"
      alt="Stampy"
      width={size}
      height={size}
      style={{ flexShrink: 0, display: 'block' }}
    />
  )
}
