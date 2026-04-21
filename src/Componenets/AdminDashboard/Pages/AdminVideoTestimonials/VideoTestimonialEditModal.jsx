import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const VideoTestimonialEditModal = ({ selected, setSelected, onUpdated }) => {
  const [form, setForm] = useState({ name: "", university: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selected) return;
    setForm({ name: selected.name || "", university: selected.university || "" });
    setVideoFile(null);
    setError("");
    const handler = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError("");
    const formData = new FormData();
    if (form.name) formData.append("name", form.name);
    if (form.university) formData.append("university", form.university);
    if (videoFile) formData.append("video", videoFile);

    try {
      setLoading(true);
      await axiosInstance.patch(`/video-testimonials/${selected.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUpdated();
      setSelected(null);
    } catch {
      setError("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => !loading && setSelected(null)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Edit Video Testimonial</h3>
          <button
            onClick={() => !loading && setSelected(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors" />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">University</label>
            <input name="university" value={form.university} onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#155DFC] transition-colors" />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#64748b] uppercase tracking-wide mb-1 block">New Video (optional)</label>
            <input type="file" accept="video/mp4,video/webm,video/mov,video/avi"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#64748b] outline-none focus:border-[#155DFC] transition-colors" />
            <p className="text-xs text-[#94a3b8] mt-1">Sirf naya video replace karna ho to upload karein</p>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={() => !loading && setSelected(null)} disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#155DFC] text-sm font-medium text-white hover:bg-[#1249cc] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonialEditModal;