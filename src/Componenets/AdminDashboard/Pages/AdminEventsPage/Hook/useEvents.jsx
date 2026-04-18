import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../../../Api/axiosInstance";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/events/admin/all?page=${page}&limit=${limit}`);
      setEvents(res.data?.data?.data || []);
      setTotal(res.data?.data?.total || 0);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  return { events, loading, page, setPage, total, limit, refetch: fetchEvents };
};