import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));

    // Clear password error when typing
    if (id === 'password' || id === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }

    // Here you would call your registration API
    console.log('Registration data:', formData);
    alert('Registration successful! (demo)');
    // Navigate to login or dashboard
    // navigate('/auth/login');
  };

  const handleRoleClick = (role) => {
    // Quick role selection for demo
    setFormData((prev) => ({ ...prev, role }));
  };

  return (
    <div className="d-lg-flex bg-white min-vh-100">
      {/* Left side image (hidden on small screens) */}
      <div className="w-50 d-lg-block d-none overflow-hidden d-flex">
        <img
          src="../src/assets/images/thumbs/login-img.png"
          alt="Register"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      {/* Right side form */}
      <div className="lg-w-50 px-24 py-40 d-flex justify-content-center align-items-center">
        <div className="max-w-540-px mx-auto w-100">
          <Link to="/" className="d-inline-block">
            <img src="../src/assets/images/logo.png" alt="Logo" />
          </Link>

          <div className="mt-48 mb-32">
            <h1 className="h6 fw-bold text-primary-light">Create Your Account 🚀</h1>
            <p className="text-sm text-secondary-light">
              Fill in the details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-24">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="text-sm fw-semibold text-primary-light mb-8 d-block">
                Full Name <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm fw-semibold text-primary-light mb-8 d-block">
                Email Address <span className="text-danger-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
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
                  required
                />
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Confirm Password <span className="text-danger-600">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`ri-${showConfirmPassword ? 'eye-off' : 'eye'}-line`}></i>
                </button>
              </div>
              {passwordError && (
                <div className="text-danger-600 text-sm mt-2">{passwordError}</div>
              )}
            </div>

            {/* Role Select */}
            <div>
              <label htmlFor="role" className="text-sm fw-semibold text-primary-light mb-8 d-block">
                Select Role
              </label>
              <select
                id="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Choose your role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Guardian">Guardian</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Quick role buttons (optional, like login page) */}
            <div className="d-flex flex-wrap gap-2">
              {['Student', 'Teacher', 'Guardian', 'Admin'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleClick(role)}
                  className="btn btn-outline-secondary btn-sm"
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Terms */}
            <div className="form-check style-check d-flex align-items-center">
              <input
                className="form-check-input border border-neutral-400"
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="termsAccepted">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 text-decoration-underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary-600 w-100 py-16 radius-8 text-sm fw-semibold">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-24 text-center text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary-600 fw-semibold text-decoration-underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;