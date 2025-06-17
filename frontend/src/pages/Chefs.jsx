import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiStar, FiAward, FiMapPin, FiInstagram, FiTwitter } from "react-icons/fi";

const Chefs = () => {
  const navigate = useNavigate();

  const chefs = [
    {
      name: "Chef Alessandro Romano",
      title: "Head Chef & Co-Founder",
      specialty: "Italian Cuisine",
      experience: "20+ years",
      michelin: 2,
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&auto=format",
      location: "Rome, Italy",
      bio: "Alessandro brings authentic Italian flavors from his family's restaurant in Rome. His passion for traditional techniques combined with modern innovation has earned him two Michelin stars.",
      signature: "Truffle Risotto with Aged Parmesan",
      awards: ["Michelin Star 2019", "Michelin Star 2021", "James Beard Nominee 2020"],
      social: { instagram: "@chef_alessandro", twitter: "@alessandroroma" }
    },
    {
      name: "Chef Sarah Johnson",
      title: "Culinary Director",
      specialty: "Modern American",
      experience: "15+ years",
      michelin: 1,
      image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop&auto=format",
      location: "New York, USA",
      bio: "Sarah revolutionizes American comfort food with her farm-to-table approach. Her innovative techniques and sustainable practices have made her a leader in modern American cuisine.",
      signature: "Deconstructed Apple Pie with Bourbon Ice Cream",
      awards: ["James Beard Award 2020", "Michelin Star 2022", "Food & Wine Best Chef 2021"],
      social: { instagram: "@chefsarahj", twitter: "@sarahjohnsonchef" }
    },
    {
      name: "Chef Hiroshi Tanaka",
      title: "Executive Sushi Chef",
      specialty: "Japanese Cuisine",
      experience: "25+ years",
      michelin: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      location: "Tokyo, Japan",
      bio: "Master Tanaka trained under legendary sushi masters in Tokyo. His dedication to perfection and respect for traditional Japanese techniques has earned him three Michelin stars.",
      signature: "Omakase Tasting Menu",
      awards: ["Michelin Star 2018", "Michelin Star 2020", "Michelin Star 2023", "World's 50 Best Restaurants"],
      social: { instagram: "@chef_hiroshi", twitter: "@tanakahiroshi" }
    },
    {
      name: "Chef Marie Dubois",
      title: "Pastry Chef",
      specialty: "French Pastry",
      experience: "12+ years",
      michelin: 1,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      location: "Paris, France",
      bio: "Marie's artistic approach to pastry combines classical French techniques with contemporary presentation. Her desserts are works of art that taste as beautiful as they look.",
      signature: "Chocolate Soufflé with Gold Leaf",
      awards: ["World Pastry Champion 2021", "Michelin Star 2022", "Best Pastry Chef France 2020"],
      social: { instagram: "@marie_pastry", twitter: "@mariedubois" }
    },
    {
      name: "Chef Carlos Rodriguez",
      title: "Latin Cuisine Specialist",
      specialty: "Latin American",
      experience: "18+ years",
      michelin: 1,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      location: "Mexico City, Mexico",
      bio: "Carlos celebrates the rich culinary heritage of Latin America with modern techniques. His vibrant dishes tell the story of his travels across South and Central America.",
      signature: "Mole Negro with Heritage Corn Tortillas",
      awards: ["Michelin Star 2021", "Latin America's Best Chef 2020", "James Beard Nominee 2022"],
      social: { instagram: "@chef_carlos", twitter: "@carlosrodriguez" }
    },
    {
      name: "Chef Priya Sharma",
      title: "Spice Master",
      specialty: "Indian Cuisine",
      experience: "16+ years",
      michelin: 1,
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      location: "Mumbai, India",
      bio: "Priya's mastery of spices and regional Indian cuisines brings authentic flavors to modern presentations. Her innovative approach honors tradition while embracing creativity.",
      signature: "Tandoori Lamb with Saffron Reduction",
      awards: ["Michelin Star 2020", "India's Best Chef 2019", "World Spice Champion 2021"],
      social: { instagram: "@chef_priya", twitter: "@priyasharma" }
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">World-Class Chefs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of Michelin-starred chefs and culinary masters from around the world bring you authentic, innovative recipes that celebrate global cuisine.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">25+</div>
            <div className="text-gray-600">Expert Chefs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">12</div>
            <div className="text-gray-600">Michelin Stars</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-gray-600">Years Combined Experience</div>
          </div>
        </motion.div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(chef.michelin)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{chef.name}</h3>
                <p className="text-amber-600 font-medium mb-2">{chef.title}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FiMapPin size={14} />
                    {chef.location}
                  </span>
                  <span>{chef.experience}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{chef.bio}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Signature Dish</h4>
                  <p className="text-sm text-amber-600 italic">{chef.signature}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Recent Awards</h4>
                  <div className="flex flex-wrap gap-1">
                    {chef.awards.slice(0, 2).map((award, i) => (
                      <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                      <FiInstagram size={18} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                      <FiTwitter size={18} />
                    </a>
                  </div>
                  <span className="text-xs text-gray-500">{chef.specialty}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-3xl p-12 text-center text-white mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">Want to Cook Like a Pro?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get access to exclusive recipes and cooking techniques from our world-class chefs.
          </p>
          <button 
            onClick={() => navigate("/payment")}
            className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Upgrade to Premium
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Chefs;
