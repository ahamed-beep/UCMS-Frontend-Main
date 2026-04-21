import React from "react";
import { Upload, Eye, Download, Trash2, FileText } from "lucide-react";

const documents = [
  {
    name: "Passport Copy.pdf",
    category: "Identity",
    date: "3/1/2026",
    size: "2.4 MB",
    status: "Approved",
  },
  {
    name: "Academic Transcript.pdf",
    category: "Academic",
    date: "3/1/2026",
    size: "1.8 MB",
    status: "Under Review",
  },
  {
    name: "IELTS Certificate.pdf",
    category: "Test Scores",
    date: "2/28/2026",
    size: "890 KB",
    status: "Approved",
  },
  {
    name: "Bank Statement.pdf",
    category: "Financial",
    date: "2/28/2026",
    size: "3.2 MB",
    status: "Resubmit Required",
  },
  {
    name: "Degree Certificate.pdf",
    category: "Academic",
    date: "2/25/2026",
    size: "1.5 MB",
    status: "Approved",
  },
  {
    name: "Letter of Recommendation.pdf",
    category: "Academic",
    date: "2/20/2026",
    size: "650 KB",
    status: "Approved",
  },
];

const statusStyles = {
  Approved: {
    style: "bg-[#DCFCE7] text-[#008236]",
    icon: "/Images/checkgreen.webp",
  },
  "Under Review": {
    style: "bg-[#FEF9C2] text-[#A65F00]",
    icon: "/Images/pendingyellow.webp",
  },
  "Resubmit Required": {
    style: "bg-[#FFE2E2] text-[#C10007]",
    icon: "/Images/rederror.webp",
  },
};

const DocumnetSection = () => {
  return (
    <div className="py-2 md:py-4 space-y-3 md:space-y-6">
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-2">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] mb-4">Upload Assignment</h2>

        <div className="flex flex-col justify-center items-center gap-2 md:gap-4 border-[1.78px] border-dashed border-[#D1D5DC] bg-[#F9FAFB] rounded-[10px] p-6 md:p-10 text-center">
          <img src="/Images/download.webp" alt="download" width={48} height={48} />
          <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">
            Drag and drop your assignment here
          </p>
          <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
            or click to browse from your computer
          </p>

          <button className="font-inter font-medium text-sm md:text-[16px] bg-[#155DFC] text-white px-5 py-2 rounded-[10px]">
            Choose Files
          </button>

          <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">
            Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <div className="p-6 border-b-[0.89px] border-[#E5E7EB]">
          <h2 className="text-lg font-semibold">Uploaded Documents</h2>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="font-inter font-medium text-[10px] md:text-[12px] text-[#6A7282] uppercase tracking-[0.6px] bg-[#F9FAFB] text-left border-b">
              <tr>
                <th className="text-left p-4">Document Name</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Upload Date</th>
                <th className="text-left p-4">Size</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc, i) => (
                <tr key={i} className="border-[0.89px] border-[#E5E7EB]">
                  <td className="p-4 flex gap-2 font-inter font-medium text-[12px] md:text-sm text-[#101828]"><FileText className="text-[#99A1AF]" size={20} />{doc.name}</td>
                  <td className="p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{doc.category}</td>
                  <td className="p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{doc.date}</td>
                  <td className="p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{doc.size}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full font-inter text-[12px] md:text-sm font-medium ${statusStyles[doc.status]?.style}`}
                    >
                      <img src={statusStyles[doc.status]?.icon} alt="icon" width={16} height={16} className="inline-block mr-1" />
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3 text-gray-500">
                    <Eye className="w-4 h-4 cursor-pointer" />
                    <Download className="w-4 h-4 cursor-pointer" />
                    <Trash2 className="w-4 h-4 cursor-pointer text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden p-4 space-y-4">
          {documents.map((doc, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2">

              <div className="flex items-center gap-2 font-medium">
                <FileText className="text-[#99A1AF]" size={18} />
                <span>{doc.name}</span>
              </div>

              <div className="text-sm text-gray-600">
                <p><span className="font-medium">Category:</span> {doc.category}</p>
                <p><span className="font-medium">Date:</span> {doc.date}</p>
                <p><span className="font-medium">Size:</span> {doc.size}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className={`px-3 py-1 rounded-full flex items-center gap-2 text-sm ${statusStyles[doc.status]?.style}`}>
                  {doc.status}
                </span>

                <div className="flex gap-3">
                  <Eye className="w-4 h-4 cursor-pointer" />
                  <Download className="w-4 h-4 cursor-pointer" />
                  <Trash2 className="w-4 h-4 cursor-pointer text-red-500" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumnetSection
