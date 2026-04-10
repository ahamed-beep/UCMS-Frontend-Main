import React from "react";
import { useLogout } from "../../Hooks/useLogout";
import DashboardLayout from "../../ResuableUi/DashboardLayout";
import { getUser } from "../../Utils/Auth";


const DashboardPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Welcome Back, John!</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Here's what's happening with your applications and classes</p>
    {/* apna dashboard content yahan */}
  </div>
);

const MyCoursesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a]">My Courses</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">All your enrolled courses</p>
  </div>
);

const ApplicationsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a]">Applications</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Manage your university applications</p>
  </div>
);


const studentMenuItems = [
  {
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "My Courses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M2.5 6.5A2.5 2.5 0 0 1 5 4h5v16H5a2.5 2.5 0 0 0-2.5 2z" />
        <path d="M21.5 6.5A2.5 2.5 0 0 0 19 4h-5v16h5a2.5 2.5 0 0 1 2.5 2z" />
      </svg>
    ),
  },
  {
    label: "Applications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5" />
        <path d="M9 12h6" /><path d="M9 16h6" />
      </svg>
    ),
  },
];


const studentPages = {
  "Dashboard":    DashboardPage,
  "My Courses":   MyCoursesPage,
  "Applications": ApplicationsPage,
};


export default function StudentDashboard() {
  const userData = getUser();
    const logout = useLogout();

  const user = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    email: userData?.email,
    portalLabel: "Student Portal",
  };

  return (
    <DashboardLayout
      menuItems={studentMenuItems}
      pages={studentPages}
      onLogout={logout}
      user={user}
        
    />
  );
}