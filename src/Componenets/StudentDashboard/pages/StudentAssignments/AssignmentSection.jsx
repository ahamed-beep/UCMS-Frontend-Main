import { useEffect, useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import FeedbackModal from "./FeedbackModal";
import UploadAssignmentModal from "./UploadAssignmentModal";
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

const AssignmentSection = ({ lectureId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadTarget, setUploadTarget] = useState(null);
  const [feedbackTarget, setFeedbackTarget] = useState(null);

  useEffect(() => {
    if (!lectureId) return;
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/lectures/${lectureId}/assignments/student`);
        setAssignments(res.data?.data ?? res.data ?? []);
      } catch {
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [lectureId]);

  const handleSubmitted = (submission) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === uploadTarget?.id
          ? { ...a, status: "submitted", fileUrl: submission.fileUrl, submittedAt: submission.createdAt }
          : a
      )
    );
    setUploadTarget(null);
  };

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
    <div className="py-2 md:py-4 space-y-4">
      <StudentAssignmentTable
        assignments={assignments}
        onUpload={(a) => setUploadTarget(a)}
        onViewFeedback={(a) => setFeedbackTarget(a)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {uploadTarget && (
        <UploadAssignmentModal
          assignment={uploadTarget}
          lectureId={lectureId}
          onClose={() => setUploadTarget(null)}
          onSubmitted={handleSubmitted}
        />
      )}

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