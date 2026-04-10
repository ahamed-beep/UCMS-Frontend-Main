import React, { useState } from 'react'
import Navbar from '../../../ResuableUi/Navbar'
import Footer from '../../../ResuableUi/Footer'
import Head from '../../../ResuableUi/Head'
import { IoMdArrowForward } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { serviceCategories } from '../Constants/DetailedConstant'

const ServiceDetail = () => {
    const [showFeatures, setShowFeatures] = useState(false);
    const { id } = useParams();

    const selectedService = serviceCategories.find((ser) =>
        ser.id === id);

    return (
        <div>
            <Navbar />
            <Head title="Our Services" subtitle="Comprehensive solutions for your international education journey from assessment to arrival" />
            {
                selectedService && (

                    <div className='w-[90%] md:w-[85%] mx-auto flex flex-col gap-2 p-5 border-[1.78px] border-[#F3F4F6] shadow-xl rounded-[14px] md:mt-16 my-10'>
                        <div className='flex gap-3'>
                            <div className='flex justify-center items-center w-[56px] h-[56px] rounded-[14px] bg-[#DBEAFE]'>
                                <img src={selectedService.icon} alt={selectedService.title} width={28} height={28} />
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <h3 className='font-inter font-bold text-[22px] md:text-[28px] text-[#0A0A0A]'>{selectedService.title}</h3>
                                <p className='font-inter font-normal text-[12px] md:text-[14px] leading-[22.75px] text-[#364153]'>{selectedService.tagline}</p>
                                <div className=" rounded-lg">
                                    {showFeatures && (
                                        <ul className="list-disc flex flex-wrap gap-2">
                                            {selectedService.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="bg-[#F9FAFB] rounded-full px-3 py-1 text-[10px] md:text-[12px] text-[#0F4C8A]"
                                                >
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button
                                        onClick={() => setShowFeatures(!showFeatures)}
                                        className="font-inter text-[12px] md:text-[14px] mt-2 font-medium text-[#0F4C8A] cursor-pointer"
                                    >
                                        {showFeatures ? "Show Less" : "Learn More"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-3 border-t-[#F3F4F6] border-t-[0.89px] py-3 md:py-6 ps-3 md:ps-6'>
                            <h4 className='font-inter font-bold text-[14px] md:text-[18px] text-[#0A0A0A]'>Overview</h4>
                            <p className='font-inter font-normal text-[12px] md:text-[16px] text-[#364153]'>{selectedService.overview}</p>
                        </div>
                        <div className='flex md:flex-row flex-col justify-between'>
                            <div>
                                <div className='w-full flex flex-col gap-2 md:gap-4 py-2 md:py-4 ps-3 md:ps-6'>
                                    <h4 className='font-inter font-bold text-[14px] md:text-[18px] text-[#0A0A0A]'>Step-by-Step Process</h4>
                                    {
                                        selectedService.steps.map((step, index) => (
                                            <div key={index} className='flex items-center gap-3'>
                                                <div className='flex justify-center items-center w-[32px] h-[32px] rounded-full bg-[#FF6900]/74'>
                                                    <h4 className='font-inter font-semibold text-[12px] md:text-[16px] text-white'>{step.id}</h4>
                                                </div>
                                                <p className='font-inter font-normal text-[12px] md:text-[16px] text-[#364153]'>{step.stp}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='w-full flex flex-col gap-2 md:gap-4 py-2 md:py-4 ps-3 md:ps-6'>
                                    <h4 className='font-inter font-bold text-[14px] md:text-[18px] text-[#0A0A0A]'>Required Documents</h4>
                                    {
                                        selectedService.requiredDocuments.map((doc, index) => (
                                            <div key={index} className='flex items-center gap-3'>
                                                <img src="/Images/file.webp" alt="icon" width={16} height={16} />
                                                <p className='font-inter font-normal text-[12px] md:text-[16px] text-[#364153]'>{doc}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='w-full flex flex-col gap-2 md:gap-4 py-2 md:py-4 ps-3 md:ps-6'>
                                    <h4 className='font-inter font-bold text-[14px] md:text-[18px] text-[#0A0A0A]'>Frequently Asked Questions</h4>
                                    {
                                        selectedService.faqs.map((faq, index) => (
                                            <div key={index} className='border-l-[#0F4C8A] border-l-[3.56px] ps-4 py-1'>
                                                <h4 className='font-inter font-semibold text-[12px] md:text-[16px] text-[#0A0A0A]'><span className='text-[#0F4C8A]'>Q: </span>{faq.q}</h4>
                                                <p className='font-inter font-normal text-[10px] md:text-[14px] text-[#364153]'>{faq.a}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='flex justify-center items-center mx-auto'>
                                <div className='w-auto h-auto md:w-[373px] md:h-[523px] flex flex-col justify-center gap-3 p-5 rounded-[14px] bg-gradient-to-r from-[#0F4C8A] to-[#3A7BD5] mt-2'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#BEDBFF]'>Service Price</p>
                                        <h2 className='font-inter font-bold text-[35px] md:text-[48px] text-white'>&#36;{selectedService.pricing.amount}</h2>
                                        <p className='font-inter font-normal text-[14px] md:text-[16px] text-[#BEDBFF] text-center'>One-time payment</p>
                                    </div>
                                    <div className='mt-1'>
                                        <h3 className='font-inter font-bold text-[18px] md:text-[20px] text-white'>What's Included?</h3>
                                        {
                                            selectedService.pricing.includes.map((include, i) => (
                                                <div key={i} className='flex gap-2 py-1'>
                                                    <img src="/Images/checkwhite.png" alt="check image" width={20} height={20} />
                                                    <p className='font-inter font-normal text-[14px] md:text-[16px] text-white text-center'>{include}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <button className='w-full flex justify-center font-inter font-bold text-[14px] md:text-[16px] bg-white text-[#155DFC] rounded-[10px] py-3 mt-2 hover:bg-[#FF6B35] hover:text-white cursor-pointer ease-linear transition'>Pay Now  <IoMdArrowForward className=' ml-2' size={20} /></button>
                                        <button className='w-full flex justify-center font-inter font-semibold text-[14px] md:text-[16px] border-[1.78px] border-[#FF6B35] text-white rounded-[10px] py-3 mt-2 hover:bg-[#FF6B35] hover:text-white cursor-pointer ease-linear transition'>Free Consultation <IoMdArrowForward className=' ml-1' size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='w-[80%] flex justify-center font-inter font-semibold text-[14px] md:text-[16px] bg-[#FF6B35] text-white text-center rounded-[10px] py-3 px-4 mx-auto mt-5 border hover:bg-white hover:border-[#FF6B35] hover:text-[#FF6B35] cursor-pointer mx-auto'>Book Free Consultation <IoMdArrowForward className=' ml-2' size={20} /></button>
                    </div>

                )
            }
            {
                serviceCategories.map((service, index) => (
                    <div className='w-[90%] md:w-[85%] mx-auto flex flex-col gap-2 p-5 border-[1.78px] border-[#F3F4F6] shadow-xl rounded-[14px] md:mt-10 my-5'>
                        <div className='flex gap-3' key={index}>
                            <div className='flex justify-center items-center w-[56px] h-[56px] rounded-[14px] bg-[#DBEAFE]'>
                                <img src={service.icon} alt={service.title} width={28} height={28} />
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <h3 className='font-inter font-bold text-[22px] md:text-[28px] text-[#0A0A0A]'>{service.title}</h3>
                                <p className='font-inter font-normal text-[12px] md:text-[14px] leading-[22.75px] text-[#364153]'>{service.tagline}</p>
                                <div className=" rounded-lg">
                                    {showFeatures && (
                                        <ul className="list-disc flex flex-wrap gap-2">
                                            {service.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="bg-[#F9FAFB] rounded-full px-3 py-1 text-[10px] md:text-[12px] text-[#0F4C8A]"
                                                >
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button
                                        onClick={() => setShowFeatures(!showFeatures)}
                                        className="font-inter text-[12px] md:text-[14px] mt-2 font-medium text-[#0F4C8A] cursor-pointer"
                                    >
                                        {showFeatures ? "Show Less" : "Learn More"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className='w-full md:w-[70%] bg-[#F9FAFB] mb-5 md:mb-10 lg:mb-15 mx-auto'>
                <h3 className='font-inter font-bold text-[22px] md:text-[30px] text-[#0A0A0A] text-center'>Need Help Choosing?</h3>
                <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center mt-2'>Book a free consultation with our expert advisors</p>
                <button className='flex font-inter font-semibold text-[14px] md:text-[16px] bg-[#FF6B35] text-white text-center rounded-[10px] py-3 px-4 mx-auto mt-5 border hover:bg-white hover:border-[#FF6B35] hover:text-[#FF6B35] cursor-pointer'>Book Free Consultation <IoMdArrowForward className=' ml-2' size={20} /></button>
            </div>
            <Footer />
        </div>
    )
}

export default ServiceDetail