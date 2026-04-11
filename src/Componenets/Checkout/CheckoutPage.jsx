import { useState } from "react";
import { Check, Loader2, AlertCircle, Lock } from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

const Index = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const servicePageId = state?.servicePageId || "";
  const serviceTitle = state?.title || "Selected Service";
  const serviceTags = state?.tags || [];
  const servicePrice = state?.price || 0;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    if (apiError) setApiError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!servicePageId) {
      setApiError("Service not selected. Please go back and select a service.");
      return;
    }

    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const payload = {
        servicePageId,
        currency: "USD",
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone.trim(),
          country: form.country || undefined,
          city: form.city || undefined,
          postalCode: form.postalCode || undefined,
        },
      };

      const res = await axiosInstance.post("/payments/create-order", payload);
      const { approvalUrl } = res.data;

      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        setApiError("Could not get PayPal approval link. Please try again.");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Payment initiation failed. Please try again.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 flex items-center justify-between">
          <h1 className="text-white text-lg font-semibold">
            Complete Your Enrollment
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-white text-sm opacity-80 hover:opacity-100"
          >
            ← Back
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Course Summary */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-3">
              {serviceTitle}
            </h2>
            <div className="space-y-2">
              {serviceTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <Check size={16} className="text-emerald-500 shrink-0" />
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-700">
                Total Amount:
              </span>
              <span className="text-xl font-bold text-blue-600">
                ${servicePrice}
              </span>
            </div>
          </div>

          {/* No Service Selected Warning */}
          {!servicePageId && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 mb-4">
              <AlertCircle size={16} className="text-yellow-500 shrink-0" />
              <p className="text-sm text-yellow-700">
                No service selected. Please{" "}
                <button
                  onClick={() => navigate(-1)}
                  className="underline font-semibold"
                >
                  go back
                </button>{" "}
                and select a service.
              </p>
            </div>
          )}

          {/* API Error */}
          {apiError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.firstName
                      ? "border-red-400 ring-1 ring-red-400"
                      : "border-gray-200"
                  } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    errors.lastName
                      ? "border-red-400 ring-1 ring-red-400"
                      : "border-gray-200"
                  } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.email
                    ? "border-red-400 ring-1 ring-red-400"
                    : "border-gray-200"
                } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03001234567"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.phone
                    ? "border-red-400 ring-1 ring-red-400"
                    : "border-gray-200"
                } focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Country */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="US"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Payment Method
              </label>
              <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-blue-500 bg-blue-50">
                <div className="w-16 h-8 bg-white rounded border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 21" className="w-12">
                    <path fill="#253B80" d="M9.5 3H4.2C3.8 3 3.4 3.3 3.3 3.7L1 18c-.1.3.2.6.5.6h2.7c.4 0 .8-.3.8-.7l.6-3.8c.1-.4.4-.7.8-.7h1.7c3.6 0 5.7-1.7 6.2-5.2.3-1.5 0-2.7-.6-3.5C12.9 3.5 11.4 3 9.5 3zm.6 5.1c-.3 1.9-1.8 1.9-3.2 1.9H6l.6-3.6c0-.2.3-.4.5-.4h.4c1 0 1.9 0 2.4.6.3.3.4.8.2 1.5z"/>
                    <path fill="#253B80" d="M25.6 8h-2.6c-.2 0-.5.2-.5.4l-.1.7-.2-.3c-.6-.8-1.8-1.1-3.1-1.1-2.9 0-5.3 2.2-5.8 5.2-.2 1.5.1 2.9 1 3.9.8.9 1.9 1.3 3.3 1.3 2.3 0 3.6-1.5 3.6-1.5l-.1.7c-.1.3.1.6.5.6h2.4c.4 0 .7-.3.8-.7l1.4-8.7c.1-.2-.2-.5-.6-.5zm-3.6 5c-.2 1.4-1.4 2.4-2.9 2.4-.7 0-1.3-.2-1.7-.7-.4-.4-.5-1.1-.4-1.8.2-1.4 1.4-2.4 2.9-2.4.7 0 1.3.2 1.7.7.4.5.5 1.1.4 1.8z"/>
                    <path fill="#253B80" d="M37.4 8h-2.6c-.3 0-.6.1-.7.4l-4 6-1.7-5.7c-.1-.4-.5-.6-.8-.6h-2.6c-.3 0-.5.3-.4.6l3.2 9.5-3 4.3c-.2.3 0 .7.4.7h2.6c.3 0 .6-.1.7-.4l9.6-13.8c.2-.3 0-.7-.4-.7-.2.1-.3 0-.3-.3z"/>
                    <path fill="#179BD7" d="M47.5 3h-5.3c-.4 0-.7.3-.8.7L39.1 18c-.1.3.2.6.5.6h2.8c.3 0 .5-.2.6-.5l.6-4c.1-.4.4-.7.8-.7h1.7c3.6 0 5.7-1.7 6.2-5.2.3-1.5 0-2.7-.6-3.5C50.9 3.5 49.4 3 47.5 3zm.6 5.1c-.3 1.9-1.8 1.9-3.2 1.9H44l.6-3.6c0-.2.3-.4.5-.4h.4c1 0 1.9 0 2.4.6.3.3.4.8.2 1.5z"/>
                    <path fill="#179BD7" d="M63.5 8h-2.6c-.2 0-.5.2-.5.4l-.1.7-.2-.3c-.6-.8-1.8-1.1-3.1-1.1-2.9 0-5.3 2.2-5.8 5.2-.2 1.5.1 2.9 1 3.9.8.9 1.9 1.3 3.3 1.3 2.3 0 3.6-1.5 3.6-1.5l-.1.7c-.1.3.1.6.5.6h2.4c.4 0 .7-.3.8-.7l1.4-8.7c0-.2-.3-.5-.6-.5zm-3.7 5c-.2 1.4-1.4 2.4-2.9 2.4-.7 0-1.3-.2-1.7-.7-.4-.4-.5-1.1-.4-1.8.2-1.4 1.4-2.4 2.9-2.4.7 0 1.3.2 1.7.7.5.5.6 1.1.4 1.8z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">PayPal</p>
                  <p className="text-xs text-gray-500">You'll be redirected to PayPal to complete payment</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !servicePageId}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Redirecting to PayPal...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Confirm & Pay ${servicePrice}
                </>
              )}
            </button>

            {/* Security note */}
            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <Lock size={11} /> Secured by PayPal · 256-bit SSL encryption
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;