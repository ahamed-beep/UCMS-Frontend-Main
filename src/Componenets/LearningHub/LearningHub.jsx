import { FileText, Video, Brain, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Navbar from "../../ResuableUi/Navbar";
import Head from "../../ResuableUi/Head";
import Footer from "../../ResuableUi/Footer";
import { Link } from "react-router-dom";

// ── Video Player Card ──────────────────────────────────────────────
const VideoCard = ({ title, views, src }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (current / duration) * 100 : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * duration;
    if (videoRef.current) { videoRef.current.currentTime = newTime; setCurrent(newTime); }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          onTimeUpdate={() => videoRef.current && setCurrent(videoRef.current.currentTime)}
          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
          onEnded={() => setPlaying(false)}
        />
        <button
          onClick={togglePlay}
          className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          {playing ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {fmt(current)} / {fmt(duration)}
        </span>
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-white/20 cursor-pointer z-10"
          onClick={handleSeek}
        >
          <div className="h-1 bg-[#FF6B35] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{views}</p>
      </div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────
const Index = () => {
  const desktopScrollRef = useRef(null);

  const scrollLeft = () => {
    if (desktopScrollRef.current)
      desktopScrollRef.current.scrollBy({ left: -460, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (desktopScrollRef.current)
      desktopScrollRef.current.scrollBy({ left: 460, behavior: "smooth" });
  };

  const blogCategories = [
    { count: "45 Articles", title: "Study Abroad Tips", color: "bg-[#DBEAFE] text-[#1447E6]" },
    { count: "32 Articles", title: "Visa Guidelines", color: "bg-[#DCFCE7] text-[#008236]" },
    { count: "28 Articles", title: "Career Advice", color: "bg-[#F3E8FF] text-[#8200DB]" },
    { count: "19 Articles", title: "Scholarship News", color: "bg-[#FFEDD4] text-[#CA3500]" },
  ];

  const ieltsResources = [
    { title: "IELTS Writing Task 2 - Essay Samples", downloads: "2,450 downloads", tag: "PDF", tagColor: "bg-blue-100 text-blue-600" },
    { title: "Speaking Part 2 - Cue Cards Collection", downloads: "1,890 downloads", tag: "PDF", tagColor: "bg-blue-100 text-blue-600" },
    { title: "Reading Strategies & Tips", downloads: "1,650 downloads", tag: "PDF", tagColor: "bg-blue-100 text-blue-600" },
    { title: "Listening Practice Tests", downloads: "2,120 downloads", tag: "Audio + PDF", tagColor: "bg-purple-100 text-purple-600" },
  ];

  const videos = [
    { title: "IELTS Writing Masterclass - Full Course", views: "12.5K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
    { title: "PTE Speaking Strategies", views: "8.2K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
    { title: "Complete Visa Guide - UK Student Visa", views: "15.3K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
    { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
    { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
    { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
    { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
        { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
            { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                    { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                        { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                            { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                                { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                                    { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
                                        { title: "University Application Process", views: "9.8K views", src: "https://res.cloudinary.com/ddhxxqkpc/video/upload/v1775653906/project_u5xzzu.mp4" },
  ];

  const quizzes = [
    { title: "IELTS Vocabulary Quiz - Academic Words", questions: "50 Questions", attempts: "3.2K Attempts" },
    { title: "Grammar Assessment Test", questions: "40 Questions", attempts: "2.8K Attempts" },
    { title: "Reading Comprehension Practice", questions: "30 Questions", attempts: "2.1K Attempts" },
  ];

  // Group videos into pairs for 2-row columns on desktop
  const videoPairs = [];
  for (let i = 0; i < videos.length; i += 2) {
    videoPairs.push(videos.slice(i, i + 2));
  }

  return (
    <div>
      <Navbar />
      <Head title="Learning Hub" subtitle="Your complete resource center for test preparation, study abroad guidance, and career development" />

      <div className="font-inter">
        {/* Blog & Articles */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-inter text-[#0A0A0A]">Blog & Articles</h2>
            <a href="#" className="text-sm text-[#0F4C8A] font-inter font-semibold hover:underline flex items-center gap-1">
              View All Posts <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogCategories.map((cat, i) => (
              <div key={i} className="bg-white border border-[#F3F4F6] rounded-lg p-5 hover:shadow-md transition-shadow">
                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${cat.color}`}>
                  {cat.count}
                </span>
                <h3 className="text-base font-semibold text-gray-900">{cat.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* IELTS / PTE Preparation Center */}
        <section className="bg-[#F9FAFB] py-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter mb-6">IELTS / PTE Preparation Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ieltsResources.map((r, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <FileText className="w-7 h-7 text-[#FF6B35]" />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded text-[#1447E6] bg-[#DBEAFE]">{r.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#0A0A0A] font-inter mb-1">{r.title}</h3>
                  <p className="text-sm text-[#4A5565] font-inter mb-4">{r.downloads}</p>
                  <button className="w-full bg-[#FF6B35] font-inter hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition-colors">
                    Enroll
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="#" className="text-sm text-[#0F4C8A] hover:underline font-semibold inline-flex items-center gap-1">
                Enroll in IELTS/PTE Classes <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Video Learning Library */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#0A0A0A] justify-center font-inter flex items-center gap-2">
                <Video className="w-7 h-7 text-[#0F4C8A]" />
                Video Learning Library
              </h2>
              {/* Arrow buttons — desktop only */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-[#F3F4F6] transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 text-[#0F4C8A]" />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center hover:bg-[#F3F4F6] transition-colors shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 text-[#0F4C8A]" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Mobile: single card swipe ── */}
          <div
            className="flex md:hidden gap-4 overflow-x-auto scroll-smooth px-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((v, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw]">
                <VideoCard title={v.title} views={v.views} src={v.src} />
              </div>
            ))}
          </div>

          {/* ── Desktop: pairs of 2 as columns → horizontal scroll ── */}
          <div
            ref={desktopScrollRef}
            className="hidden md:flex gap-5 overflow-x-auto scroll-smooth px-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videoPairs.map((pair, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-5 flex-shrink-0 w-[420px]">
                {pair.map((v, rowIdx) => (
                  <VideoCard key={rowIdx} title={v.title} views={v.views} src={v.src} />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Online Quizzes & Mock Tests */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter text-center mb-8 flex items-center justify-center gap-2">
              <Brain className="w-6 h-6 text-[#0F4C8A]" />
              Online Quizzes & Mock Tests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {quizzes.map((q, i) => (
                <div key={i} className="bg-white border border-[#F3F4F6] rounded-lg p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
                    <Brain className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0A0A0A] font-inter mb-2">{q.title}</h3>
                  <p className="text-sm text-[#4A5565] font-inter mb-4">
                    {q.questions} &nbsp;•&nbsp; {q.attempts}
                  </p>
                  <Link to="/Quizzes" >
                  
                  <button className="w-full bg-[#FF6B35] font-inter hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition-colors">
                    Start Quiz
                  </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized Guidance CTA */}
        <section className="relative w-full h-[220px] flex justify-center items-center bg-gradient-to-r from-[#0F4C8A] to-[#3A7BD5] bg-cover bg-center">
          <div className="absolute inset-0 bg-[url('/Images/bg.png')] opacity-20"></div>
          <div className="relative w-full md:mt-16 mt-10 py-3 z-10">
            <h3 className="font-inter font-bold text-xl md:text-3xl text-white text-center">
              Want Personalized Guidance?
            </h3>
            <p className="font-inter font-normal text-[13px] md:text-[15px] text-[#DBEAFE] text-center py-3 px-2 md:py-2 mx-auto w-full md:w-[50%]">
              Join our live classes and get expert feedback on your progress
            </p>
            <div className="text-center mt-4 mb-12">
              <Link to="/consultation" className="bg-[#FFFFFF] p-3 mb-15 rounded-lg font-semibold text-[#0F4C8A] font-inter text-xs">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;