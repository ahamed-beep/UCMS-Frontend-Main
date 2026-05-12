import { useEffect, useState, useMemo } from "react";
import { Trash2, Bell } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";

const statusStyles = {
  pending: "bg-[#FEF9C2] text-[#A65F00]",
  fulfilled: "bg-[#DCFCE7] text-[#008236]",
  rejected: "bg-[#FFE2E2] text-[#C10007]",
};
const NOTIFICATION_STATUSES = ["pending", "fulfilled", "rejected"];

const NotificationModal = ({ open, onClose, onSubmit, loading, students, courses }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("pending");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [sendToAll, setSendToAll] = useState(false);

  const filteredStudents = useMemo(() => {
    const q = studentSearch.toLowerCase().trim();
    return students.filter((s) => {
      const matchesSearch =
        !q ||
        s.firstName?.toLowerCase().includes(q) ||
        s.lastName?.toLowerCase().includes(q) ||
        (s.emailId ?? s.email)?.toLowerCase().includes(q);

      const matchesCourse =
        !courseFilter ||
        (s.enrolledCourseIds ?? []).some(
          (id) => String(id) === String(courseFilter)
        );

      return matchesSearch && matchesCourse;
    });
  }, [students, studentSearch, courseFilter]);

  useEffect(() => {
    if (!open) {
      setMessage("");
      setStatus("pending");
      setSelectedStudents([]);
      setStudentSearch("");
      setCourseFilter("");
      setSendToAll(false);
    }
  }, [open]);

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

  const toggleStudent = (id) =>
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const toggleAll = () => {
    const allIds = filteredStudents.map((s) => s.id ?? s._id);
    const allSelected = allIds.every((id) => selectedStudents.includes(id));
    setSelectedStudents((prev) =>
      allSelected
        ? prev.filter((id) => !allIds.includes(id))
        : [...new Set([...prev, ...allIds])]
    );
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    if (sendToAll) {
      onSubmit({ type: "broadcast", message, status });
    } else {
      onSubmit({ type: "bulk", message, status, userIds: selectedStudents });
    }
  };

  if (!open) return null;

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
          <h3 className="font-bold text-[#0f172a] text-base">Send Notification</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification message..."
              rows={3}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] capitalize"
            >
              {NOTIFICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendToAll}
              onChange={(e) => setSendToAll(e.target.checked)}
              className="accent-[#0F4C8A] w-4 h-4"
            />
            <span className="text-sm text-[#334155]">Send to all students</span>
          </label>

          {!sendToAll && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#334155]">
                  Select Students
                  {selectedStudents.length > 0 && (
                    <span className="ml-2 bg-[#0F4C8A] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {selectedStudents.length}
                    </span>
                  )}
                </label>
                {filteredStudents.length > 0 && (
                  <button
                    onClick={toggleAll}
                    className="text-[11px] text-[#0F4C8A] hover:underline"
                  >
                    {filteredStudents.every((s) =>
                      selectedStudents.includes(s.id ?? s._id)
                    )
                      ? "Deselect all"
                      : "Select all"}
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
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
                    className="w-full pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F4C8A]"
                  />
                </div>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-36 px-2 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F4C8A] text-[#475569]"
                >
                  <option value="">All courses</option>
                  {courses.map((c) => (
                    <option key={c.id ?? c._id} value={c.id ?? c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-48">
                {filteredStudents.length === 0 ? (
                  <p className="text-xs text-[#64748b] text-center py-4">
                    No students found
                  </p>
                ) : (
                  filteredStudents.map((s) => {
                    const id = s.id ?? s._id;
                    const checked = selectedStudents.includes(id);
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
                          {(s.enrolledCourseTitles ?? []).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {s.enrolledCourseTitles.map((title, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-1.5 py-0.5 bg-[#EFF6FF] text-[#1d4ed8] rounded-full"
                                >
                                  {title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          )}

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
              disabled={
                loading ||
                !message.trim() ||
                (!sendToAll && selectedStudents.length === 0)
              }
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f74] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {sendToAll
                ? "Broadcast"
                : `Send${selectedStudents.length > 1 ? ` (${selectedStudents.length})` : ""}`}
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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    Promise.all([
      axiosInstance.get("/admin/users"),
      axiosInstance.get("/enrollments"),
      axiosInstance.get("/courses"),
    ])
      .then(([usersRes, enrollmentsRes, coursesRes]) => {
        const allUsers = usersRes.data.data ?? [];
        const allStudents = allUsers.filter((u) => u.role === "student");
        const allEnrollments = enrollmentsRes.data.data ?? [];
        const allCourses = coursesRes.data.data ?? [];

        // Debug — confirm kar lo data aa raha hai
        console.log("=== ENROLLMENT SAMPLE ===", allEnrollments[0]);
        console.log("=== STUDENT SAMPLE ===", allStudents[0]);

        setCourses(allCourses);

        const studentsWithCourses = allStudents.map((student) => {
       const studentId = String(student.id ?? student._id);
const studentEnrollments = allEnrollments.filter(
  (e) => String(e.studentId?.id ?? e.studentId) === studentId  // ✅ nested id nikalo
);


      const enrolledCourseIds = studentEnrollments.map((e) =>
  String(e.courseId?.id ?? e.courseId)  // ✅ courseId bhi object hai
);

          const enrolledCourseTitles = studentEnrollments.map((e) =>
  e.courseId?.title ?? ""  // ✅ title seedha object se lo, find ki zaroorat nahi
).filter(Boolean);

          return { ...student, enrolledCourseIds, enrolledCourseTitles };
        });

        setStudents(studentsWithCourses);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSend = async (form) => {
    setSending(true);
    try {
      if (form.type === "broadcast") {
        await axiosInstance.post("/notifications/broadcast", {
          message: form.message,
          status: form.status,
        });
      } else {
        await axiosInstance.post("/notifications/bulk", {
          userIds: form.userIds,
          message: form.message,
          status: form.status,
        });
      }
      await fetchNotifications();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (item) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/notifications/${item.id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== item.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return notifications.filter((n) => {
      const matchesSearch =
        !q ||
        n.studentName?.toLowerCase().includes(q) ||
        n.studentEmail?.toLowerCase().includes(q) ||
        n.message?.toLowerCase().includes(q);

      const matchesCourse =
        !courseFilter ||
        (n.courses ?? []).some(
          (c) => String(c?.id ?? c?._id ?? c) === String(courseFilter)
        );

      return matchesSearch && matchesCourse;
    });
  }, [notifications, search, courseFilter]);

  const columns = [
    {
      key: "student",
      label: "Student",
      width: "22%",
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#0f172a]">
            {row.studentName ?? "—"}
          </span>
          <span className="text-xs text-[#64748b]">{row.studentEmail ?? ""}</span>
        </div>
      ),
    },
    {
      key: "courses",
      label: "Courses",
      width: "20%",
      render: (row) =>
        row.courses?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.courses.map((c) => (
              <span
                key={c.id ?? c._id}
                className="text-[11px] px-1.5 py-0.5 bg-[#EFF6FF] text-[#1d4ed8] rounded-full"
              >
                {c.title}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-[#94a3b8] text-sm">—</span>
        ),
    },
    {
      key: "message",
      label: "Message",
      width: "25%",
      render: (row) => (
        <span className="text-sm text-[#334155] line-clamp-2">{row.message}</span>
      ),
    },
    {
      key: "date",
      label: "Sent At",
      width: "11%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">
          {new Date(row.createdAt).toLocaleDateString("en-US")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "10%",
      render: (row) => (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
            statusStyles[row.status] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      width: "4%",
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Notifications</h1>
          <p className="text-sm text-[#64748b] mt-1">
            Send and manage student notifications
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] text-white text-sm font-medium rounded-xl hover:bg-[#0d3f74] transition-colors"
        >
          <Bell className="w-4 h-4" />
          Send Notification
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
            placeholder="Search by name, email, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
          />
        </div>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="w-full sm:w-52 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] text-[#475569] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
        >
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c.id ?? c._id} value={c.id ?? c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((n) => ({ ...n, _key: n.id }))}
        loading={loading}
        emptyText="No notifications found."
      />

      <NotificationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSend}
        loading={sending}
        students={students}
        courses={courses}
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName="this notification"
      />
    </div>
  );
};

export default AdminNotifications;