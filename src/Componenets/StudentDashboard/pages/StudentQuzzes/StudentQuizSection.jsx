import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CircleCheckBig, Flag } from "lucide-react";
import StudentQuizSubmitted from "./StudentQuizSubmitted";
import axiosInstance from "../../../../Api/axiosInstance";

const StudentQuizSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const submitEndpoint = location.state?.submitEndpoint ?? `/quizzes/${id}/submit`;
  const returnTo = location.state?.returnTo ?? "/student/dashboard";

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axiosInstance.get(`/quizzes/${id}`);
        const data = res.data.data;
        setQuiz(data);
        setAnswers(Array(data.questions.length).fill(null));
        setFlagged(Array(data.questions.length).fill(false));
        setTimeLeft(data.timeLimitMinutes * 60);
      } catch {
        navigate(returnTo);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (submitted || timeLeft === null) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitted]);

useEffect(() => {
  if (!submitted) return;
  if (redirectCountdown <= 0) {
    navigate(returnTo, {
      state: {
        quizCompleted: true,
        lectureId: location.state?.lectureId,
        courseId: location.state?.courseId,
      },
    });
    return;
  }
  const t = setInterval(() => setRedirectCountdown((c) => c - 1), 1000);
  return () => clearInterval(t);
}, [submitted, redirectCountdown]);

 const handleSubmit = async () => {
  try {
    const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
    const res = await axiosInstance.post(submitEndpoint, { answers, timeTakenSeconds });
    setResult(res.data.data);
  } catch {
  } finally {
    setSubmitted(true);
  }
};

  const formatTime = (s) => {
    if (s === null) return "00:00";
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const selectAnswer = (idx) => {
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  };

  const toggleFlag = () => {
    const next = [...flagged];
    next[current] = !next[current];
    setFlagged(next);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const unansweredCount = answers.length - answeredCount;

  if (loading) return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500 font-inter text-lg">Loading quiz...</div>
      </div>
    </div>
  );

  if (submitted && result) return (
    <StudentQuizSubmitted
      scorePercent={result.scorePercent}
      correctCount={result.correctCount}
      incorrectCount={result.incorrectCount}
      totalQuestions={result.totalQuestions}
      redirectCountdown={redirectCountdown}
    />
  );

  if (submitted && !result) return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500 font-inter text-lg">Quiz submitted. Redirecting...</div>
      </div>
   </div>
  );

  if (!quiz || !quiz.questions || quiz.questions.length === 0) return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-500 font-inter text-lg">Quiz not found.</div>
      </div>
    </div>
  );

  const q = quiz.questions[current];
  const selected = answers[current];
  const isFlagged = flagged[current];

  return (
    <div>
      <div className="bg-gray-50 font-inter p-6">

        <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-inter">{quiz.title}</h1>
            <p className="text-sm text-gray-400 font-inter capitalize">{quiz.category} • {quiz.difficulty}</p>
          </div>
          <div className={`flex items-center gap-2 font-inter font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${timeLeft !== null && timeLeft <= 300 ? "bg-red-50 text-red-600 shadow-[0_0_12px_2px_rgba(239,68,68,0.4)] animate-pulse" : "bg-blue-50 text-[#0F4C8A]"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 2" />
            </svg>
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-[#0F4C8A] font-inter text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  Question {current + 1} of {quiz.questions.length}
                </span>
                {isFlagged && (
                  <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-600 border border-yellow-200 text-sm font-semibold px-3 py-1.5 rounded-full">
                    <Flag className="w-4 h-4" /> Flagged
                  </span>
                )}
              </div>
              <button onClick={toggleFlag} className={`p-2 rounded-xl bg-[#F3F4F6] transition-colors ${isFlagged ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-200" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}>
                <svg className="w-7 h-7" fill={isFlagged ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v17M4 4h12l-2 4 2 4H4" />
                </svg>
              </button>
            </div>

            <h2 className="text-lg font-bold text-[#0A0A0A] font-inter mb-6">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selected === i;
                return (
                  <button key={i} onClick={() => selectAnswer(i)}
                    className={`w-full flex items-center text-[#0A0A0A] gap-3 p-4 border rounded-lg text-left transition-colors ${isSelected ? "border-[#0F4C8A] border-2 bg-blue-50" : "border-[#E5E7EB] hover:border-gray-300"}`}>
                    {isSelected ? <CircleCheckBig className="text-[#0F4C8A] shrink-0" /> : <div className="w-5 h-5 rounded-full border-2 border-[#E5E7EB] shrink-0" />}
                    <span className="font-semibold text-[#0A0A0A] font-inter">{letter}.</span>
                    <span className="text-[#0A0A0A] font-inter font-semibold">{opt}</span>
                  </button>
                );
              })}
            </div>

            <hr className="my-6 border-gray-200" />

            <div className="flex justify-between">
              <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}
                className="flex items-center gap-2 font-inter px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                ← Previous
              </button>
              <button onClick={() => setCurrent((c) => Math.min(quiz.questions.length - 1, c + 1))} disabled={current === quiz.questions.length - 1}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0F4C8A] hover:bg-blue-800 text-white rounded-lg font-medium disabled:opacity-50">
                Next →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit">
            <h3 className="font-semibold text-xl text-[#151515] font-inter mb-4">Question Navigator</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-xs font-inter text-gray-600">Answered</div>
                <div className="text-xl font-bold text-[#008236] font-inter">{answeredCount}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-xs font-inter text-gray-600">Unanswered</div>
                <div className="text-xl font-inter font-bold text-gray-700">{unansweredCount}</div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-y-2 mb-5">
              {quiz.questions.map((_, i) => {
                const isCurrent = i === current;
                const isAnswered = answers[i] !== null;
                const isFlaggedQ = flagged[i];
                return (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`relative w-9 h-9 font-inter rounded-xl text-sm font-semibold transition-colors ${isCurrent ? "bg-[#0F4C8A] text-white" : isAnswered ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    {i + 1}
                    {isFlaggedQ && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-white" />}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 text-sm mb-5">
              <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#0F4C8A] inline-block" /> Current</div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-100 inline-block" /> Answered</div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gray-100 inline-block" /> Not Answered</div>
            </div>

            <button onClick={() => setShowSubmitModal(true)} className="w-full bg-[#FF6B35] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg">
              Submit Quiz
            </button>
          </div>
        </div>

        {showSubmitModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-500 font-bold text-xl shrink-0">!</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Submit Quiz?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Are you sure you want to submit? You have answered{" "}
                    <span className="font-semibold text-green-600">{answeredCount}</span> out of {quiz.questions.length} questions.
                  </p>
                  {unansweredCount > 0 && (
                    <p className="text-sm text-orange-500 font-medium mt-2">Warning: {unansweredCount} question(s) remain unanswered</p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowSubmitModal(false)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={() => { setShowSubmitModal(false); handleSubmit(); }} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg">Submit Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentQuizSection;