import { useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import {  X } from "lucide-react";
import { statusColor, STATUSES } from "./Constant/AdminEventRegistrationConstant";

export const DetailModal = ({ reg, onClose, onStatusUpdated }) => {
  const [status, setStatus] = useState(reg.status);
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setSaving(true);
    try {
      await axiosInstance.patch(`/registrations/${reg.id}/status`, { status: newStatus });
      setStatus(newStatus);
      onStatusUpdated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
          <h2 className="text-base font-bold text-[#0f172a]">Registration Details</h2>
          <button onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-4 text-sm">
          {reg.eventId && typeof reg.eventId === "object" && (
            <div className="bg-[#eff6ff] rounded-xl p-4 space-y-1">
              <p className="text-xs text-[#64748b]">Event</p>
              <p className="font-semibold text-[#1d4ed8]">{reg.eventId.title}</p>
              <p className="text-xs text-[#64748b]">{reg.eventId.day} {reg.eventId.monthYear} · {reg.eventId.startTime} – {reg.eventId.endTime}</p>
              <p className="text-xs text-[#64748b]">{reg.eventId.location}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Full Name</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.fullName}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Email</p>
              <p className="font-medium text-[#0f172a] mt-0.5 break-all">{reg.email}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Phone</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.phone}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Country / City</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.country}, {reg.city}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Attendees</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.attendees}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Education</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.education}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Destination</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.destination || "—"}</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-3">
              <p className="text-xs text-[#64748b]">Heard From</p>
              <p className="font-medium text-[#0f172a] mt-0.5">{reg.heardFrom || "—"}</p>
            </div>
          </div>

          {reg.questions && (
            <div className="bg-[#f8fafc] rounded-xl p-4">
              <p className="text-xs text-[#64748b]">Questions</p>
              <p className="text-[#374151] mt-1">{reg.questions}</p>
            </div>
          )}

          <div className="bg-[#f8fafc] rounded-xl p-4">
            <p className="text-xs text-[#64748b] mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={saving || status === s}
                  onClick={() => handleStatusChange(s)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all border ${
                    status === s
                      ? `${statusColor[s]} border-transparent scale-105`
                      : "bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#155DFC] hover:text-[#155DFC]"
                  } disabled:opacity-50`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-[#64748b] border border-[#e2e8f0] hover:bg-[#f8fafc]">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};