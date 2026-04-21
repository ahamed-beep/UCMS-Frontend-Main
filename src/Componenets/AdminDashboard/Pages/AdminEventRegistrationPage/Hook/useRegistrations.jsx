import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../../../Api/axiosInstance";

export const useRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/registrations?page=${page}&limit=${limit}`);
      setRegistrations(res.data?.data?.data || []);
      setTotal(res.data?.data?.total || 0);
    } catch (err) {
      console.error("Failed to fetch registrations", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  return { registrations, loading, page, setPage, total, limit, refetch: fetchRegistrations };
};