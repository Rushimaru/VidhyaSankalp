import React, { useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VerifyOtp = () => {
  const { state } = useLocation();
  const email = state?.email || '';
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, ''); // digits only
    if (!val) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError('');
    // Auto-focus next
    if (index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length < 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed.');
      }

      // ✅ Log user in and redirect to dashboard
      login(data.token, data.user);
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
      <div className="max-w-540-px w-100 px-24 py-40 text-center">
        <Link to="/" className="d-inline-block mb-32">
          <img src="../src/assets/images/logo.png" alt="Logo" />
        </Link>

        <h1 className="h6 fw-bold text-primary-light mb-8">Verify Your Email</h1>
        <p className="text-sm text-secondary-light mb-32">
          We sent a 6-digit OTP to <strong>{email}</strong>. Enter it below.
        </p>

        {error && (
          <div className="alert alert-danger text-sm py-2 mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* OTP inputs */}
          <div className="d-flex justify-content-center gap-12 mb-32">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="form-control text-center fw-bold fs-5"
                style={{ width: '52px', height: '52px' }}
                disabled={loading}
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary-600 w-100 py-16 radius-8 text-sm fw-semibold"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-24 text-sm text-secondary-light">
          Didn't receive the OTP?{' '}
          <button
            className="btn btn-link p-0 text-primary-600 fw-semibold text-decoration-underline"
            onClick={() => navigate('/auth/register')}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;