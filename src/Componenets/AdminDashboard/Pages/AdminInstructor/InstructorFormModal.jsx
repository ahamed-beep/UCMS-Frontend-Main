import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const InstructorFormModal = ({ courseId, instructor, onClose, onSaved }) => {
  const isEdit = !!instructor;
  const [form, setForm] = useState({
    name: instructor?.name ?? "",
    designation: instructor?.designation ?? "",
    bio: instructor?.bio ?? "",
    experience: instructor?.experience ?? "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isEdit) {
        await axiosInstance.patch(`/courses/${courseId}/instructor`, form);
      } else {
        await axiosInstance.post(`/courses/${courseId}/instructor`, form);
      }
      onSaved();
      onClose();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">{isEdit ? "Edit Instructor" : "Add Instructor"}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { name: "name", label: "Name", placeholder: "Instructor name" },
            { name: "designation", label: "Designation", placeholder: "e.g. Senior IELTS Trainer" },
            { name: "experience", label: "Experience", placeholder: "e.g. 8 years" },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-[#334155] mb-1">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Short bio..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3d6e] disabled:opacity-50">
              {loading ? "Saving..." : isEdit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorFormModal;