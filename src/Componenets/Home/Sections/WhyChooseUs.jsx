import React from 'react'
import { upskills } from '../Constants/SkillConstants'

const WhyChooseUs = () => {
  return (
    <section>
      <div className='w-full md:mt-16 mt-10 py-3 bg-white'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>Why Choose Upskills?</h3>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-7 md:py-10 px-3 md:px-6'>
          {upskills.map((item, index) => (
            <div key={index} className='flex justify-center items-center gap-2 bg-white rounded-[14px] border-[0.8px] border-[#F3F4F6]'>
              <div className='flex flex-col items-center gap-2 py-3 px-5'>
                <img src={item.image} alt={item.name} width={48} height={48} />
                <h3 className='font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]'>{item.title}</h3>
                <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#4A5565] text-center'>{item.description}</p>
                {item.exp && <p className='font-inter font-medium text-[10px] md:text-xs text-[#0F4C8A]'>{item.exp}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs