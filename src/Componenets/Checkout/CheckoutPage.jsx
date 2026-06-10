import { useState } from "react";
import { Check, Loader2, AlertCircle, Lock, Copy, CheckCircle2, ArrowLeft, MessageCircle, Mail } from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

// ── Bank Transfer Confirmation Screen ──────────────────────────────────────
const BankConfirmationScreen = ({ serviceTitle, servicePrice, onBack }) => {
  const [bankCopied, setBankCopied] = useState(null);

  const bankDetails = [
    { label: "Account Title", value: "MUHAMMAD MUMEEZ" },
    { label: "Account Number", value: "55025002487379" },
    { label: "IBAN", value: "PK02ALFH5502005002487379" },
    { label: "Bank Name", value: "Bank Alfalah" },
  ];

  const copyToClipboard = (value, label) => {
    navigator.clipboard.writeText(value);
    setBankCopied(label);
    setTimeout(() => setBankCopied(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5 flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold">Bank Transfer Details</h1>
        <button onClick={onBack} className="text-white text-sm opacity-80 hover:opacity-100 flex items-center gap-1">
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      <div className="flex-1 p-6 space-y-5">

        {/* Success Icon + Message */}
        <div className="flex flex-col items-center text-center pt-2 pb-1">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Almost there!</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Transfer <span className="font-semibold text-gray-800">${servicePrice}</span> to the account below to confirm your enrollment in{" "}
            <span className="font-semibold text-gray-800">{serviceTitle}</span>.
          </p>
        </div>

        {/* Bank Details Card */}
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 space-y-3">
          <p className="text-xs font-semibold text-green-700 uppercase tracking-widest">
            Bank Alfalah — Transfer Details
          </p>

          {bankDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-green-100 shadow-sm"
            >
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(item.value, item.label)}
                className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 font-medium px-2 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
              >
                {bankCopied === item.label ? (
                  <>
                    <Check size={12} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Amount Highlight */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <span className="text-sm text-gray-600 font-medium">Amount to Transfer</span>
          <span className="text-xl font-bold text-green-600">${servicePrice}</span>
        </div>

        {/* Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 space-y-1">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Next Steps</p>
          <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside">
            <li>Transfer the exact amount shown above.</li>
            <li>Take a screenshot of your payment receipt.</li>
            <li>Send it to us via WhatsApp or email below.</li>
            <li>We'll confirm your enrollment within 24 hours.</li>
          </ol>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href="mailto:support@example.com"
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            <Mail size={16} />
            Email Us
          </a>
        </div>

        <p className="text-center text-xs text-gray-400">
          Enrollment is confirmed only after payment verification.
        </p>
      </div>
    </div>
  );
};

// ── Main Checkout Component ─────────────────────────────────────────────────
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const servicePageId = state?.servicePageId || "";
  const serviceTitle = state?.title || "Selected Service";
  const serviceTags = state?.tags || [];
  const servicePrice = state?.price || 0;

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [showBankConfirmation, setShowBankConfirmation] = useState(false);
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
  const [bankCopied, setBankCopied] = useState(null);

  const bankDetails = [
    { label: "Account Title", value: "MUHAMMAD MUMEEZ" },
    { label: "Account Number", value: "55025002487379" },
    { label: "IBAN", value: "PK02ALFH5502005002487379" },
    { label: "Bank Name", value: "Bank Alfalah" },
  ];

  const copyToClipboard = (value, label) => {
    navigator.clipboard.writeText(value);
    setBankCopied(label);
    setTimeout(() => setBankCopied(null), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
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

    // ── Bank Transfer → show confirmation screen ──
    if (paymentMethod === "bank") {
      setShowBankConfirmation(true);
      return;
    }

    // ── PayPal ────────────────────────────────────
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

  // ── Render Bank Confirmation Screen ──────────────────────────────────────
  if (showBankConfirmation) {
    return (
      <>
        <Navbar />
        <BankConfirmationScreen
          serviceTitle={serviceTitle}
          servicePrice={servicePrice}
          onBack={() => setShowBankConfirmation(false)}
        />
        <Footer />
      </>
    );
  }

  // ── Render Normal Checkout Form ───────────────────────────────────────────
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
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.firstName ? "border-red-400 ring-1 ring-red-400" : "border-gray-200"} focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.lastName ? "border-red-400 ring-1 ring-red-400" : "border-gray-200"} focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.email ? "border-red-400 ring-1 ring-red-400" : "border-gray-200"} focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03001234567"
                className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.phone ? "border-red-400 ring-1 ring-red-400" : "border-gray-200"} focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="PK"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Lahore"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Postal Code</label>
                <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="54000"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50" />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2">Payment Method</label>
              <div className="space-y-3">

                {/* PayPal Option */}
                <div
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                >
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
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                    {paymentMethod === "paypal" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Bank Transfer Option */}
                <div
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${paymentMethod === "bank" ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                >
                  <div className="w-16 h-8 bg-white rounded border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 6l9-3 9 3M4 10v8a1 1 0 001 1h14a1 1 0 001-1v-8" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Pay directly via Bank Alfalah</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "bank" ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                    {paymentMethod === "bank" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Bank Details Preview Card */}
                {paymentMethod === "bank" && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 space-y-3">
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Bank Alfalah — Transfer Details</p>
                    {bankDetails.map((item) => (
                      <div key={item.label} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-green-100">
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium">{item.label}</p>
                          <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.value, item.label)}
                          className="text-xs text-green-600 hover:text-green-800 font-medium px-2 py-1 rounded hover:bg-green-100 transition-colors"
                        >
                          {bankCopied === item.label ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2">
                      After transfer, please send payment proof to our WhatsApp or email for confirmation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button — only show for PayPal */}
            {paymentMethod !== "bank" && (
              <button
                type="submit"
                disabled={loading || !servicePageId}
                className="w-full mt-2 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-700"
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
            )}

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <Lock size={11} /> Secured Payment · 256-bit SSL encryption
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;