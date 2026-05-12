import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const EnrollmentFormModal = ({ onClose, onSaved }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          axiosInstance.get("/admin/users"),
          axiosInstance.get("/courses"),
        ]);
        setStudents((usersRes.data.data ?? []).filter((u) => u.role === "student"));
        setCourses(coursesRes.data.data ?? []);
      } catch {
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = useMemo(() => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.firstName?.toLowerCase().includes(q) ||
        s.lastName?.toLowerCase().includes(q) ||
        s.emailId?.toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  const toggleStudent = (id) =>
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelectedStudents(
      selectedStudents.length === filteredStudents.length
        ? []
        : filteredStudents.map((s) => s.id || s._id)
    );

  const handleSubmit = async () => {
    if (!courseId || selectedStudents.length === 0) return;
    try {
      setLoading(true);
      await Promise.all(
        selectedStudents.map((studentId) =>
          axiosInstance.post("/enrollments", { studentId, courseId })
        )
      );
      onSaved();
      onClose();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Enroll Students</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          {fetching ? (
            <p className="text-sm text-[#64748b] text-center py-4">Loading...</p>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1">Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c.id || c._id} value={c.id || c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#334155]">
                    Students
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
                      {selectedStudents.length === filteredStudents.length
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
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
                  />
                </div>

                <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-48">
                  {filteredStudents.length === 0 ? (
                    <p className="text-xs text-[#64748b] text-center py-4">No students found</p>
                  ) : (
                    filteredStudents.map((s) => {
                      const id = s.id || s._id;
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
                            <p className="text-[11px] text-[#64748b] truncate">{s.emailId}</p>
                          </div>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || fetching || !courseId || selectedStudents.length === 0}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3d6e] disabled:opacity-50"
            >
              {loading
                ? "Enrolling..."
                : `Enroll${selectedStudents.length > 1 ? ` (${selectedStudents.length})` : ""}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentFormModal;