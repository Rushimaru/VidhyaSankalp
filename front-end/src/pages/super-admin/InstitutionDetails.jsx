import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { superAdminApi } from '../../utils/api';

const InfoRow = ({ label, value }) => (
  <div style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, width: 160, flexShrink: 0 }}>{label}</span>
    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{value || '—'}</span>
  </div>
);

const statusColor = { paid: '#34d399', pending: '#f59e0b', overdue: '#ef4444' };

const InstitutionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    superAdminApi.getInstitution(id)
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleToggle = async () => {
    try {
      const res = await superAdminApi.toggleInstitution(id);
      setData(prev => ({ ...prev, institution: { ...prev.institution, isActive: res.data.isActive } }));
    } catch (e) { alert(e.response?.data?.message || 'Error'); }
  };

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 80 }}>Loading...</div>;
  if (!data) return <div style={{ color: '#ef4444', textAlign: 'center', padding: 80 }}>Institution not found.</div>;

  const { institution, payments } = data;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16,
      }}>
        <iconify-icon icon="solar:arrow-left-bold" /> Back to Institutions
      </button>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)',
        border: '1px solid rgba(99,102,241,0.25)', borderRadius: 16, padding: '24px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>{institution.name}</h1>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(99,102,241,0.2)', color: '#a78bfa', borderRadius: 20, padding: '2px 12px', fontSize: 12, fontWeight: 600 }}>{institution.code}</span>
            <span style={{ background: institution.isActive ? 'rgba(52,211,153,0.15)' : 'rgba(239,68,68,0.15)', color: institution.isActive ? '#34d399' : '#ef4444', borderRadius: 20, padding: '2px 12px', fontSize: 12, fontWeight: 700 }}>
              {institution.isActive ? '● Active' : '● Inactive'}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', borderRadius: 20, padding: '2px 12px', fontSize: 12 }}>
              {institution.subscriptionStatus}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate(`/super-admin/institutions/${id}/edit`)} style={{
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            color: '#6366f1', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>Edit</button>
          <button onClick={handleToggle} style={{
            background: institution.isActive ? 'rgba(239,68,68,0.12)' : 'rgba(52,211,153,0.12)',
            border: `1px solid ${institution.isActive ? 'rgba(239,68,68,0.3)' : 'rgba(52,211,153,0.3)'}`,
            color: institution.isActive ? '#ef4444' : '#34d399',
            borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 13,
          }}>{institution.isActive ? 'Deactivate' : 'Activate'}</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Institution Info */}
        <div style={{ background: 'rgba(26,29,46,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 24px' }}>
          <h3 style={{ color: '#a78bfa', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 16px' }}>Institution Info</h3>
          <InfoRow label="Type" value={institution.type} />
          <InfoRow label="Phone" value={institution.phone} />
          <InfoRow label="Email" value={institution.email} />
          <InfoRow label="Website" value={institution.website} />
          <InfoRow label="Address" value={[institution.address, institution.city, institution.state, institution.pincode].filter(Boolean).join(', ')} />
        </div>

        {/* Subscription */}
        <div style={{ background: 'rgba(26,29,46,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 24px' }}>
          <h3 style={{ color: '#a78bfa', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 16px' }}>Subscription</h3>
          <InfoRow label="Plan" value={institution.subscriptionPlan?.name || 'None'} />
          <InfoRow label="Status" value={institution.subscriptionStatus} />
          <InfoRow label="Expiry" value={institution.subscriptionExpiry ? new Date(institution.subscriptionExpiry).toLocaleDateString('en-IN') : '—'} />
          <InfoRow label="Admin User" value={institution.adminUser?.name} />
          <InfoRow label="Admin Email" value={institution.adminUser?.email} />
        </div>
      </div>

      {/* Payment History */}
      <div style={{ background: 'rgba(26,29,46,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 24px' }}>
        <h3 style={{ color: '#a78bfa', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 18px' }}>Payment History</h3>
        {payments.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', margin: 0 }}>No payment records yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Amount', 'Mode', 'Status', 'Ref #'].map(h => (
                  <th key={h} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, padding: '8px 12px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id}>
                  <td style={{ color: 'rgba(255,255,255,0.7)', padding: '10px 12px', fontSize: 13 }}>{new Date(p.dueDate).toLocaleDateString('en-IN')}</td>
                  <td style={{ color: '#fff', padding: '10px 12px', fontWeight: 600 }}>₹{p.amount.toLocaleString()}</td>
                  <td style={{ color: 'rgba(255,255,255,0.5)', padding: '10px 12px', fontSize: 13, textTransform: 'capitalize' }}>{p.paymentMode || '—'}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: `${statusColor[p.status]}15`, color: statusColor[p.status], borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, textTransform: 'capitalize' }}>{p.status}</span>
                  </td>
                  <td style={{ color: 'rgba(255,255,255,0.4)', padding: '10px 12px', fontSize: 12 }}>{p.transactionRef || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InstitutionDetails;
