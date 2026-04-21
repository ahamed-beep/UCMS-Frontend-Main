import React from "react";

const QuizzesSection = () => {

  const stats = [
    { title: "Available Quizzes", value: 2, icon: "/Images/brain.webp" },
    { title: "Completed", value: 2, icon: "/Images/checkgreen.webp" },
    { title: "Average Score", value: "90%", icon: "/Images/cup.webp" },
    { title: "In Progress", value: 1, icon: "/Images/orangeclock.webp" },
  ];

  const quizzes = [
    {
      title: "IELTS Grammar Quiz - Module 1",
      status: "Available",
      subtitle: "IELTS Preparation",
      questions: 20,
      time: "30 min",
      attempts: "0/3",
      button: "Start Quiz",
    },
    {
      title: "Vocabulary Assessment Test",
      status: "Available",
      subtitle: "IELTS Preparation",
      questions: 25,
      time: "25 min",
      attempts: "0/2",
      button: "Start Quiz",
    },
    {
      title: "PTE Reading Comprehension Mock Test",
      status: "Completed",
      subtitle: "PTE Writing Masterclass",
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
      subtitle: "IELTS Preparation",
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
      subtitle: "PTE Writing Masterclass",
      questions: 10,
      time: "15 min",
      attempts: "1/2",
      button: "Continue",
    },
  ];

  const mockTests = [
    {
      title: "IELTS Academic Full Mock Test 1",
      activities: ["Listening", "Reading", "Writing", "Speaking"],
      duration: "180 min",
      button: "Start Test",
    },
    {
      title: "PTE Academic Mock Test - Complete",
      activities: ["Reading", "Writing", "Speaking"],
      duration: "120 min",
      schedule: "3/20/2026",
      button: "View Schedule",
    },
    {
      title: "IELTS Academic Full Mock Test 2",
      activities: ["Listening", "Reading", "Writing", "Speaking"],
      duration: "180 min",
      score: "7.5",
      date: "2/28/2026",
      button: "View Results",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Available") return "bg-[#0F4C8A] text-white";
    if (status === "Completed") return "bg-[#DCFCE7] text-[#008236]";
    if (status === "In Progress") return "bg-[#FF6B35] text-white";
  };

  const getMockupButtonStyle = (button) => {
    if (button === "Start Test") return "bg-[#9810FA] text-white";
    if (button === "View Schedule") return "bg-[#E5E7EB] text-[#364153]";
    if (button === "View Results") return "bg-[#00A63E] text-white";
  };

  return (
    <div className="py-4 md:py-6 min-h-screen space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-4 md:p-6 flex justify-between items-center border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm"
          >
            <div>
              <p className={"font-inter font-medium text-[12px] md:text-sm text-[#4A5565]"}>
                {item.title}
              </p>
              <h2 className="font-inter font-bold text-[25px] md:text-[30px] text-[#0A0A0A]">
                {item.value}
              </h2>
            </div>
            <img src={item.icon} alt="icon" width={40} height={40} />
          </div>
        ))}
      </div>

      {/* Online Quizzes */}
      <div className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <h2 className="font-inter font-semibold text-[16px] md:text-lg text-[#0A0A0A] mb-1">Online Quizzes</h2>
        <p className="font-inter font-medium text-[12px] md:text-sm text-[#4A5565] mb-4">
          Instant scores and automated evaluation
        </p>

        <div className="space-y-4 ">
          {quizzes.map((quiz, i) => (
            <div
              key={i}
              className="border-t-[0.89px] border-[#E5E7EB] px-4 md:px-6 -mx-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-inter font-semibold text-[16px] md:text-lg text-[#0A0A0A]">{quiz.title}</h3>
                  <span
                    className={`font-inter font-medium text-[10px] md:text-xs px-3 py-1 rounded-full ${getStatusStyle(
                      quiz.status
                    )}`}
                  >
                    {quiz.status}
                  </span>
                </div>
                <h4 className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{quiz.subtitle}</h4>

                <div className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565] flex gap-4 flex-wrap">
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/Images/ques.webp" alt="icon" width={16} height={16} />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/Images/time.webp" alt="icon" width={16} height={16} />
                    <span>{quiz.time}</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/Images/atp.webp" alt="icon" width={16} height={16} />
                    <span>{quiz.attempts} attempts</span>
                  </div>
                </div>

                {quiz.score && (
                  <p className="font-inter font-normal text-[12px] md:text-sm text-[#364153]">
                    Score: <span className="font-inter font-bold text-[16px] md:text-lg text-[#00A63E]">{quiz.score}</span>
                  </p>
                )}

                {quiz.feedback && (
                  <div className="font-inter font-normal text-xs md:text-sm bg-[#E3EDF7] border-[0.89px] border-[#0F4C8A] rounded-[10px] p-3 text-[#0A0A0A]">
                    <strong>Teacher Feedback:</strong> {quiz.feedback}
                  </div>
                )}
              </div>

              <button className={`font-inter font-medium text-sm md:text-[16px] px-5 py-2 rounded-[10px] hover:opacity-80 transition ${getStatusStyle(
                quiz.status
              )}`}>
                {quiz.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Tests */}
      <div className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <h2 className="font-inter font-semibold text-[16px] md:text-lg text-[#0A0A0A] mb-1">Full Mock Tests</h2>
        <p className="font-inter font-medium text-[12px] md:text-sm text-[#4A5565] mb-4">
          Complete practice tests with all sections
        </p>

        <div className="space-y-4 ">
          {mockTests.map((test, i) => (
            <div
              key={i}
              className="border-t-[0.89px] border-[#E5E7EB] px-4 md:px-6 -mx-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
            >
              <div className="space-y-2">
                <h3 className="font-inter font-semibold text-[16px] md:text-lg text-[#0A0A0A]">{test.title}</h3>
                <div className="flex gap-2">
                  {
                    test.activities.map((activity, i) => (
                      <span key={i} className="font-inter font-medium text-[10px] md:text-[12px] bg-[#F3E8FF] text-[#8200DB] px-3 py-1 rounded-full">{activity}</span>
                    ))
                  }
                </div>
                <div className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565] flex gap-4 flex-wrap">
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/Images/time.webp" alt="time" width={16} height={16}/>
                    <p className="text-sm text-gray-500">
                      {test.duration}
                    </p>
                  </div>

                  {test.schedule && (
                    <div className="flex gap-2 justify-center items-center">
                      <img src="/Images/atp.webp" alt="time" width={16} height={16}/>
                      <p className="text-sm text-gray-500">
                      Scheduled: {test.schedule}
                    </p>
                    </div>
                  )}
                </div>

                {test.score && (
                  <p className="font-inter font-normal text-[12px] md:text-sm text-[#364153]">
                    <strong>Overall Band Scrore: </strong> <span className="font-inter font-bold text-[16px] md:text-lg text-[#00A63E]">{test.score}</span> Completed: {test.date}
                  </p>
                )}

              </div>

              <button className={`font-inter font-medium text-sm md:text-[16px] px-5 py-2 rounded-[10px] hover:opacity-80 transition  ${getMockupButtonStyle(test.button)} transition`}>
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