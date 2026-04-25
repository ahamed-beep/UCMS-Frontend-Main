import { AwardIcon } from "lucide-react";

const InstructorCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Your Instructor</h3>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <AwardIcon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-gray-900">Dr. Sarah Johnson</div>
          <div className="text-sm text-blue-600">IELTS Expert Trainer</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-4 leading-relaxed">
        15+ years of experience in IELTS preparation. Helped 3,000+ students achieve their target scores.
      </p>
      <button className="mt-4 w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
        Message Instructor
      </button>
    </div>
  );
};

export default InstructorCard;