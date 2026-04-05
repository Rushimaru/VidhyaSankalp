import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { superAdminApi } from '../../utils/api';

const Badge = ({ active }) => (
  <span style={{
    padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
    background: active ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)',
    color: active ? '#34d399' : '#ef4444',
    border: `1px solid ${active ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}`,
  }}>{active ? '● Active' : '● Inactive'}</span>
);

const SubBadge = ({ status }) => {
  const colors = { active: '#34d399', trial: '#f59e0b', expired: '#ef4444' };
  const c = colors[status] || '#6b7280';
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: `${c}15`, color: c, border: `1px solid ${c}30`, textTransform: 'capitalize',
    }}>{status}</span>
  );
};

const InstitutionList = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    superAdminApi.getInstitutions()
      .then(r => setInstitutions(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleToggle = async (id) => {
    try {
      await superAdminApi.toggleInstitution(id);
      load();
    } catch (e) { alert(e.response?.data?.message || 'Error'); }
  };

  const filtered = institutions.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Institutions</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', fontSize: 13 }}>
            {institutions.length} institution{institutions.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <Link to="/super-admin/institutions/add" style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff',
          padding: '10px 20px', borderRadius: 10, textDecoration: 'none',
          fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <iconify-icon icon="solar:add-circle-bold" style={{ fontSize: 18 }} />
          Add Institution
        </Link>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ position: 'relative', maxWidth: 360 }}>
          <iconify-icon icon="solar:magnifer-bold" style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'rgba(255,255,255,0.3)', fontSize: 18,
          }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or code..."
            style={{
              width: '100%', padding: '10px 14px 10px 42px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
            }} />
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'rgba(26,29,46,0.8)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 60 }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 60 }}>
            {search ? 'No matching institutions.' : 'No institutions yet. Add the first one!'}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Institution', 'Code / Type', 'Plan', 'Subscription', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, padding: '14px 20px', textAlign: 'left', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inst, idx) => (
                <tr key={inst._id} style={{
                  borderBottom: idx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  transition: 'background 0.15s',
                }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{inst.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>{inst.email}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{inst.code}</div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{inst.type}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                    {inst.subscriptionPlan?.name || '—'}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <SubBadge status={inst.subscriptionStatus} />
                    {inst.subscriptionExpiry && (
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 4 }}>
                        Exp: {new Date(inst.subscriptionExpiry).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px' }}><Badge active={inst.isActive} /></td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => navigate(`/super-admin/institutions/${inst._id}`)}
                        style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#6366f1', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                        View
                      </button>
                      <button onClick={() => handleToggle(inst._id)}
                        style={{
                          background: inst.isActive ? 'rgba(239,68,68,0.12)' : 'rgba(52,211,153,0.12)',
                          border: `1px solid ${inst.isActive ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)'}`,
                          color: inst.isActive ? '#ef4444' : '#34d399',
                          borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                        }}>
                        {inst.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InstitutionList;
