// AI Recipe Generation Service
// This simulates AI-generated recipes based on user preferences
// In a real application, you would integrate with OpenAI, Gemini, or another AI service

const RECIPE_TEMPLATES = {
  vegetarian: [
    {
      name: "Mediterranean Quinoa Bowl",
      ingredients: ["quinoa", "chickpeas", "cucumber", "tomatoes", "feta cheese", "olive oil", "lemon"],
      cookTime: "25 min",
      calories: 420,
      protein: "18g",
      description: "A nutritious bowl packed with Mediterranean flavors"
    },
    {
      name: "Spinach and Mushroom Risotto",
      ingredients: ["arborio rice", "spinach", "mushrooms", "vegetable broth", "parmesan", "white wine"],
      cookTime: "35 min",
      calories: 380,
      protein: "12g",
      description: "Creamy risotto with fresh spinach and earthy mushrooms"
    },
    {
      name: "Caprese Stuffed Portobello",
      ingredients: ["portobello mushrooms", "mozzarella", "tomatoes", "basil", "balsamic glaze"],
      cookTime: "20 min",
      calories: 290,
      protein: "16g",
      description: "Italian-inspired stuffed mushrooms with fresh mozzarella"
    },
    {
      name: "Vegetarian Breakfast Burrito",
      ingredients: ["eggs", "black beans", "cheese", "bell peppers", "onions", "tortilla", "avocado"],
      cookTime: "15 min",
      calories: 350,
      protein: "20g",
      description: "Protein-packed breakfast burrito with fresh vegetables"
    },
    {
      name: "Greek Yogurt Parfait",
      ingredients: ["greek yogurt", "granola", "berries", "honey", "almonds"],
      cookTime: "5 min",
      calories: 280,
      protein: "15g",
      description: "Healthy breakfast parfait with protein and probiotics"
    },
    {
      name: "Margherita Pizza",
      ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil", "olive oil"],
      cookTime: "30 min",
      calories: 450,
      protein: "18g",
      description: "Classic Italian pizza with fresh basil and mozzarella"
    }
  ],
  vegan: [
    {
      name: "Buddha Bowl with Tahini Dressing",
      ingredients: ["brown rice", "roasted vegetables", "chickpeas", "avocado", "tahini", "lemon"],
      cookTime: "30 min",
      calories: 450,
      protein: "15g",
      description: "Colorful bowl with roasted vegetables and creamy tahini"
    },
    {
      name: "Lentil Curry with Coconut Rice",
      ingredients: ["red lentils", "coconut milk", "curry spices", "jasmine rice", "spinach"],
      cookTime: "40 min",
      calories: 520,
      protein: "22g",
      description: "Warming curry with protein-rich lentils"
    },
    {
      name: "Jackfruit Tacos",
      ingredients: ["young jackfruit", "corn tortillas", "avocado", "lime", "cilantro", "red cabbage"],
      cookTime: "25 min",
      calories: 380,
      protein: "12g",
      description: "Plant-based tacos with pulled jackfruit"
    },
    {
      name: "Overnight Oats with Berries",
      ingredients: ["oats", "almond milk", "chia seeds", "berries", "maple syrup", "vanilla"],
      cookTime: "5 min",
      calories: 320,
      protein: "12g",
      description: "Make-ahead breakfast with fiber and plant protein"
    },
    {
      name: "Quinoa Stuffed Bell Peppers",
      ingredients: ["quinoa", "bell peppers", "black beans", "corn", "tomatoes", "nutritional yeast"],
      cookTime: "45 min",
      calories: 380,
      protein: "16g",
      description: "Colorful peppers stuffed with protein-rich quinoa"
    },
    {
      name: "Vegan Pad Thai",
      ingredients: ["rice noodles", "tofu", "bean sprouts", "peanuts", "lime", "tamarind sauce"],
      cookTime: "20 min",
      calories: 420,
      protein: "18g",
      description: "Classic Thai noodles with plant-based protein"
    }
  ],
  keto: [
    {
      name: "Zucchini Lasagna",
      ingredients: ["zucchini", "ground turkey", "ricotta", "mozzarella", "marinara sauce"],
      cookTime: "45 min",
      calories: 420,
      protein: "35g",
      description: "Low-carb lasagna with zucchini noodles"
    },
    {
      name: "Salmon with Cauliflower Mash",
      ingredients: ["salmon fillet", "cauliflower", "butter", "garlic", "herbs"],
      cookTime: "30 min",
      calories: 480,
      protein: "40g",
      description: "Omega-3 rich salmon with creamy cauliflower"
    },
    {
      name: "Chicken Caesar Salad Bowl",
      ingredients: ["grilled chicken", "romaine lettuce", "parmesan", "caesar dressing", "avocado"],
      cookTime: "15 min",
      calories: 390,
      protein: "42g",
      description: "Classic Caesar salad with extra protein"
    }
  ],
  paleo: [
    {
      name: "Herb-Crusted Lamb Chops",
      ingredients: ["lamb chops", "rosemary", "thyme", "garlic", "sweet potato", "asparagus"],
      cookTime: "35 min",
      calories: 520,
      protein: "45g",
      description: "Tender lamb with roasted vegetables"
    },
    {
      name: "Coconut Curry Chicken",
      ingredients: ["chicken thighs", "coconut milk", "curry powder", "vegetables", "cauliflower rice"],
      cookTime: "40 min",
      calories: 460,
      protein: "38g",
      description: "Rich curry with coconut milk and vegetables"
    },
    {
      name: "Stuffed Bell Peppers",
      ingredients: ["bell peppers", "ground beef", "onions", "tomatoes", "herbs"],
      cookTime: "50 min",
      calories: 380,
      protein: "32g",
      description: "Colorful peppers stuffed with seasoned beef"
    }
  ],
  mediterranean: [
    {
      name: "Greek Chicken Souvlaki",
      ingredients: ["chicken breast", "olive oil", "lemon", "oregano", "tzatziki", "pita bread"],
      cookTime: "25 min",
      calories: 450,
      protein: "40g",
      description: "Traditional Greek skewers with tzatziki"
    },
    {
      name: "Seafood Paella",
      ingredients: ["arborio rice", "shrimp", "mussels", "saffron", "bell peppers", "peas"],
      cookTime: "45 min",
      calories: 520,
      protein: "35g",
      description: "Spanish rice dish with fresh seafood"
    },
    {
      name: "Moussaka",
      ingredients: ["eggplant", "ground lamb", "bechamel sauce", "tomatoes", "onions"],
      cookTime: "60 min",
      calories: 480,
      protein: "28g",
      description: "Layered Greek casserole with eggplant"
    }
  ]
};

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Simulate AI recipe generation with realistic delay
const simulateAIDelay = () => new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

