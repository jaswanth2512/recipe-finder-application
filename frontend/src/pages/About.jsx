import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiStar, FiUsers, FiAward, FiHeart } from "react-icons/fi";

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Chef Alessandro Romano",
      role: "Head Chef & Co-Founder",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop&auto=format",
      description: "Michelin-starred chef with 20+ years of experience in Italian cuisine."
    },
    {
      name: "Sarah Johnson",
      role: "Culinary Director",
      image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&h=300&fit=crop&auto=format",
      description: "James Beard Award winner specializing in modern American cuisine."
    },
    {
      name: "David Chen",
      role: "Technology Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
      description: "Former Google engineer passionate about food technology and AI."
    }
  ];

  const stats = [
    { icon: <FiUsers className="w-8 h-8" />, number: "50K+", label: "Active Users" },
    { icon: <FiStar className="w-8 h-8" />, number: "10K+", label: "Premium Recipes" },
    { icon: <FiAward className="w-8 h-8" />, number: "25+", label: "Award-Winning Chefs" },
    { icon: <FiHeart className="w-8 h-8" />, number: "1M+", label: "Meals Cooked" }
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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Smart Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize home cooking by making gourmet recipes accessible to everyone through cutting-edge technology and world-class culinary expertise.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Smart Recipes was born from a simple idea: everyone deserves access to exceptional cooking, regardless of their skill level or experience. Our founders, a team of world-renowned chefs and technology experts, came together to bridge the gap between professional culinary knowledge and home cooking.
              </p>
              <p className="text-gray-600 mb-4">
                Using advanced AI and machine learning, we've created a platform that not only provides you with incredible recipes but also learns your preferences, dietary restrictions, and cooking style to deliver personalized culinary experiences.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve over 50,000 home cooks worldwide, helping them create restaurant-quality meals in their own kitchens.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Professional kitchen"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            To democratize gourmet cooking by combining the artistry of world-class chefs with the power of modern technology, making exceptional culinary experiences accessible to every home cook.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
