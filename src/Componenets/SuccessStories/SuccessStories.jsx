import { useEffect, useState, useRef } from "react";
import { Check, Star, Quote, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../ResuableUi/Navbar";
import Head from "../../ResuableUi/Head";
import Footer from "../../ResuableUi/Footer";
import axiosInstance from "../../Api/axiosInstance";
import { afterItems, beforeItems, stats } from "./Constant/SuccessStoriesConstant";
import { Link } from "react-router-dom";



const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const VideoCard = ({ v }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.play();
      setPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * duration;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative aspect-video bg-[#1E2939] cursor-pointer" onClick={toggle}>
        <video
          ref={videoRef}
          src={v.videoUrl}
          className="w-full h-full object-cover"
          onTimeUpdate={() => setCurrent(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onEnded={() => setPlaying(false)}
          preload="metadata"
        />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            {playing
              ? <Pause className="w-6 h-6 text-white fill-white" />
              : <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            }
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-inter">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>
      <div className="h-1 bg-gray-100 cursor-pointer" onClick={handleSeek}>
        <div
          className="h-full bg-[#155DFC] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#0A0A0A] font-inter">{v.name}</h3>
        <p className="text-xs text-[#4A5565] font-inter mt-0.5">{v.university}</p>
      </div>
    </div>
  );
};

const Carousel = ({ items, perPage, columns, renderCard }) => {
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const totalPages = Math.ceil(items.length / perPage);

  useEffect(() => { setPage(0); }, [items.length]);

  const goTo = (newPage, dir) => {
    if (animating || newPage === page) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setPage(newPage);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo(Math.max(page - 1, 0), "left");
  const next = () => goTo(Math.min(page + 1, totalPages - 1), "right");
  const visible = items.slice(page * perPage, page * perPage + perPage);

  const animClass = animating
    ? direction === "right" ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"
    : "opacity-100 translate-x-0";

  return (
    <div>
      <div
        className={`grid gap-5 transition-all duration-300 ease-out ${animClass}`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {visible.map((item) => renderCard(item))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev} disabled={page === 0 || animating}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#155DFC] disabled:opacity-30 hover:bg-blue-50 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > page ? "right" : "left")}
              className={`rounded-full transition-all duration-300 ${
                i === page ? "w-6 h-2.5 bg-[#155DFC]" : "w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
          <button
            onClick={next} disabled={page === totalPages - 1 || animating}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#155DFC] disabled:opacity-30 hover:bg-blue-50 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const TestimonialCard = ({ t }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col h-full">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-semibold shrink-0"
          style={{ background: "linear-gradient(to right, #155DFC, #193CB8)" }}
        >
          {t.initials}
        </div>
        <div>
          <h3 className="font-bold text-[#0A0A0A] font-inter text-sm">{t.name}</h3>
          <p className="text-xs text-[#4A5565] font-inter">{t.program}</p>
        </div>
      </div>
      {t.flagUrl && <img className="w-5 h-5" src={t.flagUrl} alt="" />}
    </div>
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
      ))}
    </div>
    <div className="relative mb-3 flex-1">
      <Quote className="w-6 h-6 text-[#DBEAFE] absolute -top-1 -left-1" />
      <p className="text-sm text-[#364153] font-inter italic pl-5">"{t.quote}"</p>
    </div>
    <p className="text-sm font-semibold text-[#0F4C8A] font-inter mb-3">{t.university}</p>
    <div className="inline-flex items-center gap-1.5 bg-[#FF6B3570] text-[#193CB8] text-xs font-medium px-3 py-1.5 rounded-full self-start">
      <Check className="w-3 h-3" />
      {t.badge}
    </div>
  </div>
);

const SuccessStories = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [videoTestimonials, setVideoTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsRes, videoTestimonialsRes] = await Promise.all([
          axiosInstance.get("/testimonials"),
          axiosInstance.get("/video-testimonials"),
        ]);
        setTestimonials(testimonialsRes.data.data);
        setVideoTestimonials(videoTestimonialsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Head
        title="Success Stories"
        subtitle="Real students, real dreams, real success. Read how we've helped thousands achieve their study abroad goals"
      />

      <div className="min-h-screen px-4">
        <div className="max-w-6xl mx-auto">

          <div className="mt-12 bg-blue-50/60 border border-blue-100 rounded-xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold font-inter text-[#155DFC]">{s.value}</div>
                <div className="text-sm text-[#4A5565] font-inter mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-[#0A0A0A] font-inter text-center mt-15 md:mt-12 mb-12">
            Student Testimonials
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-[#155DFC] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="md:hidden flex gap-4 overflow-x-auto pb-3 px-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {testimonials.map((t) => (
                  <div key={t.id} className="shrink-0 w-[80vw] snap-start">
                    <TestimonialCard t={t} />
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-hidden">
                <Carousel
                  items={testimonials}
                  perPage={6}
                  columns={3}
                  renderCard={(t) => <TestimonialCard key={t.id} t={t} />}
                />
              </div>
            </>
          )}

          <div className="mt-12 rounded-xl p-6">
            <h2 className="text-3xl font-bold font-inter text-[#0A0A0A] text-center mb-10">
              Video Testimonials
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-4 border-[#155DFC] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div className="md:hidden flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {videoTestimonials.map((v) => (
                    <div key={v.id} className="shrink-0 w-[75vw] snap-start">
                      <VideoCard v={v} />
                    </div>
                  ))}
                </div>

                <div className="hidden md:block overflow-hidden">
                  <Carousel
                    items={videoTestimonials}
                    perPage={3}
                    columns={3}
                    renderCard={(v) => <VideoCard key={v.id} v={v} />}
                  />
                </div>
              </>
            )}
          </div>

          <h2 className="text-3xl font-bold text-[#0A0A0A] font-inter text-center mt-12 mb-10">
            Transformation Journeys
          </h2>
          <div className="bg-gradient-to-r from-[#FEF2F2] mb-15 to-[#51A2FF]/20 border border-gray-100 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="inline-block font-inter bg-[#FFE2E2] text-[#C10007] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Before
              </span>
              <ul className="space-y-2">
                {beforeItems.map((item) => (
                  <li key={item} className="text-sm text-[#FF6B35] font-inter flex gap-2">
                    <span>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="inline-block bg-[#155DFC33] text-[#193CB8] font-inter text-xs font-semibold px-3 py-1 rounded-full mb-3">
                After Upskills
              </span>
              <ul className="space-y-2">
                {afterItems.map((item) => (
                  <li key={item} className="text-sm text-[#0F4C8A] font-inter flex gap-2">
                    <span>•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      <section className="relative w-full h-[220px] flex justify-center items-center bg-gradient-to-r from-[#0F4C8A] to-[#3A7BD5] bg-cover bg-center">
        <div className="absolute inset-0 bg-[url('/Images/bg.png')] opacity-20"></div>
        <div className="relative w-full md:mt-16 mt-10 py-3 z-10">
          <h3 className="font-inter font-bold text-xl md:text-3xl text-white text-center">
            Ready to Write Your Success Story?
          </h3>
          <p className="font-inter font-normal text-[13px] md:text-[15px] text-[#DBEAFE] text-center py-3 px-2 md:py-2 mx-auto w-full md:w-[50%]">
            Join thousands of successful students who achieved their dreams with our guidance
          </p>
          <div className="text-center">
            <Link to="/contact" className="bg-[#FFFFFF]  p-3 mt-2 mb-15 rounded-lg font-semibold text-[#FF6B35] font-inter text-xs">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;