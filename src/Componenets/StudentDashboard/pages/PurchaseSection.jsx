import { useState } from "react";
import { Download, CreditCard, Package } from "lucide-react";

const PurchaseSection = () => {
  // ---- DATA ----
  const [purchases, setPurchases] = useState([
    {
      id: "ORD-2026-001",
      course: "IELTS Preparation - Academic",
      date: "2/15/2026",
      amount: 299,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "ORD-2026-002",
      course: "PTE Academic - Complete Course",
      date: "3/1/2026",
      amount: 349,
      method: "PayPal",
      status: "Completed",
    },
    {
      id: "ORD-2026-003",
      course: "Business English Communication",
      date: "3/20/2026",
      amount: 199,
      method: "Credit Card",
      status: "Pending",
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "VISA",
      number: "**** **** **** 4242",
      expiry: "12/2028",
      isDefault: true,
    },
    {
      id: 2,
      type: "MC",
      number: "**** **** **** 8888",
      expiry: "06/2027",
      isDefault: false,
    },
  ]);

  // ---- LOGIC ----
  const totalSpent = purchases.reduce((acc, p) => acc + p.amount, 0);

  const setDefault = (id) => {
    setPayments((prev) =>
      prev.map((p) => ({ ...p, isDefault: p.id === id }))
    );
  };

  const removePayment = (id) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  // ---- COMPONENT ----
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Purchases</p>
            <h2 className="text-2xl font-bold">{purchases.length}</h2>
          </div>
          <Package className="text-blue-500" />
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Spent</p>
            <h2 className="text-2xl font-bold">${totalSpent}</h2>
          </div>
          <CreditCard className="text-green-500" />
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-4">Purchase History</h2>

        <table className="w-full text-sm">
          <thead className="text-gray-500 text-left">
            <tr>
              <th>Order</th>
              <th>Course</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((p) => (
              <tr key={p.id} className="border-t">
                <td>{p.id}</td>
                <td>{p.course}</td>
                <td>{p.date}</td>
                <td>${p.amount}</td>
                <td>{p.method}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      p.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td>
                  {p.status === "Completed" ? (
                    <button className="flex items-center gap-1 text-blue-600">
                      <Download size={16} /> Download
                    </button>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Saved Payment Methods</h2>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg">
            Add Payment Method
          </button>
        </div>

        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {p.type} {p.number}
                </p>
                <p className="text-gray-500 text-sm">
                  Expires {p.expiry}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                {p.isDefault ? (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => setDefault(p.id)}
                    className="text-blue-600 text-sm"
                  >
                    Set as Default
                  </button>
                )}

                <button className="text-gray-600 text-sm">Edit</button>

                <button
                  onClick={() => removePayment(p.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl">
        <h3 className="font-semibold">Need help with billing?</h3>
        <p className="text-gray-600 text-sm mb-3">
          Our support team is here to assist you.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default PurchaseSection