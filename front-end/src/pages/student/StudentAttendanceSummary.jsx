import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { attendanceApi } from '../../utils/api';

const statusColor = { P: '#10b981', A: '#ef4444', L: '#f59e0b', HD: '#6366f1' };
const statusLabel = { P: 'Present', A: 'Absent', L: 'Late', HD: 'Half Day' };

const StudentAttendanceSummary = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = user?.studentId || user?._id;
    setLoading(true);
    attendanceApi.getSummary(studentId, { month, year })
      .then(r => setData(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [month, year]);

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Attendance Summary</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>Your attendance record by month</p>
      </div>

      {/* Month/Year selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <select value={month} onChange={e => setMonth(+e.target.value)}
          style={{ padding: '9px 14px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', color: '#1e293b', background: '#fff' }}>
          {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
        </select>
        <select value={year} onChange={e => setYear(+e.target.value)}
          style={{ padding: '9px 14px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', color: '#1e293b', background: '#fff' }}>
          {[2024, 2025, 2026].map(y => <option key={y}>{y}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: 60 }}>Loading...</div>
      ) : data ? (
        <>
          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
            {Object.entries(statusLabel).map(([k, label]) => (
              <div key={k} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${statusColor[k]}20`, padding: '16px 18px', textAlign: 'center' }}>
                <div style={{ color: statusColor[k], fontSize: 28, fontWeight: 800 }}>{data.summary[k] || 0}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{label}</div>
              </div>
            ))}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf5', padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ color: '#6366f1', fontSize: 28, fontWeight: 800 }}>{data.percentage}%</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Attendance</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ color: '#1e293b', fontWeight: 700 }}>Overall Attendance</span>
              <span style={{ color: data.percentage >= 75 ? '#10b981' : '#ef4444', fontWeight: 700 }}>{data.percentage}%</span>
            </div>
            <div style={{ height: 10, background: '#f1f5f9', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: `${data.percentage}%`, height: '100%', background: data.percentage >= 75 ? '#10b981' : '#ef4444', borderRadius: 6, transition: 'width 0.5s ease' }} />
            </div>
            {data.percentage < 75 && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>⚠️ Attendance below 75% — At risk!</div>}
          </div>

          {/* Daily Records */}
          {data.dailyRecords?.length > 0 && (
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px' }}>
              <h2 style={{ color: '#1e293b', fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>Daily Records</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
                {data.dailyRecords.map((r, i) => (
                  <div key={i} style={{
                    background: `${statusColor[r.status]}10`, border: `1px solid ${statusColor[r.status]}25`,
                    borderRadius: 10, padding: '10px 12px', textAlign: 'center',
                  }}>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>{new Date(r.date).toLocaleDateString('en-IN', { day:'2-digit', month:'short' })}</div>
                    <div style={{ color: statusColor[r.status], fontWeight: 700, fontSize: 14, marginTop: 4 }}>{r.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: 60, background: '#fff', borderRadius: 14, border: '1px solid #e8edf5' }}>No attendance records for this month.</div>
      )}
    </div>
  );
};

export default StudentAttendanceSummary;
