import React, { useEffect, useRef, useState } from "react";
import { Eye, Download, Trash2, FileText } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";

const statusStyles = {
  Pending: {
    style: "bg-[#F3F4F6] text-[#6A7282]",
    icon: "/Images/pendingyellow.webp",
  },
  "Under Review": {
    style: "bg-[#FEF9C2] text-[#A65F00]",
    icon: "/Images/pendingyellow.webp",
  },
  Approved: {
    style: "bg-[#DCFCE7] text-[#008236]",
    icon: "/Images/checkgreen.webp",
  },
  "Resubmit Required": {
    style: "bg-[#FFE2E2] text-[#C10007]",
    icon: "/Images/rederror.webp",
  },
};

const DocumnetSection = () => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const fileInputRef = useRef(null);

  const fetchDocuments = async () => {
    try {
      const res = await axiosInstance.get("/user-documents/my-documents");
      setDocuments(res.data.data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    setUploading(true);
    try {
      await axiosInstance.post("/user-documents", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await axiosInstance.delete(`/user-documents/${id}`);
      await fetchDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = async (doc) => {
    try {
      window.open(doc.fileUrl, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US");
  };

  return (
    <div className="py-2 md:py-4 space-y-3 md:space-y-6">
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-2">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] mb-4">
          Upload Document
        </h2>

        <div
          className="flex flex-col justify-center items-center gap-2 md:gap-4 border-[1.78px] border-dashed border-[#D1D5DC] bg-[#F9FAFB] rounded-[10px] p-6 md:p-10 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <img src="/Images/download.webp" alt="download" width={48} height={48} />
          <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">
            Drag and drop your document here
          </p>
          <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
            or click to browse from your computer
          </p>

          <button
            disabled={uploading}
            className="font-inter font-medium text-sm md:text-[16px] bg-[#155DFC] text-white px-5 py-2 rounded-[10px] disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Choose Files"}
          </button>

          <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">
            Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
          </p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>
      </div>

      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <div className="p-6 border-b-[0.89px] border-[#E5E7EB]">
          <h2 className="text-lg font-semibold">Uploaded Documents</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="font-inter font-medium text-[10px] md:text-[12px] text-[#6A7282] uppercase tracking-[0.6px] bg-[#F9FAFB] text-left border-b">
              <tr>
                <th className="text-left p-2 md:p-4">Document Name</th>
                <th className="text-left p-2 md:p-4">Upload Date</th>
                <th className="text-left p-2 md:p-4">Size</th>
                <th className="text-left p-2 md:p-4">Status</th>
                <th className="text-left p-2 md:p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-[#6A7282] font-inter text-sm">
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="border-[0.89px] border-[#E5E7EB]">
                    <td className="p-2 md:p-4 flex gap-2 font-inter font-medium text-[12px] md:text-sm text-[#101828]">
                      <FileText className="text-[#99A1AF] shrink-0" size={20} />
                      <span className="truncate max-w-[200px]">{doc.name}</span>
                    </td>
                    <td className="p-2 md:p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                      {formatDate(doc.createdAt)}
                    </td>
                    <td className="p-2 md:p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                      {doc.fileSize}
                    </td>
                    <td className="p-2 md:p-4">
                      <span
                        className={`inline-flex items-center justify-center gap-1 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full font-inter font-medium whitespace-nowrap ${statusStyles[doc.status]?.style}`}
                      >
                        <img
                          src={statusStyles[doc.status]?.icon}
                          alt="icon"
                          width={16}
                          height={16}
                          className="hidden sm:inline-block"
                        />
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-2 md:p-4">
                      <div className="flex gap-3 text-gray-500">
                        <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                          <Eye className="w-4 h-4 cursor-pointer hover:text-[#0F4C8A]" />
                        </a>
                        <button onClick={() => handleDownload(doc)}>
                          <Download className="w-4 h-4 cursor-pointer hover:text-[#0F4C8A]" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          disabled={deleting === doc.id}
                        >
                          <Trash2 className={`w-4 h-4 cursor-pointer text-red-500 ${deleting === doc.id ? "opacity-50" : ""}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumnetSection;