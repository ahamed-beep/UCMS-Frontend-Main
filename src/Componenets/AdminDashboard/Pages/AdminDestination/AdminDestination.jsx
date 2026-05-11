import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import DestinationDetailModal from "./DestinationDetailModal";
import EditDestinationModal from "./EditDestinationModal";
import CreateDestinationModal from "./CreateDestinationModal";
import axiosInstance from "../../../../Api/axiosInstance";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AdminTable from "../../../../ResuableUi/AdminTable";

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const fetchDestinations = async () => {
    try {
      const res = await axiosInstance.get("/destinations/admin/all");
      setDestinations(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/destinations/${deleteTarget.id}`);
      setDestinations((prev) => prev.filter((d) => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdated = (updated) => {
    setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  };

  const handleCreated = (created) => {
    setDestinations((prev) => [created, ...prev]);
  };

  const columns = [
    {
      key: "name",
      label: "Destination",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={row.flag}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-semibold text-[#0f172a] text-sm truncate">{row.name}</p>
            <p className="text-xs text-[#94a3b8] truncate hidden sm:block">{row.tagline}</p>
          </div>
        </div>
      ),
    },
    {
      key: "partnerUniversities",
      label: "Partner Unis",
      className: "hidden md:table-cell",
       render: (row) => <span className="text-sm text-[#334155] break-all">{row.partnerUniversities}</span>,
    },
    {
      key: "programs",
      label: "Programs",
      className: "hidden md:table-cell",
      render: (row) => <span className="text-sm text-[#334155] break-all">{row.programs}</span>,
    },
    {
      key: "averageCost",
      label: "Avg Cost",
      className: "hidden lg:table-cell",
      render: (row) => <span className="text-sm text-[#334155] break-all">{row.averageCost}</span>,
    },
    {
      key: "intakes",
      label: "Intakes",
      className: "hidden lg:table-cell",
      render: (row) => <span className="text-sm text-[#334155] break-all">{row.intakes}</span>,
    },
 
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelected(row)}
            title="View Details"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setEditTarget(row)}
            title="Edit"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-gray-500 hover:text-[#193CB8] transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteTarget(row)}
            title="Delete"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0f172a] wrap-break-word">Study Destinations</h1>
          <p className="text-sm text-[#64748b] mt-0.5 wrap-break-word">Manage all study destinations</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors self-start sm:self-auto"
          style={{ background: "linear-gradient(to right, #0F4C8A, #193CB8)" }}
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
      </div>

      <AdminTable
        columns={columns}
        rows={destinations}
        loading={loading}
        emptyText="No destinations found."
      />

      <DestinationDetailModal selected={selected} setSelected={setSelected} />
      <EditDestinationModal
        destination={editTarget}
        onClose={() => setEditTarget(null)}
        onUpdated={handleUpdated}
      />
      <CreateDestinationModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />
      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        name={deleteTarget?.name}
      />
    </div>
  );
};

export default AdminDestinations;