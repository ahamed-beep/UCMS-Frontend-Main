import React from 'react';
import { TrendingUp, Target, BookOpen, CheckCircle } from 'lucide-react';

const ProgressSection = () => {
  const stats = [
    { label: 'Overall Average', value: '87%', icon: <TrendingUp className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Course Completion', value: '68%', icon: <Target className="text-green-600" />, color: 'bg-green-50' },
    { label: 'Modules Completed', value: '36', icon: <BookOpen className="text-purple-600" />, color: 'bg-purple-50' },
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
    { type: 'Quiz', title: 'Listening Skills Practice', date: '3/1/2026', score: '92%', color: 'text-blue-600', bg: 'bg-blue-100' },
    { type: 'Assignment', title: 'Reading Comprehension Analysis', date: '3/4/2026', score: '85%', color: 'text-purple-600', bg: 'bg-purple-100' },
    { type: 'Quiz', title: 'PTE Reading Mock Test', date: '3/5/2026', score: '88%', color: 'text-blue-600', bg: 'bg-blue-100' },
    { type: 'Assignment', title: 'Vocabulary Exercise Set', date: '2/28/2026', score: '90%', color: 'text-purple-600', bg: 'bg-purple-100' },
    { type: 'Quiz', title: 'Grammar Assessment', date: '2/25/2026', score: '87%', color: 'text-blue-600', bg: 'bg-blue-100' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen space-y-6 font-sans">

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Course Completion Progress */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-8">
        <h2 className="text-lg font-semibold text-gray-800">Course Completion Progress</h2>
        <div className="space-y-10">
          {courses.map((course, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-gray-800">{course.title}</h3>
                  <p className="text-xs text-gray-400">{course.modules}</p>
                </div>
                <span className="text-xl font-bold text-blue-800">{course.progress}%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-900 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              {/* Avg Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <p className="text-[10px] uppercase tracking-wider text-green-700 font-semibold">Quiz Average</p>
                  <p className="text-lg font-bold text-green-600">{course.quizAvg}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-[10px] uppercase tracking-wider text-purple-700 font-semibold">Assignment Average</p>
                  <p className="text-lg font-bold text-purple-600">{course.assignmentAvg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Scores */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Recent Scores</h2>
        <p className="text-xs text-gray-400 mb-6">Quiz and assignment performance</p>
        <div className="space-y-3">
          {recentScores.map((score, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${score.bg} ${score.color} uppercase`}>
                  {score.type}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{score.title}</p>
                  <p className="text-[10px] text-gray-400">{score.date}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">{score.score}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Chart Placeholder */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Chart</h2>
        <div className="border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-xl h-64 flex flex-col items-center justify-center text-center p-6">
          <TrendingUp className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="font-semibold text-gray-700">Performance charts coming soon</h3>
          <p className="text-sm text-gray-500 max-w-xs">Track your progress over time with detailed analytics and visualizations</p>
        </div>
      </section>
    </div>
  );
};

export default ProgressSection;