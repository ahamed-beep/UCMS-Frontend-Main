import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const CreateUser = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    if (apiError) setApiError("");
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.emailId.trim()) e.emailId = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) e.emailId = "Invalid email";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 8) e.password = "Min 8 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }

    setLoading(true);
    setApiError("");
    try {
      await axiosInstance.post("/admin/users", { ...form });
      setSuccess(true);
      setForm({ firstName: "", lastName: "", emailId: "", password: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Failed to create user. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 text-sm rounded-lg border bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] ${
      errors[field] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-1 wrap-break-word">Create new user</h2>
      <p className="text-[14px] text-[#64748b] mb-6 wrap-break-word">New accounts are created with the Student role by default.</p>

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-4 py-3 text-sm mb-5">
          User created successfully.
        </div>
      )}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-5">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">First name *</label>
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Ali" className={inputClass("firstName")} />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">Last name *</label>
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Khan" className={inputClass("lastName")} />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-1">Email address *</label>
          <input type="email" name="emailId" value={form.emailId} onChange={handleChange} placeholder="ali@example.com" className={inputClass("emailId")} />
          {errors.emailId && <p className="text-xs text-red-500 mt-1">{errors.emailId}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-1">Password *</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" className={inputClass("password")} />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-lg px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <span className="text-[13px] text-[#64748b]">
            Role: <span className="font-medium text-[#0A0A0A]">Student</span>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0F4C8A] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0d3f73] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create user"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;