const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const featuredRecipes = [
  {
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with chocolate frosting",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    chef: "Chef Maria",
    cookingTime: 60,
    prepTime: 30,
    servings: 8,
    difficulty: "Medium",
    type: "Dessert",
    rating: 4.9,
    ingredients: [
      "2 cups all-purpose flour",
      "2 cups granulated sugar",
      "3/4 cup unsweetened cocoa powder",
      "2 teaspoons baking soda",
      "1 teaspoon baking powder",
      "1 teaspoon salt",
      "2 large eggs",
      "1 cup buttermilk",
      "1 cup strong black coffee",
      "1/2 cup vegetable oil",
      "1 teaspoon vanilla extract"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease two 9-inch round cake pans.",
      "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, baking powder, and salt.",
      "In another bowl, beat eggs, then add buttermilk, coffee, oil, and vanilla.",
      "Gradually add wet ingredients to dry ingredients, mixing until smooth.",
      "Divide batter between prepared pans.",
      "Bake for 30-35 minutes or until a toothpick inserted in center comes out clean.",
      "Cool in pans for 10 minutes, then turn out onto wire racks.",
      "Frost when completely cool."
    ],
    nutrition: {
      calories: 420,
      protein: "6g",
      carbs: "65g",
      fat: "18g",
      fiber: "4g",
      sugar: "45g"
    },
    cuisine: "American"
  },
  {
    name: "Truffle Risotto with Wild Mushrooms",
    description: "Luxurious Italian risotto with wild mushrooms and truffle oil",
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
    name: "Grilled Salmon with Lemon Herbs",
    description: "Fresh Atlantic salmon grilled to perfection with herbs",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Claire",
    cookingTime: 20,
    prepTime: 15,
    servings: 4,
    difficulty: "Easy",
    type: "Seafood",
    rating: 4.7,
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "2 lemons, sliced",
      "3 tbsp olive oil",
      "2 tbsp fresh dill",
      "2 tbsp fresh parsley",
      "3 cloves garlic, minced",
      "Salt and black pepper",
      "1 tbsp honey"
    ],
    instructions: [
      "Preheat grill to medium-high heat",
      "Mix olive oil, herbs, garlic, and honey in a bowl",
      "Season salmon with salt and pepper",
      "Brush salmon with herb mixture",
      "Grill for 4-5 minutes per side",
      "Top with lemon slices during last 2 minutes",
      "Serve immediately with remaining herbs"
    ],
    nutrition: {
      calories: 320,
      protein: "35g",
      carbs: "8g",
      fat: "16g",
      fiber: "1g",
      sugar: "6g"
    },
    cuisine: "Mediterranean"
  },
  {
    name: "Artisanal Sourdough Bread",
    description: "Traditional sourdough bread with crispy crust and tangy flavor",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Baker Marcus",
    cookingTime: 45,
    prepTime: 24, // includes fermentation time
    servings: 8,
    difficulty: "Hard",
    type: "Bread",
    rating: 4.6,
    ingredients: [
      "500g bread flour",
      "350ml water",
      "100g active sourdough starter",
      "10g salt",
      "1 tbsp olive oil"
    ],
    instructions: [
      "Mix flour and water, let rest for 30 minutes (autolyse)",
      "Add starter and salt, mix until combined",
      "Perform 4 sets of stretch and folds every 30 minutes",
      "Bulk ferment for 4-6 hours at room temperature",
      "Pre-shape and rest for 30 minutes",
      "Final shape and place in banneton",
      "Cold ferment overnight in refrigerator",
      "Bake in Dutch oven at 450°F for 45 minutes"
    ],
    nutrition: {
      calories: 180,
      protein: "6g",
      carbs: "35g",
      fat: "2g",
      fiber: "2g",
      sugar: "1g"
    },
    cuisine: "European"
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
    rating: 4.8,
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
    name: "Japanese Wagyu Steak",
    description: "Premium Wagyu beef cooked to perfection",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    chef: "Chef Kaito",
    cookingTime: 15,
    prepTime: 10,
    servings: 2,
    difficulty: "Medium",
    type: "Japanese",
    rating: 5.0,
    ingredients: [
      "2 Wagyu steaks (8 oz each)",
      "2 tbsp soy sauce",
      "1 tbsp mirin",
      "1 tbsp sake",
      "2 cloves garlic, minced",
      "1 inch ginger, grated",
      "2 tbsp vegetable oil",
      "Sea salt and black pepper",
      "Green onions for garnish"
    ],
    instructions: [
      "Let steaks come to room temperature",
      "Season with salt and pepper",
      "Heat oil in cast iron pan over high heat",
      "Sear steaks for 2-3 minutes per side",
      "Add garlic and ginger to pan",
      "Deglaze with soy sauce, mirin, and sake",
      "Baste steaks with sauce",
      "Rest for 5 minutes before serving"
    ],
    nutrition: {
      calories: 450,
      protein: "40g",
      carbs: "3g",
      fat: "28g",
      fiber: "0g",
      sugar: "2g"
    },
    cuisine: "Japanese"
  }
];

const populateRecipes = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('🗑️ Cleared existing recipes');
    
    // Add featured recipes
    console.log('📝 Adding featured recipes...');
    const savedRecipes = await Recipe.insertMany(featuredRecipes);
    
    console.log(`✅ Successfully added ${savedRecipes.length} featured recipes to MongoDB!`);
    
    // List all recipes
    const allRecipes = await Recipe.find({}, 'name chef cookingTime rating');
    console.log('\n📋 Recipes in database:');
    allRecipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.name} by ${recipe.chef} (${recipe.cookingTime} min, ${recipe.rating}⭐)`);
    });
    
  } catch (error) {
    console.error('❌ Error adding recipes:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the script
populateRecipes();
