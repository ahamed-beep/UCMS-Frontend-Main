import React, { useEffect, useState } from 'react'
import { statistic } from '../../../Constants/constant'
import { Link } from 'react-router-dom';

const Herosection = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const slides = [
    {
      heading: "Building Brighter Futures Every Day",
      highlight: "Building Brighter Futures Every Day",
      sub: "Empowering individuals to achieve academic excellence, professional growth, and personal success through expert guidance and quality training.",
      img: "/Images/1stbanner.webp"
    },
    {
      heading: "Develop Skills Today, Build a Better Tomorrow.",
      highlight: "Develop Skills Today, Build a Better Tomorrow.",
      sub: "Empowering students, professionals, and entrepreneurs to build successful careers and businesses through practical IT and digital skills training.",
      img: "/Images/2ndbanner.webp"
    },
    {
      heading: "Building Knowledge, Developing Skills, Shaping Successful Futures",
      highlight: "Building Knowledge, Developing Skills, Shaping Successful Futures",
      sub: "Empowering students and professionals to achieve academic excellence and career success through quality education, practical learning, and expert guidance.",
      img: "/Images/3rdbanner.webp"
    }
  ];

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
    <section className='relative w-full overflow-hidden'>

      {/* ===== FULL BG IMAGE ===== */}
      <div className='absolute inset-0'>
        <img
          src={slide.img}
          alt="Hero Image"
          className='w-full h-full object-cover'
          style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
        />
        <div className='absolute inset-0' style={{ background: 'rgba(0,0,0,0.55)' }} />
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className='relative z-10 flex flex-col md:hidden min-h-[520px] justify-between pb-12'>

        <div className='flex flex-col items-start gap-3 px-5 pt-14 pb-6'>
          <h1
            className='font-poppins font-bold text-[24px] leading-[34px] text-white tracking-[1px] break-words text-left w-full'
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            {slide.heading}{" "}
            <span className='font-poppins text-[26px] text-white'>
              {slide.highlight}
            </span>
          </h1>

          <p
            className='font-arimo font-medium text-[14px] leading-[22px] text-white break-words text-left w-full'
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            {slide.sub}
          </p>

          <div className='flex gap-3 mt-1'>
            <Link to="/contact" className='font-arimo text-[14px] bg-[#FF6B35] px-5 py-3 text-white rounded-[10px] hover:bg-[#e05a28] transition-colors duration-200'>
              Apply Now
            </Link>
            <Link
              to="/consultation"
              className='font-arimo text-[14px] text-[#FF6B35] px-4 py-3 border border-[#FF6B35] rounded-[10px] hover:bg-[#FF6B35] hover:text-white transition-all duration-200'
            >
              Free Consultation
            </Link>
          </div>

          <div className="flex items-center w-fit mt-2">
            {statistic.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center text-center py-2 px-4"
                style={{
                  borderRight: i < statistic.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}
              >
                <span className="text-white text-[22px] font-bold font-arimo">{stat.number}</span>
                <span className="text-white/70 text-[11px] mt-1 font-arimo font-normal">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className='relative z-10 hidden md:flex flex-row justify-start items-center min-h-[520px] lg:min-h-[600px]'>

        <div className='w-[55%] flex flex-col items-start justify-center gap-3 lg:gap-6 px-8 py-10 lg:px-15 lg:py-10'>

          <h1
            className='font-poppins font-bold text-[40px] leading-[50px] text-white tracking-[3px] break-words text-left w-full'
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            {slide.heading}{" "}
            <span className='font-poppins text-[54px] lg:text-[40px] text-white'>
              {slide.highlight}
            </span>
          </h1>

          <p
            className='font-arimo font-medium text-[16px] leading-[28px] text-white break-words text-left w-full'
            style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          >
            {slide.sub}
          </p>

          <div className='flex gap-3 mt-2'>
            <Link to="/contact" className='font-arimo text-[16px] bg-[#FF6B35] px-5 py-4 text-white rounded-[10px] hover:bg-[#e05a28] transition-colors duration-200'>
              Apply Now
            </Link>
            <Link
              to="/consultation"
              className='font-arimo text-[16px] text-[#FF6B35] px-5 py-4 border border-[#FF6B35] rounded-[10px] hover:bg-[#FF6B35] hover:text-white transition-all duration-200'
            >
              Free Consultation
            </Link>
          </div>

          <div className="flex items-center gap-0 w-fit">
            {statistic.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center text-center py-2 px-3"
                style={{
                  borderRight: i < statistic.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}
              >
                <span className="text-white text-3xl font-bold font-arimo">{stat.number}</span>
                <span className="text-white/70 text-[14px] mt-2 font-arimo font-normal">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== DOTS ===== */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === i
                ? "bg-[#FF6B35] w-3 h-3 scale-125"
                : "bg-white/50 w-3 h-3"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Herosection;