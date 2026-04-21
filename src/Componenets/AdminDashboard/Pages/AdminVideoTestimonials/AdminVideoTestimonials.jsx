import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, Play } from "lucide-react";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import VideoTestimonialEditModal from "./VideoTestimonialEditModal";
import VideoTestimonialDetailModal from "./VideoTestimonialDetailModal";
import VideoTestimonialCreateModal from "./VideoTestimonialCreateModal";
import AdminTable from "../../../../ResuableUi/AdminTable";
import axiosInstance from "../../../../Api/axiosInstance";

const AdminVideoTestimonials = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [detailSelected, setDetailSelected] = useState(null);
  const [editSelected, setEditSelected] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/video-testimonials");
      setVideos(res.data.data);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (item) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/video-testimonials/${item.id}`);
      setDeleteSelected(null);
      fetchVideos();
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "preview",
      label: "Preview",
      width: "12%",
      render: (row) => (
        <div
          className="w-16 h-10 bg-[#1E2939] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#2d3f55] transition-colors"
          onClick={() => setDetailSelected(row)}
        >
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      width: "28%",
      render: (row) => (
        <p className="text-sm font-medium text-[#0f172a]">{row.name}</p>
      ),
    },
    {
      key: "university",
      label: "University",
      width: "35%",
      render: (row) => (
        <p className="text-sm text-[#334155] truncate">{row.university}</p>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "25%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDetailSelected(row)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setEditSelected(row)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-[#64748b] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteSelected(row)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Video Testimonials</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Student video reviews manage karein</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#155DFC] text-white text-sm font-medium rounded-xl hover:bg-[#1249cc] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={videos}
        loading={loading}
        emptyText="Koi video testimonial nahi mila."
      />

      <VideoTestimonialCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={fetchVideos}
      />

      <VideoTestimonialDetailModal
        selected={detailSelected}
        setSelected={setDetailSelected}
      />

      <VideoTestimonialEditModal
        selected={editSelected}
        setSelected={setEditSelected}
        onUpdated={fetchVideos}
      />

      <DeleteModal
        selected={deleteSelected}
        setSelected={setDeleteSelected}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteSelected?.name}
      />
    </div>
  );
};

export default AdminVideoTestimonials;