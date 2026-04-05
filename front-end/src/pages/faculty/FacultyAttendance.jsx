import React, { useEffect, useState } from 'react';
import { institutionApi, studentApi, attendanceApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const FacultyAttendance = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [form, setForm] = useState({ class: '', section: '', date: new Date().toISOString().split('T')[0] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { institutionApi.getClasses().then(r => setClasses(r.data)).catch(() => {}); }, []);

  const loadStudents = async () => {
    if (!form.class || !form.section) return;
    const res = await studentApi.getAll({ class: form.class, section: form.section });
    const list = res.data;
    setStudents(list);
    const init = {};
    list.forEach(s => { init[s._id] = 'P'; });
    setAttendance(init);
    setSaved(false);
  };

  useEffect(() => { loadStudents(); }, [form.class, form.section]);

  const handleMark = (studentId, status) => setAttendance(p => ({ ...p, [studentId]: status }));

  const handleSubmit = async () => {
    if (!students.length) return;
    setSaving(true);
    try {
      const records = students.map(s => ({ student: s._id, status: attendance[s._id] || 'P' }));
      await attendanceApi.mark({ class: form.class, section: form.section, date: form.date, records });
      setSaved(true);
    } catch (e) { alert('Error: ' + (e.response?.data?.message || 'Failed to mark attendance.')); }
    finally { setSaving(false); }
  };

  const statusOpts = [
    { v: 'P', label: 'Present', color: '#10b981' },
    { v: 'A', label: 'Absent', color: '#ef4444' },
    { v: 'L', label: 'Late', color: '#f59e0b' },
    { v: 'HD', label: 'Half Day', color: '#6366f1' },
  ];

  const selectedClass = classes.find(c => c._id === form.class);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Mark Attendance</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>Select class, section and date to mark student attendance</p>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px', marginBottom: 20, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Class</label>
          <select value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value, section: '' }))}
            style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff' }}>
            <option value="">Select class</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Section</label>
          <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))}
            style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff' }}
            disabled={!selectedClass}>
            <option value="">Select section</option>
            {(selectedClass?.sections || []).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Date</label>
          <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* Student list */}
      {students.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>{students.length} Students</span>
              <span style={{ color: '#64748b', fontSize: 13, marginLeft: 10 }}>— {new Date(form.date).toDateString()}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { const a = {}; students.forEach(s => a[s._id] = 'P'); setAttendance(a); }} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #86efac', background: '#f0fdf4', color: '#16a34a', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>All Present</button>
              <button onClick={() => { const a = {}; students.forEach(s => a[s._id] = 'A'); setAttendance(a); }} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #fca5a5', background: '#fef2f2', color: '#dc2626', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>All Absent</button>
            </div>
          </div>
          {students.map((s, i) => (
            <div key={s._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 24px', borderBottom: i < students.length - 1 ? '1px solid #f8fafc' : 'none', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>
                  {s.fullName?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{s.fullName}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>Adm: {s.admissionNo}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {statusOpts.map(opt => (
                  <button key={opt.v} onClick={() => handleMark(s._id, opt.v)} style={{
                    padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                    background: attendance[s._id] === opt.v ? opt.color : 'transparent',
                    color: attendance[s._id] === opt.v ? '#fff' : opt.color,
                    border: `1px solid ${attendance[s._id] === opt.v ? opt.color : opt.color + '50'}`,
                  }}>{opt.v}</button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            {saved && <span style={{ color: '#10b981', fontSize: 13, fontWeight: 600, alignSelf: 'center' }}>✅ Saved!</span>}
            <button onClick={handleSubmit} disabled={saving} style={{
              padding: '10px 28px', borderRadius: 10, border: 'none',
              background: saving ? '#94a3b8' : 'linear-gradient(135deg,#10b981,#059669)',
              color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14,
            }}>{saving ? 'Saving...' : 'Submit Attendance'}</button>
          </div>
        </div>
      )}

      {students.length === 0 && form.class && form.section && (
        <div style={{ textAlign: 'center', padding: 56, color: '#94a3b8', background: '#fff', borderRadius: 14, border: '1px solid #e8edf5' }}>
          No students found for this class/section.
        </div>
      )}
    </div>
  );
};

export default FacultyAttendance;
