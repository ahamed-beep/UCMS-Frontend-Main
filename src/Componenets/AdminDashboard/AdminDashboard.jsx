import React from "react";
import DashboardLayout from "../../ResuableUi/DashboardLayout";
import { getUser } from "../../Utils/Auth";
import { useLogout } from "../../Hooks/useLogout";
import AdminUserManagement from "./Pages/Adminusermanagement/Adminusermanagement";
import ManageServices from "./Pages/ServiceManagement/ManageServices";


const OverviewPage = () => (
  <div className="px-5 py-7 sm:px-8">
   <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#0f172a] sm:text-[42px]">Admin Overview</h1>
    <p className="mt-2 text-[16px] text-[#64748b]">Manage the entire platform from here</p> 
  </div>
);

const UsersPage = () => (
  <div className="px-5 py-7 sm:px-8">
   <AdminUserManagement/> 
  </div>
);

const ReportsPage = () => (
  <div className="px-5 py-7 sm:px-8">
 <ManageServices/>
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
    label: "Reports",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M4 18h16" />
        <path d="M6 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
];


const adminPages = {
  "Overview": OverviewPage,
  "Users":    UsersPage,
  "Reports":  ReportsPage,
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