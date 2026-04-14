import React, { useState } from 'react'
import useScrollToSection from "../hooks/useScrollToSection";
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const scrollToSection = useScrollToSection();

    const handleNavClick = (sectionId) => {
        setSidebarOpen(false);
        scrollToSection(sectionId);
    };
    return (
        <div>
            <header className="w-full">

                <div>
                    <div className="mx-auto px-6 md:px-8 flex items-center justify-between py-3">

                        <img src="/Images/Logo.webp" className="w-[130px] md:w-[145px]" alt="UCMS Logo" />

                        <div className="hidden md:flex items-center gap-[15px] lg:gap-[30px] text-sm text-gray-600">

                            <nav className="hidden md:flex justify-center items-center font-medium  font-inter text-sm leading-[20px] text-[#0F4C8A] gap-x-5 xl:gap-[30px] flex-wrap">
                                <Link to="/" className="hover:text-gray-800">Home</Link>
                                <Link to="/" onClick={() => handleNavClick('about')} className="hover:text-gray-800 cursor-pointer">About Us</Link>
                                <Link to="/services" onClick={() => handleNavClick('services')} className="hover:text-gray-800 cursor-pointer">Services</Link>
                                <Link to="/" onClick={() => handleNavClick('study-destination')} className="hover:text-gray-800 cursor-pointer">Study Destinations</Link>
                                <Link to="/" onClick={() => handleNavClick('learning-hub')} className="hover:text-gray-800 cursor-pointer">Learning Hub</Link>
                                <Link to="/" onClick={() => handleNavClick('blogs')} className="hover:text-gray-800 cursor-pointer">Blog</Link>
                                <Link to="/" onClick={() => handleNavClick('success-stories')} className="hover:text-gray-800 cursor-pointer">Success Stories</Link>
                                <Link to="/" onClick={() => handleNavClick('gallery')} className="hover:text-gray-800 cursor-pointer">Gallery</Link>
                                <Link to="/" onClick={() => handleNavClick('event')} className="hover:text-gray-800 cursor-pointer">Event</Link>
                                <Link to="/contact" onClick={() => handleNavClick('contact')} className="hover:text-gray-800 cursor-pointer">Contact</Link>
                            </nav>

                            <Link to='/login' className="font-inter font-medium leading-[20px] text-[#FFFFFF] text-center px-[4px] py-[8px] lg:px-[7px] lg:py-[18px] bg-[#0F4C8A] text-sm rounded-[10px] hover:opacity-90 transition">
                                Student Portal
                            </Link>

                        </div>

                        <button
                            className="md:hidden p-2 text-[#032A94]"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={26} />
                        </button>

                    </div>
                </div>

            </header>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={`fixed top-0 left-0 h-full w-[270px] z-50 md:hidden transition-transform duration-300 bg-[#0F4C8A] flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
                    <img src="/Images/Logo.webp" className="w-[130px] md:w-[145px]" alt="UCMS Logo" />
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex flex-col gap-3 px-4 py-6 font-medium  font-inter text-sm leading-[20px] text-white">
                    <Link to="/" className="text-center hover:text-gray-800 cursor-pointer">Home</Link>
                    <button onClick={() => handleNavClick('about')} className="hover:text-gray-800 cursor-pointer">About Us</button>
                    <button onClick={() => handleNavClick('services')} className="hover:text-gray-800 cursor-pointer">Services</button>
                    <button onClick={() => handleNavClick('study-destination')} className="hover:text-gray-800 cursor-pointer">Study Destinations</button>
                    <button onClick={() => handleNavClick('learning-hub')} className="hover:text-gray-800 cursor-pointer">Learning Hub</button>
                    <button onClick={() => handleNavClick('blogs')} className="hover:text-gray-800 cursor-pointer">Blog</button>
                    <button onClick={() => handleNavClick('success-stories')} className="hover:text-gray-800 cursor-pointer">Success Stories</button>
                    <button onClick={() => handleNavClick('gallery')} className="hover:text-gray-800 cursor-pointer">Gallery</button>
                    <button onClick={() => handleNavClick('event')} className="hover:text-gray-800 cursor-pointer">Event</button>
                    <button onClick={() => handleNavClick('contact')} className="hover:text-gray-800 cursor-pointer">Contact</button>
                </nav>

                <div className="px-5 mt-6 mb-8 flex flex-col gap-3">

                    <Link
                        to="/login"
                        onClick={() => setSidebarOpen(false)}
                        className="font-inter font-medium leading-[20px] bg-[#FFFFFF] text-center px-[4px] py-[8px] lg:px-[7px] lg:py-[18px] text-[#0F4C8A] text-sm rounded-[10px] hover:opacity-90 transition"
                    >
                        Student Portal
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default Navbar