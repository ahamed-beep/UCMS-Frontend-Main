import { useState, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, Plus, Star, StarOff } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import BlogDetailModal from "./BlogDetailModal";
import BlogFormModal from "./BlogFormModal";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const STATUS_STYLES = {
  published: "bg-green-50 text-green-700 border border-green-200",
  draft: "bg-amber-50 text-amber-700 border border-amber-200",
  archived: "bg-gray-100 text-gray-600 border border-gray-200",
};

const StatusBadge = ({ status }) => (
  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[status] ?? STATUS_STYLES.draft}`}>
    {status}
  </span>
);

const ActionBtn = ({ onClick, title, children, className = "" }) => (
  <button
    onClick={onClick}
    title={title}
    className={`w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors ${className}`}
  >
    {children}
  </button>
);

export default function BlogsTable() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [viewTarget, setViewTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/blogs");
      setBlogs(data.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (blog) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/blogs/${blog.id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      setDeleteTarget(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleFeatured = async (blog) => {
    try {
      const { data } = await axiosInstance.patch(`/blogs/${blog.id}/featured`);
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? data.data : b)));
    } catch {}
  };

  const handleStatusChange = async (blog, status) => {
    try {
      const { data } = await axiosInstance.patch(`/blogs/${blog.id}/status`, { status });
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? data.data : b)));
    } catch {}
  };

  const handleFormSuccess = (saved, isEdit) => {
    setBlogs((prev) =>
      isEdit ? prev.map((b) => (b.id === saved.id ? saved : b)) : [saved, ...prev]
    );
    setEditTarget(null);
    setShowCreate(false);
  };

  const columns = [
  {
    key: "title",
    label: "Title",
    width: "25%",
    render: (row) => (
      <div className="flex items-center gap-2 min-w-0">
        <img src={row.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#0f172a] truncate">{row.title}</p>
          <p className="text-xs text-[#94a3b8] truncate">{row.excerpt}</p>
        </div>
      </div>
    ),
  },
  {
    key: "category",
    label: "Category",
    width: "15%",
    render: (row) => (
      <span className="text-xs text-[#475569] bg-[#f1f5f9] px-2 py-0.5 rounded-full wrap-break-word">{row.category}</span>
    ),
  },
  {
    key: "author",
    label: "Author",
    width: "10%",
    render: (row) => <span className="text-sm text-[#334155] wrap-break-word">{row.author}</span>,
  },
  {
    key: "readTime",
    label: "Read Time",
    width: "10%",
    render: (row) => <span className="text-xs text-[#64748b]">{row.readTime}</span>,
  },

  {
    key: "status",
    label: "Status",
    width: "12%",
    render: (row) => (
      <select
        value={row.status}
        onChange={(e) => handleStatusChange(row, e.target.value)}
        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-[#334155] cursor-pointer"
      >
        {["draft", "published", "archived"].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    ),
  },

  {
    key: "actions",
    label: "Actions",
    width: "10%",
    render: (row) => (
      <div className="flex items-center gap-1.5">
        <ActionBtn onClick={() => setViewTarget(row)} title="View">
          <Eye className="w-3.5 h-3.5" />
        </ActionBtn>
        <ActionBtn onClick={() => setEditTarget(row)} title="Edit">
          <Pencil className="w-3.5 h-3.5" />
        </ActionBtn>
    
        <ActionBtn
          onClick={() => setDeleteTarget(row)}
          title="Delete"
          className="hover:bg-red-50 hover:text-red-500 hover:border-red-200"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </ActionBtn>
      </div>
    ),
  },
];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#0f172a] wrap-break-word">Blogs</h1>
          <p className="text-sm text-[#64748b] mt-0.5 break-all">{blogs.length} total posts</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-[#0f172a] text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-[#1e293b] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={blogs.map((b) => ({ ...b, _key: b.id }))}
        loading={loading}
        emptyText="No blogs found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteTarget?.title}
      />

      {(showCreate || editTarget) && (
        <BlogFormModal
          blog={editTarget}
          onClose={() => { setShowCreate(false); setEditTarget(null); }}
          onSuccess={handleFormSuccess}
        />
      )}

      {viewTarget && (
        <BlogDetailModal blog={viewTarget} onClose={() => setViewTarget(null)} />
      )}
    </div>
  );
}