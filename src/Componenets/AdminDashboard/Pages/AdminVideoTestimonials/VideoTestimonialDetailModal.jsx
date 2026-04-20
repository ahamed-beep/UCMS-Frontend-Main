import { useEffect, useRef, useState } from "react";
import { X, Play, Pause } from "lucide-react";

const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const VideoTestimonialDetailModal = ({ selected, setSelected }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!selected) return;
    setPlaying(false);
    setCurrent(0);
    setDuration(0);
    const handler = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const toggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) { vid.pause(); setPlaying(false); }
    else { vid.play(); setPlaying(true); }
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setSelected(null)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Video Testimonial</h3>
          <button
            onClick={() => setSelected(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative aspect-video bg-[#1E2939] cursor-pointer" onClick={toggle}>
          <video
            ref={videoRef}
            src={selected.videoUrl}
            className="w-full h-full object-cover"
            onTimeUpdate={() => setCurrent(videoRef.current?.currentTime || 0)}
            onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
            onEnded={() => setPlaying(false)}
            preload="metadata"
          />
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              {playing
                ? <Pause className="w-6 h-6 text-white fill-white" />
                : <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              }
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {fmt(current)} / {fmt(duration)}
          </span>
        </div>

        <div className="h-1 bg-gray-100 cursor-pointer" onClick={handleSeek}>
          <div
            className="h-full bg-[#155DFC] transition-all duration-100"
            style={{ width: `${duration ? (current / duration) * 100 : 0}%` }}
          />
        </div>

        <div className="p-5">
          <p className="font-semibold text-[#0f172a]">{selected.name}</p>
          <p className="text-sm text-[#64748b] mt-0.5">{selected.university}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoTestimonialDetailModal;