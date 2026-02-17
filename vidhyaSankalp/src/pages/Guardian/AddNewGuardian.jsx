import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddNewGuardian = () => {
  // Form state
  const [formData, setFormData] = useState({
    guardianType: '',
    guardianName: '',
    phoneNumber: '',
    occupation: '',
    guardianAddress: '',
    guardianPhoto: null,
    email: '',
    password: '',
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
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
    console.log('Guardian Data:', formData);
    // Here you would send data to API
    alert('Guardian added successfully!');
  };

  // Handle reset (clear form)
  const handleReset = () => {
    setFormData({
      guardianType: '',
      guardianName: '',
      phoneNumber: '',
      occupation: '',
      guardianAddress: '',
      guardianPhoto: null,
      email: '',
      password: '',
    });
    setShowPassword(false);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Add New Guardian</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <span className="text-secondary-light"> / Add New Guardian</span>
          </div>
        </div>
        <Link to="/guardians/add" className="btn btn-primary-600 d-flex align-items-center gap-6 d-none">
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Guardian
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-24">
        <div className="row gy-3">
          {/* Personal Info Card */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Personal Info</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Type
                      </label>
                      <select
                        id="guardianType"
                        className="form-control form-select"
                        value={formData.guardianType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select Guardian</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Uncle">Uncle</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Name
                      </label>
                      <input
                        type="text"
                        id="guardianName"
                        className="form-control"
                        placeholder="Enter guardian name"
                        value={formData.guardianName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="phoneNumber" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="occupation" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        className="form-control"
                        placeholder="Enter occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6">
                    <div>
                      <label htmlFor="guardianAddress" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Address
                      </label>
                      <input
                        type="text"
                        id="guardianAddress"
                        className="form-control"
                        placeholder="Enter guardian address"
                        value={formData.guardianAddress}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-6">
                    <div>
                      <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Guardian Photo <span className="text-danger-600">*</span>
                      </label>
                      <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                        <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                        <input
                          type="file"
                          id="guardianPhoto"
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

          {/* Login Details Card */}
          <div className="col-xl-12">
            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Login Details</h6>
              </div>
              <div className="card-body p-20">
                <div className="row gy-3">
                  <div className="col-sm-6">
                    <div>
                      <label htmlFor="email" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                        Email <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={formData.email}
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

export default AddNewGuardian;