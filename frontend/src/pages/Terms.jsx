import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield, FiUsers, FiCreditCard, FiAlertCircle } from "react-icons/fi";

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "User Accounts",
      content: "You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account."
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      title: "Premium Services",
      content: "Premium subscriptions provide access to additional features. Billing is recurring and you may cancel at any time. Refunds are provided according to our refund policy."
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Content Usage",
      content: "All recipes and content are for personal use only. Commercial use requires written permission. You may not redistribute or resell our content without authorization."
    },
    {
      icon: <FiAlertCircle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: "You may not use our service for illegal activities, spam, harassment, or any activity that could harm our platform or other users."
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
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Service</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before using Smart Recipes. By using our service, you agree to be bound by these terms.
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

        {/* Detailed Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Terms of Service</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using Smart Recipes ("Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Description of Service</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Smart Recipes is an AI-powered cooking platform that provides recipes, meal planning, and culinary content. 
                We offer both free and premium subscription services with varying levels of access to features and content.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3. User Registration</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To access certain features of the Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">4. Premium Subscriptions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Premium subscriptions provide access to additional features including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
                <li>AI-powered meal planning</li>
                <li>Photo-based recipe search</li>
                <li>Exclusive chef recipes</li>
                <li>Ad-free experience</li>
                <li>Priority customer support</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Subscriptions are billed on a recurring basis. You may cancel your subscription at any time through your account settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">5. Content and Intellectual Property</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content on Smart Recipes, including recipes, images, text, and software, is owned by Smart Recipes or our content providers and is protected by copyright and other intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You may use our content for personal, non-commercial purposes only. Any commercial use requires written permission from Smart Recipes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">6. User Conduct</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>Transmit spam, viruses, or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for commercial purposes without permission</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">7. Privacy</h3>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices regarding the collection and use of your personal information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">8. Disclaimers</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, 
                error-free, or free of viruses or other harmful components.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Recipes and nutritional information are provided for informational purposes only. Always consult with healthcare professionals 
                regarding dietary restrictions and health concerns.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">9. Limitation of Liability</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart Recipes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">10. Termination</h3>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, 
                for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">11. Changes to Terms</h3>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email 
                or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">12. Contact Information</h3>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at legal@smartrecipes.com.
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
          <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our legal team is here to help clarify any questions you may have about our terms of service.
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Contact Legal Team
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
