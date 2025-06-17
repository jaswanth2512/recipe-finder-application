import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLogOut, FiUser, FiMenu, FiX, FiLock, FiCheck,
  FiLogIn, FiStar, FiClock, FiUsers, FiCamera, FiMail, FiPhone,
  FiBookmark, FiSettings, FiChevronDown, FiEye
} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { authAPI } from "../services/api";
import { createFixedAuthHandler } from "../utils/authFix";
import RecipeModal from "../components/RecipeModal";
import AuthModal from "../components/AuthModal";
import recipeAPI from "../services/recipeAPI";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState("email");
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  // OTP Signup state
  const [signupStep, setSignupStep] = useState("form"); // "form", "otp"
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isPremium, setIsPremium] = useState(
    localStorage.getItem("isPremium") === "true"
  );

  // Temporary: Enable premium for testing (remove in production)
  // useEffect(() => {
  //   if (isLoggedIn && !isPremium) {
  //     // Auto-enable premium for testing
  //     localStorage.setItem("isPremium", "true");
  //     setIsPremium(true);
  //   }
  // }, [isLoggedIn, isPremium]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "" });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  // Auth form state for modal inputs
  const [authFormData, setAuthFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Chef",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "The premium recipes have transformed my dinner parties. The truffle risotto is now my signature dish!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "As a food blogger, I need unique content. Smart Recipes gives me access to exclusive dishes.",
      rating: 4
    },
    {
      name: "Emma Rodriguez",
      role: "Culinary Student",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "The photo-based search feature is amazing! I can find recipes just by taking pictures of ingredients.",
      rating: 5
    }
  ];

  const premiumFeatures = [
    {
      icon: <FiStar className="w-6 h-6 text-amber-500" />,
      title: "Premium Collections",
      description: "Access chef-curated recipe collections unavailable elsewhere"
    },
    {
      icon: <FiClock className="w-6 h-6 text-amber-500" />,
      title: "Meal Planning",
      description: "AI-powered meal plans tailored to your preferences"
    },
    {
      icon: <FiCamera className="w-6 h-6 text-amber-500" />,
      title: "Photo-based Search",
      description: "Find recipes by uploading photos of ingredients or dishes"
    }
  ];

  // Navigation handlers
  const handleNavigation = (path) => {
    // Require login for all navigation except dashboard
    if (!isLoggedIn && path !== "/") {
      openAuthModal("login");
      return;
    }

    if (["/meal-planner", "/photo-search"].includes(path) && !isPremium) {
      handlePremiumNavigation(path);
      return;
    }
    navigate(path);
    setIsMenuOpen(false);
  };

  const handlePremiumNavigation = (path) => {
    if (!isLoggedIn) {
      openAuthModal("login");
      return;
    }

    if (!isPremium) {
      openPremiumModal();
      return;
    }

    navigate(path);
    setIsMenuOpen(false);
  };

  // Modal handlers
  const openAuthModal = (type) => {
    setAuthType(type);
    setSignupStep("form"); // Reset signup step
    // Clear form data when opening modal
    setAuthFormData({ name: "", email: "", password: "" });
    setShowAuthModal(true);
  };

  const closeAuthModal = () => setShowAuthModal(false);

  // Fixed auth handler that works properly
  const handleAuthSuccessFixed = async () => {
    try {
      // Get form values from DOM elements
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const nameInput = document.getElementById('name');

      const email = emailInput?.value?.trim() || '';
      const password = passwordInput?.value?.trim() || '';
      const name = nameInput?.value?.trim() || '';

      console.log('Form values - Email:', email, 'Password:', password, 'Name:', name);

      // Validation
      if (!email || !password) {
        alert("Please fill in all required fields");
        return;
      }

      if (authType === "signup" && !name) {
        alert("Please enter your full name");
        return;
      }

      let response;

      if (authType === "login") {
        response = await authAPI.login(email, password);
        alert(`Welcome back, ${response.user.firstName}!`);
      } else {
        // Handle direct signup using authAPI
        const fullName = name.trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || fullName;
        const lastName = nameParts.slice(1).join(' ') || 'User';

        response = await authAPI.signup(firstName, lastName, email, password);
        alert(`🎉 Welcome to Smart Recipes, ${response.user.firstName}! Your account has been created successfully.`);
      }

      // Store auth data
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isPremium", response.user.isPremium.toString());

      setIsLoggedIn(true);
      setIsPremium(response.user.isPremium);
      setUserInfo({
        firstName: response.user.firstName || "",
        lastName: response.user.lastName || "",
        email: response.user.email || ""
      });
      closeAuthModal();
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message || "Authentication failed");
    }
  };

  const openPremiumModal = () => setShowPremiumModal(true);

  const closePremiumModal = () => setShowPremiumModal(false);

  // Recipe details handler
  const showRecipeDetails = (recipe) => {
    const recipeInfo = `🍳 ${recipe.title}
👨‍🍳 Chef: ${recipe.chef}
⏱️ Cook Time: ${recipe.cookTime}
👥 Servings: ${recipe.servings}
⭐ Rating: ${recipe.rating}/5

📝 This recipe includes:
• Premium ingredients and techniques
• Step-by-step cooking instructions
• Nutritional information
• Chef's special tips

Click OK to see the full recipe details!`;

    alert(recipeInfo);
  };

  // Check email and determine if user should login or signup
  const handleEmailCheck = async (email) => {
    try {
      const response = await authAPI.checkEmail(email);
      if (response.exists) {
        setAuthType("login");
      } else {
        setAuthType("signup");
      }
    } catch (error) {
      console.error("Email check failed:", error);
      // Default to signup if check fails
      setAuthType("signup");
    }
  };

  // Auth handlers
  const handleAuthSuccess = async (formData) => {
    // Handle both old format (using authFormData) and new format (passed as parameter)
    const data = formData || authFormData;

    console.log('Auth form data:', data);
    console.log('Auth type:', authType);

    // Get form values from DOM elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');

    const email = emailInput?.value?.trim() || '';
    const password = passwordInput?.value?.trim() || '';
    const name = nameInput?.value?.trim() || '';

    console.log('Form values - Email:', email, 'Password:', password, 'Name:', name);

    // Validation
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    if (authType === "signup" && !name) {
      alert("Please enter your full name");
      return;
    }

    try {
      let response;

      // Get form values from DOM elements
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const nameInput = document.getElementById('name');

      const email = emailInput?.value?.trim() || '';
      const password = passwordInput?.value?.trim() || '';
      const name = nameInput?.value?.trim() || '';

      if (authType === "login") {
        response = await authAPI.login(email, password);
      } else {
        // Handle direct signup
        const fullName = name.trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || fullName;
        const lastName = nameParts.slice(1).join(' ') || 'User';

        // Use authAPI for signup
        response = await authAPI.signup(firstName, lastName, email, password);
        alert(`🎉 Welcome to Smart Recipes, ${response.user.firstName}! Your account has been created successfully.`);
      }

      // Store auth data
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("isPremium", response.user.isPremium.toString());

      setIsLoggedIn(true);
      setIsPremium(response.user.isPremium);
      setUserInfo({
        firstName: response.user.firstName || "",
        lastName: response.user.lastName || "",
        email: response.user.email || ""
      });
      closeAuthModal();
    } catch (error) {
      alert(error.message || "Authentication failed");
    }
  };

  const handleSubscribe = () => {
    navigate("/payment");
    closePremiumModal();
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      if (forgotPasswordStep === "email") {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotPasswordData.email })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);
        setForgotPasswordStep("otp");
      } else if (forgotPasswordStep === "otp") {
        const response = await fetch('http://localhost:5000/api/auth/verify-reset-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: forgotPasswordData.email,
            otp: forgotPasswordData.otp
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);
        setForgotPasswordStep("newPassword");
      } else if (forgotPasswordStep === "newPassword") {
        if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        const response = await fetch('http://localhost:5000/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: forgotPasswordData.email,
            otp: forgotPasswordData.otp,
            newPassword: forgotPasswordData.newPassword
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);
        alert("Password reset successfully! You can now login with your new password.");
        setShowForgotPassword(false);
        setForgotPasswordStep("email");
        setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
        setAuthType("login");
      }
    } catch (error) {
      alert(error.message || "An error occurred");
    }
  };

  const handleBackFromForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordStep("email");
    setForgotPasswordData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPremium(false);
    setUserInfo({ firstName: "", lastName: "", email: "" });
    setIsProfileDropdownOpen(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isPremium");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // UI helpers
  const getActiveClass = (path) =>
    location.pathname === path
      ? "text-amber-700 font-semibold"
      : "text-gray-600 hover:text-amber-600";

  // Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserInfo({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || ""
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [isLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);
  // Fetch featured recipes from MongoDB
  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        setIsLoadingRecipes(true);
        console.log('Fetching recipes from MongoDB...');

        const response = await fetch('http://localhost:5000/api/recipes?limit=4');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipes = await response.json();
        console.log('Fetched recipes:', recipes);

        // Transform the data to match the expected format
        const transformedRecipes = recipes.map(recipe => ({
          _id: recipe._id,
          title: recipe.name,
          image: recipe.image || `https://images.unsplash.com/600x400/?${recipe.name.replace(/\s+/g, '+')},food`,
          cookTime: `${recipe.cookingTime} min`,
          servings: recipe.servings,
          chef: recipe.chef,
          rating: recipe.rating,
          premium: false, // Remove premium designation from all recipes
          // Include full recipe data for the modal
          name: recipe.name,
          description: recipe.description,
          cookingTime: recipe.cookingTime,
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || [],
          nutrition: recipe.nutrition || {}
        }));

        console.log('Transformed recipes:', transformedRecipes);
        setFeaturedRecipes(transformedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Fallback to empty array if fetch fails
        setFeaturedRecipes([]);
      } finally {
        setIsLoadingRecipes(false);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  // Background animation effect
  useEffect(() => {
    const interBubble = document.querySelector(".interactive");
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-amber-50/40 to-white/90 -z-10" />
      <div className="interactive absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-amber-300/20 to-pink-500/10 blur-[100px] opacity-40 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">SR</span>
          </div>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Smart Recipes
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation("/search-recipes")}
            className={`${getActiveClass("/search-recipes")} text-sm font-medium transition-colors`}
          >
            Recipes
          </button>
          <button
            onClick={() => handleNavigation("/ingredients")}
            className={`${getActiveClass("/ingredients")} text-sm font-medium transition-colors`}
          >
            Ingredients
          </button>
          {isPremium && (
            <>
              <button
                onClick={() => handleNavigation("/meal-planner")}
                className={`${getActiveClass("/meal-planner")} text-sm font-medium transition-colors`}
              >
                Meal Planner
              </button>
              <button
                onClick={() => handleNavigation("/photo-search")}
                className={`${getActiveClass("/photo-search")} text-sm font-medium transition-colors`}
              >
                Photo Search
              </button>
            </>
          )}
          {!isPremium && isLoggedIn && (
            <div className="text-sm text-gray-500 italic">
              Upgrade to Premium to access Photo Search & Meal Planner
            </div>
          )}

          {/* Auth buttons */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {isPremium && (
                <span className="text-xs font-bold bg-gradient-to-r from-amber-500 to-pink-500 text-white px-2 py-1 rounded-full">
                  PREMIUM
                </span>
              )}

              {/* Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-amber-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <FiUser size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">
                    {userInfo.firstName || "User"}
                  </span>
                  <FiChevronDown size={14} className="text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            {userInfo.firstName ? userInfo.firstName.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {userInfo.firstName && userInfo.lastName
                                ? `${userInfo.firstName} ${userInfo.lastName}`
                                : userInfo.firstName || "User"}
                            </p>
                            {isPremium && (
                              <span className="inline-block text-xs font-bold bg-gradient-to-r from-amber-500 to-pink-500 text-white px-2 py-0.5 rounded-full mt-1">
                                PREMIUM
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            // Navigate to saved recipes (placeholder)
                            navigate("/saved-recipes");
                          }}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-3"
                        >
                          <FiBookmark size={16} />
                          <span>Saved Recipes</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            navigate("/grocery-list");
                          }}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center gap-3"
                        >
                          <FiUser size={16} />
                          <span>Grocery List</span>
                        </button>



                        {!isPremium && (
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              navigate("/payment");
                            }}
                            className="w-full px-4 py-2 text-left text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-3 font-medium"
                          >
                            <FiStar size={16} />
                            <span>Upgrade to Premium</span>
                          </button>
                        )}

                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              handleLogout();
                            }}
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                          >
                            <FiLogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => openAuthModal("login")}
                className="text-amber-600 text-sm font-medium flex items-center gap-1"
              >
                <FiLogIn size={16} /> Login
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="text-white text-sm font-medium bg-gradient-to-r from-amber-500 to-pink-500 px-4 py-2 rounded-full hover:shadow-md transition-all hover:from-amber-600 hover:to-pink-600"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-amber-600 rounded-full hover:bg-amber-50 transition-colors"
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm z-40 pt-20 px-6"
          >
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => handleNavigation("/search-recipes")}
                className={`${getActiveClass("/search-recipes")} text-lg font-medium py-3 border-b border-gray-100 text-left`}
              >
                Recipes
              </button>
              <button
                onClick={() => handleNavigation("/ingredients")}
                className={`${getActiveClass("/ingredients")} text-lg font-medium py-3 border-b border-gray-100 text-left`}
              >
                Ingredients
              </button>
              {isPremium && (
                <>
                  <button
                    onClick={() => handleNavigation("/meal-planner")}
                    className={`${getActiveClass("/meal-planner")} text-lg font-medium py-3 border-b border-gray-100 text-left`}
                  >
                    Meal Planner
                  </button>
                  <button
                    onClick={() => handleNavigation("/photo-search")}
                    className={`${getActiveClass("/photo-search")} text-lg font-medium py-3 border-b border-gray-100 text-left`}
                  >
                    Photo Search
                  </button>
                </>
              )}
              {!isPremium && isLoggedIn && (
                <div className="text-sm text-gray-500 italic py-3 border-b border-gray-100">
                  Upgrade to Premium to access Photo Search & Meal Planner
                </div>
              )}

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="text-lg font-medium py-3 border-b border-gray-100 flex items-center gap-2 text-left"
                  >
                    <FiUser size={18} /> My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-lg font-medium py-3 border-b border-gray-100 flex items-center gap-2 text-left"
                  >
                    <FiLogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openAuthModal("login");
                    }}
                    className="text-lg font-medium py-3 border-b border-gray-100 flex items-center gap-2 text-left"
                  >
                    <FiLogIn size={18} /> Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openAuthModal("signup");
                    }}
                    className="text-lg font-medium py-3 border-b border-gray-100 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white rounded-lg justify-center"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-amber-50 rounded-full mb-6 border border-amber-100"
          >
            <FiStar className="text-amber-500 mr-2" />
            <span className="text-sm font-medium text-amber-800">PREMIUM CULINARY EXPERIENCE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Exquisite</span> Cuisine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Elevate your culinary journey with our premium collection of recipes crafted by world-class chefs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => handleNavigation("/search-recipes")}
              className="relative group bg-gradient-to-r from-amber-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Explore Recipes
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            {!isLoggedIn ? (
              <button
                onClick={() => openAuthModal("signup")}
                className="border border-amber-300 text-amber-700 px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                Upgrade to Premium
              </button>
            ) : !isPremium ? (
              <button
                onClick={() => navigate("/payment")}
                className="border border-amber-300 text-amber-700 px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                Upgrade to Premium
              </button>
            ) : null}
          </motion.div>
        </section>

        {/* Featured Recipes */}
        <section className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured <span className="text-amber-600">Recipes</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                whileHover={{ y: -5 }}
                className={`relative group overflow-hidden rounded-2xl shadow-lg ${recipe.premium ? 'border-2 border-amber-400' : 'border border-gray-100'}`}
              >
                {recipe.premium && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    PREMIUM
                  </div>
                )}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="bg-white p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{recipe.title}</h3>
                    <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
                      <FiStar className="text-amber-500 mr-1" />
                      <span className="text-sm font-medium text-amber-700">{recipe.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">by {recipe.chef}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center"><FiClock className="mr-1" /> {recipe.cookTime}</span>
                    <span className="flex items-center"><FiUsers className="mr-1" /> {recipe.servings} servings</span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Premium Features */}
        <section className="bg-gradient-to-b from-amber-50 to-white py-20 mb-20 rounded-3xl">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose <span className="text-amber-600">Premium</span>?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Unlock exclusive benefits designed for culinary enthusiasts and professionals alike
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {!isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <button
                  onClick={() => isLoggedIn ? navigate("/payment") : openAuthModal("signup")}
                  className="relative group bg-gradient-to-r from-amber-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoggedIn ? "Upgrade to Premium" : "Upgrade Now"}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our <span className="text-amber-600">Members</span> Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join thousands of culinary enthusiasts who transformed their cooking experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-amber-500 w-5 h-5" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">SR</span>
                </div>
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">
                  Smart Recipes
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Elevate your culinary journey with our premium collection of recipes crafted by world-class chefs.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/smartrecipes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="https://instagram.com/smartrecipes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="https://twitter.com/smartrecipes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="https://youtube.com/smartrecipes" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/about")} className="hover:text-amber-400 transition-colors">Our Story</button></li>
                <li><button onClick={() => navigate("/chefs")} className="hover:text-amber-400 transition-colors">Our Chefs</button></li>
                <li><button onClick={() => navigate("/careers")} className="hover:text-amber-400 transition-colors">Careers</button></li>
                <li><button onClick={() => navigate("/press")} className="hover:text-amber-400 transition-colors">Press</button></li>
                <li><button onClick={() => navigate("/blog")} className="hover:text-amber-400 transition-colors">Blog</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/help")} className="hover:text-amber-400 transition-colors">Help Center</button></li>
                <li><button onClick={() => navigate("/contact")} className="hover:text-amber-400 transition-colors">Contact Us</button></li>
                <li><button onClick={() => navigate("/privacy")} className="hover:text-amber-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigate("/terms")} className="hover:text-amber-400 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => navigate("/cookies")} className="hover:text-amber-400 transition-colors">Cookie Policy</button></li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiMail size={18} />
                  <span>hello@smartrecipes.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiPhone size={18} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-white mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    <a href="https://www.instagram.com/smartrecipes" target="_blank" rel="noopener noreferrer"
                       className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg hover:shadow-lg transition-all">
                      <FaInstagram size={16} className="text-white" />
                    </a>
                    <a href="https://www.facebook.com/smartrecipes" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-600 p-2 rounded-lg hover:shadow-lg transition-all">
                      <FaFacebook size={16} className="text-white" />
                    </a>
                    <a href="https://www.twitter.com/smartrecipes" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-400 p-2 rounded-lg hover:shadow-lg transition-all">
                      <FaTwitter size={16} className="text-white" />
                    </a>
                    <a href="https://www.youtube.com/smartrecipes" target="_blank" rel="noopener noreferrer"
                       className="bg-red-600 p-2 rounded-lg hover:shadow-lg transition-all">
                      <FaYoutube size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Smart Recipes. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => navigate("/privacy")} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">Privacy</button>
              <button onClick={() => navigate("/terms")} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">Terms</button>
              <button onClick={() => navigate("/cookies")} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Premium Subscription Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-8"
            >
              <button
                onClick={closePremiumModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
              >
                <FiX size={24} />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiLock className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Premium Feature
                </h2>
                <p className="text-gray-600 mt-2">
                  This feature is only available for premium members
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h3 className="font-bold text-lg text-amber-800 mb-2">Premium Benefits</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Access to Meal Planner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Photo Search functionality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Exclusive premium recipes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>Ad-free experience</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 rounded-md hover:shadow-md transition-all font-medium hover:from-amber-600 hover:to-pink-600"
                >
                  Upgrade to Premium - $9.99/month
                </button>

                <button
                  onClick={closePremiumModal}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-all font-medium"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-8"
            >
              <button
                onClick={closeAuthModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
              >
                <FiX size={24} />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {authType === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-600 mt-2">
                  {authType === "login"
                    ? "Sign in to access premium recipes"
                    : "Join our culinary community"}
                </p>
              </div>

              <form className="space-y-4">


                {authType === "signup" && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={authFormData.name}
                      onChange={(e) => {
                        setAuthFormData(prev => ({ ...prev, name: e.target.value }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                    onBlur={(e) => {
                      if (e.target.value) {
                        handleEmailCheck(e.target.value);
                      }
                    }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={authFormData.password}
                    onChange={(e) => setAuthFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAuthSuccess}
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 rounded-md hover:shadow-md transition-all font-medium hover:from-amber-600 hover:to-pink-600"
                >
                  {authType === "login" ? "Sign In" : "Sign Up"}
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-600">
                {authType === "login" ? (
                  <>
                    <div className="mb-2">
                      <button
                        onClick={() => setShowForgotPassword(true)}
                        className="text-amber-600 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setAuthType("signup")}
                      className="text-amber-600 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setAuthType("login")}
                      className="text-amber-600 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg w-full max-w-md relative p-8"
            >
              <button
                onClick={handleBackFromForgotPassword}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
              >
                <FiX size={20} />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {forgotPasswordStep === "email" && "Reset Password"}
                  {forgotPasswordStep === "otp" && "Verify OTP"}
                  {forgotPasswordStep === "newPassword" && "New Password"}
                </h2>
                <p className="text-gray-600">
                  {forgotPasswordStep === "email" && "Enter your email to receive a reset code"}
                  {forgotPasswordStep === "otp" && "Enter the 6-digit code sent to your email"}
                  {forgotPasswordStep === "newPassword" && "Create your new password"}
                </p>
              </div>

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                {forgotPasswordStep === "email" && (
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={forgotPasswordData.email}
                      onChange={handleForgotPasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                )}

                {forgotPasswordStep === "otp" && (
                  <div>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      value={forgotPasswordData.otp}
                      onChange={handleForgotPasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none text-center text-lg tracking-widest"
                      maxLength="6"
                      required
                    />
                  </div>
                )}

                {forgotPasswordStep === "newPassword" && (
                  <>
                    <div>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={forgotPasswordData.newPassword}
                        onChange={handleForgotPasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={forgotPasswordData.confirmPassword}
                        onChange={handleForgotPasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-pink-500 text-white py-3 rounded-lg font-medium transition hover:from-amber-600 hover:to-pink-600"
                >
                  {forgotPasswordStep === "email" ? "Send OTP" :
                   forgotPasswordStep === "otp" ? "Verify OTP" :
                   "Reset Password"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={handleBackFromForgotPassword}
                  className="text-amber-600 hover:underline text-sm"
                >
                  ← Back to Login
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={showRecipeModal}
        onClose={() => setShowRecipeModal(false)}
      />
    </div>
  );
};

export default Dashboard;