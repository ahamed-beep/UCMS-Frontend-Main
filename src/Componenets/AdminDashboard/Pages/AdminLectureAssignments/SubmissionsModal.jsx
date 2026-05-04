import { useEffect, useState } from "react";
import { X, Star, Eye } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";

const STATUS_BADGE = {
  pending: "bg-orange-100 text-orange-600",
  submitted: "bg-blue-100 text-blue-600",
  graded: "bg-green-100 text-green-600",
};

const statusBadgeClass = (status) => STATUS_BADGE[status] ?? "bg-gray-100 text-gray-600";

export default function SubmissionsModal({ assignment, lectureId, onClose }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grading, setGrading] = useState(null);
  const [gradeForm, setGradeForm] = useState({ grade: "", feedback: "" });
  const [gradeError, setGradeError] = useState("");
  const [gradeLoading, setGradeLoading] = useState(false);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axiosInstance.get(
          `/lectures/${lectureId}/assignments/${assignment.id}/submissions`
        );
        setSubmissions(res.data?.data ?? res.data ?? []);
      } catch {
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [assignment.id, lectureId]);

  const handleGrade = async (userId) => {
    if (!gradeForm.grade) return setGradeError("Grade is required");
    setGradeError("");
    setGradeLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/lectures/${lectureId}/assignments/${assignment.id}/submissions/${userId}/grade`,
        { grade: Number(gradeForm.grade), feedback: gradeForm.feedback }
      );
      const updated = res.data?.data ?? res.data;
      setSubmissions((prev) =>
        prev.map((s) =>
          s.userId === userId || s.userId?._id === userId ? { ...s, ...updated } : s
        )
      );
      setGrading(null);
      setGradeForm({ grade: "", feedback: "" });
    } catch (err) {
      setGradeError(err?.response?.data?.message ?? "Failed to grade");
    } finally {
      setGradeLoading(false);
    }
  };

  const columns = [
    {
      key: "user",
      label: "Student",
      width: "200px",
      render: (row) => (
        <span className="text-sm font-medium text-[#0f172a] truncate block">
          {row.userId?.name ?? row.userId?.email ?? String(row.userId).slice(-8)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "110px",
      render: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadgeClass(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "grade",
      label: "Grade",
      width: "80px",
      render: (row) => (
        <span className="text-sm text-[#334155]">
          {row.grade != null ? `${row.grade}%` : "—"}
        </span>
      ),
    },
    {
      key: "feedback",
      label: "Feedback",
      width: "160px",
      render: (row) => (
        <span className="text-xs text-[#64748b] truncate block max-w-[140px]">
          {row.feedback ?? "—"}
        </span>
      ),
    },
    {
      key: "file",
      label: "File",
      width: "80px",
      render: (row) => (
        <a
          href={row.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
        >
          <Eye className="w-3 h-3" /> View
        </a>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "220px",
      render: (row) => {
        const uid = row.userId?._id ?? row.userId;
        return grading === uid ? (
          <div className="flex gap-1 items-center">
            <input
              type="number"
              placeholder="Grade %"
              className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none"
              value={gradeForm.grade}
              onChange={(e) => setGradeForm((p) => ({ ...p, grade: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Feedback"
              className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none"
              value={gradeForm.feedback}
              onChange={(e) => setGradeForm((p) => ({ ...p, feedback: e.target.value }))}
            />
            <button
              onClick={() => handleGrade(uid)}
              disabled={gradeLoading}
              className="px-2 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 disabled:opacity-50"
            >
              {gradeLoading ? "..." : "Save"}
            </button>
            <button
              onClick={() => {
                setGrading(null);
                setGradeForm({ grade: "", feedback: "" });
                setGradeError("");
              }}
              className="px-2 py-1 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setGrading(uid);
              setGradeForm({ grade: row.grade ?? "", feedback: row.feedback ?? "" });
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            <Star className="w-3 h-3" /> Grade
          </button>
        );
      },
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h3 className="font-bold text-[#0f172a] text-base">Submissions</h3>
            <p className="text-xs text-[#64748b] mt-0.5">{assignment.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-auto flex-1">
          {gradeError && <p className="text-xs text-red-500 mb-3">{gradeError}</p>}
          <AdminTable
            columns={columns}
            rows={submissions.map((s, i) => ({ ...s, _key: s._id ?? i }))}
            loading={loading}
            emptyText="No submissions yet."
          />
        </div>
      </div>
    </div>
  );
}