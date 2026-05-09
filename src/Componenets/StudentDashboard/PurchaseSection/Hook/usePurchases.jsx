import { useState, useEffect } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

export function usePurchases() {
  const [purchases, setPurchases] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPurchases = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.get("/payments/my-payments");

      setPurchases(data.data);
      setTotalSpent(data.totalSpent);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch purchases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return { purchases, totalSpent, loading, error, refetch: fetchPurchases };
}