import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { materialApi, institutionApi } from '../../utils/api';

const UploadMaterial = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', class: '', subject: '', section: '' });
  const [file, setFile] = useState(null);

  const load = () => {
    materialApi.getAll().then(r => setMaterials(r.data)).catch(() => {});
    institutionApi.getClasses().then(r => setClasses(r.data)).catch(() => {});
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (form.class) institutionApi.getSubjects({ class: form.class }).then(r => setSubjects(r.data)).catch(() => {});
  }, [form.class]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file.');
    setUploading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('file', file);
      await materialApi.upload(fd);
      setShowForm(false);
      setFile(null);
      setForm({ title: '', description: '', class: '', subject: '', section: '' });
      load();
    } catch (e) { alert(e.response?.data?.message || 'Upload failed.'); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this material?')) return;
    await materialApi.delete(id);
    load();
  };

  const inputStyle = { width: '100%', padding: '9px 13px', borderRadius: 9, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box', color: '#1e293b', background: '#fff' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Study Materials</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>Upload PDFs and images for your students</p>
        </div>
        <button onClick={() => setShowForm(p => !p)} style={{ background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', padding: '10px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <iconify-icon icon="solar:upload-bold" style={{ fontSize: 18 }} /> Upload Material
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <form onSubmit={handleUpload} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', padding: '20px 24px', marginBottom: 20 }}>
          <h3 style={{ color: '#1e293b', fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>Upload New Material</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px 20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Title *</label>
              <input required value={form.title} onChange={e => set('title', e.target.value)} style={inputStyle} placeholder="Chapter 3 Notes" />
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Class</label>
              <select value={form.class} onChange={e => set('class', e.target.value)} style={{ ...inputStyle }}>
                <option value="">Select class</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Subject *</label>
              <select required value={form.subject} onChange={e => set('subject', e.target.value)} style={{ ...inputStyle }}>
                <option value="">Select subject</option>
                {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Section</label>
              <input value={form.section} onChange={e => set('section', e.target.value)} style={inputStyle} placeholder="A (leave blank for all)" />
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</label>
              <input value={form.description} onChange={e => set('description', e.target.value)} style={inputStyle} placeholder="Optional description" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: '#64748b', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>File * (PDF or Image, max 10MB)</label>
              <input type="file" required accept=".pdf,.jpg,.jpeg,.png,.gif"
                onChange={e => setFile(e.target.files[0])}
                style={{ ...inputStyle, padding: '7px', cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '9px 20px', borderRadius: 9, border: '1px solid #e2e8f0', background: 'transparent', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button type="submit" disabled={uploading} style={{ padding: '9px 24px', borderRadius: 9, border: 'none', background: uploading ? '#94a3b8' : 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 700 }}>{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </form>
      )}

      {/* Materials List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {materials.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 56, color: '#94a3b8', background: '#fff', borderRadius: 14, border: '1px solid #e8edf5' }}>
            No materials uploaded yet.
          </div>
        ) : materials.map(m => (
          <div key={m._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf5', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: m.fileType === 'pdf' ? '#fef3c7' : '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <iconify-icon icon={m.fileType === 'pdf' ? 'solar:file-text-bold' : 'solar:gallery-bold'} style={{ fontSize: 20, color: m.fileType === 'pdf' ? '#d97706' : '#7c3aed' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{m.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{m.subject?.name} · {m.class?.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: 11 }}>{new Date(m.createdAt).toLocaleDateString('en-IN')}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={`http://localhost:5000${m.fileUrl}`} target="_blank" rel="noreferrer" style={{ padding: '5px 12px', borderRadius: 8, background: '#f0f0ff', color: '#6366f1', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</a>
                <button onClick={() => handleDelete(m._id)} style={{ padding: '5px 12px', borderRadius: 8, background: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadMaterial;
