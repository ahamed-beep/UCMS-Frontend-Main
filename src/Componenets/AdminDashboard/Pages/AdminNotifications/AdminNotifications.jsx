import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";

const statusStyles = {
  pending: "bg-[#FEF9C2] text-[#A65F00]",
  fulfilled: "bg-[#DCFCE7] text-[#008236]",
  rejected: "bg-[#FFE2E2] text-[#C10007]",
};

const statusOptions = ["pending", "fulfilled", "rejected"];
const EMPTY_FORM = { userId: "", message: "", status: "pending", broadcast: false };

const NotificationModal = ({ open, onClose, onSubmit, loading, students }) => {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => { if (open) setForm(EMPTY_FORM); }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Send Notification</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => setForm((p) => ({ ...p, broadcast: false, userId: "" }))}
              className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${!form.broadcast ? "bg-[#0F4C8A] text-white border-[#0F4C8A]" : "border-gray-200 text-[#334155] hover:bg-gray-50"}`}
            >
              Specific Student
            </button>
            <button
              onClick={() => setForm((p) => ({ ...p, broadcast: true, userId: "" }))}
              className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${form.broadcast ? "bg-[#0F4C8A] text-white border-[#0F4C8A]" : "border-gray-200 text-[#334155] hover:bg-gray-50"}`}
            >
              All Students
            </button>
          </div>

          {!form.broadcast && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#334155]">Student</label>
              <select
                value={form.userId}
                onChange={set("userId")}
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

          {form.broadcast && (
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-4 py-3">
              <p className="text-xs text-[#1D4ED8] font-medium">This notification will be sent to all students.</p>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Message</label>
            <textarea
              value={form.message}
              onChange={set("message")}
              placeholder="Enter notification message..."
              rows={3}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] resize-none"
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
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-50">
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
              {form.broadcast ? "Send to All" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data.data ?? res.data ?? []);
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
    fetchNotifications();
    fetchStudents();
  }, []);

  const handleSend = async (form) => {
    if (!form.message) return;
    if (!form.broadcast && !form.userId) return;
    setSaving(true);
    try {
      if (form.broadcast) {
        await axiosInstance.post("/notifications/broadcast", {
          message: form.message,
          status: form.status,
        });
      } else {
        await axiosInstance.post("/notifications", {
          userId: form.userId,
          message: form.message,
          status: form.status,
        });
      }
      await fetchNotifications();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/notifications/${item.id}`);
      await fetchNotifications();
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const timeAgo = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const columns = [
    {
      key: "student",
      label: "Student",
      width: "22%",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#0f172a] truncate block">{row.studentName ?? "—"}</span>
          <span className="text-xs text-[#64748b] truncate block">{row.studentEmail ?? ""}</span>
        </div>
      ),
    },
    {
      key: "message",
      label: "Message",
      width: "38%",
      render: (row) => (
        <span className="text-sm text-[#334155] line-clamp-2 break-all">{row.message}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusStyles[row.status]}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "read",
      label: "Read",
      width: "10%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.isRead ? "bg-[#DCFCE7] text-[#008236]" : "bg-[#f1f5f9] text-[#64748b]"}`}>
          {row.isRead ? "Read" : "Unread"}
        </span>
      ),
    },
    {
      key: "time",
      label: "Sent",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#64748b] wrap-break-word">{timeAgo(row.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "8%",
      render: (row) => (
        <button
          onClick={() => setDeleteTarget(row)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a] wrap-anywhere">Notifications</h1>
          <p className="text-sm text-[#64748b] mt-1 wrap-anywhere">Send and manage student notifications</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] text-white text-sm font-medium rounded-xl hover:bg-[#0d3f74] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Send Notification
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={notifications.map((n) => ({ ...n, _key: n.id }))}
        loading={loading}
        emptyText="No notifications found."
      />

      <NotificationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSend}
        loading={saving}
        students={students}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.message?.slice(0, 50) + "..."}
      />
    </div>
  );
};

export default AdminNotifications;