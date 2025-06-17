import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield, FiSettings, FiBarChart, FiTarget, FiToggleLeft, FiToggleRight } from "react-icons/fi";

const Cookies = () => {
  const navigate = useNavigate();
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true
  });

  const cookieTypes = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Essential Cookies",
      description: "Required for the website to function properly. These cannot be disabled.",
      required: true,
      key: "essential"
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website by collecting anonymous information.",
      required: false,
      key: "analytics"
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Marketing Cookies",
      description: "Used to track visitors across websites to display relevant advertisements.",
      required: false,
      key: "marketing"
    },
    {
      icon: <FiSettings className="w-6 h-6" />,
      title: "Preference Cookies",
      description: "Remember your preferences and settings to provide a personalized experience.",
      required: false,
      key: "preferences"
    }
  ];

  const toggleCookie = (key) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setCookieSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to localStorage and update cookie consent
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    alert('Cookie preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">SR</span>
          </div>
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Smart Recipes
          </span>
        </div>
        <div className="w-24"></div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use cookies to enhance your experience on Smart Recipes. Learn about the types of cookies we use and manage your preferences.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
        </motion.div>

        {/* Cookie Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Cookie Preferences</h2>
          
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <div key={index} className="flex items-start justify-between p-6 border border-gray-100 rounded-xl">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 flex-shrink-0">
                    {cookie.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cookie.title}</h3>
                    <p className="text-gray-600 text-sm">{cookie.description}</p>
                    {cookie.required && (
                      <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleCookie(cookie.key)}
                  disabled={cookie.required}
                  className={`ml-4 ${cookie.required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  {cookieSettings[cookie.key] ? (
                    <FiToggleRight className="w-8 h-8 text-green-500" />
                  ) : (
                    <FiToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={saveSettings}
              className="flex-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-pink-600 transition-all font-medium"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setCookieSettings({ essential: true, analytics: false, marketing: false, preferences: false })}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Accept Essential Only
            </button>
          </div>
        </motion.div>

        {/* Detailed Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What Are Cookies?</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Definition</h3>
              <p className="text-gray-600 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How We Use Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Smart Recipes uses cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Authentication:</strong> To keep you logged in and secure your account</li>
                <li><strong>Preferences:</strong> To remember your dietary preferences and settings</li>
                <li><strong>Analytics:</strong> To understand how you use our platform and improve our service</li>
                <li><strong>Performance:</strong> To optimize loading times and functionality</li>
                <li><strong>Marketing:</strong> To show you relevant content and advertisements (with your consent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Types of Cookies We Use</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Session Cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Temporary cookies that are deleted when you close your browser. Used for essential functionality like keeping you logged in.
                  </p>
                </div>
                
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Persistent Cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Remain on your device for a set period or until you delete them. Used to remember your preferences across visits.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">First-Party Cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Set directly by Smart Recipes to provide core functionality and improve your experience.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Third-Party Cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Set by external services we use, such as analytics providers and advertising networks.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Services</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We work with trusted third-party services that may set cookies on our behalf:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Intercom:</strong> For customer support and communication</li>
                <li><strong>Facebook Pixel:</strong> For advertising and marketing (with consent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Managing Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can control cookies in several ways:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Use our cookie preference center above to manage Smart Recipes cookies</li>
                <li>Configure your browser settings to block or delete cookies</li>
                <li>Use browser extensions that block tracking cookies</li>
                <li>Opt out of interest-based advertising through industry opt-out pages</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Updates to This Policy</h3>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at privacy@smartrecipes.com.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our privacy team is here to help you understand how we use cookies and protect your data.
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Contact Privacy Team
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
