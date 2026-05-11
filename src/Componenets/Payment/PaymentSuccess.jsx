import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import axiosInstance from "../../Api/axiosInstance";
import Navbar from "../../ResuableUi/Navbar";
import Footer from "../../ResuableUi/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [paymentData, setPaymentData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const paymentId = searchParams.get("paymentId");

      if (!paymentId) {
        setStatus("error");
        setMessage("Missing payment information.");
        return;
      }

      try {
       const res = await axiosInstance.get(`/payments/${paymentId}/status`);
     const payment = res.data?.data;

        if (payment?.status === "completed") {
          setPaymentData(payment);
          setStatus("success");
        } else {
          setStatus("error");
          setMessage("Payment was not completed. Please contact support.");
        }
      } catch (err) {
        setStatus("error");
        setMessage(
          err?.response?.data?.message || "Could not verify payment. Please contact support."
        );
      }
    };

    verify();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">

          {status === "loading" && (
            <>
              <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
              <h2 className="text-lg font-semibold text-gray-800 break-all">Verifying Payment...</h2>
              <p className="text-sm text-gray-500 mt-2 break-all">Please wait, do not close this page.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
              <h2 className="text-lg font-semibold text-gray-800 break-all">Payment Successful!</h2>
              <p className="text-sm text-gray-500 mt-2">
                Thank you for your payment.
              </p>
              {paymentData && (
                <div className="mt-4 text-left bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1">
                  <p className="break-all"><span className="font-medium">Service:</span> {paymentData.serviceTitle}</p>
                  <p className="break-all"><span className="font-medium">Amount:</span> {paymentData.amount} {paymentData.currency}</p>
               <p><span className="font-medium">Name:</span> {paymentData.customer?.firstName} {paymentData.customer?.lastName}</p>
                </div>
              )}
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Home
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="text-red-500 mx-auto mb-4" size={48} />
              <h2 className="text-lg font-semibold text-gray-800">Payment Failed</h2>
              <p className="text-sm text-gray-500 mt-2">{message}</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-6 px-6 py-2.5 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Try Again
              </button>
            </>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;