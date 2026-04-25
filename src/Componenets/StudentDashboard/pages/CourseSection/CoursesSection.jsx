import React from 'react'
import { BookOpen, Clock, Download } from 'lucide-react'
import { courses, exercises, materials } from './CourseConstant';
import { Link } from 'react-router-dom';



const CoursesSection = () => {
    return (
        <div className='py-2 md:py-4 space-y-2 md:space-y-4'>
            <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
                <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Enrolled Courses</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {courses.map((course, i) => (
                        <div key={i} className="border-[0.89px] border-[#E5E7EB] rounded-[10px] p-5 space-y-3">

                            <div className="flex flex-col gap-2 lg:flex-row justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 bg-[#E3EDF7] rounded-xl flex items-center justify-center">
                                        <BookOpen size={24} className='text-[#0F4C8A]' />
                                    </div>
                                    <div>
                                        <p className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">{course.title}</p>
                                        <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{course.teacher}</p>
                                    </div>
                                </div>

                                <span className={`font-inter font-medium text-[10px] md:text-[12px] self-end md:self-auto sm:text-xs md:text-sm px-2 py-1 sm:px-3 rounded-full whitespace-nowrap ${course.status === 'Completed' ? 'bg-[#DCFCE7] text-[#008236]' : 'bg-[#0F4C8A] text-white'}`}>
                                    {course.status}
                                </span>
                            </div>

                            <div className="flex justify-between font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                                <span>Progress: {course.progress}%</span>
                                <span>{course.lectures}</span>
                            </div>

                            <div className="w-full bg-[#E5E7EB] h-2 rounded-full">
                                <div
                                    className="bg-[#0F4C8A] h-2 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>

                            <div className="flex flex-col gap-4 md:flex-row justify-between items-center pt-2">
                                <div className="flex items-center gap-2 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]    ">
                                    <Clock size={16} />
                                    <span>{course.time}</span>
                                </div>
<Link to={`/course/${course.slug}`}>

                                <button className="font-inter font-normal md:text-sm w-full sm:w-auto not-only:text-[12px] sm:text-sm px-3 py-2 sm:px-4 rounded-lg sm:rounded-[10px] bg-[#FF6B35] hover:bg-orange-600 text-white whitespace-nowrap transition ">
                                    Continue Learning →
                                </button>
</Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">

                {/* Materials */}
                <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
                    <div className='border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-5'>
                        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Course Materials</h2>
                        <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">Video lectures, PDFs, and presentation slides</p>
                    </div>

                    {materials.map((item, i) => {
                        let path;

                        if (item.type === "video") {
                            path = "/Images/video.webp"
                        } else if (item.type === "pdf") {
                            path = "/Images/pdf.webp"
                        } else {
                            path = "/Images/play.webp"
                        }

                        return (
                            <div key={i} className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[10px]">
                                <div className='flex items-center gap-2'>
                                    <img src={path} alt="icon" className='w-5 h-5'></img>
                                    <div>
                                        <p className="font-inter font-medium text-[12px] md:text-sm text-[#101828]">{item.title}</p>
                                        <p className="font-inter font-normal md:text-[12px] text-[10px] text-[#6A7282]">{item.sub}</p>
                                    </div>
                                </div>
                                <Download size={16} className="text-[#4A5565]" />
                            </div>
                        )
                    })}
                </div>
                <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
                    <div className='border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-5'>
                        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Practice Exercises</h2>
                        <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">Assignments and practice tests</p>
                    </div>

                    {exercises.map((ex, i) => {
                        let path;

                        if (ex.type === "Start") {
                            path = "/Images/success.webp";
                        } else if (ex.type === "Review") {
                            path = "/Images/error.webp";
                        }

                        return (
                            <div key={i} className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[10px]">
                                <div className='flex items-center gap-2'>
                                    <img src={path} alt="icon" className='w-5 h-5'></img>
                                    <div>
                                        <p className="font-inter font-medium text-[12px] md:text-sm text-[#101828]">{ex.title}</p>
                                        <p className="font-inter font-normal md:text-[12px] text-[10px] text-[#6A7282]">{ex.sub}</p>
                                    </div>
                                </div>

                                <button className={`font-inter font-medium text-[10px] md:text-[12px] px-3 py-1 rounded-full ${ex.type === 'Start' ? 'bg-[#155DFC] text-white' : 'bg-[#DCFCE7] text-[#008236]'}`}>
                                    {ex.type}
                                </button>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default CoursesSection