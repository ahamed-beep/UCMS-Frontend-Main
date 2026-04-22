import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import QuizDetailModal from "./QuizDetailModal";
import CreateEditQuizModal from "./CreateEditQuizModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [deleteSelected, setDeleteSelected] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [viewId, setViewId] = useState(null);

  const fetchQuizzes = async (p = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/quizzes/admin", { params: { page: p, limit } });
      setQuizzes(res.data.data.data);
      setTotal(res.data.data.total);
    } catch {
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(page);
  }, [page]);

  const handleDelete = async (quiz) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/quizzes/${quiz.id}`);
      setDeleteSelected(null);
      fetchQuizzes(page);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditData(null);
    fetchQuizzes(page);
  };

  const totalPages = Math.ceil(total / limit);

  const difficultyColors = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-gray-100 text-gray-500",
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      width: "28%",
      render: (row) => (
        <span className="text-sm font-medium text-[#0f172a] line-clamp-1">{row.title}</span>
      ),
    },
    {
      key: "category",
      label: "Category",
      width: "13%",
      render: (row) => (
        <span className="text-sm text-[#64748b] capitalize">{row.category}</span>
      ),
    },
    {
      key: "difficulty",
      label: "Difficulty",
      width: "12%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${difficultyColors[row.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
          {row.difficulty}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "11%",
      render: (row) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${statusColors[row.status] ?? "bg-gray-100 text-gray-600"}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "totalQuestions",
      label: "Questions",
      width: "11%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">{row.totalQuestions}</span>
      ),
    },
    {
      key: "attempts",
      label: "Attempts",
      width: "10%",
      render: (row) => (
        <span className="text-sm text-[#64748b]">{row.attempts.toLocaleString()}</span>
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
            onClick={() => { setEditData(row); setModalOpen(true); }}
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
          <h1 className="text-xl font-bold text-[#0f172a]">Manage Quizzes</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{total} quiz{total !== 1 ? "zes" : ""} total</p>
        </div>
        <button
          onClick={() => { setEditData(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F4C8A] hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Quiz
        </button>
      </div>

      <AdminTable columns={columns} rows={quizzes} loading={loading} emptyText="No quizzes found." />

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-[#64748b]">
            Page {page} of {totalPages}
          </p>
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

      <CreateEditQuizModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSaved={handleSaved}
        editData={editData}
      />

      <QuizDetailModal
        quizId={viewId}
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

export default ManageQuizzes;