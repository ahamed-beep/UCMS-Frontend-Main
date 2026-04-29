import { useEffect, useState } from "react";
import { Award, Building2, Calendar, School, Trophy, Users } from "lucide-react";
import Footer from "../../ResuableUi/Footer";
import Head from "../../ResuableUi/Head";
import Navbar from "../../ResuableUi/Navbar";
import axiosInstance from "../../Api/axiosInstance";

const SECTIONS_META = [
  {
    section: "office",
    title: "Office",
    subtitle: "Our modern office spaces and consultation areas",
    icon: <Building2 size={28} color="white" />,
  },
  {
    section: "certificates",
    title: "Certificates",
    subtitle: "Accreditations, awards, and recognitions",
    icon: <Award size={28} color="white" />,
  },
  {
    section: "achievements",
    title: "Achievements",
    subtitle: "Student success stories and milestones",
    icon: <Trophy size={28} color="white" />,
  },
  {
    section: "students",
    title: "Students",
    subtitle: "Life at UCMS and student experiences",
    icon: <Users size={28} color="white" />,
  },
  {
    section: "events",
    title: "Events",
    subtitle: "Workshops, seminars, and special events",
    icon: <Calendar size={28} color="white" />,
  },
  {
    section: "facilities",
    title: "Facilities",
    subtitle: "Campus facilities and learning environments",
    icon: <School size={28} color="white" />,
  },
];

const SkeletonCard = ({ mobile }) =>
  mobile ? (
    <div className="w-56 h-40 rounded-xl bg-gray-200 animate-pulse flex-shrink-0" />
  ) : (
    <div className="aspect-[4/3] rounded-xl bg-gray-200 animate-pulse w-full" />
  );

const GalleryPage = () => {
  const [grouped, setGrouped] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get("/gallery");
        const items = res.data?.data || [];

        const map = {};
        SECTIONS_META.forEach((m) => (map[m.section] = []));
        items.forEach((item) => {
          const key = item.section?.toLowerCase();
          if (map[key]) {
            item.images.forEach((img) => map[key].push(img));
          }
        });

        setGrouped(map);
      } catch (err) {
        console.error("Gallery fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div>
      <Navbar />
      <Head
        title="Gallery"
        subtitle="Explore our office spaces, certifications, achievements, and the vibrant life at UCMS."
      />

      <div className="px-6 py-10 space-y-16">
        {SECTIONS_META.map((section, idx) => {
          const images = grouped[section.section] || [];

          return (
            <div key={idx} className="flex flex-col items-center">
              {/* Icon */}
              <div className="w-14 h-14 mb-3 rounded-full bg-[#FF6B35] flex items-center justify-center">
                {section.icon}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-poppins text-[#1A2942] font-bold mb-1">
                {section.title}
              </h2>

              {/* Subtitle */}
              <p className="text-md font-inter text-[#4A5565] mb-6 text-center break-all">
                {section.subtitle}
              </p>

              {/* ── MOBILE: horizontal scroll ── */}
              <div
                className="w-full block sm:hidden overflow-x-auto pb-3"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#FF6B35 #f3f4f6" }}
              >
                <div className="flex gap-4" style={{ width: "max-content" }}>
                  {loading ? (
                    Array(4).fill(0).map((_, i) => <SkeletonCard key={i} mobile />)
                  ) : error ? (
                    <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                      Images load failed
                    </p>
                  ) : images.length === 0 ? (
                    <p className="text-gray-400 text-sm py-8">No images found</p>
                  ) : (
                    images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="w-56 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100"
                      >
                        <img
                          src={img}
                          alt={`${section.title} ${imgIdx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* ── DESKTOP: 4-col grid ── */}
              <div className="w-full hidden sm:grid grid-cols-4 gap-6">
                {loading ? (
                  Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : error ? (
                  <div className="col-span-4 text-center">
                    <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg inline-block">
                      Images load failed
                    </p>
                  </div>
                ) : images.length === 0 ? (
                  <div className="col-span-4 text-center py-8">
                    <p className="text-gray-400 text-sm">No images found</p>
                  </div>
                ) : (
                  images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-sm"
                    >
                      <img
                        src={img}
                        alt={`${section.title} ${imgIdx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default GalleryPage;