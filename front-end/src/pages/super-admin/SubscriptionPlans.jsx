import React, { useEffect, useState } from 'react';
import { superAdminApi } from '../../utils/api';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => superAdminApi.getPlans().then(r => setPlans(r.data)).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSave = async (plan) => {
    try {
      if (plan._id) await superAdminApi.upsertPlan(plan._id, plan);
      else await superAdminApi.createPlan(plan);
      setEditing(null);
      load();
    } catch (e) { alert(e.response?.data?.message || 'Error saving plan.'); }
  };

  const featureColors = { Basic: '#22d3ee', Pro: '#a78bfa' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Subscription Plans</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', fontSize: 13 }}>Manage Basic & Pro plan limits and pricing</p>
        </div>
      </div>

      {loading ? (
        <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 60 }}>Loading plans...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {plans.map(plan => (
            <div key={plan._id} style={{
              background: `linear-gradient(135deg, rgba(26,29,46,0.95) 0%, rgba(18,20,31,0.95) 100%)`,
              border: `1px solid ${featureColors[plan.name] || '#6366f1'}30`,
              borderRadius: 18, padding: 28, position: 'relative', overflow: 'hidden',
              boxShadow: `0 8px 32px ${featureColors[plan.name] || '#6366f1'}10`,
            }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `${featureColors[plan.name] || '#6366f1'}15`, filter: 'blur(30px)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ color: featureColors[plan.name] || '#6366f1', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>₹{plan.price?.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/mo</span></div>
                </div>
                <button onClick={() => setEditing({ ...plan })} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 12,
                }}>Edit</button>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{plan.maxStudents?.toLocaleString()}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 2 }}>Max Students</div>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{plan.maxFaculty}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 2 }}>Max Faculty</div>
                </div>
              </div>
              <div>
                {(plan.features || []).map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <iconify-icon icon="solar:check-circle-bold" style={{ fontSize: 16, color: featureColors[plan.name] || '#6366f1', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#1a1d2e', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 16, padding: '28px', width: '100%', maxWidth: 500 }}>
            <h3 style={{ color: '#fff', margin: '0 0 20px', fontSize: 18 }}>Edit: {editing.name} Plan</h3>
            {[
              { k: 'price', label: 'Price (₹/month)', type: 'number' },
              { k: 'maxStudents', label: 'Max Students', type: 'number' },
              { k: 'maxFaculty', label: 'Max Faculty', type: 'number' },
              { k: 'description', label: 'Description', type: 'text' },
            ].map(f => (
              <div key={f.k} style={{ marginBottom: 14 }}>
                <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={editing[f.k] || ''} onChange={e => setEditing(p => ({ ...p, [f.k]: e.target.value }))}
                  style={{ width: '100%', padding: '9px 13px', borderRadius: 9, boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, outline: 'none' }} />
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Features (one per line)</label>
              <textarea rows={6} value={(editing.features || []).join('\n')}
                onChange={e => setEditing(p => ({ ...p, features: e.target.value.split('\n').filter(Boolean) }))}
                style={{ width: '100%', padding: '9px 13px', borderRadius: 9, boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, outline: 'none', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setEditing(null)} style={{ padding: '9px 20px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleSave(editing)} style={{ padding: '9px 24px', borderRadius: 9, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
