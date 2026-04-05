import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { assignmentApi } from '../../utils/api';

const StudentAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);
  const [files, setFiles] = useState({});

  useEffect(() => { assignmentApi.getAll().then(r => setAssignments(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const isSubmitted = (a) => a.submissions?.some(s => String(s.student) === String(user?._id || user?.studentId));
  const isOverdue = (a) => new Date(a.dueDate) < new Date();

  const handleSubmit = async (assignmentId) => {
    const file = files[assignmentId];
    if (!file) return alert('Please select a file to submit.');
    setSubmitting(assignmentId);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('studentId', user._id);
      await assignmentApi.submit(assignmentId, fd);
      assignmentApi.getAll().then(r => setAssignments(r.data)).catch(() => {});
      setFiles(f => { const nf = { ...f }; delete nf[assignmentId]; return nf; });
    } catch (e) { alert(e.response?.data?.message || 'Submission failed.'); }
    finally { setSubmitting(null); }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Assignments</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>Submit your assignments before the due date</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: 60 }}>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {assignments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 56, color: '#94a3b8', background: '#fff', borderRadius: 14, border: '1px solid #e8edf5' }}>No assignments yet.</div>
          ) : assignments.map(a => {
            const submitted = isSubmitted(a);
            const overdue = isOverdue(a);
            return (
              <div key={a._id} style={{
                background: '#fff', borderRadius: 14,
                border: `1px solid ${submitted ? '#86efac' : overdue ? '#fca5a5' : '#e8edf5'}`,
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>{a.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13, marginTop: 3 }}>{a.subject?.name} · {a.class?.name}</div>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: submitted ? '#f0fdf4' : overdue ? '#fef2f2' : '#fefce8',
                    color: submitted ? '#16a34a' : overdue ? '#ef4444' : '#d97706',
                    alignSelf: 'flex-start',
                  }}>
                    {submitted ? '✅ Submitted' : overdue ? '❌ Overdue' : '⏳ Pending'}
                  </span>
                </div>
                {a.description && <div style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>{a.description}</div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Due: {new Date(a.dueDate).toLocaleDateString('en-IN')} · Max marks: {a.maxMarks}</div>
                  {!submitted && !overdue && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input type="file" onChange={e => setFiles(f => ({ ...f, [a._id]: e.target.files[0] }))}
                        style={{ fontSize: 12, color: '#64748b' }} />
                      <button onClick={() => handleSubmit(a._id)} disabled={submitting === a._id}
                        style={{ padding: '7px 18px', borderRadius: 9, border: 'none', background: submitting === a._id ? '#94a3b8' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', cursor: submitting === a._id ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
                        {submitting === a._id ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
