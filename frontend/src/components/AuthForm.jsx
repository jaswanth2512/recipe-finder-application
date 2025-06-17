import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import { FiMail, FiLock, FiUser, FiChevronRight, FiEye, FiEyeOff } from "react-icons/fi";
import { GiCook } from "react-icons/gi";
import axios from "axios";
import OTPVerification from "./OTPVerification";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (type === "Signup") setActiveTab("signup");
    else setActiveTab("login");
  }, [type]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [signupStep, setSignupStep] = useState("form"); // "form" or "otp"
  const [pendingSignupData, setPendingSignupData] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState("email"); // email, otp, newPassword
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");



    try {
      if (activeTab === "login") {
        // Login API call

        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });



        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", "true");

        // Navigate to dashboard
        navigate("/dashboard");

      } else {
        // Signup with OTP verification
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        console.log('📝 Sending OTP for signup:', {
          firstName: formData.firstName,
          email: formData.email
        });
        console.log('🔗 Using endpoint: http://localhost:5000/api/auth/send-signup-otp');

        // Step 1: Send OTP for signup
        const response = await axios.post('http://localhost:5000/api/auth/send-signup-otp', {
          firstName: formData.firstName,
          email: formData.email
        });

        console.log('✅ OTP sent for signup:', response.data);

        // Show success message
        alert(`📧 OTP sent to ${formData.email}! Please check your email and enter the 6-digit code to complete signup.`);

        // Store signup data for OTP verification
        setPendingSignupData({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        setPendingEmail(formData.email);
        setSignupStep("otp");
        setShowOTPVerification(true);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || err.message || 'An error occurred';

      // Check if it's the direct signup disabled error
      if (err.response?.data?.useOTP) {
        // The frontend should already be using OTP flow, so this shouldn't happen
        setError("Please use the OTP verification process for signup.");
      } else {
        setError(errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification success
  const handleOTPVerified = async (otp) => {
    try {
      if (signupStep === "otp" && pendingSignupData) {
        // Complete signup with OTP verification
        console.log('✅ Completing signup with OTP verification');

        const response = await axios.post('http://localhost:5000/api/auth/verify-signup-otp', {
          email: pendingSignupData.email,
          otp: otp,
          firstName: pendingSignupData.firstName,
          lastName: pendingSignupData.lastName,
          password: pendingSignupData.password
        });

        // Show success message
        alert(`🎉 Welcome to Smart Recipes, ${response.data.user.firstName}! Your account has been created successfully.`);

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLoggedIn", "true");

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        // Regular OTP verification (forgot password, etc.)
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'OTP verification failed');
    }
  };

  // Handle back to signup from OTP
  const handleBackToSignup = () => {
    setShowOTPVerification(false);
    setPendingEmail("");
    setPendingSignupData(null);
    setSignupStep("form");
    setError("");
  };

  // Handle forgot password form changes
  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle forgot password submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (forgotPasswordStep === "email") {
        // Send OTP to email
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
          email: forgotPasswordData.email
        });

        console.log('✅ OTP sent for password reset:', response.data);
        setForgotPasswordStep("otp");

      } else if (forgotPasswordStep === "otp") {
        // Verify OTP
        const response = await axios.post('http://localhost:5000/api/auth/verify-reset-otp', {
          email: forgotPasswordData.email,
          otp: forgotPasswordData.otp
        });

        console.log('✅ OTP verified:', response.data);
        setForgotPasswordStep("newPassword");

      } else if (forgotPasswordStep === "newPassword") {
        // Reset password
        if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
          email: forgotPasswordData.email,
          otp: forgotPasswordData.otp,
          newPassword: forgotPasswordData.newPassword
        });

        console.log('✅ Password reset successful:', response.data);
        alert("Password reset successfully! You can now login with your new password.");

        // Reset to login form
        setShowForgotPassword(false);
        setForgotPasswordStep("email");
        setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
        setActiveTab("login");
      }
    } catch (err) {
      console.error('❌ Forgot password error:', err);
      const errorMessage = err.response?.data?.msg || err.message || 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back from forgot password
  const handleBackFromForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordStep("email");
    setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
    setError("");
  };

  // Show OTP verification screen
  if (showOTPVerification) {
    return (
      <OTPVerification
        email={pendingEmail}
        onVerified={handleOTPVerified}
        onBack={handleBackToSignup}
      />
    );
  }

  // Show forgot password screen
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <GiCook className="text-3xl mr-2 text-amber-700" />
              <h1 className="text-2xl font-serif font-bold">Epicurean<span className="font-light text-amber-600">Vault</span></h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {forgotPasswordStep === "email" && "Reset Password"}
              {forgotPasswordStep === "otp" && "Verify OTP"}
              {forgotPasswordStep === "newPassword" && "New Password"}
            </h2>
            <p className="text-gray-600 mt-2">
              {forgotPasswordStep === "email" && "Enter your email to receive a reset code"}
              {forgotPasswordStep === "otp" && "Enter the 6-digit code sent to your email"}
              {forgotPasswordStep === "newPassword" && "Create your new password"}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleForgotPasswordSubmit} className="space-y-5">
            {forgotPasswordStep === "email" && (
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={forgotPasswordData.email}
                  onChange={handleForgotPasswordChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {forgotPasswordStep === "otp" && (
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={forgotPasswordData.otp}
                  onChange={handleForgotPasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none text-center text-lg tracking-widest"
                  maxLength="6"
                  required
                />
              </div>
            )}

            {forgotPasswordStep === "newPassword" && (
              <>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={forgotPasswordData.newPassword}
                    onChange={handleForgotPasswordChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={forgotPasswordData.confirmPassword}
                    onChange={handleForgotPasswordChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
            >
              {isLoading ? 'Processing...' : (
                forgotPasswordStep === "email" ? "Send OTP" :
                forgotPasswordStep === "otp" ? "Verify OTP" :
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleBackFromForgotPassword}
              className="text-amber-700 hover:underline text-sm"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
        
        {/* Left Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-amber-800 to-amber-900 p-10 text-white relative hidden lg:block">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center mb-8">
              <GiCook className="text-3xl mr-3 text-amber-300" />
              <h1 className="text-3xl font-serif font-bold">Epicurean<span className="font-light text-amber-200">Vault</span></h1>
            </div>
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Unlock Culinary Mastery</h2>
              <p className="text-lg opacity-90 leading-relaxed mb-8">
                Join our exclusive community of food lovers and access recipes from world-class chefs.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center">
                  <span className="text-xl">👨‍🍳</span>
                </div>
                <div>
                  <p className="font-medium">Chef's Picks</p>
                  <p className="text-sm opacity-80">Premium recipes weekly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 p-10 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <GiCook className="text-2xl mr-2 text-amber-700" />
              <h1 className="text-xl font-serif font-bold">Epicurean<span className="font-light text-amber-600">Vault</span></h1>
            </div>
            <div className="text-sm text-amber-700">
              {activeTab === 'login' ? 'Need an account?' : 'Already a member?'}{' '}
              <button 
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="font-medium hover:underline"
              >
                {activeTab === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'login' ? 'text-amber-700 border-b-2 border-amber-700' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'signup' ? 'text-amber-700 border-b-2 border-amber-700' : 'text-gray-500'}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-600"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-amber-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {activeTab === "signup" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" required className="h-4 w-4 text-amber-600" />
                <span>
                  I agree to the <a href="#" className="text-amber-700 hover:underline">Terms</a> and <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP & Create Account'}
              </button>
            </form>
          )}

          {/* Social Auth */}
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">Or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <FaGoogle className="text-red-500 text-lg" />
              </button>
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <FaApple className="text-gray-800 text-lg" />
              </button>
              <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <FaFacebookF className="text-blue-600 text-lg" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} EpicureanVault. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
