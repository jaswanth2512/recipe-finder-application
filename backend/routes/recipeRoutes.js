const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Helper functions to generate unique recipe data
const getUniqueIngredients = (recipeName) => {
  const name = recipeName.toLowerCase();

  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('carbonara')) {
    return [
      '1 lb spaghetti pasta',
      '6 oz pancetta, diced',
      '4 large eggs',
      '1 cup Pecorino Romano cheese, grated',
      '1/2 cup Parmesan cheese, grated',
      'Freshly ground black pepper',
      'Salt for pasta water',
      '2 cloves garlic, minced'
    ];
  } else if (name.includes('chicken') || name.includes('grilled')) {
    return [
      '4 chicken breasts',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp paprika',
      '1/2 tsp black pepper',
      '1 tsp salt',
      '1 lemon, juiced',
      'Fresh herbs (thyme or rosemary)'
    ];
  } else if (name.includes('salad') || name.includes('caesar')) {
    return [
      '1 large romaine lettuce head',
      '1/2 cup Caesar dressing',
      '1/4 cup Parmesan cheese, grated',
      '1 cup croutons',
      '2 anchovy fillets (optional)',
      '1 lemon, juiced',
      'Freshly ground black pepper'
    ];
  } else if (name.includes('soup') || name.includes('tomato')) {
    return [
      '2 lbs fresh tomatoes',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '2 cups vegetable broth',
      '1/4 cup heavy cream',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh basil leaves'
    ];
  } else if (name.includes('pizza') || name.includes('margherita')) {
    return [
      '1 pizza dough',
      '1/2 cup pizza sauce',
      '8 oz fresh mozzarella, sliced',
      '2 large tomatoes, sliced',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt and pepper to taste'
    ];
  } else {
    // Default ingredients
    return [
      '2 cups main ingredient',
      '1 medium onion, diced',
      '2 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp salt',
      '1/2 tsp black pepper',
      '1 cup broth or water',
      'Fresh herbs for garnish'
    ];
  }
};

const getUniqueInstructions = (recipeName) => {
  const name = recipeName.toLowerCase();

  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('carbonara')) {
    return [
      'Bring a large pot of salted water to boil',
      'Cook spaghetti according to package directions until al dente',
      'While pasta cooks, dice pancetta and cook in a large skillet until crispy',
      'In a bowl, whisk together eggs, Pecorino Romano, and black pepper',
      'Drain pasta, reserving 1 cup pasta water',
      'Add hot pasta to the skillet with pancetta',
      'Remove from heat and quickly stir in egg mixture',
      'Add pasta water gradually until creamy sauce forms',
      'Serve immediately with extra cheese and black pepper'
    ];
  } else if (name.includes('chicken') || name.includes('grilled')) {
    return [
      'Preheat grill to medium-high heat',
      'Pat chicken breasts dry and season with salt and pepper',
      'Mix olive oil, garlic powder, paprika in a bowl',
      'Rub seasoning mixture all over chicken breasts',
      'Grill chicken for 6-7 minutes per side',
      'Check internal temperature reaches 165°F',
      'Let rest for 5 minutes before slicing',
      'Drizzle with lemon juice and garnish with fresh herbs'
    ];
  } else if (name.includes('salad') || name.includes('caesar')) {
    return [
      'Wash and dry romaine lettuce thoroughly',
      'Tear lettuce into bite-sized pieces',
      'Place lettuce in a large salad bowl',
      'Add Caesar dressing and toss to coat',
      'Sprinkle with Parmesan cheese',
      'Add croutons and toss gently',
      'Garnish with anchovy fillets if using',
      'Serve immediately with lemon wedges'
    ];
  } else if (name.includes('soup') || name.includes('tomato')) {
    return [
      'Heat olive oil in a large pot over medium heat',
      'Add diced onion and cook until softened, about 5 minutes',
      'Add minced garlic and cook for 1 minute',
      'Add tomatoes and cook for 10 minutes, stirring occasionally',
      'Pour in vegetable broth and bring to a boil',
      'Reduce heat and simmer for 20 minutes',
      'Blend soup until smooth using an immersion blender',
      'Stir in heavy cream and season with salt and pepper',
      'Garnish with fresh basil before serving'
    ];
  } else {
    return [
      'Prepare all ingredients and preheat oven to 375°F if needed',
      'Heat olive oil in a large pan over medium heat',
      'Add diced onion and cook until softened',
      'Add garlic and cook for 1 minute until fragrant',
      'Add main ingredients and season with salt and pepper',
      'Cook according to recipe requirements',
      'Adjust seasoning to taste',
      'Garnish with fresh herbs and serve hot'
    ];
  }
};

