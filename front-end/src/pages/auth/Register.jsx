import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms & Conditions.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      // ✅ Redirect to OTP page, pass email via state
      navigate('/auth/verify-otp', { state: { email: formData.email } });

    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-lg-flex bg-white min-vh-100">
      <div className="w-50 d-lg-flex d-none overflow-hidden">
        <img
          src="../src/assets/images/thumbs/login-img.png"
          alt="Register"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="lg-w-50 px-24 py-40 d-flex justify-content-center align-items-center">
        <div className="max-w-540-px mx-auto w-100">
          <Link to="/" className="d-inline-block">
            <img src="../src/assets/images/logo.png" alt="Logo" />
          </Link>

          <div className="mt-48 mb-32">
            <h1 className="h6 fw-bold text-primary-light">Create Your Account</h1>
            <p className="text-sm text-secondary-light">Fill in the details to get started</p>
          </div>

          {serverError && (
            <div className="alert alert-danger text-sm py-2 mb-3" role="alert">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-20" noValidate>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="text-sm fw-semibold text-primary-light mb-8 d-block">
                Full Name <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm fw-semibold text-primary-light mb-8 d-block">
                Email Address <span className="text-danger-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line`}></i>
                </button>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <i className={`ri-${showConfirmPassword ? 'eye-off' : 'eye'}-line`}></i>
                </button>
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>

            {/* Terms */}
            <div>
              <div className="form-check style-check d-flex align-items-center">
                <input
                  className={`form-check-input border border-neutral-400 ${errors.termsAccepted ? 'is-invalid' : ''}`}
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="termsAccepted">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 text-decoration-underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              {errors.termsAccepted && (
                <div className="text-danger-600 text-sm mt-1">{errors.termsAccepted}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary-600 w-100 py-16 radius-8 text-sm fw-semibold"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

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