import { useState, useEffect } from "react";
import axiosInstance from "../../../Api/axiosInstance";

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
      await axiosInstance.post("/auth/register", {
        ...form,
        // role is always student — admin cannot set role from frontend
      });
      setSuccess(true);
      setForm({ firstName: "", lastName: "", emailId: "", password: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Failed to create user. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-1">Create new user</h2>
      <p className="text-[14px] text-[#64748b] mb-6">New accounts are created with the Student role by default.</p>

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
            <input
              type="text" name="firstName" value={form.firstName} onChange={handleChange}
              placeholder="Ali"
              className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] ${errors.firstName ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">Last name *</label>
            <input
              type="text" name="lastName" value={form.lastName} onChange={handleChange}
              placeholder="Khan"
              className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] ${errors.lastName ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-1">Email address *</label>
          <input
            type="email" name="emailId" value={form.emailId} onChange={handleChange}
            placeholder="ali@example.com"
            className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] ${errors.emailId ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.emailId && <p className="text-xs text-red-500 mt-1">{errors.emailId}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-1">Password *</label>
          <input
            type="password" name="password" value={form.password} onChange={handleChange}
            placeholder="Min 8 characters"
            className={`w-full px-3 py-2 text-sm rounded-lg border bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] ${errors.password ? "border-red-400" : "border-gray-200"}`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Role is fixed — not shown to admin */}
        <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-lg px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          <span className="text-[13px] text-[#64748b]">Role: <span className="font-medium text-[#0A0A0A]">Student</span></span>
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

// ─── Edit Modal ────────────────────────────────────────────
const EditModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.patch(`/users/${user._id}`, {
        firstName: form.firstName,
        lastName: form.lastName,
      });
      onSave(user._id, form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 w-[380px] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[16px] font-semibold text-[#0A0A0A]">Edit user</h3>
          <button onClick={onClose} className="text-[#64748b] hover:text-[#0A0A0A] text-xl leading-none">&times;</button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Read-only info */}
        <div className="bg-[#f8fafc] rounded-lg px-4 py-3 mb-4 space-y-1.5">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#64748b]">Email</span>
            <span className="text-[#0A0A0A] font-medium">{user.email || user.emailId}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#64748b]">Role</span>
            <span className="text-[#0A0A0A] font-medium capitalize">{user.role}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">First name</label>
            <input
              type="text" name="firstName" value={form.firstName} onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1">Last name</label>
            <input
              type="text" name="lastName" value={form.lastName} onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
            />
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

// ─── Manage Users ──────────────────────────────────────────
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data?.data || []);
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (user) => {
    setTogglingId(user._id);
    try {
      await axiosInstance.patch(`/users/${user._id}/toggle-status`);
      setUsers((prev) =>
        prev.map((u) => u._id === user._id ? { ...u, isDisabled: !u.isDisabled } : u)
      );
    } catch {
      // revert silently
    } finally {
      setTogglingId(null);
    }
  };

  const handleSaveEdit = (id, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => u._id === id ? { ...u, ...updatedFields } : u)
    );
  };

  const initials = (u) =>
    `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`.toUpperCase();

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      !q ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      (u.email || u.emailId)?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-1">Manage users</h2>
      <p className="text-[14px] text-[#64748b] mb-5">Toggle active/inactive status or update user details.</p>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] mb-4"
      />

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#64748b] text-sm gap-2">
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Loading users...
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="text-left text-xs font-medium text-[#64748b] px-4 py-3 w-[35%]">User</th>
                <th className="text-left text-xs font-medium text-[#64748b] px-4 py-3 w-[18%]">Role</th>
                <th className="text-left text-xs font-medium text-[#64748b] px-4 py-3 w-[25%]">Status</th>
                <th className="text-left text-xs font-medium text-[#64748b] px-4 py-3 w-[22%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-sm text-[#64748b] py-10">
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u._id} className="border-t border-gray-100 hover:bg-[#f8fafc] transition-colors">
                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[11px] font-semibold text-[#1d4ed8] shrink-0">
                          {initials(u)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-[#0A0A0A] truncate">
                            {u.firstName} {u.lastName}
                          </p>
                          <p className="text-[12px] text-[#64748b] truncate">
                            {u.email || u.emailId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      <span className="text-[12px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#475569] border border-gray-200 capitalize">
                        {u.role}
                      </span>
                    </td>

                    {/* Toggle */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggle(u)}
                          disabled={togglingId === u._id}
                          className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                            !u.isDisabled ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                              !u.isDisabled ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${
                            !u.isDisabled
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {!u.isDisabled ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    {/* Edit */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setEditUser(u)}
                        className="inline-flex items-center gap-1.5 text-[12px] text-[#475569] border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {editUser && (
        <EditModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────
const AdminUserManagement = () => {
  const [tab, setTab] = useState("create");

  return (
    <div className="font-inter">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { key: "create", label: "Create user" },
          { key: "manage", label: "Manage users" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-[14px] border-b-2 transition-colors -mb-px ${
              tab === t.key
                ? "border-[#0F4C8A] text-[#0F4C8A] font-medium"
                : "border-transparent text-[#64748b] hover:text-[#0A0A0A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "create" && <CreateUser />}
      {tab === "manage" && <ManageUsers />}
    </div>
  );
};

export default AdminUserManagement;