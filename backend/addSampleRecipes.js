const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleRecipes = [
  {
    name: "Truffle Infused Mushroom Risotto",
    description: "A luxurious Italian risotto with wild mushrooms and truffle oil",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Alessandro",
    cookingTime: 45,
    prepTime: 15,
    servings: 4,
    difficulty: "Medium",
    type: "Italian",
    rating: 4.8,
    ingredients: [
      "2 cups Arborio rice",
      "4 cups warm chicken stock",
      "1 cup mixed wild mushrooms",
      "1/2 cup white wine",
      "1 onion, finely chopped",
      "3 cloves garlic, minced",
      "1/4 cup truffle oil",
      "1/2 cup Parmesan cheese",
      "2 tbsp butter",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat olive oil in a large pan and sauté onions until translucent",
      "Add garlic and mushrooms, cook for 3-4 minutes",
      "Add rice and stir for 2 minutes until coated",
      "Pour in white wine and stir until absorbed",
      "Add warm stock one ladle at a time, stirring constantly",
      "Continue until rice is creamy and al dente (about 20 minutes)",
      "Stir in truffle oil, butter, and Parmesan",
      "Season with salt and pepper, serve immediately"
    ],
    nutrition: {
      calories: 420,
      protein: "12g",
      carbs: "65g",
      fat: "14g",
      fiber: "3g",
      sugar: "4g"
    },
    cuisine: "Italian"
  },
  {
    name: "Mediterranean Grilled Octopus",
    description: "Tender grilled octopus with Mediterranean herbs and olive oil",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Maria",
    cookingTime: 60,
    prepTime: 30,
    servings: 2,
    difficulty: "Hard",
    type: "Mediterranean",
    rating: 4.9,
    ingredients: [
      "1 large octopus (2-3 lbs)",
      "1/4 cup olive oil",
      "2 lemons, juiced",
      "3 cloves garlic, minced",
      "1 tsp oregano",
      "1 tsp thyme",
      "1 red onion, sliced",
      "Cherry tomatoes",
      "Capers",
      "Fresh parsley"
    ],
    instructions: [
      "Clean and prepare the octopus",
      "Boil octopus in salted water for 45 minutes",
      "Remove and let cool, then cut into pieces",
      "Marinate with olive oil, lemon, garlic, and herbs",
      "Preheat grill to medium-high heat",
      "Grill octopus for 3-4 minutes per side",
      "Serve with tomatoes, onions, and capers",
      "Drizzle with remaining marinade"
    ],
    nutrition: {
      calories: 280,
      protein: "45g",
      carbs: "8g",
      fat: "12g",
      fiber: "2g",
      sugar: "3g"
    },
    cuisine: "Mediterranean"
  },
  {
    name: "Korean Spicy Tofu Stew",
    description: "Hearty Korean stew with soft tofu and vegetables",
    image: "https://images.unsplash.com/photo-1585478259715-47c06d7839f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Kim",
    cookingTime: 25,
    prepTime: 15,
    servings: 3,
    difficulty: "Easy",
    type: "Korean",
    rating: 4.6,
    ingredients: [
      "1 package soft tofu",
      "2 tbsp gochujang (Korean chili paste)",
      "1 onion, sliced",
      "2 green onions, chopped",
      "1 zucchini, sliced",
      "1 cup mushrooms",
      "2 cups vegetable broth",
      "2 cloves garlic, minced",
      "1 tbsp sesame oil",
      "1 egg (optional)"
    ],
    instructions: [
      "Heat sesame oil in a pot over medium heat",
      "Add onions and garlic, sauté until fragrant",
      "Add gochujang and stir for 1 minute",
      "Pour in vegetable broth and bring to boil",
      "Add zucchini and mushrooms, simmer 5 minutes",
      "Gently add tofu pieces",
      "Crack egg into stew if using",
      "Garnish with green onions and serve hot"
    ],
    nutrition: {
      calories: 180,
      protein: "12g",
      carbs: "15g",
      fat: "8g",
      fiber: "4g",
      sugar: "6g"
    },
    cuisine: "Korean"
  },
  {
    name: "Herb Crusted Rack of Lamb",
    description: "Elegant French-style lamb with herb crust",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Pierre",
    cookingTime: 35,
    prepTime: 20,
    servings: 4,
    difficulty: "Hard",
    type: "French",
    rating: 5.0,
    ingredients: [
      "2 racks of lamb (8 ribs each)",
      "2 tbsp Dijon mustard",
      "1 cup fresh breadcrumbs",
      "2 tbsp fresh rosemary, chopped",
      "2 tbsp fresh thyme, chopped",
      "3 cloves garlic, minced",
      "3 tbsp olive oil",
      "Salt and black pepper",
      "2 tbsp butter"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C)",
      "Season lamb racks with salt and pepper",
      "Sear lamb in hot pan for 2-3 minutes per side",
      "Brush with Dijon mustard",
      "Mix breadcrumbs, herbs, garlic, and olive oil",
      "Press herb mixture onto lamb",
      "Roast in oven for 15-20 minutes for medium-rare",
      "Let rest 5 minutes before carving"
    ],
    nutrition: {
      calories: 380,
      protein: "32g",
      carbs: "8g",
      fat: "24g",
      fiber: "1g",
      sugar: "1g"
    },
    cuisine: "French"
  },
  {
    name: "Thai Green Curry",
    description: "Authentic Thai green curry with coconut milk and vegetables",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Siriporn",
    cookingTime: 30,
    prepTime: 15,
    servings: 4,
    difficulty: "Medium",
    type: "Thai",
    rating: 4.7,
    ingredients: [
      "2 tbsp green curry paste",
      "1 can coconut milk",
      "1 lb chicken, sliced",
      "1 eggplant, cubed",
      "1 bell pepper, sliced",
      "1 onion, sliced",
      "2 tbsp fish sauce",
      "1 tbsp palm sugar",
      "Thai basil leaves",
      "Jasmine rice for serving"
    ],
    instructions: [
      "Heat thick coconut milk in a wok",
      "Add green curry paste and fry until fragrant",
      "Add chicken and cook until done",
      "Pour in remaining coconut milk",
      "Add vegetables and simmer 10 minutes",
      "Season with fish sauce and palm sugar",
      "Add Thai basil leaves",
      "Serve hot with jasmine rice"
    ],
    nutrition: {
      calories: 320,
      protein: "28g",
      carbs: "12g",
      fat: "18g",
      fiber: "3g",
      sugar: "8g"
    },
    cuisine: "Thai"
  },
  {
    name: "Quinoa Power Bowl",
    description: "Nutritious vegan bowl with quinoa and fresh vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Sarah",
    cookingTime: 25,
    prepTime: 15,
    servings: 2,
    difficulty: "Easy",
    type: "Vegan",
    rating: 4.4,
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 avocado, sliced",
      "1 cup chickpeas",
      "1 cup cherry tomatoes",
      "1 cucumber, diced",
      "2 tbsp tahini",
      "1 lemon, juiced",
      "2 tbsp olive oil",
      "Mixed greens"
    ],
    instructions: [
      "Cook quinoa in vegetable broth until fluffy",
      "Roast chickpeas with olive oil and spices",
      "Prepare all vegetables",
      "Make tahini dressing with lemon juice",
      "Assemble bowls with quinoa as base",
      "Top with vegetables and chickpeas",
      "Drizzle with tahini dressing",
      "Serve immediately"
    ],
    nutrition: {
      calories: 450,
      protein: "18g",
      carbs: "55g",
      fat: "20g",
      fiber: "12g",
      sugar: "8g"
    },
    cuisine: "International"
  }
];

const addSampleRecipes = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('🗑️ Cleared existing recipes');
    
    // Add sample recipes
    console.log('📝 Adding sample recipes...');
    const savedRecipes = await Recipe.insertMany(sampleRecipes);
    
    console.log(`✅ Successfully added ${savedRecipes.length} sample recipes to MongoDB!`);
    
    // List all recipes
    const allRecipes = await Recipe.find({}, 'name chef cookingTime rating');
    console.log('\n📋 Recipes in database:');
    allRecipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.name} by ${recipe.chef} (${recipe.cookingTime} min, ${recipe.rating}⭐)`);
    });
    
  } catch (error) {
    console.error('❌ Error adding sample recipes:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
addSampleRecipes();
