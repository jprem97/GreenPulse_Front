import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';
import api from '../services/api';

const classificationConfig = {
  GOOD: { badge: 'badge-good', label: 'Good', color: 'var(--primary)' },
  MEDIUM: { badge: 'badge-medium', label: 'Medium', color: 'var(--warning)' },
  BAD: { badge: 'badge-bad', label: 'Bad', color: 'var(--danger)' },
  INVALID: { badge: 'badge-invalid', label: 'Invalid', color: 'var(--gray-400)' },
};

const History = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get('/analyzer/history');
        setImages(response.data.images || response.data || []);
      } catch {
        // silently fail - endpoint may not exist yet
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="page-layout">
        <Sidebar />
        <div className="page-content">
          <BackButton to="/dashboard" label="Back to Dashboard" />
          <div className="loading-page">
            <span className="loading-spinner" />
            Loading history...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <BackButton to="/dashboard" label="Back to Dashboard" />
        <div className="page-header">
          <h1 className="page-title">Analysis History</h1>
          <p className="page-subtitle">Your past waste image analyses</p>
        </div>

        {images.length > 0 ? (
          <div>
            {images.map((img) => {
              const config = classificationConfig[img.classification] || classificationConfig.INVALID;
              return (
                <div key={img._id} className="history-item">
                  {img.imageUrl && (
                    <img src={img.imageUrl} alt="Analyzed" className="history-image" />
                  )}
                  <div className="history-details">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Waste Analysis</h4>
                      <span className={`badge ${config.badge}`}>{config.label}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>
                      Score: <strong style={{ color: config.color }}>{img.score || 0}/100</strong>
                      {img.ecoPointsAwarded > 0 && (
                        <> | +{img.ecoPointsAwarded} eco-points earned</>
                      )}
                    </div>
                    {img.detectedObjects?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                        {img.detectedObjects.slice(0, 5).map((obj, i) => (
                          <span key={i} className="object-tag" style={{ fontSize: '12px', padding: '4px 10px' }}>
                            {obj.name}
                          </span>
                        ))}
                        {img.detectedObjects.length > 5 && (
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)', alignSelf: 'center' }}>
                            +{img.detectedObjects.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                    <div className="history-meta">
                      <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {new Date(img.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <p>No analysis history yet.</p>
            <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>Upload your first waste image to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
