const GreenPulseLogo = ({ size = 28, showText = true, className = '' }) => {
  const textSize = showText ? (size < 24 ? '14px' : size < 32 ? '16px' : '18px') : 0;

  return (
    <div className={className} style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: showText ? '10px' : 0,
    }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="gp-bg" x1="0" y1="0" x2="128" y2="128">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="gp-helmet" x1="32" y1="10" x2="96" y2="110">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gp-leaf" x1="44" y1="0" x2="84" y2="20">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="128" height="128" rx="24" fill="url(#gp-bg)" />

        {/* Helmet body - bold angular shield */}
        <path
          d="M64 16 L94 34 L94 68 L82 90 L64 104 L46 90 L34 68 L34 34 Z"
          fill="url(#gp-helmet)"
        />

        {/* Helmet inner shadow / depth */}
        <path
          d="M64 16 L94 34 L94 68 L82 90 L64 104 L46 90 L34 68 L34 34 Z"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />

        {/* Cheek guards - angular cuts */}
        <path d="M34 58 L46 50 L46 72 Z" fill="rgba(4,120,87,0.25)" />
        <path d="M94 58 L82 50 L82 72 Z" fill="rgba(4,120,87,0.25)" />

        {/* Eye slits - bold geometric */}
        <rect x="49" y="48" width="7" height="22" rx="2" fill="white" opacity="0.95" />
        <rect x="72" y="48" width="7" height="22" rx="2" fill="white" opacity="0.95" />

        {/* Nose guard */}
        <rect x="61" y="46" width="6" height="28" rx="3" fill="white" opacity="0.75" />

        {/* Mouth guard bar */}
        <rect x="49" y="80" width="30" height="3" rx="1.5" fill="white" opacity="0.4" />

        {/* Leaf crest - dual leaf emerging from helmet top */}
        <path
          d="M64 16 Q84 2, 94 16 Q82 8, 64 16"
          fill="url(#gp-leaf)"
        />
        <path
          d="M64 16 Q44 2, 34 16 Q46 8, 64 16"
          fill="url(#gp-leaf)"
          opacity="0.85"
        />

        {/* Central leaf vein / spine */}
        <line x1="64" y1="16" x2="64" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Subtle tech accent lines */}
        <line x1="34" y1="42" x2="46" y2="42" stroke="white" strokeWidth="0.8" opacity="0.25" />
        <line x1="82" y1="42" x2="94" y2="42" stroke="white" strokeWidth="0.8" opacity="0.25" />
        <line x1="38" y1="76" x2="46" y2="82" stroke="white" strokeWidth="0.6" opacity="0.2" />
        <line x1="90" y1="76" x2="82" y2="82" stroke="white" strokeWidth="0.6" opacity="0.2" />

        {/* Bottom accent dots */}
        <circle cx="54" cy="96" r="1" fill="white" opacity="0.3" />
        <circle cx="64" cy="98" r="1" fill="white" opacity="0.4" />
        <circle cx="74" cy="96" r="1" fill="white" opacity="0.3" />
      </svg>

      {showText && (
        <span style={{
          fontSize: textSize,
          fontWeight: 700,
          letterSpacing: '-0.3px',
          background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}>
          GreenPulse
        </span>
      )}
    </div>
  );
};

export default GreenPulseLogo;
