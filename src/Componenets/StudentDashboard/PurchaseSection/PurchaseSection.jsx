import { ShoppingBag, Package, Download, Loader2, AlertCircle } from "lucide-react";
import { usePurchases } from "./Hook/usePurchases";
import { downloadInvoice } from "./Utills/generateInvoicePDF";

const STATUS_STYLES = {
  completed: "bg-[#DCFCE7] text-[#008236]",
  pending:   "bg-[#FFEDD4] text-[#CA3500]",
  failed:    "bg-[#FEE2E2] text-[#DC2626]",
  cancelled: "bg-[#F3F4F6] text-[#6A7282]",
};

const TABLE_COLUMNS = ["Order Details", "Course", "Date", "Amount", "Payment Method", "Status", "Invoice"];

const PurchaseSection = ({ onNavigate }) => {
  const { purchases, totalSpent, loading, error, refetch } = usePurchases();
  

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-[#0F4C8A]" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <AlertCircle className="text-red-500" size={32} />
        <p className="font-inter text-sm text-[#4A5565]">{error}</p>
        <button
          onClick={refetch}
          className="font-inter text-sm font-medium text-[#0F4C8A] underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6 space-y-4 md:space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 flex justify-between items-center">
          <div>
            <p className="font-inter text-xs md:text-sm text-[#4A5565]">Total Purchases</p>
            <h2 className="font-inter font-bold text-[22px] md:text-[24px] text-[#0A0A0A]">
              {purchases.length}
            </h2>
          </div>
          <ShoppingBag className="text-[#0F4C8A]" size={40} />
        </div>

        <div className="border border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 flex justify-between items-center">
          <div>
            <p className="font-inter text-xs md:text-sm text-[#4A5565]">Total Spent</p>
            <h2 className="font-inter font-bold text-[22px] md:text-[24px] text-[#0A0A0A]">
              ${totalSpent.toFixed(2)}
            </h2>
          </div>
          <Package className="text-[#00C950]" size={40} />
        </div>
      </div>

      {/* Purchase History */}
      <div className="border border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <div className="p-6 border-b border-[#E5E7EB]">
          <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">
            Purchase History
          </h2>
          <p className="font-inter text-xs md:text-sm text-[#4A5565]">
            View and download your invoices
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2 text-center">
            <Package className="text-[#E5E7EB]" size={48} />
            <p className="font-inter text-sm text-[#4A5565]">No purchases found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F9FAFB] border-b text-left">
                <tr>
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col}
                      className="p-2 md:p-4 font-inter font-medium text-[10px] md:text-[12px] text-[#6A7282] uppercase tracking-[0.6px] whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {purchases.map((item) => {
                  const statusKey = item.status.toLowerCase();
                  const statusStyle = STATUS_STYLES[statusKey] ?? "bg-[#F3F4F6] text-[#6A7282]";
                  const isCompleted = statusKey === "completed";

                  return (
                    <tr key={item.id} className="border-b border-[#E5E7EB] last:border-0">

                      <td className="p-2 md:p-4">
                        <span className="flex items-center gap-2 font-inter font-medium text-[12px] md:text-sm text-[#101828] whitespace-nowrap">
                          <Package className="text-[#99A1AF] shrink-0" size={16} />
                          {item.orderId}
                        </span>
                      </td>

                      <td className="p-2 md:p-4 font-inter text-[12px] md:text-sm text-[#4A5565] max-w-[180px] break-all">
                        {item.serviceTitle}
                      </td>

                      <td className="p-2 md:p-4 font-inter text-[12px] md:text-sm text-[#4A5565] whitespace-nowrap">
                        {item.date}
                      </td>

                      <td className="p-2 md:p-4 font-inter font-medium text-[12px] md:text-sm text-[#101828] whitespace-nowrap">
                        {item.currency} {item.amount.toFixed(2)}
                      </td>

                      <td className="p-2 md:p-4 font-inter text-[12px] md:text-sm text-[#4A5565] capitalize whitespace-nowrap">
                        {item.method}
                      </td>

                      <td className="p-2 md:p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full font-inter text-[11px] md:text-[12px] font-medium capitalize whitespace-nowrap ${statusStyle}`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="p-2 md:p-4">
                        {isCompleted ? (
                          <button
                            onClick={() => downloadInvoice(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#EFF6FF] text-[#0F4C8A] font-inter text-[12px] font-medium hover:bg-[#DBEAFE] transition-colors whitespace-nowrap"
                          >
                            <Download size={13} />
                            Download
                          </button>
                        ) : (
                          <span className="font-inter text-[12px] text-[#99A1AF]">—</span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Help */}
      <div className="bg-gradient-to-b from-[#E3EDF7] to-[#F3E8FF] p-4 md:p-6 rounded-[10px] border border-[#BEDBFF] space-y-2">
        <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">
          Need help with billing?
        </h3>
        <p className="font-inter text-xs md:text-sm text-[#4A5565]">
          Our support team is here to assist you with any questions about your purchases, invoices, or payment methods.
        </p>
        <button
  onClick={() => onNavigate?.('Support')}
  className="font-inter font-medium text-xs md:text-sm bg-[#155DFC] text-white px-3 py-2 rounded-[10px] hover:bg-[#1248d1] transition-colors">
  Contact Support
</button>
      </div>

    </div>
  );
};

export default PurchaseSection;