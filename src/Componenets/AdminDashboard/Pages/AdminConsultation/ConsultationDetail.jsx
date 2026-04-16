const statusColors = {
  unread: "bg-yellow-100 text-yellow-700",
  read: "bg-green-100 text-green-700",
  pending: "bg-blue-100 text-blue-700",
};

const ConsultationDetailModal = ({ consultation, onClose }) => {
  if (!consultation) return null;

  const fields = [
    { label: "Full Name", value: consultation.fullName },
    { label: "Email", value: consultation.email },
    { label: "Phone", value: consultation.phone },
    { label: "Consultation Type", value: consultation.consultationType },
    { label: "Destination", value: consultation.destination || "—" },
    { label: "Qualification", value: consultation.qualification || "—" },
    { label: "Selected Date", value: consultation.selectedDate },
    { label: "Selected Time", value: consultation.selectedTime },
    { label: "Additional Info", value: consultation.additionalInfo || "—" },
    { label: "Booked At", value: new Date(consultation.createdAt).toLocaleString() },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 ">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-[#1e293b]">Consultation Details</h2>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                statusColors[consultation.status] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {consultation.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#1e293b] text-xl font-light transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-3">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex gap-3 py-1 ">
              <span className="text-xs font-medium text-[#94a3b8] w-36 shrink-0 pt-0.5">
                {label}
              </span>
              <span className="text-sm text-[#1e293b] break-words flex-1">{value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#f1f5f9]">
          <button
            onClick={onClose}
            className="w-full text-sm bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#1e293b] font-medium py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetailModal;