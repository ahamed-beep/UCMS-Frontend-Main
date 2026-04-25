import { FileText, Calendar, Clock, CheckCircle } from "lucide-react";

const Table = () => {
  const assignments = [
    {
      id: 1,
      title: "IELTS Writing Task 2 - Essay Submission",
      course: "IELTS Preparation",
      dueDate: "3/10/2026",
      status: "Pending",
      submittedDate: null,
      score: null,
    },
    {
      id: 2,
      title: "PTE Speaking Response Assignment",
      course: "PTE Writing Masterclass",
      dueDate: "3/12/2026",
      status: "Pending",
      submittedDate: null,
      score: null,
    },
    {
      id: 3,
      title: "Reading Comprehension Analysis",
      course: "IELTS Preparation",
      dueDate: "3/5/2026",
      status: "Graded",
      submittedDate: "3/4/2026",
      score: "85%",
    },
    {
      id: 4,
      title: "Vocabulary Building Exercise Set 3",
      course: "English Communication",
      dueDate: "3/1/2026",
      status: "Submitted",
      submittedDate: "2/28/2026",
      score: null,
    },
  ];

  const isOverdue = (date, status) => {
    const today = new Date();
    const d = new Date(date);
    return d < today && status === "Pending";
  };

  const statusStyles = {
    Pending: "bg-orange-100 text-orange-600",
    Submitted: "bg-blue-100 text-blue-600",
    Graded: "bg-green-100 text-green-600",
  };

  return (
    <div className="py-6 bg-white rounded-xl shadow">
      <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] ps-2 md:ps-5">All Assignments</h2>
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-[0.89px] mt-3 md:mt-6  border-[#E5E7EB] ">
        <thead className="font-inter font-medium text-[10px] md:text-[12px] text-[#6A7282] uppercase tracking-[0.6px] bg-[#F9FAFB] text-left border-b ">
          <tr>
            <th className="py-3 px-6">ASSIGNMENT</th>
            <th className="py-3 px-6">COURSE</th>
            <th className="py-3 px-6">DUE DATE</th>
            <th className="py-3 px-6">STATUS</th>
            <th className="py-3 px-6">SCORE</th>
            <th className="py-3 px-6">ACTIONS</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {assignments.map((a) => {
            const overdue = isOverdue(a.dueDate, a.status);

            return (
              <tr key={a.id} className="border-[0.89px] border-[#E5E7EB]">
                {/* Assignment */}
                <td className="py-4 px-2">
                  <div className="flex jusitify-center items-center gap-2">
                    <FileText className="text-[#99A1AF]" size={20} />
                    <div>
                      <p className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">{a.title}</p>

                      {a.submittedDate && (
                        <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">
                          Submitted: {a.submittedDate}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Course */}
                <td className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{a.course}</td>

                {/* Due Date */}
                <td>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-[text-[#99A1AF]]" />
                    <span
                      className={`${overdue ? "font-medium font-inter text-[12px] md:text-sm text-[#E7000B]" : ""
                        }`}
                    >
                      {a.dueDate}
                      {overdue && " Overdue"}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-2 py-1 rounded-full font-medium font-inter text-[12px] md:text-sm flex items-center gap-1 w-fit ${statusStyles[a.status]}`}
                  >
                    {a.status === "Pending" && <Clock size={16} />}
                    {a.status === "Submitted" && <CheckCircle size={16} />}
                    {a.status === "Graded" && <CheckCircle size={16} />}
                    {a.status}
                  </span>
                </td>

                {/* Score */}
                <td className="text-center">{a.score || "-"}</td>

                {/* Actions */}
                <td>
                  {a.status === "Pending" && (
                    <button className="font-medium font-inter text-[12px] md:text-sm text-[#155DFC]">Upload</button>
                  )}

                  {a.status === "Submitted" && (
                    <button className="font-medium font-inter text-[12px] md:text-sm text-[#4A5565]">View</button>
                  )}

                  {a.status === "Graded" && (
                    <button className="font-medium font-inter text-[12px] md:text-sm text-[#00A63E]">
                      View Feedback
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div className="lg:hidden mt-4 space-y-4 px-2">
        {assignments.map((a) => {
          const overdue = isOverdue(a.dueDate, a.status);

          return (
            <div
              key={a.id}
              className="border rounded-lg p-4 shadow-sm space-y-2"
            >
              {/* Title */}
              <div className="flex items-center gap-2">
                <FileText className="text-[#99A1AF]" size={18} />
                <p className="font-semibold text-[14px] text-[#101828]">
                  {a.title}
                </p>
              </div>

              {/* Course */}
              <p className="text-[12px] text-[#6A7282]">
                <span className="font-medium">Course:</span> {a.course}
              </p>

              {/* Due Date */}
              <p
                className={`text-[12px] flex items-center gap-1 ${overdue ? "text-red-500 font-medium" : "text-[#6A7282]"
                  }`}
              >
                <Calendar size={14} />
                {a.dueDate} {overdue && "Overdue"}
              </p>

              {/* Status */}
              <span
                className={`px-2 py-1 rounded-full text-[12px] flex items-center gap-1 w-fit ${statusStyles[a.status]}`}
              >
                {a.status === "Pending" && <Clock size={14} />}
                <CheckCircle size={14} />
                {a.status}
              </span>

              {/* Score */}
              <p className="text-[12px] text-[#6A7282]">
                <span className="font-medium">Score:</span> {a.score || "-"}
              </p>

              {/* Actions */}
              <div>
                {a.status === "Pending" && (
                  <button className="text-blue-600 text-sm">Upload</button>
                )}
                {a.status === "Submitted" && (
                  <button className="text-gray-600 text-sm">View</button>
                )}
                {a.status === "Graded" && (
                  <button className="text-green-600 text-sm">
                    View Feedback
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table