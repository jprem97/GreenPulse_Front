import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { plantService } from '../services/plantService';

const UploadPlantStage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { syncUser } = useContext(AuthContext);

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const week = Number(searchParams.get('week'));

  useEffect(() => {
    const load = async () => {
      try {
        const data = await plantService.getPlantById(id);
        if (data.success) setPlant(data.plant);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleFile = (selected) => {
    if (selected && selected.type.startsWith('image/')) {
      if (selected.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError('');
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    setResult(null);
    try {
      const response = await plantService.uploadStage(id, file);
      if (response.success) {
        setResult(response);
        syncUser({ gp: response.totalGp });
      } else {
        setError(response.message || 'Upload failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Upload failed';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  if (loading) return <div className="page-layout"><Sidebar /><div className="page-content"><div className="loading-page"><div className="loading-spinner" /> Loading...</div></div></div>;
  if (!plant) return <div className="page-layout"><Sidebar /><div className="page-content"><div className="empty-state"><p>Plantation not found</p><Link to="/plants" className="btn btn-primary">Back</Link></div></div></div>;

  const isFirst = plant.uploads.length === 0;

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <Link to={`/plants/${id}`} style={{ fontSize: '13px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Back to {plant.plantName}
        </Link>

        <div className="page-header">
          <h1 className="page-title">Upload Stage {week}</h1>
          <p className="page-subtitle">{plant.plantName} — Week {week} of {plant.durationWeeks}</p>
        </div>

        {isFirst && (
          <div style={{
            background: 'var(--warning-bg)', border: '2px dashed var(--warning-border)',
            borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📝</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>Verification Required</h3>
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#92400e', letterSpacing: '3px', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
              {plant.verificationCode}
            </div>
            <p style={{ fontSize: '13px', color: '#92400e', maxWidth: '400px', margin: '0 auto' }}>
              Write this code on paper and include it in your photo. The AI will verify it.
            </p>
          </div>
        )}

        {!preview ? (
          <div
            className={`upload-zone ${dragOver ? 'dragover' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="upload-zone-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p><strong>Click to upload</strong> or drag and drop</p>
            <p className="upload-hint">PNG, JPG, WEBP up to 10MB</p>
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
        ) : (
          <>
            <div className="upload-preview">
              <img src={preview} alt="Preview" />
              {!uploading && (
                <div className="upload-preview-overlay">
                  <button onClick={handleReset} className="btn btn-secondary btn-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Remove
                  </button>
                </div>
              )}
            </div>

            {uploading && (
              <div style={{ textAlign: 'center', padding: '32px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <div className="loading-spinner" style={{ width: '32px', height: '32px', borderWidth: '3px', marginBottom: '16px' }} />
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>AI is analyzing your plant...</div>
                <div style={{ fontSize: '13px', color: 'var(--gray-400)' }}>Checking growth, health, and authenticity</div>
              </div>
            )}

            {!uploading && !result && (
              <button onClick={handleUpload} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Analyze & Upload
              </button>
            )}
          </>
        )}

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '24px' }}>
            <div className="alert alert-success" style={{ marginBottom: '16px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <strong>+{result.gpAwarded} GP earned!</strong>
                {result.completionBonus > 0 && ` +${result.completionBonus} GP completion bonus!`}
              </div>
            </div>

            <div className="result-card">
              <div className="result-header">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>AI Analysis Result</span>
              </div>
              <div className="result-body">
                <div className="result-stats">
                  <div className="result-stat">
                    <div className="result-stat-value" style={{ color: 'var(--primary)' }}>{result.aiResponse?.score || 0}</div>
                    <div className="result-stat-label">Score</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value" style={{ color: 'var(--accent)' }}>{result.aiResponse?.growthQuality || 'N/A'}</div>
                    <div className="result-stat-label">Growth Quality</div>
                  </div>
                  <div className="result-stat">
                    <div className="result-stat-value" style={{ color: 'var(--purple)' }}>{result.aiResponse?.plantHealth || 'N/A'}</div>
                    <div className="result-stat-label">Plant Health</div>
                  </div>
                </div>

                {result.aiResponse?.feedback?.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', color: 'var(--gray-700)' }}>Feedback</h4>
                    <ul className="feedback-list">
                      {result.aiResponse.feedback.map((fb, i) => (
                        <li key={i} className="feedback-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                          {fb}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <span className={`badge ${result.aiResponse?.samePlant ? 'badge-good' : 'badge-bad'}`}>
                    {result.aiResponse?.samePlant ? 'Same Plant' : 'Different Plant'}
                  </span>
                  <span className={`badge ${result.aiResponse?.growthDetected ? 'badge-good' : 'badge-bad'}`}>
                    {result.aiResponse?.growthDetected ? 'Growth Detected' : 'No Growth'}
                  </span>
                  <span className={`badge ${!result.aiResponse?.fraudDetected ? 'badge-good' : 'badge-bad'}`}>
                    {result.aiResponse?.fraudDetected ? 'Fraud Detected' : 'Authentic'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button onClick={handleReset} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>
                Upload Another
              </button>
              <Link to={`/plants/${id}`} className="btn btn-primary btn-lg" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                {result.status === 'COMPLETED' ? 'View Journey' : 'Continue Journey'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPlantStage;
