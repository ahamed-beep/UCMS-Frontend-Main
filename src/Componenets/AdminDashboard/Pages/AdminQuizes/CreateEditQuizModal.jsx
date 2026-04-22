import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const emptyQuestion = () => ({
  question: "",
  options: ["", "", "", ""],
  correctAnswerIndex: 0,
});

const CreateEditQuizModal = ({ open, onClose, onSaved, editData }) => {
  const isEdit = !!editData;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "medium",
    timeLimitMinutes: 30,
    status: "active",
    questions: [emptyQuestion()],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    if (isEdit) {
      const fetchDetail = async () => {
        try {
          const res = await axiosInstance.get(`/quizzes/admin/${editData.id}`);
          const d = res.data.data;
          setForm({
            title: d.title,
            description: d.description,
            category: d.category,
            difficulty: d.difficulty,
            timeLimitMinutes: d.timeLimitMinutes,
            status: d.status,
            questions: d.questions.map((q) => ({
              question: q.question,
              options: q.options,
              correctAnswerIndex: q.correctAnswerIndex,
            })),
          });
        } catch {
          setError("Failed to load quiz details.");
        }
      };
      fetchDetail();
    } else {
      setForm({
        title: "",
        description: "",
        category: "",
        difficulty: "medium",
        timeLimitMinutes: 30,
        status: "active",
        questions: [emptyQuestion()],
      });
      setError("");
    }
  }, [open, editData]);

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

  if (!open) return null;

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setQuestion = (qi, key, value) => {
    setForm((f) => {
      const qs = [...f.questions];
      qs[qi] = { ...qs[qi], [key]: value };
      return { ...f, questions: qs };
    });
  };

  const setOption = (qi, oi, value) => {
    setForm((f) => {
      const qs = [...f.questions];
      const opts = [...qs[qi].options];
      opts[oi] = value;
      qs[qi] = { ...qs[qi], options: opts };
      return { ...f, questions: qs };
    });
  };

  const addQuestion = () => setForm((f) => ({ ...f, questions: [...f.questions, emptyQuestion()] }));

  const removeQuestion = (qi) =>
    setForm((f) => ({ ...f, questions: f.questions.filter((_, i) => i !== qi) }));

  const handleSubmit = async () => {
    setError("");
    if (!form.title.trim() || !form.category.trim()) {
      setError("Title and category are required.");
      return;
    }
    for (let i = 0; i < form.questions.length; i++) {
      const q = form.questions[i];
      if (!q.question.trim()) { setError(`Question ${i + 1} text is required.`); return; }
      if (q.options.some((o) => !o.trim())) { setError(`All options in question ${i + 1} are required.`); return; }
    }
    setLoading(true);
    try {
      if (isEdit) {
        await axiosInstance.patch(`/quizzes/${editData.id}`, form);
      } else {
        await axiosInstance.post("/quizzes", form);
      }
      onSaved();
    } catch (e) {
      setError(e?.response?.data?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] focus:ring-2 focus:ring-blue-100 transition-all";
  const labelCls = "block text-xs font-medium text-[#64748b] mb-1.5";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-[#0f172a] text-base">{isEdit ? "Edit Quiz" : "Create Quiz"}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Title</label>
              <input className={inputCls} placeholder="Quiz title" value={form.title} onChange={(e) => setField("title", e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Description</label>
              <textarea className={`${inputCls} resize-none`} rows={2} placeholder="Short description" value={form.description} onChange={(e) => setField("description", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <input className={inputCls} placeholder="e.g. grammar" value={form.category} onChange={(e) => setField("category", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Difficulty</label>
              <select className={inputCls} value={form.difficulty} onChange={(e) => setField("difficulty", e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Time Limit (minutes)</label>
              <input type="number" className={inputCls} min={1} value={form.timeLimitMinutes} onChange={(e) => setField("timeLimitMinutes", Number(e.target.value))} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={form.status} onChange={(e) => setField("status", e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0f172a]">Questions</p>
              <button onClick={addQuestion} className="flex items-center gap-1.5 text-xs font-medium text-[#0F4C8A] hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>

            {form.questions.map((q, qi) => (
              <div key={qi} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-[#f8fafc]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#64748b]">Question {qi + 1}</p>
                  {form.questions.length > 1 && (
                    <button onClick={() => removeQuestion(qi)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  className={inputCls}
                  placeholder="Question text"
                  value={q.question}
                  onChange={(e) => setQuestion(qi, "question", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qi}`}
                        checked={q.correctAnswerIndex === oi}
                        onChange={() => setQuestion(qi, "correctAnswerIndex", oi)}
                        className="accent-[#0F4C8A] shrink-0"
                      />
                      <input
                        className={inputCls}
                        placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                        value={opt}
                        onChange={(e) => setOption(qi, oi, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#94a3b8]">Select radio button to mark correct answer</p>
              </div>
            ))}
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0">
          <button onClick={onClose} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] hover:bg-blue-800 text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditQuizModal;