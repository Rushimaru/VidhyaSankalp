import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── In-memory "database" ─────────────────────────────── */
const DB = { students: [] };

/* ─── Toast ─────────────────────────────────────────────── */
const Toast = ({ toasts }) => (
  <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
    {toasts.map((t) => (
      <div key={t.id} style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 18px", borderRadius: 10, minWidth: 280, maxWidth: 360,
        background: t.type === "success" ? "#16a34a" : "#dc2626",
        color: "#fff", fontWeight: 600, fontSize: 14,
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
        animation: "slideIn .3s ease",
      }}>
        <span style={{ fontSize: 18 }}>{t.type === "success" ? "✅" : "❌"}</span>
        {t.message}
      </div>
    ))}
    <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}`}</style>
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  };
  return { toasts, success: (m) => add(m, "success"), error: (m) => add(m, "error") };
};

/* ─── Reusable components ───────────────────────────────── */
const DropZone = ({ label, required, error }) => {
  const [fileName, setFileName] = useState("");
  return (
    <div>
      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
        {label} {required && <span className="text-danger-600">*</span>}
      </label>
      <label className={`drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border ${error ? "border-danger-600" : "border-neutral-400"} radius-8 border-dashed bg-hover-neutral-200`} style={{ cursor: "pointer" }}>
        <span className="drop-zone__prompt text-sm">{fileName || "Drag & drop or click to upload"}</span>
        <input type="file" className="drop-zone__input" style={{ display: "none" }}
          onChange={(e) => e.target.files[0] && setFileName(e.target.files[0].name)} />
      </label>
      {error && <p className="text-danger-600 text-xs mt-4">{error}</p>}
    </div>
  );
};

const Field = ({ label, required, error, children }) => (
  <div>
    <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
      {label} {required && <span className="text-danger-600">*</span>}
    </label>
    {children}
    {error && <p className="text-danger-600 text-xs mt-4">{error}</p>}
  </div>
);

const Card = ({ title, children, col = "col-lg-12" }) => (
  <div className={col}>
    <div className="shadow-1 radius-12 bg-base overflow-hidden">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">{title}</h6>
      </div>
      <div className="card-body p-20">{children}</div>
    </div>
  </div>
);

/* ─── Validation ────────────────────────────────────────── */
const validate = (f) => {
  const e = {};
  if (!f.academicYear)      e.academicYear      = "Required";
  if (!f.classSelection)    e.classSelection    = "Required";
  if (!f.section)           e.section           = "Required";
  if (!f.admissionNo.trim()) e.admissionNo      = "Admission number is required";
  if (!f.fullName.trim())   e.fullName          = "Full name is required";
  if (!f.category)          e.category          = "Required";
  if (!f.gender)            e.gender            = "Required";
  if (!f.dateOfBirth)       e.dateOfBirth       = "Date of birth is required";
  if (!f.religion)          e.religion          = "Required";
  if (!f.motherTongue)      e.motherTongue      = "Required";
  if (!f.nationality)       e.nationality       = "Required";
  if (!/^\d{10}$/.test(f.phoneNumber))
                            e.phoneNumber       = "Enter valid 10-digit mobile number";
  if (f.studentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.studentEmail))
                            e.studentEmail      = "Enter valid email";
  if (f.aadharNumber && !/^\d{12}$/.test(f.aadharNumber))
                            e.aadharNumber      = "Aadhar must be 12 digits";
  if (!f.currentAddress.trim()) e.currentAddress = "Current address is required";
  if (!f.loginEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.loginEmail))
                            e.loginEmail        = "Valid login email is required";
  if (!f.password || f.password.length < 6)
                            e.password          = "Password must be at least 6 characters";
  return e;
};

/* ─── Initial state ─────────────────────────────────────── */
const INIT = {
  academicYear: "2025-2026", classSelection: "", section: "", rollNumber: "",
  admissionNo: "", fullName: "", category: "", gender: "", dateOfBirth: "",
  religion: "", caste: "", motherTongue: "", nationality: "Indian",
  phoneNumber: "", studentEmail: "", aadharNumber: "",
  fathersName: "", fathersPhone: "", fathersOccupation: "", fathersAadhar: "",
  mothersName: "", mothersPhone: "", mothersOccupation: "", mothersAadhar: "",
  guardianName: "", guardianEmail: "", guardianPhone: "", guardianRelation: "", guardianAddress: "",
  bloodGroup: "", height: "", weight: "", medicalCondition: "",
  prevSchoolName: "", prevClass: "", prevBoard: "", prevPassYear: "", prevPercentage: "", prevTCNumber: "",
  currentAddress: "", permanentAddress: "",
  busRoute: "", stopName: "",
  docName: "", details: "",
  loginEmail: "", password: "",
};

/* ─── Main Component ────────────────────────────────────── */
const AddStudent = () => {
  const [formData, setFormData]   = useState(INIT);
  const [errors, setErrors]       = useState({});
  const [guardian, setGuardian]   = useState("father");
  const [showPwd, setShowPwd]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const { toasts, success, error } = useToast();

  const hc = (e) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
    if (errors[id]) setErrors((p) => ({ ...p, [id]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setErrors(errs);
      error("Please fix the highlighted errors before saving.");
      // scroll to first error
      const firstErrEl = document.querySelector(".text-danger-600.text-xs");
      firstErrEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900)); // simulate API call
      const student = { ...formData, id: Date.now(), createdAt: new Date().toISOString(), guardian };
      DB.students.push(student);
      success(`Student "${formData.fullName}" saved successfully! (ID: ${student.id})`);
      setFormData(INIT);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      error("Failed to save student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inp = (id, ph, type = "text") => (
    <input type={type} className={`form-control ${errors[id] ? "border-danger-600" : ""}`}
      id={id} placeholder={ph} value={formData[id]} onChange={hc} />
  );
  const sel = (id, ph, opts) => (
    <select className={`form-control form-select ${errors[id] ? "border-danger-600" : ""}`}
      id={id} value={formData[id]} onChange={hc}>
      <option value="" disabled>{ph}</option>
      {opts.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="dashboard-main-body">
      <Toast toasts={toasts} />

      {/* Breadcrumb */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h6 className="fw-semibold mb-4 text-primary-light">Add New Student</h6>
          <div className="text-sm">
            <Link to="/" className="text-secondary-light hover-text-primary">Dashboard</Link>
            <Link to="/students" className="text-secondary-light hover-text-primary"> / Students</Link>
            <span className="text-secondary-light"> / Add New Student</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row gy-3">

          {/* ══ 1. ACADEMIC & PERSONAL INFO ══════════════════════ */}
          <Card title="Academic & Personal Information">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Academic Year" required error={errors.academicYear}>
                  {sel("academicYear", "Select Year", ["2023-2024","2024-2025","2025-2026","2026-2027"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Class" required error={errors.classSelection}>
                  {sel("classSelection", "Select Class", ["Nursery","LKG","UKG","Class I","Class II","Class III","Class IV","Class V","Class VI","Class VII","Class VIII","Class IX","Class X","Class XI","Class XII"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Section" required error={errors.section}>
                  {sel("section", "Select Section", ["A","B","C","D","E"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Roll Number">
                  {inp("rollNumber", "Enter roll number")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Admission No." required error={errors.admissionNo}>
                  {inp("admissionNo", "e.g. ADM2025001")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Full Name (as per certificate)" required error={errors.fullName}>
                  {inp("fullName", "Enter full name")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Gender" required error={errors.gender}>
                  {sel("gender", "Select Gender", ["Male","Female","Other"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Date of Birth" required error={errors.dateOfBirth}>
                  {inp("dateOfBirth", "", "date")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Category" required error={errors.category}>
                  {sel("category", "Select Category", ["General","OBC","SC","ST","EWS","NT","SBC"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Religion" required error={errors.religion}>
                  {sel("religion", "Select Religion", ["Hindu","Muslim","Christian","Sikh","Buddhist","Jain","Parsi","Other"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Caste">
                  {inp("caste", "Enter caste (optional)")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother Tongue" required error={errors.motherTongue}>
                  {sel("motherTongue", "Select", ["Hindi","Marathi","Gujarati","Tamil","Telugu","Kannada","Bengali","Malayalam","Punjabi","Odia","Other"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Nationality" required error={errors.nationality}>
                  {inp("nationality", "Nationality")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mobile Number" required error={errors.phoneNumber}>
                  {inp("phoneNumber", "10-digit mobile number", "tel")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Student Email" error={errors.studentEmail}>
                  {inp("studentEmail", "student@email.com", "email")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Aadhar Number" error={errors.aadharNumber}>
                  {inp("aadharNumber", "12-digit Aadhar number")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <DropZone label="Student Photo" required />
              </div>
            </div>
          </Card>

          {/* ══ 2. PARENT & GUARDIAN INFO ════════════════════════ */}
          <Card title="Parent & Guardian Information">
            <div className="row gy-3">
              {/* Father */}
              <div className="col-12"><p className="fw-semibold text-primary-light mb-0">Father's Details</p></div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Father's Name">{inp("fathersName","Enter father's name")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Father's Mobile">{inp("fathersPhone","10-digit number","tel")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Father's Occupation">{inp("fathersOccupation","e.g. Farmer, Business, Service")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Father's Aadhar">{inp("fathersAadhar","12-digit Aadhar")}</Field>
              </div>

              {/* Mother */}
              <div className="col-12 mt-4"><p className="fw-semibold text-primary-light mb-0">Mother's Details</p></div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother's Name">{inp("mothersName","Enter mother's name")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother's Mobile">{inp("mothersPhone","10-digit number","tel")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother's Occupation">{inp("mothersOccupation","e.g. Homemaker, Teacher")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother's Aadhar">{inp("mothersAadhar","12-digit Aadhar")}</Field>
              </div>

              {/* Guardian Radio */}
              <div className="col-12 mt-8">
                <span className="fw-semibold text-primary-light d-block mb-8">Primary Guardian</span>
                <div className="d-flex flex-wrap gap-28">
                  {[["father","Father","checked-primary"],["mother","Mother","checked-secondary"],["other","Other","checked-success"]].map(([v,l,c]) => (
                    <div key={v} className={`form-check ${c} d-flex align-items-center gap-2`}>
                      <input className="form-check-input" type="radio" name="gr" id={`g_${v}`}
                        value={v} checked={guardian===v} onChange={()=>setGuardian(v)} />
                      <label className="form-check-label fw-medium text-secondary-light" htmlFor={`g_${v}`}>{l}</label>
                    </div>
                  ))}
                </div>
              </div>

              {guardian === "other" && <>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Guardian Name">{inp("guardianName","Enter name")}</Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Relation">{inp("guardianRelation","e.g. Uncle, Grandparent")}</Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Guardian Mobile">{inp("guardianPhone","10-digit number","tel")}</Field>
                </div>
                <div className="col-xxl-3 col-xl-4 col-sm-6">
                  <Field label="Guardian Email">{inp("guardianEmail","guardian@email.com","email")}</Field>
                </div>
                <div className="col-sm-6">
                  <Field label="Guardian Address">{inp("guardianAddress","Enter address")}</Field>
                </div>
              </>}
            </div>
          </Card>

          {/* ══ 3. MEDICAL DETAILS ═══════════════════════════════ */}
          <div className="col-xxl-6">
            <Card title="Medical Details">
              <div className="row gy-3">
                <div className="col-sm-6">
                  <Field label="Blood Group">
                    {sel("bloodGroup","Select",["A+","A-","B+","B-","AB+","AB-","O+","O-"])}
                  </Field>
                </div>
                <div className="col-sm-6">
                  <Field label="Height (cm)">{inp("height","e.g. 152")}</Field>
                </div>
                <div className="col-sm-6">
                  <Field label="Weight (kg)">{inp("weight","e.g. 42")}</Field>
                </div>
                <div className="col-sm-6">
                  <Field label="Known Medical Condition">{inp("medicalCondition","e.g. Asthma, None")}</Field>
                </div>
              </div>
            </Card>
          </div>

          {/* ══ 4. ADDRESS ════════════════════════════════════════ */}
          <div className="col-xxl-6">
            <Card title="Address Details">
              <div className="row gy-3">
                <div className="col-12">
                  <Field label="Current Address" required error={errors.currentAddress}>
                    <textarea className={`form-control ${errors.currentAddress?"border-danger-600":""}`}
                      id="currentAddress" rows={2} placeholder="Enter current address"
                      value={formData.currentAddress} onChange={hc} />
                  </Field>
                </div>
                <div className="col-12">
                  <Field label="Permanent Address">
                    <textarea className="form-control" id="permanentAddress" rows={2}
                      placeholder="Same as current if not different"
                      value={formData.permanentAddress} onChange={hc} />
                  </Field>
                </div>
              </div>
            </Card>
          </div>

          {/* ══ 5. PREVIOUS SCHOOL ═══════════════════════════════ */}
          <Card title="Previous School / Transfer Details">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Previous School Name">{inp("prevSchoolName","Enter school name")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Last Class Passed">{sel("prevClass","Select",["Nursery","LKG","UKG","Class I","Class II","Class III","Class IV","Class V","Class VI","Class VII","Class VIII","Class IX","Class X","Class XI"])}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Board">{sel("prevBoard","Select Board",["CBSE","ICSE","State Board","IB","NIOS","Other"])}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Passing Year">{inp("prevPassYear","e.g. 2024")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Percentage / CGPA">{inp("prevPercentage","e.g. 85%")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="TC Number">{inp("prevTCNumber","Transfer Certificate No.")}</Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <DropZone label="Transfer Certificate" />
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <DropZone label="Mark Sheet" />
              </div>
            </div>
          </Card>

          {/* ══ 6. TRANSPORT ═════════════════════════════════════ */}
          <div className="col-xxl-6">
            <Card title="Transport Details (Optional)">
              <div className="row gy-3">
                <div className="col-sm-6">
                  <Field label="Bus Route">{inp("busRoute","e.g. Route 4 – Nagpur")}</Field>
                </div>
                <div className="col-sm-6">
                  <Field label="Bus Stop Name">{inp("stopName","Enter nearest stop")}</Field>
                </div>
              </div>
            </Card>
          </div>

          {/* ══ 7. DOCUMENTS ═════════════════════════════════════ */}
          <div className="col-xxl-6">
            <Card title="Other Documents">
              <div className="row gy-3">
                <div className="col-sm-6">
                  <DropZone label="Aadhar Card" />
                </div>
                <div className="col-sm-6">
                  <DropZone label="Caste Certificate (if applicable)" />
                </div>
                <div className="col-sm-6">
                  <DropZone label="Birth Certificate" />
                </div>
                <div className="col-sm-6">
                  <DropZone label="Passport Size Photo" required />
                </div>
              </div>
            </Card>
          </div>

          {/* ══ 8. ADDITIONAL NOTES ══════════════════════════════ */}
          <Card title="Additional Notes">
            <Field label="Remarks / Special Instructions">
              <textarea className="form-control" id="details" rows={3}
                placeholder="Any special notes, disability info, scholarship details, etc."
                value={formData.details} onChange={hc} />
            </Field>
          </Card>

          {/* ══ 9. LOGIN DETAILS ═════════════════════════════════ */}
          <Card title="Student Portal Login">
            <div className="row gy-3">
              <div className="col-sm-6">
                <Field label="Login Email" required error={errors.loginEmail}>
                  {inp("loginEmail","student@school.com","email")}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field label="Password" required error={errors.password}>
                  <div className="position-relative">
                    <input type={showPwd?"text":"password"} id="password"
                      className={`form-control ${errors.password?"border-danger-600":""}`}
                      placeholder="Min. 6 characters"
                      value={formData.password} onChange={hc} />
                    <span className="position-absolute end-0 top-50 translate-middle-y me-16"
                      style={{ cursor:"pointer" }} onClick={()=>setShowPwd(!showPwd)}>
                      <iconify-icon icon={showPwd?"ri:eye-off-line":"ri:eye-line"} style={{fontSize:18}}></iconify-icon>
                    </span>
                  </div>
                </Field>
              </div>
            </div>
          </Card>

          {/* ══ ACTIONS ══════════════════════════════════════════ */}
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
              <button type="button" onClick={()=>{setFormData(INIT);setErrors({});}}
                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                style={{background:"none",cursor:"pointer"}}>
                Reset
              </button>
              <button type="submit" disabled={loading}
                className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
                style={{ minWidth: 140 }}>
                {loading ? "Saving…" : "Save Student"}
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddStudent;