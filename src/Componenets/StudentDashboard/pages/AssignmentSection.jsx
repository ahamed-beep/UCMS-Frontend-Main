import React from "react";

const assignments = [
  {
    title: "IELTS Writing Task 2 - Essay Submission",
    course: "IELTS Preparation",
    date: "3/10/2026",
    status: "Pending",
    score: "-",
  },
  {
    title: "PTE Speaking Response Assignment",
    course: "PTE Writing Masterclass",
    date: "3/12/2026",
    status: "Pending",
    score: "-",
  },
  {
    title: "Reading Comprehension Analysis",
    course: "IELTS Preparation",
    date: "3/5/2026",
    status: "Graded",
    score: "85%",
  },
  {
    title: "Vocabulary Building Exercise Set 3",
    course: "English Communication",
    date: "3/1/2026",
    status: "Submitted",
    score: "-",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-orange-100 text-orange-600";
    case "Submitted":
      return "bg-blue-100 text-blue-600";
    case "Graded":
      return "bg-green-100 text-green-600";
    default:
      return "";
  }
};

const AssignmentSection = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Upload Assignment</h2>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
          <p className="text-gray-600 mb-2">
            Drag and drop your assignment here
          </p>
          <p className="text-sm text-gray-400 mb-4">
            or click to browse from your computer
          </p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Choose Files
          </button>

          <p className="text-xs text-gray-400 mt-3">
            Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
          </p>
        </div>

        <input
          type="text"
          placeholder="Select Assignment"
          className="w-full border rounded-lg mt-4 p-2"
        />

        <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg">
          Submit Assignment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">All Assignments</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Assignment</th>
                <th className="text-left py-2">Course</th>
                <th className="text-left py-2">Due Date</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Score</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">{item.title}</td>
                  <td>{item.course}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.score}</td>
                  <td className="text-blue-600 cursor-pointer">
                    {item.status === "Graded"
                      ? "View Feedback"
                      : item.status === "Submitted"
                      ? "View"
                      : "Upload"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-orange-600 text-sm">Pending</p>
            <h2 className="text-2xl font-bold">2</h2>
          </div>
          <span className="text-orange-500 text-2xl">⏰</span>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-blue-600 text-sm">Submitted</p>
            <h2 className="text-2xl font-bold">1</h2>
          </div>
          <span className="text-blue-500 text-2xl">✔️</span>
        </div>

        <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-green-600 text-sm">Graded</p>
            <h2 className="text-2xl font-bold">1</h2>
          </div>
          <span className="text-green-500 text-2xl">✅</span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSection;