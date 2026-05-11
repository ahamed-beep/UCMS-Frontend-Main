import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

const defaultForm = { title: "", tag: "PDF", status: "active" };

const FILE_CONFIG = {
  PDF: { accept: "application/pdf", placeholder: "Click to upload PDF" },
  DOC: { accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document", placeholder: "Click to upload DOC / DOCX" },
};

const IeltsResourceForm = ({ mode, selected, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState(defaultForm);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!mode) return;
    if (mode === "edit" && selected) {
      setForm({ title: selected.title, tag: selected.tag, status: selected.status });
    } else {
      setForm(defaultForm);
      setFile(null);
      setFileName("");
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

  useEffect(() => {
    setFile(null);
    setFileName("");
  }, [form.tag]);

  if (!mode) return null;

  const fileConfig = FILE_CONFIG[form.tag] ?? FILE_CONFIG.PDF;
  const isCreate = mode === "create";

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setFileName(f.name);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("tag", form.tag);
    formData.append("status", form.status);
    if (file) formData.append("file", file);
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">
            {isCreate ? "Add New Resource" : "Edit Resource"}
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
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Enter resource title"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Tag</label>
            <select
              value={form.tag}
              onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all"
            >
              <option value="PDF">PDF</option>
              <option value="DOC">DOC</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1.5">
              {form.tag} File{" "}
              {!isCreate && (
                <span className="text-[#94a3b8] font-normal">(leave empty to keep existing)</span>
              )}
            </label>
            <label className="flex items-center gap-3 border border-dashed border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:border-[#FF6B35] hover:bg-orange-50/30 transition-all">
              <Upload className="w-4 h-4 text-[#94a3b8] shrink-0" />
              <span className="text-sm text-[#64748b] truncate">
                {fileName || fileConfig.placeholder}
              </span>
              <input
                type="file"
                accept={fileConfig.accept}
                onChange={handleFile}
                className="hidden"
              />
            </label>
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
              disabled={loading || (!file && isCreate)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-sm font-medium text-white hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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

export default IeltsResourceForm;