const getUniqueNutrition = (recipeName) => {
  const name = recipeName.toLowerCase();

  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('carbonara')) {
    return {
      calories: 520,
      protein: '22g',
      carbs: '65g',
      fat: '18g',
      fiber: '3g',
      sugar: '4g'
    };
  } else if (name.includes('chicken') || name.includes('grilled')) {
    return {
      calories: 285,
      protein: '35g',
      carbs: '2g',
      fat: '14g',
      fiber: '0g',
      sugar: '1g'
    };
  } else if (name.includes('salad') || name.includes('caesar')) {
    return {
      calories: 180,
      protein: '8g',
      carbs: '12g',
      fat: '12g',
      fiber: '4g',
      sugar: '6g'
    };
  } else if (name.includes('soup') || name.includes('tomato')) {
    return {
      calories: 150,
      protein: '4g',
      carbs: '18g',
      fat: '8g',
      fiber: '3g',
      sugar: '12g'
    };
  } else {
    return {
      calories: 250 + Math.floor(Math.random() * 200),
      protein: `${12 + Math.floor(Math.random() * 15)}g`,
      carbs: `${20 + Math.floor(Math.random() * 30)}g`,
      fat: `${5 + Math.floor(Math.random() * 15)}g`,
      fiber: `${2 + Math.floor(Math.random() * 6)}g`,
      sugar: `${3 + Math.floor(Math.random() * 10)}g`
    };
  }
};

// @route   GET /api/recipes/search
// @desc    Search recipes with filters (works with your MongoDB structure)
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const {
      query = '',
      types = [],
      ratings = [],
      minTime = 0,
      maxTime = 120,
      page = 1,
      limit = 12,
      searchType = 'all' // 'all', 'ingredients', 'name'
    } = req.query;

    console.log('Search request:', { query, searchType, types, ratings, minTime, maxTime });

    // Build search query
    let searchQuery = {};

    // Text search based on search type
    if (query && query.trim() !== '') {
      if (searchType === 'ingredients') {
        // Search specifically in ingredients array
        searchQuery.ingredients = { $regex: query, $options: 'i' };
      } else if (searchType === 'name') {
        // Search specifically in recipe name
        searchQuery.name = { $regex: query, $options: 'i' };
      } else {
        // Search only in recipe name and chef (not ingredients)
        searchQuery.$or = [
          { name: { $regex: query, $options: 'i' } },
          { chef: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ];
      }
    }

    // Type filter
    if (types && types.length > 0) {
      const typeArray = Array.isArray(types) ? types : [types];
      searchQuery.type = { $in: typeArray };
    }

    // Rating filter
    if (ratings && ratings.length > 0) {
      const ratingArray = Array.isArray(ratings) ? ratings.map(Number) : [Number(ratings)];
      const minRating = Math.min(...ratingArray);
      searchQuery.rating = { $gte: minRating };
    }

    // Time filter
    if (minTime > 0 || maxTime < 120) {
      searchQuery.cookingTime = {
        $gte: Number(minTime),
        $lte: Number(maxTime)
      };
    }

    console.log('MongoDB query:', JSON.stringify(searchQuery, null, 2));

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute search
    const recipes = await Recipe.find(searchQuery)
      .select('name image chef cookingTime rating type description nutrition servings difficulty ingredients steps instructions')
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    console.log(`Found ${recipes.length} recipes`);

    // Get total count for pagination
    const total = await Recipe.countDocuments(searchQuery);

    // Transform data to ensure compatibility
    const transformedRecipes = recipes.map(recipe => ({
      _id: recipe._id,
      name: recipe.name,
      image: recipe.image || `https://source.unsplash.com/600x400/?${recipe.name.replace(/\s+/g, '+')},food`,
      chef: recipe.chef || 'Unknown Chef',
      cookingTime: recipe.cookingTime || 30,
      rating: recipe.rating || 4.0,
      type: recipe.type || 'General',
      description: recipe.description || 'A delicious recipe',
      nutrition: recipe.nutrition || {
        calories: 250,
        protein: '15g',
        carbs: '30g',
        fat: '8g',
        fiber: '2g',
        sugar: '5g'
      },
      servings: recipe.servings || 4,
      difficulty: recipe.difficulty || 'Medium'
    }));

    res.json(transformedRecipes);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      message: 'Error searching recipes',
      error: error.message
    });
  }
});

// @route   GET /api/recipes/:id
// @desc    Get detailed recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Transform data to ensure all fields are present
    const detailedRecipe = {
      _id: recipe._id,
      name: recipe.name,
      description: recipe.description,
      image: recipe.image || `https://source.unsplash.com/600x400/?${recipe.name.replace(/\s+/g, '+')},food`,
      chef: recipe.chef,
      cookingTime: recipe.cookingTime,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      type: recipe.type,
      rating: recipe.rating,
      ingredients: recipe.ingredients || getUniqueIngredients(recipe.name),
      instructions: recipe.instructions || recipe.steps || getUniqueInstructions(recipe.name),
      nutrition: recipe.nutrition || getUniqueNutrition(recipe.name),
      tags: recipe.tags || [],
      cuisine: recipe.cuisine
    };

    res.json(detailedRecipe);

  } catch (error) {
    console.error('Recipe detail error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(500).json({
      message: 'Error fetching recipe details',
      error: error.message
    });
  }
});

// @route   GET /api/recipes
// @desc    Get all recipes (with pagination)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const recipes = await Recipe.find()
      .select('name image chef cookingTime rating type description')
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Recipe.countDocuments();

    const transformedRecipes = recipes.map(recipe => ({
      _id: recipe._id,
      name: recipe.name,
      image: recipe.image || `https://source.unsplash.com/600x400/?${recipe.name.replace(/\s+/g, '+')},food`,
      chef: recipe.chef,
      cookingTime: recipe.cookingTime,
      rating: recipe.rating,
      type: recipe.type,
      description: recipe.description
    }));

    res.json(transformedRecipes);

  } catch (error) {
    console.error('Recipes fetch error:', error);
    res.status(500).json({
      message: 'Error fetching recipes',
      error: error.message
    });
  }
});

// @route   GET /api/recipes/search-by-ingredients
// @desc    Search recipes specifically by ingredients
// @access  Public
router.get('/search-by-ingredients', async (req, res) => {
  try {
    const {
      ingredients = '',
      types = [],
      ratings = [],
      minTime = 0,
      maxTime = 120,
      page = 1,
      limit = 12
    } = req.query;

    console.log('Ingredient search request:', { ingredients, types, ratings, minTime, maxTime });

    if (!ingredients || ingredients.trim() === '') {
      return res.status(400).json({ message: 'Ingredients parameter is required' });
    }

    // Split ingredients by comma and create search query
    const ingredientList = ingredients.split(',').map(ing => ing.trim()).filter(ing => ing.length > 0);

    // Build search query to find recipes containing any of the specified ingredients
    let searchQuery = {
      $or: ingredientList.map(ingredient => ({
        ingredients: { $regex: ingredient, $options: 'i' }
      }))
    };

    // Add filters
    // Type filter
    if (types && types.length > 0) {
      const typeArray = Array.isArray(types) ? types : [types];
      searchQuery.type = { $in: typeArray };
    }

    // Rating filter
    if (ratings && ratings.length > 0) {
      const ratingArray = Array.isArray(ratings) ? ratings.map(Number) : [Number(ratings)];
      const minRating = Math.min(...ratingArray);
      searchQuery.rating = { $gte: minRating };
    }

    // Time filter
    if (minTime > 0 || maxTime < 120) {
      searchQuery.cookingTime = {
        $gte: Number(minTime),
        $lte: Number(maxTime)
      };
    }

    console.log('Ingredient search query:', JSON.stringify(searchQuery, null, 2));

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute search
    const recipes = await Recipe.find(searchQuery)
      .select('name image chef cookingTime rating type description nutrition servings difficulty ingredients')
      .sort({ rating: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    console.log(`Found ${recipes.length} recipes with ingredients: ${ingredients}`);

    // Transform data
    const transformedRecipes = recipes.map(recipe => ({
      _id: recipe._id,
      name: recipe.name,
      image: recipe.image || `https://source.unsplash.com/600x400/?${recipe.name.replace(/\s+/g, '+')},food`,
      chef: recipe.chef || 'Unknown Chef',
      cookingTime: recipe.cookingTime || 30,
      rating: recipe.rating || 4.0,
      type: recipe.type || 'General',
      description: recipe.description || 'A delicious recipe',
      nutrition: recipe.nutrition || {
        calories: 250,
        protein: '15g',
        carbs: '30g',
        fat: '8g'
      },
      servings: recipe.servings || 4,
      difficulty: recipe.difficulty || 'Medium',
      ingredients: recipe.ingredients || [],
      // Highlight which ingredients match
      matchedIngredients: ingredientList.filter(searchIng =>
        recipe.ingredients.some(recipeIng =>
          recipeIng.toLowerCase().includes(searchIng.toLowerCase())
        )
      )
    }));

    res.json({
      recipes: transformedRecipes,
      searchedIngredients: ingredientList,
      totalFound: recipes.length
    });

  } catch (error) {
    console.error('Ingredient search error:', error);
    res.status(500).json({
      message: 'Error searching recipes by ingredients',
      error: error.message
    });
  }
});

module.exports = router;
