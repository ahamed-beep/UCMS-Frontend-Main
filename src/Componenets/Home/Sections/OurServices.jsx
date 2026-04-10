import React from 'react'
import { services } from '../Constants/ServicesConstants'

const OurServices = () => {
  return (
    <section>
      <div className='w-full md:mt-16 mt-10'>
        <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>Our Services</h3>
        <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center mx-3'>Comprehensive solutions for your study abroad journey</p>
        <div className='w-[90%] md:w-[85%] mx-auto my-6 md:my-10 lg:my-15'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5'>
            {
              services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className='flex flex-col gap-2 p-5 border border-[0.8px] border-[#F3F4F6] shadow-xl rounded-[14px]'>
                    <div className='flex justify-center items-center w-[48px] h-[48px] rounded-[10px] bg-[#DBEAFE]'>
                      <Icon className='text-[#FF6B35]' width={24} height={24} />
                    </div>
                    <h4 className='font-inter font-semibold text-[15px] md:text-[18px] text-[#0A0A0A]'>{service.title}</h4>
                    <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#4A5565]'>{service.desc}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurServices