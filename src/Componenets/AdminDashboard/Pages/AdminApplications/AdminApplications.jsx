import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";

const statusOptions = ["In Progress", "Under Review", "Accepted", "Rejected"];

const statusStyles = {
  "In Progress": "bg-[#DBEAFE] text-[#1447E6]",
  "Under Review": "bg-[#FEF9C2] text-[#A65F00]",
  Accepted: "bg-[#DCFCE7] text-[#008236]",
  Rejected: "bg-[#FFE2E2] text-[#C10007]",
};

const EMPTY_FORM = {
  studentId: "",
  university: "",
  program: "",
  country: "",
  status: "In Progress",
  timeline: [
    { label: "Application Submitted", date: "", done: false },
    { label: "Document Verification", date: "", done: false },
    { label: "Under University Review", date: "", done: false },
    { label: "Decision Received", date: "", done: false },
  ],
};

const ApplicationModal = ({ open, onClose, onSubmit, loading, initial, students }) => {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initial) {
      setForm({
        studentId: initial.userId ?? "",
        university: initial.university ?? "",
        program: initial.program ?? "",
        country: initial.country ?? "",
        status: initial.status ?? "In Progress",
        timeline: initial.timeline?.map((t) => ({
          label: t.label ?? "",
          date: t.date ?? "",
          done: t.done ?? false,
        })) ?? EMPTY_FORM.timeline,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initial, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const setTimeline = (index, field, value) => {
    setForm((p) => {
      const timeline = [...p.timeline];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...p, timeline };
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">
            {initial ? "Edit Application" : "Add Application"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {!initial && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#334155]">Student</label>
              <select
                value={form.studentId}
                onChange={set("studentId")}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
              >
                <option value="">Select student</option>
               {students.map((s) => (
  <option key={s.id ?? s._id} value={s.id ?? s._id}>
    {s.firstName} {s.lastName} — {s.emailId ?? s.email}
  </option>
))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">University</label>
            <input
              value={form.university}
              onChange={set("university")}
              placeholder="University name"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Program</label>
            <input
              value={form.program}
              onChange={set("program")}
              placeholder="Program name"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Country</label>
            <input
              value={form.country}
              onChange={set("country")}
              placeholder="Country"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Status</label>
            <select
              value={form.status}
              onChange={set("status")}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#334155]">Timeline</label>
            {form.timeline.map((step, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#f8fafc] rounded-xl p-3">
                <input
                  type="checkbox"
                  checked={step.done}
                  onChange={(e) => setTimeline(i, "done", e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#0f172a] flex-1">{step.label}</span>
                <input
                  type="text"
                  value={step.date}
                  onChange={(e) => setTimeline(i, "date", e.target.value)}
                  placeholder="Date (optional)"
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-[#0f172a] outline-none focus:border-[#0F4C8A] w-32"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(form)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f74] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {initial ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get("/applications");
      setApplications(res.data.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const fetchStudents = async () => {
  try {
    const res = await axiosInstance.get("/admin/users?role=student");
    setStudents(res.data.data ?? []);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchApplications();
    fetchStudents();
  }, []);

  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (editing) {
        await axiosInstance.patch(`/applications/${editing.id}`, {
          university: form.university,
          program: form.program,
          country: form.country,
          status: form.status,
          timeline: form.timeline,
        });
      } else {
        await axiosInstance.post("/applications", form);
      }
      await fetchApplications();
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setUpdatingStatus(id);
    try {
      await axiosInstance.patch(`/applications/${id}/status`, { status });
      await fetchApplications();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async (app) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/applications/${app.id}`);
      await fetchApplications();
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US");
  };

  const columns = [
    {
      key: "university",
      label: "University",
      width: "22%",
      render: (row) => (
        <span className="font-medium text-sm text-[#0f172a]">{row.university}</span>
      ),
    },
    {
      key: "program",
      label: "Program",
      width: "18%",
      render: (row) => (
        <span className="text-sm text-[#334155]">{row.program}</span>
      ),
    },
    {
      key: "country",
      label: "Country",
      width: "12%",
      render: (row) => (
        <span className="text-sm text-[#334155]">{row.country}</span>
      ),
    },
    {
      key: "student",
      label: "Student",
      width: "15%",
      render: (row) => (
        <span className="text-sm text-[#334155]">
          {row.userId?.firstName
            ? `${row.userId.firstName} ${row.userId.lastName}`
            : row.userId ?? "—"}
        </span>
      ),
    },
    {
      key: "date",
      label: "Applied",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "15%",
      render: (row) => (
        <select
          value={row.status}
          disabled={updatingStatus === row.id}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${statusStyles[row.status]}`}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "8%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setEditing(row); setModalOpen(true); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b]"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Applications</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage student university applications</p>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] text-white text-sm font-medium rounded-xl hover:bg-[#0d3f74] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Application
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={applications.map((a) => ({ ...a, _key: a.id }))}
        loading={loading}
        emptyText="No applications found."
      />

      <ApplicationModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSave}
        loading={saving}
        initial={editing}
        students={students}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.university}
      />
    </div>
  );
};

export default AdminApplications;