import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import CreateVideoModal from "./CreateVideoModal";
import EditVideoModal from "./EditVideoModal";
import VideoDetailModal from "./VideoDetailModal";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const ManageVideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [deleteSelected, setDeleteSelected] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewId, setViewId] = useState(null);

  const fetchVideos = async (p = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/video-library/admin", { params: { page: p, limit } });
      setVideos(res.data.data.data);
      setTotal(res.data.data.total);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const handleDelete = async (video) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/video-library/${video.id}`);
      setDeleteSelected(null);
      fetchVideos(page);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-gray-100 text-gray-500",
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      width: "30%",
      render: (row) => (
        <span className="text-sm font-medium text-[#0f172a] line-clamp-1">{row.title}</span>
      ),
    },
    {
      key: "views",
      label: "Views",
      width: "20%",
      render: (row) => (
        <span className="text-sm text-[#64748b] wrap-break-word">{row.views}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "15%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColors[row.status] ?? "bg-gray-100 text-gray-600"}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      width: "20%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "15%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewId(row.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditData(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-200 text-gray-400 hover:text-amber-600 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteSelected(row)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-break-word">Video Library</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{total} video{total !== 1 ? "s" : ""} total</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      <AdminTable columns={columns} rows={videos} loading={loading} emptyText="No videos found." />

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-[#64748b]">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-[#334155] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-[#334155] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <CreateVideoModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={() => { setCreateOpen(false); fetchVideos(page); }}
      />

      <EditVideoModal
        data={editData}
        onClose={() => setEditData(null)}
        onSaved={() => { setEditData(null); fetchVideos(page); }}
      />

      <VideoDetailModal
        videoId={viewId}
        onClose={() => setViewId(null)}
      />

      <DeleteModal
        selected={deleteSelected}
        setSelected={setDeleteSelected}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteSelected?.title}
      />
    </div>
  );
};

export default ManageVideoLibrary;