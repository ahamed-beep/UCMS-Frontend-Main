import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import InstructorFormModal from "./InstructorFormModal";

const AdminInstructor = ({ courseId }) => {
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchInstructor = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/courses/${courseId}/instructor`);
      setInstructor(data.data);
    } catch {
      setInstructor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInstructor(); }, [courseId]);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/courses/${courseId}/instructor`);
      setInstructor(null);
      setDeleteTarget(null);
    } catch {
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-break-word">Instructor</h1>
          <p className="text-sm text-[#64748b] mt-0.5 wrap-break-word">Manage instructor for this course</p>
        </div>
        {!instructor && !loading && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#0d3d6e] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Instructor
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center text-sm text-[#64748b] shadow-sm border border-gray-100">
          Loading...
        </div>
      ) : instructor ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-5">
        
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#0f172a] wrap-anywhere">{instructor.name}</h2>
                  {instructor.designation && (
                    <p className="text-sm text-[#64748b] wrap-break-word">{instructor.designation}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(instructor)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {instructor.experience && (
                <p className="text-xs text-[#64748b]">
                  <span className="font-medium text-[#334155]">Experience:</span> {instructor.experience}
                </p>
              )}
              {instructor.bio && (
                <p className="text-sm text-[#334155] leading-relaxed wrap-anywhere">{instructor.bio}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center text-sm text-[#64748b] shadow-sm border border-gray-100">
          No instructor added yet.
        </div>
      )}

      <DeleteModal
        selected={deleteTarget}
        setSelected={setDeleteTarget}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={instructor?.name}
      />

      {showForm && (
        <InstructorFormModal
          courseId={courseId}
          instructor={instructor}
          onClose={() => setShowForm(false)}
          onSaved={fetchInstructor}
        />
      )}
    </div>
  );
};

export default AdminInstructor;