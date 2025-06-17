import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSearch, FiChevronDown, FiChevronUp, FiHelpCircle, FiBook, FiSettings, FiCreditCard } from "react-icons/fi";

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { icon: <FiBook className="w-6 h-6" />, title: "Getting Started", count: 8 },
    { icon: <FiSettings className="w-6 h-6" />, title: "Account Settings", count: 12 },
    { icon: <FiCreditCard className="w-6 h-6" />, title: "Billing & Premium", count: 6 },
    { icon: <FiHelpCircle className="w-6 h-6" />, title: "Troubleshooting", count: 10 }
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create my first recipe?",
      answer: "To create your first recipe, navigate to the 'Recipes' section and click the 'Add Recipe' button. Fill in the recipe details including ingredients, instructions, and cooking time. You can also upload photos to make your recipe more appealing."
    },
    {
      category: "Getting Started",
      question: "What is the Photo Search feature?",
      answer: "Photo Search is a premium feature that allows you to upload photos of ingredients or dishes, and our AI will suggest matching recipes. Simply take a photo of what you have in your fridge, and we'll recommend recipes you can make!"
    },
    {
      category: "Account Settings",
      question: "How do I change my password?",
      answer: "Go to your profile settings by clicking on your avatar in the top right corner, then select 'Account Settings'. Click on 'Change Password' and follow the prompts to update your password securely."
    },
    {
      category: "Account Settings",
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account by going to Account Settings > Privacy & Security > Delete Account. Please note that this action is irreversible and will permanently remove all your data."
    },
    {
      category: "Billing & Premium",
      question: "What's included in the Premium subscription?",
      answer: "Premium includes: unlimited access to Photo Search, AI-powered Meal Planning, exclusive premium recipe collections, ad-free experience, and priority customer support. You can choose between monthly ($9.99) or yearly ($99.99) plans."
    },
    {
      category: "Billing & Premium",
      question: "How do I cancel my Premium subscription?",
      answer: "You can cancel your Premium subscription anytime by going to Account Settings > Billing > Manage Subscription. Your premium features will remain active until the end of your current billing period."
    },
    {
      category: "Troubleshooting",
      question: "The app is running slowly. What should I do?",
      answer: "Try clearing your browser cache and cookies, ensure you have a stable internet connection, and close other browser tabs. If the issue persists, try using a different browser or contact our support team."
    },
    {
      category: "Troubleshooting",
      question: "I can't upload photos. What's wrong?",
      answer: "Make sure your photos are in supported formats (JPG, PNG, WebP) and under 10MB in size. Check that your browser has permission to access your camera/files. If you're on mobile, ensure the app has photo permissions enabled."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Center</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions and get the help you need to make the most of Smart Recipes.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4">
                {category.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-500 text-sm">{category.count} articles</p>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1">{faq.question}</h3>
                  </div>
                  {openFAQ === index ? (
                    <FiChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-400 mt-2">Try searching with different keywords or browse our categories above.</p>
            </div>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-8 opacity-90">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/contact")}
              className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-all">
              Live Chat
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
