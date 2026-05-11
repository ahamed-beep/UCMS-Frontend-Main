import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../Api/axiosInstance';

const getImagePath = (status) => {
  if (status === 'fulfilled') return '/Images/success.webp';
  if (status === 'pending') return '/Images/pending.webp';
  return '/Images/error.webp';
};

const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const RecentNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get('/notifications/my');
        setNotifications(res.data.data ?? res.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm pb-5">
        <div className="mx-5 space-y-4">
          <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828] border-b-[0.89px] py-5 ps-5 border-[#E5E7EB] -mx-5">
            Recent Notifications
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-6 text-[#64748b] text-sm gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-[#6A7282] text-center py-6">No notifications yet.</p>
          ) : (
            notifications.map((note, i) => (
              <div key={note.id ?? i} className="flex items-center gap-3">
                <img src={getImagePath(note.status)} width={20} height={20} className="flex-shrink-0" />
                <div>
                  <p className="font-inter font-normal text-[12px] md:text-sm text-[#101828] break-all">{note.message}</p>
                  <p className="font-inter font-normal text-[10px] md:text-[12px] text-[#6A7282] break-all">{timeAgo(note.createdAt)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentNotification;