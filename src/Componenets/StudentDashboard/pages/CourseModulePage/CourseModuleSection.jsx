import { useEffect, useState } from 'react';
import {
  CheckCircle, Circle, Lock, BookOpen, Clock, Award,
  PlayCircle, FileText, HelpCircle, ChevronDown, Download, BookOpenIcon, ClipboardList
} from "lucide-react";
import CourseStats from "./CourseStats";
import InstructorCard from "./InstructorCard";
import NeedHelpCard from "./NeedHelpCard";
import VideoModal from "./VideoModal";
import axiosInstance from "../../../../Api/axiosInstance";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UploadAssignmentModal from "../StudentAssignments/UploadAssignmentModal";
import FeedbackModal from "../StudentAssignments/FeedbackModal";
import ExercisePage from '../ExercisePage/ExercisePage';

function CoursePage({ courseId, onBack }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const resolvedId = courseId ?? id;
  const location = useLocation();

  const [courseInfo, setCourseInfo] = useState(null);
  const [modules, setModules] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState({});
  const [open, setOpen] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [lectureQuizzes, setLectureQuizzes] = useState({});
  const [lectureAssignments, setLectureAssignments] = useState({});
  const [uploadTarget, setUploadTarget] = useState(null);
  const [feedbackTarget, setFeedbackTarget] = useState(null);

  useEffect(() => {
    if (!resolvedId) return;

    const fetchAll = async () => {
      try {
        const [courseRes, modulesRes, materialsRes, exercisesRes, progressRes, instructorRes] = await Promise.all([
          axiosInstance.get(`/courses/${resolvedId}`),
          axiosInstance.get(`/courses/${resolvedId}/modules`),
          axiosInstance.get(`/courses/${resolvedId}/materials`),
          axiosInstance.get(`/courses/${resolvedId}/exercises`),
          axiosInstance.get(`/courses/${resolvedId}/progress`).catch(() => null),
          axiosInstance.get(`/courses/${resolvedId}/instructor`).catch(() => null),
        ]);

        const courseData = courseRes.data.data;
        const modulesData = modulesRes.data.data;

        setCourseInfo(courseData);
        setMaterials(materialsRes.data.data ?? []);
        setExercises(exercisesRes.data.data ?? []);
        setInstructor(instructorRes?.data?.data ?? null);

        const completedIds =
          progressRes?.data?.completedLectureIds ??
          progressRes?.data?.data?.completedLectureIds ?? [];

        const initialCompleted = {};
        completedIds.forEach((lid) => { initialCompleted[lid] = true; });
        setCompleted(initialCompleted);

        const modulesWithResources = await Promise.all(
          modulesData.map(async (mod) => {
            try {
              const [resRes, lecRes] = await Promise.all([
                axiosInstance.get(`/modules/${mod.id}/resources`),
                axiosInstance.get(`/modules/${mod.id}/lectures`),
              ]);
              return {
                ...mod,
                resources: resRes.data.data ?? [],
                lectures: lecRes.data.data ?? [],
              };
            } catch {
              return { ...mod, resources: [], lectures: [] };
            }
          })
        );

        setModules(modulesWithResources);

        const allLectures = modulesWithResources.flatMap((m) => m.lectures ?? []);

        const [quizResults, assignmentResults] = await Promise.all([
          Promise.all(
            allLectures.map((lec) =>
              axiosInstance.get(`/lectures/${lec.id}/quizzes`)
                .then((r) => ({ lectureId: lec.id, quizzes: r.data.data ?? [] }))
                .catch(() => ({ lectureId: lec.id, quizzes: [] }))
            )
          ),
          Promise.all(
            allLectures.map((lec) =>
              axiosInstance.get(`/lectures/${lec.id}/assignments/student`)
                .then((r) => ({ lectureId: lec.id, assignments: r.data?.data ?? r.data ?? [] }))
                .catch(() => ({ lectureId: lec.id, assignments: [] }))
            )
          ),
        ]);

        const quizMap = {};
        quizResults.forEach(({ lectureId, quizzes }) => { quizMap[lectureId] = quizzes; });
        setLectureQuizzes(quizMap);

        const assignmentMap = {};
        assignmentResults.forEach(({ lectureId, assignments }) => { assignmentMap[lectureId] = assignments; });
        setLectureAssignments(assignmentMap);

        if (modulesWithResources.length) {
          setOpen({ [modulesWithResources[0].id]: true });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [resolvedId]);

  useEffect(() => {
    if (!location.state?.quizCompleted) return;
    const completedLectureId = location.state?.lectureId;
    if (completedLectureId) {
      setCompleted((c) => ({ ...c, [completedLectureId]: true }));
      axiosInstance.get(`/lectures/${completedLectureId}/quizzes`)
        .then((r) => {
          setLectureQuizzes((prev) => ({ ...prev, [completedLectureId]: r.data.data ?? [] }));
        }).catch(() => {});
    }
    window.history.replaceState({}, '');
  }, [location.state]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const markDone = async (lectureId) => {
    try {
      await axiosInstance.post(`/courses/${resolvedId}/progress/lectures/${lectureId}/complete`);
      setCompleted((c) => ({ ...c, [lectureId]: true }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartLectureQuiz = (lectureId, quizItem) => {
    navigate(`/student/quiz/${quizItem.quizId}`, {
      state: {
        submitEndpoint: `/lectures/${lectureId}/quizzes/${quizItem.quizId}/submit`,
        returnTo: `/student/course/${resolvedId}`,
        lectureId,
      },
    });
  };

  const handleAssignmentSubmitted = (lectureId, assignmentId, submission) => {
    setLectureAssignments((prev) => ({
      ...prev,
      [lectureId]: (prev[lectureId] ?? []).map((a) =>
        a.id === assignmentId
          ? { ...a, status: "submitted", fileUrl: submission.fileUrl, submittedAt: submission.createdAt }
          : a
      ),
    }));
    setUploadTarget(null);
  };

  const isModuleComplete = (m) => m.lectures?.every((it) => completed[it.id]);
  const isModuleUnlocked = (idx) => {
    if (idx === 0) return true;
    return modules.slice(0, idx).every((m) => isModuleComplete(m));
  };

  const totalLectures = modules.reduce((s, m) => s + (m.lectures?.length ?? 0), 0);
  const completedLecturesCount = modules.reduce(
    (s, m) => s + (m.lectures?.filter((it) => completed[it.id]).length ?? 0), 0
  );
  const allQuizzes = Object.values(lectureQuizzes).flat();
  const completedQuizzesCount = allQuizzes.filter((q) => q.isCompleted).length;
  const allAssignments = Object.values(lectureAssignments).flat();
  const completedAssignmentsCount = allAssignments.filter(
    (a) => a.status === "submitted" || a.status === "graded"
  ).length;
  const totalItems = totalLectures + allQuizzes.length + allAssignments.length;
  const completedItemsCount = completedLecturesCount + completedQuizzesCount + completedAssignmentsCount;
  const completedModulesCount = modules.filter((m) => isModuleComplete(m)).length;
  const progressPct = totalItems ? Math.round((completedItemsCount / totalItems) * 100) : 0;

  const getLectureIcon = (type) => {
    if (type === 'video') return <PlayCircle className="w-5 h-5 text-[#0F4C8A]" />;
    if (type === 'quiz') return <HelpCircle className="w-5 h-5 text-[#0F4C8A]" />;
    return <FileText className="w-5 h-5 text-[#0F4C8A]" />;
  };

  if (loading) return <div className="py-20 text-center text-[#4A5565]">Loading...</div>;
  if (!courseInfo) return <div className="py-20 text-center text-[#4A5565]">Course not found.</div>;

  if (activeExercise) {
    return (
      <ExercisePage
        courseId={resolvedId}
        exercise={activeExercise}
        onBack={() => setActiveExercise(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-sm mb-4 flex items-center gap-1">
          <button onClick={handleBack} className="text-[#0F4C8A] font-inter hover:underline">My Courses</button>
          <span className="text-[#4A5565] font-inter mx-2">/</span>
          <span className="text-[#4A5565] font-inter">{courseInfo.title}</span>
        </div>

        <div className="rounded-xl p-6 sm:p-8 text-white flex flex-col lg:flex-row gap-6 lg:items-center justify-between"
          style={{ background: "linear-gradient(135deg, #0F4C8A, #1565C0)" }}>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-white font-inter text-md mb-3">
              <BookOpenIcon className="w-5 h-5" /><span>Course</span>
            </div>
            <h1 className="text-3xl sm:text-4xl text-white font-inter font-bold mb-3">{courseInfo.title}</h1>
            <p className="text-[#DBEAFE] font-inter max-w-2xl leading-relaxed">{courseInfo.description}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-white font-inter">
              <div className="flex items-center gap-2"><Award className="w-4 h-4" /> Instructor: {courseInfo.teacher}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {courseInfo.hours} hours total</div>
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {modules.length} modules</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-5 w-full lg:w-72 shrink-0">
            <div className="text-blue-100 text-sm mb-1">Course Progress</div>
            <div className="text-4xl font-bold mb-3">{progressPct}%</div>
            <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="text-blue-100 text-sm mt-3">{completedItemsCount} of {totalItems} items completed</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-2 md:p-6">
            <h2 className="text-xl font-bold text-[#0A0A0A] font-inter mb-5">Course Content</h2>
            <div className="space-y-3">
              {modules.map((m, idx) => {
                const unlocked = isModuleUnlocked(idx);
                const moduleDone = unlocked && isModuleComplete(m);
                const isOpen = !!open[m.id] && unlocked;
                const lectures = m.lectures ?? [];

                return (
                  <div key={m.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => unlocked && setOpen((o) => ({ ...o, [m.id]: !o[m.id] }))}
                      className={`w-full flex items-center justify-between p-4 text-left ${unlocked ? 'hover:bg-gray-50' : 'cursor-not-allowed'}`}>
                      <div className="flex items-start gap-3">
                        {!unlocked ? <Lock className="w-6 h-6 text-gray-400 mt-0.5" />
                          : moduleDone ? <CheckCircle className="w-6 h-6 text-[#00A63E] mt-0.5" />
                          : <Circle className="w-6 h-6 text-gray-300 mt-0.5" />}
                        <div>
                          <div className={`font-bold font-inter ${unlocked ? 'text-[#0A0A0A]' : 'text-gray-400'}`}>{m.title}</div>
                          <div className="text-sm text-[#4A5565] font-inter mt-1">
                            {lectures.length} lectures <span className="mx-1">•</span> {m.hours}
                            {!unlocked && <span className="text-orange-500 ml-2">Locked</span>}
                          </div>
                        </div>
                      </div>
                      {unlocked && <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 space-y-2">
                        {lectures.map((it) => {
                          const done = !!completed[it.id];
                          const quizzes = lectureQuizzes[it.id] ?? [];
                          const assignments = lectureAssignments[it.id] ?? [];

                          if (it.type === 'doc') {
                            return (
                              <div key={it.id}>
                                <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100">
                                  <div className="flex items-center gap-3 flex-1">
                                    {getLectureIcon(it.type)}
                                    <div>
                                      <div className="font-semibold text-[#0A0A0A] font-inter text-sm">{it.title}</div>
                                      <div className="text-xs text-[#6A7282] font-inter mt-0.5">{it.duration}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = it.docUrl.replace('/upload/', '/upload/fl_attachment/');
                                      link.click();
                                      markDone(it.id);
                                    }} className="text-gray-400 hover:text-gray-600">
                                      <Download className="w-5 h-5 text-[#99A1AF]" />
                                    </button>
                                    {done && <CheckCircle className="w-5 h-5 text-[#00A63E]" />}
                                  </div>
                                </div>
                                {quizzes.map((qItem) => (
                                  <div key={qItem.id} className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-100 mt-2 ml-4">
                                    <div className="flex items-center gap-3">
                                      <HelpCircle className="w-4 h-4 text-[#0F4C8A]" />
                                      <div>
                                        <div className="font-semibold text-[#0A0A0A] font-inter text-sm">Lecture Quiz</div>
                                        <div className="text-xs text-[#6A7282] font-inter mt-0.5">
                                          {qItem.isCompleted ? `Score: ${qItem.scorePercent}%` : 'Complete to unlock next'}
                                        </div>
                                      </div>
                                    </div>
                                    {qItem.isCompleted
                                      ? <CheckCircle className="w-5 h-5 text-[#00A63E]" />
                                      : <button onClick={() => handleStartLectureQuiz(it.id, qItem)}
                                          className="text-xs bg-[#0F4C8A] text-white px-3 py-1 rounded-full font-inter hover:bg-blue-800">Start</button>
                                    }
                                  </div>
                                ))}
                                {assignments.map((aItem) => (
                                  <AssignmentRow key={aItem.id} assignment={aItem}
                                    onUpload={() => setUploadTarget({ assignment: aItem, lectureId: it.id })}
                                    onViewFeedback={() => setFeedbackTarget(aItem)} />
                                ))}
                              </div>
                            );
                          }

                          return (
                            <div key={it.id}>
                              <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100">
                                <button onClick={() => {
                                  if (it.type === 'video') setActiveVideo(it);
                                  else markDone(it.id);
                                }} className="flex items-center gap-3 text-left flex-1 hover:opacity-80">
                                  {getLectureIcon(it.type)}
                                  <div>
                                    <div className="font-semibold text-[#0A0A0A] font-inter text-sm">{it.title}</div>
                                    <div className="text-xs text-[#6A7282] font-inter mt-0.5">{it.duration}</div>
                                  </div>
                                </button>
                                {done && <CheckCircle className="w-5 h-5 text-[#00A63E]" />}
                              </div>
                              {quizzes.map((qItem) => (
                                <div key={qItem.id} className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-100 mt-2 ml-4">
                                  <div className="flex items-center gap-3">
                                    <HelpCircle className="w-4 h-4 text-[#0F4C8A]" />
                                    <div>
                                      <div className="font-semibold text-[#0A0A0A] font-inter text-sm">Lecture Quiz</div>
                                      <div className="text-xs text-[#6A7282] font-inter mt-0.5">
                                        {qItem.isCompleted ? `Score: ${qItem.scorePercent}%` : 'Complete to unlock next'}
                                      </div>
                                    </div>
                                  </div>
                                  {qItem.isCompleted
                                    ? <CheckCircle className="w-5 h-5 text-[#00A63E]" />
                                    : <button onClick={() => handleStartLectureQuiz(it.id, qItem)}
                                        className="text-xs bg-[#0F4C8A] text-white px-3 py-1 rounded-full font-inter hover:bg-blue-800">Start</button>
                                  }
                                </div>
                              ))}
                              {assignments.map((aItem) => (
                                <AssignmentRow key={aItem.id} assignment={aItem}
                                  onUpload={() => setUploadTarget({ assignment: aItem, lectureId: it.id })}
                                  onViewFeedback={() => setFeedbackTarget(aItem)} />
                              ))}
                            </div>
                          );
                        })}

                        {m.resources?.length > 0 && (
                          <div className="pt-3">
                            <div className="text-sm font-semibold text-[#0A0A0A] font-inter mb-2">Downloadable Resources</div>
                            <div className="space-y-2">
                              {m.resources.map((r) => (
                                <div key={r.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100">
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-[#0F4C8A]" />
                                    <div>
                                      <div className="font-semibold text-[#0A0A0A] font-inter text-sm">{r.name}</div>
                                      <div className="text-xs text-[#6A7282] font-inter mt-0.5">{r.meta}</div>
                                    </div>
                                  </div>
                                  <button onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = r.url.replace('/upload/', '/upload/fl_attachment/');
                                    link.download = r.name;
                                    link.click();
                                  }} className="text-[#99A1AF] hover:text-gray-600">
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
              enrolledAt={courseInfo.createdAt}
            />
            <InstructorCard instructor={instructor} />
            <NeedHelpCard />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
            <div className='border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-5'>
              <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Course Materials</h2>
              <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">Video lectures, PDFs, and presentation slides</p>
            </div>
            {materials.length === 0
              ? <p className="text-sm text-[#6A7282] text-center py-4">No materials yet.</p>
              : materials.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[10px]">
                <div className='flex items-center gap-2'>
                  <img src={item.type === 'video' ? '/Images/video.webp' : '/Images/pdf.webp'} alt="icon" className='w-5 h-5' />
                  <div>
                    <p className="font-inter font-medium text-[12px] md:text-sm text-[#101828]">{item.title}</p>
                    <p className="font-inter font-normal md:text-[12px] text-[10px] text-[#6A7282]">{item.sub}</p>
                  </div>
                </div>
                {item.type === 'video'
                  ? <button onClick={() => setActiveVideo(item)} className="text-[#4A5565] hover:text-[#0F4C8A]"><PlayCircle size={18} /></button>
                  : <button onClick={() => {
                      const link = document.createElement('a');
                      link.href = item.fileUrl.replace('/upload/', '/upload/fl_attachment/');
                      link.download = item.title;
                      link.click();
                    }} className="text-[#4A5565] hover:text-gray-700"><Download size={16} /></button>
                }
              </div>
            ))}
          </div>

          <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
            <div className='border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-5'>
              <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Practice Exercises</h2>
              <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">Writing, Reading, Listening & Speaking</p>
            </div>
            {exercises.length === 0
              ? <p className="text-sm text-[#6A7282] text-center py-4">No exercises yet.</p>
              : exercises.map((ex) => (
              <div key={ex.id} className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[10px]">
                <div className='flex items-center gap-2'>
                  <img src='/Images/pending.webp' alt="icon" className='w-5 h-5' />
                  <div>
                    <p className="font-inter font-medium text-[12px] md:text-sm text-[#101828]">{ex.title}</p>
                    <p className="font-inter font-normal md:text-[12px] text-[10px] text-[#6A7282] capitalize">{ex.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveExercise(ex)}
                  className="font-inter font-medium text-[10px] md:text-[12px] px-3 py-1 rounded-full bg-[#155DFC] text-white">
                  Start
                </button>
              </div>
            ))}
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

      {uploadTarget && (
        <UploadAssignmentModal
          assignment={uploadTarget.assignment}
          lectureId={uploadTarget.lectureId}
          onClose={() => setUploadTarget(null)}
          onSubmitted={(submission) =>
            handleAssignmentSubmitted(uploadTarget.lectureId, uploadTarget.assignment.id, submission)
          }
        />
      )}

      {feedbackTarget && (
        <FeedbackModal assignment={feedbackTarget} onClose={() => setFeedbackTarget(null)} />
      )}
    </div>
  );
}

function AssignmentRow({ assignment, onUpload, onViewFeedback }) {
  const statusMap = {
    pending: { label: "Pending", color: "text-[#F54900]", bg: "bg-orange-50 border-orange-100" },
    submitted: { label: "Submitted", color: "text-[#155DFC]", bg: "bg-blue-50 border-blue-100" },
    graded: { label: "Graded", color: "text-[#00A63E]", bg: "bg-green-50 border-green-100" },
  };
  const style = statusMap[assignment.status] ?? statusMap.pending;

  return (
    <div className={`flex items-center justify-between rounded-lg p-3 border mt-2 ml-4 ${style.bg}`}>
      <div className="flex items-center gap-3">
        <ClipboardList className="w-4 h-4 text-[#0F4C8A] shrink-0" />
        <div>
          <div className="font-semibold text-[#0A0A0A] font-inter text-sm">{assignment.title}</div>
          <div className={`text-xs font-inter mt-0.5 ${style.color}`}>
            {assignment.status === "graded"
              ? `Graded: ${assignment.grade ?? 0}%`
              : assignment.status === "submitted"
              ? "Submitted — awaiting grade"
              : assignment.dueDate
              ? `Due: ${new Date(assignment.dueDate).toLocaleDateString("en-GB")}`
              : "Assignment"}
          </div>
        </div>
      </div>
      {assignment.status === "pending" && (
        <button onClick={onUpload} className="text-xs bg-[#0F4C8A] text-white px-3 py-1 rounded-full font-inter hover:bg-blue-800 whitespace-nowrap">Upload</button>
      )}
      {assignment.status === "submitted" && (
        <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#155DFC] font-inter hover:underline whitespace-nowrap">View</a>
      )}
      {assignment.status === "graded" && (
        <button onClick={onViewFeedback} className="text-xs text-[#00A63E] font-inter hover:underline whitespace-nowrap">Feedback</button>
      )}
    </div>
  );
}

export default CoursePage;