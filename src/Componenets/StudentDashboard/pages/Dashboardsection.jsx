import React from 'react'
import { CheckCircle, Clock, FileText, Calendar, XCircle } from "lucide-react";
import { IoMdArrowForward } from 'react-icons/io';
import { notifications } from '../constants/Constant';

const stats = [
    { title: "Active Applications", value: 3, sub: "+2 this month", icon: FileText, color: "bg-blue-500" },
    { title: "Upcoming Classes", value: 5, sub: "Next class tomorrow", icon: Calendar, color: "bg-green-500" },
    { title: "Documents Uploaded", value: 12, sub: "3 pending review", icon: CheckCircle, color: "bg-purple-500" },
    { title: "Appointments", value: 2, sub: "1 scheduled", icon: Clock, color: "bg-orange-500" },
];

const Dashboardpage = () => {
    return (
        <div className='py-2 md:py-4 space-y-2 md:space-y-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {stats.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
                            <div className="p-5 flex flex-col items-center md:items-start gap-3">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-[10px] text-white ${item.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="font-inter font-bold text-[20px] md:text-[24px] text-[#101828]">{item.value}</div>
                                <div className="font-inter font-medium text-[12px] md:text-[14px] text-[#4A5565]">{item.title}</div>
                                <div className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">{item.sub}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 ">
                {/* Applications */}
                <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm pb-5">
                    <div className="mx-5 space-y-4">
                        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] border-b-[0.89px] py-5 ps-5 border-[#E5E7EB] -mx-5">Recent Applications</h2>

                        {[
                            { name: "University of Manchester", country: "UK", status: "In Progress", color: "bg-[#DBEAFE] text-[#1447E6]" },
                            { name: "University of Toronto", country: "Canada", status: "Under Review", color: "bg-[#FEF9C2] text-[#A65F00]" },
                            { name: "Australian National University", country: "Australia", status: "Accepted", color: "bg-[#DCFCE7] text-[#008236]" },
                        ].map((app, i) => (
                            <div key={i} className="p-4 rounded-[10px] bg-[#F9FAFB] flex flex-col md:flex-row gap-1 justify-between items-start md:items-center">
                                <div>
                                    <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">{app.name}</p>
                                    <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565] ">{app.country}</p>
                                    <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282] ">Applied: date</p>
                                </div>
                                <span className={`px-3 py-1 font-inter font-medium text-[10px] md:text-[12px] rounded-full ${app.color}`}>{app.status}</span>
                            </div>
                        ))}

                        <div className="font-inter font-medium md:text-sm text-[12px] text-[#155DFC] text-center cursor-pointer">View All Applications →</div>
                    </div>
                </div>

                {/* Classes */}
                <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm pb-5">
                    <div className="mx-5 space-y-4">
                        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]  border-b-[0.89px] py-5 ps-5 border-[#E5E7EB] -mx-5">Upcoming Classes</h2>

                        {[
                            { title: "IELTS Speaking Practice", teacher: "Dr. Sarah Johnson", time: "Tomorrow, 2:00 PM", duration: "2 hours" },
                            { title: "PTE Writing Workshop", teacher: "Prof. Michael Chen", time: "March 8, 10:00 AM", duration: "3 hours" },
                        ].map((cls, i) => (
                            <div key={i} className="p-4 rounded-[10px] bg-[#F9FAFB] flex justify-between items-center">
                                <div className='w-full'>
                                    <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">{cls.title}</p>
                                    <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{cls.teacher}</p>
                                    <div className='flex justify-between items-center pr-0'>
                                        <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">{cls.time}</p>
                                        <span className="font-inter font-normal text-[10px] md:text-[12px] text-[#155DFC]">{cls.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="font-inter font-medium md:text-sm text-[12px] text-[#155DFC] text-center cursor-pointer">View Full Schedule →</div>
                    </div>
                </div>
            </div>
            <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm pb-5">
                <div className="mx-5 space-y-4">
                    <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]  border-b-[0.89px] py-5 ps-5 border-[#E5E7EB] -mx-5">Recent Notifications</h2>

                    {notifications.map((note, i) => {
                        let path;

                        if (note.status === "fulfilled") {
                            path = "/Images/success.webp"
                        } else if (note.status === "pending") {
                            path = "/Images/pending.webp"
                        } else {
                            path = "/Images/error.webp"
                        }

                        return (
                            <div>
                                <div key={i} className="flex items-center gap-3">
                                    <img src={path} width={20} height={20} className='flex-start'></img>
                                    <div>
                                        <p className='font-inter font-normal text-[12px] md:text-sm text-[#101828]'>{note.message}</p>
                                        <p className='font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]'>{note.time}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="rounded-[10px] p-6 bg-gradient-to-r from-[#155DFC] to-[#9810FA] shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] flex flex-col gap-5  md:flex-row justify-between items-center">
                <div className="space-y-2 max-w-md">
                    <div className='flex gap-2'>
                        <img src="/Images/catalog.webp" alt="catalog" className='w-5 h-5 sm:w-8 sm:h-8 '/>
                        <h2 className="font-inter font-bold text-[18px] md:text-[24px] text-white">Explore Our Course Catalog</h2>
                    </div>
                    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#DBEAFE]">Browse IELTS, PTE, TOEFL courses designed to help you achieve your goals.</p>
                    <button className='flex font-inter font-semibold text-[14px] md:text-[16px] bg-white text-[#0F4C8A] text-start rounded-[10px] py-3 px-4 mt-5 cursor-pointer'>Browse Courses <IoMdArrowForward className=' ml-2' size={20} /></button>
                </div>
                <div className="bg-white/10 p-4 md:p-6 rounded-xl text-center">
                    <p className="font-inter font-normal text-[12px] md:text-sm text-[#DBEAFE]">Featured Offer</p>
                    <p className="font-inter font-bold text-[28px] md:text-[30px] text-white">40% OFF</p>
                    <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#DBEAFE]">On IELTS Preparation</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboardpage