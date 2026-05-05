import { useEffect, useState, useCallback } from "react";
import {
  FileText, Star, Eye, X, ChevronDown, ChevronRight,
  Users, Clock, CheckCircle, Award, Search,
  AlertCircle, Loader2, RefreshCw
} from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";

const STATUS = {
  pending:   { cls: "bg-orange-50 text-orange-600 border border-orange-200",   label: "Pending"   },
  submitted: { cls: "bg-blue-50 text-blue-600 border border-blue-200",         label: "Submitted" },
  graded:    { cls: "bg-green-50 text-green-600 border border-green-200",       label: "Graded"    },
};
const badgeCls = (s) => STATUS[s]?.cls ?? "bg-gray-100 text-gray-600 border border-gray-200";
const badgeLbl = (s) => STATUS[s]?.label ?? s;

const getStudentName = (userId) => {
  if (!userId) return null;
  if (typeof userId === "string") return null;
  const full = [userId.firstName, userId.lastName].filter(Boolean).join(" ");
  return full || userId.name || null;
};

const getStudentEmail = (userId) => {
  if (!userId || typeof userId === "string") return null;
  // Brute-force: check every possible key name the backend might send
  const direct =
    userId.emailId ??
    userId.email ??
    userId.email_id ??
    userId.Email ??
    userId.emailAddress ??
    null;
  if (direct) return direct;
  // Last resort: scan ALL keys for anything containing "email"
  const emailKey = Object.keys(userId).find((k) =>
    k.toLowerCase().includes("email")
  );
  return emailKey ? userId[emailKey] : null;
};

const getStudentInitial = (userId) => {
  const name = getStudentName(userId);
  if (name) return name.charAt(0).toUpperCase();
  const email = getStudentEmail(userId);
  if (email) return email.charAt(0).toUpperCase();
  return "?";
};

function GradeInline({ row, onSave, onCancel, loading, error }) {
  const [grade, setGrade] = useState(row.grade ?? "");
  const [feedback, setFeedback] = useState(row.feedback ?? "");

  return (
    <div className="flex flex-col gap-2 min-w-[220px]">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[10px] font-medium text-[#64748b] mb-0.5 block">Grade (0–100)</label>
          <input
            type="number" min={0} max={100}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            placeholder="e.g. 85"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] font-medium text-[#64748b] mb-0.5 block">Feedback</label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            placeholder="Optional note"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
      <div className="flex gap-1.5">
        <button
          onClick={() => onSave({ grade: Number(grade), feedback })}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
          {loading ? "Saving…" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function AssignmentSubmissionsPanel({ lectureId, assignment }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradingId, setGradingId] = useState(null);
  const [gradeErr, setGradeErr] = useState("");
  const [gradeLoad, setGradeLoad] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/lectures/${lectureId}/assignments/${assignment.id}/submissions`)
      .then((res) => {
        const raw = res.data?.data ?? res.data ?? [];
        const list = Array.isArray(raw) ? raw : [];
        // Log every key of userId to diagnose what backend actually sends
        if (list[0]?.userId && typeof list[0].userId === "object") {
          console.warn("[Submissions] userId keys:", Object.keys(list[0].userId));
          console.warn("[Submissions] userId value:", JSON.stringify(list[0].userId));
        }
        setSubmissions(list);
      })
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, [lectureId, assignment.id]);

  const handleGrade = async (userId, dto) => {
    if (!dto.grade && dto.grade !== 0) { setGradeErr("Grade is required"); return; }
    setGradeErr(""); setGradeLoad(true);
    try {
      const res = await axiosInstance.patch(
        `/lectures/${lectureId}/assignments/${assignment.id}/submissions/${userId}/grade`,
        dto
      );
      const updated = res.data?.data ?? res.data;
      setSubmissions((prev) =>
        prev.map((s) => {
          const sid = s.userId?._id ?? s.userId;
          return sid === userId ? { ...s, ...updated } : s;
        })
      );
      setGradingId(null);
    } catch (err) {
      setGradeErr(err?.response?.data?.message ?? "Failed to grade");
    } finally {
      setGradeLoad(false);
    }
  };

  const filtered = submissions.filter((s) => {
    const name  = getStudentName(s.userId)  ?? "";
    const email = getStudentEmail(s.userId) ?? "";
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || email.toLowerCase().includes(q);
  });

  const columns = [
    {
      key: "student",
      label: "Student",
      width: "260px", // ← wider to fit email
      render: (row) => {
        const u = row.userId;
        // Backend serializer sends: name (combined), email (null bug), _id
        const displayName = u?.name || [u?.firstName, u?.lastName].filter(Boolean).join(" ") || null;
        const displayEmail = u?.emailId || (u?.email !== null ? u?.email : null) || null;
        const initial = displayName?.charAt(0).toUpperCase() || displayEmail?.charAt(0).toUpperCase() || "?";
        return (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#0f172a] leading-tight truncate">
                {displayName ?? <span className="text-[#94a3b8] italic">No name</span>}
              </p>
              {displayEmail && (
                <p className="text-[11px] text-[#64748b] break-all leading-snug mt-0.5">
                  {displayEmail}
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      width: "110px",
      render: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${badgeCls(row.status)}`}>
          {badgeLbl(row.status)}
        </span>
      ),
    },
    {
      key: "grade",
      label: "Grade",
      width: "90px",
      render: (row) =>
        row.grade != null ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0f172a]">
            <Award className="w-3.5 h-3.5 text-amber-400" /> {row.grade}%
          </span>
        ) : (
          <span className="text-xs text-[#94a3b8]">Not graded</span>
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
      key: "submittedAt",
      label: "Submitted",
      width: "130px",
      render: (row) =>
        row.createdAt ? (
          <span className="text-xs text-[#64748b]">
            {new Date(row.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit", month: "short", year: "numeric",
            })}
          </span>
        ) : (
          <span className="text-xs text-[#94a3b8]">—</span>
        ),
    },
    {
      key: "file",
      label: "File",
      width: "70px",
      render: (row) =>
        row.fileUrl ? (
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
          >
            <Eye className="w-3 h-3" /> View
          </a>
        ) : (
          <span className="text-xs text-[#94a3b8]">—</span>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "260px",
      render: (row) => {
        const uid = row.userId?._id ?? row.userId;
        if (gradingId === uid)
          return (
            <GradeInline
              row={row}
              onSave={(dto) => handleGrade(uid, dto)}
              onCancel={() => { setGradingId(null); setGradeErr(""); }}
              loading={gradeLoad}
              error={gradeErr}
            />
          );
        return (
          <button
            onClick={() => { setGradingId(uid); setGradeErr(""); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            <Star className="w-3 h-3" />
            {row.grade != null ? "Re-grade" : "Grade"}
          </button>
        );
      },
    },
  ];

  const gradedCount    = submissions.filter((s) => s.status === "graded").length;
  const pendingCount   = submissions.filter((s) => s.status === "pending").length;
  const submittedCount = submissions.filter((s) => s.status === "submitted").length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-xs text-[#64748b]">
          <Users className="w-3.5 h-3.5" /> {submissions.length} total
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-xs text-orange-600">
          <Clock className="w-3.5 h-3.5" /> {pendingCount} pending
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-xs text-blue-600">
          <FileText className="w-3.5 h-3.5" /> {submittedCount} submitted
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-xs text-green-600">
          <CheckCircle className="w-3.5 h-3.5" /> {gradedCount} graded
        </span>
        <div className="ml-auto flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5 bg-white">
          <Search className="w-3.5 h-3.5 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search student…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs outline-none text-[#334155] placeholder-[#94a3b8] w-32"
          />
        </div>
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((s, i) => ({ ...s, _key: s._id ?? i }))}
        loading={loading}
        emptyText="No submissions yet for this assignment."
      />
    </div>
  );
}

