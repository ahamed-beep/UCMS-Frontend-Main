import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Api/axiosInstance'

const AdmissionDeadlinePage = () => {
  const [deadlines, setDeadlines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const res = await axiosInstance.get('/admission-deadlines')
        setDeadlines(res.data?.data || [])
      } catch (err) {
        console.error('Failed to fetch admission deadlines', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDeadlines()
  }, [])

  if (loading) return null

  return (
    <div className='px-4 md:px-27'>
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
                  <td className="px-6 py-4 text-[#364153] font-inter">{row.program}</td>
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