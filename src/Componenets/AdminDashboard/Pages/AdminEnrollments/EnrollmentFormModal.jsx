import { useState, useEffect } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const EnrollmentFormModal = ({ onClose, onSaved }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ studentId: "", courseId: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          axiosInstance.get("/admin/users"),
          axiosInstance.get("/courses"),
        ]);
        const allUsers = usersRes.data.data ?? [];
        setStudents(allUsers.filter((u) => u.role === "student"));
        setCourses(coursesRes.data.data ?? []);
      } catch {
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.studentId || !form.courseId) return;
    try {
      setLoading(true);
      await axiosInstance.post("/enrollments", form);
      onSaved();
      onClose();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base wrap-break-word">Enroll Student</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {fetching ? (
            <p className="text-sm text-[#64748b] text-center py-4">Loading...</p>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1">Student</label>
                <select
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} — {s.emailId}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1">Course</label>
                <select
                  name="courseId"
                  value={form.courseId}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50">Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={loading || fetching || !form.studentId || !form.courseId}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3d6e] disabled:opacity-50"
            >
              {loading ? "Enrolling..." : "Enroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentFormModal;