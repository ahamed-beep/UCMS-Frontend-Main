import { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import FeedbackModal from "./FeedbackModal";
import StudentAssignmentTable from "./AssignmentTable";

const statConfig = [
  {
    key: "pending",
    label: "Pending",
    bg: "bg-[#FFF7ED]",
    border: "border-[0.89px] border-[#FFD6A8]",
    textColor: "text-[#F54900]",
    countColor: "text-[#CA3500]",
    icon: "/Images/orangeclock.webp",
  },
  {
    key: "submitted",
    label: "Submitted",
    bg: "bg-[#EFF6FF]",
    border: "border-[0.89px] border-[#BEDBFF]",
    textColor: "text-[#155DFC]",
    countColor: "text-[#1447E6]",
    icon: "/Images/checkblue.webp",
  },
  {
    key: "graded",
    label: "Graded",
    bg: "bg-[#F0FDF4]",
    border: "border-[0.89px] border-[#B9F8CF]",
    textColor: "text-[#00A63E]",
    countColor: "text-[#008236]",
    icon: "/Images/checkgreen.webp",
  },
];

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackTarget, setFeedbackTarget] = useState(null);

  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllAssignments();
  }, []);

  const fetchAllAssignments = async () => {
    setLoading(true);
    try {
      const enrollRes = await axiosInstance.get("/enrollments/my-courses");
      const enrollments = enrollRes.data?.data ?? [];

      const courseIds = enrollments
        .filter((e) => e.isActive)
        .map((e) => (typeof e.courseId === "object" ? e.courseId?.id : e.courseId))
        .filter(Boolean);

      const modulesPerCourse = await Promise.all(
        courseIds.map((id) =>
          axiosInstance.get(`/courses/${id}/modules`).then((r) => r.data.data ?? []).catch(() => [])
        )
      );

      const allModules = modulesPerCourse.flat();

      const lecturesPerModule = await Promise.all(
        allModules.map((mod) =>
          axiosInstance.get(`/modules/${mod.id}/lectures`).then((r) => r.data.data ?? []).catch(() => [])
        )
      );

      const allLectures = lecturesPerModule.flat();

      const assignmentsPerLecture = await Promise.all(
        allLectures.map((lec) =>
          axiosInstance
            .get(`/lectures/${lec.id}/assignments/student`)
            .then((r) => {
              const list = r.data?.data ?? r.data ?? [];
              return list.map((a) => ({ ...a, lectureId: lec.id }));
            })
            .catch(() => [])
        )
      );

      setAssignments(assignmentsPerLecture.flat());
    } catch (err) {
      console.error(err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const validateAndSet = (f) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowed.includes(f.type)) {
      setSubmitError("Only PDF, DOC, DOCX, TXT files allowed.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setSubmitError("File must be under 10MB.");
      return;
    }
    setSubmitError("");
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSet(dropped);
  };

  const handleSubmit = async () => {
    if (!selectedAssignmentId) { setSubmitError("Please select an assignment."); return; }
    if (!file) { setSubmitError("Please choose a file."); return; }

    const target = assignments.find((a) => a.id === selectedAssignmentId);
    if (!target) return;

    setSubmitError("");
    setSubmitSuccess("");
    setSubmitLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post(
        `/lectures/${target.lectureId}/assignments/${target.id}/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const submission = res.data?.data ?? res.data;

      setAssignments((prev) =>
        prev.map((a) =>
          a.id === target.id
            ? { ...a, status: "submitted", fileUrl: submission.fileUrl, submittedAt: submission.createdAt }
            : a
        )
      );

      setFile(null);
      setSelectedAssignmentId("");
      setSubmitSuccess("Assignment submitted successfully!");
    } catch (err) {
      setSubmitError(err?.response?.data?.message ?? "Failed to submit assignment.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const pendingAssignments = assignments.filter((a) => a.status === "pending");

  const counts = statConfig.reduce((acc, s) => {
    acc[s.key] = assignments.filter((a) => (a.status ?? "pending") === s.key).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#64748b] text-sm gap-2">
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading assignments...
      </div>
    );
  }

  return (
    <div className="py-2 md:py-4 space-y-2 md:space-y-4">

      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">
          Upload Assignment
        </h2>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col justify-center items-center gap-2 md:gap-4 border-[1.78px] border-dashed rounded-[10px] p-6 md:p-10 text-center cursor-pointer transition-colors ${
            dragging
              ? "border-[#155DFC] bg-blue-50"
              : file
              ? "border-green-400 bg-green-50"
              : "border-[#D1D5DC] bg-[#F9FAFB] hover:border-[#155DFC] hover:bg-blue-50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={(e) => e.target.files[0] && validateAndSet(e.target.files[0])}
          />

          {file ? (
            <>
              <CheckCircle className="w-10 h-10 text-green-500" />
              <p className="font-inter font-medium text-sm text-green-700">{file.name}</p>
              <p className="font-inter text-xs text-green-500">{(file.size / 1024).toFixed(1)} KB</p>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="font-inter text-xs text-[#E7000B] hover:underline"
              >
                Remove file
              </button>
            </>
          ) : (
            <>
              <img src="/Images/download.webp" alt="download" width={48} height={48} />
              <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">
                Drag and drop your assignment here
              </p>
              <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                or click to browse from your computer
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="font-inter font-medium text-sm md:text-[16px] bg-[#155DFC] text-white px-5 py-2 rounded-[10px]"
              >
                Choose Files
              </button>
              <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">
                Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
              </p>
            </>
          )}
        </div>

        <div>
          <label className="font-inter font-medium text-[12px] md:text-sm text-[#364153]">
            Select Assignment
          </label>
          <select
            value={selectedAssignmentId}
            onChange={(e) => {
              setSelectedAssignmentId(e.target.value);
              setSubmitError("");
              setSubmitSuccess("");
            }}
            className="w-full border-[0.89px] border-[#D1D5DC] rounded-[10px] py-3 px-2 mt-1 font-inter text-sm text-[#101828] bg-white"
          >
            <option value="">— Select a pending assignment —</option>
            {pendingAssignments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
                {a.dueDate ? ` (Due: ${new Date(a.dueDate).toLocaleDateString("en-GB")})` : ""}
              </option>
            ))}
          </select>
        </div>

        {submitError && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-3 py-2 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg px-3 py-2 text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />
            {submitSuccess}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitLoading || !file || !selectedAssignmentId}
          className="font-inter font-medium text-sm md:text-[16px] bg-[#155DFC] text-white px-5 py-2 rounded-[10px] disabled:opacity-50 flex items-center gap-2"
        >
          {submitLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Assignment"
          )}
        </button>
      </div>

      <div>
        <StudentAssignmentTable
          assignments={assignments}
          onUpload={(a) => {
            setSelectedAssignmentId(a.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onViewFeedback={(a) => setFeedbackTarget(a)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {statConfig.map((item) => (
          <div
            key={item.key}
            className={`${item.bg} ${item.border} p-4 md:p-6 rounded-xl flex justify-between items-center`}
          >
            <div>
              <p className={`font-inter font-medium text-[12px] md:text-sm ${item.textColor}`}>
                {item.label}
              </p>
              <h2 className={`font-inter font-bold text-[25px] md:text-[30px] ${item.countColor}`}>
                {counts[item.key] ?? 0}
              </h2>
            </div>
            <img src={item.icon} alt={item.label} width={40} height={40} />
          </div>
        ))}
      </div>

      {feedbackTarget && (
        <FeedbackModal
          assignment={feedbackTarget}
          onClose={() => setFeedbackTarget(null)}
        />
      )}
    </div>
  );
};

export default AssignmentSection;