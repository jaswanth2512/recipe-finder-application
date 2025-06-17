import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiTag, FiSearch } from "react-icons/fi";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "recipes", label: "Recipes" },
    { value: "cooking-tips", label: "Cooking Tips" },
    { value: "nutrition", label: "Nutrition" },
    { value: "technology", label: "Technology" },
    { value: "chef-stories", label: "Chef Stories" }
  ];

  const blogPosts = [
    {
      title: "10 Essential Knife Skills Every Home Cook Should Master",
      content: "Mastering proper knife skills is the foundation of great cooking. From the basic rock chop to advanced julienne cuts, these techniques will transform your cooking experience. Start with holding your knife correctly - grip the handle firmly while pinching the blade between your thumb and forefinger. Practice the rock chop motion, keeping the tip of the knife on the cutting board while rocking the blade up and down. Learn to dice onions efficiently by making horizontal and vertical cuts before chopping. Master the chiffonade technique for herbs by rolling leaves tightly and slicing thinly. These skills will make your meal prep faster, safer, and more enjoyable.",
      author: "Chef Alessandro Romano",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "cooking-tips",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      featured: true
    },
    {
      title: "The Science Behind Perfect Pasta: AI Meets Italian Tradition",
      content: "Achieving perfect al dente pasta is both an art and a science. Our AI technology analyzes thousands of pasta recipes, cooking times, and water-to-pasta ratios to help home cooks achieve restaurant-quality results. The key factors include using plenty of salted water (1 tablespoon salt per quart), maintaining a rolling boil, and testing pasta 1-2 minutes before the package directions suggest. The pasta should have a slight bite when done - firm to the tooth, as Italians say. Our AI considers pasta shape, thickness, and brand to provide personalized cooking recommendations.",
      author: "Dr. Maria Rossi",
      date: "December 8, 2024",
      readTime: "6 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Seasonal Winter Vegetables: A Complete Guide",
      content: "Winter brings an abundance of hearty, nutritious vegetables that can transform your cold-weather cooking. Root vegetables like carrots, parsnips, and turnips develop sweeter flavors after frost. Brussels sprouts, cabbage, and kale are at their peak, offering maximum nutrition and flavor. Winter squash varieties like butternut, acorn, and delicata provide natural sweetness and versatility. Try roasting vegetables with olive oil and herbs, adding them to hearty soups, or incorporating them into warming stews. These vegetables are packed with vitamins A and C, fiber, and antioxidants to support your health through winter months.",
      author: "Chef Sarah Johnson",
      date: "December 5, 2024",
      readTime: "10 min read",
      category: "nutrition",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "From Street Food to Michelin Stars: My Culinary Journey",
      content: "My culinary journey began on the streets of Mexico City, where I learned the fundamentals of flavor from my grandmother's taco stand. Those early days taught me that great food doesn't require expensive ingredients - it requires passion, technique, and respect for tradition. After years of working in kitchens across Mexico and the United States, I opened my first restaurant with a simple mission: to elevate traditional Mexican cuisine while honoring its roots. The Michelin star was recognition not just of my work, but of the rich culinary heritage I represent. Every dish tells a story of tradition, innovation, and the journey from street corner to fine dining.",
      author: "Chef Carlos Rodriguez",
      date: "December 3, 2024",
      readTime: "12 min read",
      category: "chef-stories",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "5 Quick and Healthy Breakfast Recipes for Busy Mornings",
      content: "Busy mornings don't have to mean skipping breakfast or settling for unhealthy options. Here are five nutritious recipes that take 15 minutes or less: 1) Overnight oats with berries and nuts - prepare the night before for grab-and-go convenience. 2) Avocado toast with a poached egg - healthy fats and protein to fuel your day. 3) Greek yogurt parfait with granola and fruit - probiotics and fiber for digestive health. 4) Smoothie bowl with spinach, banana, and protein powder - packed with vitamins and minerals. 5) Veggie scramble with whole grain toast - customize with your favorite vegetables for variety and nutrition.",
      author: "Nutritionist Emma Davis",
      date: "November 30, 2024",
      readTime: "5 min read",
      category: "recipes",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Understanding Macronutrients: A Beginner's Guide",
      excerpt: "Learn about proteins, carbohydrates, and fats, and how to balance them for optimal health and energy.",
      author: "Dr. James Wilson",
      date: "November 28, 2024",
      readTime: "7 min read",
      category: "nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "How AI is Revolutionizing Recipe Development",
      excerpt: "Explore how artificial intelligence is helping chefs create new recipes and optimize existing ones for better nutrition and taste.",
      author: "Tech Team",
      date: "November 25, 2024",
      readTime: "9 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Mastering the Art of Spice Blending",
      excerpt: "Learn from Chef Priya Sharma how to create your own spice blends and elevate your cooking with authentic flavors.",
      author: "Chef Priya Sharma",
      date: "November 22, 2024",
      readTime: "11 min read",
      category: "cooking-tips",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
            Smart Recipes Blog
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
            Culinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover cooking tips, recipes, nutrition advice, and stories from our world-class chefs and food experts.
          </p>
        </motion.div>



        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize">
                    {featuredPost.category.replace('-', ' ')}
                  </span>
                  <span className="text-amber-600 font-bold">FEATURED</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <FiUser size={14} />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={14} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{featuredPost.content}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>

          <div className="space-y-12">
            {regularPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize">
                        {post.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FiUser size={14} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{post.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-3xl p-12 text-center text-white mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest recipes, cooking tips, and culinary insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
