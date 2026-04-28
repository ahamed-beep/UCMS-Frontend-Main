const CourseViewModal = ({ course, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#0f172a] text-base">Course Details</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">✕</button>
      </div>
      <div className="p-6 space-y-4">
        {course.thumbnailUrl && (
          <img src={course.thumbnailUrl} alt={course.title} className="w-full h-48 object-cover rounded-xl" />
        )}
        {[
          { label: "Title", value: course.title },
          { label: "Teacher", value: course.teacher },
          { label: "Hours", value: `${course.hours}h` },
          { label: "Schedule", value: course.scheduledTime ?? "TBD" },
          { label: "Total Lectures", value: course.lectures },
          { label: "Status", value: course.status },
          { label: "Description", value: course.description },
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

export default CourseViewModal;