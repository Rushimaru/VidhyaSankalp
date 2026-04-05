import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { superAdminApi } from '../../utils/api';

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, marginBottom: 7 }}>{label}</label>
    {children}
  </div>
);

const Input = ({ style, ...props }) => (
  <input {...props} style={{
    width: '100%', padding: '10px 14px', borderRadius: 10, boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 14, outline: 'none', ...style,
  }} />
);

const Select = ({ children, ...props }) => (
  <select {...props} style={{
    width: '100%', padding: '10px 14px', borderRadius: 10,
    background: 'rgba(18,20,31,0.9)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 14, outline: 'none',
  }}>{children}</select>
);

const Section = ({ title, children }) => (
  <div style={{
    background: 'rgba(26,29,46,0.7)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 14, padding: '24px', marginBottom: 20,
  }}>
    <h3 style={{ color: '#a78bfa', fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 20px' }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0 24px' }}>
      {children}
    </div>
  </div>
);

const AddInstitution = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', code: '', type: 'School', address: '', city: '', state: '', pincode: '',
    phone: '', email: '', website: '',
    adminName: '', adminEmail: '', adminPassword: 'Vidhya@123',
    subscriptionPlanId: '', subscriptionExpiry: '',
  });

  useEffect(() => {
    superAdminApi.getPlans().then(r => setPlans(r.data)).catch(console.error);
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await superAdminApi.createInstitution(form);
      alert('✅ Institution created successfully!');
      navigate('/super-admin/institutions');
    } catch (err) {
      alert('❌ ' + (err.response?.data?.message || 'Failed to create institution.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
          cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12,
        }}>
          <iconify-icon icon="solar:arrow-left-bold" /> Back
        </button>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>Add New Institution</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', margin: '6px 0 0', fontSize: 13 }}>Create an institution and its admin account in one step</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Section title="Institution Details">
          <Field label="Institution Name *"><Input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="DPS International School" /></Field>
          <Field label="Code *"><Input required value={form.code} onChange={e => set('code', e.target.value.toUpperCase())} placeholder="DPS001" maxLength={10} /></Field>
          <Field label="Type">
            <Select value={form.type} onChange={e => set('type', e.target.value)}>
              <option>School</option><option>College</option><option>Other</option>
            </Select>
          </Field>
          <Field label="Phone *"><Input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" /></Field>
          <Field label="Email *"><Input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="info@school.edu" /></Field>
          <Field label="Website"><Input value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://school.edu" /></Field>
          <Field label="Address *" ><Input required value={form.address} onChange={e => set('address', e.target.value)} placeholder="Full address" /></Field>
          <Field label="City"><Input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Mumbai" /></Field>
          <Field label="State"><Input value={form.state} onChange={e => set('state', e.target.value)} placeholder="Maharashtra" /></Field>
          <Field label="Pincode"><Input value={form.pincode} onChange={e => set('pincode', e.target.value)} placeholder="400001" /></Field>
        </Section>

        <Section title="Admin Account">
          <Field label="Admin Name *"><Input required value={form.adminName} onChange={e => set('adminName', e.target.value)} placeholder="Principal Name" /></Field>
          <Field label="Admin Email *"><Input required type="email" value={form.adminEmail} onChange={e => set('adminEmail', e.target.value)} placeholder="admin@school.edu" /></Field>
          <Field label="Temp Password *"><Input required value={form.adminPassword} onChange={e => set('adminPassword', e.target.value)} /></Field>
        </Section>

        <Section title="Subscription">
          <Field label="Plan">
            <Select value={form.subscriptionPlanId} onChange={e => set('subscriptionPlanId', e.target.value)}>
              <option value="">— Trial (No Plan) —</option>
              {plans.map(p => <option key={p._id} value={p._id}>{p.name} — ₹{p.price}/mo</option>)}
            </Select>
          </Field>
          <Field label="Expiry Date">
            <Input type="date" value={form.subscriptionExpiry} onChange={e => set('subscriptionExpiry', e.target.value)} />
          </Field>
        </Section>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 8 }}>
          <button type="button" onClick={() => navigate(-1)} style={{
            padding: '11px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: 600,
          }}>Cancel</button>
          <button type="submit" disabled={loading} style={{
            padding: '11px 28px', borderRadius: 10, border: 'none',
            background: loading ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14,
          }}>{loading ? 'Creating...' : 'Create Institution'}</button>
        </div>
      </form>
    </div>
  );
};

export default AddInstitution;
