import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import { couponService } from '../services/couponService';
import { LEVELS, getLevelProgress } from '../services/levels';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [recentCoupons, setRecentCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const gp = user?.gp || 0;
  const lvl = getLevelProgress(gp);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await couponService.getAll();
        setRecentCoupons((data.coupons || []).slice(0, 3));
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Welcome back, {user?.name || 'User'}!</h1>
          <p className="page-subtitle">Here&apos;s your eco-impact overview</p>
        </div>

        {user?.isFlagged && (
          <div className="alert alert-error" style={{ marginBottom: '24px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <strong>Account Flagged</strong> — Your account has been flagged for repeated duplicate uploads. You are now receiving only <strong>40% eco-points</strong> per upload. Upload only original photos to avoid this penalty.
            </div>
          </div>
        )}

        {!user?.isFlagged && user?.duplicateWarnings > 0 && (
          <div className="alert alert-warning" style={{ marginBottom: '24px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <strong>Warning ({user.duplicateWarnings}/5)</strong> — You have uploaded {user.duplicateWarnings} duplicate image{user.duplicateWarnings !== 1 ? 's' : ''}.
              {user.duplicateWarnings < 3 && ` ${3 - user.duplicateWarnings} more duplicate${3 - user.duplicateWarnings !== 1 ? 's' : ''} before your first warning.`}
              {user.duplicateWarnings === 3 && ' This is your first warning. One more duplicate and you\'ll receive a final warning.'}
              {user.duplicateWarnings === 4 && ' This is your LAST WARNING. One more duplicate will flag your account permanently!'}
            </div>
          </div>
        )}

        {/* LEVEL CARD */}
        <div style={{
          background: lvl.current.bg,
          border: `2px solid ${lvl.current.color}30`,
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-xl)',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}>
              {lvl.current.icon}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                Current Level
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--gray-900)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                {lvl.current.title}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                {lvl.next ? (
                  <>{lvl.gpInLevel} / {lvl.gpNeeded} GP to {lvl.next.title}</>
                ) : (
                  <>Maximum level reached!</>
                )}
              </div>
              <div style={{
                width: '100%',
                height: '10px',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: 'var(--radius-full)',
                marginTop: '12px',
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
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: '36px', fontWeight: 900, color: lvl.current.color, fontFamily: 'var(--font-display)' }}>
                {gp}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Total GP
              </div>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-4" style={{ marginBottom: '28px' }}>
          <div className="stat-card green">
            <div className="stat-icon green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v12" /><path d="M8 10c0-1.5 1.5-2 4-2s4 .5 4 2-1.5 2-4 2-4 .5-4 2 1.5 2 4 2 4-.5 4-2" /></svg>
            </div>
            <div className="stat-label">Eco Points</div>
            <div className="stat-value green">{gp}</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" /><line x1="3" y1="9" x2="21" y2="9" /></svg>
            </div>
            <div className="stat-label">Images Analyzed</div>
            <div className="stat-value blue">{user?.totalImages || 0}</div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <div className="stat-label">Best Score</div>
            <div className="stat-value purple">{user?.bestScore || 0}</div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon warning">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
            </div>
            <div className="stat-label">Day Streak</div>
            <div className="stat-value" style={{ color: 'var(--warning)' }}>{user?.streak || 0} 🔥</div>
          </div>
        </div>

        {/* LEVEL JOURNEY */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-700)' }}>Level Journey</h3>
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '8px 0',
          }}>
            {LEVELS.map((level, i) => {
              const isActive = lvl.index === i;
              const isUnlocked = lvl.index >= i;
              return (
                <div key={level.name} style={{
                  minWidth: '120px',
                  padding: '16px 12px',
                  background: isActive ? level.bg : isUnlocked ? 'var(--surface)' : 'var(--gray-50)',
                  border: isActive ? `2px solid ${level.color}` : isUnlocked ? '2px solid var(--gray-200)' : '2px solid var(--gray-100)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  opacity: isUnlocked ? 1 : 0.5,
                  position: 'relative',
                }}>
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: level.color,
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>You</div>
                  )}
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>{level.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: isUnlocked ? 'var(--gray-800)' : 'var(--gray-400)' }}>{level.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)', marginTop: '2px' }}>{level.minGP} GP</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--gray-700)' }}>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/upload" className="quick-action">
              <div className="quick-action-icon green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              </div>
              <div className="quick-action-text">
                <h4>Upload Waste</h4>
                <p>Earn eco-points</p>
              </div>
            </Link>
            <Link to="/coupons" className="quick-action">
              <div className="quick-action-icon blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
              </div>
              <div className="quick-action-text">
                <h4>Browse Coupons</h4>
                <p>Redeem rewards</p>
              </div>
            </Link>
            <Link to="/my-coupons" className="quick-action">
              <div className="quick-action-icon purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              </div>
              <div className="quick-action-text">
                <h4>My Coupons</h4>
                <p>View saved coupons</p>
              </div>
            </Link>
          </div>
        </div>

        {/* RECENT REWARDS */}
        {!loading && recentCoupons.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gray-700)' }}>Available Rewards</h3>
              <Link to="/coupons" style={{ fontSize: '13px', fontWeight: 600 }}>View all</Link>
            </div>
            <div className="grid grid-3">
              {recentCoupons.map((coupon) => (
                <div key={coupon._id} className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>{coupon.company}</div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{coupon.product}</div>
                    </div>
                    <span className="coupon-points-badge" style={{ fontSize: '12px', padding: '4px 10px' }}>{coupon.pointsRequired} GP</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>
                    Code: {coupon.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
