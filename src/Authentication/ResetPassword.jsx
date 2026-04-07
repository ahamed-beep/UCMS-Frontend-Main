import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componenets/Home/Sections/Navbar';
import Footer from '../Componenets/Home/Sections/Footer';
import { Eye, EyeClosed } from 'lucide-react';
import { AUTH_ENDPOINTS } from '../Constants/Endpoints';
import axiosInstance from '../Api/axiosInstance';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMatch = password && password === confirmpassword;

  const handleSubmit = async () => {
    setError('');

    if (!hasLength || !hasUppercase || !hasSpecialChar) {
      setError('Password does not meet the requirements.');
      return;
    }
    if (!isMatch) {
      setError('Passwords do not match.');
      return;
    }

    const resetToken = localStorage.getItem('resetToken');
    if (!resetToken) {
      setError('Session expired. Please start again.');
      navigate('/verify');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        resetToken,
        newPassword: password,
      });

      if (data.success) {
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (condition) =>
    condition ? (
      <span className="text-green-500">✔</span>
    ) : (
      <span className="text-red-400">✖</span>
    );

  return (
    <div>
      <Navbar />
      <div className="flex mb-12 justify-center mt-8 px-4">
        <div className="bg-[#FCFCFC] rounded-[10px] border border-[#82828266]/80 shadow-md w-full md:w-[450px] p-8">
          <h2 className="font-manrope text-2xl lg:text-4xl md:text-3xl font-medium text-center leading-relaxed text-[#333333] mb-6">
            Reset your password
          </h2>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-[#FFFFFF] font-manrope font-normal leading-relaxed border border-[#AAAAAA]/60 rounded-md px-4 py-3 pr-12 text-sm text-[#333333] placeholder-gray-400 outline-none focus:border-gray-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative mt-2">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full bg-[#FFFFFF] font-manrope mt-2 mb-2 font-normal leading-relaxed border border-[#AAAAAA]/60 rounded-md px-4 py-3 pr-12 text-sm text-[#333333] placeholder-gray-400 outline-none focus:border-gray-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="my-4">
            <div className="flex gap-2">
              <div className={`h-1 flex-1 rounded transition-all duration-300 ${hasLength ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div className={`h-1 flex-1 rounded transition-all duration-300 ${hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div className={`h-1 flex-1 rounded transition-all duration-300 ${hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            <div className="text-xs mt-3 space-y-1">
              <p className={hasLength ? 'text-green-600' : 'text-gray-500'}>At least 8 characters</p>
              <p className={hasUppercase ? 'text-green-600' : 'text-gray-500'}>One uppercase letter</p>
              <p className={hasSpecialChar ? 'text-green-600' : 'text-gray-500'}>One special character</p>
            </div>
          </div>

          {confirmpassword && (
            <p className="text-xs mb-3 flex items-center gap-2">
              {renderIcon(isMatch)} Passwords match
            </p>
          )}

          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full font-manrope py-3 bg-[#FF6B35] rounded-full text-white font-semibold text-sm md:text-lg cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Resetting...' : 'Confirm'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;