import { useEffect, useState, useMemo } from "react";
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

const DEFAULT_TIMELINE = [
  { label: "Application Submitted", date: "", done: false },
  { label: "Document Verification", date: "", done: false },
  { label: "Under University Review", date: "", done: false },
  { label: "Decision Received", date: "", done: false },
];

const EMPTY_FORM = {
  studentIds: [],
  university: "",
  program: "",
  country: "",
  status: "In Progress",
  timeline: DEFAULT_TIMELINE,
};

const ApplicationModal = ({ open, onClose, onSubmit, loading, initial, students }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [studentSearch, setStudentSearch] = useState("");

  useEffect(() => {
    if (initial) {
      setForm({
        studentIds: [initial.userId?.id ?? initial.userId ?? ""].filter(Boolean),
        university: initial.university ?? "",
        program: initial.program ?? "",
        country: initial.country ?? "",
        status: initial.status ?? "In Progress",
        timeline: initial.timeline?.map((t) => ({
          label: t.label ?? "",
          date: t.date ?? "",
          done: t.done ?? false,
        })) ?? DEFAULT_TIMELINE,
      });
    } else {
      setForm(EMPTY_FORM);
      setStudentSearch("");
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

  const filteredStudents = useMemo(() => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.firstName?.toLowerCase().includes(q) ||
        s.lastName?.toLowerCase().includes(q) ||
        (s.emailId ?? s.email)?.toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  if (!open) return null;

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const setTimeline = (index, field, value) => {
    setForm((p) => {
      const timeline = [...p.timeline];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...p, timeline };
    });
  };

  const toggleStudent = (id) =>
    setForm((p) => ({
      ...p,
      studentIds: p.studentIds.includes(id)
        ? p.studentIds.filter((s) => s !== id)
        : [...p.studentIds, id],
    }));

  const toggleAll = () => {
    const allIds = filteredStudents.map((s) => s.id ?? s._id);
    const allSelected = allIds.every((id) => form.studentIds.includes(id));
    setForm((p) => ({
      ...p,
      studentIds: allSelected
        ? p.studentIds.filter((id) => !allIds.includes(id))
        : [...new Set([...p.studentIds, ...allIds])],
    }));
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
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-[#334155]">
                  Students
                  {form.studentIds.length > 0 && (
                    <span className="ml-2 bg-[#0F4C8A] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {form.studentIds.length}
                    </span>
                  )}
                </label>
                {filteredStudents.length > 0 && (
                  <button
                    onClick={toggleAll}
                    className="text-[11px] text-[#0F4C8A] hover:underline"
                  >
                    {filteredStudents.every((s) =>
                      form.studentIds.includes(s.id ?? s._id)
                    )
                      ? "Deselect all"
                      : "Select all"}
                  </button>
                )}
              </div>

              <div className="relative mb-2">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F4C8A]"
                />
              </div>

              <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-48">
                {filteredStudents.length === 0 ? (
                  <p className="text-xs text-[#64748b] text-center py-4">No students found</p>
                ) : (
                  filteredStudents.map((s) => {
                    const id = s.id ?? s._id;
                    const checked = form.studentIds.includes(id);
                    return (
                      <label
                        key={id}
                        className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
                          checked ? "bg-[#EFF6FF]" : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleStudent(id)}
                          className="accent-[#0F4C8A] w-3.5 h-3.5 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#0f172a] truncate">
                            {s.firstName} {s.lastName}
                          </p>
                          <p className="text-[11px] text-[#64748b] truncate">
                            {s.emailId ?? s.email}
                          </p>
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
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
              disabled={loading || (!initial && form.studentIds.length === 0)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f74] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {initial
                ? "Update"
                : `Create${form.studentIds.length > 1 ? ` (${form.studentIds.length})` : ""}`}
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
      const res = await axiosInstance.get("/admin/users");
      const all = res.data.data ?? [];
      setStudents(all.filter((u) => u.role === "student"));
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
        await Promise.all(
          form.studentIds.map((studentId) =>
            axiosInstance.post("/applications", {
              studentId,
              university: form.university,
              program: form.program,
              country: form.country,
              status: form.status,
              timeline: form.timeline,
            })
          )
        );
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
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
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
      setApplications((prev) => prev.filter((a) => a.id !== app.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return applications.filter((a) => {
      const fullName = `${a.userId?.firstName ?? ""} ${a.userId?.lastName ?? ""}`.toLowerCase();
      const email = (a.userId?.emailId ?? "").toLowerCase();
      const matchesSearch =
        !q ||
        fullName.includes(q) ||
        email.includes(q) ||
        a.university?.toLowerCase().includes(q) ||
        a.program?.toLowerCase().includes(q) ||
        a.country?.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US");
  };

  const columns = [
    {
      key: "university",
      label: "University",
      width: "20%",
      render: (row) => (
        <span className="font-medium text-sm text-[#0f172a]">{row.university}</span>
      ),
    },
    {
      key: "program",
      label: "Program",
      width: "16%",
      render: (row) => (
        <span className="text-sm text-[#334155]">{row.program}</span>
      ),
    },
    {
      key: "country",
      label: "Country",
      width: "11%",
      render: (row) => (
        <span className="text-sm text-[#334155]">{row.country}</span>
      ),
    },
    {
      key: "student",
      label: "Student",
      width: "18%",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm text-[#0f172a] font-medium">
            {row.userId?.firstName
              ? `${row.userId.firstName} ${row.userId.lastName}`
              : "—"}
          </span>
          <span className="text-xs text-[#64748b]">{row.userId?.emailId ?? ""}</span>
        </div>
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
      width: "10%",
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
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

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, university, program..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-44 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] text-[#475569] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((a) => ({ ...a, _key: a.id }))}
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