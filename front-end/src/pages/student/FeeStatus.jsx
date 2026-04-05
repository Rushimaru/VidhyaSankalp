import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { feeApi } from '../../utils/api';

const statusColor = { paid: '#10b981', partial: '#f59e0b', pending: '#6366f1', overdue: '#ef4444' };

const FeeStatus = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = user?.studentId || user?._id;
    feeApi.getAll({ student: studentId }).then(r => setFees(r.data)).catch(() => {});
    feeApi.getSummary().then(r => setSummary(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', color: '#94a3b8', padding: 60 }}>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#1e293b', fontSize: 22, fontWeight: 700, margin: 0 }}>Fee Status</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 13 }}>View your fee records and payment history</p>
      </div>

      {/* Summary cards */}
      {summary && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { label: 'Total Due', value: `₹${(summary.totalDue || 0).toLocaleString()}`, color: '#6366f1' },
            { label: 'Paid', value: `₹${(summary.totalCollected || 0).toLocaleString()}`, color: '#10b981' },
            { label: 'Outstanding', value: `₹${(summary.outstanding || 0).toLocaleString()}`, color: '#ef4444' },
          ].map(c => (
            <div key={c.label} style={{ background: '#fff', borderRadius: 12, border: `1px solid ${c.color}20`, padding: '16px 18px' }}>
              <div style={{ color: '#64748b', fontSize: 12 }}>{c.label}</div>
              <div style={{ color: c.color, fontSize: 22, fontWeight: 800, marginTop: 4 }}>{c.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Fee Records */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf5', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ color: '#1e293b', fontSize: 15, fontWeight: 700, margin: 0 }}>Fee Records</h2>
        </div>
        {fees.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 50 }}>No fee records found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['Fee Type', 'Amount', 'Due Date', 'Paid', 'Status'].map(h => (
                  <th key={h} style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600, padding: '12px 20px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fees.map((f, i) => (
                <tr key={f._id} style={{ borderBottom: i < fees.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <td style={{ padding: '13px 20px', color: '#1e293b', fontWeight: 600, fontSize: 13 }}>{f.feeType}</td>
                  <td style={{ padding: '13px 20px', color: '#1e293b', fontSize: 13 }}>₹{f.netAmount?.toLocaleString()}</td>
                  <td style={{ padding: '13px 20px', color: '#64748b', fontSize: 13 }}>{new Date(f.dueDate).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding: '13px 20px', color: '#10b981', fontSize: 13, fontWeight: 600 }}>₹{(f.paidAmount || 0).toLocaleString()}</td>
                  <td style={{ padding: '13px 20px' }}>
                    <span style={{ background: `${statusColor[f.status]}15`, color: statusColor[f.status], borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, textTransform: 'capitalize' }}>{f.status}</span>
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

export default FeeStatus;
