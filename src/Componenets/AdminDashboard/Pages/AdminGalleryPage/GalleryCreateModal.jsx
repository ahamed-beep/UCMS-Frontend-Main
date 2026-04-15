import { useState, useRef } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const SECTIONS = [
  { value: "office", label: "Office" },
  { value: "certificates", label: "Certificates" },
  { value: "achievements", label: "Achievements" },
  { value: "students", label: "Students" },
  { value: "events", label: "Events" },
  { value: "facilities", label: "Facilities" },
];

const initialForm = { title: "", subtitle: "", section: "" };

export default function GalleryCreateModal({ onClose, onSuccess, onError }) {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("subtitle", form.subtitle);
      fd.append("section", form.section);
      files.forEach((f) => fd.append("images", f));
      await axiosInstance.post("/gallery", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess("Gallery item created successfully.");
      onClose();
    } catch (err) {
      onError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">Add Gallery Item</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
              placeholder="e.g. Annual Ceremony 2024"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={form.subtitle}
              onChange={handleFormChange}
              required
              placeholder="Short description"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Section</label>
            <select
              name="section"
              value={form.section}
              onChange={handleFormChange}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all bg-white appearance-none"
            >
              <option value="" disabled>Select a section</option>
              {SECTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Images</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <svg className="mx-auto mb-2 text-gray-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              {files.length > 0 ? (
                <p className="text-sm text-gray-700 font-medium">{files.length} image{files.length > 1 ? "s" : ""} selected</p>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Click to upload images</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP — up to 10 files</p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              )}
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}