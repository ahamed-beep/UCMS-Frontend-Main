import { useEffect, useState } from "react";
import { Plus, Trash2, X, BookOpen, Hash, CheckCircle, Clock } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const DIFFICULTY_BADGE = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

const AttachQuizModal = ({ lectureId, onClose, onAttached, attachedQuizIds = [] }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    const fetchAllQuizzes = async () => {
      setFetchLoading(true);
      try {
        const res = await axiosInstance.get("/quizzes");
        setQuizzes(res.data?.data?.data ?? []);
      } catch {
        setQuizzes([]);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchAllQuizzes();
  }, []);

  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!selectedQuizId) {
      setError("Please select a quiz");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post(`/lectures/${lectureId}/quizzes`, {
        quizId: selectedQuizId,
        order: Number(order),
      });
      onAttached(res.data?.data ?? res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to attach quiz");
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
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-[#0f172a] text-base">Attach Quiz</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-hidden">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quizzes..."
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] transition-colors shrink-0"
          />

          <div className="overflow-y-auto flex flex-col gap-2 max-h-72 pr-1">
            {fetchLoading ? (
              <div className="flex items-center justify-center py-8 text-[#64748b] text-sm gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Loading quizzes...
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-sm text-[#94a3b8] py-8">No quizzes found</p>
            ) : (
              filtered.map((q) => {
                const alreadyAttached = attachedQuizIds.includes(q.id);
                const isSelected = selectedQuizId === q.id;
                return (
                  <button
                    key={q.id}
                    disabled={alreadyAttached}
                    onClick={() => setSelectedQuizId(q.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                      alreadyAttached
                        ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                        : isSelected
                        ? "border-[#0F4C8A] bg-blue-50"
                        : "border-gray-200 hover:border-[#0F4C8A] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-[#0f172a] truncate">{q.title}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_BADGE[q.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                          {q.difficulty}
                        </span>
                        {alreadyAttached && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                            Attached
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#64748b]">{q.category}</span>
                      <span className="text-xs text-[#94a3b8]">·</span>
                      <span className="text-xs text-[#64748b]">{q.totalQuestions} questions</span>
                      <span className="text-xs text-[#94a3b8]">·</span>
                      <span className="text-xs text-[#64748b]">{q.timeLimitMinutes} min</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <label className="text-xs font-medium text-[#64748b]">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              min={0}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg shrink-0">{error}</p>
          )}

          <div className="flex gap-3 shrink-0">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !selectedQuizId}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f73] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {loading ? "Attaching..." : "Attach"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLectureQuizzes = ({ lectureId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/lectures/${lectureId}/quizzes/admin`);
      setQuizzes(res.data?.data ?? []);
    } catch {
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lectureId) fetchQuizzes();
  }, [lectureId]);

  const handleDetach = async (quiz) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/lectures/${lectureId}/quizzes/${quiz.quizId}`);
      setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
      setToDelete(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "quizId",
      label: "Quiz ID",
      width: "35%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[#0F4C8A] shrink-0" />
          <span className="text-xs font-mono text-[#334155] truncate">{row.quizId}</span>
        </div>
      ),
    },
    {
      key: "order",
      label: "Order",
      width: "15%",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-[#64748b]" />
          <span className="text-sm text-[#334155]">{row.order}</span>
        </div>
      ),
    },
    {
      key: "isCompleted",
      label: "Status",
      width: "20%",
      render: (row) =>
        row.isCompleted ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
            Pending
          </span>
        ),
    },
    {
      key: "createdAt",
      label: "Attached On",
      width: "20%",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#94a3b8]" />
          <span className="text-xs text-[#64748b]">
            {new Date(row.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "10%",
      render: (row) => (
        <button
          onClick={() => setToDelete(row)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a] wrap-anywhere">Lecture Quizzes</h2>
          <p className="text-sm text-[#64748b] mt-0.5">{quizzes.length} quiz{quizzes.length !== 1 ? "zes" : ""} attached</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f73] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Attach Quiz
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={quizzes.map((q) => ({ ...q, _key: q.id }))}
        loading={loading}
        emptyText="No quizzes attached to this lecture."
      />

      {showModal && (
        <AttachQuizModal
          lectureId={lectureId}
          onClose={() => setShowModal(false)}
          onAttached={(newQuiz) => setQuizzes((prev) => [...prev, newQuiz])}
          attachedQuizIds={quizzes.map((q) => q.quizId)}
        />
      )}

      <DeleteModal
        selected={toDelete}
        setSelected={setToDelete}
        onConfirm={handleDetach}
        loading={deleteLoading}
        itemName={toDelete ? `Quiz ${toDelete.quizId.slice(0, 8)}...` : ""}
      />
    </div>
  );
};

export default AdminLectureQuizzes;