import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const VideoModal = ({ lecture, alreadyCompleted, onClose, onComplete }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(alreadyCompleted);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    
    const onTime = () => {
      if (!v.duration) return;
      const pct = (v.currentTime / v.duration) * 100;
      setProgress(pct);
    };
    
    const onEnd = () => {
      setProgress(100);
      setCompleted(true);
      onComplete();
    };
    
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <div className="font-bold text-gray-900">{lecture.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{lecture.duration}</div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-black">
          <video
            ref={videoRef}
       src={lecture.fileUrl ?? lecture.videoUrl}
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="w-full aspect-video"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-700 font-medium">Watch progress</span>
            <span className={completed ? "text-green-600 font-semibold" : "text-gray-500"}>
              {Math.floor(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${completed ? "bg-green-500" : "bg-blue-600"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-gray-500">
            {completed
              ? "✓ Lecture marked complete. You can move on."
              : "Watch the full video to mark this lecture as completed."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;