import React from 'react';
import { LayoutDashboard, Utensils, ClipboardList } from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'menu', label: 'Manage Menu', icon: <Utensils size={20} /> },
    { id: 'orders', label: 'Live Orders', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div style={{
      width: '240px', background: '#1a1a1a', height: '100vh',
      position: 'fixed', left: 0, top: 0,
      padding: '24px 16px', boxSizing: 'border-box', zIndex: 100,
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid #2a2a2a',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '8px' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: '#f59e0b',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="26" height="26" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="18" r="9" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
            <rect x="13" y="15" width="18" height="2.5" rx="1.2" fill="#1a1a1a"/>
            <rect x="15" y="18.5" width="14" height="2.5" rx="1.2" fill="#1a1a1a"/>
            <ellipse cx="22" cy="28" rx="11" ry="3" stroke="#1a1a1a" strokeWidth="1.8" fill="none"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, color: '#fff', fontSize: 15, letterSpacing: 2, lineHeight: 1 }}>BURGER</div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: '#f59e0b' }}>— HOUSE —</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                width: '100%', padding: '13px 16px',
                border: 'none', borderRadius: '12px',
                backgroundColor: isActive ? '#f59e0b' : 'transparent',
                color: isActive ? '#1a1a1a' : '#888',
                fontSize: '14px', fontWeight: isActive ? '700' : '500',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(245,158,11,0.1)'; e.currentTarget.style.color = '#f59e0b'; } }}
              onMouseOut={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888'; } }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom user badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px 14px', borderRadius: '12px',
        background: '#242424', marginTop: 'auto',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 14, color: '#1a1a1a',
        }}>R</div>
        <div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Riday Admin</div>
          <div style={{ color: '#888', fontSize: 11 }}>Admin</div>
        </div>
      </div>
    </div>
  );
}