export const aiService = {
  // Generate a full week meal plan based on preferences
  generateWeeklyMealPlan: async (preferences) => {
    await simulateAIDelay();
    
    const mealPlan = {};
    
    DAYS_OF_WEEK.forEach(day => {
      mealPlan[day] = {};
      MEAL_TYPES.forEach(mealType => {
        mealPlan[day][mealType] = generateRecipeForMeal(preferences, mealType);
      });
    });
    
    return mealPlan;
  },

  // Generate recipes for a specific day
  generateDayMealPlan: async (preferences, day) => {
    await simulateAIDelay();
    
    const dayPlan = {};
    MEAL_TYPES.forEach(mealType => {
      dayPlan[mealType] = generateRecipeForMeal(preferences, mealType);
    });
    
    return { [day]: dayPlan };
  },

  // Generate a single recipe for a specific meal
  generateSingleMeal: async (preferences, mealType) => {
    await simulateAIDelay();
    return generateRecipeForMeal(preferences, mealType);
  }
};

// Helper function to generate a recipe based on preferences and meal type
function generateRecipeForMeal(preferences, mealType) {
  const { dietType, allergies, calorieGoal, cuisinePreferences } = preferences;

  // Start with recipes based on diet type
  let availableRecipes = [...(RECIPE_TEMPLATES[dietType] || RECIPE_TEMPLATES.mediterranean)];

  // Add cuisine-specific recipes if preferences match
  if (cuisinePreferences && cuisinePreferences.length > 0) {
    cuisinePreferences.forEach(cuisine => {
      if (RECIPE_TEMPLATES[cuisine]) {
        availableRecipes = [...availableRecipes, ...RECIPE_TEMPLATES[cuisine]];
      }
    });
  }

  // Remove duplicates based on recipe name
  availableRecipes = availableRecipes.filter((recipe, index, self) =>
    index === self.findIndex(r => r.name === recipe.name)
  );

  // Filter out recipes with allergens
  if (allergies && allergies.length > 0) {
    availableRecipes = availableRecipes.filter(recipe => {
      return !allergies.some(allergen =>
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(allergen.toLowerCase())
        )
      );
    });
  }

  // Ensure we have recipes available
  if (availableRecipes.length === 0) {
    availableRecipes = RECIPE_TEMPLATES.mediterranean; // Fallback
  }

  // Select a random recipe
  const selectedRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];

  // Adjust recipe based on meal type and calorie goals
  const adjustedRecipe = adjustRecipeForMealType(selectedRecipe, mealType, calorieGoal);

  return {
    ...adjustedRecipe,
    id: generateRecipeId(),
    mealType,
    generatedAt: new Date().toISOString(),
    dietType: dietType,
    matchesPreferences: true
  };
}

