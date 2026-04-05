import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { assignmentApi, institutionApi } from '../../utils/api';

const CreateAssignment = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', class: '', subject: '', section: '', dueDate: '', maxMarks: 100 });

  const load = () => assignmentApi.getAll({ createdBy: user._id }).then(r => setAssignments(r.data)).catch(() => {});
  useEffect(() => {
    load();
    institutionApi.getClasses().then(r => setClasses(r.data)).catch(() => {});
  }, []);
  useEffect(() => {
    if (form.class) institutionApi.getSubjects({ class: form.class }).then(r => setSubjects(r.data)).catch(() => {});
  }, [form.class]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await assignmentApi.create(form);
      setShowForm(false);
      setForm({ title: '', description: '', class: '', subject: '', section: '', dueDate: '', maxMarks: 100 });
      load();
    } catch (e) { alert(e.response?.data?.message || 'Error creating assignment.'); }
    finally { setSaving(false); }
  };

  const inputStyle = { width: '100%', padding: '9px 13px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff' };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Assignments</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>Create and manage assignments for your classes</p>
        </div>
        <button onClick={() => setShowForm(p => !p)} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', padding: '10px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <iconify-icon icon="solar:add-circle-bold" style={{ fontSize: 18 }} /> Create Assignment
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px', marginBottom: 20 }}>
          <h3 style={{ color: '#1e293b', fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>New Assignment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px 20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Title *</label>
              <input required value={form.title} onChange={e => set('title', e.target.value)} style={inputStyle} placeholder="Assignment title" />
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Class *</label>
              <select required value={form.class} onChange={e => set('class', e.target.value)} style={inputStyle}>
                <option value="">Select class</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Subject *</label>
              <select required value={form.subject} onChange={e => set('subject', e.target.value)} style={inputStyle}>
                <option value="">Select subject</option>
                {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Due Date *</label>
              <input required type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Max Marks</label>
              <input type="number" value={form.maxMarks} onChange={e => set('maxMarks', e.target.value)} style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
              <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder="Assignment instructions..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '9px 20px', borderRadius: 9, border: '1px solid #e2e8f0', background: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ padding: '9px 24px', borderRadius: 9, border: 'none', background: saving ? '#94a3b8' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700 }}>{saving ? 'Saving...' : 'Create'}</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {assignments.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 56, color: '#94a3b8', background: '#fff', borderRadius: 14, border: '1px solid #e8edf5' }}>No assignments yet.</div>
        ) : assignments.map(a => (
          <div key={a._id} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${isOverdue(a.dueDate) ? '#fca5a5' : '#e8edf5'}`, padding: '16px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{a.title}</div>
              <span style={{ background: isOverdue(a.dueDate) ? '#fef2f2' : '#f0fdf4', color: isOverdue(a.dueDate) ? '#ef4444' : '#10b981', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
                {isOverdue(a.dueDate) ? 'Overdue' : 'Active'}
              </span>
            </div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 10 }}>{a.subject?.name} · {a.class?.name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}</div>
              <button onClick={() => setViewing(a)} style={{ padding: '5px 12px', borderRadius: 8, background: '#f0f0ff', color: '#6366f1', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                View Submissions ({a.submissions?.length || 0})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submission view modal */}
      {viewing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 540, maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#1e293b', fontSize: 17, fontWeight: 700, margin: 0 }}>{viewing.title} — Submissions</h3>
              <button onClick={() => setViewing(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
            {(!viewing.submissions || viewing.submissions.length === 0) ? (
              <p style={{ color: '#94a3b8' }}>No submissions yet.</p>
            ) : viewing.submissions.map(sub => (
              <div key={sub._id} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{sub.student?.fullName || 'Student'}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{new Date(sub.submittedAt).toLocaleDateString('en-IN')}</div>
                </div>
                <a href={`http://localhost:5000${sub.fileUrl}`} target="_blank" rel="noreferrer" style={{ padding: '5px 12px', borderRadius: 8, background: '#f0f0ff', color: '#6366f1', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>Download</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAssignment;
