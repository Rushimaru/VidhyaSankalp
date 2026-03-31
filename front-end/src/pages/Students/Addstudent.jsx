import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateStudent } from "../../utils/validators";

/* Toast */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };
  return {
    toasts,
    success: (m) => add(m, "success"),
    error: (m) => add(m, "error"),
  };
};

const Toast = ({ toasts }) => (
  <div
    style={{
      position: "fixed",
      top: 20,
      right: 20,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}
  >
    {toasts.map((t) => (
      <div
        key={t.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 18px",
          borderRadius: 10,
          minWidth: 280,
          maxWidth: 380,
          background: t.type === "success" ? "#16a34a" : "#dc2626",
          color: "#fff",
          fontWeight: 600,
          fontSize: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
          animation: "slideIn .3s ease",
        }}
      >
        <span style={{ fontSize: 18 }}>
          {t.type === "success" ? "✅" : "❌"}
        </span>
        {t.message}
      </div>
    ))}
    <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}`}</style>
  </div>
);

/* Reusable UI */
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
    <p className="fw-semibold text-primary-light mb-0 pb-8 border-bottom">
      {title}
    </p>
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

/* Initial state */
const INIT = {
  academicYear: "2025-2026",
  classSection: "",
  section: "",
  rollNumber: "",
  admissionNo: "",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  category: "",
  religion: "",
  caste: "",
  motherTongue: "",
  nationality: "Indian",
  phoneNumber: "",
  studentEmail: "",
  aadharNumber: "",
  fathersName: "",
  fathersPhone: "",
  fathersOccupation: "",
  mothersName: "",
  mothersPhone: "",
  mothersOccupation: "",
  primaryGuardian: "father",
  guardianName: "",
  guardianRelation: "",
  guardianPhone: "",
  guardianEmail: "",
  currentAddress: "",
  permanentAddress: "",
  bloodGroup: "",
  height: "",
  weight: "",
  medicalCondition: "",
  prevSchoolName: "",
  prevClass: "",
  prevBoard: "",
  prevPassYear: "",
  prevPercentage: "",
  prevTCNumber: "",
  busRoute: "",
  stopName: "",
  remarks: "",
  loginEmail: "",
  password: "",
};

/* Main Component */
const AddStudent = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { toasts, success, error } = useToast();

  const [formData, setFormData] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── Helpers ── */
  const hc = (e) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
    if (errors[id]) setErrors((p) => ({ ...p, [id]: undefined }));
  };

  const inp = (id, placeholder, type = "text") => (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`form-control ${errors[id] ? "border-danger-600" : ""}`}
      value={formData[id]}
      onChange={hc}
    />
  );

  const sel = (id, placeholder, options) => (
    <select
      id={id}
      className={`form-control form-select ${errors[id] ? "border-danger-600" : ""}`}
      value={formData[id]}
      onChange={hc}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateStudent(formData);

    if (Object.keys(errs).length) {
      setErrors(errs);
      error("Please fix the highlighted errors before saving.");
      setTimeout(() => {
        const el = document.querySelector(".text-danger-600.text-xs");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // ← sends cookies to server
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save student.");
      }

      success(`Student "${data.student.fullName}" saved successfully!`);
      setFormData(INIT);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INIT);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="dashboard-main-body">
      <Toast toasts={toasts} />
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h6 className="fw-semibold mb-4 text-primary-light">
            Add New Student
          </h6>
          <div className="text-sm">
            <Link to="/" className="text-secondary-light hover-text-primary">
              Dashboard
            </Link>
            <Link
              to="/students"
              className="text-secondary-light hover-text-primary"
            >
              {" "}
              / Students
            </Link>
            <span className="text-secondary-light"> / Add New Student</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row gy-3">
          {/* ACADEMIC & PERSONAL */}
          <Card title="Academic & Personal Information">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Academic Year"
                  required
                  error={errors.academicYear}
                >
                  {sel("academicYear", "Select Year", [
                    "2023-2024",
                    "2024-2025",
                    "2025-2026",
                    "2026-2027",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Class" required error={errors.classSection}>
                  {sel("classSection", "Select Class", [
                    "Nursery",
                    "LKG",
                    "UKG",
                    "Class I",
                    "Class II",
                    "Class III",
                    "Class IV",
                    "Class V",
                    "Class VI",
                    "Class VII",
                    "Class VIII",
                    "Class IX",
                    "Class X",
                    "Class XI",
                    "Class XII",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Section" required error={errors.section}>
                  {sel("section", "Select Section", ["A", "B", "C", "D", "E"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Roll Number">
                  {inp("rollNumber", "Enter roll number")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Admission No."
                  required
                  error={errors.admissionNo}
                >
                  {inp("admissionNo", "e.g. ADM2025001")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Full Name (as per certificate)"
                  required
                  error={errors.fullName}
                >
                  {inp("fullName", "Enter full name")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Gender" required error={errors.gender}>
                  {sel("gender", "Select Gender", ["Male", "Female", "Other"])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Date of Birth"
                  required
                  error={errors.dateOfBirth}
                >
                  {inp("dateOfBirth", "", "date")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Category" required error={errors.category}>
                  {sel("category", "Select Category", [
                    "General",
                    "OBC",
                    "SC",
                    "ST",
                    "EWS",
                    "NT",
                    "SBC",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Religion" required error={errors.religion}>
                  {sel("religion", "Select Religion", [
                    "Hindu",
                    "Muslim",
                    "Christian",
                    "Sikh",
                    "Buddhist",
                    "Jain",
                    "Parsi",
                    "Other",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Caste">
                  {inp("caste", "Enter caste (optional)")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Mother Tongue"
                  required
                  error={errors.motherTongue}
                >
                  {sel("motherTongue", "Select", [
                    "Hindi",
                    "Marathi",
                    "Gujarati",
                    "Tamil",
                    "Telugu",
                    "Kannada",
                    "Bengali",
                    "Malayalam",
                    "Punjabi",
                    "Odia",
                    "Other",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Nationality" required error={errors.nationality}>
                  {inp("nationality", "Nationality")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Mobile Number"
                  required
                  error={errors.phoneNumber}
                >
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
            </div>
          </Card>

          {/* PARENT & GUARDIAN */}
          <Card title="Parent & Guardian Information">
            <div className="row gy-3">
              <SectionTitle title="Father's Details" />
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Father's Name"
                  required
                  error={errors.fathersName}
                >
                  {inp("fathersName", "Enter father's full name")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Father's Mobile"
                  required
                  error={errors.fathersPhone}
                >
                  {inp("fathersPhone", "10-digit number", "tel")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Father's Occupation">
                  {inp("fathersOccupation", "e.g. Farmer, Business, Service")}
                </Field>
              </div>

              <SectionTitle title="Mother's Details" />
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field
                  label="Mother's Name"
                  required
                  error={errors.mothersName}
                >
                  {inp("mothersName", "Enter mother's full name")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother's Mobile" error={errors.mothersPhone}>
                  {inp("mothersPhone", "10-digit number", "tel")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Mother's Occupation">
                  {inp("mothersOccupation", "e.g. Homemaker, Teacher")}
                </Field>
              </div>

              {/* Guardian Radio */}
              <div className="col-12 mt-8">
                <span className="fw-semibold text-primary-light d-block mb-8">
                  Primary Guardian
                </span>
                <div className="d-flex flex-wrap gap-28">
                  {[
                    ["father", "Father"],
                    ["mother", "Mother"],
                    ["other", "Other"],
                  ].map(([v, l]) => (
                    <div
                      key={v}
                      className="form-check d-flex align-items-center gap-2"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="primaryGuardian"
                        id={`g_${v}`}
                        value={v}
                        checked={formData.primaryGuardian === v}
                        onChange={() =>
                          setFormData((p) => ({ ...p, primaryGuardian: v }))
                        }
                      />
                      <label
                        className="form-check-label fw-medium text-secondary-light"
                        htmlFor={`g_${v}`}
                      >
                        {l}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other guardian fields */}
              {formData.primaryGuardian === "other" && (
                <>
                  <SectionTitle title="Guardian Details" />
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Field
                      label="Guardian Name"
                      required
                      error={errors.guardianName}
                    >
                      {inp("guardianName", "Enter name")}
                    </Field>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Field
                      label="Relation"
                      required
                      error={errors.guardianRelation}
                    >
                      {inp("guardianRelation", "e.g. Uncle, Grandparent")}
                    </Field>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Field
                      label="Guardian Mobile"
                      required
                      error={errors.guardianPhone}
                    >
                      {inp("guardianPhone", "10-digit number", "tel")}
                    </Field>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Field label="Guardian Email" error={errors.guardianEmail}>
                      {inp("guardianEmail", "guardian@email.com", "email")}
                    </Field>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* MEDICAL */}
          <HalfCard title="Medical Details">
            <div className="row gy-3">
              <div className="col-sm-6">
                <Field label="Blood Group">
                  {sel("bloodGroup", "Select", [
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                  ])}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field label="Height (cm)" error={errors.height}>
                  {inp("height", "e.g. 152")}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field label="Weight (kg)" error={errors.weight}>
                  {inp("weight", "e.g. 42")}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field label="Known Medical Condition">
                  {inp("medicalCondition", "e.g. Asthma, None")}
                </Field>
              </div>
            </div>
          </HalfCard>

          {/* ADDRESS */}
          <HalfCard title="Address Details">
            <div className="row gy-3">
              <div className="col-12">
                <Field
                  label="Current Address"
                  required
                  error={errors.currentAddress}
                >
                  <textarea
                    id="currentAddress"
                    rows={3}
                    className={`form-control ${errors.currentAddress ? "border-danger-600" : ""}`}
                    placeholder="House No., Street, Village/City, District, State, PIN"
                    value={formData.currentAddress}
                    onChange={hc}
                  />
                </Field>
              </div>
              <div className="col-12">
                <Field label="Permanent Address">
                  <textarea
                    id="permanentAddress"
                    rows={3}
                    className="form-control"
                    placeholder="Same as current if not different"
                    value={formData.permanentAddress}
                    onChange={hc}
                  />
                </Field>
              </div>
            </div>
          </HalfCard>

          {/* PREVIOUS SCHOOL */}
          <Card title="Previous School / Transfer Details">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Previous School Name">
                  {inp("prevSchoolName", "Enter school name")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Last Class Passed">
                  {sel("prevClass", "Select", [
                    "Nursery",
                    "LKG",
                    "UKG",
                    "Class I",
                    "Class II",
                    "Class III",
                    "Class IV",
                    "Class V",
                    "Class VI",
                    "Class VII",
                    "Class VIII",
                    "Class IX",
                    "Class X",
                    "Class XI",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Board">
                  {sel("prevBoard", "Select Board", [
                    "CBSE",
                    "ICSE",
                    "State Board",
                    "IB",
                    "NIOS",
                    "Other",
                  ])}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Passing Year" error={errors.prevPassYear}>
                  {inp("prevPassYear", "e.g. 2024")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="Percentage / CGPA">
                  {inp("prevPercentage", "e.g. 85%")}
                </Field>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <Field label="TC Number">
                  {inp("prevTCNumber", "Transfer Certificate No.")}
                </Field>
              </div>
            </div>
          </Card>

          {/* TRANSPORT */}
          <HalfCard title="Transport Details (Optional)">
            <div className="row gy-3">
              <div className="col-sm-6">
                <Field label="Bus Route">
                  {inp("busRoute", "e.g. Route 4 – Nagpur")}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field label="Bus Stop Name">
                  {inp("stopName", "Enter nearest stop")}
                </Field>
              </div>
            </div>
          </HalfCard>

          {/* REMARKS */}
          <HalfCard title="Additional Notes">
            <Field label="Remarks / Special Instructions">
              <textarea
                id="remarks"
                rows={4}
                className="form-control"
                placeholder="Any special notes, disability info, scholarship details, etc."
                value={formData.remarks}
                onChange={hc}
              />
            </Field>
          </HalfCard>

          {/* LOGIN */}
          <Card title="Student Portal Login">
            <div className="row gy-3">
              <div className="col-sm-6">
                <Field label="Login Email" required error={errors.loginEmail}>
                  {inp("loginEmail", "student@school.com", "email")}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field label="Password" required error={errors.password}>
                  <div className="position-relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      id="password"
                      className={`form-control ${errors.password ? "border-danger-600" : ""}`}
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={hc}
                    />
                    <button
                      type="button"
                      className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                      onClick={() => setShowPwd((p) => !p)}
                      aria-label="Toggle password"
                    >
                      <i
                        className={`ri-${showPwd ? "eye-off" : "eye"}-line`}
                        style={{ fontSize: 18 }}
                      />
                    </button>
                  </div>
                </Field>
              </div>
            </div>
          </Card>

          {/* ACTIONS */}
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
              <button
                type="button"
                onClick={handleReset}
                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                style={{ background: "none", cursor: "pointer" }}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
                style={{ minWidth: 160 }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Saving…
                  </>
                ) : (
                  "Save Student"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
