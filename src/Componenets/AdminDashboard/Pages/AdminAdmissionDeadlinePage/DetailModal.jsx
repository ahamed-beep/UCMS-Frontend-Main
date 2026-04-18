import { X } from "lucide-react";

const DetailModal = ({ record, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#0f172a] transition-colors">
        <X size={18} />
      </button>
      <h2 className="text-base font-bold text-[#0f172a] mb-5">Deadline Details</h2>
      <div className="space-y-3">
        {[
          { label: "University", value: record.university },
          { label: "Program", value: record.program },
          { label: "Intake", value: record.intake },
          { label: "Status", value: record.isActive ? "Active" : "Inactive" },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm border-b border-[#f1f5f9] pb-2">
            <span className="text-[#64748b] font-medium">{label}</span>
            <span className="text-[#0f172a] font-semibold">{value}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm border-b border-[#f1f5f9] pb-2">
          <span className="text-[#64748b] font-medium">Deadline</span>
          <span className={`font-bold ${record.deadlineColor}`}>{record.deadline}</span>
        </div>
        <div className="flex justify-between text-sm pb-2">
          <span className="text-[#64748b] font-medium">Created</span>
          <span className="text-[#0f172a]">{new Date(record.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </div>
);

export default DetailModal;