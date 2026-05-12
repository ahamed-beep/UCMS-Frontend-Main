import { useState, useEffect, useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import EnrollmentFormModal from "./EnrollmentFormModal";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/enrollments");
      setEnrollments(data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
    axiosInstance.get("/courses").then((res) => {
      setCourses(res.data.data ?? []);
    }).catch(() => {});
  }, []);

  const handleDelete = async (enrollment) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/enrollments/${enrollment.id}`);
      setEnrollments((prev) => prev.filter((e) => e.id !== enrollment.id));
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggle = async (enrollment) => {
    try {
      setToggleLoading(enrollment.id);
      await axiosInstance.patch(`/enrollments/${enrollment.id}/toggle`);
      setEnrollments((prev) =>
        prev.map((e) =>
          e.id === enrollment.id ? { ...e, isActive: !e.isActive } : e
        )
      );
    } catch {
    } finally {
      setToggleLoading(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return enrollments.filter((e) => {
      const matchesSearch =
        !q ||
        e.studentId?.firstName?.toLowerCase().includes(q) ||
        e.studentId?.lastName?.toLowerCase().includes(q) ||
        e.studentId?.emailId?.toLowerCase().includes(q);

      const matchesCourse =
        !courseFilter ||
        (e.courseId?._id || e.courseId?.id || e.courseId) === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [enrollments, search, courseFilter]);

  const columns = [
    {
      key: "student", label: "Student", width: "25%",
      render: (r) => (
        <div>
          <p className="font-medium text-[#0f172a] text-sm">
            {r.studentId?.firstName} {r.studentId?.lastName}
          </p>
          <p className="text-xs text-[#64748b]">{r.studentId?.emailId}</p>
        </div>
      ),
    },
    {
      key: "course", label: "Course", width: "25%",
      render: (r) => (
        <span className="font-medium text-[#0f172a] text-sm">
          {r.courseId?.title ?? r.courseId}
        </span>
      ),
    },
    {
      key: "status", label: "Status", width: "15%",
      render: (r) => (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          r.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {r.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "enrolled", label: "Enrolled At", width: "20%",
      render: (r) => (
        <span className="text-sm text-[#334155]">
          {new Date(r.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions", label: "Actions", width: "15%",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggle(r)}
            disabled={toggleLoading === r.id}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
              r.isActive
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                : "bg-green-50 text-green-600 hover:bg-green-100 border border-green-100"
            }`}
          >
            {toggleLoading === r.id ? "..." : r.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => setDeleteTarget(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a]">Enrollments</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Manage student course enrollments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
        >
          <Plus className="w-4 h-4" /> Enroll Student
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
          />
        </div>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] text-[#475569] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
        >
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c.id || c._id} value={c.id || c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((e) => ({ ...e, _key: e.id }))}
        loading={loading}
        emptyText="No enrollments found."
      />

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={`${deleteTarget?.studentId?.firstName} - ${deleteTarget?.courseId?.title}`}
      />

      {showForm && (
        <EnrollmentFormModal
          onClose={() => setShowForm(false)}
          onSaved={fetchEnrollments}
        />
      )}
    </div>
  );
};

export default AdminEnrollments;