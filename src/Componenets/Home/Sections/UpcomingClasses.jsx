import React from 'react'
import { events } from '../Constants/UpcomingClassesConstants'

const UpcomingClasses = () => {
  return (
    <section>
      <div className='w-full md:mt-16 mt-10'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>Upcoming IELTS/PTE Classes</h3>
        <div className='w-[90%] md:w-[85%] mx-auto my-6 md:my-10 lg:my-15'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5'>
            {
              events.map((item, id) => (
                <div key={id} className='flex flex-col gap-3 p-5 border border-[0.8px] border-[#F3F4F6] shadow-xl rounded-[14px]'>
                  <div className='flex gap-2'>
                    <img src='/Images/Calendar.png' alt="claender" width={20} height={20} />
                    <p className='font-inter font-medium text-[12px] md:text-[14px] text-[#0F4C8A]'>{item.date}</p>
                  </div>
                  <h4 className='font-inter font-semibold text-[15px] md:text-[18px] text-[#0A0A0A]'>{item.title}</h4>
                  <p className='font-inter font-medium text-[12px] md:text-[14px] text-[#FF6B35]'>{item.spots}</p>
                  <button className='w-full font-inter font-normal text-[14px] md:text-[16px] text-center text-white rounded-[10px] bg-[#0F4C8A] py-2'>Register Now</button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpcomingClasses