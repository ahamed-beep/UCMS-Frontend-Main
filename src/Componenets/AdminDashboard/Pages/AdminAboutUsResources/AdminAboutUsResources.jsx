import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Download, X, Upload } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const TAGS = ["PDF", "DOC"];
const STATUSES = ["active", "inactive"];

const emptyForm = { title: "", subtitle: "", tag: "PDF", status: "active" };

export default function AdminAboutUsResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (statusFilter) params.status = statusFilter;
      if (tagFilter) params.tag = tagFilter;

      const res = await axiosInstance.get("/about-us-resources", { params });
      setResources(res.data?.data?.data || []);
      setTotal(res.data?.data?.total || 0);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, tagFilter]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (resource) => {
    setEditingId(resource.id);
    setForm({
      title: resource.title || "",
      subtitle: resource.subtitle || "",
      tag: resource.tag || "PDF",
      status: resource.status || "active",
    });
    setFile(null);
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim()) {
      setFormError("Title is required");
      return;
    }
    if (!editingId && !file) {
      setFormError("File is required");
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      if (form.subtitle) fd.append("subtitle", form.subtitle);
      fd.append("tag", form.tag);
      fd.append("status", form.status);
      if (file) fd.append("file", file);

      if (editingId) {
        await axiosInstance.patch(`/about-us-resources/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/about-us-resources", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setModalOpen(false);
      fetchResources();
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "Failed to save resource. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (resource) => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/about-us-resources/${resource.id}`);
      setDeleteTarget(null);
      fetchResources();
    } catch (err) {
      console.error("Failed to delete resource:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleDownload = async (resource) => {
    try {
      await axiosInstance.post(`/about-us-resources/${resource.id}/download`);
    } catch (err) {
      console.error("Failed to track download:", err);
    } finally {
      window.open(resource.fileUrl, "_blank");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const columns = [
    { key: "title", label: "Title", render: (r) => <span className="font-medium text-[#0f172a]">{r.title}</span> },
    { key: "subtitle", label: "Subtitle", render: (r) => r.subtitle || "—" },
    {
      key: "tag",
      label: "Tag",
      render: (r) => (
        <span className="px-2 py-1 rounded-md bg-[#f1f5f9] text-xs font-medium text-[#334155]">
          {r.tag}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            r.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {r.status}
        </span>
      ),
    },
    { key: "downloads", label: "Downloads", render: (r) => r.downloads },
    {
      key: "actions",
      label: "Actions",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F4C8A]"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => openEditModal(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#334155]"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 text-red-500"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-lg font-bold text-[#0f172a]">About Us Resources</h2>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-white text-sm font-medium hover:bg-[#0d3f72] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-[#334155] bg-white"
        >
          <option value="">All Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={tagFilter}
          onChange={(e) => {
            setPage(1);
            setTagFilter(e.target.value);
          }}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-[#334155] bg-white"
        >
          <option value="">All Tags</option>
          {TAGS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <AdminTable columns={columns} rows={resources} loading={loading} emptyText="No resources found." />

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-[#64748b]">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-[#0f172a] text-base">
                {editingId ? "Edit Resource" : "Add Resource"}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
                  placeholder="Resource title"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-1">Subtitle</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
                  placeholder="Optional subtitle"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1">Tag</label>
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white"
                  >
                    {TAGS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#64748b] mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-1">
                  File {editingId ? "(leave empty to keep current)" : "*"}
                </label>
                <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm text-[#64748b] cursor-pointer hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  {file ? file.name : "Choose PDF or DOC file"}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3f72] disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleting}
        itemName={deleteTarget?.title}
      />
    </div>
  );
}