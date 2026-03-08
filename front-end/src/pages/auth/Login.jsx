import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log('Status:', response.status);
      const text = await response.text();   // get raw text
      console.log('Raw response:', text);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = JSON.parse(text);        // manually parse
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleClick = (role) => {
    // Optional: pre‑fill demo credentials
    const demoEmails = {
      SuperAdmin: 'superadmin@example.com',
      Admin: 'admin@example.com',
      Student: 'student@example.com',
      Teacher: 'teacher@example.com',
      Guardian: 'guardian@example.com',
      Librarian: 'librarian@example.com',
    };
    setFormData({
      email: demoEmails[role] || `${role.toLowerCase()}@example.com`,
      password: 'password',
      remember: false,
    });
  };

  return (
    <div className="d-lg-flex bg-white min-vh-100">
      {/* Left side image (place images in public folder) */}
      <div className="w-50 d-lg-flex d-none overflow-hidden">
        <img
          src="../src/assets/images/thumbs/login-img.png"
          alt="Login"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="lg-w-50 px-24 py-32 d-flex justify-content-center align-items-center">
        <div className="max-w-540-px mx-auto w-100">
          <Link to="/" className="d-inline-block">
            <img src="../src/assets/images/logo.png" alt="Logo" />
          </Link>

          <div className="mt-32 mb-32">
            <h1 className="h6 fw-bold text-primary-light mb-8">Welcome Back 👋</h1>
            <p className="text-sm text-secondary-light mb-0">Log in to your account to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger text-sm py-2 mb-3" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-32">
            <div className="d-flex flex-column gap-16">
              <div>
                <label htmlFor="email" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
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
                  disabled={loading}
                />
              </div>

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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line`}></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between gap-2">
              <div className="form-check style-check d-flex align-items-center">
                <input
                  className="form-check-input border border-neutral-400"
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-primary-600 fw-medium text-decoration-underline">
                Forgot Password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-8"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>

            <div className="text-center text-sm text-secondary-light">or login as</div>

            <div className="d-grid sm-grid-cols-3 grid-cols-2 gap-16">
              {[
                { role: 'SuperAdmin', bg: 'bg-success', icon: 'sheild-icon.png', label: 'Supper Admin' },
                { role: 'Admin', bg: 'bg-info-600', icon: 'dashboard-icon.png', label: 'Admin' },
                { role: 'Student', bg: 'bg-warning-600', icon: 'student-icon.png', label: 'Student' },
                { role: 'Teacher', bg: 'bg-purple-600', icon: 'teacher-icon.png', label: 'Teacher' },
                { role: 'Guardian', bg: 'bg-primary-600', icon: 'guardian-icon.png', label: 'Guardians' },
                { role: 'Librarian', bg: 'bg-pink', icon: 'library-icon.png', label: 'Librarian' },
              ].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleClick(item.role)}
                  className={`d-flex align-items-center gap-8 fw-semibold text-sm radius-6 justify-content-center flex-grow-1 ${item.bg} text-white py-10 px-8 border-0`}
                  disabled={loading}
                >
                  <span className="d-flex">
                    <img src={`/assets/images/icons/${item.icon}`} alt={item.label} />
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </form>

          <div className="mt-32 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-primary-600 fw-semibold text-decoration-underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;