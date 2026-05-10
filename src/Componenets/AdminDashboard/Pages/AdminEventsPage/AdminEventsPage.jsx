import { useState } from "react";
import { Pencil, Trash2, Plus, RefreshCw, Eye, X } from "lucide-react";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import AdminTable from "../../../../ResuableUi/AdminTable";
import { useEvents } from "./Hook/useEvents";
import axiosInstance from "../../../../Api/axiosInstance";
import { EventDetailModal } from "./EventDetailModal";
import { statusColor, STATUSES } from "./Constant/AdminEventsConstant";
import DeleteModal from "../../../../ResuableUi/DeleteModal";





const AdminEventsPage = () => {
  const { events, loading, page, setPage, total, limit, refetch } = useEvents();
  const [showCreate, setShowCreate] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  const [viewEvent, setViewEvent] = useState(null);

  const [deleteSelected, setDeleteSelected] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (event) => {
    
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/events/${event.id}`);
      setDeleteSelected(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setStatusLoading(id);
    try {
      await axiosInstance.patch(`/events/${id}/status`, { status });
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setStatusLoading(null);
    }
  };

  const columns = [
    {
      key: "title", label: "Event", width: "28%",
      render: (row) => (
        <div>
          <div className="text-sm font-semibold text-[#0f172a] truncate">{row.title}</div>
          <div className="text-xs text-[#64748b] mt-0.5 break-all">{row.tag}</div>
        </div>
      ),
    },
    {
      key: "date", label: "Date & Time", width: "20%",
      render: (row) => (
        <div className="text-xs text-[#374151]">
          <div>{row.day} {row.monthYear}</div>
          <div className="text-[#64748b]">{row.startTime} – {row.endTime}</div>
        </div>
      ),
    },
    {
      key: "location", label: "Location", width: "18%",
      render: (row) => (
        <div className="text-xs text-[#374151] truncate">
          <div className="truncate">{row.location}</div>
          <div className="text-[#64748b] capitalize">{row.locationType}</div>
        </div>
      ),
    },
    {
      key: "seats", label: "Seats", width: "12%",
      render: (row) => (
        <div className="text-xs text-[#374151]">
          <div>{row.registeredCount} / {row.totalSeats}</div>
        </div>
      ),
    },
    {
      key: "status", label: "Status", width: "25%",
      render: (row) => (
        <select
          value={row.status}
          disabled={statusLoading === row.id}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-xs px-2 py-1 rounded-full font-medium border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#155DFC] ${statusColor[row.status] || "bg-gray-100 text-gray-500"}`}
        >
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
    {
      key: "actions", label: "Actions", width: "10%",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setViewEvent(row)} className="text-[#64748b] hover:text-[#0f172a] transition-colors">
            <Eye size={14} />
          </button>
          <button onClick={() => setEditEvent(row)} className="text-[#155DFC] hover:text-blue-800 transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={() => setDeleteSelected(row)} className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-40">
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-anywhere">Events</h1>
          <p className="text-sm text-[#64748b] mt-0.5">{total} total events</p>
        </div>
        <div className="flex items-center gap-2">

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 bg-[#155DFC] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={15} /> Create Event
          </button>
        </div>
      </div>

      {/* Table */}
      <AdminTable columns={columns} rows={events.map(e => ({ ...e, _key: e.id }))} loading={loading} emptyText="No events found." />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-[#64748b]">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-[#f8fafc] disabled:opacity-40">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-[#f8fafc] disabled:opacity-40">Next</button>
          </div>
        </div>
      )}

      {/* Modals */}
      {viewEvent && <EventDetailModal event={viewEvent} onClose={() => setViewEvent(null)} />}
      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} onCreated={refetch} />}
      {editEvent && <EditEventModal event={editEvent} onClose={() => setEditEvent(null)} onUpdated={refetch} />}

      <DeleteModal
        selected={deleteSelected}
        setSelected={setDeleteSelected}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteSelected?.title}
      />
    </div>
  );
};

export default AdminEventsPage;