import { Phone } from 'lucide-react'
import React from 'react'

const CtaSection = () => {
  return (
    <div>
      <section className="px-4 md:px-22 pb-10 md:pb-16">
        <div className="mx-auto rounded-2xl py-10 px-8 text-center text-[#FFFFFF] font-inter"
          style={{ background: 'linear-gradient(to right, #0F4C8A, #193CB8)' }}>
          <h3 className="text-xl md:text-2xl font-bold mb-2">Questions About Joining Our Team?</h3>
          <p className="text-[#DBEAFE] font-light font-inter text-sm mb-5 wrap-break-word">Reach out to our HR department for more information</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a href="mailto:info@ucms.net.au" className='font-inter text-[#FFFFFF] hover:text-[#DBEAFE]'>
              📧 info@ucms.net.au
            </a>
            <span className="hidden sm:inline text-[#FFFFFF]">|</span>
            <a href="tel:+924235692472" className='flex items-center gap-1 font-inter text-[#FFFFFF] hover:text-[#DBEAFE]'>
              <Phone className='w-4 h-4' /> (+92 42) 35692472
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CtaSection