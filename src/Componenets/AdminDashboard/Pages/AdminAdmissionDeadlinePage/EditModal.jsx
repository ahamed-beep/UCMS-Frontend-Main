import { useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const COLORS = [
  { label: "Red", value: "text-red-500" },
  { label: "Orange", value: "text-orange-500" },
  { label: "Yellow", value: "text-yellow-500" },
  { label: "Green", value: "text-green-500" },
  { label: "Blue", value: "text-blue-500" },
];

const EditModal = ({ record, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    university: record.university,
    program: record.program,
    deadline: record.deadline,
    deadlineColor: record.deadlineColor,
    intake: record.intake,
    isActive: record.isActive,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      await axiosInstance.patch(`/admission-deadlines/${record.id}`, form);
      onUpdated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#0f172a] transition-colors">
          <X size={18} />
        </button>
        <h2 className="text-base font-bold text-[#0f172a] mb-5">Edit Deadline</h2>

        <div className="space-y-3">
          {[
            { name: "university", label: "University" },
            { name: "program", label: "Program" },
            { name: "deadline", label: "Deadline" },
            { name: "intake", label: "Intake" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="text-xs text-[#64748b] font-medium mb-1 block">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#193CB8]/20 focus:border-[#193CB8]"
              />
            </div>
          ))}

          <div>
            <label className="text-xs text-[#64748b] font-medium mb-1 block">Deadline Color</label>
            <select
              name="deadlineColor"
              value={form.deadlineColor}
              onChange={handleChange}
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#193CB8]/20 focus:border-[#193CB8]"
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="accent-[#193CB8]"
            />
            <label htmlFor="isActive" className="text-sm text-[#374151]">Active</label>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-[#e2e8f0] text-sm text-[#64748b] hover:bg-[#f8fafc] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 px-4 py-2 rounded-lg bg-[#193CB8] text-white text-sm font-medium hover:bg-[#153290] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;