export default function Logo({
  size = 44,
  wordmark = true,
  variant = 'dark',
  subtitle = 'CORE FINANCIERO',
}) {
  const textColor = variant === 'light' ? '#ffffff' : '#e30613'
  const subColor = variant === 'light' ? 'rgba(255,255,255,.86)' : '#4b5563'
  const nameSize = Math.round(size * 0.48)
  const subSize = Math.max(9, Math.round(size * 0.22))

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Caja Maynas"
        role="img"
      >
        <rect x="4" y="4" width="40" height="40" rx="10" fill="#e30613" />
        <circle cx="24" cy="14" r="3.8" fill="#fff" />
        <rect x="12" y="22" width="24" height="14" rx="3" fill="#fff" />
        <rect x="18" y="27" width="12" height="4" rx="1" fill="#e30613" />
        <rect x="10" y="39" width="28" height="2.2" rx="1" fill="#fff" />
      </svg>

      {wordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.04 }}>
          <span style={{ fontWeight: 900, fontSize: nameSize, color: textColor }}>
            Caja Maynas
          </span>
          {subtitle && (
            <span style={{ fontSize: subSize, fontWeight: 800, color: subColor, letterSpacing: '1.2px' }}>
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
