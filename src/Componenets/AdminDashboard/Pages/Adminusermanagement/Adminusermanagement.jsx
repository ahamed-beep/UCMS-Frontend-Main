import { useState } from "react";
import CreateUser from "./Createuser";
import ManageUsers from "./Manageusers";

const AdminUserManagement = () => {
  const [tab, setTab] = useState("create");

  const tabs = [
    { key: "create", label: "Create user" },
    { key: "manage", label: "Manage users" },
  ];

  return (
    <div className="font-inter">
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-[14px] border-b-2 transition-colors -mb-px ${
              tab === t.key
                ? "border-[#0F4C8A] text-[#0F4C8A] font-medium"
                : "border-transparent text-[#64748b] hover:text-[#0A0A0A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "create" && <CreateUser />}
      {tab === "manage" && <ManageUsers />}
    </div>
  );
};

export default AdminUserManagement;