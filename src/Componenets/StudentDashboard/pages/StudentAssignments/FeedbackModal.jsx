import { useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

export default function FeedbackModal({ assignment, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#101828] text-base">Assignment Feedback</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm font-semibold text-[#101828] truncate">{assignment.title}</p>

          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex flex-col items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500 mb-1" />
              <span className="text-xl font-bold text-green-600">{assignment.grade}%</span>
            </div>
          </div>

          <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-1">
            <p className="text-xs font-medium text-[#6A7282] uppercase tracking-wide">Feedback</p>
            <p className="text-sm text-[#101828] break-all">
              {assignment.feedback ?? "No feedback provided."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}