import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditStudent = () => {
  // State for all form fields
  const [formData, setFormData] = useState({
    academicYear: 'Jun 2025/2026',
    class: '',
    section: '',
    rollNumber: '',
    admissionNo: '',
    fullName: '',
    category: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    studentPhoto: null,
    fathersName: '',
    fathersPhoneNumber: '',
    fathersOccupation: '',
    fathersPhoto: null,
    mothersName: '',
    mothersPhoneNumber: '',
    mothersOccupation: '',
    mothersPhoto: null,
    guardian: 'father', // radio: father, mother, others
    guardianName: '',
    guardianEmail: '',
    guardianPhoneNumber: '',
    guardianOccupation: '',
    guardianAddress: '',
    guardianPhoto: null,
    bloodGroup: '',
    height: '',
    weight: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    nationalId: '',
    previousSchoolName: '',
    previousSchoolAddress: '',
    currentAddress: '',
    permanentAddress: '',
    hostel: '',
    roomNo: '',
    docName: '',
    documentFile: null,
    details: '',
    loginEmail: '',
    password: '',
  });

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else if (type === 'radio') {
      setFormData((prev) => ({ ...prev, guardian: value }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would send data to API
    alert('Student updated successfully!');
  };

  // Handle reset (cancel)
  const handleReset = () => {
    setFormData({
      academicYear: 'Jun 2025/2026',
      class: '',
      section: '',
      rollNumber: '',
      admissionNo: '',
      fullName: '',
      category: '',
      gender: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      studentPhoto: null,
      fathersName: '',
      fathersPhoneNumber: '',
      fathersOccupation: '',
      fathersPhoto: null,
      mothersName: '',
      mothersPhoneNumber: '',
      mothersOccupation: '',
      mothersPhoto: null,
      guardian: 'father',
      guardianName: '',
      guardianEmail: '',
      guardianPhoneNumber: '',
      guardianOccupation: '',
      guardianAddress: '',
      guardianPhoto: null,
      bloodGroup: '',
      height: '',
      weight: '',
      bankAccountNumber: '',
      bankName: '',
      ifscCode: '',
      nationalId: '',
      previousSchoolName: '',
      previousSchoolAddress: '',
      currentAddress: '',
      permanentAddress: '',
      hostel: '',
      roomNo: '',
      docName: '',
      documentFile: null,
      details: '',
      loginEmail: '',
      password: '',
    });
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Edit Student</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <Link to="/students" className="text-secondary-light hover-text-primary hover-underline">
              / Student
            </Link>
            <span className="text-secondary-light"> / Edit Student</span>
          </div>
        </div>
        <Link to="/students/add" className="btn btn-primary-600 d-flex align-items-center gap-6 d-none">
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Student
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-24">
        <div className="row gy-3">
          {/* Personal Info Card */}
          <div className="col-lg-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Personal Info</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="academicYear" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Academic Year <span className="text-danger-600">*</span>
                      </label>
                      <select
                        id="academicYear"
                        className="form-control form-select"
                        value={formData.academicYear}
                        onChange={handleChange}
                      >
                        <option value="Jun 2025/2026">Jun 2025/2026</option>
                        <option value="Jun 2026/2027">Jun 2026/2027</option>
                        <option value="Jun 2027/2028">Jun 2027/2028</option>
                        <option value="Jun 2028/2029">Jun 2028/2029</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Class <span className="text-danger-600">*</span>
                      </label>
                      <select
                        id="class"
                        className="form-control form-select"
                        value={formData.class}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select a class</option>
                        <option value="Primary">Primary</option>
                        <option value="High school">High school</option>
                        <option value="College">College</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Section <span className="text-danger-600">*</span>
                      </label>
                      <select
                        id="section"
                        className="form-control form-select"
                        value={formData.section}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select section</option>
                        <option value="Science">Science</option>
                        <option value="Art">Art</option>
                        <option value="Commerce">Commerce</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="rollNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="rollNumber"
                        placeholder="Enter your rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="admissionNo" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Admission No <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="admissionNo"
                        placeholder="Enter admission number"
                        value={formData.admissionNo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="fullName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Full Name <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter your Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="category" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Category <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        placeholder="Select a Category"
                        value={formData.category}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="gender" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="form-control form-select"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="dateOfBirth" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Date Of Birth <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="phoneNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Phone Number <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="Enter your Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="email" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Email <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Student Photo <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input
                          type="file"
                          id="studentPhoto"
                          className="drop-zone__input"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent & Guardian Info */}
          <div className="col-lg-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Parent & Guardian Info</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  {/* Father */}
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="fathersName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Fathers Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fathersName"
                        placeholder="Enter Fathers Name"
                        value={formData.fathersName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="fathersPhoneNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="fathersPhoneNumber"
                        placeholder="Enter Fathers Number"
                        value={formData.fathersPhoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="fathersOccupation" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Father Occupation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fathersOccupation"
                        placeholder="Enter Father Occupation"
                        value={formData.fathersOccupation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Fathers Photo <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input type="file" id="fathersPhoto" className="drop-zone__input" onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* Mother */}
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="mothersName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Mothers Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mothersName"
                        placeholder="Enter mothers Name"
                        value={formData.mothersName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="mothersPhoneNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="mothersPhoneNumber"
                        placeholder="Enter mothers Number"
                        value={formData.mothersPhoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="mothersOccupation" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Mother Occupation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mothersOccupation"
                        placeholder="Enter Mother Occupation"
                        value={formData.mothersOccupation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Mothers Photo <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input type="file" id="mothersPhoto" className="drop-zone__input" onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* Guardian Selection */}
                  <div className="col-12">
                    <div className="mt-24">
                      <span className="text-lg fw-bold text-primary-light d-inline-block mb-8">Select a Guardian</span>
                      <div className="d-flex align-items-center flex-wrap gap-28">
                        <div className="form-check checked-primary d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="guardian"
                            id="selectFather"
                            value="father"
                            checked={formData.guardian === 'father'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label line-height-1 fw-medium text-secondary-light" htmlFor="selectFather">
                            Father
                          </label>
                        </div>
                        <div className="form-check checked-secondary d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="guardian"
                            id="selectMother"
                            value="mother"
                            checked={formData.guardian === 'mother'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label line-height-1 fw-medium text-secondary-light" htmlFor="selectMother">
                            Mother
                          </label>
                        </div>
                        <div className="form-check checked-success d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="guardian"
                            id="selectOthers"
                            value="others"
                            checked={formData.guardian === 'others'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label line-height-1 fw-medium text-secondary-light" htmlFor="selectOthers">
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guardian Details (only shown if others selected? The original shows always) */}
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="guardianName"
                        placeholder="Enter Guardian Name"
                        value={formData.guardianName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianEmail" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="guardianEmail"
                        placeholder="Enter Guardian Email"
                        value={formData.guardianEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianPhoneNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="guardianPhoneNumber"
                        placeholder="Enter Guardian Number"
                        value={formData.guardianPhoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianOccupation" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Occupation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="guardianOccupation"
                        placeholder="Enter Occupation"
                        value={formData.guardianOccupation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-9 col-sm-6">
                    <div>
                      <label htmlFor="guardianAddress" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="guardianAddress"
                        placeholder="Enter Guardian Address"
                        value={formData.guardianAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Photo <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input type="file" id="guardianPhoto" className="drop-zone__input" onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Details */}
          <div className="col-lg-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Medical Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="bloodGroup" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Blood Group
                      </label>
                      <select
                        id="bloodGroup"
                        className="form-control form-select"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="height" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Height
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="height"
                        placeholder="Enter height"
                        value={formData.height}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="weight" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Weight
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="weight"
                        placeholder="Enter Weight"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="col-lg-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Bank Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="bankAccountNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bankAccountNumber"
                        placeholder="Enter bank account number"
                        value={formData.bankAccountNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="bankName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bankName"
                        placeholder="Enter bank name"
                        value={formData.bankName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="ifscCode" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ifscCode"
                        placeholder="Enter IFSC Code"
                        value={formData.ifscCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="nationalId" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        National Identification Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nationalId"
                        placeholder="Enter national identification number"
                        value={formData.nationalId}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Previous School Details */}
          <div className="col-xxl-6">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Previous School Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="previousSchoolName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        School Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="previousSchoolName"
                        placeholder="Enter School Name"
                        value={formData.previousSchoolName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="previousSchoolAddress" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="previousSchoolAddress"
                        placeholder="Enter Address"
                        value={formData.previousSchoolAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="col-xxl-6">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Address</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="currentAddress" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Current Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="currentAddress"
                        placeholder="Enter Current Address"
                        value={formData.currentAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="permanentAddress" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Permanent Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="permanentAddress"
                        placeholder="Enter Permanent Address"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hostel Details */}
          <div className="col-xxl-6">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Hostel Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="hostel" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Hostel
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="hostel"
                        placeholder="Enter Hostel"
                        value={formData.hostel}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="roomNo" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Room No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="roomNo"
                        placeholder="Enter Room No"
                        value={formData.roomNo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="col-xxl-6">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Upload Documents</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="docName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Doc Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="docName"
                        placeholder="Enter Doc Name"
                        value={formData.docName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Document File <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input type="file" id="documentFile" className="drop-zone__input" onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Details (textarea) */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Student Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-12">
                    <div>
                      <label htmlFor="details" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Details
                      </label>
                      <textarea
                        id="details"
                        className="form-control"
                        placeholder="Enter details"
                        rows="4"
                        value={formData.details}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Details */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Login Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="loginEmail" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Email <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="Enter Email"
                        value={formData.loginEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="password" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Password <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <span
                          className={`toggle-password ${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                          onClick={() => setShowPassword(!showPassword)}
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
              <button
                type="button"
                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                onClick={handleReset}
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

export default EditStudent;