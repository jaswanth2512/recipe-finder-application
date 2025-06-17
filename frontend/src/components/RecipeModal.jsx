import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiClock,
  FiUsers,
  FiStar,
  FiUser,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiHeart,
  FiShoppingCart
} from 'react-icons/fi';
import '../styles/scrollbar.css';
import { getImageProps } from '../utils/imageUtils';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    // Stop speech when modal closes
    if (!isOpen && speechSynthesis && currentUtterance) {
      speechSynthesis.cancel();
      setIsReading(false);
      setCurrentUtterance(null);
    }
  }, [isOpen, speechSynthesis, currentUtterance]);

  const handleVoiceToggle = () => {
    if (!speechSynthesis) {
      alert('Speech synthesis not supported in this browser');
      return;
    }

    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      setCurrentUtterance(null);
    } else {
      startReading();
    }
  };

  const startReading = () => {
    if (!recipe || !speechSynthesis) return;

    let textToRead = `Recipe: ${recipe.name}. `;
    textToRead += `By ${recipe.chef}. `;
    textToRead += `Cooking time: ${recipe.cookingTime} minutes. `;
    textToRead += `Serves ${recipe.servings} people. `;
    
    if (activeTab === 'ingredients') {
      textToRead += 'Ingredients: ';
      recipe.ingredients.forEach((ingredient, index) => {
        textToRead += `${index + 1}. ${ingredient}. `;
      });
    } else if (activeTab === 'instructions') {
      textToRead += 'Cooking instructions: ';
      recipe.instructions.forEach((instruction, index) => {
        textToRead += `Step ${index + 1}. ${instruction}. `;
      });
    } else if (activeTab === 'nutrition') {
      textToRead += 'Nutritional information: ';
      if (recipe.nutrition) {
        textToRead += `Calories: ${recipe.nutrition.calories}. `;
        textToRead += `Protein: ${recipe.nutrition.protein}. `;
        textToRead += `Carbohydrates: ${recipe.nutrition.carbs}. `;
        textToRead += `Fat: ${recipe.nutrition.fat}. `;
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsReading(true);
    };

    utterance.onend = () => {
      setIsReading(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsReading(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
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
      const newItems = recipe.ingredients.map(ingredient => ({
        id: Date.now() + Math.random(),
        text: ingredient,
        completed: false,
        addedFrom: recipe.name,
        addedAt: new Date().toISOString()
      }));

      // Combine with existing items
      const updatedGroceryList = [...groceryList, ...newItems];
      localStorage.setItem('groceryList', JSON.stringify(updatedGroceryList));

      alert(`Added ${recipe.ingredients.length} ingredients to your grocery list!`);
    } catch (error) {
      console.error('Error adding to grocery list:', error);
      alert('Error adding ingredients to grocery list. Please try again.');
    }
  };

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

  // Check if recipe is already saved and load existing rating when modal opens
  useEffect(() => {
    if (recipe && isOpen) {
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
  }, [recipe, isOpen]);

  if (!recipe) return null;

  const formatTime = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative">
              <img
                {...getImageProps(recipe.image, recipe.name)}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <FiX size={24} />
              </button>

              {/* Voice control button */}
              <button
                onClick={handleVoiceToggle}
                className={`absolute top-4 left-4 backdrop-blur-sm rounded-full p-2 text-white transition-colors ${
                  isReading 
                    ? 'bg-red-500/80 hover:bg-red-600/80' 
                    : 'bg-blue-500/80 hover:bg-blue-600/80'
                }`}
              >
                {isReading ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
              </button>

              {/* Recipe title and info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-3xl font-bold mb-2">{recipe.name}</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <FiUser size={16} />
                    {recipe.chef}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={16} />
                    {formatTime(recipe.cookingTime)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers size={16} />
                    {recipe.servings} servings
                  </span>
                  <span className="flex items-center gap-1">
                    <FiStar size={16} />
                    {recipe.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="p-6 pb-0">
              {/* Description */}
              {recipe.description && (
                <p className="text-gray-600 mb-6">{recipe.description}</p>
              )}

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                {[
                  { id: 'ingredients', label: 'Ingredients' },
                  { id: 'instructions', label: 'Instructions' },
                  { id: 'nutrition', label: 'Nutrition' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              </div>

              {/* Scrollable Tab Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 modal-scrollbar">
                <div className="min-h-0">
                  {activeTab === 'ingredients' && (
                    <div className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 font-medium">{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'instructions' && (
                    <div className="space-y-4">
                      {recipe.instructions && recipe.instructions.length > 0 ? (
                        recipe.instructions.map((instruction, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed font-medium">{instruction}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No cooking instructions available for this recipe.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'nutrition' && (
                    <div className="space-y-6">
                      {/* Nutrition Information */}
                      <div className="grid grid-cols-2 gap-4">
                        {recipe.nutrition ? (
                          Object.entries(recipe.nutrition).map(([key, value]) => (
                            <div key={key} className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                              <div className="text-sm text-gray-600 capitalize font-medium">{key}</div>
                              <div className="text-lg font-bold text-gray-900">{value}</div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8">
                            <p className="text-gray-500">Nutrition information not available for this recipe.</p>
                          </div>
                        )}
                      </div>

                      {/* Rating Section - Always Visible */}
                      <div className="border-t border-gray-200 pt-6 mt-6">
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
                  )}
                </div>
              </div>

              {/* Fixed Action Buttons */}
              <div className="border-t border-gray-200 p-6 bg-white">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSaveRecipe}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                      isSaved
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white'
                    }`}
                  >
                    <FiHeart size={18} />
                    {isSaved ? 'Remove from Saved' : 'Save Recipe'}
                  </button>

                  <button
                    onClick={handleAddToGroceryList}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FiShoppingCart size={18} />
                    Add to Grocery List
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;
