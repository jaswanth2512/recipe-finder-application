import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield, FiLock, FiEye, FiUserCheck } from "react-icons/fi";

const Privacy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, payment information, and recipe preferences."
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "We use your information to provide and improve our services, process payments, send you updates about your account, and personalize your recipe recommendations based on your preferences and dietary restrictions."
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted service providers who assist us in operating our platform."
    },
    {
      icon: <FiUserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and request a copy of your data. Contact us to exercise these rights."
    }
  ];

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
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: December 2024</p>
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </motion.div>

        {/* Detailed Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Detailed Privacy Policy</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Information Collection</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect several types of information from and about users of our service:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Personal information such as name, email address, and phone number</li>
                <li>Payment information when you subscribe to premium services</li>
                <li>Usage data including recipes viewed, searches performed, and features used</li>
                <li>Device information such as IP address, browser type, and operating system</li>
                <li>Photos you upload for our photo search feature (premium users only)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Use of Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Personalize recipe recommendations and meal plans</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Data Security</h3>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, regular security assessments, and restricted access to personal information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">4. Cookies and Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings, though this may affect the functionality of our service.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">5. Third-Party Services</h3>
              <p className="text-gray-600 leading-relaxed">
                Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">6. Data Retention</h3>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">7. Children's Privacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">8. Changes to This Policy</h3>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our service after any changes constitutes acceptance of the new policy.
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
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-xl mb-8 opacity-90">
            If you have any questions about this privacy policy or our data practices, we're here to help.
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
