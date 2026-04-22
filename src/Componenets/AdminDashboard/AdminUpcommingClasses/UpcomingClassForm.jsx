import { useEffect, useState } from "react";
import { X } from "lucide-react";

const defaultForm = {
  title: "",
  date: "",
  totalSpots: "",
  spotsLeft: "",
  type: "IELTS",
  mode: "online",
  location: "",
  instructor: "",
  status: "active",
};

const UpcomingClassForm = ({ mode, selected, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!mode) return;
    if (mode === "edit" && selected) {
      setForm({
        title: selected.title ?? "",
        date: selected.date ? selected.date.split("T")[0] : "",
        totalSpots: selected.totalSpots ?? "",
        spotsLeft: selected.spotsLeft ?? "",
        type: selected.type ?? "IELTS",
        mode: selected.mode ?? "online",
        location: selected.location ?? "",
        instructor: selected.instructor ?? "",
        status: selected.status ?? "active",
      });
    } else {
      setForm(defaultForm);
    }
  }, [mode, selected]);

  useEffect(() => {
    if (!mode) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [mode]);

  if (!mode) return null;

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = () => {
    onSubmit({
      ...form,
      totalSpots: Number(form.totalSpots),
      spotsLeft: Number(form.spotsLeft),
    });
  };

  const isCreate = mode === "create";

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20 focus:border-[#0F4C8A] transition-all";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-[#0f172a] text-base">
            {isCreate ? "Add New Class" : "Edit Class"}
          </h3>
          <button
            onClick={() => !loading && onClose()}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Title</label>
            <input type="text" value={form.title} onChange={set("title")} placeholder="e.g. PTE Speaking Workshop" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Date</label>
            <input type="date" value={form.date} onChange={set("date")} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1.5">Total Spots</label>
              <input type="number" min="1" value={form.totalSpots} onChange={set("totalSpots")} placeholder="20" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1.5">Spots Left</label>
              <input type="number" min="0" value={form.spotsLeft} onChange={set("spotsLeft")} placeholder="5" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1.5">Type</label>
              <select value={form.type} onChange={set("type")} className={inputClass}>
                <option value="IELTS">IELTS</option>
                <option value="PTE">PTE</option>
                <option value="VISA">VISA</option>
                <option value="CAREER">CAREER</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1.5">Mode</label>
              <select value={form.mode} onChange={set("mode")} className={inputClass}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Location</label>
            <input type="text" value={form.location} onChange={set("location")} placeholder="e.g. Online via Zoom" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Instructor</label>
            <input type="text" value={form.instructor} onChange={set("instructor")} placeholder="e.g. Sir Ahmed" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Status</label>
            <select value={form.status} onChange={set("status")} className={inputClass}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={() => !loading && onClose()}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !form.title || !form.date || !form.totalSpots}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {loading ? "Saving..." : isCreate ? "Create" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingClassForm;