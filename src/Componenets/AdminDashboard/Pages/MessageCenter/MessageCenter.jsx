import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import { toast } from "react-toastify";

const relativeTime = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

const STATUS_CONFIG = {
  new: { label: "New", cls: "bg-blue-100 text-blue-800" },
  read: { label: "Read", cls: "bg-gray-100 text-gray-600" },
  replied: { label: "Replied", cls: "bg-green-100 text-green-800" },
  closed: { label: "Closed", cls: "bg-yellow-100 text-yellow-800" },
};

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [error, setError] = useState("");

  const [deleteSelected, setDeleteSelected] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => !m.isRead).length;

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/contact/admin/messages");
      setMessages(data.data || []);

      if (!data.data || data.data.length === 0) {
        console.log("No messages found in response");
      }
    } catch (error) {
      console.error("Fetch error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
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
      } catch (error) {
        console.error('Mark as read error:', error);
      }
    }
  };

  const handleDelete = async (msg) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/contact/admin/messages/${msg.id}`);
      toast.success("Message deleted successfully");
      setDeleteSelected(null);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("Failed to delete message. Please try again.");
    } finally {
      setDeleteLoading(false);
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
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            title="Delete message"
            onClick={(e) => { e.stopPropagation(); setDeleteSelected(row) }}
            className="border border-gray-200 rounded-md p-1.5 inline-flex items-center text-xs text-red-500 hover:bg-red-50 cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-medium m-0 wrap-break-word">Contact messages</h1>
        <p className="text-sm text-gray-500 mt-1 wrap-break-word">Manage all incoming contact form submissions</p>
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
          { label: "Total messages", value: totalCount, valueClass: "text-gray-900" },
          { label: "New / unread", value: unreadCount, valueClass: "text-blue-600" },
        ].map(({ label, value, valueClass }) => (
          <div key={label} className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1.5">{label}</p>
            <p className={`text-3xl font-medium ${valueClass} break-all`}>{value}</p>
          </div>
        ))}
      </div>

      <AdminTable
        columns={columns}
        rows={messages.map((m) => ({ ...m, _key: m.id }))}
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

      <DeleteModal
        selected={deleteSelected}
        setSelected={setDeleteSelected}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteSelected?.fullName}
      />
    </div>
  );
}