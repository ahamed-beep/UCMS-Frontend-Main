import React, { useEffect, useState } from 'react'
import { statistic } from '../../../Constants/constant'
import { Link } from 'react-router-dom';

const Herosection = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const slides = [
    {
      heading: "Guiding You Towards Success Through Education, Training & Expert Counselling",
      highlight: "Building Brighter Futures Every Day",
      sub: "Empowering individuals to achieve academic excellence, professional growth, and personal success through expert guidance and quality training.",
    },
    {
      heading: "Let's Master the Skills That Employers Are Looking For",
      highlight: "Develop Skills Today, Build a Better Tomorrow.",
      sub: "Empowering students, professionals, and entrepreneurs to build successful careers and businesses through practical IT and digital skills training.",
    },
    {
      heading: "Let's Achieve Academic Excellence Through Quality Education & Training",
      highlight: "Building Knowledge, Developing Skills, Shaping Successful Futures",
      sub: "Empowering students and professionals to achieve academic excellence and career success through quality education, practical learning, and expert guidance.",
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (i) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(i);
      setFade(true);
    }, 500);
  };

  const slide = slides[currentIndex];

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ background: "linear-gradient(180deg, #0F4C8A 0%, #1A2947 50%, #2A3F5F 100%)" }}
    >
      <div className='flex flex-col justify-center items-center md:flex-row'>

        <div className='w-full flex flex-col gap-2 sm:gap-3 lg:gap-6 md:w-[50%] px-6 py-7 md:px-8 md:py-10 lg:px-15 lg:py-10'>

          <h1
            className='font-libre font-medium text-[30px] md:text-[40px] leading-[40px] lg:leading-[50px] text-white tracking-[3px] break-words'
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            {slide.heading}{" "}
            <span className='font-praise text-[30px] md:text-[54px] lg:text-[40px] text-[#FF6B35]'>
              {slide.highlight}
            </span>
          </h1>

          <p
            className='font-arimo font-medium text-[15px] md:text-[16px] md:leading-[28px] leading-[23px] text-white break-words'
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            {slide.sub}
          </p>

          <div className='flex gap-3 mt-2'>
            <button className='font-arimo text-[14px] md:text-[16px] bg-[#FF6B35] px-3 py-2 md:px-5 md:py-4 text-white rounded-[10px]'>Apply Now</button>
            <Link to="/consultation" className='font-arimo text-[14px] md:text-[16px] text-[#FF6B35] px-3 py-2 md:px-5 md:py-4 border border-[#FF6B35] rounded-[10px]'>Free Consultation</Link>
          </div>

          <div className="flex items-center gap-0 rounded-md overflow-hidden w-fit">
            {statistic.map((stat, i) => (
              <div key={i} className="flex whitespace-nowrap flex-col px-3 justify-center text-center py-2">
                <span className="text-[#FFFFFF] text-2xl md:text-3xl font-bold font-arimo">{stat.number}</span>
                <span className="text-[#D1D5DC] text-[12px] md:text-[14px] mt-2 font-arimo font-normal overflow-hidden">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full md:w-[50%] sm:px-10 sm:py-7 px-0 py-0 lg:px-15 lg:py-10'>
          <img
            src="/Images/heroimg.webp"
            alt="Girl Image"
            className='w-[450px] md:w-[580px] object-fit'
          />
        </div>

      </div>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-[#FF6B35] scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Herosection