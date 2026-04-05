import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/faculty',             icon: 'solar:home-2-bold-duotone',            label: 'Dashboard',   end: true },
  { to: '/faculty/attendance',  icon: 'solar:users-group-rounded-bold-duotone', label: 'Attendance' },
  { to: '/faculty/students',    icon: 'solar:user-bold-duotone',               label: 'My Students' },
  { to: '/faculty/materials',   icon: 'solar:document-bold-duotone',           label: 'Study Materials' },
  { to: '/faculty/assignments', icon: 'solar:notebook-bold-duotone',           label: 'Assignments' },
  { to: '/faculty/performance', icon: 'solar:chart-bold-duotone',              label: 'Performance' },
];

const FacultyLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/auth/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8faff', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 250 : 68, transition: 'width 0.3s ease',
        background: '#fff', borderRight: '1px solid #e8edf5',
        display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
        boxShadow: '2px 0 12px rgba(0,0,0,0.04)',
      }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f4fb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>F</div>
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#1e293b' }}>VidhyaSankalp</div>
                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600, letterSpacing: '0.06em' }}>FACULTY PORTAL</div>
              </div>
            )}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 10, marginBottom: 3, textDecoration: 'none',
                color: isActive ? '#10b981' : '#64748b',
                background: isActive ? '#f0fdf8' : 'transparent',
                fontWeight: isActive ? 600 : 400, fontSize: 13, transition: 'all 0.15s',
              })}>
              <iconify-icon icon={item.icon} style={{ fontSize: 19, flexShrink: 0 }} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ padding: '14px 16px', borderTop: '1px solid #f0f4fb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>{user?.name?.[0]?.toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12, color: '#1e293b' }}>{user?.name}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Faculty</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{ width: '100%', padding: '7px', borderRadius: 8, border: 'none', background: '#fef2f2', color: '#ef4444', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Logout</button>
          </div>
        )}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 60, background: '#fff', borderBottom: '1px solid #e8edf5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: '#64748b' }}>
            <iconify-icon icon="solar:hamburger-menu-bold" style={{ fontSize: 18 }} />
          </button>
          <div style={{ background: '#f0fdf8', border: '1px solid #86efac', borderRadius: 20, padding: '4px 14px', color: '#16a34a', fontSize: 12, fontWeight: 600 }}>Faculty Dashboard</div>
        </header>
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f8faff' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
