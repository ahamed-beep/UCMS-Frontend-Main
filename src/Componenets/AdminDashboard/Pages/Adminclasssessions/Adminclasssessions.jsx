import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const EMPTY_FORM = {
  title: "",
  courseId: "",
  scheduledAt: "",
  durationMinutes: "",
  type: "Video",
  level: "",
  topics: "",
  meetingLink: "",
};

const SessionModal = ({ open, onClose, onSubmit, loading, initial, courses }) => {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title ?? "",
        courseId: initial.course?.id ?? "",
        scheduledAt: initial.scheduledAt ? initial.scheduledAt.slice(0, 16) : "",
        durationMinutes: initial.durationMinutes ?? "",
        type: initial.type ?? "Video",
        level: initial.level ?? "",
        topics: Array.isArray(initial.topics) ? initial.topics.join(", ") : "",
        meetingLink: initial.meetingLink ?? "",
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

  const handleSubmit = () => {
    const payload = {
      ...form,
      durationMinutes: Number(form.durationMinutes),
      topics: form.topics ? form.topics.split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    onSubmit(payload);
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
            {initial ? "Edit Class Session" : "Add Class Session"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Title</label>
            <input
              value={form.title}
              onChange={set("title")}
              placeholder="Class title"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Course</label>
            <select
              value={form.courseId}
              onChange={set("courseId")}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            >
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Scheduled At</label>
            <input
              type="datetime-local"
              value={form.scheduledAt}
              onChange={set("scheduledAt")}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs font-medium text-[#334155]">Duration (mins)</label>
              <input
                type="number"
                value={form.durationMinutes}
                onChange={set("durationMinutes")}
                placeholder="60"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs font-medium text-[#334155]">Type</label>
              <select
                value={form.type}
                onChange={set("type")}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
              >
                <option value="Video">Video</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Level</label>
            <input
              value={form.level}
              onChange={set("level")}
              placeholder="Beginner / Intermediate / Advanced"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Topics (comma separated)</label>
            <input
              value={form.topics}
              onChange={set("topics")}
              placeholder="Band 7+, Fluency, Mock Interviews"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Meeting Link</label>
            <input
              value={form.meetingLink}
              onChange={set("meetingLink")}
              placeholder="https://zoom.us/j/..."
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
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
              onClick={handleSubmit}
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

const AdminClassSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

 const fetchSessions = async () => {
  try {
    const res = await axiosInstance.get("/class-sessions");
    const raw = res.data.data ?? [];
    setSessions(
      raw.map((s) => ({
        ...s,
        id: s._id ?? s.id,
        course: s.courseId ?? s.course ?? null,
      }))
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses");
      setCourses(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchCourses();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    });
  };

  const formatTime = (dateStr, duration) => {
    if (!dateStr) return "—";
    const start = new Date(dateStr);
    const end = new Date(start.getTime() + duration * 60000);
    const fmt = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (editing) {
        await axiosInstance.patch(`/class-sessions/${editing.id}`, payload);
      } else {
        await axiosInstance.post("/class-sessions", payload);
      }
      await fetchSessions();
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (session) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/class-sessions/${session.id}`);
      await fetchSessions();
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      width: "25%",
      render: (row) => (
        <span className="font-medium text-sm text-[#0f172a] truncate block">{row.title}</span>
      ),
    },
    {
      key: "course",
      label: "Course",
      width: "20%",
      render: (row) => (
        <span className="text-sm text-[#334155] truncate block">{row.course?.title ?? "—"}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      width: "18%",
      render: (row) => (
        <span className="text-sm text-[#334155] truncate block">{formatDate(row.scheduledAt)}</span>
      ),
    },
    {
      key: "time",
      label: "Time",
      width: "18%",
      render: (row) => (
        <span className="text-sm text-[#334155] truncate block">{formatTime(row.scheduledAt, row.durationMinutes)}</span>
      ),
    },
    {
      key: "type",
      label: "Type",
      width: "10%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.type === "Video" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>
          {row.type}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "10%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
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
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] wrap-break-word">Class Sessions</h1>
          <p className="text-sm text-[#64748b] mt-1 wrap-break-word">Manage all scheduled class sessions</p>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] text-white text-sm font-medium rounded-xl hover:bg-[#0d3f74] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Session
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={sessions.map((s) => ({ ...s, _key: s.id }))}
        loading={loading}
        emptyText="No class sessions found."
      />

      <SessionModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSave}
        loading={saving}
        initial={editing}
        courses={courses}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.title}
      />
    </div>
  );
};

export default AdminClassSessions;