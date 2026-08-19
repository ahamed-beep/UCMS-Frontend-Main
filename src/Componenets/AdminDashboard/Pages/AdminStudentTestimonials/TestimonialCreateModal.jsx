import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const TestimonialCreateModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    initials: "",
    name: "",
    program: "",
    rating: "",
    quote: "",
    university: "",
    badge: "",
  });
  const [flagFile, setFlagFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError("");
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (flagFile) formData.append("flag", flagFile);

    try {
      setLoading(true);
      await axiosInstance.post("/testimonials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreated();
      onClose();
      setForm({ initials: "", name: "", program: "", rating: "", quote: "", university: "", badge: "" });
      setFlagFile(null);
    } catch {
      setError("Failed to create testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Add Testimonial</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Initials</label>
              <input
                name="initials"
                value={form.initials}
                onChange={handleChange}
                placeholder="SA"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Rating (1-5)</label>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={handleChange}
                placeholder="5"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Sarah Ahmed"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Program</label>
            <input
              name="program"
              value={form.program}
              onChange={handleChange}
              placeholder="MSc Data Science"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">University</label>
            <input
              name="university"
              value={form.university}
              onChange={handleChange}
              placeholder="University of Oxford, UK"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Badge</label>
            <input
              name="badge"
              value={form.badge}
              onChange={handleChange}
              placeholder="Full Scholarship Awarded"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Quote</label>
            <textarea
              name="quote"
              value={form.quote}
              onChange={handleChange}
              rows={3}
              placeholder="Write the student's review here..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Flag Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFlagFile(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#64748b] outline-none focus:border-[#155DFC] transition-colors"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#155DFC] text-sm font-medium text-white hover:bg-[#1249cc] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCreateModal;