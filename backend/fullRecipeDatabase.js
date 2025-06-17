const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fullRecipeDatabase = [
  {
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with chocolate frosting",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    chef: "Chef Maria",
    cookingTime: 60,
    prepTime: 30,
    servings: 8,
    difficulty: "Medium",
    type: "Baked",
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
    cuisine: "American",
    tags: ["dessert", "chocolate", "cake", "sweet"]
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
    type: "Pan-fried",
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
    cuisine: "Italian",
    tags: ["risotto", "mushrooms", "truffle", "italian", "premium"]
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
    type: "Grilled",
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
    cuisine: "Mediterranean",
    tags: ["salmon", "grilled", "healthy", "seafood", "herbs"]
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
    type: "Stir-fried",
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
    cuisine: "Thai",
    tags: ["curry", "thai", "spicy", "coconut", "chicken"]
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
    type: "Pan-fried",
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
    cuisine: "Japanese",
    tags: ["wagyu", "steak", "premium", "japanese", "beef"]
  },
  {
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    chef: "Chef Giuseppe",
    cookingTime: 25,
    prepTime: 20,
    servings: 4,
    difficulty: "Easy",
    type: "Baked",
    rating: 4.6,
    ingredients: [
      "1 pizza dough",
      "1/2 cup tomato sauce",
      "8 oz fresh mozzarella",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper",
      "Parmesan cheese"
    ],
    instructions: [
      "Preheat oven to 475°F (245°C)",
      "Roll out pizza dough on floured surface",
      "Spread tomato sauce evenly",
      "Add torn mozzarella pieces",
      "Drizzle with olive oil",
      "Bake for 12-15 minutes until golden",
      "Top with fresh basil and serve"
    ],
    nutrition: {
      calories: 280,
      protein: "12g",
      carbs: "35g",
      fat: "10g",
      fiber: "2g",
      sugar: "3g"
    },
    cuisine: "Italian",
    tags: ["pizza", "italian", "cheese", "basil", "classic"]
  },
  {
    name: "Chicken Tikka Masala",
    description: "Creamy Indian curry with tender chicken in spiced tomato sauce",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    chef: "Chef Raj",
    cookingTime: 40,
    prepTime: 30,
    servings: 6,
    difficulty: "Medium",
    type: "Roasted",
    rating: 4.7,
    ingredients: [
      "2 lbs chicken breast, cubed",
      "1 cup heavy cream",
      "1 can crushed tomatoes",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "2 tbsp garam masala",
      "1 tbsp ginger, grated",
      "2 tsp cumin",
      "1 tsp paprika",
      "Basmati rice for serving"
    ],
    instructions: [
      "Marinate chicken in yogurt and spices for 30 minutes",
      "Cook chicken in batches until browned",
      "Sauté onions, garlic, and ginger",
      "Add spices and cook until fragrant",
      "Add tomatoes and simmer 10 minutes",
      "Stir in cream and cooked chicken",
      "Simmer until thick and creamy",
      "Serve over basmati rice"
    ],
    nutrition: {
      calories: 380,
      protein: "32g",
      carbs: "15g",
      fat: "22g",
      fiber: "3g",
      sugar: "8g"
    },
    cuisine: "Indian",
    tags: ["curry", "indian", "chicken", "creamy", "spiced"]
  },
  {
    name: "Caesar Salad",
    description: "Classic Caesar salad with crispy croutons and parmesan",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    chef: "Chef Anthony",
    cookingTime: 15,
    prepTime: 15,
    servings: 4,
    difficulty: "Easy",
    type: "Vegan",
    rating: 4.4,
    ingredients: [
      "2 heads romaine lettuce",
      "1/2 cup parmesan cheese",
      "1 cup croutons",
      "3 anchovy fillets",
      "2 cloves garlic",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "1 egg yolk",
      "Black pepper"
    ],
    instructions: [
      "Wash and chop romaine lettuce",
      "Make dressing with garlic, anchovies, egg yolk",
      "Whisk in olive oil and lemon juice",
      "Toss lettuce with dressing",
      "Add croutons and parmesan",
      "Season with black pepper",
      "Serve immediately"
    ],
    nutrition: {
      calories: 180,
      protein: "8g",
      carbs: "12g",
      fat: "12g",
      fiber: "4g",
      sugar: "3g"
    },
    cuisine: "American",
    tags: ["salad", "caesar", "healthy", "lettuce", "classic"]
  },
  {
    name: "Beef Tacos",
    description: "Authentic Mexican tacos with seasoned ground beef",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    chef: "Chef Carlos",
    cookingTime: 20,
    prepTime: 15,
    servings: 4,
    difficulty: "Easy",
    type: "Pan-fried",
    rating: 4.5,
    ingredients: [
      "1 lb ground beef",
      "8 corn tortillas",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "2 tsp chili powder",
      "1 tsp cumin",
      "1/2 tsp paprika",
      "Lettuce, tomatoes, cheese",
      "Sour cream, salsa"
    ],
    instructions: [
      "Cook ground beef with onions and garlic",
      "Add spices and cook until fragrant",
      "Warm tortillas in dry pan",
      "Fill tortillas with beef mixture",
      "Top with lettuce, tomatoes, cheese",
      "Serve with sour cream and salsa"
    ],
    nutrition: {
      calories: 320,
      protein: "22g",
      carbs: "25g",
      fat: "15g",
      fiber: "4g",
      sugar: "4g"
    },
    cuisine: "Mexican",
    tags: ["tacos", "mexican", "beef", "spicy", "quick"]
  }
];

const populateFullDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('🗑️ Cleared existing recipes');
    
    // Add all recipes
    console.log('📝 Adding full recipe database...');
    const savedRecipes = await Recipe.insertMany(fullRecipeDatabase);
    
    console.log(`✅ Successfully added ${savedRecipes.length} recipes to MongoDB!`);
    
    // List all recipes
    const allRecipes = await Recipe.find({}, 'name chef cookingTime rating type');
    console.log('\n📋 Recipes in database:');
    allRecipes.forEach((recipe, index) => {
      console.log(`${index + 1}. ${recipe.name} by ${recipe.chef} (${recipe.type}, ${recipe.cookingTime} min, ${recipe.rating}⭐)`);
    });
    
  } catch (error) {
    console.error('❌ Error adding recipes:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Export for use in other files
module.exports = { fullRecipeDatabase, populateFullDatabase };

// Run the script if called directly
if (require.main === module) {
  populateFullDatabase();
}
