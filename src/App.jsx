import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Coupons from './pages/Coupons';
import MyCoupons from './pages/MyCoupons';
import Profile from './pages/Profile';
import AdminCoupons from './pages/AdminCoupons';
import History from './pages/History';
import MyPlantations from './pages/MyPlantations';
import CreatePlantation from './pages/CreatePlantation';
import PlantJourney from './pages/PlantJourney';
import UploadPlantStage from './pages/UploadPlantStage';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/coupons" element={<ProtectedRoute><Coupons /></ProtectedRoute>} />
        <Route path="/my-coupons" element={<ProtectedRoute><MyCoupons /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/plants" element={<ProtectedRoute><MyPlantations /></ProtectedRoute>} />
        <Route path="/plants/create" element={<ProtectedRoute><CreatePlantation /></ProtectedRoute>} />
        <Route path="/plants/:id" element={<ProtectedRoute><PlantJourney /></ProtectedRoute>} />
        <Route path="/plants/:id/upload" element={<ProtectedRoute><UploadPlantStage /></ProtectedRoute>} />
        <Route path="/admin/coupons" element={<ProtectedRoute><AdminCoupons /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <div style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        padding: '6px 14px',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        borderRadius: 'var(--radius-full)',
        fontSize: '11px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.9)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        Prototype v1.0
      </div>
    </div>
  );
}

export default App;
