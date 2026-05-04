import { useEffect, useState } from 'react';
import { BookOpen, Clock, Download } from 'lucide-react';
import axiosInstance from '../../../../Api/axiosInstance';

const CoursesSection = ({ setCourseId }) => {
  const [courses, setCourses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const getCourseId = (course) => course.id ?? course._id;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axiosInstance.get('/enrollments/my-courses');
        const enrollments = data.data;

        const courseIds = enrollments
          .filter((e) => e.isActive)
          .map((e) => typeof e.courseId === 'object' ? e.courseId?.id : e.courseId)
          .filter(Boolean);

        const courseResults = await Promise.all(
          courseIds.map((id) =>
            axiosInstance.get(`/courses/${id}`).then(r => r.data.data).catch(() => null)
          )
        );

        const courseList = courseResults.filter(Boolean);
        setCourses(courseList);

        if (courseList.length) {
          const firstId = courseList[0].id;
          const [matRes, exRes] = await Promise.all([
            axiosInstance.get(`/courses/${firstId}/materials`),
            axiosInstance.get(`/courses/${firstId}/exercises`),
          ]);
          setMaterials(matRes.data.data ?? []);
          setExercises(exRes.data.data ?? []);

          const progressResults = await Promise.all(
            courseList.map(async (course) => {
              try {
                const [modulesRes, progressRes] = await Promise.all([
                  axiosInstance.get(`/courses/${course.id}/modules`),
                  axiosInstance.get(`/courses/${course.id}/progress`).catch(() => null),
                ]);

                const modules = modulesRes.data.data;
                const completedIds =
                  progressRes?.data?.completedLectureIds ??
                  progressRes?.data?.data?.completedLectureIds ?? [];

                const lecturesPerModule = await Promise.all(
                  modules.map((mod) =>
                    axiosInstance.get(`/modules/${mod.id}/lectures`)
                      .then(r => r.data.data ?? [])
                      .catch(() => [])
                  )
                );

                const allLectures = lecturesPerModule.flat();

                const quizzesPerLecture = await Promise.all(
                  allLectures.map((lec) =>
                    axiosInstance.get(`/lectures/${lec.id}/quizzes`)
                      .then(r => r.data.data ?? [])
                      .catch(() => [])
                  )
                );

                const allQuizzes = quizzesPerLecture.flat();

                const totalItems = allLectures.length + allQuizzes.length;
                const completedLectures = allLectures.filter(l => completedIds.includes(l.id)).length;
                const completedQuizzes = allQuizzes.filter(q => q.isCompleted).length;
                const completedItems = completedLectures + completedQuizzes;

                const pct = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

                return { id: course.id, pct, completed: completedItems, total: totalItems };
              } catch {
                return { id: course.id, pct: 0, completed: 0, total: 0 };
              }
            })
          );

          const map = {};
          progressResults.forEach(({ id, pct, completed, total }) => {
            map[id] = { pct, completed, total };
          });
          setProgressMap(map);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div className="py-10 text-center text-[#4A5565]">Loading...</div>;

  return (
    <div className='py-2 md:py-4 space-y-2 md:space-y-4'>
      <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6">
        <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">Enrolled Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {courses.map((course) => {
            const prog = progressMap[getCourseId(course)] ?? { pct: 0, completed: 0, total: 0 };

            return (
              <div key={course.id} className="border-[0.89px] border-[#E5E7EB] rounded-[10px] p-5 space-y-3">

                <div className="flex flex-col gap-2 lg:flex-row justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-[#E3EDF7] rounded-xl flex items-center justify-center">
                      <BookOpen size={24} className='text-[#0F4C8A]' />
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]">{course.title}</p>
                      <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">{course.teacher}</p>
                    </div>
                  </div>
                  <span className={`font-inter font-medium text-[10px] md:text-[12px] self-end md:self-auto px-2 py-1 sm:px-3 rounded-full whitespace-nowrap ${prog.pct === 100 ? 'bg-[#DCFCE7] text-[#008236]' : 'bg-[#0F4C8A] text-white'}`}>
                    {prog.pct === 100 ? 'completed' : 'in_progress'}
                  </span>
                </div>

                <div className="flex justify-between font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                  <span>Progress: {prog.pct}%</span>
                  <span>{prog.completed}/{prog.total} completed</span>
                </div>

                <div className="w-full bg-[#E5E7EB] h-2 rounded-full">
                  <div className="bg-[#0F4C8A] h-2 rounded-full" style={{ width: `${prog.pct}%` }} />
                </div>

                <div className="flex flex-col gap-4 md:flex-row justify-between items-center pt-2">
                  <div className="flex items-center gap-2 font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">
                    <Clock size={16} />
                    <span>{course.scheduledTime ?? 'TBD'}</span>
                  </div>
                  <button
                    className='bg-[#FF6B35] text-white font-inter rounded-2xl text-shadow-md text-md px-4 py-3'
                    onClick={() => setCourseId?.(getCourseId(course))}
                  >
                    Continue Learning →
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
          <div className='border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-5'>
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Course Materials</h2>
            <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">Video lectures, PDFs, and presentation slides</p>
          </div>
          {materials.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[10px]">
              <div className='flex items-center gap-2'>
                <img src={item.type === 'video' ? '/Images/video.webp' : '/Images/pdf.webp'} alt="icon" className='w-5 h-5' />
                <div>
                  <p className="font-inter font-medium text-[12px] md:text-sm text-[#101828]">{item.title}</p>
                  <p className="font-inter font-normal md:text-[12px] text-[10px] text-[#6A7282]">{item.sub}</p>
                </div>
              </div>
              <a href={item.fileUrl} target="_blank" rel="noreferrer">
                <Download size={16} className="text-[#4A5565]" />
              </a>
            </div>
          ))}
        </div>

        <div className="border-[0.89px] border-[#E5E7EB] bg-white rounded-[10px] shadow-sm p-4 md:p-6 space-y-4">
          <div className='border-b-[0.89px] pb-4 ps-5 border-[#E5E7EB] -mx-5'>
            <h2 className="font-inter font-semibold text-[16px] md:text-[18px] text-[#101828]">Practice Exercises</h2>
            <p className="font-inter font-normal text-[12px] md:text-sm text-[#4A5565]">Assignments and practice tests</p>
          </div>
          {exercises.map((ex) => (
            <div key={ex.id} className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[10px]">
              <div className='flex items-center gap-2'>
                <img src={ex.status === 'completed' ? '/Images/success.webp' : '/Images/error.webp'} alt="icon" className='w-5 h-5' />
                <div>
                  <p className="font-inter font-medium text-[12px] md:text-sm text-[#101828]">{ex.title}</p>
                  <p className="font-inter font-normal md:text-[12px] text-[10px] text-[#6A7282]">{ex.sub}</p>
                </div>
              </div>
              <button className={`font-inter font-medium text-[10px] md:text-[12px] px-3 py-1 rounded-full ${ex.status === 'completed' ? 'bg-[#DCFCE7] text-[#008236]' : 'bg-[#155DFC] text-white'}`}>
                {ex.status === 'completed' ? 'Review' : 'Start'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;