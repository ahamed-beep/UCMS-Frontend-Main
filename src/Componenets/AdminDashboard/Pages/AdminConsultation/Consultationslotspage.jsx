import { useEffect, useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import { toast } from "react-toastify";
import { Plus, Trash2, ToggleLeft, ToggleRight, Clock, Calendar } from "lucide-react";

const TIME_OPTIONS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM",
];

// ✅ Normalize _id → id AND guarantee times is always an array
const normalize = (slot) => {
  if (!slot || typeof slot !== "object") return null;
  return {
    ...slot,
    id: slot.id ?? slot._id ?? "",
    times: Array.isArray(slot.times) ? slot.times : [],
  };
};

const ConsultationSlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [date, setDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/consultation-slots");

      // 🔍 DEBUG — remove after fix
      console.log("=== SLOTS RAW RESPONSE ===", res.data);

      // Handle any nesting depth
      let raw = res.data;
      if (raw?.data) raw = raw.data;
      if (raw?.data) raw = raw.data;

      console.log("=== SLOTS RAW AFTER UNWRAP ===", raw);

      const list = Array.isArray(raw) ? raw : [];

      console.log("=== SLOTS LIST ===", list);
      console.log("=== FIRST SLOT ===", list[0]);

      const normalized = list.map(normalize).filter(Boolean);
      setSlots(normalized);
    } catch (err) {
      console.error("Fetch slots error:", err);
      toast.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleCreate = async () => {
    if (!date.trim()) return toast.error("Please enter a date");
    if (selectedTimes.length === 0) return toast.error("Please select at least one time");
    setSaving(true);
    try {
      const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      });
      const res = await axiosInstance.post("/consultation-slots", {
        date: formatted,
        times: selectedTimes,
      });

      console.log("=== CREATE RESPONSE ===", res.data);

      let raw = res.data;
      if (raw?.data) raw = raw.data;
      if (raw?.data) raw = raw.data;

      const newSlot = normalize(raw);
      if (newSlot) setSlots((prev) => [newSlot, ...prev]);
      setDate("");
      setSelectedTimes([]);
      toast.success("Slot created successfully");
    } catch (err) {
      console.error("Create slot error:", err);
      toast.error("Failed to create slot");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (slot) => {
    try {
      const res = await axiosInstance.patch(`/consultation-slots/${slot.id}`, {
        isActive: !slot.isActive,
      });

      console.log("=== TOGGLE RESPONSE ===", res.data);

      let raw = res.data;
      if (raw?.data) raw = raw.data;
      if (raw?.data) raw = raw.data;

      const updated = normalize(raw);
      if (updated) {
        setSlots((prev) => prev.map((s) => (s.id === slot.id ? updated : s)));
      }
      toast.success(`Slot ${!slot.isActive ? "activated" : "deactivated"}`);
    } catch (err) {
      console.error("Toggle error:", err);
      toast.error("Failed to update slot");
    }
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Is slot ko delete karna chahte ho?</p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              onClick={async () => {
                closeToast();
                setDeletingId(id);
                try {
                  await axiosInstance.delete(`/consultation-slots/${id}`);
                  setSlots((prev) => prev.filter((s) => s.id !== id));
                  toast.success("Slot deleted");
                } catch (err) {
                  console.error("Delete error:", err);
                  toast.error("Failed to delete slot");
                } finally {
                  setDeletingId(null);
                }
              }}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-200 px-3 py-1 rounded text-sm"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold text-[#1e293b]">Consultation Slots</h1>
        <p className="text-sm text-[#64748b]">
          Admin ki add ki gayi dates aur times booking form mein dikhti hain
        </p>
      </div>

      {/* Create Slot Form */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 space-y-5">
        <h2 className="text-sm font-semibold text-[#1e293b] flex items-center gap-2">
          <Plus className="w-4 h-4" /> Naya Slot Add Karo
        </h2>

        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 px-3 rounded-lg border border-[#d1d5db] text-sm text-[#1e293b] outline-none focus:border-[#0F4C8A] focus:ring-1 focus:ring-[#0F4C8A] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#64748b] mb-2">
            Times Select Karo <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TIME_OPTIONS.map((time) => (
              <button
                key={time}
                onClick={() => toggleTime(time)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  selectedTimes.includes(time)
                    ? "bg-[#0F4C8A] text-white border-[#0F4C8A]"
                    : "bg-white text-[#64748b] border-[#d1d5db] hover:border-[#0F4C8A]"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          {selectedTimes.length > 0 && (
            <p className="text-xs text-[#64748b] mt-2">
              {selectedTimes.length} time(s) selected
            </p>
          )}
        </div>

        <button
          onClick={handleCreate}
          disabled={saving}
          className="flex items-center gap-2 bg-[#0F4C8A] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0d3f73] disabled:opacity-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {saving ? "Saving..." : "Slot Create Karo"}
        </button>
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-sm text-[#64748b]">Loading...</div>
        ) : slots.length === 0 ? (
          <div className="text-sm text-[#64748b] bg-white border border-[#e2e8f0] rounded-xl p-6 text-center">
            Koi slot nahi mila. Upar se add karo.
          </div>
        ) : (
          slots.map((slot) => (
            <div
              key={slot.id}
              className={`bg-white border rounded-xl p-4 flex items-start justify-between gap-4 transition-opacity ${
                slot.isActive ? "border-[#e2e8f0]" : "border-[#e2e8f0] opacity-60"
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0F4C8A]" />
                  <span className="text-sm font-semibold text-[#1e293b]">
                    {slot.date}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      slot.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {slot.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                  {slot.times.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleToggleActive(slot)}
                  title={slot.isActive ? "Deactivate" : "Activate"}
                  className="text-[#64748b] hover:text-[#0F4C8A] transition-colors"
                >
                  {slot.isActive ? (
                    <ToggleRight className="w-5 h-5 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => handleDelete(slot.id)}
                  disabled={deletingId === slot.id}
                  title="Delete"
                  className="text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultationSlotsPage;