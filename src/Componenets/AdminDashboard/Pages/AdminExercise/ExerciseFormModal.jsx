import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const EXERCISE_TYPES = ["writing", "reading", "listening", "speaking"];

const EMPTY_FORM = {
  type: "writing",
  title: "",
  instructions: "",
  passage: "",
  correctOption: "",
  options: [],
};

const ExerciseFormModal = ({ courseId, exercise, onClose, onSaved }) => {
  const isEdit = !!exercise;

  const [form, setForm] = useState({
    type: exercise?.type ?? "writing",
    title: exercise?.title ?? "",
    instructions: exercise?.instructions ?? "",
    passage: exercise?.passage ?? "",
    correctOption: exercise?.correctOption ?? "",
    options: exercise?.options ?? [],
  });

  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleTypeChange = (e) => {
    setForm({ ...EMPTY_FORM, type: e.target.value });
    setAudioFile(null);
  };

  const addOption = () => {
    const label = String.fromCharCode(65 + form.options.length);
    setForm((f) => ({ ...f, options: [...f.options, { label, text: "" }] }));
  };

  const updateOption = (idx, text) => {
    setForm((f) => ({
      ...f,
      options: f.options.map((o, i) => i === idx ? { ...o, text } : o),
    }));
  };

  const removeOption = (idx) => {
    setForm((f) => ({
      ...f,
      options: f.options
        .filter((_, i) => i !== idx)
        .map((o, i) => ({ ...o, label: String.fromCharCode(65 + i) })),
    }));
  };

 const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    try {
      const isMultipart = form.type === "listening" && audioFile;

      if (isMultipart) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("instructions", form.instructions);
        fd.append("audio", audioFile);
        if (!isEdit) fd.append("type", form.type); // sirf create mein
        if (isEdit) {
          await axiosInstance.patch(`/courses/${courseId}/exercises/${exercise.id ?? exercise._id}`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } else {
          await axiosInstance.post(`/courses/${courseId}/exercises`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      } else {
        const baseBody = {
          title: form.title,
          instructions: form.instructions,
          ...(form.type === "reading" && { passage: form.passage }),
          ...(["reading", "speaking"].includes(form.type) && {
            options: form.options,
            correctOption: form.correctOption,
          }),
        };
        const body = isEdit ? baseBody : { ...baseBody, type: form.type }; // type sirf create mein
        if (isEdit) {
          await axiosInstance.patch(`/courses/${courseId}/exercises/${exercise.id ?? exercise._id}`, body);
        } else {
          await axiosInstance.post(`/courses/${courseId}/exercises`, body);
        }
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-[#0f172a] text-base">{isEdit ? "Edit Exercise" : "Add Exercise"}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">Exercise Type</label>
            <select
              value={form.type}
              onChange={handleTypeChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            >
              {EXERCISE_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">Title <span className="text-red-500">*</span></label>
            <input
              value={form.title}
              onChange={set("title")}
              placeholder="Exercise title"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">Instructions</label>
            <textarea
              value={form.instructions}
              onChange={set("instructions")}
              placeholder="Instructions for the student..."
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] resize-none"
            />
          </div>

          {/* Reading — Passage */}
          {form.type === "reading" && (
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1">Passage</label>
              <textarea
                value={form.passage}
                onChange={set("passage")}
                placeholder="Enter the reading passage..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A] resize-none"
              />
            </div>
          )}

          {/* Listening — Audio Upload */}
          {form.type === "listening" && (
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1">
                Audio File {isEdit ? "(leave empty to keep existing)" : "*"}
              </label>
              {exercise?.audioUrl && !audioFile && (
                <div className="mb-2">
                  <audio controls src={exercise.audioUrl} className="w-full" />
                </div>
              )}
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none"
              />
            </div>
          )}

          {/* Reading & Speaking — Options */}
          {["reading", "speaking"].includes(form.type) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[#334155]">Options</label>
                {form.options.length < 4 && (
                  <button
                    onClick={addOption}
                    className="flex items-center gap-1 text-xs text-[#0F4C8A] hover:underline"
                  >
                    <Plus className="w-3 h-3" /> Add Option
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {form.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#334155] w-5">{opt.label}.</span>
                    <input
                      value={opt.text}
                      onChange={(e) => updateOption(idx, e.target.value)}
                      placeholder={`Option ${opt.label}`}
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
                    />
                    <button onClick={() => removeOption(idx)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {form.options.length > 0 && (
                <div className="mt-3">
                  <label className="block text-xs font-medium text-[#334155] mb-1">Correct Option</label>
                  <select
                    value={form.correctOption}
                    onChange={set("correctOption")}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#0F4C8A]"
                  >
                    <option value="">Select correct option</option>
                    {form.options.map((opt) => (
                      <option key={opt.label} value={opt.label}>{opt.label}. {opt.text}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !form.title.trim()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3d6e] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseFormModal;