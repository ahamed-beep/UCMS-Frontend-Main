import React from 'react'

const ServiceBar = ({title, subtitle, services, bgColor }) => {
    return (
        <section>
            <div className={`w-full md:mt-16 mt-10 py-3 ${bgColor}`}>
                <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>{title}</h3>
                <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center'>{subtitle}</p>
                <div className='w-full flex justify-evenly gap-3 py-7 md:py-10 flex-wrap'>
                    {
                        services.map((item, index) => (
                            <div key={index} className='flex justify-center items-center gap-2 bg-white rounded-[14px] border-[0.8px] border-[#F3F4F6]'>
                                <div className='flex flex-col items-center gap-2 py-3 px-5'>
                                    <img src={item.flag} alt={item.name} width={48} height={48} />
                                    <h3 className='font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A] '>{item.name}</h3>
                                    <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#4A5565] '>{item.programs}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default ServiceBar