import React from 'react'
import { contactData, footerData } from '../Constants/constant'
// import { LuFacebook, LuLinkedin, LuTwitter } from 'react-icons/lu'
// import { BsInstagram } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer>
      <div className='w-full h-250px md:h-[405px] bg-[#101828]'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 py-1 md:py-10 mx-7 md:mx-10'>
          <div className='col-span-2 md:col-span-1 mt-2 '>
            <div>
              <img src="/Images/footer.webp" alt="" />
            </div>
            <p className='font-inter font-medium text-[12px] md:text-[14px] text-[#D1D5DC] md:py-5 py-3'>Your trusted partner for international education and migration services. We help students achieve their dreams of studying abroad.</p>
            <div className='flex gap-3'>
              <a href="/"><img src="/Images/facebook.webp" className='w-5 h-5' alt="" /></a>
              <a href="/"><img src="/Images/twitter.webp" className='w-5 h-5' alt="" /></a>
              <a href="/"><img src="/Images/instagram.webp" className='w-5 h-5' alt="" /></a>
              <a href="/"><img src="/Images/Linkedin.webp" className='w-5 h-5' alt="" /></a>
            </div>
          </div>
          {
            footerData.map((section, index) => (
              <div key={index}>
                <h3 className='font-inter font-semibold text-[16px] lg:text-[18px] text-white'>{section.title}</h3>
                <div className='flex flex-col gap-2 md:gap-2 md:mt-2 mt-1 '>
                  {
                    section.links.map((link, i) => (
                      <a key={i} href={link.url} className='font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]'>{link.name}</a>
                    ))
                  }
                </div>
              </div>
            ))
          }
          <div>
            <h3 className='font-inter font-semibold text-[16px] lg:text-[18px] text-white'>Contact Us</h3>
            <div className='flex flex-col gap-1 md:gap-2 md:mt-2 mt-1 '>
              {contactData.map((item, i) => (
                <div key={i} className="flex gap-2">
            <img src={item.img} alt="" className='w-5 h-5' />
                  <p className="font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]">
                    {item.text}
                  </p>
                </div>
              ))}
              <div className=''>
                <h3 className='font-inter font-semibold text-[12px] md:text-[14px] text-[#D1D5DC]'>Working Hours:</h3>
                <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]'>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]'>Sat: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <hr className='w-[95%] mx-auto text-[#D1D5DC]/10 mt-3 md:mt-5' />
        <p className='text-center font-inter font-normal text-[#D1D5DC] text-[12px] md:text-[14px]  py-5 lg:py-10 px-3'>© 2026 Upskills Consultancy & Migration Services. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer