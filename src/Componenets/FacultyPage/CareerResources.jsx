import { useState, useEffect } from "react";
import { ArrowRight, FileText, Download, Loader2 } from "lucide-react";
import axiosInstance from "../../../Api/axiosInstance";
import { Link } from "react-router-dom";

const CareerResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axiosInstance.get("/career-resources", {
          params: { status: "active", limit: 10, page: 1 },
        });
        setResources(res.data.data.data);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleDownload = async (resource) => {
    if (downloading === resource.id) return;
    setDownloading(resource.id);

    try {
      await axiosInstance.post(`/career-resources/${resource.id}/download`);

      const link = document.createElement("a");
      link.href = resource.fileUrl;
      link.target = "_blank";
      link.download = `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setResources((prev) =>
        prev.map((r) =>
          r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r
        )
      );
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setDownloading(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDownloads = (count) => {
    return (count ?? 0).toLocaleString() + " downloads";
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter mb-6 wrap-break-word">
          Career Resources
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin" />
          </div>
        ) : resources.length === 0 ? (
          <p className="text-center text-[#4A5565] py-16">No resources available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resources.map((r) => (
              <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-[#FF6B35]" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded text-[#1447E6] bg-[#DBEAFE]">
                    {r.tag}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#0A0A0A] font-inter mb-1 wrap-break-word">
                  {r.title}
                </h3>

                {r.subtitle && (
                  <p className="text-sm text-[#4A5565] font-inter mb-1 wrap-break-word">
                    {r.subtitle}
                  </p>
                )}

                <p className="text-sm text-[#4A5565] font-inter mb-1">
                  {formatDownloads(r.downloads)}
                </p>

                <p className="text-xs text-[#9CA3AF] font-inter mb-4">
                  Added {formatDate(r.createdAt)}
                </p>

                <button
                  onClick={() => handleDownload(r)}
                  disabled={downloading === r.id}
                  className="w-full bg-[#FF6B35] font-inter hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {downloading === r.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {downloading === r.id ? "Downloading..." : "Download"}
                </button>
              </div>
            ))}
          </div>
        )}

     
      </div>
    </section>
  );
};

export default CareerResources;