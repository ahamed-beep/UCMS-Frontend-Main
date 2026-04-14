import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const EditModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    emailId: user.email || user.emailId || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    if (form.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) {
      setError("Invalid email address.");
      return;
    }
    if (form.password && form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      ...(form.emailId && { emailId: form.emailId }),
      ...(form.password && { password: form.password }),
    };

    setLoading(true);
    try {
      await axiosInstance.patch(`/admin/users/${user.id}`, payload);
      onSave(user.id , { firstName: form.firstName, lastName: form.lastName, emailId: form.emailId });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-[380px] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-semibold text-[#0A0A0A]">Edit user</h3>
          <button onClick={onClose} className="text-[#64748b] hover:text-[#0A0A0A] text-xl leading-none">
            &times;
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="bg-[#f8fafc] rounded-lg px-4 py-3 mb-4 text-[13px]">
          <div className="flex justify-between">
            <span className="text-[#64748b]">Role</span>
            <span className="text-[#0A0A0A] font-medium capitalize">{user.role}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#64748b] mb-1">First name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#64748b] mb-1">Last name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">Email address</label>
            <input type="email" name="emailId" value={form.emailId} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">
              New password <span className="text-[#94a3b8] font-normal">(leave blank to keep current)</span>
            </label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" className={inputClass} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#64748b] border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0F4C8A] rounded-lg hover:bg-[#0d3f73] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;