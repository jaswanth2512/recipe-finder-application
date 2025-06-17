const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return testRecipeAPI();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function testRecipeAPI() {
  try {
    console.log('\n🔍 Testing Recipe API...');
    
    // Test 1: Get all recipes
    console.log('\n1. Fetching all recipes:');
    const allRecipes = await Recipe.find().limit(5);
    console.log(`Found ${allRecipes.length} recipes`);
    
    allRecipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.name} - ${recipe.chef} - Rating: ${recipe.rating}`);
    });
    
    // Test 2: Get specific recipe (Chocolate Cake)
    console.log('\n2. Looking for Chocolate Cake:');
    const chocolateCake = await Recipe.findOne({ name: /chocolate/i });
    
    if (chocolateCake) {
      console.log('✅ Found Chocolate Cake:');
      console.log(`Name: ${chocolateCake.name}`);
      console.log(`Chef: ${chocolateCake.chef}`);
      console.log(`Rating: ${chocolateCake.rating}`);
      console.log(`Cooking Time: ${chocolateCake.cookingTime} min`);
      console.log(`Ingredients: ${chocolateCake.ingredients.length} items`);
      console.log(`Instructions: ${chocolateCake.instructions.length} steps`);
    } else {
      console.log('❌ Chocolate Cake not found');
    }
    
    // Test 3: Test the API endpoint format
    console.log('\n3. Testing API endpoint format:');
    const apiFormatRecipes = await Recipe.find()
      .select('name image chef cookingTime rating type description nutrition servings difficulty ingredients instructions')
      .limit(4);
    
    console.log('API Format Recipes:');
    apiFormatRecipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.name}`);
      console.log(`   Image: ${recipe.image ? 'Yes' : 'No'}`);
      console.log(`   Chef: ${recipe.chef}`);
      console.log(`   Time: ${recipe.cookingTime} min`);
      console.log(`   Rating: ${recipe.rating}`);
    });
    
  } catch (error) {
    console.error('❌ Test error:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}
