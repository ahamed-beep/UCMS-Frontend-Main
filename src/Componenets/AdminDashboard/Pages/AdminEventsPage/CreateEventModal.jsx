import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import axiosInstance from "../../../../Api/axiosInstance";


const STATUSES = ["Registrations Open", "Limited Seats", "Almost Full", "Full", "Cancelled", "Completed"];
const LOCATION_TYPES = ["physical", "online"];

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-[#64748b]">{label}</label>
    {children}
  </div>
);

const inputCls = "border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#155DFC] bg-white";

const CreateEventModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    title: "", description: "", date: "", startTime: "", endTime: "",
    location: "", locationType: "physical", tag: "University Fair",
    status: "Registrations Open", totalSeats: "", highlights: [""],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleHighlight = (i, val) => {
    const h = [...form.highlights];
    h[i] = val;
    setForm({ ...form, highlights: h });
  };

  const addHighlight = () => setForm({ ...form, highlights: [...form.highlights, ""] });
  const removeHighlight = (i) => setForm({ ...form, highlights: form.highlights.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await axiosInstance.post("/events", {
        ...form,
        totalSeats: Number(form.totalSeats),
        highlights: form.highlights.filter(Boolean),
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <h2 className="text-base font-bold text-[#0f172a]">Create New Event</h2>
          <button onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Field label="Title *">
              <input name="title" required value={form.title} onChange={handleChange} className={inputCls} placeholder="Event title" />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Description *">
              <textarea name="description" required value={form.description} onChange={handleChange} rows={3} className={inputCls} placeholder="Event description" />
            </Field>
          </div>

          <Field label="Date *">
            <input type="date" name="date" required value={form.date} onChange={handleChange} className={inputCls} />
          </Field>
          <Field label="Total Seats *">
            <input type="number" name="totalSeats" required min={1} value={form.totalSeats} onChange={handleChange} className={inputCls} placeholder="e.g. 100" />
          </Field>
          <Field label="Start Time *">
            <input name="startTime" required value={form.startTime} onChange={handleChange} className={inputCls} placeholder="10:00 AM" />
          </Field>
          <Field label="End Time *">
            <input name="endTime" required value={form.endTime} onChange={handleChange} className={inputCls} placeholder="4:00 PM" />
          </Field>

          <div className="md:col-span-2">
            <Field label="Location *">
              <input name="location" required value={form.location} onChange={handleChange} className={inputCls} placeholder="Venue or Online link" />
            </Field>
          </div>

          <Field label="Location Type *">
            <select name="locationType" value={form.locationType} onChange={handleChange} className={inputCls}>
              {LOCATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
       <Field label="Tag *">
  <input name="tag" required value={form.tag} onChange={handleChange} className={inputCls} placeholder="e.g. University Fair, Workshop..." />
</Field>
          <Field label="Status *">
            <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-[#64748b] block mb-2">Highlights</label>
            <div className="space-y-2">
              {form.highlights.map((h, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={h} onChange={(e) => handleHighlight(i, e.target.value)} className={`${inputCls} flex-1`} placeholder={`Highlight ${i + 1}`} />
                  <button type="button" onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              ))}
              <button type="button" onClick={addHighlight} className="flex items-center gap-1 text-xs text-[#155DFC] hover:underline mt-1">
                <Plus size={13} /> Add Highlight
              </button>
            </div>
          </div>

          {error && <p className="md:col-span-2 text-red-500 text-xs">{error}</p>}

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-[#64748b] border border-[#e2e8f0] hover:bg-[#f8fafc]">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#155DFC] text-white hover:bg-blue-700 disabled:opacity-60">
              {submitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;