import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, roleHomeMap } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Server error: ${response.status}`);

      login(data.token, data.user);

      // Redirect based on role
      const destination = roleHomeMap[data.user.role] || "/";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-lg-flex bg-white min-vh-100">
      {/* Left image panel */}
      <div className="w-50 d-lg-flex d-none overflow-hidden">
        <img
          src="../src/assets/images/thumbs/login-img.png"
          alt="Login"
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      {/* Right form panel */}
      <div className="lg-w-50 px-24 py-32 d-flex justify-content-center align-items-center">
        <div className="max-w-540-px mx-auto w-100">
          <Link to="/" className="d-inline-block">
            <img src="../src/assets/images/logo.png" alt="Logo" />
          </Link>

          <div className="mt-32 mb-32">
            <h1 className="h6 fw-bold text-primary-light mb-8">Welcome Back</h1>
            <p className="text-sm text-secondary-light mb-0">
              Log in to your account to continue
            </p>
          </div>

          {error && (
            <div className="alert alert-danger text-sm py-2 mb-3" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-32">
            <div className="d-flex flex-column gap-16">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm fw-semibold text-primary-light d-inline-block mb-8"
                >
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

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm fw-semibold text-primary-light d-inline-block mb-8"
                >
                  Password <span className="text-danger-600">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
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
                    className="btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label="Toggle password visibility"
                  >
                    <i className={`ri-${showPassword ? "eye-off" : "eye"}-line`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot password */}
            <div className="d-flex justify-content-end">
              <Link
                to="/forgot-password"
                className="text-primary-600 fw-medium text-decoration-underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-8"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="mt-32 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary-600 fw-semibold text-decoration-underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;