import { useEffect } from "react";
import { X, Clock, User, Tag, Star } from "lucide-react";

const STATUS_STYLES = {
  published: "bg-green-50 text-green-700 border border-green-200",
  draft: "bg-amber-50 text-amber-700 border border-amber-200",
  archived: "bg-gray-100 text-gray-600 border border-gray-200",
};

const Meta = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 text-sm text-[#475569]">
    <Icon className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
    <span className="text-[#94a3b8] text-xs">{label}:</span>
    <span className="text-[#334155]">{value}</span>
  </div>
);

export default function BlogDetailModal({ blog, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[#0f172a] text-base wrap-break-word">Blog Detail</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-52 object-cover rounded-xl"
          />

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h2 className="text-lg font-semibold text-[#0f172a] leading-snug wrap-anywhere">{blog.title}</h2>
            <div className="flex items-center gap-2 shrink-0">
              {blog.isFeatured && (
                <span className="flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400" /> Featured
                </span>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[blog.status] ?? STATUS_STYLES.draft}`}>
                {blog.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap wrap-break-word gap-4">
            <Meta icon={User} label="Author" value={blog.author} />
            <Meta icon={Tag} label="Category" value={blog.category} />
            <Meta icon={Clock} label="Read time" value={blog.readTime} />
          </div>

          <div>
            <p className="text-xs font-medium text-[#94a3b8] mb-1">Excerpt</p>
            <p className="text-sm text-[#475569] wrap-break-word leading-relaxed">{blog.excerpt}</p>
          </div>

          <div>
            <p className="text-xs font-medium  text-[#94a3b8] mb-1">Description</p>
            <p className="text-sm text-[#334155] wrap-break-word leading-relaxed whitespace-pre-line">{blog.description}</p>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#94a3b8]">
            <span>Created: {new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
            <span>Updated: {new Date(blog.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}