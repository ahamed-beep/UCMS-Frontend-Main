import { useEffect, useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";
import AdminTable from "../../../../ResuableUi/AdminTable";

const statusColors = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-500",
};

const columns = [
  {
    key: "serviceTitle",
    label: "Service",
    width: "min-w-[120px]",
    render: (row) => (
      <span className="text-sm font-medium text-gray-800">{row.serviceTitle}</span>
    ),
  },
  {
    key: "customerName",
    label: "Customer Name",
    width: "min-w-[120px]",
    render: (row) => (
      <span className="text-sm font-medium text-gray-800">
        {row.customer?.firstName} {row.customer?.lastName}
      </span>
    ),
  },
  {
    key: "customerEmail",
    label: "Email",
    width: "min-w-[120px]",
    render: (row) => (
      <span className="text-sm wrap-break-word text-gray-600">{row.customer?.email || "—"}</span>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    width: "min-w-[120px]",
    render: (row) => (
      <span className="text-sm text-gray-600">{row.customer?.phone || "—"}</span>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    width: "min-w-[120px]",
    render: (row) => (
      <span className="text-sm font-semibold text-blue-600">
        {row.amount} {row.currency}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "min-w-[120px]",
    render: (row) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[row.status] ?? "bg-gray-100 text-gray-500"
          }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "method",
    label: "Method",
    width: "min-w-[120px]",
    render: (row) => (
      <span className="text-sm text-gray-600 capitalize">{row.method}</span>
    ),
  },
  {
    key: "paypalOrderId",
    label: "PayPal Order ID",
    width: "min-w-[120px]",
    render: (row) => (
      <span
        className="text-xs wrap-break-word text-gray-400 font-mono  block"
        title={row.paypalOrderId}
      >
        {row.paypalOrderId || "—"}
      </span>
    ),
  },
  {
    key: "createdAt",
    label: "Date & Time",
    width: "min-w-[120px]",
    render: (row) => {
      if (!row.createdAt) return <span className="text-xs text-gray-400">—</span>;
      const d = new Date(row.createdAt);
      return (
        <div>
          <p className="text-xs font-medium text-gray-700">
            {d.toLocaleDateString("en-PK", { dateStyle: "medium", timeZone: "Asia/Karachi" })}
          </p>
          <p className="text-xs text-gray-400">
            {d.toLocaleTimeString("en-PK", { timeStyle: "short", timeZone: "Asia/Karachi" })}
          </p>
        </div>
      );
    },
  },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const total = payments.length;
  const completed = payments.filter((p) => p.status === "completed").length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const failed = payments.filter((p) => p.status === "failed").length;
  const revenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosInstance.get("/payments");
        setPayments(res.data?.data ?? res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load payments.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className=" space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500 mt-1">All transactions overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-800">{total}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">{completed}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Pending / Failed</p>
          <p className="text-2xl font-bold text-yellow-500">{pending + failed}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Revenue (USD)</p>
          <p className="text-2xl font-bold text-blue-600">${revenue.toFixed(2)}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="w-full overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="w-[900px]">
          <AdminTable
            columns={columns}
            rows={payments}
            loading={loading}
            emptyText="No payments found."
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;