import { useState, useEffect } from "react";
import { contactData, footerData } from '../Constants/constant'
import { FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axiosInstance from "../Api/axiosInstance";

const Footer = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosInstance.get("/service-pages")
      .then(res => setServices(res.data?.data?.slice(0, 5) || []))
      .catch(() => {});
  }, []);

  return (
    <footer>
      <div className='w-full bg-[#101828]'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 py-5 md:py-10 mx-4 md:mx-10'>
          
          {/* Logo + description */}
          <div className='col-span-2 md:col-span-1 mt-2'>
            <div>
              <img className="h-12 md:h-15" src="/Images/footer.webp" alt="" />
            </div>
            <p className='font-inter font-medium text-[12px] md:text-[14px] text-[#D1D5DC] md:py-5 py-3'>
              Your trusted partner for international education and migration services. We help students achieve their dreams of studying abroad.
            </p>
            <div className='flex gap-3'>
              <a href="https://www.facebook.com/profile.php?id=61578392902307" target="_blank" rel="noreferrer">
                <img src="/Images/facebook.webp" className='w-5 h-5' alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/upskills_consultants/" target="_blank" rel="noreferrer">
                <img src="/Images/instagram.webp" className='w-5 h-5' alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/company/122504609/" target="_blank" rel="noreferrer">
                <img src="/Images/Linkedin.webp" className='w-5 h-5' alt="LinkedIn" />
              </a>
              <a href="https://www.tiktok.com/@upskillsconsultancy" target="_blank" rel="noreferrer">
                <FaTiktok className='w-5 h-5 text-[#D1D5DC]' />
              </a>
              <a href="https://www.youtube.com/@UpskillsConsultants" target="_blank" rel="noreferrer">
                <FaYoutube className='w-5 h-5 text-[#D1D5DC]' />
              </a>
            </div>
          </div>

          {/* Quick Links — footerData[0] only */}
          <div>
            <h3 className='font-inter font-semibold text-[16px] lg:text-[18px] text-white'>
              {footerData[0].title}
            </h3>
            <div className='flex flex-col gap-2 md:gap-2 md:mt-2 mt-1'>
              {footerData[0].links.map((link, i) => (
                <Link key={i} to={link.url} className='font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]'>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Our Services — dynamic */}
          <div>
            <h3 className='font-inter font-semibold text-[16px] lg:text-[18px] text-white'>
              Our Services
            </h3>
            <div className='flex flex-col gap-2 md:mt-2 mt-1'>
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/Services?open=${service.id}`}
                  className='font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]'
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className='font-inter font-semibold text-[16px] lg:text-[18px] text-white'>Contact Us</h3>
            <div className='flex flex-col gap-1 md:gap-2 md:mt-2 mt-1'>
              {contactData.map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <img src={item.img} alt="" className='w-5 h-5 mt-0.5' />
                  {item.type === 'phone' ? (
                    <a href={`tel:${item.href}`} className="font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC] hover:text-white">
                      {item.text}
                    </a>
                  ) : item.type === 'email' ? (
                    <a href={`mailto:${item.href}`} className="font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC] hover:text-white">
                      {item.text}
                    </a>
                  ) : (
                    <p className="font-inter font-normal text-[12px] md:text-[14px] text-[#D1D5DC]">
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        <hr className='w-[95%] mx-auto text-[#D1D5DC]/10 mt-3 md:mt-5' />
        <p className='text-center font-inter font-normal text-[#D1D5DC] text-[12px] md:text-[14px] py-5 lg:py-10 px-3'>
          © 2026 Upskills Consultancy & Migration Services. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer