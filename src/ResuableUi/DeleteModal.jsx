import { useEffect } from "react";
import { X, Trash2 } from "lucide-react";

const DeleteModal = ({ selected, setSelected, onConfirm, loading, itemName }) => {
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
      onClick={() => !loading && setSelected(null)}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">Delete Confirmation</h3>
          <button
            onClick={() => !loading && setSelected(null)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>

          <p className="text-center text-sm text-[#334155] mb-1">
            Are you sure you want to delete
          </p>
          <p className="text-center font-semibold text-[#0f172a] text-sm mb-5">
            "{itemName}"?
          </p>
          <p className="text-center text-xs text-[#94a3b8] mb-6">
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => !loading && setSelected(null)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selected)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;