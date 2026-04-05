import React, { useEffect, useState } from 'react';
import { superAdminApi } from '../../utils/api';

const statusColor = { paid: '#34d399', pending: '#f59e0b', overdue: '#ef4444' };

const PaymentTracking = () => {
  const [payments, setPayments] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    institution: '', subscriptionPlan: '', amount: '', dueDate: '', paymentDate: '',
    status: 'paid', paymentMode: 'bank_transfer', transactionRef: '', notes: '',
  });

  const load = () => Promise.all([
    superAdminApi.getPayments(), superAdminApi.getInstitutions(), superAdminApi.getPlans(),
  ]).then(([p, i, pl]) => {
    setPayments(p.data); setInstitutions(i.data); setPlans(pl.data);
  }).catch(console.error).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await superAdminApi.recordPayment(form);
      setShowForm(false);
      setForm({ institution: '', subscriptionPlan: '', amount: '', dueDate: '', paymentDate: '', status: 'paid', paymentMode: 'bank_transfer', transactionRef: '', notes: '' });
      load();
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  const iS = { width: '100%', padding: '9px 13px', borderRadius: 9, boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, outline: 'none' };

  const totals = payments.reduce((a, p) => { a.total += p.amount; if (p.status === 'paid') a.collected += p.amount; return a; }, { total: 0, collected: 0 });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Payment Tracking</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', fontSize: 13 }}>Manual payment records for subscriptions</p>
        </div>
        <button onClick={() => setShowForm(p => !p)} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', padding: '10px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <iconify-icon icon="solar:add-circle-bold" style={{ fontSize: 18 }} /> Record Payment
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Billed', value: `₹${totals.total.toLocaleString()}`, color: '#6366f1' },
          { label: 'Collected', value: `₹${totals.collected.toLocaleString()}`, color: '#34d399' },
          { label: 'Outstanding', value: `₹${(totals.total - totals.collected).toLocaleString()}`, color: '#f59e0b' },
          { label: 'Records', value: payments.length, color: '#a78bfa' },
        ].map(c => (
          <div key={c.label} style={{ background: 'rgba(26,29,46,0.8)', border: `1px solid ${c.color}20`, borderRadius: 12, padding: '16px 22px', flex: 1, minWidth: 150 }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{c.label}</div>
            <div style={{ color: c.color, fontSize: 22, fontWeight: 700, marginTop: 4 }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'rgba(26,29,46,0.9)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 14, padding: '20px 24px', marginBottom: 24 }}>
          <h3 style={{ color: '#a78bfa', margin: '0 0 18px', fontSize: 15, fontWeight: 700 }}>Record New Payment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px 20px' }}>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Institution *</label>
              <select required value={form.institution} onChange={e => set('institution', e.target.value)} style={{ ...iS, background: 'rgba(18,20,31,0.9)' }}>
                <option value="">Select...</option>{institutions.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
              </select></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Plan *</label>
              <select required value={form.subscriptionPlan} onChange={e => set('subscriptionPlan', e.target.value)} style={{ ...iS, background: 'rgba(18,20,31,0.9)' }}>
                <option value="">Select...</option>{plans.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Amount (₹) *</label>
              <input required type="number" value={form.amount} onChange={e => set('amount', e.target.value)} style={iS} placeholder="7999" /></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Due Date *</label>
              <input required type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} style={iS} /></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} style={{ ...iS, background: 'rgba(18,20,31,0.9)' }}>
                <option value="paid">Paid</option><option value="pending">Pending</option><option value="overdue">Overdue</option>
              </select></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Mode</label>
              <select value={form.paymentMode} onChange={e => set('paymentMode', e.target.value)} style={{ ...iS, background: 'rgba(18,20,31,0.9)' }}>
                <option value="bank_transfer">Bank Transfer</option><option value="upi">UPI</option><option value="cheque">Cheque</option><option value="cash">Cash</option>
              </select></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Reference</label>
              <input value={form.transactionRef} onChange={e => set('transactionRef', e.target.value)} style={iS} placeholder="UTR / Cheque No" /></div>
            <div><label style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'block', marginBottom: 6 }}>Notes</label>
              <input value={form.notes} onChange={e => set('notes', e.target.value)} style={iS} placeholder="Optional notes" /></div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '9px 20px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button type="submit" style={{ padding: '9px 24px', borderRadius: 9, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Save</button>
          </div>
        </form>
      )}

      {/* Table */}
      <div style={{ background: 'rgba(26,29,46,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        {loading ? <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 60 }}>Loading...</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Institution', 'Plan', 'Amount', 'Due Date', 'Mode', 'Status', 'Ref'].map(h => (
                <th key={h} style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, padding: '13px 18px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}</tr></thead>
            <tbody>
              {payments.length === 0 ? <tr><td colSpan={7} style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: 50 }}>No payments yet.</td></tr> :
                payments.map((p, i) => (
                  <tr key={p._id} style={{ borderBottom: i < payments.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <td style={{ padding: '13px 18px', color: '#fff', fontSize: 13, fontWeight: 600 }}>{p.institution?.name || '—'}</td>
                    <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{p.subscriptionPlan?.name || '—'}</td>
                    <td style={{ padding: '13px 18px', color: '#34d399', fontWeight: 700 }}>₹{p.amount?.toLocaleString()}</td>
                    <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{new Date(p.dueDate).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.5)', fontSize: 12, textTransform: 'capitalize' }}>{p.paymentMode?.replace('_', ' ') || '—'}</td>
                    <td style={{ padding: '13px 18px' }}><span style={{ background: `${statusColor[p.status]}15`, color: statusColor[p.status], borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700, textTransform: 'capitalize' }}>{p.status}</span></td>
                    <td style={{ padding: '13px 18px', color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{p.transactionRef || '—'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentTracking;
