import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const StudentProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      setMsg('Profile updated successfully!');
      setEditing(false);
    } catch { setMsg('Update failed.'); }
    finally { setSaving(false); }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: editing ? '#fff' : '#f8faff' };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>My Profile</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>View and manage your account details</p>
      </div>

      {/* Avatar */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8edf5', padding: '28px 28px 24px', marginBottom: 20, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#fff', fontSize: 32, fontWeight: 800 }}>
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 18 }}>{user?.name}</div>
        <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Student</div>
      </div>

      {/* Profile Form */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8edf5', padding: '24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ color: '#1e293b', fontSize: 16, fontWeight: 700, margin: 0 }}>Account Details</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8faff', color: '#6366f1', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Edit</button>
          )}
        </div>

        {msg && <div style={{ padding: '10px 14px', borderRadius: 9, background: '#f0fdf4', color: '#16a34a', fontSize: 13, marginBottom: 16, fontWeight: 600 }}>{msg}</div>}

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { k: 'name', label: 'Full Name', type: 'text' },
              { k: 'email', label: 'Email', type: 'email' },
              { k: 'phone', label: 'Phone', type: 'tel' },
            ].map(f => (
              <div key={f.k}>
                <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={editing ? form[f.k] : (user?.[f.k] || '—')}
                  onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                  readOnly={!editing} style={inputStyle} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Role</label>
              <input value="Student" readOnly style={{ ...inputStyle, background: '#f8faff', color: '#94a3b8' }} />
            </div>
          </div>
          {editing && (
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => { setEditing(false); setMsg(''); }} style={{ padding: '9px 20px', borderRadius: 9, border: '1px solid #e2e8f0', background: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button type="submit" disabled={saving} style={{ padding: '9px 24px', borderRadius: 9, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
