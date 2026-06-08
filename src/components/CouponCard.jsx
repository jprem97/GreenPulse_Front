import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CouponCard = ({ coupon, onSave, onRedeem, isSaved, isRedeemed, showActions = true }) => {
  const { user } = useContext(AuthContext);
  const canRedeem = user?.gp >= coupon.pointsRequired && !isRedeemed;

  return (
    <div className="coupon-card">
      <div className="coupon-card-top">
        <div>
          <h3>{coupon.company}</h3>
          <p>{coupon.product}</p>
        </div>
        <span className="coupon-points-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v12" />
            <path d="M8 10c0-1.5 1.5-2 4-2s4 .5 4 2-1.5 2-4 2-4 .5-4 2 1.5 2 4 2 4-.5 4-2" />
          </svg>
          {coupon.pointsRequired} GP
        </span>
      </div>

      <div className="coupon-card-meta">
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--gray-600)' }}>{coupon.code}</span>
        {coupon.expiryDate && (
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: '-1px', marginRight: '4px' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {showActions && (
        <div className="coupon-card-actions">
          <button
            onClick={() => onSave(coupon._id)}
            className={`btn btn-sm ${isSaved ? 'btn-secondary' : 'btn-outline'}`}
          >
            {isSaved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Saved
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Save
              </>
            )}
          </button>
          <button
            onClick={() => onRedeem(coupon._id)}
            disabled={!canRedeem}
            className={`btn btn-sm ${canRedeem ? 'btn-primary' : 'btn-secondary'}`}
          >
            {isRedeemed ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Redeemed
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
                Redeem
              </>
            )}
          </button>
        </div>
      )}

      {isRedeemed && !showActions && (
        <div className="coupon-card-actions" style={{ justifyContent: 'center' }}>
          <span className="badge badge-good">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Redeemed
          </span>
        </div>
      )}
    </div>
  );
};

export default CouponCard;
