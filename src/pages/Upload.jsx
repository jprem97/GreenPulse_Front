import { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { imageService } from '../services/imageService';
import Sidebar from '../components/Sidebar';
import UploadCard from '../components/UploadCard';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { updateUserPoints, syncUser } = useContext(AuthContext);

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
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await imageService.analyze(file);
      if (response.success) {
        setResult(response.data);
        if (response.data.ecoPointsAwarded > 0) {
          updateUserPoints(response.data.ecoPointsAwarded);
        }
        if (response.updatedUser) {
          syncUser(response.updatedUser);
        }
      } else {
        setError(response.reason || response.message || 'Analysis failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.reason || 'Analysis failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Upload Waste Image</h1>
          <p className="page-subtitle">Take a photo of your sorted waste to earn eco-points</p>
        </div>

        {!preview ? (
          <div
            className={`upload-zone ${dragOver ? 'dragover' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="upload-zone-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p><strong>Click to upload</strong> or drag and drop</p>
            <p className="upload-hint">PNG, JPG, WEBP up to 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <>
            <div className="upload-preview">
              <img src={preview} alt="Preview" />
              {!loading && (
                <div className="upload-preview-overlay">
                  <button onClick={handleReset} className="btn btn-secondary btn-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Remove
                  </button>
                </div>
              )}
            </div>

            {loading && (
              <div style={{ textAlign: 'center', padding: '32px', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <div className="loading-spinner" style={{ width: '32px', height: '32px', borderWidth: '3px', marginBottom: '16px' }} />
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Analyzing your waste image...</div>
                <div style={{ fontSize: '13px', color: 'var(--gray-400)' }}>This may take 5-30 seconds</div>
              </div>
            )}

            {!loading && !result && (
              <button onClick={handleUpload} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Analyze Image
              </button>
            )}

            {result && (
              <button onClick={handleReset} className="btn btn-secondary btn-lg" style={{ width: '100%', marginBottom: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Upload Another Image
              </button>
            )}
          </>
        )}

        {error && (
          <div className="alert alert-error" style={{ marginTop: '16px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        <UploadCard result={result} />
      </div>
    </div>
  );
};

export default Upload;
