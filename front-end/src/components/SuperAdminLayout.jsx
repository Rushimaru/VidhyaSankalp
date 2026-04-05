import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/super-admin',             icon: 'solar:home-2-bold-duotone',            label: 'Dashboard',     end: true },
  { to: '/super-admin/institutions',icon: 'solar:buildings-3-bold-duotone',       label: 'Institutions' },
  { to: '/super-admin/payments',    icon: 'solar:card-recive-bold-duotone',        label: 'Payments' },
  { to: '/super-admin/plans',       icon: 'solar:diploma-bold-duotone',            label: 'Subscription Plans' },
];

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/auth/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 260 : 70, transition: 'width 0.3s ease',
        background: 'linear-gradient(180deg, #1a1d2e 0%, #12141f 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>V</div>
            {sidebarOpen && (
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>VidhyaSankalp</div>
                <div style={{ color: '#6366f1', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', marginTop: 2 }}>SUPER ADMIN</div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 10, marginBottom: 4, textDecoration: 'none',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                background: isActive ? 'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 100%)' : 'transparent',
                fontWeight: isActive ? 600 : 400, fontSize: 14, transition: 'all 0.2s',
                borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
              })}>
              <iconify-icon icon={item.icon} style={{ fontSize: 20, flexShrink: 0 }} />
              {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        {sidebarOpen && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 14,
              }}>{user?.name?.[0]?.toUpperCase() || 'S'}</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{user?.name || 'Super Admin'}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{user?.email}</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{
              width: '100%', padding: '8px 12px', borderRadius: 8, border: 'none',
              background: 'rgba(239,68,68,0.15)', color: '#ef4444', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
            }}>
              <iconify-icon icon="solar:logout-2-bold-duotone" style={{ fontSize: 16 }} />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          height: 64, background: 'rgba(26,29,46,0.95)', backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', position: 'sticky', top: 0, zIndex: 100,
        }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{
            background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8,
            color: '#fff', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center',
          }}>
            <iconify-icon icon="solar:hamburger-menu-bold" style={{ fontSize: 20 }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 20, padding: '4px 14px', color: '#a78bfa', fontSize: 12, fontWeight: 600,
            }}>⚡ Super Admin Console</div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 40px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