function AssignmentRow({ assignment, lectureId, index }) {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const isOverdue = assignment.dueDate && new Date(assignment.dueDate) < new Date();

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
          <FileText className="w-3.5 h-3.5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#0f172a]">{assignment.title}</span>
            <span className="text-xs text-[#94a3b8] bg-gray-50 px-2 py-0.5 rounded-full">
              #{assignment.order ?? index + 1}
            </span>
            {isOverdue && (
              <span className="text-[10px] font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <AlertCircle className="w-2.5 h-2.5" /> Overdue
              </span>
            )}
          </div>
          {assignment.dueDate && (
            <p className="text-xs text-[#94a3b8] mt-0.5">
              Due: {new Date(assignment.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {open && (
            <button
              onClick={(e) => { e.stopPropagation(); setRefreshKey((k) => k + 1); }}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-[#94a3b8] hover:text-[#64748b] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
          {open
            ? <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
            : <ChevronRight className="w-4 h-4 text-[#94a3b8]" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
          <AssignmentSubmissionsPanel
            key={refreshKey}
            lectureId={lectureId}
            assignment={assignment}
          />
        </div>
      )}
    </div>
  );
}

export default function AdminLectureAssignmentSubmissions({ lectureId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = useCallback(() => {
    if (!lectureId) return;
    setLoading(true);
    axiosInstance
      .get(`/lectures/${lectureId}/assignments`)
      .then((res) => setAssignments(res.data?.data ?? res.data ?? []))
      .catch(() => setAssignments([]))
      .finally(() => setLoading(false));
  }, [lectureId]);

  useEffect(() => { fetchAssignments(); }, [fetchAssignments]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-16 gap-2 text-[#94a3b8]">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading assignments…</span>
      </div>
    );

  if (!assignments.length)
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <FileText className="w-5 h-5 text-[#94a3b8]" />
        </div>
        <p className="text-sm font-medium text-[#334155]">No assignments yet</p>
        <p className="text-xs text-[#94a3b8] mt-1">Add assignments to this lecture first.</p>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#0f172a] text-sm">Assignment Submissions</h3>
          <p className="text-xs text-[#64748b] mt-0.5">
            {assignments.length} assignment{assignments.length !== 1 ? "s" : ""} — click to view & grade submissions
          </p>
        </div>
        <button
          onClick={fetchAssignments}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl text-xs text-[#64748b] hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="space-y-2">
        {assignments.map((a, i) => (
          <AssignmentRow key={a.id} assignment={a} lectureId={lectureId} index={i} />
        ))}
      </div>
    </div>
  );
}