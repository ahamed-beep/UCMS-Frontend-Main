import React, { useEffect, useState } from 'react'
import { statistic } from '../../../Constants/constant'

const Herosection = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      bg: "linear-gradient(180deg, #0F4C8A 0%, #1A2947 50%, #2A3F5F 100%)",
      heading: "Your Journey to Academic Excellence Starts Here",
      sub: "Expert guidance, personalized support, and proven success in helping students achieve their international education dreams..",
      img: "/Images/heroimg.webp"
    },
    {
      bg: "linear-gradient(180deg, #1E5FA3 0%, #243B6B 50%, #354E7A 100%)",
      heading: "Study abroad with confidently expert guidance support",
      sub: "We help you achieve your global education dreams, Join thousands of successful students worldwide.",
      img: "/Images/heroimg.webp"
    },
    {
      bg: "linear-gradient(180deg, #0F4C8A 0%, #3A5BA0 50%, #4A6FA5 100%)",
      heading: "Build Your Future Today and explore the knowledge",
      sub: "Join thousands of successful students worldwide, We help you achieve your global education dreams",
      img: "/Images/heroimg.webp"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='relative w-full overflow-hidden'>
      <div className='relative flex transition-transform duration-1000 ease-in-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {
          slides.map((slide, index) => (
            <div className='w-full flex-shrink-0'
              style={{ background: slide.bg }}>
              <div key={index} className='flex flex-col justify-center items-center md:flex-row'>
                <div className='w-full flex flex-col gap-2 sm:gap-3 lg:gap-6 md:w-[50%] px-10 py-7 md:px-8 md:py-10 lg:px-15 lg:py-10'>
                  <h1 className='font-libre font-medium text-[40px] md:text-[55px] leading-[50px] lg:leading-[75px] text-white tracking-[3px]'>{slide.heading.split(" ").slice(0, 3).join(" ")} <span className='font-praise text-[40px] md:text-[54px] lg:text-[64px] text-[#FF6B35]'>{slide.heading.split(" ").slice(3, 5).join(" ")}</span> Starts Here</h1>
                  <p className='font-arimo font-medium text-[15px] md:text-[18px] md:leading-[28px] leading-[20px] text-white'>{slide.sub}</p>
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
                  <img src={slide.img} alt="Girl Image" className='w-[450px] md:w-[580px] object-fit' />
                </div>
              </div>

            </div>

          ))
        }
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-[#FF6B35] scale-125" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Herosection