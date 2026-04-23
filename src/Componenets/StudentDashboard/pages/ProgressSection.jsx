import React from 'react';
import { TrendingUp, Target, BookOpen, CheckCircle } from 'lucide-react';

const ProgressSection = () => {
  const stats = [
    { label: 'Overall Average', value: '87%', icon: <TrendingUp className="text-[#0F4C8A]" />, color: 'bg-[#E3EDF7]' },
    { label: 'Course Completion', value: '68%', icon: <Target className="text-[#00A63E]" />, color: 'bg-[#DCFCE7]' },
    { label: 'Modules Completed', value: '36', icon: <BookOpen className="text-[#9810FA]" />, color: 'bg-[#F3E8FF]' },
  ];

  const courses = [
    {
      title: 'IELTS Preparation - Academic',
      progress: 65,
      modules: '16 of 24 modules completed',
      quizAvg: '85%',
      assignmentAvg: '88%',
    },
    {
      title: 'PTE Writing Masterclass',
      progress: 40,
      modules: '8 of 20 modules completed',
      quizAvg: '78%',
      assignmentAvg: '82%',
    },
    {
      title: 'English Communication Skills',
      progress: 100,
      modules: '12 of 12 modules completed',
      quizAvg: '92%',
      assignmentAvg: '95%',
    },
  ];

  const recentScores = [
    { type: 'Quiz', title: 'Listening Skills Practice', date: '3/1/2026', score: '92%', color: 'text-white', bg: 'bg-[#0F4C8A]' },
    { type: 'Assignment', title: 'Reading Comprehension Analysis', date: '3/4/2026', score: '85%', color: 'text-[#8200DB]', bg: 'bg-[#F3E8FF]' },
    { type: 'Quiz', title: 'PTE Reading Mock Test', date: '3/5/2026', score: '88%', color: 'text-white', bg: 'bg-[#0F4C8A]' },
    { type: 'Assignment', title: 'Vocabulary Exercise Set', date: '2/28/2026', score: '90%', color: 'text-[#8200DB]', bg: 'bg-[#F3E8FF]' },
    { type: 'Quiz', title: 'Grammar Assessment', date: '2/25/2026', score: '87%', color: 'text-white', bg: 'bg-[#0F4C8A]' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 md:py-6 min-h-screen space-y-6 ">

      {/* Top Stats */}
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

      {/* Course Completion Progress */}
      <section className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-8">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Course Completion Progress</h2>
        <div className="space-y-10">
          {courses.map((course, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">{course.title}</h3>
                  <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{course.modules}</p>
                </div>
                <span className="font-inter font-bold text-[22px] md:text-[24px] text-[#0F4C8A]">{course.progress}%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-[#E5E7EB] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-[#0F4C8A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              {/* Avg Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F0FDF4] p-3 rounded-[10px]">
                  <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Quiz Average</p>
                  <p className="font-inter font-bold text-[18px] md:text-[20px] text-[#008236]">{course.quizAvg}</p>
                </div>
                <div className="bg-[#FAF5FF] p-3 rounded-[10px]">
                  <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Assignment Average</p>
                  <p className="font-inter font-bold text-[18px] md:text-[20px] text-[#8200DB]">{course.assignmentAvg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Scores */}
      <section className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
        <div className='border-b-[0.89px] ps-5 border-[#E5E7EB] -mx-4 md:-mx-6 pb-3 md:pb-6'>
          <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Recent Scores</h2>
          <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Quiz and assignment performance</p>
        </div>
        <div className="space-y-3 pt-3 md:pt-6">
          {recentScores.map((score, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-[10px] hover:bg-gray-100 transition-colors">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <span className={`font-inter font-medium text-[10px] md:text-xs px-2 py-1 rounded ${score.bg} ${score.color} uppercase`}>
                  {score.type}
                </span>
                <div>
                  <p className="font-inter font-medium text-xs md:text-sm text-[#0A0A0A]">{score.title}</p>
                  <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">{score.date}</p>
                </div>
              </div>
              <span className="font-inter font-bold text-[18px] md:text-[20px] text-[#00A63E]">{score.score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Chart Placeholder */}
      <section className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A] pb-4">Performance Chart</h2>
        <div className="border-[1.78px] border-dashed border-[#D1D5DC] bg-gradient-to-b from-[#E3EDF7] to-[#F3E8FF] rounded-[10px] h-auto md:h-58 flex flex-col items-center justify-center text-center p-6">
          <TrendingUp className="w-16 h-16 text-[#99A1AF] mb-4" />
          <h3 className="font-inter font-medium text-sm md:text-[16px] text-[#4A5565]">Performance charts coming soon</h3>
          <p className="font-inter font-normal text-xs md:text-sm text-[#6A7282]">Track your progress over time with detailed analytics and visualizations</p>
        </div>
      </section>
    </div>
  );
};

export default ProgressSection;