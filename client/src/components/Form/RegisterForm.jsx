import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../redux/slices/userSlice";
import { getGeolocation } from "../../services/geolocation";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
  });
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
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

  const handleGetLocation = async () => {
    setLocationLoading(true);
    setLocationError(null);
    try {
      const coords = await getGeolocation();
      setLocation(coords);
      setLocationError(null);
    } catch (err) {
      setLocationError(err.message || "Failed to get location");
      setLocation(null);
    } finally {
      setLocationLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }

    if (!formData.salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(formData.salary) || parseInt(formData.salary) <= 0) {
      errors.salary = "Salary must be a positive number";
    }

    if (!location) {
      errors.location = "Location is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      salary: parseInt(formData.salary),
      location: {
        lat: location.lat,
        lon: location.lon,
      },
    };

    const result = await dispatch(registerUser(payload));
    if (result.payload && !result.payload.error) {
      // Navigate to login after successful registration
      navigate("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 border border-gray-200 rounded-lg shadow-lg bg-white"
    >
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
        Create Account
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Join us and start tracking your finances
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
          {error.message || "Registration failed"}
        </div>
      )}

      {/* Name Field */}
      <div className="mb-5">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            formErrors.name
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-emerald-500"
          }`}
          placeholder="John Doe"
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
        )}
      </div>

      {/* Email Field */}
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

      {/* Password Field */}
      <div className="mb-5">
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

      {/* Salary Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Monthly Salary (Rp)
        </label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
            formErrors.salary
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-emerald-500"
          }`}
          placeholder="5000000"
        />
        {formErrors.salary && (
          <p className="text-red-500 text-sm mt-1">{formErrors.salary}</p>
        )}
      </div>

      {/* Location Section */}
      <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <label className="block text-sm font-semibold mb-3 text-gray-700">
          📍 Location (Required)
        </label>

        {location ? (
          <div className="text-sm text-emerald-700 mb-3">
            <p className="font-semibold">✓ Location obtained</p>
            <p className="text-xs text-gray-600 mt-1">
              Latitude: {location.lat.toFixed(4)} | Longitude:{" "}
              {location.lon.toFixed(4)}
            </p>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={locationLoading}
              className="mt-2 text-emerald-600 hover:text-emerald-700 text-xs underline"
            >
              Update Location
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={locationLoading}
              className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all disabled:bg-gray-400 font-semibold"
            >
              {locationLoading
                ? "Getting location..."
                : "📍 Enable My Location"}
            </button>
            {formErrors.location && (
              <p className="text-red-500 text-sm mt-2">{formErrors.location}</p>
            )}
          </>
        )}

        {locationError && (
          <p className="text-red-500 text-sm mt-2">
            ⚠️ {locationError}. Please enable location services.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || locationLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Already have account link */}
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-emerald-600 hover:underline font-semibold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
