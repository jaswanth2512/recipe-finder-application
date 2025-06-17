import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMapPin, FiClock, FiUsers, FiHeart, FiTrendingUp, FiCoffee } from "react-icons/fi";

const Careers = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <FiCoffee className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options, and unlimited PTO policy"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Growth & Learning",
      description: "Professional development budget, conference attendance, and mentorship programs"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Amazing Team",
      description: "Work with passionate food lovers and world-class chefs in a collaborative environment"
    }
  ];

  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "We're looking for experienced engineers to help build the future of AI-powered cooking. You'll work with cutting-edge technologies including React, Node.js, and machine learning frameworks to create intuitive cooking experiences for millions of users worldwide."
    },
    {
      title: "Head of Culinary Content",
      department: "culinary",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead our culinary content strategy and work directly with Michelin-starred chefs to create amazing recipes. This role involves developing content standards, managing chef partnerships, and ensuring our recipe collection maintains the highest quality standards."
    },
    {
      title: "UX/UI Designer",
      department: "design",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Design beautiful, intuitive experiences that make cooking accessible to everyone. You'll work on both mobile and web platforms, creating user interfaces that simplify complex cooking processes and make our AI-powered features feel natural and engaging."
    },
    {
      title: "Recipe Development Chef",
      department: "culinary",
      location: "Austin, TX",
      type: "Full-time",
      description: "Create and test innovative recipes for our platform. Work closely with our AI team to optimize recipes for different dietary preferences, ensuring each recipe is not only delicious but also nutritionally balanced and accessible to home cooks of all skill levels."
    },
    {
      title: "Marketing Manager",
      department: "marketing",
      location: "Chicago, IL / Remote",
      type: "Full-time",
      description: "Drive growth through creative marketing campaigns focused on social media, content marketing, and influencer partnerships. You'll help tell the Smart Recipes story and connect with food enthusiasts around the world through compelling campaigns and authentic storytelling."
    },
    {
      title: "DevOps Engineer",
      department: "engineering",
      location: "Seattle, WA / Remote",
      type: "Full-time",
      description: "Build and maintain our cloud infrastructure to ensure our platform scales seamlessly to serve millions of home cooks worldwide. You'll work with modern cloud technologies and help optimize our systems for performance, reliability, and security."
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
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Culinary Revolution</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us make cooking accessible to everyone. Join a team of passionate food lovers, world-class chefs, and innovative technologists.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>

          <div className="space-y-6">
            {openPositions.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FiMapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize mt-2 lg:mt-0">
                    {job.department}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-3xl p-12 text-center text-white mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">Don't See the Perfect Role?</h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for talented people who share our passion for food and technology.
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
