import { Link } from 'react-router-dom';

const BackButton = ({ to = '/dashboard', label = 'Back' }) => (
  <Link
    to={to}
    style={{
      fontSize: '13px',
      color: 'var(--gray-500)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '16px',
      width: 'fit-content',
      textDecoration: 'none',
      transition: 'color 200ms ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gray-700)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gray-500)'; }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
    {label}
  </Link>
);

export default BackButton;
