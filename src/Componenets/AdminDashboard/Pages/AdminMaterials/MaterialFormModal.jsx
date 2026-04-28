import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const MATERIAL_TYPES = ["video", "pdf", "presentation"];

const ACCEPT_MAP = {
  video: "video/*",
  pdf: ".pdf",
  presentation: ".ppt,.pptx",
};

const MaterialFormModal = ({ courseId, material, onClose, onSaved }) => {
  const isEdit = !!material;
  const [form, setForm] = useState({
    title: material?.title ?? "",
    sub: material?.sub ?? "",
    type: material?.type ?? "pdf",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("file", file);

      if (isEdit) {
        await axiosInstance.patch(
          `/courses/${courseId}/materials/${material.id}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axiosInstance.post(
          `/courses/${courseId}/materials`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
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
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">{isEdit ? "Edit Material" : "Add Material"}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { name: "title", label: "Title", placeholder: "Material title" },
            { name: "sub", label: "Sub", placeholder: "Sub title (optional)" },
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
              {MATERIAL_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">File</label>
            <input
              type="file"
              accept={ACCEPT_MAP[form.type]}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#334155] file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-[#0F4C8A]/10 file:text-[#0F4C8A]"
            />
            {isEdit && material.fileUrl && (
              <p className="text-xs text-[#64748b] mt-1">Current file exists — upload new to replace</p>
            )}
          </div>

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

export default MaterialFormModal;