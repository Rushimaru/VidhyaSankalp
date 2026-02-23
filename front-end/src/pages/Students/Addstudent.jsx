import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropZone = ({ label, required }) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  return (
    <div>
      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
        {label} {required && <span className="text-danger-600">*</span>}
      </label>
      <label
        className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200"
        style={{ cursor: 'pointer' }}
      >
        <span className="drop-zone__prompt text-sm">
          {fileName || 'Drag & drop a file here or click'}
        </span>
        <input
          type="file"
          name="myFile"
          className="drop-zone__input"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

const FormField = ({ label, required, children }) => (
  <div>
    <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
      {label} {required && <span className="text-danger-600">*</span>}
    </label>
    {children}
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="col-lg-12">
    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-lg fw-semibold mb-0">{title}</h6>
      </div>
      <div className="card-body p-20">{children}</div>
    </div>
  </div>
);

const HalfSectionCard = ({ title, children, colClass = 'col-xxl-6' }) => (
  <div className={colClass}>
    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
        <h6 className="text-lg fw-semibold mb-0">{title}</h6>
      </div>
      <div className="card-body p-20">{children}</div>
    </div>
  </div>
);

const AddStudent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [guardian, setGuardian] = useState('father');

  const [formData, setFormData] = useState({
    academicYear: 'Jun 2025/2026',
    classSelection: '',
    section: '',
    rollNumber: '',
    admissionNo: '',
    fullName: '',
    category: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    studentEmail: '',
    fathersName: '',
    fathersPhone: '',
    fathersOccupation: '',
    mothersName: '',
    mothersPhone: '',
    mothersOccupation: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianOccupation: '',
    guardianAddress: '',
    bloodGroup: '',
    height: '',
    weight: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    nationalId: '',
    prevSchoolName: '',
    prevSchoolAddress: '',
    currentAddress: '',
    permanentAddress: '',
    hostel: '',
    roomNo: '',
    docName: '',
    details: '',
    loginEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Data:', formData);
    alert('Student saved successfully!');
  };

  const handleReset = () => {
    setFormData({
      academicYear: 'Jun 2025/2026', classSelection: '', section: '',
      rollNumber: '', admissionNo: '', fullName: '', category: '',
      gender: '', dateOfBirth: '', phoneNumber: '', studentEmail: '',
      fathersName: '', fathersPhone: '', fathersOccupation: '',
      mothersName: '', mothersPhone: '', mothersOccupation: '',
      guardianName: '', guardianEmail: '', guardianPhone: '',
      guardianOccupation: '', guardianAddress: '', bloodGroup: '',
      height: '', weight: '', bankAccountNumber: '', bankName: '',
      ifscCode: '', nationalId: '', prevSchoolName: '', prevSchoolAddress: '',
      currentAddress: '', permanentAddress: '', hostel: '', roomNo: '',
      docName: '', details: '', loginEmail: '', password: '',
    });
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Add New Student</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <Link to="/students" className="text-secondary-light hover-text-primary hover-underline">
              {' '}/ Student
            </Link>
            <span className="text-secondary-light"> / Add New Student</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-24">
        <div className="row gy-3">

          {/* ═══ PERSONAL INFO ════════════════════════════════════════════════ */}
          <SectionCard title="Personal Info">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Academic Year" required>
                  <select id="academicYear" className="form-control form-select"
                    value={formData.academicYear} onChange={handleChange}>
                    <option value="Jun 2025/2026">Jun 2025/2026</option>
                    <option value="Jun 2026/2027">Jun 2026/2027</option>
                    <option value="Jun 2027/2028">Jun 2027/2028</option>
                    <option value="Jun 2028/2029">Jun 2028/2029</option>
                  </select>
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Class" required>
                  <select id="classSelection" className="form-control form-select"
                    value={formData.classSelection} onChange={handleChange}>
                    <option value="" disabled>Select a class</option>
                    <option value="Primary">Primary</option>
                    <option value="High school">High school</option>
                    <option value="College">College</option>
                  </select>
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Section" required>
                  <select id="section" className="form-control form-select"
                    value={formData.section} onChange={handleChange}>
                    <option value="" disabled>Select section</option>
                    <option value="Science">Science</option>
                    <option value="Art">Art</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Roll Number">
                  <input type="text" className="form-control" id="rollNumber"
                    placeholder="Enter your rollNumber"
                    value={formData.rollNumber} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Admission No" required>
                  <input type="text" className="form-control" id="admissionNo"
                    placeholder="Enter admission number"
                    value={formData.admissionNo} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Full Name" required>
                  <input type="text" className="form-control" id="fullName"
                    placeholder="Enter your Full Name"
                    value={formData.fullName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Category" required>
                  <input type="text" className="form-control" id="category"
                    placeholder="Select a Category"
                    value={formData.category} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Gender">
                  <select id="gender" className="form-control form-select"
                    value={formData.gender} onChange={handleChange}>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Date Of Birth" required>
                  <input type="date" className="form-control" id="dateOfBirth"
                    value={formData.dateOfBirth} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Phone Number" required>
                  <input type="text" className="form-control" id="phoneNumber"
                    placeholder="Enter your Phone Number"
                    value={formData.phoneNumber} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Email" required>
                  <input type="email" className="form-control" id="studentEmail"
                    placeholder="Enter your Email"
                    value={formData.studentEmail} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <DropZone label="Student Photo" required />
              </div>
            </div>
          </SectionCard>

          {/* ═══ PARENT & GUARDIAN INFO ═══════════════════════════════════════ */}
          <SectionCard title="Parent & Guardian Info">
            <div className="row gy-3">
              {/* Father */}
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Fathers Name">
                  <input type="text" className="form-control" id="fathersName"
                    placeholder="Enter Fathers Name"
                    value={formData.fathersName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Phone Number">
                  <input type="tel" className="form-control" id="fathersPhone"
                    placeholder="Enter Fathers Number"
                    value={formData.fathersPhone} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Father Occupation">
                  <input type="text" className="form-control" id="fathersOccupation"
                    placeholder="Enter Father Occupation"
                    value={formData.fathersOccupation} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <DropZone label="Fathers Photo" required />
              </div>

              {/* Mother */}
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Mothers Name">
                  <input type="text" className="form-control" id="mothersName"
                    placeholder="Enter mothers Name"
                    value={formData.mothersName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Phone Number">
                  <input type="tel" className="form-control" id="mothersPhone"
                    placeholder="Enter mothers Number"
                    value={formData.mothersPhone} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Mother Occupation">
                  <input type="text" className="form-control" id="mothersOccupation"
                    placeholder="Enter Mother Occupation"
                    value={formData.mothersOccupation} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <DropZone label="Mothers Photo" required />
              </div>

              {/* Select Guardian */}
              <div className="col-12">
                <div className="mt-24">
                  <span className="text-lg fw-bold text-primary-light d-inline-block mb-8">
                    Select a Guardian
                  </span>
                  <div className="d-flex align-items-center flex-wrap gap-28">
                    {[
                      { id: 'selectFather', value: 'father', label: 'Father', cls: 'checked-primary' },
                      { id: 'selectMother', value: 'mother', label: 'Mother', cls: 'checked-secondary' },
                      { id: 'selectOthers', value: 'others', label: 'Others', cls: 'checked-success'   },
                    ].map(({ id, value, label, cls }) => (
                      <div key={id} className={`form-check ${cls} d-flex align-items-center gap-2`}>
                        <input className="form-check-input" type="radio" name="guardianRadio"
                          id={id} value={value}
                          checked={guardian === value}
                          onChange={() => setGuardian(value)} />
                        <label className="form-check-label line-height-1 fw-medium text-secondary-light" htmlFor={id}>
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guardian Details */}
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Guardian Name">
                  <input type="text" className="form-control" id="guardianName"
                    placeholder="Enter Guardian Name"
                    value={formData.guardianName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Guardian Email">
                  <input type="email" className="form-control" id="guardianEmail"
                    placeholder="Enter Guardian Email"
                    value={formData.guardianEmail} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Phone Number">
                  <input type="tel" className="form-control" id="guardianPhone"
                    placeholder="Enter Guardian Number"
                    value={formData.guardianPhone} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Guardian Occupation">
                  <input type="text" className="form-control" id="guardianOccupation"
                    placeholder="Enter Occupation"
                    value={formData.guardianOccupation} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xl-9 col-sm-6">
                <FormField label="Guardian Address">
                  <input type="text" className="form-control" id="guardianAddress"
                    placeholder="Enter Guardian Address"
                    value={formData.guardianAddress} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xl-3 col-sm-6">
                <DropZone label="Guardian Photo" required />
              </div>
            </div>
          </SectionCard>

          {/* ═══ MEDICAL DETAILS ══════════════════════════════════════════════ */}
          <SectionCard title="Medical Details">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Blood Group">
                  <select id="bloodGroup" className="form-control form-select"
                    value={formData.bloodGroup} onChange={handleChange}>
                    <option value="" disabled>Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="AB-">AB-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Height">
                  <input type="text" className="form-control" id="height"
                    placeholder="Enter height (e.g. 160 cm)"
                    value={formData.height} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Weight">
                  <input type="text" className="form-control" id="weight"
                    placeholder="Enter weight (e.g. 55 kg)"
                    value={formData.weight} onChange={handleChange} />
                </FormField>
              </div>
            </div>
          </SectionCard>

          {/* ═══ BANK DETAILS ═════════════════════════════════════════════════ */}
          <SectionCard title="Bank Details">
            <div className="row gy-3">
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Bank Account Number">
                  <input type="text" className="form-control" id="bankAccountNumber"
                    placeholder="Enter bank account number"
                    value={formData.bankAccountNumber} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="Bank Name">
                  <input type="text" className="form-control" id="bankName"
                    placeholder="Enter bank name"
                    value={formData.bankName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="IFSC Code">
                  <input type="text" className="form-control" id="ifscCode"
                    placeholder="Enter IFSC Code"
                    value={formData.ifscCode} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-xxl-3 col-xl-4 col-sm-6">
                <FormField label="National Identification Number">
                  <input type="text" className="form-control" id="nationalId"
                    placeholder="Enter national identification number"
                    value={formData.nationalId} onChange={handleChange} />
                </FormField>
              </div>
            </div>
          </SectionCard>

          {/* ═══ PREVIOUS SCHOOL + ADDRESS (side by side) ════════════════════ */}
          <HalfSectionCard title="Previous School Details">
            <div className="row gy-3">
              <div className="col-sm-6">
                <FormField label="School Name">
                  <input type="text" className="form-control" id="prevSchoolName"
                    placeholder="Enter School Name"
                    value={formData.prevSchoolName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-sm-6">
                <FormField label="Address">
                  <input type="text" className="form-control" id="prevSchoolAddress"
                    placeholder="Enter Address"
                    value={formData.prevSchoolAddress} onChange={handleChange} />
                </FormField>
              </div>
            </div>
          </HalfSectionCard>

          <HalfSectionCard title="Address">
            <div className="row gy-3">
              <div className="col-sm-6">
                <FormField label="Current Address">
                  <input type="text" className="form-control" id="currentAddress"
                    placeholder="Enter Current Address"
                    value={formData.currentAddress} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-sm-6">
                <FormField label="Permanent Address">
                  <input type="text" className="form-control" id="permanentAddress"
                    placeholder="Enter Permanent Address"
                    value={formData.permanentAddress} onChange={handleChange} />
                </FormField>
              </div>
            </div>
          </HalfSectionCard>

          {/* ═══ HOSTEL + UPLOAD DOCUMENTS (side by side) ════════════════════ */}
          <HalfSectionCard title="Hostel Details">
            <div className="row gy-3">
              <div className="col-sm-6">
                <FormField label="Hostel">
                  <input type="text" className="form-control" id="hostel"
                    placeholder="Enter Hostel"
                    value={formData.hostel} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-sm-6">
                <FormField label="Room No">
                  <input type="text" className="form-control" id="roomNo"
                    placeholder="Enter Room No"
                    value={formData.roomNo} onChange={handleChange} />
                </FormField>
              </div>
            </div>
          </HalfSectionCard>

          <HalfSectionCard title="Upload Documents">
            <div className="row gy-3">
              <div className="col-sm-6">
                <FormField label="Doc Name">
                  <input type="text" className="form-control" id="docName"
                    placeholder="Enter Doc Name"
                    value={formData.docName} onChange={handleChange} />
                </FormField>
              </div>
              <div className="col-sm-6">
                <DropZone label="Upload Document" required />
              </div>
            </div>
          </HalfSectionCard>

          {/* ═══ STUDENT DETAILS ══════════════════════════════════════════════ */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Student Details</h6>
              </div>
              <div className="card-body p-20">
                <FormField label="Details">
                  <textarea id="details" className="form-control" rows={4}
                    placeholder="Enter details"
                    value={formData.details} onChange={handleChange} />
                </FormField>
              </div>
            </div>
          </div>

          {/* ═══ LOGIN DETAILS ════════════════════════════════════════════════ */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Login Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <FormField label="Email" required>
                      <input type="email" className="form-control" id="loginEmail"
                        placeholder="Enter Email"
                        value={formData.loginEmail} onChange={handleChange} />
                    </FormField>
                  </div>
                  <div className="col-sm-6">
                    <FormField label="Password" required>
                      <div className="position-relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={formData.password} onChange={handleChange}
                        />
                        <span
                          className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: 'pointer' }}
                        >
                          <iconify-icon
                            icon={showPassword ? 'ri:eye-off-line' : 'ri:eye-line'}
                            style={{ fontSize: '18px' }}
                          ></iconify-icon>
                        </span>
                      </div>
                    </FormField>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ ACTION BUTTONS ═══════════════════════════════════════════════ */}
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
              <button
                type="button"
                onClick={handleReset}
                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                style={{ background: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
              >
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddStudent;