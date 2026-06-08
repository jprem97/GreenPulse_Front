import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { plantService } from '../services/plantService';
import { PLANT_TYPES, DURATIONS } from './CreatePlantation';

const PlantJourney = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { syncUser } = useContext(AuthContext);
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [compareWeek, setCompareWeek] = useState(null);

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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this plantation?')) return;
    setDeleting(true);
    try {
      await plantService.deletePlant(id);
      navigate('/plants');
    } catch {
      // ignore
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="page-layout"><Sidebar /><div className="page-content"><div className="loading-page"><div className="loading-spinner" /> Loading...</div></div></div>;
  if (!plant) return <div className="page-layout"><Sidebar /><div className="page-content"><div className="empty-state"><div className="empty-state-icon">🔍</div><p>Plantation not found</p><Link to="/plants" className="btn btn-primary">Back to Plants</Link></div></div></div>;

  const plantType = PLANT_TYPES.find((t) => t.value === plant.plantType);
  const duration = DURATIONS.find((d) => d.value === plant.durationWeeks);
  const uploadCount = plant.uploads ? plant.uploads.length : 0;
  const progress = plant.stages.length > 0 ? (uploadCount / plant.stages.length) * 100 : 0;
  const isComplete = plant.status === 'COMPLETED';
  const nextStage = plant.nextStage;
  const unlockedStage = plant.unlockedStage;
  const currentWeek = plant.currentWeek || 1;

  const avgScore = uploadCount > 0
    ? Math.round(plant.uploads.reduce((sum, u) => sum + (u.aiResponse?.score || 0), 0) / uploadCount)
    : 0;

  const compareUploads = compareWeek !== null
    ? plant.uploads.filter((u) => u.week === compareWeek || u.week === plant.stages[plant.stages.indexOf(compareWeek) - 1])
    : [];

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <div style={{ marginBottom: '24px' }}>
          <Link to="/plants" style={{ fontSize: '13px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Back to Plantations
          </Link>
        </div>

        {/* Header Card */}
        <div style={{
          background: isComplete ? 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' : 'linear-gradient(135deg, var(--primary-50), #f0fdf4)',
          border: `2px solid ${isComplete ? '#bae6fd' : 'var(--primary-200)'}`,
          borderRadius: 'var(--radius-xl)', padding: '32px', marginBottom: '28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: 'var(--radius-xl)',
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', flexShrink: 0,
            }}>
              {plantType?.icon || '🌱'}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{plant.plantName}</h1>
                <span className="badge" style={{
                  background: isComplete ? '#f0f9ff' : 'var(--primary-50)',
                  color: isComplete ? '#0369a1' : 'var(--primary-700)',
                  border: `1px solid ${isComplete ? '#bae6fd' : 'var(--primary-200)'}`,
                }}>
                  {plant.status}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                {plantType?.label} · {duration?.label} · {uploadCount}/{plant.stages.length} stages
              </div>
              <div style={{ fontSize: '13px', color: 'var(--gray-400)', marginTop: '4px' }}>
                Current week: {currentWeek} of {plant.durationWeeks}
                {unlockedStage && !isComplete && ` · Week ${unlockedStage} ready for upload`}
              </div>
              <div style={{ marginTop: '12px' }}>
                <div className="progress-bar" style={{ height: '12px' }}>
                  <div className="progress-bar-fill" style={{ width: `${progress}%`, background: isComplete ? 'linear-gradient(90deg, #0ea5e9, #06b6d4)' : 'var(--primary-gradient)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{Math.round(progress)}% complete</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{plant.totalGp} GP</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {plant.plantStreak > 0 && (
                <div style={{ textAlign: 'center', minWidth: '60px' }}>
                  <div style={{ fontSize: '24px' }}>🔥</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--warning)' }}>{plant.plantStreak}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Streak</div>
                </div>
              )}
              {avgScore > 0 && (
                <div style={{ textAlign: 'center', minWidth: '60px' }}>
                  <div style={{ fontSize: '24px' }}>⭐</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>{avgScore}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Avg Score</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Verification Code (first upload pending) */}
        {uploadCount === 0 && plant.status === 'ACTIVE' && (
          <div style={{
            background: 'var(--warning-bg)', border: '2px dashed var(--warning-border)',
            borderRadius: 'var(--radius-xl)', padding: '28px', marginBottom: '28px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>Your Verification Code</h3>
            <div style={{
              fontSize: '36px', fontWeight: 900, fontFamily: 'var(--font-display)',
              color: '#92400e', letterSpacing: '4px', marginBottom: '12px',
            }}>
              {plant.verificationCode}
            </div>
            <p style={{ fontSize: '14px', color: '#92400e', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
              Write this code on paper with a pen and place it visible near your plant. The AI will verify it's handwritten in your first upload.
            </p>
          </div>
        )}

        {/* Stage Timeline */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-700)' }}>Journey Stages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {plant.stages.map((week, i) => {
              const upload = plant.uploads ? plant.uploads.find((u) => u.week === week) : null;
              const isUploaded = !!upload;
              const isUnlocked = !isUploaded && plant.status === 'ACTIVE' && unlockedStage === week;
              const isLocked = !isUploaded && !isUnlocked && plant.status === 'ACTIVE';
              const weeksUntilAvailable = isLocked ? Math.max(0, week - currentWeek) : 0;

              return (
                <div key={week} style={{
                  display: 'flex', gap: '16px', alignItems: 'stretch',
                  padding: '20px', background: isUploaded ? 'var(--primary-50)' : isUnlocked ? 'var(--warning-bg)' : 'var(--surface)',
                  border: `2px solid ${isUploaded ? 'var(--primary-200)' : isUnlocked ? 'var(--warning-border)' : isLocked ? 'var(--gray-100)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-lg)', transition: 'all 200ms ease',
                  opacity: isLocked ? 0.6 : 1,
                }}>
                  {/* Stage number */}
                  <div style={{
                    width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                    background: isUploaded ? 'var(--primary)' : isUnlocked ? 'var(--warning)' : 'var(--gray-200)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0,
                  }}>
                    {isUploaded ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : isLocked ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    ) : i + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: isLocked ? 'var(--gray-400)' : 'var(--gray-800)' }}>Week {week}</div>
                      {isUploaded && (
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>+{upload.gpAwarded} GP</div>
                      )}
                      {isUnlocked && (
                        <Link to={`/plants/${plant.id}/upload?week=${week}`} className="btn btn-primary btn-sm">
                          Upload
                        </Link>
                      )}
                      {isLocked && weeksUntilAvailable > 0 && (
                        <span style={{
                          fontSize: '11px', fontWeight: 600, padding: '3px 10px',
                          background: 'var(--gray-100)', color: 'var(--gray-400)',
                          borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
                        }}>
                          ~{weeksUntilAvailable}w remaining
                        </span>
                      )}
                    </div>

                    {isUploaded && upload.uploadedAt && (
                      <div style={{ fontSize: '11px', color: 'var(--gray-400)', marginBottom: '4px' }}>
                        Uploaded {new Date(upload.uploadedAt).toLocaleDateString()}
                      </div>
                    )}

                    {isUploaded && upload.imageUrl && (
                      <div style={{ marginTop: '12px' }}>
                        <img
                          src={upload.imageUrl}
                          alt={`Week ${week}`}
                          style={{
                            width: '120px', height: '90px', objectFit: 'cover',
                            borderRadius: 'var(--radius-md)', border: '2px solid var(--primary-200)',
                          }}
                        />
                      </div>
                    )}

                    {isUploaded && upload.aiResponse?.feedback?.length > 0 && (
                      <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {upload.aiResponse.feedback.map((fb, fi) => (
                          <span key={fi} style={{
                            fontSize: '11px', padding: '3px 10px', borderRadius: 'var(--radius-full)',
                            background: 'rgba(22,163,74,0.08)', color: 'var(--primary-700)', fontWeight: 500,
                          }}>
                            {fb}
                          </span>
                        ))}
                      </div>
                    )}

                    {isUploaded && (
                      <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--gray-400)' }}>
                        Score: {upload.aiResponse?.score || 0}/100 · Health: {upload.aiResponse?.plantHealth || 'N/A'} · Growth: {upload.aiResponse?.growthQuality || 'N/A'}
                        {upload.aiResponse?.growthPercentage !== undefined && ` · ${upload.aiResponse.growthPercentage}% growth`}
                      </div>
                    )}

                    {isUploaded && upload.aiResponse?.verificationCodeVerified && (
                      <div style={{ marginTop: '4px' }}>
                        <span className="badge badge-good" style={{ fontSize: '11px' }}>✓ Verification Code Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delete button (only if no uploads) */}
        {uploadCount === 0 && (
          <button onClick={handleDelete} className="btn btn-ghost" style={{ color: 'var(--danger)' }} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete Plantation'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PlantJourney;
