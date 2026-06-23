import React from 'react'
import Head from '../../ResuableUi/Head'
import Navbar from '../../ResuableUi/Navbar'
import { aboutData, processSteps, success, teamMembers, Values } from './Constants/AboutConstant'
import Footer from '../../ResuableUi/Footer'

const SectionGrid = ({ title, subtitle, services, bgColor = 'bg-white' }) => (
    <section>
        <div className={`w-full md:mt-16 mt-10 py-3 ${bgColor}`}>
            <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>{title}</h3>
            {subtitle && <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center'>{subtitle}</p>}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-7 md:py-10 px-3 md:px-6'>
                {services.map((item, index) => (
                    <div key={index} className='flex justify-center items-center gap-2 bg-white rounded-[14px] border-[0.8px] border-[#F3F4F6]'>
                        <div className='flex flex-col items-center gap-2 py-3 px-5'>
                            <img src={item.image} alt={item.name} width={48} height={48} />
                            <h3 className='font-inter font-semibold text-[16px] md:text-[18px] text-[#0A0A0A]'>{item.title}</h3>
                            <p className='font-inter font-normal text-[12px] md:text-[14px] text-[#4A5565] text-center'>{item.description}</p>
                            {item.exp && <p className='font-inter font-medium text-[10px] md:text-xs text-[#0F4C8A]'>{item.exp}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

const TeamSection = ({ title, subtitle, members }) => (
    <section>
        <div className='w-full md:mt-16 mt-10 py-3 bg-[#F9FAFB]'>
            <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-[#0A0A0A] text-center'>{title}</h3>
            {subtitle && <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#4A5565] text-center mt-2'>{subtitle}</p>}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-4 md:px-10'>
                {members.map((item, index) => (
                    <div key={index} className='flex p-1 flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#E5E7EB]'>
                     <div className='w-full h-110 md:h-110 overflow-hidden rounded-full aspect-square'>
    <img
        src={item.image}
        alt={item.title}
        className='w-full  h-full object-cover object-top'
    />
</div>
                        <div className='flex flex-col items-center gap-1 py-4 px-4 bg-white w-full'>
                            <h3 className='font-inter font-bold text-[16px] md:text-[18px] text-[#0A0A0A] text-center'>{item.title}</h3>
                            <p className='font-inter font-medium text-[13px] text-[#0F4C8A] text-center'>{item.description}</p>
                            {item.exp && <p className='font-inter font-normal text-[11px] text-[#6B7280] mt-1'>{item.exp}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

const About = () => {
    return (
        <div>
            <Navbar />
            <Head title="About Upskills" subtitle="Empowering students to achieve their international education dreams since 2022"
             bgImage="/Images/contactus.webp" />
            <div className='font-inter text-gray-900 bg-[#FFFFFF]'>
                <div className='px-5 pt-5 md:px-19 md:pt-19'>
                    <div className='space-y-2 md:space-y-6'>
                        <h2 className='font-bold text-[26px] md:text-[36px] text-[#0A0A0A] wrap-break-word'>{aboutData.title}</h2>
                        <div className='flex flex-col gap-2 md:gap-4 font-normal text-[12px] md:text-[16px] text-[#364153]'>
                            {aboutData.description.map((des, i) => (
                                <p key={i}>
                                    {des.bold ? <strong>{des.text}</strong> : des.text}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 gap-6 bg-[#F9FAFB] mt-5 md:mt-10'>
                        {aboutData.cards.map((card, i) => (
                            <div key={i} className='border-[0.89px] border-[#E5E7EB] bg-white rounded-[14px] shadow-sm p-4 md:p-8'>
                                <div className='flex items-center gap-3'>
                                    <img src={card.icon} alt="eye" width={32} height={32} />
                                    <h3 className='font-bold  text-[20px] md:text-[30px] text-[#0A0A0A]'>{card.title}</h3>
                                </div>
                                <p className='font-normal text-[12px] md:text-[16px] text-[#364153] wrap-anywhere'>{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SectionGrid title="Our Process" services={processSteps} />

            <TeamSection
                title="Our Expert Team"
                subtitle="Meet our certified advisors with extensive experience in international education"
                members={teamMembers}
            />

            <SectionGrid title="Our Values" services={Values} />

            <div className='relative grid grid-cols-2 md:grid-cols-4 w-full bg-[#0F4C8A] bg-cover bg-center'>
                <div className='absolute inset-0 bg-[url("/Images/bg.png")] opacity-20'></div>
                {success.map((item, index) => (
                    <div key={index} className='relative w-full md:py-16 py-10 z-10'>
                        <h3 className='font-inter font-bold text-[20px] md:text-[38px] lg:text-[48px] text-white text-center'>{item.title}</h3>
                        <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#DBEAFE] text-center'>{item.subtitle}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default About