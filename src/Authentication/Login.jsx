import { CircleCheck, Eye, EyeOff, GraduationCap, Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componenets/Home/Sections/Navbar';
import { heroData, ROLES } from '../Constants/constant';
import { AUTH_ENDPOINTS } from '../Constants/Endpoints';
import axiosInstance from '../Api/axiosInstance';
import { saveAuthData } from '../Utils/Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
        emailId: email,
        password,
      });

     if (data.success) {
  saveAuthData(data.token, data.data);
  const role = data.data.role;

  if (role === ROLES.ADMIN) {
    navigate('/admin/dashboard');
  } else if (role === ROLES.STUDENT) {
    navigate('/student/dashboard');
  } else {
    setError('Unauthorized role. Contact support.');
  }
}
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-[50%] px-20 py-10">
          <div className="flex flex-col gap-5">
            <div className="flex">
              <div className="bg-[#0F4C8A] p-3 text-white rounded-xl">
                <GraduationCap width={30} height={30} />
              </div>
              <div className="ms-3">
                <h3 className="text-2xl font-inter font-bold">Upskills</h3>
                <p className="font-inter text-[#4A5565] text-[14px]">Student Portal</p>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold">Welcome Back</h1>
              <p className="text-[18px] font-regular text-[#4A5565] pt-2">
                Sign in to access your student dashboard
              </p>
            </div>

            <div className="w-full">
              <label htmlFor="email" className="font-medium text-[14px] leading-[20px] text-[#364153]">
                Email Address
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="student@example.com"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] py-3 pl-10 pr-4"
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="password" className="font-medium text-[14px] leading-[20px] text-[#364153]">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full block border-[#D1D5DC] outline-none border-[0.8px] focus:border-[#D1D5DC] rounded-[10px] py-3 pl-10 pr-4"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <label htmlFor="checkin" className="flex gap-2 font-inter text-[#364153] text-[14px] cursor-pointer">
                <input type="checkbox" id="checkin" className="scale-125" />
                Remember me
              </label>
              <a href="/verify" className="font-inter text-[14px] text-blue-800">
                Forget Password?
              </a>
            </div>

            {error && (
              <p className="text-red-500 text-[13px] -mt-2">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-[#FF6B35] rounded-[10px] text-white font-inter font-semibold text-[16px] leading-[24px] tracking-wide disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </div>

        <div
          className="w-full md:w-[50%] bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.8)), url('/Images/login.webp')",
          }}
        >
          <div className="flex flex-col gap-6 p-10">
            <div className="self-start text-white font-inter font-semibold bg-[#4285e3] rounded-full py-3 px-4">
              {heroData.badge}
            </div>
            <h1 className="font-inter font-bold text-4xl text-white">{heroData.title}</h1>
            <p className="font-inter font-normal text-[20px] text-gray-200">{heroData.description}</p>
            {heroData.features.map((item) => (
              <div className="flex gap-3" key={item.title}>
                <div>
                  <CircleCheck className="scale-125 text-white mt-1" />
                </div>
                <div>
                  <h3 className="font-inter font-medium text-[20px] text-white">{item.title}</h3>
                  <p className="font-inter font-normal text-[16px] text-gray-200">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="border-l-4 pl-4 border-gray-300">
              <h3 className="font-inter font-light italic text-[20px] text-white">
                {heroData.testimonial.quote}
              </h3>
              <p className="flex items-center text-white font-normal mt-2">
                <span className="w-5 h-[1px] bg-white mr-2"></span>
                {heroData.testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;