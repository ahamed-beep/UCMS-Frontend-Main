import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const VideoDetailModal = ({ videoId, onClose }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    setVideo(null);
    setLoading(true);
    axiosInstance.get(`/video-library/${videoId}`)
      .then((res) => setVideo(res.data.data))
      .catch(() => setVideo(null))
      .finally(() => setLoading(false));

    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [videoId]);

  if (!videoId) return null;

  const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Video Details</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-16 text-[#64748b] text-sm gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Loading...
            </div>
          )}

          {!loading && !video && (
            <p className="text-center text-sm text-[#64748b] py-16">Failed to load video.</p>
          )}

          {!loading && video && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden">
                <video src={video.src} className="absolute inset-0 w-full h-full object-cover" controls />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#0f172a] wrap-break-word">{video.title}</h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Views</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{video.views}</p>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Status</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[video.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {video.status}
                  </span>
                </div>
                <div className="bg-[#f8fafc] rounded-xl p-3 text-center">
                  <p className="text-xs text-[#94a3b8] mb-1">Created</p>
                  <p className="text-sm font-semibold text-[#0f172a]">{new Date(video.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailModal;