import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { superAdminApi } from '../../utils/api';

const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{
    background: 'linear-gradient(135deg, rgba(26,29,46,0.95) 0%, rgba(18,20,31,0.95) 100%)',
    border: `1px solid ${color}30`, borderRadius: 16, padding: '24px 28px',
    display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 200,
    boxShadow: `0 4px 24px ${color}15`,
  }}>
    <div style={{
      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
      background: `linear-gradient(135deg, ${color}25, ${color}10)`,
      border: `1px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <iconify-icon icon={icon} style={{ fontSize: 26, color }} />
    </div>
    <div>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 6 }}>{label}</div>
      <div style={{ color: '#fff', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{value ?? '—'}</div>
      {sub && <div style={{ color, fontSize: 12, marginTop: 6, fontWeight: 600 }}>{sub}</div>}
    </div>
  </div>
);

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    superAdminApi.getStats()
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Institutions', value: stats.totalInstitutions, icon: 'solar:buildings-3-bold-duotone', color: '#6366f1', sub: `${stats.activeInstitutions} Active` },
    { label: 'Total Students', value: stats.totalStudents?.toLocaleString(), icon: 'solar:users-group-rounded-bold-duotone', color: '#22d3ee', sub: 'Across all schools' },
    { label: 'Total Faculty', value: stats.totalTeachers?.toLocaleString(), icon: 'solar:user-check-rounded-bold-duotone', color: '#a78bfa', sub: 'All institutions' },
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: 'solar:card-recive-bold-duotone', color: '#34d399', sub: 'Collected payments' },
    { label: 'Expiring Soon', value: stats.expiringIn7Days, icon: 'solar:alarm-bold-duotone', color: '#f59e0b', sub: 'Within 7 days' },
  ] : [];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: 0 }}>Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', margin: '6px 0 0', fontSize: 14 }}>
          VidhyaSankalp platform overview — manage all institutions from here
        </p>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 60 }}>Loading stats...</div>
      ) : (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 36 }}>
          {cards.map(c => <StatCard key={c.label} {...c} />)}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(26,29,46,0.8)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16, padding: '24px 28px', marginBottom: 28,
      }}>
        <h2 style={{ color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 20px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {[
            { to: '/super-admin/institutions/add', icon: 'solar:building-bold', label: 'Add Institution', color: '#6366f1' },
            { to: '/super-admin/payments', icon: 'solar:card-recive-bold', label: 'Record Payment', color: '#34d399' },
            { to: '/super-admin/plans', icon: 'solar:diploma-bold', label: 'Manage Plans', color: '#a78bfa' },
          ].map(action => (
            <Link key={action.to} to={action.to} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
              background: `${action.color}15`, border: `1px solid ${action.color}30`,
              borderRadius: 12, color: action.color, textDecoration: 'none',
              fontWeight: 600, fontSize: 14, transition: 'all 0.2s',
            }}>
              <iconify-icon icon={action.icon} style={{ fontSize: 20 }} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Warning banner if expiring soon */}
      {stats?.expiringIn7Days > 0 && (
        <div style={{
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 12, padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <iconify-icon icon="solar:danger-triangle-bold" style={{ fontSize: 22, color: '#f59e0b' }} />
          <div>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>{stats.expiringIn7Days} institution(s)</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 6 }}>
              have subscriptions expiring within 7 days. 
            </span>
            <Link to="/super-admin/institutions" style={{ color: '#f59e0b', marginLeft: 6, textDecoration: 'underline', fontSize: 13 }}>
              View all →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
