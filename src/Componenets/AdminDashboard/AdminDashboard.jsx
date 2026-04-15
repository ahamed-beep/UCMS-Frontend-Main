import React from "react";
import DashboardLayout from "../../ResuableUi/DashboardLayout";
import { getUser } from "../../Utils/Auth";
import { useLogout } from "../../Hooks/useLogout";
import AdminUserManagement from "./Pages/Adminusermanagement/Adminusermanagement";
import ManageServices from "./Pages/ServiceManagement/ManageServices";
import ContactMessages from "./Pages/MessageCenter/MessageCenter";
import GalleryManagePage from "./Pages/AdminGalleryPage/GalleryManagePage";
import ConsultationsPage from "./Pages/AdminConsultation/AdminConsultation";


const OverviewPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Admin Overview</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Manage the entire platform from here</p>
  </div>
);

const UsersPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <AdminUserManagement />
  </div>
);

const ServicesPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ManageServices />
  </div>
);

const AnalyticsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <GalleryManagePage />
  </div>
);

const ContactUsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <ContactMessages />
  </div>
);

const ConsultationsWrapper = () => (
  <div className="px-5 py-7 sm:px-8">
    <ConsultationsPage />
  </div>
);

const TestimonialsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Testimonials</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Student reviews aur feedback manage karein</p>
  </div>
);

const BlogPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Blog & News</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Articles aur announcements publish karein</p>
  </div>
);

const FAQsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">FAQs</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Frequently asked questions manage karein</p>
  </div>
);

const ApplicationsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Applications</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Student applications track karein</p>
  </div>
);

const NotificationsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Notifications</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Platform notifications aur alerts manage karein</p>
  </div>
);

const SettingsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Settings</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Platform ki tafseelat yahan update karein</p>
  </div>
);

const adminMenuItems = [
  {
    label: "Overview",
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
    label: "Users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Consultations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
  {
    label: "Applications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 18h16" />
        <path d="M6 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    label: "Blog & News",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z" />
      </svg>
    ),
  },
  {
    label: "Testimonials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
  },
  {
    label: "FAQs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    label: "Contact Us",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const adminPages = {
  "Overview":      OverviewPage,
  "Users":         UsersPage,
  "Consultations": ConsultationsWrapper,
  "Applications":  ApplicationsPage,
  "Services":      ServicesPage,
  "Blog & News":   BlogPage,
  "Testimonials":  TestimonialsPage,
  "FAQs":          FAQsPage,
  "Gallery":       AnalyticsPage,
  "Contact Us":    ContactUsPage,
  "Notifications": NotificationsPage,
  "Settings":      SettingsPage,
};

export default function AdminDashboard() {
  const userData = getUser();
  const logout = useLogout();

  const user = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    email: userData?.email,
    portalLabel: "Admin Portal",
  };

  return (
    <DashboardLayout
      menuItems={adminMenuItems}
      pages={adminPages}
      onLogout={logout}
      user={user}
    />
  );
}