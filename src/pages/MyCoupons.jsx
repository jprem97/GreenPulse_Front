import { useState, useEffect } from 'react';
import { couponService } from '../services/couponService';
import Sidebar from '../components/Sidebar';
import CouponCard from '../components/CouponCard';

const MyCoupons = () => {
  const [savedCoupons, setSavedCoupons] = useState([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState([]);
  const [activeTab, setActiveTab] = useState('saved');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await couponService.getMine();
        if (!cancelled) {
          setSavedCoupons(data.savedCoupons || []);
          setRedeemedCoupons(data.redeemedCoupons || []);
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const displayCoupons = activeTab === 'saved' ? savedCoupons : redeemedCoupons;

  if (loading) {
    return (
      <div className="page-layout">
        <Sidebar />
        <div className="page-content">
          <div className="loading-page">
            <span className="loading-spinner" />
            Loading your coupons...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">My Coupons</h1>
          <p className="page-subtitle">Manage your saved and redeemed coupons</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved ({savedCoupons.length})
          </button>
          <button
            className={`tab ${activeTab === 'redeemed' ? 'active' : ''}`}
            onClick={() => setActiveTab('redeemed')}
          >
            Redeemed ({redeemedCoupons.length})
          </button>
        </div>

        {displayCoupons.length > 0 ? (
          <div className="grid grid-auto">
            {displayCoupons.map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onSave={() => {}}
                onRedeem={() => {}}
                isSaved={activeTab === 'saved'}
                isRedeemed={activeTab === 'redeemed'}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              {activeTab === 'saved' ? '🔖' : '🎟️'}
            </div>
            <p>No {activeTab} coupons yet.</p>
            {activeTab === 'saved' && (
              <p style={{ fontSize: '13px', color: 'var(--gray-400)' }}>Browse available coupons and save the ones you like!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoupons;
