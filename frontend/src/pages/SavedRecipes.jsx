import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiClock,
  FiUsers,
  FiStar,
  FiTrash2,
  FiHeart
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import RecipeModal from '../components/RecipeModal';

const SavedRecipes = () => {
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      setSavedRecipes(saved);
    } catch (error) {
      console.error('Error loading saved recipes:', error);
      setSavedRecipes([]);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleRemoveRecipe = (recipeId, event) => {
    event.stopPropagation();
    try {
      const updatedRecipes = savedRecipes.filter(recipe => recipe._id !== recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error removing recipe:', error);
      alert('Error removing recipe. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50">
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
            Saved Recipes
          </span>
        </div>
        <div className="w-24"></div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-amber-50 rounded-full mb-6 border border-amber-100"
          >
            <FiHeart className="text-amber-500 mr-2" />
            <span className="text-sm font-medium text-amber-800">YOUR FAVORITE RECIPES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">Recipes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Your personal collection of favorite recipes, saved for easy access
          </motion.p>
        </div>

        {/* Recipes Grid */}
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image || `https://source.unsplash.com/600x400/?${recipe.name.replace(/\s+/g, '+')},food`}
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Remove button */}
                  <button
                    onClick={(e) => handleRemoveRecipe(recipe._id, e)}
                    className="absolute top-4 right-4 p-2 bg-red-500/80 backdrop-blur-sm rounded-full text-white hover:bg-red-600/80 transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove from saved"
                  >
                    <FiTrash2 size={16} />
                  </button>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                      <FaStar className="mr-1" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{recipe.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">By {recipe.chef}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <FiClock className="text-amber-500" />
                      {recipe.cookingTime} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers className="text-blue-500" />
                      {recipe.servings} servings
                    </span>
                  </div>

                  <div className="text-xs text-gray-400 border-t pt-3">
                    Saved on {formatDate(recipe.savedAt)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiHeart size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No Saved Recipes Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Start exploring recipes and save your favorites to see them here. Click the heart icon on any recipe to save it!
            </p>
            <button
              onClick={() => navigate('/search-recipes')}
              className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-amber-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Recipes
            </button>
          </motion.div>
        )}
      </div>

      {/* Recipe Modal */}
      <RecipeModal 
        recipe={selectedRecipe}
        isOpen={showRecipeModal}
        onClose={() => {
          setShowRecipeModal(false);
          loadSavedRecipes(); // Reload saved recipes in case any were removed
        }}
      />
    </div>
  );
};

export default SavedRecipes;
