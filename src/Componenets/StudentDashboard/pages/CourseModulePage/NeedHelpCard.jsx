import React from 'react';

const NeedHelpCard = () => {
  return (
    <div className="bg-blue-700 rounded-xl p-6 text-white">
      <h3 className="text-lg font-bold mb-2">Need Help?</h3>
      <p className="text-sm text-blue-100 leading-relaxed">
        Have questions about the course content or technical issues?
      </p>
      <button className="mt-4 w-full bg-white text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
        Contact Support
      </button>
    </div>
  );
};

export default NeedHelpCard;