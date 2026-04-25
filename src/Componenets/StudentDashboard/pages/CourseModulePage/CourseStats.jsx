import React from 'react';

const CourseStats = ({ totalLectures, completedModulesCount, modulesLength, progressPct }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Course Stats</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-600">Enrolled</span>
          <span className="text-gray-900 font-medium">01/02/2026</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">Total Lectures</span>
          <span className="text-gray-900 font-medium">{totalLectures}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">Completed</span>
          <span className="text-green-500 font-semibold">{completedModulesCount}/{modulesLength}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">Certificate</span>
          <span className="text-orange-500 font-semibold">
            {progressPct === 100 ? "Earned" : "In Progress"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;