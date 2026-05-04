import { ArrowLeft } from 'lucide-react'
import React from 'react'

const Button = () => {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div>
        <div className='flex gap-1 justify-center items-center hover:opacity-90 p-1 cursor-pointer' 
        onClick={handleBack}>
            <ArrowLeft className='text-[#DBEAFE]' size={20}/>
            <p className='font-inter font-normal text-sm md:text-[16px] text-[#DBEAFE]'>Back to Events</p>
        </div>
    </div>
  )
}

export default Button