import React from 'react'

const StudentSuccessStories = () => {
  return (
    <section className='relative w-full bg-[#0F4C8A] bg-cover bg-center'>
      <div className='absolute inset-0 bg-[url("/Images/bg.png")] opacity-20'></div>
      <div className='relative w-full md:mt-16 mt-10 py-3 z-10'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-white text-center'>Student Success Stories</h3>
        <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#DBEAFE] text-center'>Real students, real results</p>
        <div className='w-[90%] flex sm:flex-row flex-col justify-between gap-5 mx-auto py-5'>
          <div className='flex flex-col gap-4 bg-white/10 py-10 px-5 rounded-[14px]'>
            <div className="text-[#FF6B35] text-xl">
              ★★★★★
            </div>
            <p className='font-inter font-normal text-[14px] md:text-[16px] italic text-[#DBEAFE]'>"Upskills made my dream of studying at Oxford a reality!"</p>
            <div>
              <h4 className='font-inter font-normal text-[14px] md:text-[16px] text-white'>Sarah Ahmed</h4>
              <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#DBEAFE]'>University of Oxford, UK</p>
            </div>
          </div>
          <div className='flex flex-col gap-4 bg-white/10 py-10 px-5 rounded-[14px]'>
            <div className="text-[#FF6B35] text-xl">
              ★★★★★
            </div>
            <p className='font-inter font-normal text-[14px] md:text-[16px] italic text-[#DBEAFE]'>"Upskills made my dream of studying at Oxford a reality!"</p>
            <div>
              <h4 className='font-inter font-normal text-[14px] md:text-[16px] text-white'>Sarah Ahmed</h4>
              <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#DBEAFE]'>University of Oxford, UK</p>
            </div>
          </div>
          <div className='flex flex-col gap-4 bg-white/10 py-10 px-5 rounded-[14px]'>
            <div className="text-[#FF6B35] text-xl">
              ★★★★★
            </div>
            <p className='font-inter font-normal text-[14px] md:text-[16px] italic text-[#DBEAFE]'>"Upskills made my dream of studying at Oxford a reality!"</p>
            <div>
              <h4 className='font-inter font-normal text-[14px] md:text-[16px] text-white'>Sarah Ahmed</h4>
              <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#DBEAFE]'>University of Oxford, UK</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentSuccessStories