import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../Api/axiosInstance";

const statusStyles = {
  "In Progress": "bg-[#DBEAFE] text-[#1447E6]",
  "Under Review": "bg-[#FEF9C2] text-[#A65F00]",
  Accepted: "bg-[#DCFCE7] text-[#008236]",
  Rejected: "bg-[#FFE2E2] text-[#C10007]",
};

const statusIcons = {
  "In Progress": "/Images/pending.webp",
  "Under Review": "/Images/underreview.webp",
  Accepted: "/Images/success.webp",
  Rejected: "/Images/reject.webp",
};

const ApplicationSection = () => {
  const [openId, setOpenId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get("/applications/my-applications");
        setApplications(res.data.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const stats = [
    { label: "Total Application", value: applications.length, color: "#101828" },
    { label: "In Progress", value: applications.filter((a) => a.status === "In Progress").length, color: "#155DFC" },
    { label: "Accepted", value: applications.filter((a) => a.status === "Accepted").length, color: "#00A63E" },
    { label: "Rejected", value: applications.filter((a) => a.status === "Rejected").length, color: "#E7000B" },
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US");
  };

  if (loading) {
    return (
      <div className="py-4 md:py-6 flex justify-center items-center min-h-[300px]">
        <p className="font-inter text-sm text-[#4A5565]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6 min-h-screen space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((config, i) => (
          <div key={i} className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm text-start">
            <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565] break-all">{config.label}</p>
            <p className="font-inter font-bold text-[22px] md:text-[24px] break-all" style={{ color: config.color }}>{config.value}</p>
          </div>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-6 text-center">
          <p className="font-inter text-sm text-[#4A5565]">No applications found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
              <div className="flex justify-between items-center border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-4 px-4 md:-mx-6 md:px-6">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center items-center gap-2">
                    <img src={statusIcons[app.status] ?? "/Images/pending.webp"} alt="icon" width={20} height={20} />
                    <h3 className="font-inter font-semibold text-[18px] md:text-[20px] text-[#101828] break-all">{app.university}</h3>
                  </div>
                  <p className="font-inter font-medium text-sm md:text-[16px] text-[#364153] break-all">{app.program}</p>
                  <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565] break-all">{app.country}</p>
                  <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282] break-all">Applied: {formatDate(app.createdAt)}</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <span className={`font-inter font-normal text-xs md:text-sm px-4 py-2 rounded-full ${statusStyles[app.status]}`}>
                    {app.status}
                  </span>
                  <Eye
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setOpenId(openId === app.id ? null : app.id)}
                  />
                </div>
              </div>

              {openId === app.id && (
                <div className="mt-4 space-y-3">
                  <h4 className="font-inter font-medium text-xs md:text-sm text-[#364153] break-all">Application Timeline</h4>
                  {(app.timeline ?? []).map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex flex-col items-center relative">
                        <div className={`flex justify-center items-center w-4 h-4 md:w-8 md:h-8 rounded-full z-10 ${step.done ? "bg-[#B9F8CF]" : "bg-gray-300"}`}>
                          <img
                            src={step.done ? "/Images/success.webp" : "/Images/pendinggray.webp"}
                            alt="icon"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className={`w-[2px] h-6 md:h-12 ${step.done ? "bg-[#B9F8CF]" : "bg-gray-300"}`} />
                      </div>
                      <div>
                        <p className="font-inter font-medium text-sm md:text-[16px] text-[#101828] break-all">{step.label}</p>
                        {step.date && (
                          <p className="font-inter font-normal text-xs md:text-sm text-[#6A7282] break-all">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationSection;