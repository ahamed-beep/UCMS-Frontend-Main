 break-allimport React from 'react';

const CourseStats = ({ totalLectures, completedModulesCount, modulesLength, progressPct }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-[#0A0A0A] font-inter mb-4">Course Stats</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#4A5565] font-inter">Enrolled</span>
          <span className="text-[#0A0A0A] font-inter font-medium">01/02/2026</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4A5565] font-inter">Total Lectures</span>
          <span className="text-[#0A0A0A] font-inter font-medium break-all">{totalLectures}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4A5565] font-inter ">Completed</span>
          <span className="text-[#00A63E] font-inter font-semibold break-all">{completedModulesCount}/{modulesLength}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4A5565] font-inter">Certificate</span>
          <span className="text-[#FF6B35] font-inter font-semibold">
            {progressPct === 100 ? "Earned" : "In Progress"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;