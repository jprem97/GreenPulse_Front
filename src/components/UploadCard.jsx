const classificationConfig = {
  GOOD: { badge: 'badge-good', label: 'Good Segregation', icon: '✅', color: 'var(--primary)' },
  MEDIUM: { badge: 'badge-medium', label: 'Medium Quality', icon: '⚠️', color: 'var(--warning)' },
  BAD: { badge: 'badge-bad', label: 'Poor Segregation', icon: '❌', color: 'var(--danger)' },
  INVALID: { badge: 'badge-invalid', label: 'Invalid Image', icon: '🚫', color: 'var(--gray-400)' },
};

const UploadCard = ({ result }) => {
  if (!result) return null;

  const config = classificationConfig[result.classification] || classificationConfig.INVALID;

  return (
    <div className="result-card">
      <div className="result-header">
        <span style={{ fontSize: '24px' }}>{config.icon}</span>
        <div>
          <span className={`badge ${config.badge}`}>{config.label}</span>
        </div>
      </div>

      <div className="result-body">
        <div className="result-stats">
          <div className="result-stat">
            <div className="result-stat-value" style={{ color: config.color }}>
              {result.score || 0}
            </div>
            <div className="result-stat-label">Score / 100</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-value" style={{ color: 'var(--primary)' }}>
              +{result.ecoPointsAwarded || 0}
            </div>
            <div className="result-stat-label">Eco Points Earned</div>
          </div>
          <div className="result-stat">
            <div className="result-stat-value">
              {result.detectedObjects?.length || 0}
            </div>
            <div className="result-stat-label">Objects Detected</div>
          </div>
        </div>

        {result.imageUrl && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-700)' }}>
              Analyzed Image
            </h4>
            <img
              src={result.imageUrl}
              alt="Analyzed waste"
              style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        )}

        {result.detectedObjects?.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-700)' }}>
              Detected Objects
            </h4>
            <div className="objects-grid">
              {result.detectedObjects.map((obj, i) => (
                <span key={i} className="object-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {obj.name}
                  <span className="confidence">({Math.round(obj.confidence * 100)}%)</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {result.feedback?.length > 0 && (
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-700)' }}>
              AI Feedback
            </h4>
            <ul className="feedback-list">
              {result.feedback.map((f, i) => (
                <li key={i} className="feedback-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCard;
