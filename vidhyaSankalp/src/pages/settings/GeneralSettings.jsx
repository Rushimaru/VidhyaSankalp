import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GeneralSettings = () => {
  // ---------- State ----------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    address: '',
  });

  // File states with preview URLs
  const [logo1, setLogo1] = useState(null);
  const [logo1Preview, setLogo1Preview] = useState(null);
  const [logo2, setLogo2] = useState(null);
  const [logo2Preview, setLogo2Preview] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file uploads with preview
  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Logo 1:', logo1);
    console.log('Logo 2:', logo2);
    alert('Settings saved (demo)');
  };

  // Handle reset (clear form and file previews)
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      country: '',
      city: '',
      state: '',
      zip: '',
      address: '',
    });
    setLogo1(null);
    setLogo1Preview(null);
    setLogo2(null);
    setLogo2Preview(null);
  };

  // Placeholder for "Add General" button (if needed)
  const handleAddGeneral = () => {
    alert('Add General button clicked – you can implement a modal or drawer here.');
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">General Settings</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/settings" className="text-secondary-light hover-text-primary hover-underline"> / Settings</Link>
            <span className="text-secondary-light"> / General</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={handleAddGeneral}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add General
        </button>
      </div>

      {/* Form Card */}
      <div className="card h-100 p-0 radius-12 overflow-hidden">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Full Name */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Full Name <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="name"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Email <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control radius-8"
                    id="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control radius-8"
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Website */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="website" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Website
                  </label>
                  <input
                    type="url"
                    className="form-control radius-8"
                    id="website"
                    placeholder="Website URL"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="country" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Country <span className="text-danger-600">*</span>
                  </label>
                  <select
                    className="form-control radius-8 form-select"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Country</option>
                    <option value="USA">USA</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              {/* City */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="city" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    City <span className="text-danger-600">*</span>
                  </label>
                  <select
                    className="form-control radius-8 form-select"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select City</option>
                    <option value="Washington">Washington</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Punjab">Punjab</option>
                  </select>
                </div>
              </div>

              {/* State */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="state" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    State <span className="text-danger-600">*</span>
                  </label>
                  <select
                    className="form-control radius-8 form-select"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select State</option>
                    <option value="Washington">Washington</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Punjab">Punjab</option>
                  </select>
                </div>
              </div>

              {/* Zip Code */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="zip" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Zip Code <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="zip"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="col-sm-12">
                <div className="mb-20">
                  <label htmlFor="address" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Address <span className="text-danger-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="address"
                    placeholder="Enter Your Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Logo Uploads */}
              <div className="row gy-4">
                {/* Logo 1 */}
                <div className="col-md-6">
                  <label htmlFor="logo1" className="form-label fw-semibold text-secondary-light text-md mb-8">
                    Logo <span className="text-secondary-light fw-normal">(140px X 140px)</span>
                  </label>
                  <input
                    type="file"
                    className="form-control radius-8"
                    id="logo1"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setLogo1, setLogo1Preview)}
                  />
                  <div className="avatar-upload mt-16">
                    <div className="avatar-preview style-two">
                      {logo1Preview ? (
                        <img
                          src={logo1Preview}
                          alt="Logo preview"
                          style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ) : (
                        <div
                          id="previewImage1"
                          style={{
                            width: '140px',
                            height: '140px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                          }}
                        >
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logo 2 */}
                <div className="col-md-6">
                  <label htmlFor="logo2" className="form-label fw-semibold text-secondary-light text-md mb-8">
                    Logo <span className="text-secondary-light fw-normal">(140px X 140px)</span>
                  </label>
                  <input
                    type="file"
                    className="form-control radius-8"
                    id="logo2"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setLogo2, setLogo2Preview)}
                  />
                  <div className="avatar-upload mt-16">
                    <div className="avatar-preview style-two">
                      {logo2Preview ? (
                        <img
                          src={logo2Preview}
                          alt="Logo preview"
                          style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      ) : (
                        <div
                          id="previewImage2"
                          style={{
                            width: '140px',
                            height: '140px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                          }}
                        >
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
                >
                  Save Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;