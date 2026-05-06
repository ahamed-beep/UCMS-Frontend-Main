import React from 'react'
import { IoMdArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const SubscribtionBar = ({ title, subtitle, button, showButton = true, color }) => {
    return (
        <section className='relative w-full bg-[#0F4C8A] bg-cover bg-center'>
            <div className='absolute inset-0 bg-[url("/Images/bg.png")] opacity-20'></div>
            <div className='relative w-full md:py-16 py-10 z-10'>
                <h3 className='font-inter font-bold text-[24px] md:text-[36px] text-white text-center wrap-break-word'>{title}</h3>
                <p className='font-inter font-normal text-[16px] md:text-[20px] text-[#DBEAFE] text-center mt-2 wrap-break-word'>{subtitle}</p>
                {showButton &&
                    <Link to="/consultation">
                        <button className={`flex font-inter font-semibold text-[14px] md:text-[16px] bg-white ${color} text-center rounded-[10px] py-3 px-4 mx-auto mt-5 cursor-pointer`}>{button} <IoMdArrowForward className=' ml-2' size={20} /></button>
                    </Link>
                }
            </div>
        </section>
    )
}

export default SubscribtionBar