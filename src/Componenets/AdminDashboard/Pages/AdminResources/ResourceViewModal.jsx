const ResourceViewModal = ({ resource, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#0f172a] text-base">Resource Details</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
      </div>

      <div className="p-6 space-y-4">
        {[
          { label: "Name", value: resource.name },
          { label: "Meta", value: resource.meta ?? "—" },
          { label: "Type", value: resource.type },
          { label: "Created At", value: new Date(resource.createdAt).toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#64748b]">{label}</span>
            <span className="text-sm text-[#0f172a]">{value}</span>
          </div>
        ))}

        {resource.url && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">File</span>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#0F4C8A] underline"
            >
              View File
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ResourceViewModal;