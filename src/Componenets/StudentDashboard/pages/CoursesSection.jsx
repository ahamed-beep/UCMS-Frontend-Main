import React from 'react'
import { BookOpen, Clock, Download } from 'lucide-react'

const courses = [
    {
        title: "IELTS Preparation - Academic",
        teacher: "Dr. Sarah Johnson",
        progress: 65,
        lectures: "16/24 lectures",
        time: "Tomorrow, 2:00 PM",
        status: "In Progress",
    },
    {
        title: "PTE Writing Masterclass",
        teacher: "Prof. Michael Chen",
        progress: 40,
        lectures: "8/20 lectures",
        time: "March 8, 10:00 AM",
        status: "In Progress",
    },
    {
        title: "English Communication Skills",
        teacher: "Emma Williams",
        progress: 100,
        lectures: "12/12 lectures",
        time: "Completed",
        status: "Completed",
    },
]

const materials = [
    { title: "IELTS Writing Task 1 - Introduction", sub: "45 min" },
    { title: "IELTS Speaking Strategies Guide", sub: "2.4 MB" },
    { title: "Sample Essays Collection", sub: "1.8 MB" },
    { title: "Listening Practice - Lecture Format", sub: "30 min" },
    { title: "Vocabulary Builder - Academic Words", sub: "950 KB" },
    { title: "Grammar Essentials Presentation", sub: "3.2 MB" },
]

const exercises = [
    { title: "Writing Task 2 - Opinion Essay", sub: "5 questions · 60 min", type: "Start" },
    { title: "Reading Comprehension - Set A", sub: "10 questions · 30 min", type: "Review" },
    { title: "Listening Practice Test 1", sub: "15 questions · 40 min", type: "Review" },
    { title: "Speaking Mock Interview", sub: "8 questions · 15 min", type: "Start" },
]

const CoursesSection = () => {
    return (
        <div>
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                <h2 className="font-semibold text-lg">Enrolled Courses</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {courses.map((course, i) => (
                        <div key={i} className="border rounded-xl p-4 space-y-3">

                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <BookOpen size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{course.title}</p>
                                        <p className="text-sm text-gray-500">{course.teacher}</p>
                                    </div>
                                </div>

                                <span className={`text-xs px-3 py-1 rounded-full ${course.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {course.status}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Progress: {course.progress}%</span>
                                <span>{course.lectures}</span>
                            </div>

                            <div className="w-full bg-gray-200 h-2 rounded-full">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock size={14} />
                                    <span>{course.time}</span>
                                </div>

                                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg">
                                    Continue Learning →
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-4">

                {/* Materials */}
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                    <div>
                        <h2 className="font-semibold">Course Materials</h2>
                        <p className="text-sm text-gray-500">Video lectures, PDFs, and presentation slides</p>
                    </div>

                    {materials.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.sub}</p>
                            </div>
                            <Download size={16} className="text-gray-500" />
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                    <div>
                        <h2 className="font-semibold">Practice Exercises</h2>
                        <p className="text-sm text-gray-500">Assignments and practice tests</p>
                    </div>

                    {exercises.map((ex, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">{ex.title}</p>
                                <p className="text-xs text-gray-500">{ex.sub}</p>
                            </div>

                            <button className={`text-xs px-3 py-1 rounded-full ${ex.type === 'Start' ? 'bg-blue-600 text-white' : 'bg-green-100 text-green-600'}`}>
                                {ex.type}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default CoursesSection