import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componenets/Home/Sections/Navbar';
import Footer from '../Componenets/Home/Sections/Footer';
import { AUTH_ENDPOINTS } from '../Constants/Endpoints';
import axiosInstance from '../Api/axiosInstance';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
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

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    setError('');
    const otp = code.join('');
    if (otp.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    const email = localStorage.getItem('resetEmail');
    const otpToken = localStorage.getItem('otpToken');

    if (!email || !otpToken) {
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
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    const email = localStorage.getItem('resetEmail');
    if (!email) {
      navigate('/verify');
      return;
    }

    setResending(true);
    try {
      const { data } = await axiosInstance.post(AUTH_ENDPOINTS.RESEND_OTP, {
        emailId: email,
      });

      if (data.success) {
        localStorage.setItem('otpToken', data.otpToken);
        setCode(['', '', '', '', '', '']);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResending(false);
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
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border border-[#82828266] text-center text-lg rounded-md outline-none focus:border-[#FF6B35]"
                />
                {(index === 1 || index === 3) && (
                  <span className="text-xl font-bold text-gray-400">-</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full py-3 bg-[#FF6B35] rounded-full text-white font-semibold text-sm tracking-wide cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          <p className="text-center text-xs text-[#333333] font-manrope mt-4">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              disabled={resending}
              className="underline font-semibold disabled:opacity-50"
            >
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyCode;