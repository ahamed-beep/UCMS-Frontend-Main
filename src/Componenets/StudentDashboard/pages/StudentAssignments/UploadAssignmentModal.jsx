import { useEffect, useRef, useState } from "react";
import { X, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

export default function UploadAssignmentModal({ assignment, lectureId, onClose, onSubmitted }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  const validateAndSet = (f) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowed.includes(f.type)) {
      setError("Only PDF, DOC, DOCX, TXT files allowed.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }
    setError("");
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSet(dropped);
  };

  const handleSubmit = async () => {
    if (!file) { setError("Please select a file."); return; }
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // ✅ correct route: /lectures/:lectureId/assignments/:assignmentId/submit
      const res = await axiosInstance.post(
        `/lectures/${lectureId}/assignments/${assignment.id}/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onSubmitted(res.data?.data ?? res.data);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message ?? "Failed to submit assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-[#101828] text-base">Submit Assignment</h3>
            <p className="text-xs text-[#6A7282] mt-0.5 truncate max-w-[280px] break-all">{assignment.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 border-[1.78px] border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-[#155DFC] bg-blue-50"
                : file
                ? "border-green-400 bg-green-50"
                : "border-[#D1D5DC] bg-[#F9FAFB] hover:border-[#155DFC] hover:bg-blue-50"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => e.target.files[0] && validateAndSet(e.target.files[0])}
            />
            {file ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500" />
                <div className="text-center">
                  <p className="font-inter font-medium text-sm text-green-700">{file.name}</p>
                  <p className="text-xs text-green-500 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="text-xs text-[#E7000B] hover:underline"
                >
                  Remove file
                </button>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-[#99A1AF]" />
                <p className="font-inter font-medium text-sm text-[#101828]">
                  Drag & drop or click to browse
                </p>
                <p className="font-inter text-xs text-[#6A7282]">PDF, DOC, DOCX, TXT — Max 10MB</p>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg px-3 py-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Due date */}
          {assignment.dueDate && (
            <p className="text-xs text-[#6A7282]">
              Due:{" "}
              <span className="font-medium text-[#101828]">
                {new Date(assignment.dueDate).toLocaleDateString("en-GB")}
              </span>
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#334155] hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !file}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#155DFC] text-sm font-medium text-white hover:bg-[#1447E6] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}