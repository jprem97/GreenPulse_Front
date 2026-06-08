import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';
import { plantService } from '../services/plantService';

export const PLANT_TYPES = [
  { value: 'TREE', label: 'Tree', icon: '🌳', desc: 'Long-term growth, highest rewards' },
  { value: 'FLOWER', label: 'Flower', icon: '🌸', desc: 'Beautiful blooms, moderate rewards' },
  { value: 'VEGETABLE', label: 'Vegetable', icon: '🥬', desc: 'Grow your food, earn points' },
  { value: 'INDOOR', label: 'Indoor Plant', icon: '🪴', desc: 'Perfect for apartments' },
];

export const DURATIONS = [
  { value: 4, label: '4 Weeks', desc: 'Quick journey' },
  { value: 8, label: '8 Weeks', desc: 'Recommended' },
  { value: 12, label: '12 Weeks', desc: 'Maximum rewards' },
];

const CreatePlantation = () => {
  const { syncUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [durationWeeks, setDurationWeeks] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!plantName.trim() || !plantType) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await plantService.create(plantName.trim(), plantType, durationWeeks);
      if (data.success) {
        setSuccess(data);
        if (data.plant) {
          syncUser({ gp: (data.plant.totalGp || 0) });
        }
        setTimeout(() => navigate(`/plants/${data.plant.id}`), 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create plantation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <BackButton to="/plants" label="Back to My Plantations" />
        <div className="page-header">
          <h1 className="page-title">Start a Plantation Journey</h1>
          <p className="page-subtitle">Plant, grow, and earn eco-points over time</p>
        </div>

        {success && (
          <div className="alert alert-success" style={{ marginBottom: '24px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <strong>Plantation created!</strong> +{success.gpAwarded} GP awarded. Write verification code <strong>{success.plant?.verificationCode}</strong> on paper and place it near your plant for the first upload.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '32px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--gray-800)' }}>Plant Details</h3>

            <div className="form-group">
              <label className="form-label">Plant Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Neem, Sunflower, Tomato"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Plant Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {PLANT_TYPES.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => setPlantType(type.value)}
                    style={{
                      padding: '16px',
                      border: `2px solid ${plantType === type.value ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      background: plantType === type.value ? 'var(--primary-50)' : 'var(--surface)',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{type.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--gray-800)' }}>{type.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '2px' }}>{type.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Duration</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {DURATIONS.map((dur) => (
                  <div
                    key={dur.value}
                    onClick={() => setDurationWeeks(dur.value)}
                    style={{
                      padding: '16px 24px',
                      border: `2px solid ${durationWeeks === dur.value ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      background: durationWeeks === dur.value ? 'var(--primary-50)' : 'var(--surface)',
                      flex: 1,
                      minWidth: '140px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '16px', color: durationWeeks === dur.value ? 'var(--primary)' : 'var(--gray-700)' }}>
                      {dur.label}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px' }}>{dur.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-700)', marginBottom: '12px' }}>How it works</h3>
            <ol style={{ fontSize: '13px', color: 'var(--primary-700)', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Create a plantation and receive a verification code</li>
              <li>Write the code on paper and place it near your plant</li>
              <li>Upload photos at each stage — AI verifies growth</li>
              <li>Earn GP at each stage + completion bonus</li>
            </ol>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: '24px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading || !!success} style={{ width: '100%' }}>
            {loading ? (
              <><div className="loading-spinner" style={{ width: '16px', height: '16px' }} /> Creating...</>
            ) : success ? (
              'Redirecting...'
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Plantation (+5 GP)
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlantation;