// Adjust recipe based on meal type and calorie goals
function adjustRecipeForMealType(recipe, mealType, calorieGoal) {
  let adjustedRecipe = { ...recipe };

  // Adjust portion sizes based on meal type
  const mealCalorieRatios = {
    breakfast: 0.25,
    lunch: 0.35,
    dinner: 0.40
  };

  if (calorieGoal) {
    const targetCalories = Math.round(calorieGoal * mealCalorieRatios[mealType]);
    const ratio = targetCalories / recipe.calories;

    adjustedRecipe.calories = targetCalories;
    adjustedRecipe.protein = Math.round(parseInt(recipe.protein) * ratio) + 'g';
  }

  // Add meal-specific modifications and ensure appropriate recipes for meal times
  if (mealType === 'breakfast') {
    // For breakfast, prefer lighter, morning-appropriate recipes
    const breakfastKeywords = ['oats', 'yogurt', 'eggs', 'pancakes', 'smoothie', 'toast'];
    const hasBreakfastIngredients = recipe.ingredients.some(ingredient =>
      breakfastKeywords.some(keyword => ingredient.toLowerCase().includes(keyword))
    );

    if (!hasBreakfastIngredients && !recipe.name.toLowerCase().includes('breakfast')) {
      adjustedRecipe.name = `Morning ${recipe.name}`;
      adjustedRecipe.description = `A lighter version of ${recipe.name} perfect for breakfast`;
    }
  } else if (mealType === 'lunch') {
    // For lunch, ensure it's substantial but not too heavy
    if (!recipe.name.toLowerCase().includes('lunch') && !recipe.name.toLowerCase().includes('bowl') && !recipe.name.toLowerCase().includes('salad')) {
      adjustedRecipe.name = `${recipe.name} Bowl`;
      adjustedRecipe.description = `A satisfying midday version of ${recipe.name}`;
    }
  } else if (mealType === 'dinner') {
    // For dinner, ensure it's hearty and satisfying
    if (!recipe.name.toLowerCase().includes('dinner') && recipe.calories < 400) {
      adjustedRecipe.calories = Math.max(adjustedRecipe.calories, 400);
      adjustedRecipe.description = `A hearty evening version of ${recipe.name}`;
    }
  }

  return adjustedRecipe;
}

// Generate unique recipe ID
function generateRecipeId() {
  return 'recipe_' + Math.random().toString(36).substr(2, 9);
}

export default aiService;
