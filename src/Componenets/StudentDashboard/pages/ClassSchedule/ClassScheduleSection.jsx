  import React, { useEffect, useState } from "react";
  import { IoMdArrowForward } from "react-icons/io";
  import axiosInstance from "../../../../Api/axiosInstance";

  const normalizeSession = (s) => ({
    ...s,
    id: s._id ?? s.id,
    course: s.courseId ?? s.course ?? null,
  });

  const ClassScheduleSection = () => {
    const [schedule, setSchedule] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [progress, setProgress] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [classMaterials, setClassMaterials] = useState({});
    const [expandedMaterials, setExpandedMaterials] = useState({});
    const [expandedStudyMaterials, setExpandedStudyMaterials] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [scheduleRes, weeklyRes, progressRes, enrollmentsRes] = await Promise.all([
          axiosInstance.get("/class-sessions/my-schedule"),
          axiosInstance.get("/class-sessions/weekly"),
          axiosInstance.get("/class-sessions/my-progress"),
          axiosInstance.get("/enrollments/my-enrollments"), // add this
        ]);

        const scheduleData = (scheduleRes.data.data ?? []).map(normalizeSession);
        setSchedule(scheduleData);

        const weeklyRaw = weeklyRes.data.data ?? {};
        const weeklyArray = Object.entries(weeklyRaw).map(([day, sessions]) => ({
          day,
          sessions: sessions.map(normalizeSession),
        }));
        setWeekly(weeklyArray);

        setProgress(progressRes.data.data ?? null);

       const enrollments = enrollmentsRes.data.data?.data ?? enrollmentsRes.data.data ?? [];
        const enrolledCourseIds = [
          ...new Set(
            enrollments
              .map((e) => e.courseId?._id ?? e.courseId?.id ?? e.courseId)
              .filter(Boolean)
          ),
        ];

        if (enrolledCourseIds.length > 0) {
          const materialResults = await Promise.all(
            enrolledCourseIds.map((courseId) =>
              axiosInstance.get(`/courses/${courseId}/study-materials`)
            )
          );
          const allMaterials = materialResults.flatMap((res) => res.data.data ?? []);
          setMaterials(allMaterials);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

    const handleJoinClass = async (sessionId) => {
      try {
        const res = await axiosInstance.post(`/class-sessions/${sessionId}/join`);
        const { meetingLink } = res.data.data;
        if (meetingLink) window.open(meetingLink, "_blank");
      } catch (err) {
        console.error("Failed to join class", err);
      }
    };

  const handleToggleMaterials = async (cls) => {
    const sessionId = cls.id;
    if (expandedMaterials[sessionId]) {
      setExpandedMaterials((prev) => ({ ...prev, [sessionId]: false }));
      return;
    }

    if (!classMaterials[sessionId]) {
      try {
        const courseId = cls.course?._id ?? cls.course?.id;

        const res = await axiosInstance.get(
          `/courses/${courseId}/study-materials/by-class/${sessionId}`
        );
        let mats = res.data.data ?? [];

        if (mats.length === 0) {
          const fallbackRes = await axiosInstance.get(`/courses/${courseId}/study-materials`);
          mats = fallbackRes.data.data ?? [];
        }

        setClassMaterials((prev) => ({ ...prev, [sessionId]: mats }));
      } catch {
        setClassMaterials((prev) => ({ ...prev, [sessionId]: [] }));
      }
    }

    setExpandedMaterials((prev) => ({ ...prev, [sessionId]: true }));
  };

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    const formatTime = (dateStr, durationMinutes) => {
      if (!dateStr) return "";
      const start = new Date(dateStr);
      const end = new Date(start.getTime() + durationMinutes * 60000);
      const fmt = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      return `${fmt(start)} - ${fmt(end)}`;
    };

    const attendedClasses = progress?.attendedClasses ?? 0;
    const totalClasses = progress?.totalClasses ?? 0;
    const percentageProgress = progress?.percentage ?? 0;

    const stats = progress
      ? [
          { label: "Total Classes", value: totalClasses, color: "text-[#0F4C8A]" },
          { label: "This Week", value: weekly.reduce((acc, d) => acc + d.sessions.length, 0), color: "text-[#00A63E]" },
          { label: "Attended", value: attendedClasses, color: "text-[#9810FA]" },
          { label: "Upcoming", value: schedule.length, color: "text-[#0A0A0A]" },
        ]
      : [];

    if (loading) {
      return (
        <div className="py-4 md:py-6 flex justify-center items-center min-h-[300px]">
          <p className="font-inter text-sm text-[#4A5565]">Loading...</p>
        </div>
      );
    }

    return (
      <div className="py-4 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          {stats.map((item, i) => (
            <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4">
              <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{item.label}</p>
              <p className={`font-inter font-bold text-[22px] md:text-[24px] ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
            <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
              <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">
                Upcoming Classes
              </h2>
            </div>

            {schedule.length === 0 ? (
              <p className="font-inter text-sm text-[#4A5565]">No upcoming classes.</p>
            ) : (
              schedule.map((cls, i) => (
                <div key={i} className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] mb-4 p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">
                      {cls.title}
                    </h3>
                    <span className="font-inter font-medium text-[10px] md:text-xs bg-[#0F4C8A] text-white px-3 py-1 rounded-full self-start">
                      {cls.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <img src="/Images/openbook.webp" alt="book" width={16} height={16} />
                    <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">
                      {cls.course?.teacher ?? "—"}
                    </p>
                  </div>

                  <div className="flex md:flex-row flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/Images/calendergray.webp" alt="calendar" width={16} height={16} />
                      <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">
                        {formatDate(cls.scheduledAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/Images/time.webp" alt="time" width={16} height={16} />
                      <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">
                        {formatTime(cls.scheduledAt, cls.durationMinutes)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <img src="/Images/videogray.webp" alt="video" width={16} height={16} />
                    <p className="font-inter font-normal text-xs md:text-sm text-[#4A5565]">{cls.type}</p>
                  </div>

                  <div className="bg-[#F9FAFB] mb-3 flex flex-col p-3 rounded-[10px]">
                    <p className="font-inter font-medium text-[10px] md:text-xs text-[#364153]">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {(cls.topics ?? []).map((t, idx) => (
                        <span
                          key={idx}
                          className="font-inter font-normal text-[10px] md:text-xs text-[#364153] bg-white border-[0.89px] border-[#E5E7EB] rounded-sm p-1 mt-2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full flex gap-2">
                    <button
                      onClick={() => handleJoinClass(cls.id)}
                      className="w-1/2 font-inter font-normal text-xs md:text-sm bg-[#FF6B35] text-white py-2 rounded-[10px]"
                    >
                      Join Class
                    </button>
                    <button
                      onClick={() => handleToggleMaterials(cls)}
                      className="w-1/2 flex justify-center items-center gap-1 font-inter font-normal text-xs md:text-sm border-[0.89px] text-[#0F4C8A] border-[#0F4C8A] py-2 rounded-[10px]"
                    >
                      <img src="/Images/file.webp" alt="file" width={16} height={16} />
                      {expandedMaterials[cls.id] ? "Hide Materials" : "View Materials"}
                    </button>
                  </div>

                  {expandedMaterials[cls.id] && (
                    <div className="mt-3 border-t border-[#E5E7EB] pt-3 flex flex-col gap-2">
                      {!classMaterials[cls.id] ? (
                        <p className="font-inter text-xs text-[#4A5565]">Loading...</p>
                      ) : classMaterials[cls.id].length === 0 ? (
                        <p className="font-inter text-xs text-[#4A5565]">No materials for this class.</p>
                      ) : (
                        classMaterials[cls.id].map((m, idx) => (
                          <a
                            key={idx}
                            href={m.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-start gap-2 bg-[#F9FAFB] rounded-[10px] p-3"
                          >
                            <img src="/Images/bluedownload.webp" alt="download" width={20} height={20} className="pt-1" />
                            <div className="min-w-0">
                              <h4 className="font-inter font-medium text-[12px] md:text-sm text-[#0A0A0A] truncate">
                                {m.title}
                              </h4>
                              <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">
                                {m.type} • {m.fileSize}
                              </p>
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="space-y-4">
            <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
              <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
                <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">
                  Weekly Schedule
                </h2>
              </div>
              {weekly.length === 0 ? (
                <p className="font-inter text-xs text-[#4A5565]">No classes this week.</p>
              ) : (
                <ul>
                  {weekly.map((item, i) => (
                    <div key={i} className="pb-2">
                      <h3 className="font-inter font-semibold text-xs md:text-sm text-[#0A0A0A] mb-2">
                        {item.day}
                      </h3>
                      {item.sessions.map((session, j) => (
                        <p
                          key={j}
                          className="font-inter font-normal text-[10px] md:text-xs text-[#4A5565] border-l-[1.78px] border-[#0F4C8A] ps-3 my-1"
                        >
                          {session.title} ({formatTime(session.scheduledAt, session.durationMinutes)})
                        </p>
                      ))}
                    </div>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
              <div className="border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] mb-4 md:mb-6 -mx-4 md:-mx-6">
                <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">
                  Study Materials
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {materials.length === 0 ? (
                  <p className="font-inter text-xs text-[#4A5565]">No materials available.</p>
                ) : (
                  <>
                    {(expandedStudyMaterials ? materials : materials.slice(0, 4)).map((m, i) => (
                      <a
                        key={i}
                        href={m.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-2 bg-[#F9FAFB] rounded-[10px] p-3"
                      >
                        <img src="/Images/bluedownload.webp" alt="download" width={20} height={20} className="pt-1" />
                        <div className="min-w-0">
                          <h4 className="font-inter font-medium text-[12px] md:text-sm text-[#0A0A0A] truncate">
                            {m.title}
                          </h4>
                          <p className="font-inter font-normal text-[10px] md:text-xs text-[#6A7282]">
                            {m.type} • {m.fileSize}
                          </p>
                        </div>
                      </a>
                    ))}
                    {materials.length > 4 && (
                      <button
                        onClick={() => setExpandedStudyMaterials((prev) => !prev)}
                        className="flex justify-center items-center font-inter font-semibold text-[14px] md:text-[16px] text-[#0F4C8A]"
                      >
                        {expandedStudyMaterials ? "Show Less" : "View All Resources"}
                        <IoMdArrowForward
                          className={`ml-2 transition-transform ${expandedStudyMaterials ? "rotate-90" : ""}`}
                          size={20}
                        />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gradient-to-l to-[#0F4C8A] from-[#083766] text-white p-4 md:p-6 rounded-xl">
              <h2 className="font-inter font-semibold text-[16px] md:text-[18px]">Your Progress</h2>
              <p className="font-inter font-normal text-xs md:text-sm">
                You've attended {attendedClasses} out of {totalClasses} classes
              </p>
              <div className="w-full bg-white/20 h-2 rounded-full">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${percentageProgress}%` }}
                />
              </div>
              <p className="font-inter font-normal text-xs md:text-sm mb-3">
                {percentageProgress}% completed
              </p>
            
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ClassScheduleSection;