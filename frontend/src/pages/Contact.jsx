import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiSend, FiClock } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Thank you for your message! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Us",
      details: "hello@smartrecipes.com",
      description: "Send us an email anytime!"
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Culinary Street, Food City, FC 12345",
      description: "Our headquarters"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Support Hours",
      details: "24/7 Premium Support",
      description: "We're here when you need us"
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

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or need help? We'd love to hear from you. Our team is here to assist you with anything you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 hover:shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FiSend size={18} />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-700 font-medium">{info.details}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all">
                  <FaFacebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all">
                  <FaInstagram size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all">
                  <FaTwitter size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Quick Answers?</h3>
              <p className="text-gray-600 mb-4">
                Check out our frequently asked questions for instant help with common issues.
              </p>
              <button 
                onClick={() => navigate("/help")}
                className="text-amber-600 font-medium hover:text-amber-700 transition-colors"
              >
                Visit Help Center →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
