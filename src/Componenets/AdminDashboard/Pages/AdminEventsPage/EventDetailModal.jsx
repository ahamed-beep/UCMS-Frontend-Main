import {  X } from "lucide-react";
import { statusColor } from "./Constant/AdminEventsConstant";

export const EventDetailModal = ({ event, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
        <h2 className="text-base font-bold text-[#0f172a] wrap-anywhere">Event Details</h2>
        <button onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]"><X size={18} /></button>
      </div>
      <div className="p-6 space-y-4 text-sm">
        <div className="bg-[#f8fafc] rounded-xl p-4 space-y-3">
          <div><span className="text-xs text-[#64748b]">Title</span><p className="font-semibold text-[#0f172a] mt-0.5 wrap-break-word">{event.title}</p></div>
          <div><span className="text-xs text-[#64748b]">Description</span><p className="text-[#374151] mt-0.5 wrap-break-word">{event.description}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#f8fafc] rounded-xl p-3"><span className="text-xs text-[#64748b]">Date</span><p className="font-medium text-[#0f172a] mt-0.5">{event.day} {event.monthYear}</p></div>
          <div className="bg-[#f8fafc] rounded-xl p-3"><span className="text-xs text-[#64748b]">Time</span><p className="font-medium text-[#0f172a] mt-0.5">{event.startTime} – {event.endTime}</p></div>
          <div className="bg-[#f8fafc] rounded-xl p-3"><span className="text-xs text-[#64748b]">Location</span><p className="font-medium text-[#0f172a] mt-0.5 wrap-break-word">{event.location}</p><p className="text-xs text-[#64748b] capitalize">{event.locationType}</p></div>
          <div className="bg-[#f8fafc] rounded-xl p-3"><span className="text-xs text-[#64748b]">Tag</span><p className="font-medium text-[#0f172a] mt-0.5 wrap-break-word">{event.tag}</p></div>
          <div className="bg-[#f8fafc] rounded-xl p-3"><span className="text-xs text-[#64748b]">Seats</span><p className="font-medium text-[#0f172a] mt-0.5">{event.registeredCount} / {event.totalSeats} registered</p></div>
          <div className="bg-[#f8fafc] rounded-xl p-3"><span className="text-xs text-[#64748b]">Status</span><p className={`inline-block mt-0.5 text-xs px-2 py-1 rounded-full font-medium ${statusColor[event.status] || "bg-gray-100 text-gray-500"}`}>{event.status}</p></div>
        </div>
        {event.highlights?.length > 0 && (
          <div className="bg-[#f8fafc] rounded-xl p-4">
            <span className="text-xs text-[#64748b]">Highlights</span>
            <ul className="mt-2 space-y-1">
              {event.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-[#374151] wrap-anywhere">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#155DFC] inline-block"></span>{h}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-[#64748b] border border-[#e2e8f0] hover:bg-[#f8fafc]">Close</button>
        </div>
      </div>
    </div>
  </div>
);