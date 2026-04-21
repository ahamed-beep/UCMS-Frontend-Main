import { useEffect, useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const Field = ({ label, error, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-[#475569]">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const inputClass =
  "w-full text-sm border border-gray-200 rounded-xl px-3 py-2 text-[#0f172a] outline-none focus:border-[#94a3b8] transition-colors bg-white";

export default function BlogFormModal({ blog, onClose, onSuccess }) {
  const isEdit = !!blog;
  const fileRef = useRef(null);

const [form, setForm] = useState({
  title: blog?.title ?? "",
  excerpt: blog?.excerpt ?? "",
  description: blog?.description ?? "",
  category: blog?.category ?? "IELTS Tips",
  readTime: blog?.readTime ?? "",
  author: blog?.author ?? "",
  isFeatured: blog?.isFeatured ?? false,
  status: blog?.status ?? "draft",
});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(blog?.imageUrl ?? null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && !loading && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [loading]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.excerpt.trim()) e.excerpt = "Required";
    if (form.description.trim().length < 50) e.description = "Min 50 characters";
    if (!form.readTime.trim()) e.readTime = "Required";
    if (!form.author.trim()) e.author = "Required";
    if (!isEdit && !image) e.image = "Image required";
    return e;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append("image", image);

      const { data } = isEdit
        ? await axiosInstance.patch(`/blogs/${blog.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } })
        : await axiosInstance.post("/blogs", fd, { headers: { "Content-Type": "multipart/form-data" } });

      onSuccess(data.data, isEdit);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message ?? "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
      onClick={() => !loading && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[#0f172a] text-base">{isEdit ? "Edit Blog" : "Create Blog"}</h3>
          <button
            onClick={() => !loading && onClose()}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <Field label="Title" error={errors.title}>
            <input className={inputClass} value={form.title} onChange={set("title")} placeholder="Blog title" maxLength={200} />
          </Field>

          <Field label="Excerpt" error={errors.excerpt}>
            <textarea className={`${inputClass} resize-none`} rows={2} value={form.excerpt} onChange={set("excerpt")} placeholder="Short summary" maxLength={500} />
          </Field>

          <Field label="Description" error={errors.description}>
            <textarea className={`${inputClass} resize-none`} rows={5} value={form.description} onChange={set("description")} placeholder="Full content (min 50 chars)" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
          <Field label="Category" error={errors.category}>
  <select className={inputClass} value={form.category} onChange={set("category")}>
    {["IELTS Tips", "PTE Tips", "Visa Guidelines", "Study Abroad Tips", "Career Advice", "Scholarships"].map((c) => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>
</Field>

       <Field label="Status" error={errors.status}>
  <select className={inputClass} value={form.status} onChange={set("status")}>
    {["draft", "published", "archived"].map((s) => (
      <option key={s} value={s}>{s}</option>
    ))}
  </select>
</Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Read Time" error={errors.readTime}>
              <input className={inputClass} value={form.readTime} onChange={set("readTime")} placeholder="e.g. 5 min" />
            </Field>

            <Field label="Author" error={errors.author}>
              <input className={inputClass} value={form.author} onChange={set("author")} placeholder="Author name" />
            </Field>
          </div>

          <Field label="Cover Image" error={errors.image}>
            <div
              onClick={() => fileRef.current.click()}
              className="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gray-400 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full max-h-40 object-cover rounded-lg" />
              ) : (
                <>
                  <Upload className="w-5 h-5 text-[#94a3b8]" />
                  <p className="text-xs text-[#64748b]">Click to upload image</p>
                </>
              )}
              {preview && <p className="text-xs text-[#94a3b8]">Click to change image</p>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </Field>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={set("isFeatured")}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-[#334155]">Mark as featured</span>
          </label>

          {errors.submit && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{errors.submit}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => !loading && onClose()}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0f172a] text-sm font-medium text-white hover:bg-[#1e293b] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}