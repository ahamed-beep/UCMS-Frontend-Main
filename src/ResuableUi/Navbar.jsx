import React, { useState } from 'react'
import useScrollToSection from "../hooks/useScrollToSection";
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const scrollToSection = useScrollToSection();
    const location = useLocation();

    const handleNavClick = (sectionId) => {
        setSidebarOpen(false);
        scrollToSection(sectionId);
    };

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `hover:text-gray-800 cursor-pointer transition-all duration-200 ${
            isActive(path)
                ? 'text-[#032A94] font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-[#032A94] after:rounded-full'
                : ''
        }`;

    const mobileLinkClass = (path) =>
        `cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg ${
            isActive(path)
                ? 'bg-white/20 text-white font-semibold'
                : 'hover:text-gray-300 text-white'
        }`;

    const navLinks = [
        { to: '/career', label: 'Career', section: null },
        { to: '/about', label: 'About Us', section: 'about' },
        { to: '/services', label: 'Services', section: 'services' },
        { to: '/studydestination', label: 'Study Destinations', section: 'study-destination' },
        { to: '/learninghub', label: 'Learning Hub', section: 'learning-hub' },
        { to: '/blog', label: 'Blog', section: 'blogs' },
        { to: '/success/stories', label: 'Success Stories', section: 'success-stories' },
        { to: '/gallery', label: 'Gallery', section: 'gallery' },
        { to: '/event&announcements', label: 'Event', section: 'event' },
        { to: '/contact', label: 'Contact', section: 'contact' },
    ];

    return (
        <div>
            <header className="w-full">
                <div>
                    <div className="mx-auto px-6 md:px-8 flex items-center justify-between py-3">
                        <Link to="/">
                            <img src="/Images/Logo.webp" className="w-[130px] md:w-[145px]" alt="UCMS Logo" />
                        </Link>
                        <div className="hidden md:flex items-center gap-[15px] lg:gap-[10px] text-sm text-gray-600">
                            <nav className="hidden md:flex justify-center items-center font-medium font-inter text-sm leading-[20px] text-[#0F4C8A] gap-x-5 xl:gap-[30px] flex-wrap">
                                {navLinks.map(({ to, label, section }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        onClick={() => section && handleNavClick(section)}
                                        className={linkClass(to)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                            <Link to='/login' className="font-inter font-medium leading-[20px] text-[#FFFFFF] text-center px-[4px] py-[8px] lg:px-[7px] lg:py-[15px] bg-[#0F4C8A] text-sm rounded-[10px] hover:opacity-90 transition">
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
                    <img src="/Images/footer.webp" className="w-[130px] md:w-[145px]" alt="UCMS Logo" />
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 px-4 py-6 font-medium font-inter text-sm leading-[20px]">
                    {navLinks.map(({ to, label, section }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => section ? handleNavClick(section) : setSidebarOpen(false)}
                            className={mobileLinkClass(to)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="px-5 mt-auto mb-8 flex flex-col gap-3">
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