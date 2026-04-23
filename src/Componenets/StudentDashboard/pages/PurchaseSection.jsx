import { useState } from "react";
import { Download, CreditCard, Package, ShoppingBag } from "lucide-react";

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
      invoice: "Download"
    },
    {
      id: "ORD-2026-002",
      course: "PTE Academic - Complete Course",
      date: "3/1/2026",
      amount: 349,
      method: "PayPal",
      status: "Completed",
      invoice: "Download"
    },
    {
      id: "ORD-2026-003",
      course: "Business English Communication",
      date: "3/20/2026",
      amount: 199,
      method: "Credit Card",
      status: "Pending",
      invoice: "Pending"
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "VISA",
      number: "**** **** **** 4242",
      expiry: "12/2028",
      icon: "/Images/visa.webp",
      isDefault: true,
    },
    {
      id: 2,
      type: "MC",
      number: "**** **** **** 8888",
      expiry: "06/2027",
      icon: "/Images/mc.webp",
      isDefault: false,
    },
  ]);

  const StatusStyles = {
    "Completed": {
      style: "bg-[#DCFCE7] text-[#008236]",
      icon: "/Images/greentick.webp",
    },
    "Pending": {
      style: "bg-[#FFEDD4] text-[#CA3500]",
      icon: "/Images/orangeclock.webp",
    }
  };

  const invoice = {
    "Download": {
      style: "text-[#0F4C8A]",
      icon: "/Images/bluedownload.webp",
    },
    "Pending": {
      style: "text-[#99A1AF]",
      icon: "",
    }
  };

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
    <div className="py-4 md:py-6 space-y-4 md:space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 flex justify-between items-center">
          <div>
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Total Purchases</p>
            <h2 className="font-inter font-bold text-[22px] md:text-[24px] text-[#0A0A0A]">{purchases.length}</h2>
          </div>
          <ShoppingBag className="text-[#0F4C8A]" size={40} />
        </div>

        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 flex justify-between items-center">
          <div>
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Total Spent</p>
            <h2 className="font-inter font-bold text-[22px] md:text-[24px] text-[#0A0A0A]">${totalSpent}</h2>
          </div>
          <Package className="text-[#00C950]" size={40} />
        </div>
      </div>

      {/* Purchase History */}
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <div className="p-6 border-b-[0.89px] border-[#E5E7EB]">
          <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Purchase History</h2>
          <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">View and download your invoices</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="font-inter font-medium text-[10px] md:text-[12px] text-[#6A7282] uppercase tracking-[0.6px] bg-[#F9FAFB] text-left border-b">
              <tr>
                <th className="text-left p-2 md:p-4">Order Details</th>
                <th className="text-left p-2 md:p-4">Courses</th>
                <th className="text-left p-2 md:p-4">Date</th>
                <th className="text-left p-2 md:p-4">Amount</th>
                <th className="text-left p-2 md:p-4">Payment Method</th>
                <th className="text-left p-2 md:p-4">Status</th>
                <th className="text-left p-2 md:p-4">Invoice</th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((item, i) => (
                <tr key={i} className="border-[0.89px] border-[#E5E7EB]">
                  <td className="p-2 md:p-4 flex gap-2 font-inter font-medium text-[12px] md:text-sm text-[#101828]"><Package className="text-[#99A1AF]" size={20} />{item.id}</td>
                  <td className="p-2 md:p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{item.course}</td>
                  <td className="p-2 md:p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{item.date}</td>
                  <td className="p-2 md:p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">&#36;{item.amount}</td>
                  <td className="p-2 md:p-4 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{item.method}</td>
                  <td className="p-2 md:p-4">
                    <span
                      className={`flex items-center px-3 py-1 rounded-full font-inter text-[12px] md:text-sm font-medium ${StatusStyles[item.status]?.style}`}
                    >
                      <img src={StatusStyles[item.status]?.icon} alt="icon" width={16} height={16} className="inline-block mr-1" />
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`flex items-center px-3 py-1 rounded-full font-inter text-[12px] md:text-sm font-medium ${invoice[item.invoice]?.style}`}
                    >
                      {invoice[item.invoice]?.icon && (<img src={invoice[item.invoice]?.icon} alt="icon" width={16} height={16} className="inline-block mr-1" />)}
                      {item.invoice}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Payment Methods */}
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
        <div className="flex sm:flex-row flex-col gap-2 justify-between mb-4">
          <div>
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Saved Payment Methods</h2>
            <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">Manage your payment options</p>
          </div>
          <button className="font-inter font-medium text-xs md:text-sm bg-[#0F4C8A] text-white px-4 py-2 rounded-[10px] whitespace-nowrap self-start">
            Add Payment Method
          </button>
        </div>

        <div className="space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="flex sm:flex-row flex-col justify-between items-center gap-2 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] p-4"
            >
              <div className="flex gap-2">
                <img src={p.icon} alt="payment" width={48} height={32}/>
                <div>
                  <p className="font-inter font-medium text-xs md:text-sm text-[#0A0A0A]">
                    {p.type} {p.number}
                  </p>
                  <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">
                    Expires {p.expiry}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                {p.isDefault ? (
                  <span className="font-inter font-medium text-xs md:text-sm bg-[#DCFCE7] text-[#008236] px-2 py-1 rounded ">
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => setDefault(p.id)}
                    className="font-inter font-medium text-xs md:text-sm text-[#0F4C8A]"
                  >
                    Set as Default
                  </button>
                )}

                <button className="font-inter font-medium text-xs md:text-sm text-[#0F4C8A]">Edit</button>

                <button
                  onClick={() => removePayment(p.id)}
                  className="font-inter font-medium text-xs md:text-sm text-[#E7000B]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-b from-[#E3EDF7] to-[#F3E8FF] p-4 md:p-6 rounded-[10px] border-[0.89px] border-[#BEDBFF] space-y-2">
        <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Need help with billing?</h3>
        <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">
          Our support team is here to assist you with any questions about your purchases, invoices, or payment methods.
        </p>
        <button className="font-inter font-medium text-xs md:text-sm bg-[#155DFC] text-white px-3 py-2 rounded-[10px]">
          Contact Support
        </button>
      </div>
    </div>
  );
}

export default PurchaseSection