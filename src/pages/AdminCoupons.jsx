import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';
import api from '../services/api';

const AdminCoupons = () => {
  const { user } = useContext(AuthContext);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: '', product: '', code: '', pointsRequired: '', expiryDate: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadCoupons = async () => {
    try {
      const response = await api.get('/coupons');
      setCoupons(response.data.coupons || []);
    } catch {
      setError('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const body = {
        company: form.company,
        product: form.product,
        code: form.code,
        pointsRequired: Number(form.pointsRequired),
      };
      if (form.expiryDate) body.expiryDate = form.expiryDate;

      await api.post('/coupons/admin', body);
      setSuccess('Coupon created successfully');
      setForm({ company: '', product: '', code: '', pointsRequired: '', expiryDate: '' });
      setShowForm(false);
      loadCoupons();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create coupon');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm('Deactivate this coupon?')) return;
    try {
      await api.patch(`/coupons/admin/${id}`);
      loadCoupons();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to deactivate');
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="page-layout">
        <Sidebar />
        <div className="page-content">
          <div className="alert alert-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Access denied. Admin only.
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
        <div className="admin-header" style={{ marginBottom: '28px' }}>
          <div className="page-header" style={{ marginBottom: 0 }}>
            <h1 className="page-title">Admin Panel</h1>
            <p className="page-subtitle">Create and manage reward coupons</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Coupon
              </>
            )}
          </button>
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
        {success && (
          <div className="alert alert-success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {success}
          </div>
        )}

        {showForm && (
          <div className="card" style={{ marginBottom: '28px', animation: 'scaleIn 0.3s ease-out' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Create New Coupon</h3>
            <form onSubmit={handleCreate}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Starbucks"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Product</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Free Coffee"
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Coupon Code</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. GREEN2024"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Points Required</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 100"
                    min="1"
                    value={form.pointsRequired}
                    onChange={(e) => setForm({ ...form, pointsRequired: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expiry Date (optional)</label>
                  <input
                    type="date"
                    className="form-input"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ marginTop: '8px' }}>
                {submitting ? (
                  <>
                    <span className="loading-spinner" />
                    Creating...
                  </>
                ) : (
                  'Create Coupon'
                )}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-page">
            <span className="loading-spinner" />
            Loading coupons...
          </div>
        ) : coupons.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coupons.map((coupon) => (
              <div key={coupon._id} className="admin-coupon-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--primary-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    🎟️
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{coupon.company} - {coupon.product}</div>
                    <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginTop: '2px' }}>
                      Code: {coupon.code} | {coupon.pointsRequired} GP | {coupon.redeemedBy?.length || 0} redeemed | {coupon.savedBy?.length || 0} saved
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className={`badge ${coupon.status === 'ACTIVE' ? 'badge-good' : 'badge-invalid'}`}>
                    {coupon.status}
                  </span>
                  {coupon.status === 'ACTIVE' && (
                    <button onClick={() => handleDeactivate(coupon._id)} className="btn btn-danger btn-sm">
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎟️</div>
            <p>No coupons created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoupons;
