import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateTeacher } from '../../utils/validators';

/* ─── Toast ──────────────────────────────────────────────────────────────── */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = 'success') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };
  return { toasts, success: (m) => add(m, 'success'), error: (m) => add(m, 'error') };
};

const Toast = ({ toasts }) => (
  <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
    {toasts.map((t) => (
      <div key={t.id} style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px',
        borderRadius: 10, minWidth: 280, maxWidth: 380,
        background: t.type === 'success' ? '#16a34a' : '#dc2626',
        color: '#fff', fontWeight: 600, fontSize: 14,
        boxShadow: '0 4px 20px rgba(0,0,0,0.18)', animation: 'slideIn .3s ease',
      }}>
        <span style={{ fontSize: 18 }}>{t.type === 'success' ? '✅' : '❌'}</span>
        {t.message}
      </div>
    ))}
    <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}`}</style>
  </div>
);

/* ─── Reusable UI ─────────────────────────────────────────────────────────── */
const Field = ({ label, required, error, children }) => (
  <div>
    <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
      {label} {required && <span className="text-danger-600">*</span>}
    </label>
    {children}
    {error && <p className="text-danger-600 text-xs mt-4">{error}</p>}
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="col-12">
    <p className="fw-semibold text-primary-light mb-0 pb-8 border-bottom">{title}</p>
  </div>
);

const Card = ({ title, children }) => (
  <div className="col-lg-12">
    <div className="shadow-1 radius-12 bg-base overflow-hidden">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">{title}</h6>
      </div>
      <div className="card-body p-20">{children}</div>
    </div>
  </div>
);

const HalfCard = ({ title, children }) => (
  <div className="col-xxl-6">
    <div className="shadow-1 radius-12 bg-base overflow-hidden h-100">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">{title}</h6>
      </div>
      <div className="card-body p-20">{children}</div>
    </div>
  </div>
);

/* ─── Skeleton ────────────────────────────────────────────────────────────── */
const Skeleton = () => (
  <div className="col-lg-12">
    <div className="shadow-1 radius-12 bg-base overflow-hidden p-24">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          height: 40, borderRadius: 8, marginBottom: 16,
          background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)',
          backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
        }} />
      ))}
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  </div>
);

/* ─── Initial state ───────────────────────────────────────────────────────── */
const INIT = {
  // Identity
  employeeId: '', fullName: '', gender: '', dateOfBirth: '',
  category: '', religion: '', caste: '', nationality: 'Indian',
  aadharNumber: '', panNumber: '', maritalStatus: '',
  // Professional
  designation: '', department: '', subjectsTaught: '', classesAssigned: '',
  qualification: '', experience: '', contractType: '', joinDate: '', workLocation: '',
  // Contact
  phoneNumber: '', alternatePhone: '', email: '',
  // Family
  fathersName: '', mothersName: '', spouseName: '',
  emergencyContactName: '', emergencyContactPhone: '', emergencyContactRelation: '',
  // Address
  currentAddress: '', permanentAddress: '',
  // Medical
  bloodGroup: '', medicalCondition: '',
  // Bank
  bankAccountNumber: '', bankName: '', ifscCode: '', panForSalary: '',
  // Previous employment
  prevInstituteName: '', prevInstituteAddress: '', prevDesignation: '', prevExperienceYears: '',
  // Misc
  remarks: '',
  // Login
  loginEmail: '', password: '',
};

/* ─── EditTeacher ─────────────────────────────────────────────────────────── */
const EditTeacher = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { token }  = useAuth();
  const { toasts, success, error } = useToast();

  const [formData, setFormData] = useState(INIT);
  const [errors, setErrors]     = useState({});
  const [showPwd, setShowPwd]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading]   = useState(false);

  /* ── Fetch teacher by ID ── */
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`/api/teachers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Teacher not found.');

        setFormData({
          ...INIT,
          ...data,
          // Format dates for <input type="date">
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
          joinDate: data.joinDate
            ? new Date(data.joinDate).toISOString().split('T')[0] : '',
          // Convert arrays back to comma-separated strings for inputs
          subjectsTaught:  Array.isArray(data.subjectsTaught)
            ? data.subjectsTaught.join(', ') : data.subjectsTaught || '',
          classesAssigned: Array.isArray(data.classesAssigned)
            ? data.classesAssigned.join(', ') : data.classesAssigned || '',
          password: '', // never pre-fill password
        });
      } catch (err) {
        error(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchTeacher();
  }, [id, token]);

  /* ── Helpers ── */
  const hc = (e) => {
    const { id: fieldId, value } = e.target;
    setFormData((p) => ({ ...p, [fieldId]: value }));
    if (errors[fieldId]) setErrors((p) => ({ ...p, [fieldId]: undefined }));
  };

  const inp = (fieldId, placeholder, type = 'text') => (
    <input
      type={type} id={fieldId} placeholder={placeholder}
      className={`form-control ${errors[fieldId] ? 'border-danger-600' : ''}`}
      value={formData[fieldId]} onChange={hc}
    />
  );

  const sel = (fieldId, placeholder, options) => (
    <select
      id={fieldId}
      className={`form-control form-select ${errors[fieldId] ? 'border-danger-600' : ''}`}
      value={formData[fieldId]} onChange={hc}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skip password validation if not changing it
    const dataToValidate = { ...formData };
    if (!formData.password) dataToValidate.password = 'placeholder';

    const errs = validateTeacher(dataToValidate);
    if (!formData.password) delete errs.password;

    if (Object.keys(errs).length) {
      setErrors(errs);
      error('Please fix the highlighted errors before saving.');
      setTimeout(() => {
        document.querySelector('.text-danger-600.text-xs')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setLoading(true);
    try {
      // Convert comma-separated strings back to arrays
      const payload = {
        ...formData,
        subjectsTaught:  formData.subjectsTaught.split(',').map((s) => s.trim()).filter(Boolean),
        classesAssigned: formData.classesAssigned.split(',').map((s) => s.trim()).filter(Boolean),
      };

      // Remove password from payload if not changing
      if (!payload.password) delete payload.password;

      const response = await fetch(`/api/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update teacher.');

      success(`"${formData.fullName}" updated successfully!`);
      setTimeout(() => navigate('/teachers'), 1500);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ─── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="dashboard-main-body">
      <Toast toasts={toasts} />

      {/* Breadcrumb */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h6 className="fw-semibold mb-4 text-primary-light">Edit Teacher</h6>
          <div className="text-sm">
            <Link to="/"         className="text-secondary-light hover-text-primary">Dashboard</Link>
            <Link to="/teachers" className="text-secondary-light hover-text-primary"> / Teachers</Link>
            <span className="text-secondary-light"> / Edit Teacher</span>
          </div>
        </div>
      </div>

      {fetching ? (
        <div className="row gy-3"><Skeleton /></div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="row gy-3">

            {/* ══ 1. PERSONAL INFORMATION ════════════════════════════════ */}
            <Card title="Personal Information">
              <div className="row gy-3">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Employee ID" required error={errors.employeeId}>
                    {inp('employeeId', 'e.g. TCH2025001')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Full Name" required error={errors.fullName}>
                    {inp('fullName', 'Enter full name as per certificate')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Gender" required error={errors.gender}>
                    {sel('gender', 'Select Gender', ['Male','Female','Other'])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Date of Birth" required error={errors.dateOfBirth}>
                    {inp('dateOfBirth', '', 'date')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Category" required error={errors.category}>
                    {sel('category', 'Select Category', ['General','OBC','SC','ST','EWS','NT','SBC'])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Religion" required error={errors.religion}>
                    {sel('religion', 'Select Religion', ['Hindu','Muslim','Christian','Sikh','Buddhist','Jain','Parsi','Other'])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Caste">
                    {inp('caste', 'Enter caste (optional)')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Nationality" required error={errors.nationality}>
                    {inp('nationality', 'Nationality')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Marital Status">
                    {sel('maritalStatus', 'Select', ['Married','Unmarried','Divorced','Widowed'])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Aadhar Number" error={errors.aadharNumber}>
                    {inp('aadharNumber', '12-digit Aadhar number')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="PAN Number" error={errors.panNumber}>
                    {inp('panNumber', 'e.g. ABCDE1234F')}
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ 2. PROFESSIONAL INFORMATION ════════════════════════════ */}
            <Card title="Professional Information">
              <div className="row gy-3">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Designation" required error={errors.designation}>
                    {sel('designation', 'Select Designation', [
                      'PRT (Primary Teacher)','TGT (Trained Graduate Teacher)',
                      'PGT (Post Graduate Teacher)','Lecturer','Assistant Professor',
                      'Associate Professor','Professor','HOD','Principal','Vice Principal',
                    ])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Department" required error={errors.department}>
                    {sel('department', 'Select Department', [
                      'Science','Mathematics','English','Hindi','Social Science',
                      'Commerce','Arts','Physical Education','Computer Science',
                      'Sanskrit','Music','Fine Arts','Other',
                    ])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Subjects Taught" error={errors.subjectsTaught}>
                    <input
                      type="text" id="subjectsTaught" className="form-control"
                      placeholder="e.g. Physics, Chemistry (comma separated)"
                      value={formData.subjectsTaught} onChange={hc}
                    />
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Classes Assigned">
                    <input
                      type="text" id="classesAssigned" className="form-control"
                      placeholder="e.g. Class IX, Class X (comma separated)"
                      value={formData.classesAssigned} onChange={hc}
                    />
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Qualification" required error={errors.qualification}>
                    {sel('qualification', 'Select Qualification', [
                      'B.A','B.Sc','B.Com','B.Ed','B.Tech',
                      'M.A','M.Sc','M.Com','M.Ed','M.Tech',
                      'Ph.D','D.El.Ed','NTT','B.P.Ed','Other',
                    ])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Total Experience" required error={errors.experience}>
                    {inp('experience', 'e.g. 5 years')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Contract Type">
                    {sel('contractType', 'Select', ['Regular','Contractual','Guest','Part-Time'])}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Join Date" required error={errors.joinDate}>
                    {inp('joinDate', '', 'date')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Work Location">
                    {inp('workLocation', 'e.g. Main Campus, Branch')}
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ 3. CONTACT INFORMATION ═════════════════════════════════ */}
            <Card title="Contact Information">
              <div className="row gy-3">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Mobile Number" required error={errors.phoneNumber}>
                    {inp('phoneNumber', '10-digit mobile number', 'tel')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Alternate Mobile" error={errors.alternatePhone}>
                    {inp('alternatePhone', '10-digit number', 'tel')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Email" required error={errors.email}>
                    {inp('email', 'teacher@email.com', 'email')}
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ 4. FAMILY INFORMATION ══════════════════════════════════ */}
            <Card title="Family Information">
              <div className="row gy-3">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Father's Name">
                    {inp('fathersName', "Enter father's name")}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Mother's Name">
                    {inp('mothersName', "Enter mother's name")}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Spouse Name">
                    {inp('spouseName', 'Enter spouse name (if married)')}
                  </Field>
                </div>

                <SectionTitle title="Emergency Contact" />
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Contact Name">
                    {inp('emergencyContactName', 'Enter name')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Contact Mobile" error={errors.emergencyContactPhone}>
                    {inp('emergencyContactPhone', '10-digit number', 'tel')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Relation">
                    {inp('emergencyContactRelation', 'e.g. Spouse, Father, Sibling')}
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ 5. MEDICAL ═════════════════════════════════════════════ */}
            <HalfCard title="Medical Details">
              <div className="row gy-3">
                <div className="col-sm-6">
                  <Field label="Blood Group">
                    {sel('bloodGroup', 'Select', ['A+','A-','B+','B-','AB+','AB-','O+','O-'])}
                  </Field>
                </div>
                <div className="col-sm-6">
                  <Field label="Known Medical Condition">
                    {inp('medicalCondition', 'e.g. Diabetes, None')}
                  </Field>
                </div>
              </div>
            </HalfCard>

            {/* ══ 6. ADDRESS ═════════════════════════════════════════════ */}
            <HalfCard title="Address Details">
              <div className="row gy-3">
                <div className="col-12">
                  <Field label="Current Address" required error={errors.currentAddress}>
                    <textarea
                      id="currentAddress" rows={3}
                      className={`form-control ${errors.currentAddress ? 'border-danger-600' : ''}`}
                      placeholder="House No., Street, Village/City, District, State, PIN"
                      value={formData.currentAddress} onChange={hc}
                    />
                  </Field>
                </div>
                <div className="col-12">
                  <Field label="Permanent Address">
                    <textarea
                      id="permanentAddress" rows={3} className="form-control"
                      placeholder="Same as current if not different"
                      value={formData.permanentAddress} onChange={hc}
                    />
                  </Field>
                </div>
              </div>
            </HalfCard>

            {/* ══ 7. BANK DETAILS ════════════════════════════════════════ */}
            <Card title="Bank Details (For Salary)">
              <div className="row gy-3">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Account Number">
                    {inp('bankAccountNumber', 'Enter bank account number')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Bank Name">
                    {inp('bankName', 'e.g. SBI, HDFC, Canara')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="IFSC Code">
                    {inp('ifscCode', 'e.g. SBIN0001234')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="PAN for Salary">
                    {inp('panForSalary', 'e.g. ABCDE1234F')}
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ 8. PREVIOUS EMPLOYMENT ═════════════════════════════════ */}
            <Card title="Previous Employment Details">
              <div className="row gy-3">
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Previous Institute Name">
                    {inp('prevInstituteName', 'Enter school / college name')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Institute Address">
                    {inp('prevInstituteAddress', 'Enter address')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Designation Held">
                    {inp('prevDesignation', 'e.g. TGT Mathematics')}
                  </Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Years of Experience There">
                    {inp('prevExperienceYears', 'e.g. 3 years')}
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ 9. REMARKS ═════════════════════════════════════════════ */}
            <Card title="Additional Remarks">
              <Field label="Remarks / Notes">
                <textarea
                  id="remarks" rows={3} className="form-control"
                  placeholder="Any additional information, achievements, special skills..."
                  value={formData.remarks} onChange={hc}
                />
              </Field>
            </Card>

            {/* ══ 10. LOGIN DETAILS ══════════════════════════════════════ */}
            <Card title="Teacher Portal Login">
              <div className="row gy-3">
                <div className="col-sm-6">
                  <Field label="Login Email" required error={errors.loginEmail}>
                    {inp('loginEmail', 'teacher@school.com', 'email')}
                  </Field>
                </div>
                <div className="col-sm-6">
                  <Field label="New Password" error={errors.password}>
                    <div className="position-relative">
                      <input
                        type={showPwd ? 'text' : 'password'} id="password"
                        className={`form-control ${errors.password ? 'border-danger-600' : ''}`}
                        placeholder="Leave blank to keep existing password"
                        value={formData.password} onChange={hc}
                      />
                      <button
                        type="button"
                        className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                        onClick={() => setShowPwd((p) => !p)}
                        aria-label="Toggle password"
                      >
                        <i className={`ri-${showPwd ? 'eye-off' : 'eye'}-line`} style={{ fontSize: 18 }} />
                      </button>
                    </div>
                    <p className="text-secondary-light text-xs mt-4">
                      Leave blank to keep the existing password.
                    </p>
                  </Field>
                </div>
              </div>
            </Card>

            {/* ══ ACTIONS ════════════════════════════════════════════════ */}
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/teachers')}
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                  style={{ background: 'none', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={loading}
                  className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
                  style={{ minWidth: 160 }}
                >
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</>
                    : 'Save Changes'
                  }
                </button>
              </div>
            </div>

          </div>
        </form>
      )}
    </div>
  );
};

export default EditTeacher;