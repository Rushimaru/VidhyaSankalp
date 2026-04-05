import React, { useEffect, useState } from 'react';
import { materialApi } from '../../utils/api';

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { materialApi.getAll().then(r => setMaterials(r.data)).catch(() => {}).finally(() => setLoading(false)); }, []);

  const filtered = materials.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Study Materials</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>Download and view materials uploaded by your teachers</p>
      </div>
      <div style={{ marginBottom: 20, maxWidth: 360 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or subject..."
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', color: '#94a3b8', padding: 60 }}>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 56, color: '#94a3b8', background: '#fff', borderRadius: 14, border: '1px solid #e8edf5' }}>No materials found.</div>
          ) : filtered.map(m => (
            <div key={m._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8edf5', padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: m.fileType === 'pdf' ? '#fef3c7' : '#f0f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <iconify-icon icon={m.fileType === 'pdf' ? 'solar:file-text-bold' : 'solar:gallery-bold'} style={{ fontSize: 22, color: m.fileType === 'pdf' ? '#d97706' : '#7c3aed' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{m.title}</div>
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{m.subject?.name}</div>
                  {m.description && <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>{m.description}</div>}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>
                  By {m.uploadedBy?.name} · {new Date(m.createdAt).toLocaleDateString('en-IN')}
                </div>
                <a href={`http://localhost:5000${m.fileUrl}`} target="_blank" rel="noreferrer" download
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                  <iconify-icon icon="solar:download-bold" style={{ fontSize: 14 }} /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
