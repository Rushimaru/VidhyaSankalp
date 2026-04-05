import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { attendanceApi, assignmentApi, feeApi } from '../../utils/api';

const Card = ({ label, value, icon, color, to }) => (
  <Link to={to || '#'} style={{ textDecoration: 'none' }}>
    <div style={{
      background: '#fff', borderRadius: 14, padding: '20px 22px',
      border: `1px solid ${color}20`, boxShadow: `0 2px 12px ${color}08`,
      display: 'flex', alignItems: 'center', gap: 16, transition: 'box-shadow 0.2s',
    }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <iconify-icon icon={icon} style={{ fontSize: 24, color }} />
      </div>
      <div>
        <div style={{ color: '#64748b', fontSize: 13 }}>{label}</div>
        <div style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, marginTop: 3 }}>{value ?? '—'}</div>
      </div>
    </div>
  </Link>
);

const StudentDashboard = () => {
  const { user } = useAuth();
  const [attendanceData, setAttendanceData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [feeSummary, setFeeSummary] = useState(null);

  useEffect(() => {
    const studentId = user?.studentId || user?._id;
    attendanceApi.getSummary(studentId).then(r => setAttendanceData(r.data)).catch(() => {});
    assignmentApi.getAll().then(r => setAssignments(r.data)).catch(() => {});
    feeApi.getSummary().then(r => setFeeSummary(r.data)).catch(() => {});
  }, []);

  const pending = assignments.filter(a => {
    const submitted = a.submissions?.find(s => s.student === user?.studentId || s.student === user?._id);
    return !submitted && new Date(a.dueDate) >= new Date();
  }).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#1e293b', fontSize: 24, fontWeight: 700, margin: 0 }}>Hello, {user?.name} 👋</h1>
        <p style={{ color: '#64748b', margin: '6px 0 0', fontSize: 14 }}>Welcome to your student portal</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        <Card label="Attendance" value={`${attendanceData?.percentage || 0}%`} icon="solar:calendar-check-bold-duotone" color="#10b981" to="/student/attendance" />
        <Card label="Pending Assignments" value={pending} icon="solar:notebook-bold-duotone" color="#f59e0b" to="/student/assignments" />
        <Card label="Fees Due" value={feeSummary ? `₹${(feeSummary.outstanding || 0).toLocaleString()}` : '—'} icon="solar:card-recive-bold-duotone" color="#ef4444" to="/student/fees" />
      </div>

      {/* Recent Assignments */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ color: '#1e293b', fontSize: 16, fontWeight: 700, margin: 0 }}>Upcoming Assignments</h2>
          <Link to="/student/assignments" style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
        </div>
        {assignments.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>No assignments yet.</p>
        ) : assignments.slice(0, 5).map(a => (
          <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #f8fafc' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{a.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{a.subject?.name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: new Date(a.dueDate) < new Date() ? '#ef4444' : '#f59e0b', fontSize: 12, fontWeight: 600 }}>
                Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { to: '/student/materials', label: 'Study Materials', icon: 'solar:document-bold', color: '#6366f1' },
          { to: '/student/attendance', label: 'View Attendance', icon: 'solar:calendar-check-bold', color: '#10b981' },
          { to: '/student/fees', label: 'Fee Status', icon: 'solar:card-recive-bold', color: '#ef4444' },
        ].map(a => (
          <Link key={a.to} to={a.to} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            background: `${a.color}10`, border: `1px solid ${a.color}25`,
            borderRadius: 10, color: a.color, textDecoration: 'none', fontWeight: 600, fontSize: 13,
          }}>
            <iconify-icon icon={a.icon} style={{ fontSize: 18 }} /> {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
