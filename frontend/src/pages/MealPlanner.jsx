import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft, FiCalendar, FiClock, FiUsers, FiStar, FiPlus,
  FiRefreshCw, FiSettings, FiCheck, FiLoader, FiChevronDown,
  FiSave, FiHeart, FiX
} from "react-icons/fi";
import { aiService } from "../services/aiService";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["breakfast", "lunch", "dinner"];

const DIET_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian", description: "Plant-based with dairy and eggs" },
  { value: "vegan", label: "Vegan", description: "100% plant-based" },
  { value: "keto", label: "Keto", description: "Low-carb, high-fat" },
  { value: "paleo", label: "Paleo", description: "Whole foods, no processed" },
  { value: "mediterranean", label: "Mediterranean", description: "Heart-healthy, balanced" }
];

const ALLERGEN_OPTIONS = [
  "nuts", "dairy", "eggs", "soy", "gluten", "shellfish", "fish"
];

const CUISINE_OPTIONS = [
  "italian", "asian", "mexican", "indian", "mediterranean", "american"
];

const MealPlanner = () => {
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [regeneratingDay, setRegeneratingDay] = useState(null);
  const [regeneratingMeal, setRegeneratingMeal] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // User preferences state
  const [preferences, setPreferences] = useState({
    dietType: "mediterranean",
    allergies: [],
    calorieGoal: 2000,
    cuisinePreferences: [],
    mealsPerDay: 3
  });

  // Load saved preferences on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("mealPlannerPreferences");
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("mealPlannerPreferences", JSON.stringify(newPreferences));
  };

  // Generate weekly meal plan
  const generateWeeklyPlan = async () => {
    setIsGenerating(true);
    try {
      const plan = await aiService.generateWeeklyMealPlan(preferences);
      setMealPlan(plan);
      setShowPreferences(false);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      alert("Failed to generate meal plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate specific day
  const regenerateDay = async (day) => {
    setRegeneratingDay(day);
    try {
      const newDayPlan = await aiService.generateDayMealPlan(preferences, day);
      setMealPlan(prev => ({
        ...prev,
        ...newDayPlan
      }));
    } catch (error) {
      console.error("Error regenerating day:", error);
      alert("Failed to regenerate day. Please try again.");
    } finally {
      setRegeneratingDay(null);
    }
  };

  // Regenerate specific meal
  const regenerateMeal = async (day, mealType) => {
    setRegeneratingMeal(`${day}-${mealType}`);
    try {
      const newMeal = await aiService.generateSingleMeal(preferences, mealType);
      setMealPlan(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: newMeal
        }
      }));
    } catch (error) {
      console.error("Error regenerating meal:", error);
      alert("Failed to regenerate meal. Please try again.");
    } finally {
      setRegeneratingMeal(null);
    }
  };

  // Calculate weekly totals
  const getWeeklyTotals = () => {
    if (!mealPlan) return { calories: 0, protein: 0 };

    let totalCalories = 0;
    let totalProtein = 0;

    DAYS_OF_WEEK.forEach(day => {
      MEAL_TYPES.forEach(mealType => {
        if (mealPlan[day] && mealPlan[day][mealType]) {
          totalCalories += mealPlan[day][mealType].calories || 0;
          totalProtein += parseInt(mealPlan[day][mealType].protein) || 0;
        }
      });
    });

    return { calories: totalCalories, protein: totalProtein };
  };

  const weeklyTotals = getWeeklyTotals();

  if (showPreferences) {
    return <PreferencesSetup
      preferences={preferences}
      onSave={savePreferences}
      onGenerate={generateWeeklyPlan}
      isGenerating={isGenerating}
    />;
  }

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
            AI Meal Planner
          </span>
        </div>
        <button
          onClick={() => setShowPreferences(true)}
          className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
        >
          <FiSettings size={20} />
          <span className="hidden sm:block">Preferences</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Weekly Summary */}
        <div className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-2xl shadow-lg p-8 mb-8 border border-amber-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Weekly Meal Plan</h1>
              <p className="text-gray-600">AI-generated based on your {preferences.dietType} preferences</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize">
                  {preferences.dietType}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {preferences.calorieGoal} cal/day
                </span>
                {preferences.allergies.length > 0 && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    {preferences.allergies.length} allergen{preferences.allergies.length > 1 ? 's' : ''} avoided
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{weeklyTotals.calories}</div>
                <div className="text-sm text-gray-500">Weekly Calories</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-pink-600">{weeklyTotals.protein}g</div>
                <div className="text-sm text-gray-500">Weekly Protein</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-green-600">{Math.round(weeklyTotals.calories / 7)}</div>
                <div className="text-sm text-gray-500">Avg Daily Calories</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-purple-600">21</div>
                <div className="text-sm text-gray-500">Total Meals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Meal Plan Grid */}
        {mealPlan && (
          <div className="space-y-8">
            {/* Desktop View - Weekly Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-8 gap-4">
                {/* Header Row */}
                <div className="col-span-1"></div>
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="text-center">
                    <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white p-3 rounded-t-xl">
                      <h3 className="font-bold text-sm">{day.slice(0, 3)}</h3>
                    </div>
                    <div className="bg-white p-2 rounded-b-xl shadow-sm border-x border-b border-gray-100">
                      <button
                        onClick={() => regenerateDay(day)}
                        disabled={regeneratingDay === day}
                        className="w-full p-2 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 text-xs text-gray-600"
                        title="Regenerate entire day"
                      >
                        {regeneratingDay === day ? (
                          <FiLoader className="animate-spin mx-auto" size={14} />
                        ) : (
                          <>
                            <FiRefreshCw className="mx-auto mb-1" size={14} />
                            Regenerate
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Meal Rows */}
                {MEAL_TYPES.map((mealType) => (
                  <React.Fragment key={mealType}>
                    <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 capitalize text-sm">{mealType}</h4>
                    </div>
                    {DAYS_OF_WEEK.map((day) => {
                      const meal = mealPlan[day]?.[mealType];
                      const isRegenerating = regeneratingMeal === `${day}-${mealType}`;

                      return (
                        <motion.div
                          key={`${day}-${mealType}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
                        >
                          {meal ? (
                            <>
                              <div className="flex justify-between items-start mb-2">
                                <button
                                  onClick={() => setSelectedRecipe(meal)}
                                  className="text-left flex-1 hover:text-amber-600 transition-colors"
                                >
                                  <h5 className="font-medium text-gray-900 text-sm leading-tight mb-1">{meal.name}</h5>
                                </button>
                                <button
                                  onClick={() => regenerateMeal(day, mealType)}
                                  disabled={isRegenerating}
                                  className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 ml-2"
                                  title={`Regenerate ${mealType}`}
                                >
                                  {isRegenerating ? (
                                    <FiLoader className="animate-spin" size={12} />
                                  ) : (
                                    <FiRefreshCw size={12} />
                                  )}
                                </button>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>{meal.calories} cal</span>
                                  <span>{meal.protein}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                  <FiClock size={10} className="mr-1" />
                                  {meal.cookTime}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-400 text-xs">Loading...</div>
                          )}
                        </motion.div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Mobile View - Day Cards */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {DAYS_OF_WEEK.map((day) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-amber-500 to-pink-500 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{day}</h3>
                      <button
                        onClick={() => regenerateDay(day)}
                        disabled={regeneratingDay === day}
                        className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
                        title="Regenerate entire day"
                      >
                        {regeneratingDay === day ? (
                          <FiLoader className="animate-spin" size={16} />
                        ) : (
                          <FiRefreshCw size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Meals */}
                  <div className="p-4 space-y-4">
                    {MEAL_TYPES.map((mealType) => {
                      const meal = mealPlan[day]?.[mealType];
                      const isRegenerating = regeneratingMeal === `${day}-${mealType}`;

                      return (
                        <div key={mealType} className="border border-gray-100 rounded-lg p-3 hover:border-amber-200 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800 capitalize">{mealType}</h4>
                            <button
                              onClick={() => regenerateMeal(day, mealType)}
                              disabled={isRegenerating}
                              className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                              title={`Regenerate ${mealType}`}
                            >
                              {isRegenerating ? (
                                <FiLoader className="animate-spin" size={14} />
                              ) : (
                                <FiRefreshCw size={14} />
                              )}
                            </button>
                          </div>

                          {meal ? (
                            <>
                              <button
                                onClick={() => setSelectedRecipe(meal)}
                                className="text-left w-full hover:text-amber-600 transition-colors"
                              >
                                <h5 className="font-medium text-gray-900 mb-1">{meal.name}</h5>
                                <p className="text-xs text-gray-500 mb-2">{meal.description}</p>
                              </button>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded">{meal.calories} cal</span>
                                <span className="bg-pink-50 text-pink-700 px-2 py-1 rounded">{meal.protein}</span>
                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center">
                                  <FiClock size={10} className="mr-1" />{meal.cookTime}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-400 text-sm">Loading...</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <RecipeDetailModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Preferences Setup Component
const PreferencesSetup = ({ preferences, onSave, onGenerate, isGenerating }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localPreferences);
    onGenerate();
  };

  const toggleAllergen = (allergen) => {
    setLocalPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergen)
        ? prev.allergies.filter(a => a !== allergen)
        : [...prev.allergies, allergen]
    }));
  };

  const toggleCuisine = (cuisine) => {
    setLocalPreferences(prev => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(cuisine)
        ? prev.cuisinePreferences.filter(c => c !== cuisine)
        : [...prev.cuisinePreferences, cuisine]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="px-6 py-4 flex items-center bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">SR</span>
          </div>
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-pink-600">
            Meal Planner Setup
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Your Preferences</h1>
          <p className="text-gray-600 mb-8">Tell us about your dietary preferences so we can create the perfect meal plan for you.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Diet Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">Diet Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DIET_OPTIONS.map((diet) => (
                  <button
                    key={diet.value}
                    type="button"
                    onClick={() => setLocalPreferences(prev => ({ ...prev, dietType: diet.value }))}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      localPreferences.dietType === diet.value
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{diet.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{diet.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calorie Goal */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">Daily Calorie Goal</label>
              <input
                type="range"
                min="1200"
                max="3000"
                step="100"
                value={localPreferences.calorieGoal}
                onChange={(e) => setLocalPreferences(prev => ({ ...prev, calorieGoal: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1200 cal</span>
                <span className="font-semibold text-amber-600">{localPreferences.calorieGoal} cal</span>
                <span>3000 cal</span>
              </div>
            </div>

            {/* Allergies */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">Allergies & Restrictions</label>
              <div className="flex flex-wrap gap-3">
                {ALLERGEN_OPTIONS.map((allergen) => (
                  <button
                    key={allergen}
                    type="button"
                    onClick={() => toggleAllergen(allergen)}
                    className={`px-4 py-2 rounded-full border transition-all capitalize ${
                      localPreferences.allergies.includes(allergen)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-red-300'
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            {/* Cuisine Preferences */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">Preferred Cuisines</label>
              <div className="flex flex-wrap gap-3">
                {CUISINE_OPTIONS.map((cuisine) => (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => toggleCuisine(cuisine)}
                    className={`px-4 py-2 rounded-full border transition-all capitalize ${
                      localPreferences.cuisinePreferences.includes(cuisine)
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-300 hover:border-amber-300'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 hover:shadow-lg'
                }`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <FiLoader className="animate-spin" size={20} />
                    Generating Your Meal Plan...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FiStar size={20} />
                    Generate My Meal Plan
                  </div>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// Recipe Detail Modal Component
const RecipeDetailModal = ({ recipe, onClose }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
            {recipe.dietType && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium capitalize">
                {recipe.dietType}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">{recipe.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="capitalize">{recipe.mealType}</span>
            <span>•</span>
            <span>Generated by AI</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-4"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
          <FiClock className="mx-auto mb-2 text-amber-600" size={24} />
          <div className="font-semibold text-gray-900">{recipe.cookTime}</div>
          <div className="text-sm text-gray-600">Cook Time</div>
        </div>
        <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-100">
          <FiHeart className="mx-auto mb-2 text-pink-600" size={24} />
          <div className="font-semibold text-gray-900">{recipe.calories}</div>
          <div className="text-sm text-gray-600">Calories</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
          <FiStar className="mx-auto mb-2 text-green-600" size={24} />
          <div className="font-semibold text-gray-900">{recipe.protein}</div>
          <div className="text-sm text-gray-600">Protein</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
          <FiUsers className="mx-auto mb-2 text-blue-600" size={24} />
          <div className="font-semibold text-gray-900">1</div>
          <div className="text-sm text-gray-600">Serving</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiCheck className="text-green-500" />
          Ingredients ({recipe.ingredients.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-700 capitalize font-medium">{ingredient}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-xl p-6 mb-6 border border-amber-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Cooking Instructions</h3>
        <p className="text-gray-600 leading-relaxed">
          This is an AI-generated recipe based on your dietary preferences.
          For detailed cooking instructions, we recommend consulting similar recipes
          or cooking resources. The ingredients and nutritional information are
          tailored to your {recipe.dietType} diet requirements.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onClose}
          className="flex-1 py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Close
        </button>
        <button className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-pink-500 text-white rounded-xl hover:from-amber-600 hover:to-pink-600 transition-all font-medium shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-center gap-2">
            <FiHeart size={18} />
            Save Recipe
          </div>
        </button>
      </div>
    </div>
  );
};

export default MealPlanner;
