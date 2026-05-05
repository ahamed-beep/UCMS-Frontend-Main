import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../Api/axiosInstance";

const STORAGE_KEY = (quizId) => `quiz_session_${quizId}`;

const QuizzesSection = () => {
  const navigate = useNavigate();
  const [lectureQuizzes, setLectureQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const enrollRes = await axiosInstance.get("/enrollments/my-courses");
        const enrollments = enrollRes.data.data ?? [];

        const courseIds = enrollments
          .filter((e) => e.isActive)
          .map((e) => (typeof e.courseId === "object" ? e.courseId?.id : e.courseId))
          .filter(Boolean);

        const modulesPerCourse = await Promise.all(
          courseIds.map((cId) =>
            axiosInstance.get(`/courses/${cId}/modules`)
              .then((r) => r.data.data ?? [])
              .catch(() => [])
          )
        );

        const allModules = modulesPerCourse.flat();

        const lecturesPerModule = await Promise.all(
          allModules.map((mod) =>
            axiosInstance.get(`/modules/${mod.id}/lectures`)
              .then((r) => (r.data.data ?? []).map((l) => ({ ...l, moduleTitle: mod.title })))
              .catch(() => [])
          )
        );

        const allLectures = lecturesPerModule.flat();

        const quizzesPerLecture = await Promise.all(
          allLectures.map((lec) =>
            axiosInstance.get(`/lectures/${lec.id}/quizzes`)
              .then((r) => (r.data.data ?? []).map((q) => ({
                ...q,
                lectureId: lec.id,
                lectureTitle: lec.title,
                moduleTitle: lec.moduleTitle,
              })))
              .catch(() => [])
          )
        );

        setLectureQuizzes(quizzesPerLecture.flat());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const getQuizStatus = (quiz) => {
    if (quiz.isCompleted) return "completed";
    const session = localStorage.getItem(STORAGE_KEY(quiz.quizId));
    if (session) return "in_progress";
    return "available";
  };

  const available = lectureQuizzes.filter((q) => getQuizStatus(q) === "available");
  const inProgress = lectureQuizzes.filter((q) => getQuizStatus(q) === "in_progress");
  const completed = lectureQuizzes.filter((q) => getQuizStatus(q) === "completed");

  const avgScore = completed.length
    ? Math.round(completed.reduce((s, q) => s + (q.scorePercent ?? 0), 0) / completed.length)
    : 0;

  const stats = [
    { title: "Available Quizzes", value: available.length, icon: "/Images/brain.webp" },
    { title: "Completed", value: completed.length, icon: "/Images/checkgreen.webp" },
    { title: "Average Score", value: completed.length ? `${avgScore}%` : "—", icon: "/Images/cup.webp" },
    { title: "In Progress", value: inProgress.length, icon: "/Images/orangeclock.webp" },
  ];

  const handleStart = (quiz) => {
    navigate(`/student/quiz/${quiz.quizId}`, {
      state: {
        submitEndpoint: `/lectures/${quiz.lectureId}/quizzes/${quiz.quizId}/submit`,
        returnTo: "/student/dashboard",
      },
    });
  };

  const STATUS_CONFIG = {
    completed: {
      badge: "bg-[#DCFCE7] text-[#008236]",
      label: "Completed",
    },
    in_progress: {
      badge: "bg-orange-100 text-orange-600",
      label: "In Progress",
    },
    available: {
      badge: "bg-[#0F4C8A] text-white",
      label: "Available",
    },
  };

  if (loading) return <div className="py-10 text-center text-[#4A5565]">Loading...</div>;

  return (
    <div className="py-4 md:py-6 min-h-screen space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className="p-4 md:p-6 flex justify-between items-center border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
            <div>
              <p className="font-inter font-medium text-[12px] md:text-sm text-[#4A5565]">{item.title}</p>
              <h2 className="font-inter font-bold text-[25px] md:text-[30px] text-[#0A0A0A]">{item.value}</h2>
            </div>
            <img src={item.icon} alt="icon" width={40} height={40} />
          </div>
        ))}
      </div>

      <div className="p-4 md:p-6 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm">
        <h2 className="font-inter font-semibold text-[16px] md:text-lg text-[#0A0A0A] mb-1">Online Quizzes</h2>
        <p className="font-inter font-medium text-[12px] md:text-sm text-[#4A5565] mb-4">Instant scores and automated evaluation</p>

        <div className="space-y-4">
          {lectureQuizzes.length === 0 && (
            <p className="text-center text-[#4A5565] font-inter py-6">No quizzes available.</p>
          )}

          {lectureQuizzes.map((quiz) => {
            const status = getQuizStatus(quiz);
            const config = STATUS_CONFIG[status];

            return (
              <div key={quiz.id} className="border-t-[0.89px] border-[#E5E7EB] px-4 md:px-6 -mx-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-inter font-semibold text-[16px] md:text-lg text-[#0A0A0A]">
                      {quiz.lectureTitle} — Quiz
                    </h3>
                    <span className={`font-inter font-medium text-[10px] md:text-xs px-3 py-1 rounded-full ${config.badge}`}>
                      {config.label}
                    </span>
                  </div>

                  <h4 className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                    {quiz.moduleTitle}
                  </h4>

                  <div className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565] flex gap-4 flex-wrap">
                    <div className="flex gap-2 items-center">
                      <img src="/Images/atp.webp" alt="icon" width={16} height={16} />
                      <span>Attempt {quiz.isCompleted ? "1/1" : "0/1"}</span>
                    </div>
                  </div>

                  {quiz.isCompleted && (
                    <p className="font-inter font-normal text-[12px] md:text-sm text-[#364153]">
                      Score: <span className="font-inter font-bold text-[16px] md:text-lg text-[#00A63E]">{quiz.scorePercent}%</span>
                    </p>
                  )}
                </div>

                {status === "completed" && (
                  <button className="font-inter font-medium text-sm md:text-[16px] px-5 py-2 rounded-[10px] bg-[#DCFCE7] text-[#008236] cursor-default">
                    Completed ✓
                  </button>
                )}

                {status === "in_progress" && (
                  <button
                    onClick={() => handleStart(quiz)}
                    className="font-inter font-medium text-sm md:text-[16px] px-5 py-2 rounded-[10px] hover:opacity-80 transition bg-orange-500 text-white"
                  >
                    Continue →
                  </button>
                )}

                {status === "available" && (
                  <button
                    onClick={() => handleStart(quiz)}
                    className="font-inter font-medium text-sm md:text-[16px] px-5 py-2 rounded-[10px] hover:opacity-80 transition bg-[#0F4C8A] text-white"
                  >
                    Start Quiz
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizzesSection;