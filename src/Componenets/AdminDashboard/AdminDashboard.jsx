import React from "react";
import DashboardLayout from "../../ResuableUi/DashboardLayout";
import { getUser } from "../../Utils/Auth";
import { useLogout } from "../../Hooks/useLogout";
import AdminUserManagement from "./Pages/Adminusermanagement/Adminusermanagement";
import ManageServices from "./Pages/ServiceManagement/ManageServices";
import ContactMessages from "./Pages/MessageCenter/MessageCenter";
import GalleryManagePage from "./Pages/AdminGalleryPage/GalleryManagePage";


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
   <GalleryManagePage/>
  </div>
);

const SettingsPage = () => (
  <div className="px-5 py-7 sm:px-8">
    <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Settings</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Platform ki tafseelat yahan update karein</p>
  </div>
);

const ContactUsPage = () => (
  <div className="px-5 py-7 sm:px-8">
  <ContactMessages/>
  </div>
);


// ─── Admin Menu ────────────────────────────────────────────
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
    label: "Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 18h16" />
        <path d="M6 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
    {
    label: "Contact Us",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 4 4-6" />
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
  "Overview":   OverviewPage,
  "Users":      UsersPage,
    "Services":   ServicesPage,
      "Contact Us": ContactUsPage,  
  "Analytics":  AnalyticsPage,
  "Settings":   SettingsPage,

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