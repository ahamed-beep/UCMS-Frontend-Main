import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";

const relativeTime = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

const STATUS_CONFIG = {
  new:     { label: "New",     cls: "bg-blue-100 text-blue-800"     },
  read:    { label: "Read",    cls: "bg-gray-100 text-gray-600"     },
  replied: { label: "Replied", cls: "bg-green-100 text-green-800"   },
  closed:  { label: "Closed",  cls: "bg-yellow-100 text-yellow-800" },
};

export default function ContactMessages() {
  const [messages, setMessages]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [error, setError]             = useState("");
  const [search, setSearch]           = useState("");

  const totalCount  = messages.length;
  const unreadCount = messages.filter((m) => !m.isRead).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return messages;
    return messages.filter(
      (m) =>
        m.fullName?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q)
    );
  }, [messages, search]);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/contact/admin/messages");
      setMessages(data.data || []);
    } catch (error) {
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleView = async (msg) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      try {
        await axiosInstance.patch(`/contact/admin/messages/${msg.id}/read`);
        const markRead = (m) =>
          m.id === msg.id
            ? { ...m, isRead: true, status: m.status === "new" ? "read" : m.status }
            : m;
        setMessages((prev) => prev.map(markRead));
        setSelectedMsg((prev) => markRead(prev));
      } catch {}
    }
  };

  const handleDelete = async (msg) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axiosInstance.delete(`/contact/admin/messages/${msg.id}`);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    } catch {
      alert("Failed to delete message. Please try again.");
    }
  };

  const columns = [
    {
      key: "fullName",
      label: "Name",
      width: "22%",
      render: (row) => (
        <div>
          <p className="text-sm font-medium truncate m-0">{row.fullName}</p>
          <p className="text-xs text-gray-500 m-0">{relativeTime(row.createdAt)}</p>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      width: "24%",
      render: (row) => (
        <span className="text-xs text-gray-500 truncate block">{row.email}</span>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      width: "24%",
      render: (row) => (
        <span className="text-xs truncate block">{row.subject}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "14%",
      render: (row) => {
        const cfg = STATUS_CONFIG[row.status] || STATUS_CONFIG.read;
        return (
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${cfg.cls}`}>
            {cfg.label}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      width: "16%",
      render: (row) => (
        <div className="flex gap-1.5">
          <button
            title="View message"
            onClick={(e) => { e.stopPropagation(); handleView(row); }}
            className="border border-gray-200 rounded-md p-1.5 inline-flex items-center text-xs text-gray-500 hover:bg-gray-50 cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <button
            title="Delete message"
            onClick={(e) => { e.stopPropagation(); handleDelete(row); }}
            className="border border-gray-200 rounded-md p-1.5 inline-flex items-center text-xs text-red-500 hover:bg-red-50 cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-medium m-0">Contact messages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all incoming contact form submissions</p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 bg-[#f8fafc] focus:outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A]"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-3.5 py-2.5 text-sm mb-4 flex justify-between items-center">
          {error}
          <button onClick={() => { setError(""); fetchMessages(); }} className="text-xs cursor-pointer">
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Total messages", value: totalCount,  valueClass: "text-gray-900" },
          { label: "New / unread",   value: unreadCount, valueClass: "text-blue-600" },
        ].map(({ label, value, valueClass }) => (
          <div key={label} className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1.5">{label}</p>
            <p className={`text-3xl font-medium ${valueClass}`}>{value}</p>
          </div>
        ))}
      </div>

      <AdminTable
        columns={columns}
        rows={filtered.map((m) => ({ ...m, _key: m.id }))}
        loading={loading}
        emptyText="No messages found."
        rowStyle={(row) => (!row.isRead ? { background: "var(--color-background-info)" } : {})}
      />

      {selectedMsg && (
        <div
          onClick={() => setSelectedMsg(null)}
          className="fixed inset-0 bg-black/35 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-gray-100 rounded-xl p-6 w-[480px] max-w-[92vw]"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium m-0">{selectedMsg.fullName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{selectedMsg.email} · {selectedMsg.phone}</p>
              </div>
              {(() => {
                const cfg = STATUS_CONFIG[selectedMsg.status] || STATUS_CONFIG.read;
                return (
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${cfg.cls}`}>
                    {cfg.label}
                  </span>
                );
              })()}
            </div>

            <div className="border-t border-gray-100 pt-3 mb-3">
              <p className="text-xs text-gray-500 mb-1">Subject</p>
              <p className="text-sm font-medium">{selectedMsg.subject}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm leading-relaxed">{selectedMsg.message}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">{relativeTime(selectedMsg.createdAt)}</p>
              <button onClick={() => setSelectedMsg(null)} className="text-sm cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}