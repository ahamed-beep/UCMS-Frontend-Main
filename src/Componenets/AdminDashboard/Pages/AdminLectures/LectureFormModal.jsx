import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const LECTURE_TYPES = ["video", "doc", "quiz"];

const LectureFormModal = ({ moduleId, lecture, onClose, onSaved }) => {
  const isEdit = !!lecture;
  const [form, setForm] = useState({
    title: lecture?.title ?? "",
    duration: lecture?.duration ?? "",
    type: lecture?.type ?? "video",
    order: lecture?.order ?? 0,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (videoFile) fd.append("video", videoFile);
      if (docFile) fd.append("doc", docFile);

      if (isEdit) {
        await axiosInstance.patch(`/modules/${moduleId}/lectures/${lecture.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post(`/modules/${moduleId}/lectures`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSaved();
      onClose();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">{isEdit ? "Edit Lecture" : "Add Lecture"}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { name: "title", label: "Title", placeholder: "Lecture title" },
            { name: "duration", label: "Duration", placeholder: "e.g. 45 mins" },
            { name: "order", label: "Order", placeholder: "e.g. 1" },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-[#334155] mb-1">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
            >
              {LECTURE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Video upload — sirf video type pe */}
          {form.type === "video" && (
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#334155] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#0F4C8A]/10 file:text-[#0F4C8A]"
              />
              {isEdit && lecture.videoUrl && (
                <p className="text-xs text-[#64748b] mt-1">Current video exists — upload new to replace</p>
              )}
            </div>
          )}

          {/* Doc upload — sirf doc type pe */}
          {form.type === "doc" && (
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1">Document File</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => setDocFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#334155] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#0F4C8A]/10 file:text-[#0F4C8A]"
              />
              {isEdit && lecture.docUrl && (
                <p className="text-xs text-[#64748b] mt-1">Current doc exists — upload new to replace</p>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3d6e] disabled:opacity-50">
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureFormModal;