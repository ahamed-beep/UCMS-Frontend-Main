import { useEffect } from "react";
import { X, Calendar, MapPin, User, Monitor, Tag, Activity, Users } from "lucide-react";

const UpcomingClassDetailModal = ({ selected, onClose }) => {
  useEffect(() => {
    if (!selected) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selected]);

  if (!selected) return null;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const statusColors = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    completed: "bg-blue-100 text-blue-700",
  };

  const fields = [
    { icon: <Calendar className="w-4 h-4" />, label: "Date", value: formatDate(selected.date) },
    { icon: <Tag className="w-4 h-4" />, label: "Type", value: selected.type },
    { icon: <Monitor className="w-4 h-4" />, label: "Mode", value: selected.mode },
    { icon: <MapPin className="w-4 h-4" />, label: "Location", value: selected.location || "—" },
    { icon: <User className="w-4 h-4" />, label: "Instructor", value: selected.instructor || "—" },
    { icon: <Users className="w-4 h-4" />, label: "Total Spots", value: selected.totalSpots },
    { icon: <Users className="w-4 h-4" />, label: "Spots Left", value: selected.spotsLeft },
    {
      icon: <Activity className="w-4 h-4" />,
      label: "Status",
      value: (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selected.status] ?? "bg-gray-100 text-gray-600"}`}>
          {selected.status}
        </span>
      ),
    },
    { icon: <Calendar className="w-4 h-4" />, label: "Created", value: formatDate(selected.createdAt) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Class Details</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mx-auto mb-2">
            <Calendar className="w-7 h-7 text-[#0F4C8A]" />
          </div>

          <p className="text-center font-semibold text-[#0f172a] text-sm wrap-break-word">{selected.title}</p>

          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#94a3b8] mt-0.5">{f.icon}</span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-xs text-[#64748b]">{f.label}</span>
                  <span className="text-sm font-medium text-[#0f172a] text-right wrap-anywhere">{f.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingClassDetailModal;