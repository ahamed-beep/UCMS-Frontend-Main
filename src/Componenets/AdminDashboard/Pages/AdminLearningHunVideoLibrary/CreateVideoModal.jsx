import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const CreateVideoModal = ({ open, onClose, onSaved }) => {
  const [form, setForm] = useState({ title: "", views: "", status: "active" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm({ title: "", views: "", status: "active" });
    setFile(null);
    setError("");
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    setError("");
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.views.trim()) { setError("Views is required."); return; }
    if (!file) { setError("Video file is required."); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("views", form.views.trim());
      formData.append("status", form.status);
      formData.append("file", file);
      await axiosInstance.post("/video-library", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Add Video</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input className={inputCls} placeholder="Video title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Views</label>
            <input className={inputCls} placeholder="e.g. 12.5K views" value={form.views} onChange={(e) => setForm((f) => ({ ...f, views: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0] ?? null)}
              className="w-full text-sm text-[#64748b] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0F4C8A] file:text-white hover:file:bg-blue-800 cursor-pointer"
            />
            {file && <p className="text-xs text-[#64748b] mt-1">{file.name}</p>}
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] hover:bg-blue-800 text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            {loading ? "Uploading..." : "Add Video"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVideoModal;