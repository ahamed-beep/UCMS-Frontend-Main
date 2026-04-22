import React from "react";

const ClassScheduleSection = () => {
  const stats = [
    { label: "Enrolled Classes", value: 8, colr: "text-[#0F4C8A]" },
    { label: "This Week", value: 4, color: "text-[#00A63E]" },
    { label: "Completed", value: 12, color: "text-[#9810FA]" },
    { label: "Next Class", value: "Tomorrow", color: "text-[#0A0A0A]" },
  ];

  const classes = [
    {
      title: "IELTS Speaking Practice",
      teacher: "Dr. Sarah Johnson",
      date: "Sat, Mar 7",
      time: "2:00 PM - 4:00 PM",
      type: "Video",
      level: "Intermediate",
      topics: ["Band 7+", "Fluency", "Mock Interviews"],
    },
    {
      title: "PTE Writing Workshop",
      teacher: "Prof. Michael Chen",
      date: "Sun, Mar 8",
      time: "10:00 AM - 1:00 PM",
      type: "In-Person",
      level: "Advanced",
      topics: ["Essay", "Summarize", "Dictation"],
    },
    {
      title: "IELTS Reading Techniques",
      teacher: "Ms. Emily Davis",
      date: "Mon, Mar 9",
      time: "3:00 PM - 5:00 PM",
      type: "Video",
      level: "All Levels",
      topics: ["Skimming", "True/False", "Time"],
    },
  ];

  const weekly = [
    "Mon: Listening (9 AM), Reading (2 PM)",
    "Tue: Writing (10 AM), Speaking (3 PM)",
    "Wed: Speaking (2 PM), Grammar (5 PM)",
    "Thu: Writing (10 AM), Reading (3 PM)",
    "Fri: Speaking (11 AM), Review (4 PM)",
    "Sat: Mock Tests",
    "Sun: Q&A",
  ];

  const materials = [
    "IELTS Speaking Topics",
    "PTE Writing Templates",
    "Vocabulary Builder",
    "Reading Practice Tests",
  ];

  return (
    <div className="py-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
        {stats.map((item, i) => (
          <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4">
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{item.label}</p>
            <p className={`font-inter font-bold text-[22px] md:text-[24px] ${item.color || ""}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
          {/* CLASSES */}
          <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Upcoming Classes</h2>
          </div>

          {classes.map((cls, i) => (
            <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] mb-4 p-4">

              <div className="flex justify-between mb-2">
                <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">{cls.title}</h3>
                <span className="font-inter font-medium text-[10px] md:text-xs bg-[#0F4C8A] text-white px-3 py-1 rounded-full">
                  {cls.level}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <img src="/Images/openbook.webp" alt="book" width={16} height={16} />
                <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{cls.teacher}</p>
              </div>
              <div className="flex md:flex-row flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <img src="/Images/calendergray.webp" alt="book" width={16} height={16} />
                  <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{cls.date}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <img src="/Images/time.webp" alt="book" width={16} height={16} />
                  <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{cls.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/Images/videogray.webp" alt="book" width={16} height={16} />
                <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{cls.type}</p>
              </div>

              <div className="bg-[#F9FAFB] mb-3 flex flex-col p-3 rounded-[10px]">
                <p className="font-inter font-medium text-[10px] md:text-xs text-[#364153]">Topics Covered:</p>
                <div className="flex flex-wrap gap-2">
                  {cls.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-inter font-normal text-[10px] md:text-xs text-[#364153] bg-white border-[0.89px] border-[#E5E7EB] rounded-sm p-1 mt-2"
                  >
                    {t}
                  </span>
                ))}
                </div>
              </div>

              <div className="w-full flex gap-2">
                <button className="w-1/2 font-inter font-normal text-xs md:text-sm bg-[#FF6B35] text-white py-2 rounded-[10px]">
                  Join Class
                </button>
                <button className="w-1/2 flex justify-center items-center gap-1 font-inter font-normal text-xs md:text-sm border-[0.89px] text-[#0F4C8A] border-[#0F4C8A] py-2 rounded-[10px] ">
                  <img src="/Images/file.webp" alt="file" width={16} height={16}/> View Materials
                </button>
              </div>
            </div>
          ))}

        </div>
        <div>

          {/* WEEKLY */}
          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h2 className="font-semibold mb-3">Weekly Schedule</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              {weekly.map((day, i) => (
                <li key={i}>{day}</li>
              ))}
            </ul>
          </div>

          {/* MATERIALS */}
          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h2 className="font-semibold mb-3">Study Materials</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              {materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          {/* PROGRESS */}
          <div className="bg-blue-600 text-white p-4 rounded-xl">
            <h2 className="font-semibold mb-2">Your Progress</h2>
            <p className="text-sm mb-3">12 out of 20 completed</p>

            <div className="w-full bg-blue-400 h-2 rounded-full mb-3">
              <div className="bg-white h-2 rounded-full w-3/5"></div>
            </div>

            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm">
              View Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ClassScheduleSection