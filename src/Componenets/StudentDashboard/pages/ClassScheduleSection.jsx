import React from "react";

const ClassScheduleSection =() => {
  const stats = [
    { label: "Enrolled Classes", value: 8 },
    { label: "This Week", value: 4, color: "text-green-600" },
    { label: "Completed", value: 12, color: "text-purple-600" },
    { label: "Next Class", value: "Tomorrow" },
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
    <div className="p-6 bg-gray-100 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT */}
      <div className="lg:col-span-2">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className={`text-xl font-bold ${item.color || ""}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* CLASSES */}
        <h2 className="font-semibold mb-3">Upcoming Classes</h2>

        {classes.map((cls, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow mb-4">
            
            <div className="flex justify-between">
              <h3 className="font-semibold">{cls.title}</h3>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">
                {cls.level}
              </span>
            </div>

            <p className="text-sm text-gray-500">{cls.teacher}</p>
            <p className="text-sm text-gray-500">
              {cls.date} • {cls.time}
            </p>
            <p className="text-sm text-gray-500 mb-2">{cls.type}</p>

            <div className="mb-3 flex flex-wrap gap-2">
              {cls.topics.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
                Join Class
              </button>
              <button className="border px-4 py-2 rounded-lg text-sm">
                View Materials
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
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
  );
}

export default ClassScheduleSection