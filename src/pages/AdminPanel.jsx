import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from './AdminDashboard';
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders';
import AdminLogin from './AdminLogin';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'fake-jwt-token-hansom-admin') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{ display: 'flex', background: '#f4f4f4', minHeight: '100vh' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 32px',
          background: '#fff',
          borderBottom: '1px solid #efefef',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a' }}>
              Welcome back, Riday! 👋
            </div>
            <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>
              Here's what's happening with your restaurant today.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              position: 'relative', padding: 8,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#f59e0b', borderRadius: '50%', border: '1.5px solid #fff' }} />
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 18px', background: '#f59e0b',
                color: '#1a1a1a', border: 'none', borderRadius: '10px',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'menu' && <AdminMenu />}
          {activeTab === 'orders' && <AdminOrders />}
        </div>
      </div>
    </div>
  );
}
