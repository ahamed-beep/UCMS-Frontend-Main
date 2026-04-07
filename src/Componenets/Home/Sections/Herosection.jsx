import React from 'react'
import { statistic } from '../../../Constants/constant'

const Herosection = () => {
  return (
    <section className='w-full'
      style={{ background: 'linear-gradient(180deg, #0F4C8A 0%, #1A2947 50%, #2A3F5F 100%)' }}>
      <div className='flex flex-col justify-center items-center md:flex-row'>
        <div className='w-full flex flex-col gap-2 sm:gap-3 lg:gap-6 md:w-[50%] px-10 py-7 md:px-8 md:py-10 lg:px-15 lg:py-10'>
          <h1 className='font-libre font-medium text-[40px] md:text-[55px] leading-[50px] lg:leading-[75px] text-white tracking-[3px]'>Your Journey to <span className='font-praise text-[40px] md:text-[54px] lg:text-[64px] text-[#FF6B35]'>Academic Excellence</span> Starts Here</h1>
          <p className='font-arimo font-medium text-[15px] md:text-[18px] md:leading-[28px] leading-[20px] text-white'>Expert guidance, personalized support, and proven success in helping students achieve their international education dreams.</p>
          <div className='flex gap-3 mt-2'>
            <button className='font-arimo text-[14px] md:text-[16px] bg-[#FF6B35] px-3 py-2 md:px-5 md:py-4 text-white rounded-[10px]'>Apply Now</button>
            <button className='font-arimo text-[14px] md:text-[16px] text-[#FF6B35] px-3 py-2 md:px-5 md:py-4 border border-[#FF6B35] rounded-[10px]'>Free Consultation</button>
          </div>
          <div className="flex items-center gap-0 rounded-md overflow-hidden w-fit">
            {statistic.map((stat, i) => (
              <div key={i} className="flex whitespace-nowrap flex-col px-3 justify-center text-center py-2">
                <span className="text-[#FFFFFF] text-2xl md:text-3xl font-bold font-arimo">{stat.number}</span>
                <span className="text-[#D1D5DC] text-[12px] md:text-[14px] mt-2 font-arimo font-normal">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full md:w-[50%] sm:px-10 sm:py-7 px-0 py-0 lg:px-15 lg:py-10'>
          <img src="/Images/heroimg.webp" alt="Girl Image" className='w-[450px] md:w-[580px] object-fit' />
        </div>
      </div>
    </section>
  )
}

export default Herosection