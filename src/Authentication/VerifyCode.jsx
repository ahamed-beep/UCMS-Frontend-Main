import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AUTH_ENDPOINTS } from '../Constants/Endpoints';
import axiosInstance from '../Api/axiosInstance';
import Navbar from '../ResuableUi/Navbar';
import Footer from '../ResuableUi/Footer';

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {
    setError('');
    const otp = code.join('');

    if (otp.length < 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    const otpToken = localStorage.getItem('otpToken');
    const email = localStorage.getItem('resetEmail');

    if (!otpToken || !email) {
      setError('Session expired. Please start again.');
      navigate('/verify');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_OTP, {
        emailId: email,
        otp,
        otpToken,
      });

      if (data.success) {
        localStorage.setItem('resetToken', data.resetToken);
        localStorage.removeItem('otpToken');
        navigate('/resetpassword');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex mb-12 justify-center mt-8 px-4">
        <div className="bg-[#FCFCFC] rounded-[10px] border border-[#82828266] shadow-md w-full md:w-[400px] p-8">
          <h2 className="font-manrope text-2xl lg:text-4xl md:text-3xl font-medium text-center leading-relaxed text-[#333333] mb-7">
            Verify code
          </h2>

          <div className="flex justify-between mb-8">
            {code.map((digit, index) => (
              <React.Fragment key={index}>
                <input
                  id={`input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 border border-[#82828266] text-center text-lg rounded-md"
                />
                {(index === 1 || index === 3) && (
                  <span className="text-xl font-bold text-gray-400">-</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 bg-[#FF6B35] rounded-full text-white font-semibold text-sm tracking-wide cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyCode;