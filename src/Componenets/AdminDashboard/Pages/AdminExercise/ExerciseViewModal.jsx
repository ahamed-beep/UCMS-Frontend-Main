import { X } from "lucide-react";

const typeStyles = {
  writing: "bg-blue-100 text-blue-700",
  reading: "bg-green-100 text-green-700",
  listening: "bg-purple-100 text-purple-700",
  speaking: "bg-orange-100 text-orange-700",
};

const ExerciseViewModal = ({ exercise, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <div
      className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#0f172a] text-base">Exercise Details</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-4">

        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${typeStyles[exercise.type] ?? "bg-gray-100 text-gray-600"}`}>
            {exercise.type}
          </span>
        </div>

        {[
          { label: "Title", value: exercise.title },
          { label: "Instructions", value: exercise.instructions ?? "—" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#64748b]">{label}</span>
            <span className="text-sm text-[#0f172a] wrap-break-word">{value}</span>
          </div>
        ))}

        {exercise.passage && (
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#64748b]">Passage</span>
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
              <p className="text-sm text-[#334155] leading-relaxed">{exercise.passage}</p>
            </div>
          </div>
        )}

        {exercise.audioUrl && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#64748b]">Audio</span>
            <audio controls src={exercise.audioUrl} className="w-full" />
          </div>
        )}

        {exercise.options?.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-[#64748b]">Options</span>
            <div className="space-y-1">
              {exercise.options.map((opt, idx) => {
                const label = opt.label ?? String.fromCharCode(65 + idx);
                const isCorrect = exercise.correctOption === label;
                return (
                  <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${isCorrect ? "bg-green-50 border border-green-200 text-green-700" : "bg-[#F9FAFB] text-[#334155]"}`}>
                    <span className="font-semibold">{label}.</span>
                    <span>{opt.text}</span>
                    {isCorrect && <span className="ml-auto text-xs font-medium text-green-600">✓ Correct</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-[#64748b]">Created At</span>
          <span className="text-sm text-[#0f172a]">{new Date(exercise.createdAt).toLocaleDateString("en-US")}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ExerciseViewModal;