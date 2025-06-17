import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiExternalLink, FiDownload, FiMail, FiPhone } from "react-icons/fi";

const Press = () => {
  const navigate = useNavigate();

  const pressReleases = [
    {
      date: "December 15, 2024",
      title: "Smart Recipes Raises $50M Series B to Revolutionize AI-Powered Cooking",
      content: "Smart Recipes announced today that it has raised $50 million in Series B funding led by Andreessen Horowitz, with participation from existing investors including Sequoia Capital and First Round Capital. The funding will be used to accelerate the development of AI-powered personalized meal planning features and expand partnerships with Michelin-starred chefs worldwide. The company has seen tremendous growth, with over 1 million premium subscribers and partnerships with 25+ world-renowned chefs."
    },
    {
      date: "November 8, 2024",
      title: "Smart Recipes Partners with Michelin Guide for Exclusive Recipe Collection",
      content: "In a groundbreaking partnership, Smart Recipes has teamed up with the Michelin Guide to bring exclusive recipes from Michelin-starred restaurants directly to home cooks. This collaboration features over 200 premium recipes from renowned chefs across Europe, Asia, and North America. Users can now access step-by-step instructions, professional techniques, and insider tips from the world's most celebrated culinary artists, making fine dining accessible in home kitchens."
    },
    {
      date: "October 22, 2024",
      title: "Smart Recipes Launches Photo-Based Recipe Search Using Advanced AI",
      content: "Smart Recipes has unveiled its revolutionary photo-based recipe search feature, powered by advanced computer vision and machine learning algorithms. Users can now simply take a photo of ingredients in their refrigerator or a dish they want to recreate, and the AI will instantly suggest relevant recipes. This breakthrough technology analyzes visual elements, identifies ingredients, and matches them with the platform's extensive recipe database, making cooking more intuitive and accessible than ever before."
    },
    {
      date: "September 5, 2024",
      title: "Smart Recipes Reaches 1 Million Premium Subscribers Milestone",
      content: "Smart Recipes celebrated a major milestone today, reaching 1 million premium subscribers worldwide. This achievement comes just two years after the platform's launch and represents a 300% growth in premium subscriptions over the past year. The company attributes this success to its AI-powered meal planning, exclusive chef partnerships, and innovative features like photo-based recipe search. To celebrate, Smart Recipes is launching new features including dietary restriction optimization and family meal planning tools."
    }
  ];

  const companyFacts = [
    {
      title: "Founded",
      value: "2022",
      description: "Started in San Francisco with a mission to democratize gourmet cooking"
    },
    {
      title: "Users",
      value: "5M+",
      description: "Active users worldwide discovering new recipes daily"
    },
    {
      title: "Recipes",
      value: "50K+",
      description: "Curated recipes from professional chefs and home cooks"
    },
    {
      title: "Countries",
      value: "25+",
      description: "Global reach with localized content and cuisine preferences"
    }
  ];

  const mediaFeatures = [
    {
      outlet: "TechCrunch",
      title: "Smart Recipes is Making AI-Powered Cooking Accessible to Everyone",
      date: "December 2024",
      type: "Feature Article",
      content: "TechCrunch explores how Smart Recipes is revolutionizing home cooking through artificial intelligence, making gourmet recipes accessible to everyday home cooks."
    },
    {
      outlet: "Food & Wine",
      title: "The Future of Home Cooking: How AI is Transforming Kitchens",
      date: "November 2024",
      type: "Cover Story",
      content: "Food & Wine magazine featured Smart Recipes on their cover, highlighting how AI technology is transforming the way people cook and plan meals at home."
    },
    {
      outlet: "The Wall Street Journal",
      title: "Startup Smart Recipes Cooks Up Success with Michelin Chef Partnerships",
      date: "October 2024",
      type: "Business Feature",
      content: "The Wall Street Journal examines Smart Recipes' business model and strategic partnerships with Michelin-starred chefs that have driven the company's rapid growth."
    },
    {
      outlet: "Bon Appétit",
      title: "How Smart Recipes is Democratizing Gourmet Cooking",
      date: "September 2024",
      type: "Technology Review",
      content: "Bon Appétit reviews Smart Recipes' technology platform and its impact on making professional cooking techniques available to home cooks worldwide."
    }
  ];

  const awards = [
    {
      year: "2024",
      award: "Best Food Tech Startup",
      organization: "TechCrunch Disrupt"
    },
    {
      year: "2024",
      award: "Innovation Award",
      organization: "Food & Wine Classic"
    },
    {
      year: "2023",
      award: "Rising Star Award",
      organization: "James Beard Foundation"
    },
    {
      year: "2023",
      award: "Best Mobile App",
      organization: "Webby Awards"
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
            Press & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Media</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and media coverage about Smart Recipes and our mission to revolutionize home cooking.
          </p>
        </motion.div>

        {/* Press Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-2xl p-8 mb-16 border border-amber-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Media Inquiries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Press Contact</h3>
              <p className="text-gray-600 mb-2">Sarah Mitchell</p>
              <p className="text-gray-600 mb-2">Director of Communications</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <a href="mailto:press@smartrecipes.com" className="flex items-center gap-1 text-amber-600 hover:text-amber-700">
                  <FiMail size={14} />
                  press@smartrecipes.com
                </a>
                <a href="tel:+1-555-123-4567" className="flex items-center gap-1 text-amber-600 hover:text-amber-700">
                  <FiPhone size={14} />
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Business Inquiries</h3>
              <p className="text-gray-600 mb-2">Michael Chen</p>
              <p className="text-gray-600 mb-2">VP of Business Development</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <a href="mailto:business@smartrecipes.com" className="flex items-center gap-1 text-amber-600 hover:text-amber-700">
                  <FiMail size={14} />
                  business@smartrecipes.com
                </a>
                <a href="tel:+1-555-123-4568" className="flex items-center gap-1 text-amber-600 hover:text-amber-700">
                  <FiPhone size={14} />
                  +1 (555) 123-4568
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Press Releases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <FiCalendar size={14} />
                  {release.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{release.title}</h3>
                <p className="text-gray-600 leading-relaxed">{release.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Media Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900">{feature.outlet}</h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{feature.type}</span>
                </div>
                <h4 className="text-gray-800 mb-3 font-medium">{feature.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{feature.content}</p>
                <span className="text-sm text-gray-500">{feature.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-amber-600 mb-2">{award.year}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{award.award}</h3>
                <p className="text-sm text-gray-600">{award.organization}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Company Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Company Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyFacts.map((fact, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <h3 className="text-3xl font-bold text-amber-600 mb-2">{fact.value}</h3>
                <h4 className="font-semibold text-gray-900 mb-2">{fact.title}</h4>
                <p className="text-gray-600 text-sm">{fact.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Press;
