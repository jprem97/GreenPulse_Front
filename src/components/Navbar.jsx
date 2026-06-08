import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLevelForGP } from '../services/levels';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to={user ? '/dashboard' : '/'} className="navbar-brand">
        <div className="brand-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
            <path d="M12 6v12" />
            <path d="M8 10c0-1.5 1.5-2 4-2s4 .5 4 2-1.5 2-4 2-4 .5-4 2 1.5 2 4 2 4-.5 4-2" />
          </svg>
        </div>
        GreenPulse
      </Link>
      {user && (
        <div className="navbar-right">
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
  );
};

export default Navbar;
