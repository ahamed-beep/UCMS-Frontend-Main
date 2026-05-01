import { useState } from "react"; 
import axiosInstance from "../../../../Api/axiosInstance";

const CourseFormModal = ({ course, onClose, onSaved }) => {
  const isEdit = !!course;
  const [form, setForm] = useState({
    title: course?.title ?? "",
    teacher: course?.teacher ?? "",
    hours: course?.hours ?? "",
    description: course?.description ?? "",
    scheduledTime: course?.scheduledTime ?? "",
    lectures: course?.lectures ?? "",
    status: course?.status ?? "not_started",
  });
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (isEdit) {
        await axiosInstance.patch(`/courses/${course.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axiosInstance.post("/courses", fd, { headers: { "Content-Type": "multipart/form-data" } });
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
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex   items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#0f172a] text-base">{isEdit ? "Edit Course" : "Add Course"}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { name: "title", label: "Title", placeholder: "Course title" },
            { name: "teacher", label: "Teacher", placeholder: "Teacher name" },
            { name: "hours", label: "Hours", placeholder: "e.g. 40" },
            { name: "scheduledTime", label: "Schedule", placeholder: "e.g. Mon-Wed 6PM" },
            { name: "lectures", label: "Total Lectures", placeholder: "e.g. 120" },
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
            <label className="block text-xs font-medium text-[#334155] mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Course description"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#334155] mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]/20">
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {/* ← thumbnail input hataya */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl bg-[#0F4C8A] text-sm font-medium text-white hover:bg-[#0d3d6e] disabled:opacity-50">
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFormModal;