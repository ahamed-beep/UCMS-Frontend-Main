import { useEffect, useState } from "react";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const CreateDestinationModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    partnerUniversities: "",
    programs: "",
    averageCost: "",
    intakes: "",
    highlights: [],
    universities: [],
    isActive: true,
  });
  const [flagFile, setFlagFile] = useState(null);
  const [flagPreview, setFlagPreview] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [universityInput, setUniversityInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  const resetForm = () => {
    setForm({
      name: "",
      tagline: "",
      partnerUniversities: "",
      programs: "",
      averageCost: "",
      intakes: "",
      highlights: [],
      universities: [],
      isActive: true,
    });
    setFlagFile(null);
    setFlagPreview("");
    setHighlightInput("");
    setUniversityInput("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  const handleFlagChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFlagFile(file);
    setFlagPreview(URL.createObjectURL(file));
  };

  const addHighlight = () => {
    const val = highlightInput.trim();
    if (!val) return;
    setForm((p) => ({ ...p, highlights: [...p.highlights, val] }));
    setHighlightInput("");
  };

  const removeHighlight = (i) =>
    setForm((p) => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) }));

  const addUniversity = () => {
    const val = universityInput.trim();
    if (!val) return;
    setForm((p) => ({ ...p, universities: [...p.universities, val] }));
    setUniversityInput("");
  };

  const removeUniversity = (i) =>
    setForm((p) => ({ ...p, universities: p.universities.filter((_, idx) => idx !== i) }));

  const handleSubmit = async () => {
    if (!flagFile) {
      setError("Please upload a country flag image");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (Array.isArray(val)) val.forEach((v) => fd.append(key, v));
        else fd.append(key, val);
      });
      fd.append("flag", flagFile);
      const res = await axiosInstance.post("/destinations", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreated(res.data.data);
      handleClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create destination");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#193CB8]/30 focus:border-[#193CB8] transition-all placeholder:text-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div>
            <h3 className="font-bold text-[#0f172a] text-base">Add New Destination</h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">Fill in destination details below</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-5">
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Flag Upload */}
          <div className="flex items-center gap-4">
            <label className="cursor-pointer relative w-16 h-16 rounded-full border-2 border-dashed border-gray-300 hover:border-[#193CB8] overflow-hidden flex-shrink-0 bg-gray-50 transition-colors">
              {flagPreview ? (
                <img src={flagPreview} alt="flag" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFlagChange} />
            </label>
            <div>
              <p className="text-sm font-semibold text-[#0f172a] mb-0.5">Country Flag <span className="text-red-500">*</span></p>
              <p className="text-xs text-[#94a3b8]">Click the circle to upload an image</p>
            </div>
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Country Name", key: "name", placeholder: "e.g. United Kingdom", required: true },
              { label: "Tagline", key: "tagline", placeholder: "e.g. World-class education", required: true },
              { label: "Average Cost", key: "averageCost", placeholder: "e.g. $15,000 - $30,000/yr", required: true },
              { label: "Intakes", key: "intakes", placeholder: "e.g. Jan, Sep", required: true },
              { label: "Partner Universities", key: "partnerUniversities", placeholder: "e.g. 50+", required: true },
              { label: "Programs", key: "programs", placeholder: "e.g. 200+", required: true },
            ].map(({ label, key, placeholder, required }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-[#64748b] mb-1.5 uppercase tracking-wide">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  className={inputCls}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-[#0f172a]">Active Status</p>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                {form.isActive ? "Visible to users on the website" : "Hidden from public listing"}
              </p>
            </div>
            <button
              onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
                form.isActive ? "bg-[#193CB8]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.isActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-xs font-semibold text-[#64748b] mb-2 uppercase tracking-wide">
              Highlights
            </label>
            <div className="flex gap-2 mb-2">
              <input
                className={`${inputCls} flex-1`}
                placeholder="Add a highlight..."
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addHighlight()}
              />
              <button
                onClick={addHighlight}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#193CB8] text-white hover:bg-[#0F4C8A] transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {form.highlights.map((h, i) => (
                <div key={i} className="flex items-center justify-between bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-bold text-sm">✓</span>
                    <span className="text-sm text-[#334155]">{h}</span>
                  </div>
                  <button onClick={() => removeHighlight(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Universities */}
          <div>
            <label className="block text-xs font-semibold text-[#64748b] mb-2 uppercase tracking-wide">
              Universities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                className={`${inputCls} flex-1`}
                placeholder="Add a university..."
                value={universityInput}
                onChange={(e) => setUniversityInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUniversity()}
              />
              <button
                onClick={addUniversity}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#193CB8] text-white hover:bg-[#0F4C8A] transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.universities.map((u, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium text-[#1d4ed8] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">
                  {u}
                  <button onClick={() => removeUniversity(i)} className="text-blue-300 hover:text-red-500 transition-colors ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-[#64748b] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60"
            style={{ background: "linear-gradient(to right, #0F4C8A, #193CB8)" }}
          >
            {loading ? "Creating..." : "Create Destination"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDestinationModal;