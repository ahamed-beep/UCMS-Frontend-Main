import { useState } from 'react'
import axiosInstance from '../../../../Api/axiosInstance'

const DetailModal = ({ inquiry, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(inquiry.status)
  const [loading, setLoading] = useState(false)

  const handleStatusUpdate = async () => {
    setLoading(true)
    try {
     await axiosInstance.patch(`/inquiries/${inquiry.id}`, { status })
      onStatusChange(inquiry._id, status)
      onClose()
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#0A0A0A]">Inquiry Detail</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        <div className="flex flex-col gap-3 text-sm text-[#374151]">
          {[
            { label: 'Full Name', value: inquiry.name },
            { label: 'Email', value: inquiry.email },
            { label: 'Phone', value: inquiry.phone },
            { label: 'Study Destination', value: inquiry.destination },
            { label: 'Qualification', value: inquiry.qualification },
            { label: 'English Test', value: inquiry.test },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-[#64748b] font-medium">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-[#364153]">Update Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 border border-[#D1D5DC] rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button
          onClick={handleStatusUpdate}
          disabled={loading || status === inquiry.status}
          className="mt-4 w-full py-2 bg-[#193CB8] text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </div>
  )
}

export default DetailModal