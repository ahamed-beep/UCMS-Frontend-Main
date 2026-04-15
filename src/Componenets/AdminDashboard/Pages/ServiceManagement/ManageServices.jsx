import { useState, useEffect } from "react";
import CreateService from "./CreateService";
import EditService from "./EditService";
import AdminTable from "../../../../ResuableUi/AdminTable";
import axiosInstance from "../../../../Api/axiosInstance";

const ManageServices = () => {
  const [tab, setTab] = useState("list");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const toast = (msg, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/service-pages/admin");
      setServices(res.data?.data || []);
    } catch (e) {
      toast(e.message || "Failed to load", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, []);

  const handleToggle = async (id) => {
    setTogglingId(id);
    try {
      await axiosInstance.patch(`/service-pages/${id}/toggle`);
      setServices((prev) =>
        prev.map((s) => (s._id || s.id) === id ? { ...s, isActive: !s.isActive } : s)
      );
      toast("Status updated");
    } catch (e) {
      toast(e.message || "Toggle failed", "error");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axiosInstance.delete(`/service-pages/${deleteTarget.id}`);
      setServices((prev) => prev.filter((s) => (s._id || s.id) !== deleteTarget.id));
      toast("Service deleted");
    } catch (e) {
      toast(e.message || "Delete failed", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleFormSuccess = async (msg) => {
    toast(msg);
    setTab("list");
    setEditData(null);
    await loadServices();
  };

  const columns = [
    {
      key: "icon",
      label: "Icon",
      width: "70px",
      render: (s) =>
        s.iconUrl
          ? <img src={s.iconUrl} alt="" className="w-9 h-9 rounded-lg object-cover border border-gray-200" onError={(e) => (e.target.style.display = "none")} />
          : <div className="w-9 h-9 rounded-lg bg-[#f1f5f9] border border-gray-200 flex items-center justify-center text-base">📄</div>,
    },
    {
      key: "title",
      label: "Title",
      width: "25%",
      render: (s) => (
        <p className="text-[13px] font-medium text-[#0A0A0A]">{s.title}</p>
      ),
    },
    {
      key: "description",
      label: "Description",
      width: "25%",
      render: (s) => (
        <p className="text-[12px] text-[#64748b] truncate">{s.description}</p>
      ),
    },
    {
      key: "price",
      label: "Price",
      width: "12%",
      render: (s) => (
        <span className="text-[13px] font-semibold text-[#0F4C8A]">&#36; {Number(s.price).toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "15%",
      render: (s) => {
        const id = s._id || s.id;
        return (
          <>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleToggle(id)}
                disabled={togglingId === id}
                className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${s.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${s.isActive ? "translate-x-4" : "translate-x-0"}`} />
              </button>
              <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${s.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                {s.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <button
              onClick={() => handleToggle(id)}
              disabled={togglingId === id}
              className={`sm:hidden text-[11px] font-medium px-2.5 py-1 rounded-full border disabled:opacity-50 ${s.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}
            >
              {s.isActive ? "Active" : "Inactive"}
            </button>
          </>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      width: "15%",
      render: (s) => {
        const id = s._id || s.id;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setEditData(s); setTab("create"); }}
              className="inline-flex items-center gap-1 text-[12px] text-[#475569] border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => setDeleteTarget({ id, title: s.title })}
              className="text-[12px] text-red-500 border border-red-200 rounded-lg px-2.5 py-1.5 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-1">Manage services</h2>
          <p className="text-[14px] text-[#64748b]">Create, edit, or toggle service pages.</p>
        </div>
        <button
          onClick={() => { setEditData(null); setTab("create"); }}
          className="bg-[#0F4C8A] hover:bg-[#0d3f73] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + New Service
        </button>
      </div>

      {tab === "list" && (
        <AdminTable
          columns={columns}
          rows={services.map((s) => ({ ...s, _key: s._id || s.id }))}
          loading={loading}
          emptyText="No services yet."
        />
      )}

      {tab === "create" && !editData && (
        <CreateService
          onSuccess={handleFormSuccess}
          onCancel={() => setTab("list")}
          onError={(msg) => toast(msg, "error")}
        />
      )}

      {tab === "create" && editData && (
        <EditService
          editData={editData}
          onSuccess={handleFormSuccess}
          onCancel={() => { setEditData(null); setTab("list"); }}
          onError={(msg) => toast(msg, "error")}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setDeleteTarget(null)}>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md mx-4 shadow-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[16px] font-semibold text-[#0A0A0A] mb-2">Delete Service</h3>
            <p className="text-[14px] text-[#64748b] mb-6">
              Are you sure you want to delete <strong className="text-[#0A0A0A]">"{deleteTarget.title}"</strong>? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm text-[#64748b] border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl bg-white ${t.type === "success" ? "border-emerald-200 text-emerald-700" : "border-red-200 text-red-600"}`}>
            {t.type === "success" ? "✓" : "✕"} {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;