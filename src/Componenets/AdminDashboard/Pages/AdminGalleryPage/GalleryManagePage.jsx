import { useState, useEffect } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";
import GalleryCreateModal from "./GalleryCreateModal";
import GalleryEditModal from "./GalleryEditModal";
import DeleteModal from "../../../../ResuableUi/DeleteModal";
import { toast } from "react-toastify";

export default function GalleryManagePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [togglingId, setTogglingId] = useState(null); // ✅ NEW

  const [deleteSelected, setDeleteSelected] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/gallery/admin/all");
      setItems(res.data.data || []);
    } catch {
      showMsg("Failed to fetch gallery items.", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showMsg = (msg, isError = false) => {
    if (isError) setError(msg);
    else setSuccess(msg);
    setTimeout(() => { setError(""); setSuccess(""); }, 3500);
  };

  const getItemId = (row) => row.id ?? row._id;

  const handleDelete = async (gallery) => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/gallery/${gallery.id}`);
      setItems((prev) =>
        prev.filter((galleryItem) => getItemId(galleryItem) !== gallery.id)
      );
      toast.success("Gallery deleted successfully");
      setDeleteSelected(null);
    } catch {
      console.error("Delete failed", err);
      toast.error("Failed to delete gallery");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ✅ UPDATED — optimistic update + togglingId
  const handleToggle = async (row) => {
    const id = getItemId(row);
    if (!id) return showMsg("Invalid item ID.", true);
    setTogglingId(id);
    try {
      await axiosInstance.patch(`/gallery/${id}/toggle-status`);
      setItems((prev) =>
        prev.map((item) =>
          getItemId(item) === id ? { ...item, isActive: !item.isActive } : item
        )
      );
      showMsg(row.isActive ? "Item deactivated." : "Item activated.");
    } catch {
      showMsg("Failed to toggle status.", true);
    } finally {
      setTogglingId(null);
    }
  };

  const handleAddImages = async (row) => {
    const id = getItemId(row);
    if (!id) return showMsg("Invalid item ID.", true);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = async (e) => {
      const selectedFiles = Array.from(e.target.files);
      if (!selectedFiles.length) return;
      const fd = new FormData();
      selectedFiles.forEach((f) => fd.append("images", f));
      try {
        await axiosInstance.patch(`/gallery/${id}/add-images`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showMsg("Images added successfully.");
        fetchItems();
      } catch {
        showMsg("Failed to add images.", true);
      }
    };
    input.click();
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      width: "20%",
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 truncate">{row.title}</p>
          <p className="text-xs text-gray-500 truncate">{row.subtitle}</p>
        </div>
      ),
    },
    {
      key: "section",
      label: "Section",
      width: "15%",
      render: (row) => (
        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize">
          {row.section}
        </span>
      ),
    },
    {
      key: "images",
      label: "Images",
      width: "20%",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {(row.images || []).slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-8 h-8 rounded-md object-cover border-2 border-white shadow-sm"
              />
            ))}
          </div>
          {row.images?.length > 4 && (
            <span className="text-xs text-gray-400">+{row.images.length - 4}</span>
          )}
          {!row.images?.length && (
            <span className="text-xs text-gray-400 italic">No images</span>
          )}
        </div>
      ),
    },
    {
      // ✅ UPDATED — toggle switch style same as ManageUsers
      key: "status",
      label: "Status",
      width: "13%",
      render: (row) => {
        const id = getItemId(row);
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggle(row)}
              disabled={togglingId === id}
              className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${row.isActive ? "bg-emerald-500" : "bg-gray-300"
                }`}
            >
              <span
                className={`absolute  hidden md:block top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${row.isActive ? "translate-x-4" : "translate-x-0"
                  }`}
              />
            </button>
            <span
              className={`text-[12px] hidden md:block font-medium px-2 py-0.5 rounded-full ${row.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                }`}
            >
              {row.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created",
      width: "13%",
      render: (row) => (
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {new Date(row.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "20%",
      render: (row) => (
        <div className="flex items-center gap-1.5   ">
          <button
            onClick={() => setEditItem(row)}
            title="Edit"
            className="p-1.5 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
            </svg>
          </button>

          {/* Add Images */}
          <button
            onClick={() => setDeleteSelected(row)}
            title="Add Images"
            className="p-1.5 rounded-lg text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
              <line x1="14" y1="3" x2="14" y2="9" />
              <line x1="11" y1="6" x2="17" y2="6" />
            </svg>
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(row)}
            title="Delete"
            className="p-1.5 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-[#f8fafc] p-6">
      <div className="">

        <div className="flex flex-col md:flex-row   md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 wrap-break-word">Gallery</h1>
            <p className="text-sm text-gray-500 mt-1 wrap-break-word">Manage your gallery items and images</p>
          </div>
          <div className="flex md:mt-0 mt-2" >


            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Gallery Item
            </button>
          </div>
        </div>

        {success && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            { label: "Total Items", value: items.length, color: "text-gray-900" },
            { label: "Active", value: items.filter((i) => i.isActive).length, color: "text-green-600" },
            { label: "Inactive", value: items.filter((i) => !i.isActive).length, color: "text-red-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
              <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <AdminTable
          columns={columns}
          rows={items}
          loading={loading}
          emptyText="No gallery items yet. Click 'Add Gallery Item' to create one."
        />
      </div>

      {showCreate && (
        <GalleryCreateModal
          onClose={() => { setShowCreate(false); fetchItems(); }}
          onSuccess={(msg) => { showMsg(msg); fetchItems(); }}
          onError={(msg) => showMsg(msg, true)}
        />
      )}

      {editItem && (
        <GalleryEditModal
          item={editItem}
          onClose={() => { setEditItem(null); fetchItems(); }}
          onSuccess={(msg) => { showMsg(msg); fetchItems(); }}
          onError={(msg) => showMsg(msg, true)}
        />
      )}

      <DeleteModal
        selected={deleteSelected}
        setSelected={setDeleteSelected}
        onConfirm={handleDelete}
        loading={deleteLoading}
        itemName={deleteSelected?.title}
      />
    </div>
  );
}