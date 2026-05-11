import { AwardIcon } from 'lucide-react';

const InstructorCard = ({ instructor, onNavigate }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-[#0A0A0A] font-inter mb-4">Your Instructor</h3>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-[#0F4C8A]">
          <AwardIcon className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-[#0A0A0A] font-inter break-all">
            {instructor?.name ?? 'N/A'}
          </div>
          <div className="text-sm text-[#4A5565] font-inter break-all">
            {instructor?.designation ?? 'Instructor'}
          </div>
        </div>
      </div>
      {instructor?.bio && (
        <p className="text-sm text-[#4A5565] font-inter mt-4 leading-relaxed break-all">
          {instructor.bio}
        </p>
      )}
      {instructor?.experience && (
        <p className="text-xs text-[#6A7282] font-inter mt-2 break-all">
          Experience: {instructor.experience}
        </p>
      )}
      <button
        onClick={() => onNavigate?.('Support')}
        className="mt-4 w-full border border-[#0F4C8A] font-inter text-[#0F4C8A] font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors break-all"
      >
        Message Instructor
      </button>
    </div>
  );
};

export default InstructorCard;