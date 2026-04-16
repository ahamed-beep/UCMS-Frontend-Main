const ConfirmDeleteModal = ({ open, onConfirm, onCancel, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-base font-semibold text-[#0f172a] mb-1">Delete Application</h3>
        <p className="text-sm text-[#64748b] mb-5">
          This action cannot be undone. The applicant's CV will also be removed from storage.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-[#64748b] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;