import { useSearchParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentId = searchParams.get("paymentId");

  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <XCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold text-gray-800">Payment Failed</h2>
          <p className="text-sm text-gray-500 mt-2">
            Something went wrong with your payment. Please try again.
          </p>
          {paymentId && (
            <p className="text-xs text-gray-400 mt-2">Reference: {paymentId}</p>
          )}
          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailed;