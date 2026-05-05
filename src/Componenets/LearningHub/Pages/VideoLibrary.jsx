import { useRef, useState, useEffect } from "react";
import { Video, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../../Api/axiosInstance";

const VideoCard = ({ title, views, src }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrent(newTime);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          onTimeUpdate={() => videoRef.current && setCurrent(videoRef.current.currentTime)}
          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
          onEnded={() => setPlaying(false)}
        />
        <button
          onClick={togglePlay}
          className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          {playing ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {fmt(current)} / {fmt(duration)}
        </span>
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-white/20 cursor-pointer z-10"
          onClick={handleSeek}
        >
          <div className="h-1 bg-[#FF6B35] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1 wrap-break-word">{title}</h3>
        <p className="text-sm text-gray-500 wrap-break-word">{views}</p>
      </div>
    </div>
  );
};

const VideoLibrary = () => {
  const desktopScrollRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get("/video-library", { params: { page: 1, limit: 20 } });
        const data = res.data?.data?.data || [];
        setVideos(Array.isArray(data) ? data : []);
      } catch {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const scrollLeft = () => desktopScrollRef.current?.scrollBy({ left: -460, behavior: "smooth" });
  const scrollRight = () => desktopScrollRef.current?.scrollBy({ left: 460, behavior: "smooth" });

  const useScroll = videos.length > 2;

  const videoPairs = [];
  for (let i = 0; i < videos.length; i += 2) {
    videoPairs.push(videos.slice(i, i + 2));
  }

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0A0A0A] font-inter flex items-center gap-2 mb-8">
            <Video className="w-7 h-7 text-[#0F4C8A]" />
            Video Learning Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#0A0A0A] font-inter flex items-center gap-2">
            <Video className="w-7 h-7 text-[#0F4C8A]" />
            Video Learning Library
          </h2>
          {useScroll && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-[#F3F4F6] transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-[#0F4C8A]" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-[#F3F4F6] transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5 text-[#0F4C8A]" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex md:hidden gap-4 overflow-x-auto scroll-smooth px-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((v) => (
          <div key={v.id} className="flex-shrink-0 w-[85vw]">
            <VideoCard title={v.title} views={v.views} src={v.src} />
          </div>
        ))}
      </div>

      {useScroll ? (
        <div
          ref={desktopScrollRef}
          className="hidden md:flex gap-10 overflow-x-auto scroll-smooth px-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videoPairs.map((pair, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-5 flex-shrink-0 w-[420px]">
              {pair.map((v) => (
                <VideoCard key={v.id} title={v.title} views={v.views} src={v.src} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5 max-w-7xl mx-auto px-6">
          {videos.map((v) => (
            <VideoCard key={v.id} title={v.title} views={v.views} src={v.src} />
          ))}
        </div>
      )}
    </section>
  );
};

export default VideoLibrary;