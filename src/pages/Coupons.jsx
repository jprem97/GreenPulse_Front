import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { couponService } from '../services/couponService';
import Sidebar from '../components/Sidebar';
import CouponCard from '../components/CouponCard';
import BackButton from '../components/BackButton';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [redeemModal, setRedeemModal] = useState(null);
  const { user, updateUserPoints } = useContext(AuthContext);

  const loadCoupons = async () => {
    try {
      const data = await couponService.getAll();
      setCoupons(data.coupons || []);
      const myData = await couponService.getMine();
      const saved = new Set((myData.savedCoupons || []).map((c) => c._id));
      setSavedIds(saved);
    } catch {
      setError('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleSave = async (id) => {
    try {
      await couponService.save(id);
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } catch {
      // silently fail
    }
  };

  const handleRedeem = async (id) => {
    try {
      const data = await couponService.redeem(id);
      if (data.success) {
        const coupon = coupons.find((c) => c._id === id);
        updateUserPoints(-coupon.pointsRequired);
        setRedeemModal({ code: data.couponCode, company: coupon.company });
        loadCoupons();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Redemption failed');
    }
  };

  if (loading) {
    return (
      <div className="page-layout">
        <Sidebar />
        <div className="page-content">
          <BackButton to="/dashboard" label="Back to Dashboard" />
          <div className="loading-page">
            <span className="loading-spinner" />
            Loading coupons...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <BackButton to="/dashboard" label="Back to Dashboard" />
        <div className="page-header">
          <h1 className="page-title">Coupons</h1>
          <p className="page-subtitle">Redeem your eco-points for partner rewards</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
            <button onClick={() => setError('')} style={{ marginLeft: 'auto', color: 'inherit', fontSize: '18px' }}>×</button>
          </div>
        )}

        {coupons.length > 0 ? (
          <div className="grid grid-auto">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onSave={handleSave}
                onRedeem={handleRedeem}
                isSaved={savedIds.has(coupon._id)}
                isRedeemed={coupon.redeemedBy?.includes(user?.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎟️</div>
            <p>No active coupons available right now.</p>
            <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>Check back later for new rewards!</p>
          </div>
        )}

        {redeemModal && (
          <div className="modal-overlay" onClick={() => setRedeemModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setRedeemModal(null)}>×</button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h2 style={{ marginBottom: '8px' }}>Coupon Redeemed!</h2>
                <div style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '20px' }}>
                  {redeemModal.company}
                </div>
                <div style={{
                  fontSize: '28px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  background: 'var(--primary-50)',
                  padding: '20px 28px',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px dashed var(--primary-300)',
                  letterSpacing: '3px',
                  marginBottom: '12px'
                }}>
                  {redeemModal.code}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>
                  Show this code to the partner to redeem
                </p>
              </div>
              <button onClick={() => setRedeemModal(null)} className="btn btn-primary btn-block" style={{ marginTop: '24px' }}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
