import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, FileText, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { IoMdArrowForward } from 'react-icons/io';
import RecentNotification from './RecentNotification';
import axiosInstance from '../../../../Api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const statusStyles = {
  'In Progress': 'bg-[#DBEAFE] text-[#1447E6]',
  'Under Review': 'bg-[#FEF9C2] text-[#A65F00]',
  'Accepted': 'bg-[#DCFCE7] text-[#008236]',
  'Rejected': 'bg-[#FFE2E2] text-[#C10007]',
};

const Dashboardpage = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    upcomingClasses: 0,
    documentsUploaded: 0,
    totalNotifications: 0,
    recentApplications: [],
    upcomingClassList: [],
  });
  const [showAllApps, setShowAllApps] = useState(false);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const navigiate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/dashboard/stats');
        setStats(res.data.data ?? res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Active Applications", value: stats.totalApplications, sub: "Total applications", icon: FileText, color: "bg-blue-500" },
    { title: "Upcoming Classes", value: stats.upcomingClasses, sub: "Enrolled courses", icon: Calendar, color: "bg-green-500" },
    { title: "Documents Uploaded", value: stats.documentsUploaded, sub: "Total documents", icon: CheckCircle, color: "bg-purple-500" },
    { title: "Notifications", value: stats.totalNotifications, sub: "Total received", icon: Clock, color: "bg-orange-500" },
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatClassTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
      ', ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const visibleApps = showAllApps ? stats.recentApplications : stats.recentApplications.slice(0, 3);
  const visibleClasses = showAllClasses ? stats.upcomingClassList : stats.upcomingClassList.slice(0, 2);

  return (
    <div className='py-2 md:py-4 space-y-2 md:space-y-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {statCards.map((item, i) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">

        {/* Recent Applications */}
        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm pb-5">
          <div className="mx-5 space-y-4">
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] border-b-[0.89px] py-5 ps-5 border-[#E5E7EB] -mx-5">
              Recent Applications
            </h2>
            {stats.recentApplications.length === 0 ? (
              <p className="text-sm text-[#6A7282] text-center py-4">No applications yet.</p>
            ) : (
              <>
                {visibleApps.map((app, i) => (
                  <div key={app._id ?? i} className="p-4 rounded-[10px] bg-[#F9FAFB] flex flex-col md:flex-row gap-1 justify-between items-start md:items-center">
                    <div>
                      <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">{app.university}</p>
                      <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{app.country}</p>
                      <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">Applied: {formatDate(app.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 font-inter font-medium text-[10px] md:text-[12px] rounded-full whitespace-nowrap ${statusStyles[app.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {app.status}
                    </span>
                  </div>
                ))}

                {stats.recentApplications.length > 3 ? (
                  <button
                    onClick={() => onNavigate('Applications')}
                    className="w-full flex items-center justify-center gap-1 font-inter font-medium md:text-sm text-[12px] text-[#155DFC] py-1 hover:underline"
                  >
                    <ChevronDown size={16} /> View All Applications ({stats.recentApplications.length})
                  </button>
                ) : (
                  <div
                    onClick={() => onNavigate('Applications')}
                    className="font-inter font-medium md:text-sm text-[12px] text-[#155DFC] text-center cursor-pointer hover:underline"
                  >
                    View All Applications →
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm pb-5">
          <div className="mx-5 space-y-4">
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] border-b-[0.89px] py-5 ps-5 border-[#E5E7EB] -mx-5">
              Upcoming Classes
            </h2>
            {stats.upcomingClassList.length === 0 ? (
              <p className="text-sm text-[#6A7282] text-center py-4">No upcoming classes.</p>
            ) : (
              <>
                {visibleClasses.map((cls, i) => (
                  <div key={cls._id ?? i} className="p-4 rounded-[10px] bg-[#F9FAFB] flex justify-between items-center">
                    <div className='w-full'>
                      <p className="font-inter font-medium text-[16px] md:text-[18px] text-[#101828]">{cls.title}</p>
                      <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                        {cls.courseId?.teacher ?? '—'}
                      </p>
                      <div className='flex justify-between items-center'>
                        <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282]">{formatClassTime(cls.scheduledAt)}</p>
                        <span className="font-inter font-normal text-[10px] md:text-[12px] text-[#155DFC]">{cls.durationMinutes} mins</span>
                      </div>
                    </div>
                  </div>
                ))}

                {stats.upcomingClassList.length > 2 ? (
                  <button
                    onClick={() => onNavigate('Class Schedule')}
                    className="w-full flex items-center justify-center gap-1 font-inter font-medium md:text-sm text-[12px] text-[#155DFC] py-1 hover:underline"
                  >
                    <ChevronDown size={16} /> View Full Schedule ({stats.upcomingClassList.length})
                  </button>
                ) : (
                  <div
                    onClick={() => onNavigate('Class Schedule')}
                    className="font-inter font-medium md:text-sm text-[12px] text-[#155DFC] text-center cursor-pointer hover:underline"
                  >
                    View Full Schedule →
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <RecentNotification />

    
    </div>
  );
};

export default Dashboardpage;