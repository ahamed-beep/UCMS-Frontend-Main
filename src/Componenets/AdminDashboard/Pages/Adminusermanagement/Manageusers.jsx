import { useState, useEffect } from "react";
import EditModal from "./Editmodal";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/users");
      setUsers(res.data?.data || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

 const handleToggle = async (user) => {
  const userId = user.id || user._id;  
  setTogglingId(userId);
  try {
    await axiosInstance.patch(`/admin/users/${userId}/status`);
    setUsers((prev) =>
      prev.map((u) => ((u.id || u._id) === userId ? { ...u, isDisabled: !u.isDisabled } : u))
    );
  } catch {
  } finally {
    setTogglingId(null);
  }
};

 const handleSaveEdit = (id, updatedFields) => {
  setUsers((prev) => prev.map((u) => ((u.id || u._id) === id ? { ...u, ...updatedFields } : u)));
}

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

  const columns = [
    {
      key: "user",
      label: "User",
      width: "35%",
      render: (u) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[11px] font-semibold text-[#1d4ed8] shrink-0">
            {initials(u)}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#0A0A0A] truncate">{u.firstName} {u.lastName}</p>
            <p className="text-[12px] text-[#64748b] truncate">{u.email || u.emailId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      width: "18%",
      render: (u) => (
        <span className="text-[12px] px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#475569] border border-gray-200 capitalize">
          {u.role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "25%",
      render: (u) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggle(u)}
            disabled={togglingId === u._id}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${!u.isDisabled ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${!u.isDisabled ? "translate-x-4" : "translate-x-0"}`} />
          </button>
          <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${!u.isDisabled ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
            {!u.isDisabled ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "22%",
      render: (u) => (
        <button
          onClick={() => setEditUser(u)}
          className="inline-flex items-center gap-1.5 text-[12px] text-[#475569] border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-1 wrap-break-word">Manage users</h2>
      <p className="text-[14px] text-[#64748b] mb-5 wrap-break-word">Toggle active/inactive status or update user details.</p>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] mb-4"
      />

      <AdminTable
        columns={columns}
        rows={filtered.map((u) => ({ ...u, _key: u._id }))}
        loading={loading}
        emptyText="No users found."
      />

      {editUser && (
        <EditModal user={editUser} onClose={() => setEditUser(null)} onSave={handleSaveEdit} />
      )}
    </div>
  );
};

export default ManageUsers;