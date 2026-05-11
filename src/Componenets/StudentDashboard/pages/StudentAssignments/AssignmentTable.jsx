import { FileText, Calendar, Clock, CheckCircle, Eye } from "lucide-react";

const statusStyles = {
  pending: "bg-orange-100 text-orange-600",
  submitted: "bg-blue-100 text-blue-600",
  graded: "bg-green-100 text-green-600",
};

const isOverdue = (date, status) => {
  if (!date || status !== "pending") return false;
  return new Date(date) < new Date();
};

const StudentAssignmentTable = ({ assignments, onUpload, onView, onViewFeedback }) => {
  return (
    <div className="py-6 bg-white rounded-xl shadow">
      <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] ps-2 md:ps-5">
        All Assignments
      </h2>

      <div className="overflow-x-auto mt-3 md:mt-6">
        <table className="w-full border-[0.89px] border-[#E5E7EB]">
          <thead className="font-inter font-medium text-[10px] md:text-[12px] text-[#6A7282] uppercase tracking-[0.6px] bg-[#F9FAFB] text-left border-b">
            <tr>
              <th className="py-3 px-4 md:px-6">Assignment</th>
              <th className="py-3 px-4 md:px-6">Due Date</th>
              <th className="py-3 px-4 md:px-6">Status</th>
              <th className="py-3 px-4 md:px-6">Score</th>
              <th className="py-3 px-4 md:px-6">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-sm text-[#6A7282] py-10">
                  No assignments yet.
                </td>
              </tr>
            ) : (
              assignments.map((a) => {
                const overdue = isOverdue(a.dueDate, a.status);
                return (
                  <tr key={a.id} className="border-[0.89px] border-[#E5E7EB]">
                    <td className="py-4 px-4 md:px-6">
                      <div className="flex items-center gap-2">
                        <FileText className="text-[#99A1AF] shrink-0" size={20} />
                        <div>
                          <p className="font-inter font-semibold text-sm text-[#101828] break-all">
                            {a.title}
                          </p>
                          {a.submittedAt && (
                            <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282] break-all">
                              Submitted: {new Date(a.submittedAt).toLocaleDateString("en-GB")}
                            </p>
                          )}
                          {a.description && (
                            <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#99A1AF] mt-0.5 max-w-[240px] truncate">
                              {a.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 md:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-[#99A1AF] shrink-0" />
                        <span className={`font-inter text-[12px] md:text-sm ${overdue ? "font-medium text-[#E7000B]" : "text-[#4A5565]"}`}>
                          {a.dueDate ? new Date(a.dueDate).toLocaleDateString("en-GB") : "—"}
                          {overdue && " (Overdue)"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 md:px-6">
                      <span className={`px-2 py-1 rounded-full font-medium font-inter text-[12px] md:text-sm flex items-center gap-1 w-fit whitespace-nowrap capitalize ${statusStyles[a.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {a.status === "pending" && <Clock size={14} />}
                        {(a.status === "submitted" || a.status === "graded") && <CheckCircle size={14} />}
                        {a.status}
                      </span>
                    </td>

                    <td className="text-center font-inter text-[12px] md:text-sm text-[#4A5565] px-4 md:px-6">
                      {a.grade != null ? `${a.grade}%` : "—"}
                    </td>

                    <td className="px-4 md:px-6 whitespace-nowrap">
                      {a.status === "pending" && (
                        <button
                          onClick={() => onUpload(a)}
                          className="font-medium font-inter text-[12px] md:text-sm text-[#155DFC] hover:underline"
                        >
                          Upload
                        </button>
                      )}
                      {a.status === "submitted" && (
                        <a
                          href={a.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium font-inter text-[12px] md:text-sm text-[#4A5565] hover:underline"
                        >
                          <Eye size={14} /> View
                        </a>
                      )}
                      {a.status === "graded" && (
                        <button
                          onClick={() => onViewFeedback(a)}
                          className="font-medium font-inter text-[12px] md:text-sm text-[#00A63E] hover:underline"
                        >
                          View Feedback
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAssignmentTable;