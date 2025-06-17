const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /api/recipes - Get all recipes with optional search and filters
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      type, 
      difficulty, 
      cuisine, 
      limit = 20, 
      page = 1,
      featured = false 
    } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Filter by cuisine
    if (cuisine) {
      query.cuisine = cuisine;
    }

    // Build the aggregation pipeline
    let pipeline = [
      { $match: query }
    ];

    // Add search score if searching
    if (search) {
      pipeline.push({ $addFields: { score: { $meta: "textScore" } } });
      pipeline.push({ $sort: { score: { $meta: "textScore" }, rating: -1 } });
    } else {
      pipeline.push({ $sort: { rating: -1, createdAt: -1 } });
    }

    // For featured recipes, get top-rated ones
    if (featured === 'true') {
      pipeline.push({ $match: { rating: { $gte: 4.5 } } });
      pipeline.push({ $limit: 4 });
    } else {
      // Pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: parseInt(limit) });
    }

    const recipes = await Recipe.aggregate(pipeline);

    // Get total count for pagination
    const totalCount = await Recipe.countDocuments(query);

    res.json({
      success: true,
      data: recipes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalRecipes: totalCount,
        hasNext: parseInt(page) * parseInt(limit) < totalCount,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recipes',
      error: error.message
    });
  }
});

// GET /api/recipes/:id - Get single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({
      success: true,
      data: recipe
    });

  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recipe',
      error: error.message
    });
  }
});

// GET /api/recipes/search/ingredients - Search recipes by ingredients
router.get('/search/ingredients', async (req, res) => {
  try {
    const { ingredients } = req.query;
    
    if (!ingredients) {
      return res.status(400).json({
        success: false,
        message: 'Ingredients parameter is required'
      });
    }

    // Split ingredients by comma and create search terms
    const ingredientList = ingredients.split(',').map(ing => ing.trim());
    
    // Create regex patterns for each ingredient
    const ingredientRegex = ingredientList.map(ing => new RegExp(ing, 'i'));
    
    const recipes = await Recipe.find({
      ingredients: { $in: ingredientRegex }
    }).sort({ rating: -1 }).limit(20);

    res.json({
      success: true,
      data: recipes,
      searchTerms: ingredientList
    });

  } catch (error) {
    console.error('Error searching recipes by ingredients:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching recipes',
      error: error.message
    });
  }
});

module.exports = router;
