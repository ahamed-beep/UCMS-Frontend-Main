import { useEffect } from "react";
import { X, Star, Check } from "lucide-react";

const TestimonialDetailModal = ({ selected, setSelected }) => {
  useEffect(() => {
    if (!selected) return;
    const handler = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected]);

  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setSelected(null)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base wrap-break-word">Testimonial Details</h3>
          <button
            onClick={() => setSelected(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-5"
            style={{ background: "linear-gradient(to right, #0F4C8A, #193CB8)" }}
          >
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-base shrink-0">
              {selected.initials}
            </div>
            <div>
              <p className="font-bold text-white text-base wrap-break-word">{selected.name}</p>
              <p className="text-xs text-blue-200 break-all">{selected.program}</p>
            </div>
            {selected.flagUrl && (
              <img src={selected.flagUrl} alt="" className="w-7 h-7 rounded-full object-cover border-2 border-white/30 ml-auto" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-1">University</p>
              <p className="text-sm font-medium text-[#1e293b] wrap-break-word">{selected.university}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-1">Rating</p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: selected.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FF6B35] text-[#FF6B35]" />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Quote</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <p className="text-sm text-[#334155] italic wrap-break-word">"{selected.quote}"</p>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#FF6B3520] text-[#193CB8] text-xs font-medium px-3 py-1.5 rounded-full">
            <Check className="w-3 h-3" />
            {selected.badge}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetailModal;