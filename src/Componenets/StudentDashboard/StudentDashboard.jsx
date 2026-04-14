import React from "react";
import { useLogout } from "../../Hooks/useLogout";
import DashboardLayout from "../../ResuableUi/DashboardLayout";
import { getUser } from "../../Utils/Auth";


const DashboardPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Welcome Back, John!</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Here's what's happening with your applications and classes</p>
    {/* apna dashboard content yahan */}
  </div>
);

const MyCoursesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">My Courses</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Access your enrolled courses and learning materials</p>
  </div>
);

const AssignmentsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Assignments</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Upload assignments and track submission status</p>
  </div>
);

const QuizzesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Quizzes & Mock Tests</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Test your knowledge and track your progress</p>
  </div>
);

const ProgressPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Progress Tracking</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Monitor your learning progress</p>
  </div>
);

const ApplicationsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Application Status</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Track your university applications and visa processing</p>
  </div>
);

const DocumentsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Documents</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Upload and manage your application documents</p>
  </div>
);

const AppointmentPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Class Schedule</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">View your IELTS/PTE classes and study materials</p>
  </div>
);

const ClassSchedulePage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Class Schedule</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">View your IELTS/PTE classes and study materials</p>
  </div>
);

const SupportPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Support & Help</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Get assistance and find answers to common questions</p>
  </div>
);

const PurchasesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="font-inter text-[25px] md:text-[30px] font-bold tracking-[-0.03em] text-[#101828]">Purchases & Billing</h1>
    <p className="font-inter font-normal text-[14px] md:text-[16px] text-[#4A5565]">Manage your course purchases and payment history</p>
  </div>
);


const studentMenuItems = [
  {
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
  },
  {
    label: "My Courses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M3 5a2 2 0 0 1 2-2h6v18H5a2 2 0 0 0-2 2V5z" />
        <path d="M21 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 1 2 2V5z" />
      </svg>
    ),
  },
  {
    label: "Assignments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
        <path d="M8 9h4" />
      </svg>
    ),
  },
  {
    label: "Quizzes & Tests",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M9 3c-2 0-4 2-4 4 0 1 .5 2 1.2 2.7C5.5 10.3 5 11.1 5 12c0 1.7 1.3 3 3 3h1v5" />
        <path d="M9 3c1.5 0 2.5 1 2.5 2.5S10.5 8 9 8" />

        <path d="M15 3c2 0 4 2 4 4 0 1-.5 2-1.2 2.7.7.6 1.2 1.4 1.2 2.3 0 1.7-1.3 3-3 3h-1v5" />
        <path d="M15 3c-1.5 0-2.5 1-2.5 2.5S13.5 8 15 8" />

        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    label: "Progress",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="10" width="4" height="10" rx="1" />
        <rect x="10" y="6" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="17" rx="1" />
      </svg>
    ),
  },
  {
    label: "Applications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
        <path d="M14 2v5h5" />

        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    ),
  },
  {
    label: "Documents",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M12 3l4 4h-3v6h-2V7H8l4-4z" />
        <rect x="4" y="17" width="16" height="4" rx="1" />
      </svg>
    ),
  },
  {
    label: "Appointments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <circle cx="12" cy="16" r="3" />
        <path d="M12 14v2l1.5 1" />
      </svg>
    ),
  },
  {
    label: "Class Schedule",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <path d="M3 10h18" />
        <path d="M8 14h2" />
        <path d="M12 14h2" />
        <path d="M16 14h2" />
        <path d="M8 18h2" />
        <path d="M12 18h2" />
        <path d="M16 18h2" />
      </svg>
    ),
  },
  {
    label: "Support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.8.6-1.5 1.2-1.5 2" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
  },
  {
    label: "Purchases",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
];


const studentPages = {
  "Dashboard": DashboardPage,
  "My Courses": MyCoursesPage,
  "Assignments": AssignmentsPage,
  "Quizzes & Tests": QuizzesPage,
  "Progress": ProgressPage,
  "Applications": ApplicationsPage,
  "Documents": DocumentsPage,
  "Appointments": AppointmentPage,
  "Class Schedule": ClassSchedulePage,
  "Support": SupportPage,
  "Purchases": PurchasesPage,
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