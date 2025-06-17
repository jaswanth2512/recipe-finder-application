import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock, FiSearch, FiFilter, FiHeart, FiStar,
  FiX, FiUsers, FiUser, FiInfo, FiArrowLeft, FiList, FiShoppingCart
} from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import VoiceReader from '../components/VoiceReader';
import { getImageProps } from "../utils/imageUtils";
import { getRecipeDetails } from "../utils/recipeUtils";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([4, 5]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [timeRange, setTimeRange] = useState([15, 45]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const recipeTypes = ['Grilled', 'Roasted', 'Baked', 'Steamed', 'Pan-fried', 'Stir-fried', 'Vegan', 'Keto'];

  // More diverse recipe data
  const recipeData = [
    { name: "Truffle Infused Mushroom Risotto", imageTerm: "truffle+mushroom+risotto", type: "Baked" },
    { name: "Mediterranean Grilled Octopus", imageTerm: "grilled+octopus+mediterranean", type: "Grilled" },
    { name: "Caramelized Onion Tart", imageTerm: "caramelized+onion+tart", type: "Baked" },
    { name: "Szechuan Chili Crisp Noodles", imageTerm: "szechuan+noodles+chili", type: "Stir-fried" },
    { name: "Herb Crusted Rack of Lamb", imageTerm: "herb+crusted+lamb+rack", type: "Roasted" },
    { name: "Miso Glazed Eggplant", imageTerm: "miso+glazed+eggplant", type: "Pan-fried" },
    { name: "Lemon Basil Sorbet", imageTerm: "lemon+basil+sorbet", type: "Vegan" },
    { name: "Korean Spicy Tofu Stew", imageTerm: "korean+tofu+stew", type: "Steamed" },
    { name: "Argentinian Chimichurri Steak", imageTerm: "argentinian+steak+chimichurri", type: "Grilled" },
    { name: "Persian Jeweled Rice", imageTerm: "persian+jeweled+rice", type: "Baked" },
    { name: "Thai Green Curry", imageTerm: "thai+green+curry", type: "Stir-fried" },
    { name: "French Ratatouille", imageTerm: "french+ratatouille", type: "Roasted" },
    { name: "Japanese Matcha Cheesecake", imageTerm: "matcha+cheesecake+japanese", type: "Baked" },
    { name: "Moroccan Tagine", imageTerm: "moroccan+tagine", type: "Steamed" },
    { name: "Cajun Blackened Salmon", imageTerm: "cajun+blackened+salmon", type: "Pan-fried" },
    { name: "Italian Osso Buco", imageTerm: "italian+osso+buco", type: "Roasted" },
    { name: "Vietnamese Pho", imageTerm: "vietnamese+pho", type: "Steamed" },
    { name: "Greek Spanakopita", imageTerm: "greek+spanakopita", type: "Baked" },
    { name: "Mexican Mole Poblano", imageTerm: "mexican+mole+poblano", type: "Pan-fried" },
    { name: "Indian Butter Chicken", imageTerm: "indian+butter+chicken", type: "Stir-fried" }
  ];

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log('Searching with params:', {
        query,
        types: selectedTypes,
        ratings: selectedRatings,
        minTime: timeRange[0],
        maxTime: timeRange[1]
      });

      // Call the MongoDB API for recipe search
      const params = new URLSearchParams();
      if (query && query.trim()) {
        params.append('query', query.trim());
      }
      if (selectedTypes.length > 0) {
        selectedTypes.forEach(type => params.append('types', type));
      }
      if (selectedRatings.length > 0) {
        selectedRatings.forEach(rating => params.append('ratings', rating));
      }
      params.append('minTime', timeRange[0]);
      params.append('maxTime', timeRange[1]);
      params.append('limit', '20'); // Get more results

      const response = await axios.get(`http://localhost:5000/api/recipes/search?${params.toString()}`);
      const recipes = response.data;

      console.log('API returned recipes:', recipes);
      setResults(recipes);
    } catch (err) {
      console.error('Search error:', err);
      // Fallback to local data if API fails
      console.log('API failed, using fallback data');

      let filteredRecipes = recipeData.map((recipe, index) => {
        const detailedRecipe = getRecipeDetails(recipe.name);
        return {
          _id: `recipe_${index}`,
          ...detailedRecipe
        };
      });

      // Apply filters to fallback data
      if (query && query.trim()) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          recipe.name.toLowerCase().includes(query.toLowerCase()) ||
          recipe.chef.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (selectedTypes.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
          selectedTypes.includes(recipe.type)
        );
      }

      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings);
        filteredRecipes = filteredRecipes.filter(recipe =>
          parseFloat(recipe.rating) >= minRating
        );
      }

      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.cookingTime >= timeRange[0] && recipe.cookingTime <= timeRange[1]
      );

      setResults(filteredRecipes);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch detailed recipe information
  const fetchRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      // If API fails, try to find the recipe in the current results
      const foundRecipe = results.find(r => r._id === recipeId);
      if (foundRecipe) {
        // Return the recipe with some default detailed data
        return {
          ...foundRecipe,
          ingredients: foundRecipe.ingredients || [
            "Fresh ingredients as needed",
            "Seasonings to taste",
            "Quality cooking oil",
            "Fresh herbs for garnish"
          ],
          instructions: foundRecipe.instructions || [
            "Prepare all ingredients according to recipe requirements",
            "Follow traditional cooking methods for best results",
            "Cook with care and attention to detail",
            "Season and adjust flavors as needed",
            "Serve hot and enjoy!"
          ],
          nutrition: foundRecipe.nutrition || {
            calories: "Varies",
            protein: "Varies",
            carbs: "Varies",
            fat: "Varies",
            fiber: "Varies",
            sugar: "Varies"
          },
          description: foundRecipe.description || `A delicious ${foundRecipe.name} recipe prepared with authentic techniques and fresh ingredients.`
        };
      }

      // Last resort fallback
      return {
        _id: recipeId,
        name: "Recipe Details Unavailable",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format",
        cookingTime: 30,
        rating: 4.0,
        type: "Traditional",
        chef: "Chef",
        ingredients: ["Recipe details are currently unavailable"],
        instructions: ["Please try again later or contact support"],
        nutrition: { calories: "N/A", protein: "N/A", carbs: "N/A", fat: "N/A" },
        servings: 4,
        difficulty: 'Medium',
        prepTime: 15,
        description: "Recipe details are currently unavailable. Please try again later."
      };
    }
  };

  // Handle recipe click
  const handleRecipeClick = async (recipe) => {
    const detailedRecipe = await fetchRecipeDetails(recipe._id);
    setSelectedRecipe(detailedRecipe);
    setShowRecipeModal(true);
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };



  // Since filtering is now done on the backend, we can use results directly
  const filteredResults = results;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Premium color palette
  const colors = {
    primary: 'bg-gradient-to-r from-amber-500 to-orange-600',
    primaryHover: 'hover:from-amber-600 hover:to-orange-700',
    secondary: 'bg-emerald-600',
    secondaryHover: 'hover:bg-emerald-700',
    dark: 'bg-gray-900',
    light: 'bg-amber-50',
    cardBg: 'bg-white',
    textDark: 'text-gray-900',
    textLight: 'text-gray-100',
    border: 'border-gray-200'
  };

  return (
    <div className={`min-h-screen ${colors.light} ${colors.textDark}`}>
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
            Recipe Search
          </span>
        </div>
        <div className="w-24"></div>
      </header>

      <div className="px-4 lg:px-16 py-8">
        {/* Search Header with Gradient */}
        <div className="mb-10">
        <div className={`${colors.primary} rounded-xl p-8 mb-6 shadow-lg`}>
          <h1 className="text-4xl font-bold text-white mb-4">Discover Culinary Delights</h1>
          <p className="text-amber-100 mb-6 max-w-2xl">
            Find the perfect recipe for any occasion from our collection of chef-curated dishes
          </p>
          <div className="relative max-w-3xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search recipes, ingredients, or chefs..."
              className="w-full pl-14 pr-4 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-lg"
            />
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-600 text-xl" />
            <button
              onClick={handleSearch}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${colors.secondary} ${colors.secondaryHover} text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md`}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`lg:hidden flex items-center gap-2 ${colors.cardBg} border ${colors.border} rounded-xl px-5 py-3 shadow-sm mb-4 ${colors.primaryHover} hover:text-white transition-colors`}
        >
          <FiFilter />
          <span className="font-medium">Filters</span>
        </button>

        {/* Sidebar Filters - Desktop */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 ${colors.cardBg} border ${colors.border} rounded-xl p-6 shadow-sm h-fit sticky top-4`}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-700">
            <FiFilter className="text-amber-600" />
            Refine Your Search
          </h2>

          {/* Recipe Type */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-gray-700 border-b pb-2">Recipe Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {recipeTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className="hover:text-amber-600 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cooking Time */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-gray-700 border-b pb-2">Cooking Time</h3>
            <div className="px-2">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Quick ({timeRange[0]} mins)</span>
                <span>Leisurely ({timeRange[1]} mins)</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={timeRange[1]}
                onChange={(e) => setTimeRange([timeRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-gray-700 border-b pb-2">Minimum Rating</h3>
            <div className="space-y-3">
              {[5, 4, 3].map((star) => (
                <label key={star} className="flex items-center gap-3 text-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    checked={selectedRatings.includes(star)}
                    onChange={() => toggleRating(star)}
                  />
                  <div className="flex items-center">
                    {Array.from({ length: star }).map((_, i) => (
                      <FaStar key={i} className="text-amber-400" />
                    ))}
                    {Array.from({ length: 5 - star }).map((_, i) => (
                      <FaRegStar key={i + star} className="text-amber-400" />
                    ))}
                  </div>
                  <span className="text-gray-500 group-hover:text-amber-600 transition-colors ml-2">
                    {star}+ stars
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            className={`w-full ${colors.primary} ${colors.primaryHover} text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md`}
            onClick={handleSearch}
          >
            Apply Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {query ? `"${query}" Recipes` : "Chef's Selections"} 
                <span className="text-amber-600 ml-2">{filteredResults.length}</span>
              </h2>
              <p className="text-gray-600">Curated recipes from world-class chefs</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Sort:</span>
              <select className="border border-gray-300 px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white shadow-sm">
                <option>Recommended</option>
                <option>Highest Rated</option>
                <option>Quickest</option>
                <option>Trending</option>
                <option>A-Z</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`${colors.cardBg} rounded-xl overflow-hidden border ${colors.border} animate-pulse`}>
                  <div className="bg-gray-200 h-60 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between pt-2">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && (
            <>
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className={`${colors.cardBg} rounded-xl overflow-hidden border ${colors.border} hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                      onClick={() => handleRecipeClick(item)}
                    >
                      <div className="relative h-60 overflow-hidden">
                        <img
                          {...getImageProps(item.image, item.name)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                            <FaStar className="mr-1" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">By {item.chef}</p>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <FiClock className="text-amber-500" />
                            {item.cookingTime} mins
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            item.type === 'Vegan' ? 'bg-emerald-100 text-emerald-800' :
                            item.type === 'Keto' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`${colors.cardBg} rounded-xl p-12 text-center border ${colors.border} shadow-sm`}>
                  <div className="text-gray-300 mb-6">
                    <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-3">No recipes match your criteria</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Try adjusting your filters or search for something different. Our chefs create new recipes daily!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTypes([]);
                      setSelectedRatings([3, 4, 5]);
                      setTimeRange([10, 60]);
                    }}
                    className={`${colors.primary} ${colors.primaryHover} text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md`}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}


        </div>
      </div>

        {/* Recipe Detail Modal */}
        <AnimatePresence>
          {showRecipeModal && selectedRecipe && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <RecipeDetailModal
                  recipe={selectedRecipe}
                  onClose={() => setShowRecipeModal(false)}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Recipe Detail Modal Component
const RecipeDetailModal = ({ recipe, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Check if recipe is already saved and load existing rating when modal opens
  useEffect(() => {
    if (recipe) {
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      const isAlreadySaved = savedRecipes.some(saved => saved._id === recipe._id);
      setIsSaved(isAlreadySaved);

      // Load existing rating for this recipe
      const recipeRatings = JSON.parse(localStorage.getItem('recipeRatings') || '{}');
      const existingRating = recipeRatings[recipe._id];
      if (existingRating) {
        setUserRating(existingRating.rating);
      } else {
        setUserRating(0);
      }
    }
  }, [recipe]);

  // Rating functionality
  const handleRatingClick = (rating) => {
    console.log('Rating clicked:', rating, 'for recipe:', recipe.name);
    setUserRating(rating);

    try {
      // Get existing ratings from localStorage
      const recipeRatings = JSON.parse(localStorage.getItem('recipeRatings') || '{}');

      // Save the rating for this recipe
      recipeRatings[recipe._id] = {
        rating: rating,
        ratedAt: new Date().toISOString(),
        recipeName: recipe.name
      };

      localStorage.setItem('recipeRatings', JSON.stringify(recipeRatings));
      console.log('Rating saved successfully:', recipeRatings[recipe._id]);
      alert(`Thank you for rating "${recipe.name}" ${rating} star${rating !== 1 ? 's' : ''}!`);
    } catch (error) {
      console.error('Error saving rating:', error);
      alert('Error saving your rating. Please try again.');
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || userRating);
      stars.push(
        <button
          key={i}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-all duration-200 hover:scale-110 transform focus:outline-none"
        >
          {isFilled ? (
            <FiStar
              size={24}
              className="text-yellow-400 fill-yellow-400"
              style={{ fill: 'currentColor' }}
            />
          ) : (
            <FiStar
              size={24}
              className="text-gray-300 hover:text-yellow-300"
            />
          )}
        </button>
      );
    }
    return stars;
  };

  const handleSaveRecipe = () => {
    try {
      // Get existing saved recipes from localStorage
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');

      // Check if recipe is already saved
      const isAlreadySaved = savedRecipes.some(saved => saved._id === recipe._id);

      if (isAlreadySaved) {
        // Remove from saved recipes
        const updatedRecipes = savedRecipes.filter(saved => saved._id !== recipe._id);
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
        setIsSaved(false);
        alert('Recipe removed from saved recipes!');
      } else {
        // Add to saved recipes
        const recipeToSave = {
          _id: recipe._id,
          name: recipe.name,
          image: recipe.image,
          chef: recipe.chef,
          cookingTime: recipe.cookingTime,
          rating: recipe.rating,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          nutrition: recipe.nutrition,
          servings: recipe.servings,
          type: recipe.type,
          difficulty: recipe.difficulty,
          savedAt: new Date().toISOString()
        };

        savedRecipes.push(recipeToSave);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        setIsSaved(true);
        alert('Recipe saved successfully!');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error saving recipe. Please try again.');
    }
  };

  const handleAddToGroceryList = () => {
    try {
      // Get existing grocery list from localStorage
      const groceryList = JSON.parse(localStorage.getItem('groceryList') || '[]');

      // Add recipe ingredients to grocery list
      const newItems = (recipe.ingredients || []).map(ingredient => ({
        id: Date.now() + Math.random(),
        text: ingredient,
        completed: false,
        addedFrom: recipe.name,
        addedAt: new Date().toISOString()
      }));

      // Combine with existing items
      const updatedGroceryList = [...groceryList, ...newItems];
      localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));

      alert(`Added ${recipe.ingredients?.length || 0} ingredients to your grocery list!`);
    } catch (error) {
      console.error('Error adding to grocery list:', error);
      alert('Error adding ingredients to grocery list. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-gray-900">{recipe.name}</h2>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize">
              {recipe.type}
            </span>
          </div>
          <p className="text-gray-600 mb-3">{recipe.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FiUser size={16} />
              By {recipe.chef}
            </span>
            <span className="flex items-center gap-1">
              <FaStar className="text-amber-500" />
              {recipe.rating}
            </span>
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-4"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recipe Image and Quick Info */}
        <div>
          <img
            {...getImageProps(recipe.image, recipe.name)}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
              <FiClock className="mx-auto mb-2 text-amber-600" size={24} />
              <div className="font-semibold text-gray-900">{recipe.cookingTime} min</div>
              <div className="text-sm text-gray-600">Cook Time</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-100">
              <FiUsers className="mx-auto mb-2 text-pink-600" size={24} />
              <div className="font-semibold text-gray-900">{recipe.servings}</div>
              <div className="text-sm text-gray-600">Servings</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
              <FiInfo className="mx-auto mb-2 text-green-600" size={24} />
              <div className="font-semibold text-gray-900">{recipe.prepTime || 15} min</div>
              <div className="text-sm text-gray-600">Prep Time</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <FaStar className="mx-auto mb-2 text-blue-600" size={24} />
              <div className="font-semibold text-gray-900">{recipe.difficulty}</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
          </div>

          {/* Nutritional Information */}
          <div className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-xl p-6 border border-amber-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiInfo className="text-amber-600" />
              Nutritional Information (per serving)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-bold text-amber-600 text-lg">{recipe.nutrition?.calories || 'N/A'}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-pink-600 text-lg">{recipe.nutrition?.protein || 'N/A'}</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600 text-lg">{recipe.nutrition?.carbs || 'N/A'}</div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600 text-lg">{recipe.nutrition?.fat || 'N/A'}</div>
                <div className="text-sm text-gray-600">Fat</div>
              </div>
              {recipe.nutrition?.fiber && (
                <div className="text-center">
                  <div className="font-bold text-purple-600 text-lg">{recipe.nutrition.fiber}</div>
                  <div className="text-sm text-gray-600">Fiber</div>
                </div>
              )}
              {recipe.nutrition?.sugar && (
                <div className="text-center">
                  <div className="font-bold text-red-600 text-lg">{recipe.nutrition.sugar}</div>
                  <div className="text-sm text-gray-600">Sugar</div>
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="mt-6 pt-6 border-t border-amber-200">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FiStar className="text-amber-500" size={20} />
                  Rate This Recipe
                </h3>
                <p className="text-gray-600 mb-4">
                  How would you rate this recipe? Your feedback helps other cooks!
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {renderStars()}
                </div>

                {userRating > 0 && (
                  <div className="text-sm text-gray-600 font-medium">
                    ⭐ You rated this recipe {userRating} star{userRating !== 1 ? 's' : ''}
                  </div>
                )}

                {userRating === 0 && (
                  <div className="text-sm text-gray-500">
                    👆 Click on a star to rate this recipe
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div>
          {/* Ingredients */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiList className="text-green-500" />
              Ingredients ({recipe.ingredients?.length || 0})
            </h3>
            <div className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{ingredient}</span>
                </div>
              )) || <p className="text-gray-500">No ingredients available</p>}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiList className="text-blue-500" />
              Cooking Instructions
            </h3>

            {/* Voice Reader for Instructions */}
            {recipe.instructions && recipe.instructions.length > 0 && (
              <VoiceReader
                text={recipe.instructions}
                title="Cooking Instructions"
                className="mb-4"
              />
            )}

            <div className="space-y-4">
              {recipe.instructions?.map((instruction, index) => (
                <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{instruction}</p>
                </div>
              )) || <p className="text-gray-500">No instructions available</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Close
        </button>
        <button
          onClick={handleSaveRecipe}
          className={`flex-1 py-3 px-6 rounded-xl transition-all font-medium shadow-lg hover:shadow-xl ${
            isSaved
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gradient-to-r from-amber-500 to-pink-500 text-white hover:from-amber-600 hover:to-pink-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FiHeart size={18} />
            {isSaved ? 'Remove from Saved' : 'Save Recipe'}
          </div>
        </button>
        <button
          onClick={handleAddToGroceryList}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all font-medium shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <FiShoppingCart size={18} />
            Add to Grocery List
          </div>
        </button>
      </div>
    </div>
  );
};

export default SearchPage;