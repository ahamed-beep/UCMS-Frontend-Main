import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const EditService = ({ editData, onSuccess, onCancel, onError }) => {
  const fileRef = useRef();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  const [overview, setOverview] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [steps, setSteps] = useState([]);
  const [docs, setDocs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setPrice(String(editData.price ?? ""));
      setDesc(editData.description || "");
      setOverview(editData.overview || "");
      setHighlights(editData.highlightPoints || []);
      setSteps(editData.steps || []);
      setDocs(editData.requiredDocuments || []);
      setFaqs((editData.faqs || []).map((f) => ({ ...f })));
      setPreview(editData.iconUrl || "");
      setIconFile(null);
    }
  }, [editData]);

  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIconFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleTagKey = (e, tags, setTags) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val && !tags.includes(val)) setTags([...tags, val]);
      e.target.value = "";
    }
    if (e.key === "Backspace" && !e.target.value && tags.length)
      setTags(tags.slice(0, -1));
  };

  const updateFaq = (i, field, val) =>
    setFaqs(faqs.map((f, j) => (j === i ? { ...f, [field]: val } : f)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim() || !overview.trim())
      return onError("Please fill all required fields");

    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("price", price);
    fd.append("description", description.trim());
    fd.append("overview", overview.trim());
    fd.append("highlightPoints", JSON.stringify(highlights));
    fd.append("steps", JSON.stringify(steps));
    fd.append("requiredDocuments", JSON.stringify(docs));
    fd.append("faqs", JSON.stringify(faqs));
    if (iconFile) fd.append("icon", iconFile);

    setSaving(true);
    try {
      await axiosInstance.patch(`/service-pages/${editData._id || editData.id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess("Service updated successfully.");
    } catch (err) {
      onError(err?.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full px-3 py-2 text-sm rounded-lg border bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] border-gray-200";
  const labelCls = "block text-xs font-medium text-[#64748b] mb-1";

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-[#0A0A0A] mb-1">Edit service</h2>
      <p className="text-[14px] text-[#64748b] mb-6">Update the details of this service page.</p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-lg">

        <div>
          <label className={labelCls}>Icon / Image</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-[#f8fafc] cursor-pointer hover:border-[#0F4C8A] transition-colors"
          >
            {iconPreview ? (
              <img src={iconPreview} alt="preview" className="w-8 h-8 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
            )}
            <span className="text-sm text-[#64748b]">{iconFile ? iconFile.name : "Click to change image"}</span>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleIcon} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input className={inputCls} placeholder="e.g. Study Visa" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Price  *</label>
            <input className={inputCls} type="number" min="0" placeholder="e.g. 5000" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description *</label>
          <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Short description..." value={description} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div>
          <label className={labelCls}>Overview *</label>
          <textarea className={`${inputCls} resize-none`} rows={4} placeholder="Detailed overview..." value={overview} onChange={(e) => setOverview(e.target.value)} />
        </div>

        <div>
          <label className={labelCls}>Highlight Points</label>
          <div
            className="flex flex-wrap gap-2 min-h-[40px] px-3 py-2 rounded-lg border border-gray-200 bg-[#f8fafc] focus-within:border-[#0F4C8A] focus-within:ring-1 focus-within:ring-[#0F4C8A] cursor-text transition-colors"
            onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
          >
            {highlights.map((t, i) => (
              <span key={i} className="flex items-center gap-1 bg-[#DBEAFE] text-[#1d4ed8] text-xs px-2 py-1 rounded-md">
                {t}
                <span className="cursor-pointer opacity-60 hover:opacity-100" onClick={() => setHighlights(highlights.filter((_, j) => j !== i))}>✕</span>
              </span>
            ))}
            <input onKeyDown={(e) => handleTagKey(e, highlights, setHighlights)} placeholder={!highlights.length ? "Type & press Enter..." : ""} className="bg-transparent outline-none text-sm text-[#0A0A0A] placeholder-[#64748b] flex-1 min-w-[120px]" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Steps</label>
          <div
            className="flex flex-wrap gap-2 min-h-[40px] px-3 py-2 rounded-lg border border-gray-200 bg-[#f8fafc] focus-within:border-[#0F4C8A] focus-within:ring-1 focus-within:ring-[#0F4C8A] cursor-text transition-colors"
            onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
          >
            {steps.map((t, i) => (
              <span key={i} className="flex items-center gap-1 bg-[#DBEAFE] text-[#1d4ed8] text-xs px-2 py-1 rounded-md">
                {t}
                <span className="cursor-pointer opacity-60 hover:opacity-100" onClick={() => setSteps(steps.filter((_, j) => j !== i))}>✕</span>
              </span>
            ))}
            <input onKeyDown={(e) => handleTagKey(e, steps, setSteps)} placeholder={!steps.length ? "Type & press Enter..." : ""} className="bg-transparent outline-none text-sm text-[#0A0A0A] placeholder-[#64748b] flex-1 min-w-[120px]" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Required Documents</label>
          <div
            className="flex flex-wrap gap-2 min-h-[40px] px-3 py-2 rounded-lg border border-gray-200 bg-[#f8fafc] focus-within:border-[#0F4C8A] focus-within:ring-1 focus-within:ring-[#0F4C8A] cursor-text transition-colors"
            onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
          >
            {docs.map((t, i) => (
              <span key={i} className="flex items-center gap-1 bg-[#DBEAFE] text-[#1d4ed8] text-xs px-2 py-1 rounded-md">
                {t}
                <span className="cursor-pointer opacity-60 hover:opacity-100" onClick={() => setDocs(docs.filter((_, j) => j !== i))}>✕</span>
              </span>
            ))}
            <input onKeyDown={(e) => handleTagKey(e, docs, setDocs)} placeholder={!docs.length ? "Type & press Enter..." : ""} className="bg-transparent outline-none text-sm text-[#0A0A0A] placeholder-[#64748b] flex-1 min-w-[120px]" />
          </div>
        </div>

        <div>
          <label className={labelCls}>FAQs</label>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <input className={inputCls} placeholder="Question..." value={f.question} onChange={(e) => updateFaq(i, "question", e.target.value)} />
                <input className={inputCls} placeholder="Answer..." value={f.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} />
                <button type="button" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))} className="text-red-500 border border-red-200 rounded-lg px-2 py-2 text-xs hover:bg-red-50 transition-colors">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => setFaqs([...faqs, { question: "", answer: "" }])} className="text-[#64748b] border border-gray-200 rounded-lg px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors">+ Add FAQ</button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-[#64748b] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-[#0F4C8A] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0d3f73] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving && <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;