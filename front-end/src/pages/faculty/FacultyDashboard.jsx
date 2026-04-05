import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { assignmentApi, materialApi, attendanceApi } from '../../utils/api';

const Card = ({ label, value, icon, color, to }) => (
  <Link to={to || '#'} style={{ textDecoration: 'none' }}>
    <div style={{
      background: '#fff', borderRadius: 14, padding: '20px 22px',
      border: `1px solid ${color}20`, boxShadow: `0 2px 12px ${color}10`,
      display: 'flex', alignItems: 'center', gap: 16, transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 2px 12px ${color}10`; }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <iconify-icon icon={icon} style={{ fontSize: 24, color }} />
      </div>
      <div>
        <div style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#1e293b', fontSize: 22, fontWeight: 700 }}>{value ?? '—'}</div>
      </div>
    </div>
  </Link>
);

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    assignmentApi.getAll({ createdBy: user._id }).then(r => setAssignments(r.data)).catch(() => {});
    materialApi.getAll().then(r => setMaterials(r.data)).catch(() => {});
  }, []);

  const pending = assignments.filter(a => new Date(a.dueDate) >= new Date()).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#1e293b', fontSize: 24, fontWeight: 700, margin: 0 }}>Welcome, {user?.name} 👋</h1>
        <p style={{ color: '#64748b', margin: '6px 0 0', fontSize: 14 }}>Here's your teaching portal overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        <Card label="Active Assignments" value={pending} icon="solar:notebook-bold-duotone" color="#6366f1" to="/faculty/assignments" />
        <Card label="Study Materials" value={materials.length} icon="solar:document-bold-duotone" color="#10b981" to="/faculty/materials" />
        <Card label="Total Submissions" value={assignments.reduce((a, x) => a + (x.submissions?.length || 0), 0)} icon="solar:inbox-bold-duotone" color="#f59e0b" to="/faculty/assignments" />
      </div>

      {/* Recent Assignments */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ color: '#1e293b', fontSize: 16, fontWeight: 700, margin: 0 }}>Recent Assignments</h2>
          <Link to="/faculty/assignments" style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
        </div>
        {assignments.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>No assignments created yet.</p>
        ) : assignments.slice(0, 5).map(a => (
          <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ color: '#1e293b', fontWeight: 600, fontSize: 13 }}>{a.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}</div>
            </div>
            <span style={{ background: '#f0f0ff', color: '#6366f1', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
              {a.submissions?.length || 0} submitted
            </span>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { to: '/faculty/attendance', label: 'Mark Attendance', icon: 'solar:users-group-rounded-bold', color: '#10b981' },
          { to: '/faculty/materials', label: 'Upload Material', icon: 'solar:upload-bold', color: '#6366f1' },
          { to: '/faculty/assignments', label: 'Create Assignment', icon: 'solar:add-circle-bold', color: '#f59e0b' },
        ].map(a => (
          <Link key={a.to} to={a.to} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            background: `${a.color}10`, border: `1px solid ${a.color}25`,
            borderRadius: 10, color: a.color, textDecoration: 'none', fontWeight: 600, fontSize: 13,
          }}>
            <iconify-icon icon={a.icon} style={{ fontSize: 18 }} />
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;
