import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock, FiSearch, FiFilter, FiHeart,
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
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([3, 4, 5]);
  const [timeRange, setTimeRange] = useState([15, 45]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const recipeTypes = ['Grilled', 'Roasted', 'Baked', 'Steamed', 'Pan-fried', 'Stir-fried', 'Vegan', 'Keto'];

  // More diverse recipe data (same as SearchRecipes page)
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

      let filteredRecipes = [];
      
      // If there's a query, search by ingredients using API
      if (query && query.trim()) {
        try {
          const params = new URLSearchParams();
          params.append('ingredients', query.trim());
          
          if (selectedTypes.length > 0) {
            selectedTypes.forEach(type => params.append('types', type));
          }
          if (selectedRatings.length > 0) {
            selectedRatings.forEach(rating => params.append('ratings', rating));
          }
          params.append('minTime', timeRange[0]);
          params.append('maxTime', timeRange[1]);
          params.append('limit', '20');

          const response = await axios.get(`http://localhost:5000/api/recipes/search-by-ingredients?${params.toString()}`);
          const data = response.data;
          
          console.log('API returned data:', data);
          filteredRecipes = data.recipes || [];
        } catch (apiError) {
          console.log('API call failed:', apiError.message, '- using fallback data');
          filteredRecipes = [];
        }

        // If API returns no results or fails, fall back to local data
        if (filteredRecipes.length === 0) {
          console.log('Using fallback data for ingredient search');
          
          // Parse input ingredients
          const searchIngredients = query.toLowerCase().split(',').map(ing => ing.trim()).filter(ing => ing.length > 0);

          // Generate mock recipes from static data and filter by ingredients
          filteredRecipes = recipeData
            .filter(recipe => {
              const detailedRecipe = getRecipeDetails(recipe.name);
              // Check if recipe contains any of the searched ingredients
              return searchIngredients.some(searchIng =>
                detailedRecipe.ingredients.some(recipeIng =>
                  recipeIng.toLowerCase().includes(searchIng)
                )
              );
            })
            .map((recipe, index) => {
              const detailedRecipe = getRecipeDetails(recipe.name);
              return {
                _id: `recipe_${index}`,
                ...detailedRecipe
              };
            });
        }
      } else {
        // No query - load default recipes from API or fallback
        try {
          const response = await axios.get('http://localhost:5000/api/recipes?limit=20');
          filteredRecipes = response.data || [];
        } catch (apiError) {
          console.log('API failed, using local default recipes');
          // Generate default recipes from local data
          filteredRecipes = recipeData.map((recipe, index) => {
            const detailedRecipe = getRecipeDetails(recipe.name);
            return {
              _id: `recipe_${index}`,
              ...detailedRecipe
            };
          });
        }
      }

      // Apply filters
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
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-100 to-pink-50">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">IS</span>
          </div>
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600">
            Ingredient Search
          </span>
        </div>
        <div className="w-24"></div>
      </header>

      <div className="p-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 mb-4">
              🥘 Find Recipes by Ingredients
            </h1>
            <p className="text-gray-600 text-lg">
              Enter ingredients you have and discover amazing recipes you can make!
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter ingredients (e.g., chicken, tomato, onion)..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-amber-600 text-white rounded-xl hover:from-rose-600 hover:to-amber-700 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search Recipes'}
            </button>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FiFilter size={20} />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Recipe Types */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Recipe Types</h3>
                    <div className="space-y-2">
                      {recipeTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                            className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleRating(rating)}
                            className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(rating)].map((_, i) => (
                              <FaStar key={i} className="text-amber-400" size={14} />
                            ))}
                            <span className="text-gray-700 ml-1">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cooking Time */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Cooking Time: {timeRange[0]}-{timeRange[1]} min
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Min: {timeRange[0]} min</label>
                        <input
                          type="range"
                          min="5"
                          max="120"
                          value={timeRange[0]}
                          onChange={(e) => setTimeRange([parseInt(e.target.value), timeRange[1]])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Max: {timeRange[1]} min</label>
                        <input
                          type="range"
                          min="5"
                          max="120"
                          value={timeRange[1]}
                          onChange={(e) => setTimeRange([timeRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedTypes([]);
                      setSelectedRatings([3, 4, 5]);
                      setTimeRange([15, 45]);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-gradient-to-r from-rose-500 to-amber-600 text-white rounded-lg hover:from-rose-600 hover:to-amber-700 transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
            <span className="ml-4 text-gray-600">Searching for recipes...</span>
          </div>
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {query ?
                `🍽️ Found ${results.length} Recipe${results.length !== 1 ? 's' : ''} with your ingredients` :
                `🍽️ Featured Recipes (${results.length})`
              }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => handleRecipeClick(item)}
                >
                  <div className="relative">
                    <img
                      {...getImageProps(item.image, item.name)}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {item.cookingTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-amber-400" size={14} />
                        {item.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiUsers size={14} />
                        {item.servings}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium capitalize">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        By {item.chef}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!isLoading && results.length === 0 && query && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-4">
              Try different ingredients or adjust your filters
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedTypes([]);
                setSelectedRatings([3, 4, 5]);
                setTimeRange([15, 45]);
                handleSearch();
              }}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-amber-600 text-white rounded-lg hover:from-rose-600 hover:to-amber-700 transition-all"
            >
              Show All Recipes
            </button>
          </div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      {showRecipeModal && selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setShowRecipeModal(false)}
        />
      )}
    </div>
  );
};

// Recipe Detail Modal Component (same as SearchRecipes page)
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
            <FaStar
              size={24}
              className="text-yellow-400"
            />
          ) : (
            <FaRegStar
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recipe Image and Quick Info */}
            <div>
              <img
                {...getImageProps(recipe.image, recipe.name)}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-rose-50 rounded-xl border border-rose-100">
                  <FiClock className="mx-auto mb-2 text-rose-600" size={24} />
                  <div className="font-semibold text-gray-900">{recipe.cookingTime} min</div>
                  <div className="text-sm text-gray-600">Cook Time</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <FiUsers className="mx-auto mb-2 text-amber-600" size={24} />
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
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-6 border border-rose-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiInfo className="text-rose-600" />
                  Nutritional Information (per serving)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-bold text-rose-600 text-lg">{recipe.nutrition?.calories || 'N/A'}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-amber-600 text-lg">{recipe.nutrition?.protein || 'N/A'}</div>
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
                      <FaStar className="text-amber-500" size={20} />
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
                      <div className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0"></div>
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
                  : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:from-rose-600 hover:to-amber-600'
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
      </div>
    </div>
  );
};

export default SearchPage;
