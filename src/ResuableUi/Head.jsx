import React from 'react'

const Head = ({title, subtitle, icon}) => {
    return (
       <section className='relative w-full h-[250px] md:h-[390px]  flex justify-center items-center bg-gradient-to-r from-[#0F4C8A] to-[#3A7BD5] bg-cover bg-center'>
            <div className='absolute inset-0 bg-[url("/Images/bg.png")] opacity-20'></div>
            <div className='relative w-full md:mt-16 mt-10 py-3 z-10'>
                {icon && <div className='flex justify-center items-center text-white'>{icon}</div>}
                <h3 className='font-inter font-bold  text-2xl md:text-[48px] text-white text-center wrap-break-word'>{title}</h3>
                <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#DBEAFE] text-center py-3 px-2 md:py-5 mx-auto w-full md:w-[50%] wrap-break-word'>{subtitle}</p>
            </div>
        </section>
    )
}

export default Head