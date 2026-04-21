import { Eye } from "lucide-react";
import React, { useState } from "react";

const ApplicationSection = () => {
  const [openId, setOpenId] = useState(null);

  const statusStyles = {
    "In Progress": "bg-[#DBEAFE] text-[#1447E6]",
    "Under Review": "bg-[#FEF9C2] text-[#A65F00]",
    Accepted: "bg-[#DCFCE7] text-[#008236]",
    Rejected: "bg-[#FFE2E2] text-[#C10007]",
  };

  const applications = [
    {
      id: 1,
      icon: "/Images/pending.webp",
      university: "University of Manchester",
      program: "MSc Computer Science",
      country: "United Kingdom",
      date: "3/1/2026",
      status: "In Progress",
      timeline: [
        { label: "Application Submitted", date: "3/1/2026", done: true },
        { label: "Document Verification", date: "3/2/2026", done: true },
        { label: "Under University Review", done: false },
        { label: "Decision Received", done: false },
      ],
    },
    {
      id: 2,
      icon: "/Images/underreview.webp",
      university: "University of Toronto",
      program: "MBA",
      country: "Canada",
      date: "2/28/2026",
      status: "Under Review",
      timeline: [
        { label: "Application Submitted", date: "2/28/2026", done: true },
        { label: "Document Verification", date: "3/1/2026", done: true },
        { label: "Under University Review", date: "3/4/2026", done: true },
        { label: "Decision Received", done: false },
      ],
    },
    {
      id: 3,
      icon: "/Images/success.webp",
      university: "Australian National University",
      program: "Bachelor of Engineering",
      country: "Australia",
      date: "2/15/2026",
      status: "Accepted",
      timeline: [
        { label: "Application Submitted", date: "2/15/2026", done: true },
        { label: "Document Verification", date: "2/16/2026", done: true },
        { label: "Under University Review", date: "2/20/2026", done: true },
        { label: "Decision Received", date: "2/25/2026", done: true },
      ],
    },
    {
      id: 4,
      icon: "/Images/reject.webp",
      university: "Stanford University",
      program: "MS Data Science",
      country: "USA",
      date: "1/20/2026",
      status: "Rejected",
      timeline: [
        { label: "Application Submitted", date: "1/20/2026", done: true },
        { label: "Document Verification", date: "1/21/2026", done: true },
        { label: "Under University Review", date: "1/25/2026", done: true },
        { label: "Decision Received", date: "2/10/2026", done: true },
      ],
    },
  ];

  const stats = {
    total: applications.length,
    inProgress: applications.filter((a) => a.status === "In Progress").length,
    accepted: applications.filter((a) => a.status === "Accepted").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };
  const statsConfig = [
    { label: "Total Application", value: stats.total, color: "#101828" },
    { label: "In Progress", value: stats.inProgress, color: "#155DFC" },
    { label: "Accepted", value: stats.accepted, color: "#00A63E" },
    { label: "Rejected", value: stats.rejected, color: "#E7000B" },
  ];

  return (
    <div className="py-4 md:py-6 min-h-screen space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {
          statsConfig.map((config, i) => (
            <div className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm text-start">
              <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{config.label}</p>
              <p className={`font-inter font-bold text-[22px] md:text-[24px] text-[${config.color}] `}>{config.value}</p>
            </div>
          ))
        }
      </div>

      {/* Applications */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
            <div className="flex justify-between items-center border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-4 px-4 md:-mx-6 md:px-6">
              <div className="flex flex-col gap-1">
                <div className="flex justify-center items-center gap-2">
                  <img src={app.icon} alt="icon" width={20} height={20}/>
                  <h3 className="font-inter font-semibold text-[18px] md:text-[20px] text-[#101828]">{app.university}</h3>
                </div>
                <p className="font-inter font-medium text-sm md:text-[16px] text-[#364153]">{app.program}</p>
                <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{app.country}</p>
                <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">Applied: {app.date}</p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span
                  className={`font-inter font-normal text-xs md:text-sm px-4 py-2 rounded-full ${statusStyles[app.status]}`}
                >
                  {app.status}
                </span>
                <Eye className="w-4 h-4 cursor-pointer" onClick={() => setOpenId(openId === app.id ? null : app.id)} />
              </div>
            </div>

            {openId === app.id && (
              <div className="mt-4 space-y-3">
                <h4 className="font-inter font-medium text-xs md:text-sm text-[#364153]">Application Timeline</h4>
                {app.timeline.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center relative">
                      {/* Circle */}
                      <div
                        className={`flex justify-center items-center w-4 h-4 md:w-8 md:h-8 rounded-full z-10 ${step.done ? "bg-[#B9F8CF]" : "bg-gray-300"
                          }`}
                      >
                        <img src={step.done ? "/Images/success.webp" : "/Images/pendinggray.webp"} alt="icon" width={20} height={20}/>
                      </div>

                      {/* Vertical line */}
                      <div
                        className={`w-[2px] h-6 md:h-12 ${step.done ? "bg-[#B9F8CF]" : "bg-gray-300"
                          }`}
                      />
                    </div>
                    <div>
                      <p className="font-inter font-medium text-sm md:text-[16px] text-[#101828]">{step.label}</p>
                      {step.date && (
                        <p className="font-inter font-normal text-xs md:text-sm text-[#6A7282]">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationSection
