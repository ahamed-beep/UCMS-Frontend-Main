import { useState } from "react";
import { courseModules, courses } from "../CourseSection/CourseConstant";
import {
  CheckCircle,
  Circle,
  Lock,
  BookOpen,
  Clock,
  Award,
  PlayCircle,
  FileText,
  HelpCircle,
  ChevronDown,
  Download,
  GraduationCap
} from "lucide-react";
import CourseStats from "./CourseStats";
import InstructorCard from "./InstructorCard";
import NeedHelpCard from "./NeedHelpCard";
import VideoModal from "./VideoModal";
import { useParams } from "react-router-dom";

function CoursePage() {
  const { slug } = useParams();
  const [completed, setCompleted] = useState({});
  const [open, setOpen] = useState({ m1: true });
  const [activeVideo, setActiveVideo] = useState(null);

  const modules = courseModules[slug] ?? [];
  const courseInfo = courses.find((c) => c.slug === slug);

  const markDone = (id) => setCompleted((c) => ({ ...c, [id]: true }));

  const isModuleComplete = (m) => {
    return m.items.every((it) => completed[it.id]);
  };

  const isModuleUnlocked = (idx) => {
    if (idx === 0) return true;
    return modules.slice(0, idx).every((m) => isModuleComplete(m));
  };

  const totalItems = modules.reduce((s, m) => s + m.items.length, 0);
  const completedItemsCount = modules.reduce(
    (s, m) => s + m.items.filter((it) => completed[it.id]).length,
    0
  );
  const completedModulesCount = modules.filter((m) => isModuleComplete(m)).length;
  const progressPct = Math.round((completedItemsCount / totalItems) * 100);

  const getLectureIcon = (type) => {
    if (type === "video") return <PlayCircle className="w-5 h-5 text-blue-600" />;
    if (type === "quiz") return <HelpCircle className="w-5 h-5 text-blue-600" />;
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const triggerDownload = (href, filename) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResourceDownload = (e, r) => {
    e.preventDefault();
    triggerDownload(r.url, r.name);
  };

  const handleDocDownload = (e, it) => {
    e.preventDefault();
    triggerDownload(
      `data:text/plain;charset=utf-8,${encodeURIComponent(it.title)}`,
      `${it.title}.pdf`
    );
    markDone(it.id);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="text-sm mb-4 flex items-center gap-1">
          <a href="#" className="text-blue-600 hover:underline">My Courses</a>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-500">{courseInfo?.title}</span>
        </div>

        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 sm:p-8 text-white flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-blue-100 text-sm mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Course</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{courseInfo?.title}</h1>
            <p className="text-blue-100 max-w-2xl leading-relaxed">
              {courseInfo?.description ?? "Comprehensive preparation covering all modules with expert guidance and practice materials."}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-blue-100">
              <div className="flex items-center gap-2"><Award className="w-4 h-4" /> Instructor: {courseInfo?.teacher}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {courseInfo?.hours ?? "N/A"} total</div>
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {modules.length} modules</div>
            </div>
          </div>

          <div className="bg-blue-600/40 rounded-lg p-5 w-full lg:w-72 shrink-0">
            <div className="text-blue-100 text-sm mb-1">Course Progress</div>
            <div className="text-4xl font-bold mb-3">{progressPct}%</div>
            <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="text-blue-100 text-sm mt-3">
              {completedItemsCount} of {totalItems} lectures completed
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Course Content</h2>

            <div className="space-y-3">
              {modules.map((m, idx) => {
                const unlocked = isModuleUnlocked(idx);
                const moduleDone = unlocked && isModuleComplete(m);
                const isOpen = !!open[m.id] && unlocked;

                return (
                  <div key={m.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => unlocked && setOpen((o) => ({ ...o, [m.id]: !o[m.id] }))}
                      className={`w-full flex items-center justify-between p-4 text-left ${unlocked ? "hover:bg-gray-50" : "cursor-not-allowed"}`}
                    >
                      <div className="flex items-start gap-3">
                        {!unlocked ? (
                          <Lock className="w-6 h-6 text-gray-400 mt-0.5" />
                        ) : moduleDone ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300 mt-0.5" />
                        )}
                        <div>
                          <div className={`font-bold ${unlocked ? "text-gray-900" : "text-gray-400"}`}>
                            {m.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {m.items.length} lectures <span className="mx-1">•</span> {m.hours}
                            {!unlocked && <span className="text-orange-500 ml-2">Locked</span>}
                          </div>
                        </div>
                      </div>
                      {unlocked && (
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 space-y-2">
                        {m.items.map((it) => {
                          const done = !!completed[it.id];

                          if (it.type === "doc") {
                            return (
                              <div
                                key={it.id}
                                className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100"
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  {getLectureIcon(it.type)}
                                  <div>
                                    <div className="font-semibold text-gray-900 text-sm">{it.title}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{it.duration}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => handleDocDownload(e, it)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Download document"
                                  >
                                    <Download className="w-5 h-5" />
                                  </button>
                                  {done && <CheckCircle className="w-5 h-5 text-green-500" />}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={it.id}
                              className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100"
                            >
                              <button
                                onClick={() => {
                                  if (it.type === "video") setActiveVideo(it);
                                  else markDone(it.id);
                                }}
                                className="flex items-center gap-3 text-left flex-1 hover:opacity-80"
                              >
                                {getLectureIcon(it.type)}
                                <div>
                                  <div className="font-semibold text-gray-900 text-sm">{it.title}</div>
                                  <div className="text-xs text-gray-500 mt-0.5">{it.duration}</div>
                                </div>
                              </button>
                              {done && <CheckCircle className="w-5 h-5 text-green-500" />}
                            </div>
                          );
                        })}

                        {m.resources && m.resources.length > 0 && (
                          <div className="pt-3">
                            <div className="text-sm font-semibold text-gray-700 mb-2">Downloadable Resources</div>
                            <div className="space-y-2">
                              {m.resources.map((r) => (
                                <div
                                  key={r.id}
                                  className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <div className="font-semibold text-gray-900 text-sm">{r.name}</div>
                                      <div className="text-xs text-gray-500 mt-0.5">{r.meta}</div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => handleResourceDownload(e, r)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Download resource"
                                  >
                                    <Download className="w-5 h-5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <CourseStats
              totalLectures={totalItems}
              completedModulesCount={completedModulesCount}
              modulesLength={modules.length}
              progressPct={progressPct}
            />
            <InstructorCard />
            <NeedHelpCard />
          </div>
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          lecture={activeVideo}
          alreadyCompleted={!!completed[activeVideo.id]}
          onClose={() => setActiveVideo(null)}
          onComplete={() => markDone(activeVideo.id)}
        />
      )}
    </div>
  );
}

export default CoursePage;