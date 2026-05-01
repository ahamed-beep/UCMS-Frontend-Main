import React from 'react';

const NeedHelpCard = () => {
  return (
  <div
  className="rounded-xl p-6 text-white"
  style={{ background: "linear-gradient(135deg, #0F4C8A, #083766)" }}
>
      <h3 className="text-lg font-bold font-inter  text-[#FFFFFF] mb-2">Need Help?</h3>
      <p className="text-sm text-[#FFFFFF] font-inter leading-relaxed">
        Have questions about the course content or technical issues?
      </p>
      <button className="mt-4 w-full bg-[#FFFFFF] text-[#0F4C8A] font-inter font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
        Contact Support
      </button>
    </div>
  );
};

export default NeedHelpCard;