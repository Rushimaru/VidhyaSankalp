import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EditTeacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // If teacher data was passed via state (from TeacherList), use it; otherwise null
  const teacherData = location.state?.teacher || null;

  // Form state
  const [formData, setFormData] = useState({
    teacherId: '',
    fullName: '',
    subject: '',
    class: '',
    gender: '',
    dateOfBirth: '',
    fathersName: '',
    mothersName: '',
    maritalStatus: '',
    contractType: '',
    shift: '',
    workLocation: '',
    joinDate: '',
    phoneNumber: '',
    email: '',
    experience: '',
    qualification: '',
    teacherPhoto: null,
    bloodGroup: '',
    height: '',
    weight: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    nationalId: '',
    docName: '',
    documentFile: null,
    previousSchoolName: '',
    previousSchoolAddress: '',
    currentAddress: '',
    permanentAddress: '',
    teacherDetails: '',
    facebookLink: '',
    linkedInLink: '',
    instagramLink: '',
    youtubeLink: '',
    loginEmail: '',
    password: '',
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Load teacher data if available (for editing)
  useEffect(() => {
    if (teacherData) {
      // Pre-fill form with existing teacher data
      setFormData((prev) => ({
        ...prev,
        ...teacherData,
        // Handle nested/renamed fields if necessary
      }));
    }
  }, [teacherData]);

  // Handle input changes for text, select, date
  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Teacher Data:', formData);
    // Here you would send updated data to API
    alert('Teacher updated successfully!');
    navigate('/teachers'); // Redirect to teacher list after save
  };

  // Handle reset (cancel)
  const handleReset = () => {
    if (teacherData) {
      // Reset to original teacher data
      setFormData((prev) => ({
        ...prev,
        ...teacherData,
      }));
    } else {
      // If no original data, clear form
      setFormData({
        teacherId: '',
        fullName: '',
        subject: '',
        class: '',
        gender: '',
        dateOfBirth: '',
        fathersName: '',
        mothersName: '',
        maritalStatus: '',
        contractType: '',
        shift: '',
        workLocation: '',
        joinDate: '',
        phoneNumber: '',
        email: '',
        experience: '',
        qualification: '',
        teacherPhoto: null,
        bloodGroup: '',
        height: '',
        weight: '',
        bankAccountNumber: '',
        bankName: '',
        ifscCode: '',
        nationalId: '',
        docName: '',
        documentFile: null,
        previousSchoolName: '',
        previousSchoolAddress: '',
        currentAddress: '',
        permanentAddress: '',
        teacherDetails: '',
        facebookLink: '',
        linkedInLink: '',
        instagramLink: '',
        youtubeLink: '',
        loginEmail: '',
        password: '',
      });
    }
    setShowPassword(false);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Edit Teacher</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <Link to="/teachers" className="text-secondary-light hover-text-primary hover-underline">
              / Teacher
            </Link>
            <span className="text-secondary-light"> / Edit Teacher</span>
          </div>
        </div>
        <Link to="/teachers/add" className="btn btn-primary-600 d-flex align-items-center gap-6 d-none">
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Teacher
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
                      <label htmlFor="teacherId" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Teacher ID <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="teacherId"
                        placeholder="Enter Teacher ID"
                        value={formData.teacherId}
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
                      <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Subject
                      </label>
                      <select
                        id="subject"
                        className="form-control form-select"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select a Subject</option>
                        <option value="English">English</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Class
                      </label>
                      <select
                        id="class"
                        className="form-control form-select"
                        value={formData.class}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select a Class</option>
                        <option value="1 (A)">1 (A)</option>
                        <option value="2 (A)">2 (A)</option>
                        <option value="3 (A)">3 (A)</option>
                      </select>
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
                      <label htmlFor="maritalStatus" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Marital Status
                      </label>
                      <select
                        id="maritalStatus"
                        className="form-control form-select"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select a Marital Status</option>
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="contractType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Contract Type
                      </label>
                      <select
                        id="contractType"
                        className="form-control form-select"
                        value={formData.contractType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select a Contract Type</option>
                        <option value="Contractual">Contractual</option>
                        <option value="Hourly">Hourly</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="shift" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Shift
                      </label>
                      <select
                        id="shift"
                        className="form-control form-select"
                        value={formData.shift}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select a shift</option>
                        <option value="Day Shift">Day Shift</option>
                        <option value="Night Shift">Night Shift</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="workLocation" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Work Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="workLocation"
                        placeholder="Enter work location"
                        value={formData.workLocation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="joinDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Join Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="joinDate"
                        value={formData.joinDate}
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
                        type="tel"
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
                        type="email"
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
                      <label htmlFor="experience" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Experience <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="experience"
                        placeholder="Enter experience"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="qualification" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Qualification <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="qualification"
                        placeholder="Enter Qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Teacher Photo <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input
                          type="file"
                          id="teacherPhoto"
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

          {/* Medical Details Card */}
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

          {/* Bank Details Card */}
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

          {/* Upload Documents Card */}
          <div className="col-xxl-12">
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
                        Upload File
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input
                          type="file"
                          id="documentFile"
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

          {/* Teacher Details (textarea) */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Teacher Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-12">
                    <div>
                      <label htmlFor="teacherDetails" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Teacher Details
                      </label>
                      <textarea
                        id="teacherDetails"
                        className="form-control"
                        placeholder="Enter details"
                        rows="4"
                        value={formData.teacherDetails}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Social Links</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="facebookLink" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Facebook
                      </label>
                      <input
                        type="text"
                        id="facebookLink"
                        className="form-control"
                        placeholder="Enter your facebook link"
                        value={formData.facebookLink}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="linkedInLink" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        id="linkedInLink"
                        className="form-control"
                        placeholder="Enter your LinkedIn link"
                        value={formData.linkedInLink}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="instagramLink" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Instagram
                      </label>
                      <input
                        type="text"
                        id="instagramLink"
                        className="form-control"
                        placeholder="Enter your Instagram link"
                        value={formData.instagramLink}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="youtubeLink" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        YouTube
                      </label>
                      <input
                        type="text"
                        id="youtubeLink"
                        className="form-control"
                        placeholder="Enter your YouTube link"
                        value={formData.youtubeLink}
                        onChange={handleChange}
                      />
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
                Reset
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

export default EditTeacher;