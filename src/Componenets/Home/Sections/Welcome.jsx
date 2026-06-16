import React, { useState } from 'react'
import { programsData } from '../Constants/UpcomingClassesConstants';
import { IoIosArrowForward } from 'react-icons/io';

const Welcome = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <div className='w-full md:mt-16 mt-10'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>Welcome to UCMS</h3>
        <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center mx-3'>Learn more about our services</p>
        <div className='bg-[#F9FAFB] py-4 md:py-7 lg:py-9  md:px-10 lg:px-18 mx-4 md:mx-6 mb-4 md:mb-6'>
          <div className='flex flex-col gap-5 md:gap-8 lg:gap-15 md:flex-row'>
            <div className='w-full md:w-[700px]'>
              <video
                className='w-full rounded-[14px]'
                loop
                muted
                controls
              >
                <source src="https://res.cloudinary.com/ddhxxqkpc/video/upload/v1781607555/VID-20260616-WA0010_1_yoqlcu.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="w-full md:w-[320px] mx-auto bg-white self-start">

              <div className="font-inter font-semibold text-[15px] md:text-[18px] text-[#002366] border-[0.8px] border-[#E5E7EB] bg-[#155DFC]/20 text-center py-5">
                View All Programs
              </div>

              {programsData.map((item, index) => (
                <div key={index} className="border-b border-gray-700">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center font-inter font-medium text-[14px] md:text-[16px] text-left gap-3 text-[#193CB8] px-3 py-2 lg:px-4 lg:py-3 hover:bg-gray-100"
                  >
                    <span className={`transform transition ${openIndex === index ? "rotate-90" : ""}`}>
                      <IoIosArrowForward />
                    </span>
                    <span>{item.title}</span>
                  </button>

                  {openIndex === index && (
                    <div className="px-4 pb-3 text-sm text-gray-600">
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Welcome