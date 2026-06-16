import React from 'react'
import { testimonialsData } from '../Constants/TestimonialConstants'

const StudentSuccessStories = () => {
  return (
    <section className='relative w-full bg-gray-100'>
      <div className='relative w-full md:mt-16 mt-10 py-10'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center wrap-break-word'>Student Success Stories</h3>
        <p className='font-inter font-normal text-[16px] md:text-[20px] text-gray-500 text-center wrap-break-word'>Real students, real results</p>
        <div className='w-[90%] flex sm:flex-row flex-col justify-between gap-5 mx-auto py-5'>
          {
            testimonialsData.map((test, index) => (
              <div key={index} className='flex flex-col gap-4 bg-white py-10 px-5 rounded-[14px] shadow-sm'>
                <div className="text-[#FF6B35] text-xl">
                  {test.rating}
                </div>
                <p className='font-inter font-normal text-[14px] md:text-[16px] italic text-gray-600 wrap-break-word'>"{test.message}"</p>
                <div>
                  <h4 className='font-inter font-normal text-[14px] md:text-[16px] text-[#0A0A0A] wrap-break-word'>{test.name}</h4>
                  <p className='font-inter font-normal text-[12px] md:text-[14px] text-gray-500 wrap-break-word'>{test.university}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default StudentSuccessStories