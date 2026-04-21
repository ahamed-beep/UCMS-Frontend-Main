import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, Star } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import TestimonialEditModal from "./TestimonialEditModal";
import TestimonialDetailModal from "./TestimonialDetailModal";
import TestimonialCreateModal from "./TestimonialCreateModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [detailSelected, setDetailSelected] = useState(null);
  const [editSelected, setEditSelected] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/testimonials");
      setTestimonials(res.data.data);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (item) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/testimonials/${item.id}`);
      setDeleteSelected(null);
      fetchTestimonials();
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "student",
      label: "Student",
      width: "25%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: "linear-gradient(to right, #155DFC, #193CB8)" }}
          >
            {row.initials}
          </div>
          <div>
            <p className="text-sm font-medium text-[#0f172a]">{row.name}</p>
            <p className="text-xs text-[#64748b]">{row.program}</p>
          </div>
        </div>
      ),
    },
    {
      key: "university",
      label: "University",
      width: "25%",
      render: (row) => (
        <p className="text-sm text-[#334155] truncate">{row.university}</p>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      width: "15%",
      render: (row) => (
        <div className="flex gap-0.5">
          {Array.from({ length: row.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#FF6B35] text-[#FF6B35]" />
          ))}
        </div>
      ),
    },
    {
      key: "badge",
      label: "Badge",
      width: "20%",
      render: (row) => (
        <span className="text-xs font-medium text-[#193CB8] bg-blue-50 px-2.5 py-1 rounded-full">
          {row.badge}
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
      <div className="flex md:flex-row flex-col md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Student Testimonials</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Student reviews manage karein</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex md:mt-0 mt-3 items-center gap-2 px-4 py-2.5 bg-[#155DFC] text-white text-sm font-medium rounded-xl hover:bg-[#1249cc] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={testimonials}
        loading={loading}
        emptyText="Koi testimonial nahi mila."
      />

      <TestimonialCreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={fetchTestimonials}
      />

      <TestimonialDetailModal
        selected={detailSelected}
        setSelected={setDetailSelected}
      />

      <TestimonialEditModal
        selected={editSelected}
        setSelected={setEditSelected}
        onUpdated={fetchTestimonials}
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

export default AdminTestimonials;