import React, { useState } from 'react'
import axiosInstance from '../../../Api/axiosInstance'

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    qualification: '',
    test: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await axiosInstance.post('/inquiries', formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', destination: '', qualification: '', test: '' })
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className='w-[90%] flex flex-col lg:flex-row md:gap-5 gap-2 md:mt-16 mt-10 mx-auto'>
        <div className='w-full flex justify-center items-center lg:w-1/3'>
          <img src="/Images/inquiry.png" alt="Inquiry Page Image" className='w-[350px] md:w-[465px] object-cover' />
        </div>
        <div className='w-full lg:w-2/3 '>
          <h3 className='font-inter font-bold text-[20px] md:text-[30px] text-[#0A0A0A] text-center'>Quick Inquiry</h3>
          <div className='flex flex-col gap-0 md:gap-5 bg-white rounded-[14px] shadow-xl p-4 md:p-8 mt-1 md:mt-3'>

            {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
            {success && <p className='text-green-500 text-sm text-center'>Inquiry submitted successfully!</p>}

            <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
              <div className="w-full">
                <label htmlFor="name" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">Full Name *</label>
                <input value={formData.name} onChange={handleChange} type="text" id="name" className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1" />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">Email *</label>
                <input value={formData.email} onChange={handleChange} type="email" id="email" className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1" />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
              <div className="w-full">
                <label htmlFor="phone" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">Phone Number *</label>
                <input value={formData.phone} onChange={handleChange} type="text" id="phone" className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1" />
              </div>
              <div className="w-full">
                <label htmlFor="destination" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">Study Destination *</label>
                <input value={formData.destination} onChange={handleChange} type="text" id="destination" className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1" />
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
              <div className="w-full">
                <label htmlFor="qualification" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">High Qualification *</label>
                <input value={formData.qualification} onChange={handleChange} type="text" id="qualification" className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1" />
              </div>
              <div className="w-full">
                <label htmlFor="test" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">English Test Status *</label>
                <input value={formData.test} onChange={handleChange} type="text" id="test" className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1" />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2 md:py-3 bg-[#FF6B35] rounded-[10px] text-white font-inter font-semibold text-[14px] md:text-[16px] leading-[24px] tracking-wide disabled:opacity-60 mt-2"
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Inquiry