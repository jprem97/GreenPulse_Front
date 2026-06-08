import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLevelForGP } from '../services/levels';
import RulesModal from './RulesModal';
import GreenPulseLogo from './GreenPulseLogo';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
      <nav className="navbar">
      <Link to={user ? '/dashboard' : '/'} className="navbar-brand">
        <GreenPulseLogo size={30} showText={true} />
      </Link>
      {user && (
        <div className="navbar-right">
          <button
            onClick={() => setShowRules(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 14px', borderRadius: 'var(--radius-full)',
              background: 'var(--gray-100)', border: '1px solid var(--gray-200)',
              fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)',
              cursor: 'pointer', transition: 'all 200ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-200)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gray-100)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Rules
          </button>

          {user.isFlagged && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '6px 12px', borderRadius: 'var(--radius-full)',
              background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
              fontSize: '12px', fontWeight: 700, color: '#991b1b',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Flagged
            </div>
          )}

          {!user.isFlagged && user.duplicateWarnings > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '6px 12px', borderRadius: 'var(--radius-full)',
              background: 'var(--warning-bg)', border: '1px solid var(--warning-border)',
              fontSize: '12px', fontWeight: 700, color: '#92400e',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              {user.duplicateWarnings} Warning{user.duplicateWarnings !== 1 ? 's' : ''}
            </div>
          )}

          <div className="navbar-points">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            </svg>
            <span>{user.gp || 0} GP</span>
          </div>
          <div className="navbar-level" title={getLevelForGP(user.gp || 0).title}>
            {getLevelForGP(user.gp || 0).icon}
          </div>
          <div className="navbar-user">
            <span className="navbar-name">{user.name}</span>
            {user.profilePic ? (
              <img src={user.profilePic} alt={user.name} className="navbar-avatar" />
            ) : (
              <div className="navbar-avatar-placeholder">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
