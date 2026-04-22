import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const QuizDetailModal = ({ quizId, onClose }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quizId) return;
    setQuiz(null);
    setLoading(true);
    axiosInstance.get(`/quizzes/admin/${quizId}`)
      .then((res) => setQuiz(res.data.data))
      .catch(() => setQuiz(null))
      .finally(() => setLoading(false));
  }, [quizId]);

  useEffect(() => {
    if (!quizId) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [quizId]);

  if (!quizId) return null;

  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-[#0f172a] text-base">Quiz Details</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {loading && (
            <div className="flex items-center justify-center py-16 text-[#64748b] text-sm gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Loading...
            </div>
          )}

          {!loading && !quiz && (
            <p className="text-center text-sm text-[#64748b] py-16">Failed to load quiz.</p>
          )}

          {!loading && quiz && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-[#0f172a]">{quiz.title}</h2>
                <p className="text-sm text-[#64748b] mt-1">{quiz.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Category</p>
                  <p className="text-sm font-semibold text-[#0f172a] capitalize">{quiz.category}</p>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Difficulty</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColors[quiz.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Status</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[quiz.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {quiz.status}
                  </span>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Time Limit</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{quiz.timeLimitMinutes} min</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Total Questions</p>
                  <p className="text-lg font-bold text-[#0f172a]">{quiz.totalQuestions}</p>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Total Attempts</p>
                  <p className="text-lg font-bold text-[#0f172a]">{quiz.attempts.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#0f172a]">Questions</p>
                {quiz.questions.map((q, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4 bg-[#f8fafc]">
                    <p className="text-sm font-medium text-[#0f172a] mb-3">
                      {i + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border ${
                            oi === q.correctAnswerIndex
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-white border-gray-100 text-[#334155]"
                          }`}
                        >
                          <span className="shrink-0 font-bold">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {oi === q.correctAnswerIndex && (
                            <span className="ml-auto shrink-0 text-green-600">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetailModal;