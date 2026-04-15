import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const SECTIONS = [
  { value: "office", label: "Office" },
  { value: "certificates", label: "Certificates" },
  { value: "achievements", label: "Achievements" },
  { value: "students", label: "Students" },
  { value: "events", label: "Events" },
  { value: "facilities", label: "Facilities" },
];

export default function GalleryEditModal({ item, onClose, onSuccess, onError }) {
  const [form, setForm] = useState({
    title: item.title,
    subtitle: item.subtitle,
    section: item.section,
  });
  const [loading, setLoading] = useState(false);

  // ✅ handles both serialized `id` and raw Mongoose `_id`
  const itemId = item.id ?? item._id;

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemId) return onError("Invalid item ID.");
    setLoading(true);
    try {
      await axiosInstance.patch(`/gallery/${itemId}`, form);
      onSuccess("Gallery item updated successfully.");
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
          <div>
            <h2 className="text-base font-semibold text-gray-900">Edit Gallery Item</h2>
            <p className="text-xs text-gray-400 mt-0.5">Update title, subtitle or section</p>
          </div>
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
              {SECTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}