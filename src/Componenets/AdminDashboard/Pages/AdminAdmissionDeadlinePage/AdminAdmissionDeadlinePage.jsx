import { useState, useEffect } from "react";
import { Eye, Trash2, Pencil, Plus, X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DetailModal from "./DetailModal";
import EditModal from "./EditModal";

const COLORS = [
  { label: "Red", value: "text-red-500" },
  { label: "Orange", value: "text-orange-500" },
  { label: "Yellow", value: "text-yellow-500" },
  { label: "Green", value: "text-green-500" },
  { label: "Blue", value: "text-blue-500" },
];

const defaultForm = {
  university: "",
  program: "",
  deadline: "",
  deadlineColor: "text-red-500",
  intake: "",
  isActive: true,
};

const AdminAdmissionDeadlinePage = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewRecord, setViewRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchDeadlines = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admission-deadlines/admin");
      setDeadlines(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch deadlines", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDeadlines(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this deadline?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/admission-deadlines/${id}`);
      fetchDeadlines();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    try {
      await axiosInstance.post("/admission-deadlines", form);
      setShowCreate(false);
      setForm(defaultForm);
      fetchDeadlines();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create.");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: "university", label: "University", width: "25%",
      render: (row) => <div className="text-sm font-semibold text-[#0f172a]">{row.university}</div>,
    },
    {
      key: "program", label: "Program", width: "18%",
      render: (row) => <div className="text-xs text-[#374151]">{row.program}</div>,
    },
    {
      key: "deadline", label: "Deadline", width: "18%",
      render: (row) => <div className={`text-xs font-semibold ${row.deadlineColor}`}>{row.deadline}</div>,
    },
    {
      key: "intake", label: "Intake", width: "15%",
      render: (row) => <div className="text-xs text-[#374151]">{row.intake}</div>,
    },
    {
      key: "status", label: "Status", width: "12%",
      render: (row) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions", label: "Actions", width: "12%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setViewRecord(row)} className="text-[#64748b] hover:text-[#0f172a] transition-colors">
            <Eye size={15} />
          </button>
          <button onClick={() => setEditRecord(row)} className="text-[#64748b] hover:text-[#193CB8] transition-colors">
            <Pencil size={15} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            disabled={deletingId === row.id}
            className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a]">Admission Deadlines</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{deadlines.length} total records</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#193CB8] text-white text-sm font-medium rounded-lg hover:bg-[#153290] transition-colors"
        >
          <Plus size={16} /> Add Deadline
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={deadlines.map((r) => ({ ...r, _key: r.id }))}
        loading={loading}
        emptyText="No admission deadlines found."
      />

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
            <button onClick={() => { setShowCreate(false); setForm(defaultForm); setError(""); }} className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#0f172a] transition-colors">
              <X size={18} />
            </button>
            <h2 className="text-base font-bold text-[#0f172a] mb-5">Add Admission Deadline</h2>
            <div className="space-y-3">
              {[
                { name: "university", label: "University" },
                { name: "program", label: "Program" },
                { name: "deadline", label: "Deadline" },
                { name: "intake", label: "Intake" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="text-xs text-[#64748b] font-medium mb-1 block">{label}</label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#193CB8]/20 focus:border-[#193CB8]"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs text-[#64748b] font-medium mb-1 block">Deadline Color</label>
                <select
                  name="deadlineColor"
                  value={form.deadlineColor}
                  onChange={handleChange}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#193CB8]/20 focus:border-[#193CB8]"
                >
                  {COLORS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveCreate"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="accent-[#193CB8]"
                />
                <label htmlFor="isActiveCreate" className="text-sm text-[#374151]">Active</label>
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => { setShowCreate(false); setForm(defaultForm); setError(""); }}
                  className="flex-1 px-4 py-2 rounded-lg border border-[#e2e8f0] text-sm text-[#64748b] hover:bg-[#f8fafc] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={saving}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#193CB8] text-white text-sm font-medium hover:bg-[#153290] transition-colors disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewRecord && (
        <DetailModal record={viewRecord} onClose={() => setViewRecord(null)} />
      )}

      {editRecord && (
        <EditModal
          record={editRecord}
          onClose={() => setEditRecord(null)}
          onUpdated={() => { fetchDeadlines(); setEditRecord(null); }}
        />
      )}
    </div>
  );
};

export default AdminAdmissionDeadlinePage;