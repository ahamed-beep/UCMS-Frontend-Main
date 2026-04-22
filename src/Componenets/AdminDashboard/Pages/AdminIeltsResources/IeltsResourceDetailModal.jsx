import { X, FileText, Download, Calendar, Tag, Activity } from "lucide-react";
import { useEffect } from "react";

const IeltsResourceDetailModal = ({ selected, onClose }) => {
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

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const fields = [
    { icon: <FileText className="w-4 h-4" />, label: "Title", value: selected.title },
    { icon: <Tag className="w-4 h-4" />, label: "Tag", value: selected.tag },
    { icon: <Download className="w-4 h-4" />, label: "Downloads", value: selected.downloads?.toLocaleString() },
    {
      icon: <Activity className="w-4 h-4" />,
      label: "Status",
      value: (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            selected.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {selected.status}
        </span>
      ),
    },
    { icon: <Calendar className="w-4 h-4" />, label: "Created", value: formatDate(selected.createdAt) },
    { icon: <Calendar className="w-4 h-4" />, label: "Updated", value: formatDate(selected.updatedAt) },
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
          <h3 className="font-bold text-[#0f172a] text-base">Resource Details</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 mx-auto mb-2">
            <FileText className="w-7 h-7 text-[#FF6B35]" />
          </div>

          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#94a3b8] mt-0.5">{f.icon}</span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-xs text-[#64748b]">{f.label}</span>
                  <span className="text-sm font-medium text-[#0f172a] text-right max-w-[60%]">
                    {f.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-[#64748b] mb-1">File URL</p>
            <a
              href={selected.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#1447E6] hover:underline break-all"
            >
              {selected.fileUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IeltsResourceDetailModal;