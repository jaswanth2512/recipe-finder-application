const Recipe = require("../models/Recipe"); // ✅ Add this line!

// GET /api/recipes/search/:name
exports.searchByName = async (req, res) => {
  const { name } = req.params;
  try {
    const recipes = await Recipe.find({
      name: { $regex: name, $options: "i" }
    });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// POST /api/recipes/search/ingredients
exports.searchByIngredients = async (req, res) => {
  const { ingredients } = req.body; // expect array: ["egg", "milk"]
  try {
    const recipes = await Recipe.find({
      ingredients: { $in: ingredients.map(i => i.toLowerCase()) }
    });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
