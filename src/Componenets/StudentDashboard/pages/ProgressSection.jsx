import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, BookOpen } from 'lucide-react';
import axiosInstance from '../../../Api/axiosInstance';

const ProgressSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/student/progress')
      .then((res) => setData(res.data.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Overall Average',
      value: loading ? '...' : `${data?.overallAverage ?? 0}%`,
      icon: <TrendingUp className="text-[#0F4C8A]" />,
      color: 'bg-[#E3EDF7]',
    },
    {
      label: 'Course Completion',
      value: loading ? '...' : `${data?.courseCompletionPercent ?? 0}%`,
      icon: <Target className="text-[#00A63E]" />,
      color: 'bg-[#DCFCE7]',
    },
    {
      label: 'Modules Completed',
      value: loading ? '...' : `${data?.modulesCompleted ?? 0}`,
      icon: <BookOpen className="text-[#9810FA]" />,
      color: 'bg-[#F3E8FF]',
    },
  ];

  const courses = data?.courses ?? [];
  const recentScores = data?.recentScores ?? [];

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-6 min-h-screen space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
            <div className={`w-9 h-9 md:w-12 md:h-12 ${stat.color} rounded-[10px] flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <div className="font-inter font-bold text-[22px] md:text-[24px] text-[#0A0A0A]">{stat.value}</div>
            <div className="font-inter font-medium text-[12px] md:text-sm text-[#4A5565]">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-8">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Course Completion Progress</h2>
        {loading ? (
          <div className="text-sm text-[#6A7282]">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-sm text-[#6A7282]">No courses found.</div>
        ) : (
          <div className="space-y-10">
            {courses.map((course, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">{course.title}</h3>
                    <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">
                      {course.modulesCompleted} of {course.totalModules} modules completed
                    </p>
                  </div>
                  <span className="font-inter font-bold text-[22px] md:text-[24px] text-[#0F4C8A]">{course.progress}%</span>
                </div>
                <div className="w-full bg-[#E5E7EB] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0F4C8A] h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F0FDF4] p-3 rounded-[10px]">
                    <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Quiz Average</p>
                    <p className="font-inter font-bold text-[18px] md:text-[20px] text-[#008236]">{course.quizAvg}%</p>
                  </div>
                  <div className="bg-[#FAF5FF] p-3 rounded-[10px]">
                    <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Assignment Average</p>
                    <p className="font-inter font-bold text-[18px] md:text-[20px] text-[#8200DB]">{course.assignmentAvg}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
        <div className="border-b-[0.89px] ps-5 border-[#E5E7EB] -mx-4 md:-mx-6 pb-3 md:pb-6">
          <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Recent Scores</h2>
          <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Quiz and assignment performance</p>
        </div>
        <div className="space-y-3 pt-3 md:pt-6">
          {loading ? (
            <div className="text-sm text-[#6A7282]">Loading...</div>
          ) : recentScores.length === 0 ? (
            <div className="text-sm text-[#6A7282]">No recent scores.</div>
          ) : (
            recentScores.map((score, idx) => {
              const isQuiz = score.type === 'Quiz';
              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-[10px] hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <span className={`font-inter font-medium text-[10px] md:text-xs px-2 py-1 rounded uppercase ${isQuiz ? 'bg-[#0F4C8A] text-white' : 'bg-[#F3E8FF] text-[#8200DB]'}`}>
                      {score.type}
                    </span>
                    <div>
                      <p className="font-inter font-medium text-xs md:text-sm text-[#0A0A0A]">{score.title}</p>
                      <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">
                        {new Date(score.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <span className="font-inter font-bold text-[18px] md:text-[20px] text-[#00A63E]">{score.score}%</span>
                </div>
              );
            })
          )}
        </div>
      </section>

  
    </div>
  );
};

export default ProgressSection;