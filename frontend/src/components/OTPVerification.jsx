import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiRefreshCw, FiArrowLeft, FiCheck } from 'react-icons/fi';
import axios from 'axios';

const OTPVerification = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
      if (pastedData.length === 6) {
        handleVerifyOTP(pastedData);
      }
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (otpCode = otp.join('')) => {
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Pass OTP to parent component for handling
      await onVerified(otpCode);
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.response?.data?.msg || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setIsResending(true);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/auth/resend-otp', { email });
      setTimeLeft(600); // Reset timer
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError(error.response?.data?.msg || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">
            We've sent a 6-digit OTP code to
          </p>
          <p className="text-amber-600 font-medium">{email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Enter the code to complete your account creation
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none transition-colors ${
                  error 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-amber-500'
                }`}
                disabled={isVerifying}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}
        </div>

        {/* Timer and Resend */}
        <div className="text-center mb-6">
          {timeLeft > 0 ? (
            <p className="text-gray-600 text-sm">
              Code expires in <span className="font-medium text-amber-600">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-red-500 text-sm">Code has expired</p>
          )}

          <button
            onClick={handleResendOTP}
            disabled={!canResend || isResending}
            className={`mt-2 text-sm font-medium transition-colors ${
              canResend && !isResending
                ? 'text-amber-600 hover:text-amber-700 cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            {isResending ? (
              <span className="flex items-center justify-center gap-2">
                <FiRefreshCw className="animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiRefreshCw />
                Resend Code
              </span>
            )}
          </button>
        </div>

        {/* Verify Button */}
        <button
          onClick={() => handleVerifyOTP()}
          disabled={isVerifying || otp.some(digit => !digit)}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            isVerifying || otp.some(digit => !digit)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-pink-500 text-white hover:shadow-lg'
          }`}
        >
          {isVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FiCheck />
              Verify Email
            </span>
          )}
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full mt-4 py-3 text-gray-600 hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <FiArrowLeft />
          Back to Signup
        </button>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
