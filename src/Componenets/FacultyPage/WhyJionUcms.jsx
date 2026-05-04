import { Briefcase, CircleCheckBig, GraduationCap, Users } from 'lucide-react'
import React from 'react'

const WhyJionUcms = () => {
  return (

    <div>
        <section className="py-16 px-4 text-center bg-[#F9FAFB]">
        <h2 className="  md:text-4xl font-bold text-[#0A0A0A] font-inter mb-2">Why Join UCMS?</h2>
        <p className="text-[#4A5565] mt-3 mb-12">Building careers while building futures</p>
        <div className=" md:mx-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Collaborative Environment", desc: "Work with diverse professionals and passionate educators" },
            { title: "Professional Development", desc: "Access to workshops, conferences, and educational opportunities" },
            { title: "Competitive Package", desc: "We offer attractive and competitive benefits" },
            { title: "Career Growth", desc: "Clear pathways for advancement and career growth" },
          ].map((item, i) => (
            <div key={i} className= "flex  bg-[#FFFFFF] py-7 rounded-2xl  border-[#F3F4F6]   shadow-md  flex-col items-center">
              <div className="w-16 h-16  rounded-full bg-[#DBEAFE] flex items-center justify-center mb-4 ">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {i === 0 && <Users color='#155DFC' /> }
                  {i === 1 && <GraduationCap color='#155DFC' /> }
                  {i === 2 && <Briefcase color='#155DFC' /> }
                  {i === 3 && <CircleCheckBig color='#155DFC' /> }
                </svg>
              </div>
              <h3 className="text-md font-bold font-inter text-[#0A0A0A] mb-1 break-all">{item.title}</h3>
              <p className="text-sm font-inter  md:max-w-60 flex-wrap text-[#4A5565] leading-relaxed px-2 break-all">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default WhyJionUcms