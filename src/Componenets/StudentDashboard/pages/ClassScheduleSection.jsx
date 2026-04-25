import React from "react";
import { IoMdArrowForward } from "react-icons/io";

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
    { day: "Monday", tasks: [ "IELTS Listening (9 AM)", "PTE Reading (2 PM)"]},
    { day: "Tuesday", tasks: [ "IELTS Writing (10 AM)", "PTE Speaking (3 PM)"]},
   { day: "Wednesday", tasks: [ "IELTS Speaking (2 PM)", "Grammar Workshop (5 PM)"]},
   { day: "Thursday", tasks: [ "PTE Writing (10 AM)", "IELTS Reading (3 PM)"]},
   { day: "Friday", tasks: [ "PTE Speaking (11 AM)", "Mock Test Review (4 PM)"]},
   { day: "Saturday", tasks: [ "Full IELTS Mock Test (9 AM)", "PTE Mock Test (2 PM)"]},
   { day: "Sunday", tasks: [ "Open Q&A Session (10 AM)"]},
  ];

  const materials = [
  {
    title: "IELTS Speaking Topics - March 2024",
    type: "PDF",
    size: "2.4 MB",
    file: "ielts-speaking-topics-march-2024.pdf"
  },
  {
    title: "PTE Writing Templates",
    type: "PDF",
    size: "1.8 MB",
    file: "pte-writing-templates.pdf"
  },
  {
    title: "Vocabulary Builder - Academic Words",
    type: "PDF",
    size: "3.2 MB",
    file: "vocabulary-builder-academic.pdf"
  },
  {
    title: "IELTS Reading Practice Tests",
    type: "PDF",
    size: "5.1 MB",
    file: "ielts-reading-practice-tests.pdf"
  }
];

const progress = {
  total: 20,
  completed: 12
}

const percentageProgress = Math.round((progress.completed / progress.total)*100);

  return (
    <div className="py-4 md:py-6">

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
        <div className="md:col-span-2 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
          {/* CLASSES */}
          <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Upcoming Classes</h2>
          </div>

          {classes.map((cls, i) => (
            <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] mb-4 p-4">

              <div className="flex justify-between mb-2">
                <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">{cls.title}</h3>
                <span className="font-inter font-medium text-[10px] md:text-xs bg-[#0F4C8A] text-white px-3 py-1 rounded-full self-start">
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
        <div className="space-y-4">

          {/* WEEKLY */}
          <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
            <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
              <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Weekly Schedule</h2>
            </div>
            <ul>
              {weekly.map((item, i) => (
                <div key={i} className="pb-2">
                  <h3 className="font-inter font-semibold text-xs md:text-sm text-[#0A0A0A] mb-2">{item.day}</h3>
                  {
                    item.tasks.map((task, i)=>(
                      <p className="font-inter font-normal text-[10px] md:text-xs text-[#4A5565] border-l-[1.78px] border-[#0F4C8A] ps-3 my-1">{task}</p>
                    ))
                  }
                </div>
              ))}
            </ul>
          </div>

          {/* MATERIALS */}
          <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
            <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
              <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Study Materials</h2>
            </div>  
              <div className="flex flex-col gap-3">
                {materials.map((m, i) => (
                <div className="flex items-start gap-2 bg-[#F9FAFB] rounded-[10px] p-3">
                  <img src="/Images/bluedownload.webp" alt="download" width={20} height={20} className="pt-1"/>
                  <div className="min-w-0">
                    <h4 className="font-inter font-medium text-[12px] md:text-sm text-[#0A0A0A] truncate">{m.title}</h4>
                    <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">{m.type} • {m.size}</p>
                  </div>
                </div>
              ))}
              <a href='/services' className='flex justify-center items-center font-inter font-semibold text-[14px] md:text-[16px] text-[#0F4C8A]'>View All Resources<IoMdArrowForward className=' ml-2' size={20} /></a>
              </div>
          </div>

          {/* PROGRESS */}
          <div className=" flex flex-col gap-2 bg-gradient-to-l to-[#0F4C8A] from-[#083766] text-white p-4 md:p-6 rounded-xl">
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px]">Your Progress</h2>
            <p className="font-inter font-normal text-xs md:text-sm">You've completed {progress.completed} out of {progress.total} classes this month</p>

            <div className="w-full bg-white/20 h-2 rounded-full">
              <div className="bg-white h-2 rounded-full" 
              style={{width: `${percentageProgress}%`}}></div>
            </div>
            <p className="font-inter font-normal text-xs md:text-sm mb-3">{percentageProgress}% completed</p>

            <button className="w-full font-inter font-medium text-xs md:text-sm bg-white text-[#0F4C8A] py-2 rounded-[10px]">
              View Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ClassScheduleSection