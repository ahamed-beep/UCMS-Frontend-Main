import axiosInstance from '../../../../Api/axiosInstance';

const DetailModal = ({ open, application, onClose }) => {
  if (!open || !application) return null;

  const fields = [
    { label: "Full Name", value: application.fullName },
    { label: "Email", value: application.email },
    { label: "Phone", value: application.phone },
    { label: "LinkedIn", value: application.linkedin ?? "—" },
    { label: "Highest Qualification", value: application.highestQualification },
    { label: "Years of Experience", value: application.yearsOfExperience },
    { label: "Institution Affiliation", value: application.institutionAffiliation },
    { label: "Current Job Position", value: application.currentJobPosition },
  ];

  const handleDownload = async () => {
    // Use application.id (backend se id aa raha hai, _id nahi)
    const applicationId = application.id;
    
    if (!applicationId) {
      console.error('No application ID found', application);
      alert('Application ID not found');
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/faculty-applications/${applicationId}/download-cv`,
        {
          responseType: 'blob',
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      let extension = 'pdf';
      if (application.cvUrl) {
        const match = application.cvUrl.match(/\.(pdf|doc|docx)$/i);
        if (match) extension = match[1];
      }
      
      link.download = `CV_${application.fullName.replace(/\s/g, '_')}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-[#0f172a]">Application Details</h3>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#475569] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.label}>
                <p className="text-xs font-medium text-[#94a3b8] mb-0.5">{f.label}</p>
                <p className="text-sm text-[#0f172a]">{f.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium text-[#94a3b8] mb-1">Previous Experience</p>
            <p className="text-sm text-[#334155] leading-relaxed">{application.previousExperience}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#94a3b8] mb-1">Cover Letter</p>
            <p className="text-sm text-[#334155] leading-relaxed">{application.coverLetter}</p>
          </div>

          {application.cvUrl && (
            <div>
              <p className="text-xs font-medium text-[#94a3b8] mb-2">CV / Resume</p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;