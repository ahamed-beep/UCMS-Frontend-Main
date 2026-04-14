import React from 'react'
import { CheckCircle, Clock, FileText, Calendar } from "lucide-react";
import { IoMdArrowForward } from 'react-icons/io';

const stats = [
    { title: "Active Applications", value: 3, sub: "+2 this month", icon: FileText, color: "bg-blue-500" },
    { title: "Upcoming Classes", value: 5, sub: "Next class tomorrow", icon: Calendar, color: "bg-green-500" },
    { title: "Documents Uploaded", value: 12, sub: "3 pending review", icon: CheckCircle, color: "bg-purple-500" },
    { title: "Appointments", value: 2, sub: "1 scheduled", icon: Clock, color: "bg-orange-500" },
];

const Dashboardpage = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="rounded-2xl shadow-sm">
                            <div className="p-5 flex flex-col gap-3">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-white ${item.color}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="text-2xl font-semibold">{item.value}</div>
                                <div className="text-sm font-medium">{item.title}</div>
                                <div className="text-xs text-gray-400">{item.sub}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applications */}
                <div className="rounded-2xl">
                    <div className="p-5 space-y-4">
                        <h2 className="text-lg font-semibold">Recent Applications</h2>

                        {[
                            { name: "University of Manchester", status: "In Progress", color: "bg-blue-100 text-blue-600" },
                            { name: "University of Toronto", status: "Under Review", color: "bg-yellow-100 text-yellow-600" },
                            { name: "Australian National University", status: "Accepted", color: "bg-green-100 text-green-600" },
                        ].map((app, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{app.name}</p>
                                    <p className="text-sm text-gray-500">Applied date</p>
                                </div>
                                <span className={`px-3 py-1 text-xs rounded-full ${app.color}`}>{app.status}</span>
                            </div>
                        ))}

                        <div className="text-blue-600 text-sm cursor-pointer">View All Applications →</div>
                    </div>
                </div>

                {/* Classes */}
                <div className="rounded-2xl">
                    <div className="p-5 space-y-4">
                        <h2 className="text-lg font-semibold">Upcoming Classes</h2>

                        {[
                            { title: "IELTS Speaking Practice", teacher: "Dr. Sarah Johnson", time: "Tomorrow, 2:00 PM", duration: "2 hours" },
                            { title: "PTE Writing Workshop", teacher: "Prof. Michael Chen", time: "March 8, 10:00 AM", duration: "3 hours" },
                        ].map((cls, i) => (
                            <div key={i} className="p-4 rounded-xl bg-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{cls.title}</p>
                                    <p className="text-sm text-gray-500">{cls.teacher}</p>
                                    <p className="text-xs text-gray-400">{cls.time}</p>
                                </div>
                                <span className="text-blue-600 text-sm">{cls.duration}</span>
                            </div>
                        ))}

                        <div className="text-blue-600 text-sm cursor-pointer">View Full Schedule →</div>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl">
                <div className="p-5 space-y-4">
                    <h2 className="text-lg font-semibold">Recent Notifications</h2>

                    {[
                        "Your application to University of Manchester has been updated",
                        "Upload missing transcript for visa application",
                        "Appointment confirmed with counselor on March 8",
                    ].map((note, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <p>{note}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-2xl p-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 flex justify-between items-center">
                <div className="space-y-2 max-w-md">
                    <h2 className="text-xl font-semibold">Explore Our Course Catalog</h2>
                    <p className="text-sm opacity-90">Browse IELTS, PTE, TOEFL courses designed to help you achieve your goals.</p>
                    <a href='/services' className='flex justify-center items-center font-inter font-semibold text-[14px] md:text-[16px] text-[#0F4C8A] mt-10'>View All Services<IoMdArrowForward className=' ml-2' size={20} /></a>
                </div>
                <div className="bg-white/20 p-5 rounded-xl text-center">
                    <p className="text-sm">Featured Offer</p>
                    <p className="text-2xl font-bold">40% OFF</p>
                    <p className="text-xs">On IELTS Preparation</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboardpage