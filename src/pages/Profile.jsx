import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';
import { getLevelProgress, ACHIEVEMENTS } from '../services/levels';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const gp = user?.gp || 0;
  const lvl = getLevelProgress(gp);

  const stats = {
    totalImages: user?.totalImages || 0,
    bestScore: user?.bestScore || 0,
    maxSingleGP: user?.maxSingleGP || 0,
    goodCount: user?.goodCount || 0,
    streak: user?.streak || 0,
    totalGP: gp,
    levelIndex: lvl.index,
  };

  const unlocked = new Set(user?.achievements || []);

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content" style={{ maxWidth: '720px' }}>
        <BackButton to="/dashboard" label="Back to Dashboard" />
        <div className="page-header">
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Your account information</p>
        </div>

        {/* PROFILE CARD */}
        <div className="profile-card" style={{ marginBottom: '28px' }}>
          {user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="profile-avatar" />
          ) : (
            <div className="profile-avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: lvl.current.bg,
            border: `2px solid ${lvl.current.color}40`,
            borderRadius: 'var(--radius-full)',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '20px' }}>{lvl.current.icon}</span>
            <span style={{ fontWeight: 700, color: lvl.current.color, fontSize: '14px' }}>{lvl.current.title}</span>
          </div>

          <div className="profile-info">
            <div className="profile-field highlight">
              <div className="profile-field-label">Eco Points</div>
              <div className="profile-field-value">{gp} GP</div>
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Level Progress</div>
              <div className="profile-field-value" style={{ fontSize: '14px' }}>
                {lvl.next ? (
                  <span>{lvl.gpInLevel} / {lvl.gpNeeded} GP to {lvl.next.title}</span>
                ) : (
                  <span>Max level reached!</span>
                )}
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'var(--gray-200)',
                borderRadius: 'var(--radius-full)',
                marginTop: '8px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${lvl.progress}%`,
                  background: `linear-gradient(90deg, ${lvl.current.color}, ${lvl.next?.color || lvl.current.color})`,
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.8s ease',
                }} />
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Name</div>
              <div className="profile-field-value">{user?.name || '-'}</div>
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Email</div>
              <div className="profile-field-value">{user?.email || '-'}</div>
            </div>
            <div className="profile-field">
              <div className="profile-field-label">Role</div>
              <div className="profile-field-value" style={{ textTransform: 'capitalize' }}>{user?.role?.toLowerCase() || 'user'}</div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-700)' }}>Statistics</h3>
          <div className="grid grid-3">
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{stats.totalImages}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, marginTop: '4px' }}>Images Analyzed</div>
            </div>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--purple)', fontFamily: 'var(--font-display)' }}>{stats.bestScore}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, marginTop: '4px' }}>Best Score</div>
            </div>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--warning)', fontFamily: 'var(--font-display)' }}>{stats.streak} 🔥</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, marginTop: '4px' }}>Day Streak</div>
            </div>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{stats.goodCount}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, marginTop: '4px' }}>Good Classifications</div>
            </div>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{stats.maxSingleGP}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, marginTop: '4px' }}>Best Single Upload</div>
            </div>
            <div style={{ padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--font-display)' }}>{lvl.index + 1}/{lvl.totalLevels}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-500)', fontWeight: 600, marginTop: '4px' }}>Level</div>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-700)' }}>
            Achievements <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--gray-400)' }}>({unlocked.size}/{ACHIEVEMENTS.length})</span>
          </h3>
          <div className="grid grid-auto" style={{ gap: '12px' }}>
            {ACHIEVEMENTS.map((a) => {
              const isUnlocked = unlocked.has(a.id);
              return (
                <div key={a.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px',
                  background: isUnlocked ? 'var(--surface)' : 'var(--gray-50)',
                  border: isUnlocked ? '1px solid var(--primary-200)' : '1px solid var(--gray-100)',
                  borderRadius: 'var(--radius-lg)',
                  opacity: isUnlocked ? 1 : 0.5,
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    background: isUnlocked ? 'var(--primary-50)' : 'var(--gray-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                  }}>
                    {isUnlocked ? a.icon : '🔒'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: isUnlocked ? 'var(--gray-800)' : 'var(--gray-400)' }}>{a.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '2px' }}>{a.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
