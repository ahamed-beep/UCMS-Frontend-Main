const CourseModuleViewModal = ({ module, onClose }) => (
  <div
    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl w-full max-w-md shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#0f172a] text-base">Module Details</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500"
        >
          ✕
        </button>
      </div>

      <div className="p-6 space-y-4">
        {[
          { label: "Title", value: module.title },
          { label: "Hours", value: module.hours ? `${module.hours}h` : "—" },
          { label: "Order", value: module.order },
          { label: "Created At", value: new Date(module.createdAt).toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#64748b]">{label}</span>
            <span className="text-sm text-[#0f172a]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CourseModuleViewModal;