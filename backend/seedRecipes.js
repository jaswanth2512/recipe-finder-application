const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const sampleRecipes = [
  {
    name: "Truffle Infused Mushroom Risotto",
    description: "A luxurious risotto with earthy mushrooms and aromatic truffle oil",
    image: "https://source.unsplash.com/600x400/?truffle,mushroom,risotto",
    chef: "Chef Alessandro Romano",
    cookingTime: 35,
    prepTime: 15,
    servings: 4,
    difficulty: "Medium",
    type: "Baked",
    rating: 4.8,
    ingredients: [
      "1 cup Arborio rice",
      "4 cups warm vegetable broth",
      "1 cup mixed mushrooms, sliced",
      "1/2 cup white wine",
      "1/4 cup grated Parmesan cheese",
      "2 tbsp truffle oil",
      "1 small onion, diced",
      "2 cloves garlic, minced",
      "2 tbsp butter",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Heat the vegetable broth in a saucepan and keep warm",
      "In a large pan, sauté onions and garlic in butter until translucent",
      "Add mushrooms and cook until golden brown",
      "Add rice and stir for 2 minutes until lightly toasted",
      "Pour in white wine and stir until absorbed",
      "Add warm broth one ladle at a time, stirring constantly",
      "Continue until rice is creamy and al dente (about 20 minutes)",
      "Stir in Parmesan cheese and truffle oil",
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
    image: "https://source.unsplash.com/600x400/?grilled,octopus,mediterranean",
    chef: "Chef Maria Kostas",
    cookingTime: 45,
    prepTime: 20,
    servings: 6,
    difficulty: "Hard",
    type: "Grilled",
    rating: 4.6,
    ingredients: [
      "2 lbs fresh octopus",
      "1/4 cup olive oil",
      "2 lemons, juiced",
      "3 cloves garlic, minced",
      "2 tbsp fresh oregano",
      "1 tbsp fresh thyme",
      "1 red onion, sliced",
      "1 cup cherry tomatoes",
      "Salt and black pepper",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Clean the octopus and remove the beak",
      "Boil octopus in salted water for 30 minutes until tender",
      "Remove and let cool, then cut into serving pieces",
      "Preheat grill to medium-high heat",
      "Marinate octopus in olive oil, lemon juice, garlic, and herbs",
      "Grill octopus for 3-4 minutes per side until charred",
      "Grill vegetables until slightly charred",
      "Arrange on platter and drizzle with remaining marinade",
      "Garnish with fresh parsley and serve"
    ],
    nutrition: {
      calories: 285,
      protein: "28g",
      carbs: "8g",
      fat: "16g",
      fiber: "2g",
      sugar: "5g"
    },
    cuisine: "Mediterranean"
  },
  {
    name: "Korean Spicy Tofu Stew",
    description: "Hearty and spicy Korean stew with silky tofu and vegetables",
    image: "https://source.unsplash.com/600x400/?korean,tofu,stew",
    chef: "Chef Kim Min-jun",
    cookingTime: 25,
    prepTime: 15,
    servings: 4,
    difficulty: "Easy",
    type: "Steamed",
    rating: 4.4,
    ingredients: [
      "1 block silken tofu, cubed",
      "2 tbsp gochujang (Korean chili paste)",
      "4 cups vegetable broth",
      "1 onion, sliced",
      "2 green onions, chopped",
      "1 zucchini, sliced",
      "1 cup mushrooms, sliced",
      "2 cloves garlic, minced",
      "1 tbsp sesame oil",
      "1 tbsp soy sauce"
    ],
    instructions: [
      "Heat sesame oil in a large pot over medium heat",
      "Sauté onions and garlic until fragrant",
      "Add gochujang and stir for 1 minute",
      "Pour in vegetable broth and bring to a boil",
      "Add mushrooms and zucchini, simmer for 10 minutes",
      "Gently add tofu cubes and simmer for 5 minutes",
      "Season with soy sauce",
      "Garnish with green onions and serve hot"
    ],
    nutrition: {
      calories: 180,
      protein: "12g",
      carbs: "15g",
      fat: "8g",
      fiber: "4g",
      sugar: "8g"
    },
    cuisine: "Korean",
    type: "Vegan"
  },
  {
    name: "Herb Crusted Rack of Lamb",
    description: "Elegant rack of lamb with a fragrant herb crust",
    image: "https://source.unsplash.com/600x400/?herb,crusted,lamb",
    chef: "Chef Gordon Mitchell",
    cookingTime: 40,
    prepTime: 20,
    servings: 4,
    difficulty: "Hard",
    type: "Roasted",
    rating: 4.9,
    ingredients: [
      "2 French-trimmed lamb racks (8 ribs each)",
      "2 cups fresh breadcrumbs",
      "1/4 cup fresh rosemary, chopped",
      "1/4 cup fresh thyme, chopped",
      "3 cloves garlic, minced",
      "3 tbsp Dijon mustard",
      "2 tbsp olive oil",
      "Salt and black pepper",
      "2 tbsp butter"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C)",
      "Season lamb racks with salt and pepper",
      "Heat olive oil in an oven-safe skillet over high heat",
      "Sear lamb racks fat-side down for 3-4 minutes until golden",
      "Flip and sear for another 2 minutes",
      "Brush with Dijon mustard",
      "Mix breadcrumbs, herbs, garlic, and butter",
      "Press herb mixture onto lamb",
      "Roast in oven for 15-20 minutes for medium-rare",
      "Rest for 10 minutes before carving"
    ],
    nutrition: {
      calories: 520,
      protein: "45g",
      carbs: "12g",
      fat: "32g",
      fiber: "1g",
      sugar: "2g"
    },
    cuisine: "French"
  },
  {
    name: "Thai Green Curry",
    description: "Aromatic Thai curry with coconut milk and fresh vegetables",
    image: "https://source.unsplash.com/600x400/?thai,green,curry",
    chef: "Chef Siriporn Tanaka",
    cookingTime: 30,
    prepTime: 15,
    servings: 4,
    difficulty: "Medium",
    type: "Stir-fried",
    rating: 4.7,
    ingredients: [
      "2 tbsp green curry paste",
      "1 can coconut milk",
      "1 lb chicken breast, sliced",
      "1 eggplant, cubed",
      "1 bell pepper, sliced",
      "1 cup green beans",
      "2 tbsp fish sauce",
      "1 tbsp palm sugar",
      "Thai basil leaves",
      "2 kaffir lime leaves"
    ],
    instructions: [
      "Heat 1/4 cup coconut milk in a wok over medium heat",
      "Add green curry paste and fry until fragrant",
      "Add chicken and cook until no longer pink",
      "Pour in remaining coconut milk",
      "Add vegetables and simmer for 10 minutes",
      "Season with fish sauce and palm sugar",
      "Add lime leaves and basil",
      "Serve with jasmine rice"
    ],
    nutrition: {
      calories: 380,
      protein: "28g",
      carbs: "18g",
      fat: "22g",
      fiber: "5g",
      sugar: "12g"
    },
    cuisine: "Thai"
  },
  {
    name: "Quinoa Power Bowl",
    description: "Nutritious vegan bowl with quinoa, roasted vegetables, and tahini dressing",
    image: "https://source.unsplash.com/600x400/?quinoa,bowl,vegan",
    chef: "Chef Emma Green",
    cookingTime: 35,
    prepTime: 15,
    servings: 4,
    difficulty: "Easy",
    type: "Vegan",
    rating: 4.5,
    ingredients: [
      "1 cup quinoa",
      "2 cups roasted sweet potato, cubed",
      "1 cup roasted broccoli",
      "1 avocado, sliced",
      "1/4 cup pumpkin seeds",
      "2 tbsp tahini",
      "1 lemon, juiced",
      "2 tbsp olive oil",
      "1 tsp maple syrup",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Roast sweet potato and broccoli at 400°F for 25 minutes",
      "Whisk together tahini, lemon juice, olive oil, and maple syrup",
      "Divide quinoa among bowls",
      "Top with roasted vegetables and avocado",
      "Drizzle with tahini dressing",
      "Sprinkle with pumpkin seeds",
      "Season with salt and pepper"
    ],
    nutrition: {
      calories: 420,
      protein: "15g",
      carbs: "52g",
      fat: "18g",
      fiber: "12g",
      sugar: "8g"
    },
    cuisine: "International"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // Insert sample recipes
    await Recipe.insertMany(sampleRecipes);
    console.log(`Inserted ${sampleRecipes.length} sample recipes`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
