import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";

const QuizzesSection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axiosInstance.get("/quizzes", { params: { page: 1, limit: 6 } });
        const data = res.data?.data?.data || res.data?.data || res.data || [];
        setQuizzes(Array.isArray(data) ? data : []);
      } catch {
        setQuizzes([]);
      } finally {
        setQuizzesLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter text-center mb-8 flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-[#0F4C8A]" />
          Online Quizzes & Mock Tests
        </h2>

        {quizzesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#F3F4F6] rounded-lg p-5 animate-pulse">
                <div className="w-10 h-10 rounded-lg bg-gray-200 mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-100 rounded mb-4 w-1/2" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center text-gray-400 font-inter py-10">No quizzes available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {quizzes.map((q) => (
              <div key={q.id} className="bg-white border border-[#F3F4F6] rounded-lg p-5">
                <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <h3 className="text-base font-semibold text-[#0A0A0A] font-inter mb-2">{q.title}</h3>
                <p className="text-sm text-[#4A5565] font-inter mb-4">
                  {q.totalQuestions} Questions &nbsp;•&nbsp; {q.attempts.toLocaleString()} Attempts
                </p>
                <Link to={`/learninghub/Quiz/${q.id}`}>
                  <button className="w-full bg-[#FF6B35] font-inter hover:bg-orange-600 text-white font-medium py-2.5 rounded-md transition-colors">
                    Start Quiz
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizzesSection;