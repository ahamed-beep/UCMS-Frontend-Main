import { CircleCheckBig } from "lucide-react";

const StudentQuizSubmitted = ({ scorePercent, correctCount, incorrectCount, totalQuestions, redirectCountdown }) => {
  return (
    <div>
      <div className="bg-gray-50 font-sans flex">
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-orange-500 mx-auto flex items-center justify-center mb-6">
              <CircleCheckBig className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Submitted!</h1>
            <p className="text-gray-500 mb-8">Your answers have been recorded</p>

            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <div className="text-5xl font-bold text-orange-500 mb-1">{scorePercent}%</div>
              <div className="text-gray-500 mb-6">Your Score</div>
              <div className="flex justify-center gap-16">
                <div>
                  <div className="text-sm text-gray-500">Correct</div>
                  <div className="text-xl font-bold text-green-600">{correctCount}/{totalQuestions}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Incorrect</div>
                  <div className="text-xl font-bold text-red-600">{incorrectCount}/{totalQuestions}</div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              {redirectCountdown > 0 ? `Redirecting to dashboard... (${redirectCountdown})` : "Redirecting..."}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentQuizSubmitted;