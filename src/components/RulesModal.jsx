const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
            background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary)', fontSize: '22px', flexShrink: 0,
          }}>
            📜
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px' }}>How to Play</h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--gray-500)' }}>GreenPulse Rules & Guidelines</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            {
              icon: '📸',
              title: 'Upload Original Photos',
              desc: 'Take fresh photos of your sorted waste. Each image must be unique.',
              color: 'var(--primary)',
              bg: 'var(--primary-50)',
            },
            {
              icon: '⚠️',
              title: 'Warning System',
              desc: 'Uploading duplicate/old images triggers warnings: 3 duplicates = 1st warning, 4 duplicates = last warning.',
              color: 'var(--warning)',
              bg: 'var(--warning-bg)',
            },
            {
              icon: '🚨',
              title: 'Account Flagging',
              desc: '5 or more duplicate uploads flags your account. Flagged users earn only 40% of the actual eco-points.',
              color: 'var(--danger)',
              bg: 'var(--danger-bg)',
            },
            {
              icon: '🏆',
              title: 'Earn Eco-Points',
              desc: 'Upload well-segregated waste to earn GP. Better classification = higher score = more points.',
              color: 'var(--accent)',
              bg: 'var(--accent-50)',
            },
            {
              icon: '📈',
              title: 'Level Up',
              desc: 'Accumulate GP to progress through 6 levels: Seedling, Sprout, Green Worker, Eco Warrior, Earth Guardian, Planet Savior.',
              color: 'var(--purple)',
              bg: 'var(--purple-bg)',
            },
            {
              icon: '🎟️',
              title: 'Redeem Rewards',
              desc: 'Use your eco-points to redeem discount coupons and rewards from partner brands.',
              color: 'var(--primary)',
              bg: 'var(--primary-50)',
            },
          ].map((rule) => (
            <div key={rule.title} style={{
              display: 'flex', gap: '14px', padding: '14px 16px',
              background: 'var(--gray-50)', borderRadius: 'var(--radius)',
              border: '1px solid var(--gray-100)',
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                background: rule.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', flexShrink: 0,
              }}>
                {rule.icon}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gray-800)', marginBottom: '2px' }}>
                  {rule.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray-500)', lineHeight: '1.5' }}>
                  {rule.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn btn-primary btn-block" style={{ marginTop: '24px' }}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default RulesModal;
