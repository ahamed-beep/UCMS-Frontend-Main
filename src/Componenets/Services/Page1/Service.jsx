import React from 'react'
import Navbar from '../../../ResuableUi/Navbar'
import Footer from '../../../ResuableUi/Footer'
import Head from '../../../ResuableUi/Head'
import { IoMdArrowForward } from 'react-icons/io'
import { servicesData } from '../Constants/ServiceConstant'

const Service = () => {
    return (
        <div>
            <Navbar />
            <Head title="Our Services" subtitle="Comprehensive solutions for your international education journey from assessment to arrival" />
            <div className='w-[90%] md:w-[85%] mx-auto my-6 md:my-10 lg:my-15'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5'>
                    {
                        servicesData.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div key={index} className='flex flex-col gap-2 p-5 border-[1.78px] border-[#F3F4F6] shadow-xl rounded-[14px] hover:border-[#0F4C8A]'>
                                    <div className='flex flex-col justify-center items-center gap-2'>
                                        <div className='flex justify-center items-center w-[64px] h-[64px] rounded-[14px] bg-[#DBEAFE]'>
                                            <Icon className='text-[#0F4C8A]' size={32} />
                                        </div>
                                        <h4 className='font-inter font-bold text-[17px] md:text-[20px] text-[#0A0A0A]'>{service.title}</h4>
                                        <h2 className='font-inter font-bold text-[23px] md:text-[36px] text-[#101828]'>&#36;{service.price}<span className='font-inter font-normal text-[14px] md:text-[16px] text-[#6A7282]'>/service</span></h2>
                                        <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#4A5565] text-center'>{service.description}</p>
                                    </div>
                                    <div className='mt-1'>
                                        {
                                            service.features.map((feature, i) => (
                                                <div key={i} className='flex gap-2 py-1'>
                                                    <img src="/Images/check.png" alt="check image" width={20} height={20} />
                                                    <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#364153]'>{feature}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button className='w-full flex justify-center font-inter font-semibold text-[14px] md:text-[16px] bg-[#F3F4F6] text-[#101828] rounded-[10px] py-3 mt-2 hover:bg-[#FF6B35] hover:text-white cursor-pointer ease-linear transition'>View Details <IoMdArrowForward className=' ml-2' size={20} /></button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='w-full md:w-[70%] bg-[#F9FAFB] mb-5 md:mb-10 lg:mb-15 mx-auto'>
                <h3 className='font-inter font-bold text-[22px] md:text-[30px] text-[#0A0A0A] text-center'>Need Help Choosing?</h3>
                <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center mt-2'>Book a free consultation with our expert advisors</p>
                <button className='flex font-inter font-semibold text-[14px] md:text-[16px] bg-[#FF6B35] text-white text-center rounded-[10px] py-3 px-4 mx-auto mt-5 border hover:bg-white hover:border-[#FF6B35] hover:text-[#FF6B35] cursor-pointer'>Book Free Consultation <IoMdArrowForward className=' ml-2' size={20} /></button>
            </div>
            <Footer />
        </div>
    )
}

export default Service