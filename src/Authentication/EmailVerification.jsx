import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_ENDPOINTS } from '../Constants/Endpoints';
import axiosInstance from '../Api/axiosInstance';
import Navbar from '../ResuableUi/Navbar';
import Footer from '../ResuableUi/Footer';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        emailId: email,
      });

      if (data.success) {
        localStorage.setItem('otpToken', data.otpToken);
        localStorage.setItem('resetEmail', email);
        navigate('/codeverification');
      }
    }  catch (err) {
  setError(err.response?.data?.message || 'Something went wrong. Try again.');
} finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex mb-12 justify-center mt-8 px-4">
        <div className="bg-[#FCFCFC] rounded-[10px] border border-[#82828266]/80 shadow-md w-full max-w-sm p-8">
          <h2 className="font-manrope text-2xl lg:text-4xl md:text-3xl font-medium text-center leading-relaxed text-[#333333] mb-6">
            Verify your Email
          </h2>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full font-manrope font-normal leading-relaxed border border-[#AAAAAA]/60 rounded-lg px-4 py-3 text-sm text-[#333333] placeholder-gray-400 outline-none focus:border-gray-400 transition"
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 bg-[#FF6B35] rounded-full text-white font-semibold text-sm tracking-wide cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Sending OTP...' : 'Verify email'}
          </button>

          <p className="text-center text-xs text-[#333333] font-manrope mt-5">
            Already had an account?{' '}
            <a href="/login" className="text-[#333333] ml-3 underline font-semibold hover:underline">
              Click Here
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerification;