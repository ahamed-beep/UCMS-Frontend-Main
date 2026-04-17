import React from 'react'

const AdmissionDeadlinePage = () => {
     const deadlines = [
    {
      university: "University of Manchester",
      program: "MSc Programs",
      deadline: "March 31, 2026",
      deadlineColor: "text-red-500",
      intake: "September 2026",
    },
    {
      university: "University of Toronto",
      program: "MBA",
      deadline: "April 15, 2026",
      deadlineColor: "text-orange-500",
      intake: "September 2026",
    },
    {
      university: "UNSW Sydney",
      program: "Engineering",
      deadline: "April 30, 2026",
      deadlineColor: "text-orange-500",
      intake: "July 2026",
    },
    {
      university: "TU Munich",
      program: "Masters Programs",
      deadline: "May 15, 2026",
      deadlineColor: "text-red-500",
      intake: "October 2026",
    },
  ];
  return (
    <div className=' px-4 md:px-27  ' >
          <h2 className="text-2xl font-bold text-[#0A0A0A] font-inter mt-12 mb-6">
            Admission Deadlines
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F3F4F6] border-b border-gray-200">
                  <tr className="text-left text-[#0A0A0A] font-inter">
                    <th className="px-6 py-4 font-semibold">University</th>
                    <th className="px-6 py-4 font-semibold">Program</th>
                    <th className="px-6 py-4 font-semibold">Deadline</th>
                    <th className="px-6 py-4 font-semibold">Intake</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deadlines.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#E5E7EB] last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-[#0A0A0A] font-inter">
                        {row.university}
                      </td>
                      <td className="px-6 py-4 text-[#364153] font-inter ">{row.program}</td>
                      <td className={`px-6 py-4 font-semibold font-inter ${row.deadlineColor}`}>
                        {row.deadline}
                      </td>
                      <td className="px-6 py-4 text-[#364153] font-inter">{row.intake}</td>
                      <td className="px-6 py-4">
                      <a  
                          href="#"
                          className="text-[#193CB8] hover:text-[#153290] font-bold font-inter"
                        >
                          Apply Now →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  )
}

export default AdmissionDeadlinePage