import React from "react";
import Table from "./Table";
import { stats } from "../constants/Constant";

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
    <div className="py-2 md:py-4 space-y-2 md:space-y-4">

      {/* Upload Section */}
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-2">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] mb-4">Upload Assignment</h2>

        <div className="flex flex-col justify-center items-center gap-2 md:gap-4 border-[1.78px] border-dashed border-[#D1D5DC] bg-[#F9FAFB] rounded-[10px] p-6 md:p-10 text-center">
          <img src="/Images/download.webp" alt="download" width={48} height={48} />
          <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">
            Drag and drop your assignment here
          </p>
          <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
            or click to browse from your computer
          </p>

          <button className="font-inter font-medium text-sm md:text-[16px] bg-[#155DFC] text-white px-5 py-2 rounded-[10px]">
            Choose Files
          </button>

          <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">
            Supported formats: PDF, DOC, DOCX, TXT (Max size: 10MB)
          </p>
        </div>

        <div>
          <label htmlFor="assignment" className="font-inter font-medium text-[12px] md:text-sm text-[#364153]">
            Select Assignment
            <input
              type="text"
              className="w-full border-[0.89px] border-[#D1D5DC] rounded-[10px] py-3 px-2 mt-1"
            />
          </label>
        </div>

        <button className=" font-inter font-medium text-sm md:text-[16px] bg-[#155DFC] text-white px-5 py-2 rounded-[10px]">
          Submit Assignment
        </button>
      </div>

      <div>
        <Table />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} ${item.border || ""} p-4 md:p-6 rounded-xl flex justify-between items-center`}
          >
            <div>
              <p className={`font-inter font-medium text-[12px] md:text-sm ${item.textColor}`}>
                {item.label}
              </p>
              <h2 className={`font-inter font-bold text-[25px] md:text-[30px] ${item.countColor}`}>
                {item.count}
              </h2>
            </div>
            <img src={item.icon} alt="icon" width={40} height={40}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentSection;