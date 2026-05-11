const LectureViewModal = ({ lecture, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#0f172a] text-base wrap-break-word">Lecture Details</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
      </div>

      <div className="p-6 space-y-4">
        {[
          { label: "Title", value: lecture.title },
          { label: "Type", value: lecture.type },
          { label: "Duration", value: lecture.duration ?? "—" },
          { label: "Order", value: lecture.order },
          { label: "Created At", value: new Date(lecture.createdAt).toLocaleDateString() },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#64748b]">{label}</span>
            <span className="text-sm text-[#0f172a] wrap-break-word">{value}</span>
          </div>
        ))}

        {lecture.videoUrl && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Video</span>
            <video src={lecture.videoUrl} controls className="w-full rounded-xl max-h-48 object-cover" />
          </div>
        )}

        {lecture.docUrl && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Document</span>
            <a
              href={lecture.docUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#0F4C8A] underline"
            >
              View Document
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default LectureViewModal;