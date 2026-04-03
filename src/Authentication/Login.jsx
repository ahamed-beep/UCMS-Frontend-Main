import { CircleCheck, Eye, GraduationCap, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'
import Navbar from '../Componenets/Home/Sections/Navbar'
import { heroData } from '../Constants/constant'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section>
            <Navbar />
            <div className='flex'>
                <div className='w-[50%]'>
                    <div className='flex flex-col gap-5 px-20 py-10'>
                        <div className='flex'>
                            <div className='bg-[#0F4C8A] p-3 text-white rounded-xl'><GraduationCap width={30} height={30} /></div>
                            <div className='ms-3'>
                                <h3 className='text-2xl font-inter font-bold'>Upskills</h3>
                                <p className='font-inter text-[#4A5565] text-[14px]'>Student Portal</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-4xl font- font-bold '>Welcome Back</h1>
                            <p className='text-[18px] font- font-regular text-[#4A5565] pt-2'>Sign in to access your student dashboard</p>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="email" className='font-medium text-[14px] leading-[20px] text-[#364153]'>Email Address
                            </label>
                            <div className='relative mt-2'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                <input
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                type="email" name="email" id="email" placeholder='student@example.com' className='w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] py-3 pl-10 pr-4' />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className='font-medium text-[14px] leading-[20px] text-[#364153]'>Password
                            </label>
                            <div className='relative mt-2'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                <Eye className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                                <input
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                type="password" name="password" id="password" placeholder='student' className='w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] py-3 pl-10 pr-4' />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='checkin' className='flex gap-2 font-inter text-[#364153] text-[14px] cursor-pointer'>
                                <input type="checkbox" name="checkin" id="checkin" className='scale-125' />
                                Remember me
                            </label>
                            <a href="/forget-password" className='font-inter text-[#364153] text-[14px] text-blue-800'>Forget Password?</a>
                        </div>
                        <button
                            className="w-full py-3 bg-[#FF6B35] rounded-[10px] text-white font-inter font-semibold text-[16px] leading-[24px] tracking-wide"
                        >
                            Sign In
                        </button>
                        <div className='text-center font-inter text-[#4A5565] text-[14px]'>Don't have an account? <a href='/signup' className='text-blue-800 font-medium'>Create Student Account</a></div>
                        <hr className="border-t border-gray-300 my-4" />
                        <div className='flex justify-center gap-3'>
                            <a href='/help' className='text-[#4A5565] text-[16px] hover:text-gray-700'>Help center</a><span className="text-gray-400">•</span>
                            <a href='/contact' className='text-[#4A5565] text-[16px] hover:text-gray-700'>Contact Support</a><span className="text-gray-400">•</span>
                            <a href='/privacy' className='text-[#4A5565] text-[16px] hover:text-gray-700'>Privacy</a>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[50%] bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: "linear-gradient(rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.8)), url('/Images/login.webp')"
                    }}
                >
                    <div className='flex flex-col gap-6 p-10'>
                        <div className='self-start text-white font-inter font-semibold bg-[#4285e3] rounded-full py-3 px-4'>{heroData.badge}</div>
                        <h1 className='font-inter font-bold text-4xl text-white'>{heroData.title}</h1>
                        <p className='font-inter font-normal text-[20px] text-gray-200'>{heroData.description}</p>
                        {
                            heroData.features.map((item) => (
                                <div className='flex gap-3' key={item.title}>
                                    <div>
                                        <CircleCheck className='scale-125 text-white mt-1' />
                                    </div>
                                    <div>
                                        <h3 className='font-inter font-medium text-[20px] text-white'>{item.title}</h3>
                                        <p className='font-inter font-normal text-[16px] text-gray-200'>{item.desc}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='border-l-4 pl-4 border-gray-300'>
                            <h3 className='font-inter font-light italic text-[20px] text-white'>{heroData.testimonial.quote}</h3>
                            <p className="flex items-center text-white font-normal mt-2">
                                <span className="w-5 h-[1px] bg-white mr-2"></span>
                                {heroData.testimonial.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login