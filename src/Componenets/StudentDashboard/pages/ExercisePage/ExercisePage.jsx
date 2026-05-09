import { useEffect, useState } from "react";
import { ChevronLeft, Volume2, CheckCircle } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const ExercisePage = ({ courseId, exercise, onBack }) => {
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
  const fetchAttempts = async () => {
    try {
      const exerciseId = exercise.id ?? exercise._id;
      const res = await axiosInstance.get(
        `/courses/${courseId}/exercises/${exerciseId}/my-attempts`
      );
      setAttempts(res.data.data ?? []);
    } catch {}
  };
  fetchAttempts();
}, [courseId, exercise.id, exercise._id]);

const handleSubmit = async () => {
  if (loading) return;
  setLoading(true);
  try {
    const exerciseId = exercise.id ?? exercise._id;
    let body = {};
    if (exercise.type === "writing") body = { essayText: answer };
    if (exercise.type === "listening") body = { transcriptText: answer };
    if (exercise.type === "reading" || exercise.type === "speaking") body = { selectedOption };

    const res = await axiosInstance.post(
      `/courses/${courseId}/exercises/${exerciseId}/submit`,
      body
    );
    setResult(res.data.data);
    setSubmitted(true);
    setAttempts((prev) => [res.data.data, ...prev]);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  

  const canSubmit = () => {
    if (exercise.type === "writing" || exercise.type === "listening") return answer.trim().length > 0;
    return selectedOption !== "";
  };

  const typeColor = {
    writing: "bg-blue-100 text-blue-700",
    reading: "bg-green-100 text-green-700",
    listening: "bg-purple-100 text-purple-700",
    speaking: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-3xl mx-auto">

        <button onClick={onBack} className="flex items-center gap-2 text-[#0F4C8A] font-inter hover:underline mb-4">
          <ChevronLeft className="w-4 h-4" /> Back to Course
        </button>

        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 space-y-6">

          <div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${typeColor[exercise.type] ?? "bg-gray-100 text-gray-700"}`}>
              {exercise.type}
            </span>
            <h1 className="font-inter font-bold text-[20px] text-[#101828] mt-2">{exercise.title}</h1>
            <p className="font-inter font-normal text-sm text-[#4A5565] mt-1">{exercise.instructions}</p>
          </div>

          {/* Writing */}
          {exercise.type === "writing" && (
            <div>
              <label className="text-sm font-medium text-[#364153] font-inter mb-2 block">Your Essay</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={submitted}
                placeholder="Write your essay here (minimum 250 words)..."
                className="w-full border border-[#D1D5DC] rounded-xl px-4 py-3 text-sm text-[#0f172a] min-h-[200px] outline-none focus:border-[#0F4C8A] resize-none disabled:opacity-60"
              />
              <p className="text-xs text-[#6A7282] mt-1">
                Word count: {answer.trim() ? answer.trim().split(/\s+/).length : 0}
              </p>
            </div>
          )}

          {/* Listening */}
          {exercise.type === "listening" && (
            <div className="space-y-4">
              {exercise.audioUrl && (
                <div className="bg-[#F3E8FF] rounded-xl p-4 flex items-center gap-4">
                  <Volume2 className="w-6 h-6 text-purple-600 shrink-0" />
                  <audio controls src={exercise.audioUrl} className="flex-1" />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-[#364153] font-inter mb-2 block">Type what you hear</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={submitted}
                  placeholder="Type exactly what you hear..."
                  className="w-full border border-[#D1D5DC] rounded-xl px-4 py-3 text-sm text-[#0f172a] min-h-[120px] outline-none focus:border-[#0F4C8A] resize-none disabled:opacity-60"
                />
              </div>
            </div>
          )}

          {/* Reading */}
         {exercise.type === "reading" && (
  <div className="space-y-4">
    {exercise.passage && (
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
        <p className="text-sm text-[#334155] font-inter leading-relaxed">{exercise.passage}</p>
      </div>
    )}
    <div className="space-y-2">
      {exercise.options?.map((opt, idx) => {
        const label = opt.label ?? String.fromCharCode(65 + idx); // A, B, C, D
        return (
          <button
            key={label}
            disabled={submitted}
            onClick={() => setSelectedOption(label)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-inter transition-colors
              ${selectedOption === label
                ? submitted
                  ? result?.isCorrect ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
                  : "bg-[#DBEAFE] border-[#0F4C8A] text-[#0F4C8A]"
                : "bg-white border-[#E5E7EB] text-[#334155] hover:bg-gray-50"}`}>
            <span className="font-semibold mr-2">{label}.</span>{opt.text}
          </button>
        );
      })}
    </div>
  </div>
)}

          {/* Speaking */}
         {exercise.type === "speaking" && (
  <div className="space-y-2">
    {exercise.options?.map((opt, idx) => {
      const label = opt.label ?? String.fromCharCode(65 + idx);
      return (
        <button
          key={label}
          disabled={submitted}
          onClick={() => setSelectedOption(label)}
          className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-inter transition-colors
            ${selectedOption === label
              ? submitted
                ? result?.isCorrect ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"
                : "bg-[#DBEAFE] border-[#0F4C8A] text-[#0F4C8A]"
              : "bg-white border-[#E5E7EB] text-[#334155] hover:bg-gray-50"}`}>
          <span className="font-semibold mr-2">{label}.</span>{opt.text}
        </button>
      );
    })}
  </div>
)}

          {/* Result */}
          {submitted && result && (
            <div className={`rounded-xl p-4 flex items-start gap-3 ${result.isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <CheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${result.isCorrect ? "text-green-600" : "text-red-500"}`} />
              <div>
                <p className={`font-inter font-semibold text-sm ${result.isCorrect ? "text-green-700" : "text-red-600"}`}>
                  {exercise.type === "writing" || exercise.type === "listening"
                    ? "Submitted! Your response is under review."
                    : result.isCorrect ? "Correct Answer!" : "Incorrect Answer"}
                </p>
                {result.adminFeedback && (
                  <p className="text-sm text-[#334155] mt-1">{result.adminFeedback}</p>
                )}
              </div>
            </div>
          )}

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || loading}
              className="w-full py-3 bg-[#0F4C8A] text-white font-inter font-semibold rounded-xl hover:bg-[#0d3f74] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              Submit Answer
            </button>
          )}

          {submitted && (
            <button
              onClick={() => { setSubmitted(false); setAnswer(""); setSelectedOption(""); setResult(null); }}
              className="w-full py-3 border border-[#D1D5DC] text-[#334155] font-inter font-medium rounded-xl hover:bg-gray-50">
              Try Again
            </button>
          )}
        </div>

        {/* Previous Attempts */}
        {attempts.length > 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 mt-4">
            <h3 className="font-inter font-semibold text-[16px] text-[#101828] mb-4">Previous Attempts</h3>
            <div className="space-y-3">
              {attempts.map((att, i) => (
                <div key={att._id ?? i} className="bg-[#F9FAFB] rounded-xl p-3 text-sm font-inter">
                  <div className="flex justify-between items-center">
                    <span className="text-[#4A5565]">Attempt {attempts.length - i}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${att.status === "reviewed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {att.status}
                    </span>
                  </div>
                  {att.essayText && <p className="text-[#334155] mt-2 line-clamp-2">{att.essayText}</p>}
                  {att.transcriptText && <p className="text-[#334155] mt-2">{att.transcriptText}</p>}
                  {att.selectedOption && <p className="text-[#334155] mt-2">Selected: <strong>{att.selectedOption}</strong></p>}
                  {att.adminFeedback && <p className="text-green-700 mt-2">Feedback: {att.adminFeedback}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExercisePage;