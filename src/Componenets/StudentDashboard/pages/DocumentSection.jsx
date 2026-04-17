import React from "react";
import { Upload, Eye, Download, Trash2 } from "lucide-react";

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
  Approved: "bg-green-100 text-green-600",
  "Under Review": "bg-yellow-100 text-yellow-600",
  "Resubmit Required": "bg-red-100 text-red-600",
};

const DocumnetSection = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Upload New Document</h2>
        <div className="border-2 border-dashed rounded-xl p-10 text-center">
          <Upload className="mx-auto mb-4 w-8 h-8 text-gray-400" />
          <p className="text-gray-700">Drag and drop your files here</p>
          <p className="text-sm text-gray-400 mb-4">
            or click to browse from your computer
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Choose Files
          </button>
          <p className="text-xs text-gray-400 mt-3">
            Supported formats: PDF, JPG, PNG (Max size: 10MB)
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Uploaded Documents</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
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
              <tr key={i} className="border-t">
                <td className="p-4">{doc.name}</td>
                <td className="p-4">{doc.category}</td>
                <td className="p-4">{doc.date}</td>
                <td className="p-4">{doc.size}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[doc.status]}`}
                  >
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
    </div>
  );
}

export default DocumnetSection
