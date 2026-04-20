import { useEffect } from "react";
import { X, DollarSign, Calendar, MapPin } from "lucide-react";

const DestinationDetailModal = ({ selected, setSelected }) => {
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
          <h3 className="font-bold text-[#0f172a] text-base">Destination Details</h3>
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
            <img
              src={selected.flag}
              alt={selected.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-white/30"
            />
            <div>
              <p className="font-bold text-white text-base">{selected.name}</p>
              <p className="text-xs text-blue-200">{selected.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Avg Cost</span>
              </div>
              <p className="text-sm font-medium text-[#1e293b]">{selected.averageCost}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Intakes</span>
              </div>
              <p className="text-sm font-medium text-[#1e293b]">{selected.intakes}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-1">Partner Unis</p>
              <p className="text-sm font-medium text-[#1e293b]">{selected.partnerUniversities}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-1">Programs</p>
              <p className="text-sm font-medium text-[#1e293b]">{selected.programs}</p>
            </div>
          </div>

          <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Highlights</p>
          <div className="flex flex-col gap-2 mb-5">
            {selected.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-green-500 font-bold text-sm">✓</span>
                <span className="text-sm text-[#334155]">{h}</span>
              </div>
            ))}
          </div>

          <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide mb-2">Universities</p>
          <div className="flex flex-wrap gap-2">
            {selected.universities.map((u) => (
              <span
                key={u}
                className="flex items-center gap-1.5 text-xs font-medium text-[#1d4ed8] bg-blue-50 px-3 py-1.5 rounded-lg"
              >
                <MapPin className="w-3 h-3" />
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailModal;