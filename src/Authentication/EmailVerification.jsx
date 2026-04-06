import React, { useState } from 'react'
import Navbar from '../Componenets/Home/Sections/Navbar'
import Footer from '../Componenets/Home/Sections/Footer'
import { Link } from 'react-router-dom'

const EmailVerification = () => {
    const [email, setEmail] = useState("");

  return (
    <div>
        <Navbar/>
        <div className="flex mb-12 justify-center mt-8 px-4">
                <div className="bg-[#FCFCFC] rounded-[10px] border border-[#82828266]/80 shadow-md w-full max-w-sm p-8">
                    {/* Card Title */}
                    <h2 className="font-manrope text-2xl lg:text-4xl md:text-3xl font-medium text-center leading-relaxed text-[#333333] mb-6">
                        Verify your Email
                    </h2>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full font-manrope font-normal leading-relaxed  border border-[#AAAAAA]/60 rounded-lg px-4 py-3 text-sm text-[#333333] placeholder-gray-400 outline-none focus:border-gray-400 transition"
                        />
                    </div>

                    {/* Login Button */}
                    <Link to='/codeverification'>
                    <button
                        className="w-full py-3 bg-[#FF6B35] rounded-full text-white font-semibold text-sm tracking-wide cursor-pointer"
                    >
                        Verify email
                    </button>
                    </Link>

                    {/* Sign Up Link */}
                    <p className="text-center text-xs text-[#333333] font-manrope mt-5">
                            Haven't Any Account Yet?{" "}
                        <a href="/signup" className="text-[#333333] ml-3 underline font-semibold  font-manrope font-medium hover:underline">
                        
                            Click Here
                        </a>
                    </p>
                </div>
            </div>
        <Footer/>
    </div>
  )
}

export default EmailVerification