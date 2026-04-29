import React, { useState } from "react";

const renderPage = (activePage, pages) => {
  const Component = pages[activePage];
  return Component ? <Component /> : null;
};

export default function DashboardLayout({ menuItems, pages, user, onLogout }) {
  const firstPage = Object.keys(pages)[0];
  const [activePage, setActivePage] = useState(firstPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <div className="flex min-h-screen">

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={[
            "fixed inset-y-0 left-0 z-30 w-[255px] shrink-0 border-r border-[#e2e8f0] bg-white flex flex-col transition-transform duration-300",
            "lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-[68px] items-center justify-between border-b border-[#e2e8f0] px-6">
            <div className="flex items-center gap-2">
              <div className="">
                <img src="/Images/Logo.webp" className="h-9 w-11" />
              </div>
              <div>
                <div className="text-[14px] font-bold leading-none text-[#0f172a]">Upskills</div>
                <div className="mt-1 text-[12px] leading-none text-[#64748b]">{user.portalLabel}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-[#64748b] hover:bg-[#f1f5f9]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1.5">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePage(item.label);
                      setSidebarOpen(false);
                    }}
                    className={[
                      "flex h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-[15px] font-medium transition-colors",
                      activePage === item.label
                        ? "bg-[#1f5a99] text-white"
                        : "text-[#0f172a] hover:bg-[#f1f5f9]",
                    ].join(" ")}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:hidden border-t border-[#e2e8f0] px-4 py-4">
            <button
              type="button"
              onClick={onLogout}
              className="flex h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-[15px] font-medium text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 shrink-0">
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H4" />
                <path d="M20 4v16" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">

          <header className="flex h-[68px] justify-between items-center gap-4 border-b border-[#e2e8f0] bg-white px-5 sm:px-8">

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-[#475569] hover:bg-[#f1f5f9]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="lg:hidden  flex-1 text-[15px] font-semibold text-[#0f172a]">
              {user.name}
              <div className="mt-1 text-[14px] text-[#64748b]">{user.email}</div>
            </div>

            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <div className="text-right leading-tight">
                <div className="text-[17px] font-semibold text-[#0f172a]">{user.name}</div>
                <div className="mt-1 text-[14px] text-[#64748b]">{user.email}</div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eff6ff] text-[#1f5a99]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#475569] transition-colors hover:bg-[#f1f5f9]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H4" />
                  <path d="M20 4v16" />
                </svg>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            {renderPage(activePage, pages)}
          </main>

        </div>
      </div>
    </div>
  );
}