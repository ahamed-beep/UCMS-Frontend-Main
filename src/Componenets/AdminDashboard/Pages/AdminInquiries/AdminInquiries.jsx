import { useState, useEffect } from 'react'
import axiosInstance from '../../../../Api/axiosInstance'
import AdminTable from '../../../../ResuableUi/AdminTable'
import DetailModal from './DetailModal'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  closed: 'bg-green-100 text-green-700',
}

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status] ?? 'bg-gray-100 text-gray-600'}`}>
    {status}
  </span>
)

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/inquiries')
      setInquiries(res.data.data)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
await axiosInstance.delete(`/inquiries/${deleteId}`)
    setInquiries((prev) => prev.filter((i) => i.id !== deleteId))
      setDeleteId(null)
    } catch {
    }
  }

  const handleStatusChange = (id, newStatus) => {
  setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status: newStatus } : i))
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      width: '18%',
      render: (row) => <span className="text-sm wrap-break-word font-medium text-[#0A0A0A]">{row.name}</span>,
    },
    {
      key: 'email',
      label: 'Email',
      width: '22%',
      render: (row) => <span className="text-sm wrap-break-word text-[#374151]">{row.email}</span>,
    },
    {
      key: 'destination',
      label: 'Destination',
      width: '15%',
      render: (row) => <span className="text-sm wrap-break-word text-[#374151]">{row.destination}</span>,
    },
    {
      key: 'test',
      label: 'English Test',
      width: '15%',
      render: (row) => <span className="text-sm wrap-break-word text-[#374151]">{row.test}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      width: '15%',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '15%',
      render: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => setSelected(row)} className="text-[#193CB8] hover:text-blue-800">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button onClick={() => setDeleteId(row.id)} className="text-red-400 hover:text-red-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#0A0A0A] mb-6 wrap-break-word">Inquiries</h1>

      <AdminTable
        columns={columns}
       rows={inquiries.map((i) => ({ ...i, _key: i.id }))}
        loading={loading}
        emptyText="No inquiries found."
      />

      {selected && (
        <DetailModal
          inquiry={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-2">Delete Inquiry</h2>
            <p className="text-sm text-[#64748b] mb-6">Are you sure you want to delete this inquiry? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-[#374151]">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminInquiries