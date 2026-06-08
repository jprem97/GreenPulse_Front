import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';
import { plantService } from '../services/plantService';
import { PLANT_TYPES, DURATIONS } from './CreatePlantation';

const STATUS_COLORS = {
  ACTIVE: { bg: 'var(--primary-50)', color: 'var(--primary-700)', border: 'var(--primary-200)' },
  COMPLETED: { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
  ABANDONED: { bg: 'var(--danger-bg)', color: '#991b1b', border: 'var(--danger-border)' },
};

const MyPlantations = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await plantService.getMyPlants();
        setPlants(data.plants || []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = filter === 'ALL' ? plants : plants.filter((p) => p.status === filter);

  const getPlantIcon = (type) => PLANT_TYPES.find((t) => t.value === type)?.icon || '🌱';
  const getPlantTitle = (type) => PLANT_TYPES.find((t) => t.value === type)?.label || type;
  const getDurationLabel = (weeks) => DURATIONS.find((d) => d.value === weeks)?.label || `${weeks} weeks`;

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <BackButton to="/dashboard" label="Back to Dashboard" />
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">My Plantations</h1>
            <p className="page-subtitle">Track your plant growth journeys</p>
          </div>
          <Link to="/plants/create" className="btn btn-primary" style={{ gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Plantation
          </Link>
        </div>

        <div className="tabs" style={{ marginBottom: '24px' }}>
          {['ALL', 'ACTIVE', 'COMPLETED', 'ABANDONED'].map((f) => (
            <button key={f} className={`tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0) + f.slice(1).toLowerCase()}
              {f !== 'ALL' && (
                <span style={{ marginLeft: '6px', fontSize: '12px', opacity: 0.6 }}>
                  ({plants.filter((p) => p.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-page"><div className="loading-spinner" /> Loading plantations...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌱</div>
            <p>No plantations yet. Start your first plant journey!</p>
            <Link to="/plants/create" className="btn btn-primary">Create Plantation</Link>
          </div>
        ) : (
          <div className="grid grid-auto">
            {filtered.map((plant) => {
              const st = STATUS_COLORS[plant.status] || STATUS_COLORS.ACTIVE;
              const uploadCount = plant.uploadCount || (plant.uploads ? plant.uploads.length : 0);
              const progress = plant.stages.length > 0
                ? (uploadCount / plant.stages.length) * 100
                : 0;
              const unlockedStage = plant.unlockedStage || null;
              const isDueNow = plant.status === 'ACTIVE' && unlockedStage;

              return (
                <Link
                  key={plant.id}
                  to={`/plants/${plant.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="card" style={{ padding: '24px', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{
                          width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                          background: 'var(--primary-50)', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '24px',
                        }}>
                          {getPlantIcon(plant.plantType)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--gray-900)' }}>{plant.plantName}</div>
                          <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{getPlantTitle(plant.plantType)} · {getDurationLabel(plant.durationWeeks)}</div>
                        </div>
                      </div>
                      <span className="badge" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                        {plant.status}
                      </span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Progress</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-700)' }}>{uploadCount}/{plant.stages.length} stages</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progress}%`, background: plant.status === 'COMPLETED' ? 'linear-gradient(90deg, #0ea5e9, #06b6d4)' : 'var(--primary-gradient)' }} />
                      </div>
                    </div>

                    {plant.plantStreak > 0 && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--warning)' }}>🔥</span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-600)' }}>{plant.plantStreak} streak</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
                        {plant.totalGp} GP earned
                      </div>
                      {isDueNow && (
                        <span style={{
                          fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                          background: 'var(--warning-bg)', color: '#92400e',
                          border: '1px solid var(--warning-border)', borderRadius: 'var(--radius-full)',
                        }}>
                          Week {unlockedStage} ready
                        </span>
                      )}
                      {plant.status === 'COMPLETED' && (
                        <div style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 600 }}>
                          Completed!
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlantations;
