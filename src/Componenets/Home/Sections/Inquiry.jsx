import React, { useState } from 'react'

const Inquiry = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [qualification, setQualification] = useState('');
  const [test, setTest] = useState('');

  return (
    <section>
      <div className='w-[90%] flex flex-col lg:flex-row md:gap-5 gap-2 md:mt-16 mt-10 mx-auto'>
        <div className='w-full flex justify-center items-center lg:w-1/3'>
          <img src="/Images/inquiry.png" alt="Inquiry Page Image" className='w-[350px] md:w-[465px] object-cover' />
        </div>
        <div className='w-full lg:w-2/3 bg-[#F9FAFB]'>
          <h3 className='font-inter font-bold text-[20px] md:text-[30px] text-[#0A0A0A] text-center'>Quick Inquiry</h3>
          <div className='flex flex-col gap-0 md:gap-5 bg-white rounded-[14px] shadow-xl p-4 md:p-8 mt-1 md:mt-3'>
            <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
              <div className="w-full">
                <label htmlFor="name" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">
                  Full Name *
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                  id="name"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1"
                />
              </div>
              <div className="w-full" >
                <label htmlFor="email" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">
                  Email *
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1"
                />
              </div>

            </div>
            <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
              <div className="w-full">
                <label htmlFor="phone" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">
                  Phone Number *
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="phone"
                  id="phone"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1"
                />
              </div>
              <div className="w-full">
                <label htmlFor="destination" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">
                  Study Destination *
                </label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  type="text"
                  id="destination"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1"
                />
              </div>

            </div>
            <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
              <div className="w-full">
                <label htmlFor="qualification" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">
                  High Qualification *
                </label>
                <input
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  type="text"
                  id="qualification"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1"
                />
              </div>
              <div className="w-full">
                <label htmlFor="test" className="font-inter font-medium text-[12px] md:text-[14px] text-[#364153]">
                  English Test Status *
                </label>
                <input
                  value={test}
                  onChange={(e) => setTest(e.target.value)}
                  type="text"
                  id="test"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] text-[12px] md:text-[14px] py-2 px-2 md:py-3 md:px-4 mt-1"
                />
              </div>

            </div>
            <button
              className="w-full py-2 md:py-3 bg-[#FF6B35] rounded-[10px] text-white font-inter font-semibold text-14px md:text-[16px] leading-[24px] tracking-wide disabled:opacity-60 mt-2"
            >
              Submit Inquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Inquiry