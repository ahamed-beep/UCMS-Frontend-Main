import React from 'react'
import Head from '../../ResuableUi/Head'
import Navbar from '../../ResuableUi/Navbar'
import { aboutData, processSteps, success, teamMembers, Values } from './Constants/AboutConstant'
import ServiceBar from '../../ResuableUi/ServiceBar'
import Footer from '../../ResuableUi/Footer'

const About = () => {
    return (
        <div>
            <Navbar />
            <Head title="About Upskills" subtitle="Empowering students to achieve their international education dreams since 2014" />
            <div className='font-inter text-gray-900 bg-[#FFFFFF]'>
                <div className='px-5 pt-5 md:px-19 md:pt-19'>
                    <div className='space-y-2 md:space-y-6'>
                        <h2 className='font-bold text-[26px] md:text-[36px] text-[#0A0A0A]'>{aboutData.title}</h2>
                        <div className='flex flex-col gap-2 md:gap-4 font-normal text-[12px] md:text-[16px] text-[#364153]'>
                            {
                                aboutData.description.map((des, i) => (
                                    <p key={i}>{des}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 bg-[#F9FAFB] mt-5 md:mt-10'>
                        {
                            aboutData.cards.map((card, i) => (
                                <div className='border-[0.89px] border-[#E5E7EB] bg-white rounded-[14px] shadow-sm p-4 md:p-8'>
                                    <div className='flex items-center gap-3'>
                                        <img src={card.icon} alt="eye" width={32} height={32} />
                                        <h3 className='font-bold text-[20px] md:text-[30px] text-[#0A0A0A]'>{card.title}</h3>
                                    </div>
                                    <p className='font-normal text-[12px] md:text-[16px] text-[#364153]'>{card.text}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <ServiceBar title="Our Process" services={processSteps} />
            <ServiceBar title="Our Expert Team" subtitle="Meet our certified advisors with extensive experience in international education" bgColor="bg-[#F9FAFB]" services={teamMembers} />
            <ServiceBar title="Our Values" services={Values} />
            <div className='relative grid grid-cols-2 md:grid-cols-4 w-full bg-[#0F4C8A] bg-cover bg-center'>
                <div className='absolute inset-0 bg-[url("/Images/bg.png")] opacity-20'></div>
                {success.map((item, index) => (
                    <div className='relative w-full md:py-16 py-10 z-10'>
                        <h3 className='font-inter font-bold text-[20px] md:text-[38px] lg:text-[48px] text-white text-center'>{item.title}</h3>
                        <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#DBEAFE] text-center'>{item.subtitle}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default About