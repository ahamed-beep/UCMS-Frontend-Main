import React from "react";

const QuizzesSection = () => {

  const stats = [
    { title: "Available Quizzes", value: 2, color: "text-blue-600" },
    { title: "Completed", value: 2, color: "text-green-600" },
    { title: "Average Score", value: "90%", color: "text-yellow-500" },
    { title: "In Progress", value: 1, color: "text-orange-500" },
  ];

  const quizzes = [
    {
      title: "IELTS Grammar Quiz - Module 1",
      status: "Available",
      questions: 20,
      time: "30 min",
      attempts: "0/3",
      button: "Start Quiz",
    },
    {
      title: "Vocabulary Assessment Test",
      status: "Available",
      questions: 25,
      time: "25 min",
      attempts: "0/2",
      button: "Start Quiz",
    },
    {
      title: "PTE Reading Comprehension Mock Test",
      status: "Completed",
      questions: 30,
      time: "40 min",
      attempts: "1/3",
      score: "88%",
      feedback:
        "Excellent performance! Focus on time management in section 3.",
      button: "Review",
    },
    {
      title: "Listening Skills Practice Quiz",
      status: "Completed",
      questions: 15,
      time: "20 min",
      attempts: "1/2",
      score: "92%",
      feedback:
        "Outstanding work! Keep up the good listening practice.",
      button: "Review",
    },
    {
      title: "Writing Task Analysis Quiz",
      status: "In Progress",
      questions: 10,
      time: "15 min",
      attempts: "1/2",
      button: "Continue",
    },
  ];

  const mockTests = [
    {
      title: "IELTS Academic Full Mock Test 1",
      duration: "180 min",
      button: "Start Test",
    },
    {
      title: "PTE Academic Mock Test - Complete",
      duration: "120 min",
      schedule: "3/20/2026",
      button: "View Schedule",
    },
    {
      title: "IELTS Academic Full Mock Test 2",
      duration: "180 min",
      score: "7.5",
      date: "2/28/2026",
      button: "View Results",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Available") return "bg-blue-100 text-blue-600";
    if (status === "Completed") return "bg-green-100 text-green-600";
    if (status === "In Progress") return "bg-orange-100 text-orange-600";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className={`text-2xl font-bold ${item.color}`}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Online Quizzes */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <h2 className="font-semibold text-lg mb-1">Online Quizzes</h2>
        <p className="text-sm text-gray-500 mb-4">
          Instant scores and automated evaluation
        </p>

        <div className="space-y-4">
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium">{quiz.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(
                      quiz.status
                    )}`}
                  >
                    {quiz.status}
                  </span>
                </div>

                <div className="text-sm text-gray-500 flex gap-4 flex-wrap">
                  <span>{quiz.questions} questions</span>
                  <span>{quiz.time}</span>
                  <span>{quiz.attempts} attempts</span>
                </div>

                {quiz.score && (
                  <p className="text-green-600 text-sm">
                    Score: {quiz.score}
                  </p>
                )}

                {quiz.feedback && (
                  <div className="bg-gray-100 border rounded-md p-2 text-sm text-gray-600">
                    <strong>Teacher Feedback:</strong> {quiz.feedback}
                  </div>
                )}
              </div>

              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                {quiz.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Tests */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <h2 className="font-semibold text-lg mb-1">Full Mock Tests</h2>
        <p className="text-sm text-gray-500 mb-4">
          Complete practice tests with all sections
        </p>

        <div className="space-y-4">
          {mockTests.map((test, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{test.title}</h3>
                <p className="text-sm text-gray-500">
                  {test.duration}
                </p>

                {test.score && (
                  <p className="text-sm text-green-600">
                    Band: {test.score} • {test.date}
                  </p>
                )}

                {test.schedule && (
                  <p className="text-sm text-gray-500">
                    Scheduled: {test.schedule}
                  </p>
                )}
              </div>

              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700 transition">
                {test.button}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default QuizzesSection;