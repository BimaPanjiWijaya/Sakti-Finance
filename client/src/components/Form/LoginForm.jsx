import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../redux/slices/userSlice";

export default function LoginForm({ googleLoginButton }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 border border-gray-200 rounded-lg shadow-lg bg-white"
    >
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
        Welcome Back
      </h2>
      <p className="text-center text-gray-600 mb-8">Sign in to your account</p>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
          {error.message || "Login failed"}
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            formErrors.email
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-emerald-500"
          }`}
          placeholder="you@example.com"
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            formErrors.password
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-emerald-500"
          }`}
          placeholder="••••••••"
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {googleLoginButton && (
        <div className="flex items-center justify-center mb-4">
          {googleLoginButton}
        </div>
      )}

      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-emerald-600 hover:underline font-semibold"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
