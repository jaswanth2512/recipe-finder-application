import { recipeDatabase } from '../data/recipeDatabase';
import { recipeMapping } from '../data/recipeMapping';
import { getRecipeImage } from './imageUtils';

/**
 * Convert recipe name to database key
 * @param {string} recipeName - The recipe name
 * @returns {string} - Database key
 */
const getRecipeKey = (recipeName) => {
  return recipeName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim();
};

/**
 * Find best matching recipe from database
 * @param {string} recipeName - The recipe name to match
 * @returns {string|null} - Best matching key or null
 */
const findBestMatch = (recipeName) => {
  const searchName = recipeName.toLowerCase();
  const keys = Object.keys(recipeDatabase);

  // Try exact key match first
  const exactKey = getRecipeKey(recipeName);
  if (recipeDatabase[exactKey]) {
    return exactKey;
  }

  // Try partial matches
  for (const key of keys) {
    const dbRecipeName = recipeDatabase[key].name.toLowerCase();

    // Check if search name contains key words
    const keyWords = key.split('-');
    const nameWords = searchName.split(' ');

    let matchCount = 0;
    for (const keyWord of keyWords) {
      if (nameWords.some(word => word.includes(keyWord) || keyWord.includes(word))) {
        matchCount++;
      }
    }

    // If most words match, consider it a match
    if (matchCount >= Math.ceil(keyWords.length * 0.6)) {
      return key;
    }

    // Check if database recipe name contains search terms
    if (nameWords.some(word => dbRecipeName.includes(word) && word.length > 3)) {
      return key;
    }
  }

  return null;
};

/**
 * Get detailed recipe information from database
 * @param {string} recipeName - The recipe name
 * @returns {object} - Complete recipe details or generated details
 */
export const getRecipeDetails = (recipeName) => {
  console.log('🔍 Getting recipe details for:', recipeName);

  // First check direct mapping
  if (recipeMapping[recipeName]) {
    console.log('✅ Found direct mapping for:', recipeName);
    const mapped = recipeMapping[recipeName];
    const result = {
      name: recipeName,
      image: mapped.image,
      type: getRecipeType(recipeName),
      cookingTime: mapped.cookingTime,
      prepTime: Math.floor(mapped.cookingTime * 0.3) + 5,
      servings: 4,
      difficulty: mapped.cookingTime > 60 ? 'Medium' : 'Easy',
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      chef: mapped.chef,
      description: mapped.description,
      ingredients: mapped.ingredients,
      instructions: generateSpecificInstructions(recipeName, mapped.ingredients),
      nutrition: generateRealisticNutrition(recipeName, getRecipeType(recipeName)),
      tags: generateTags(recipeName, getRecipeType(recipeName))
    };
    console.log('📋 Returning mapped recipe:', result);
    return result;
  }

  // Try to find best matching recipe in database
  const matchingKey = findBestMatch(recipeName);

  if (matchingKey && recipeDatabase[matchingKey]) {
    console.log('✅ Found database match:', matchingKey, 'for:', recipeName);
    // Return the matched recipe but with the original name
    return {
      ...recipeDatabase[matchingKey],
      name: recipeName // Keep the original recipe name
    };
  }

  console.log('⚠️ No match found, generating details for:', recipeName);
  // Generate specific details for recipes not in database
  return generateSpecificRecipeDetails(recipeName);
};

/**
 * Generate specific recipe details for recipes not in database
 * @param {string} recipeName - The recipe name
 * @returns {object} - Specific recipe details
 */
const generateSpecificRecipeDetails = (recipeName) => {
  const recipeType = getRecipeType(recipeName);
  const specificData = getSpecificRecipeData(recipeName, recipeType);

  return {
    name: recipeName,
    image: getRecipeImage(recipeName, recipeType),
    type: recipeType,
    cookingTime: specificData.cookingTime,
    prepTime: specificData.prepTime,
    servings: specificData.servings,
    difficulty: specificData.difficulty,
    rating: specificData.rating,
    chef: specificData.chef,
    description: specificData.description,
    ingredients: specificData.ingredients,
    instructions: specificData.instructions,
    nutrition: specificData.nutrition,
    tags: specificData.tags
  };
};

/**
 * Get specific recipe data based on recipe name and type
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {object} - Specific recipe data
 */
const getSpecificRecipeData = (recipeName, recipeType) => {
  const name = recipeName.toLowerCase();

  // Pasta dishes
  if (name.includes('carbonara')) {
    return {
      cookingTime: 20,
      prepTime: 10,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.6,
      chef: 'Chef Giuseppe Romano',
      description: 'Classic Roman pasta with eggs, cheese, pancetta, and black pepper.',
      ingredients: [
        '1 lb spaghetti',
        '6 oz pancetta, diced',
        '4 large eggs',
        '1 cup Pecorino Romano cheese, grated',
        '1/2 cup Parmesan cheese, grated',
        'Freshly ground black pepper',
        'Salt for pasta water'
      ],
      instructions: [
        'Bring large pot of salted water to boil for pasta',
        'Cook pancetta in large skillet until crispy',
        'Whisk eggs with both cheeses and lots of black pepper',
        'Cook pasta until al dente, reserve 1 cup pasta water',
        'Add hot pasta to pancetta pan off heat',
        'Quickly toss with egg mixture, adding pasta water as needed',
        'Serve immediately with extra cheese and pepper'
      ],
      nutrition: { calories: 520, protein: '24g', carbs: '58g', fat: '22g', fiber: '3g', sodium: '680mg' },
      tags: ['Italian', 'Pasta', 'Classic', 'Quick']
    };
  }

  // Asian stir-fries
  if (name.includes('kung pao')) {
    return {
      cookingTime: 15,
      prepTime: 20,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.4,
      chef: 'Chef Wang Li',
      description: 'Spicy Szechuan chicken with peanuts, vegetables, and chili peppers.',
      ingredients: [
        '1 lb chicken breast, cubed',
        '1/2 cup roasted peanuts',
        '6-8 dried red chilies',
        '3 green onions, chopped',
        '2 tbsp soy sauce',
        '1 tbsp rice wine',
        '1 tsp cornstarch',
        '2 tbsp vegetable oil',
        '1 tsp Szechuan peppercorns'
      ],
      instructions: [
        'Marinate chicken with soy sauce, rice wine, and cornstarch',
        'Heat wok over high heat with oil',
        'Stir-fry chicken until golden, remove',
        'Add chilies and peppercorns, stir for 30 seconds',
        'Return chicken, add sauce and peanuts',
        'Toss until coated and heated through',
        'Garnish with green onions and serve with rice'
      ],
      nutrition: { calories: 380, protein: '32g', carbs: '12g', fat: '24g', fiber: '2g', sodium: '720mg' },
      tags: ['Chinese', 'Spicy', 'Stir-fry', 'Peanuts']
    };
  }

  // Default fallback with more variety
  return generateDefaultRecipeData(recipeName, recipeType);
};

/**
 * Generate default recipe data with variety
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {object} - Default recipe data
 */
const generateDefaultRecipeData = (recipeName, recipeType) => {
  const baseIngredients = getBaseIngredients(recipeName, recipeType);
  const instructions = generateInstructions(recipeName, recipeType);
  const chefs = {
    'Italian': ['Chef Marco Rossi', 'Chef Giulia Bianchi', 'Chef Antonio Verdi'],
    'Chinese': ['Chef Li Wei', 'Chef Wang Ming', 'Chef Zhang Yu'],
    'Indian': ['Chef Rajesh Sharma', 'Chef Priya Patel', 'Chef Arjun Singh'],
    'Thai': ['Chef Siriporn Tanaka', 'Chef Niran Patel', 'Chef Malee Wong'],
    'French': ['Chef Pierre Dubois', 'Chef Sophie Laurent', 'Chef Antoine Beaumont'],
    'Mexican': ['Chef Carmen Rodriguez', 'Chef Diego Morales', 'Chef Isabella Cruz'],
    'Japanese': ['Chef Yuki Tanaka', 'Chef Hiroshi Sato', 'Chef Akiko Yamamoto'],
    'Korean': ['Chef Park Min-jung', 'Chef Kim Soo-jin', 'Chef Lee Dong-wook'],
    'Mediterranean': ['Chef Dimitri Kostas', 'Chef Elena Papadopoulos', 'Chef Nikos Stavros']
  };

  const typeChefs = chefs[recipeType] || ['Chef International', 'Chef Global', 'Chef World'];
  const selectedChef = typeChefs[Math.floor(Math.random() * typeChefs.length)];

  // More realistic cooking times based on recipe type
  const cookingTimes = {
    'Italian': [20, 30, 45],
    'Chinese': [15, 20, 25],
    'Indian': [30, 45, 60],
    'Thai': [20, 25, 30],
    'French': [45, 60, 90],
    'Mexican': [25, 35, 45],
    'Japanese': [20, 30, 40],
    'Korean': [25, 35, 45],
    'Mediterranean': [30, 40, 50]
  };

  const typeTimes = cookingTimes[recipeType] || [20, 30, 45];
  const cookingTime = typeTimes[Math.floor(Math.random() * typeTimes.length)];

  return {
    cookingTime,
    prepTime: Math.floor(cookingTime * 0.4) + 5,
    servings: [2, 4, 6][Math.floor(Math.random() * 3)],
    difficulty: ['Easy', 'Medium'][Math.floor(Math.random() * 2)], // Bias toward easier recipes
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5-5.0 rating
    chef: selectedChef,
    description: generateDescription(recipeName, recipeType),
    ingredients: baseIngredients,
    instructions: instructions,
    nutrition: generateRealisticNutrition(recipeName, recipeType),
    tags: generateTags(recipeName, recipeType)
  };
};

/**
 * Determine recipe type from name
 * @param {string} recipeName - The recipe name
 * @returns {string} - Recipe type
 */
const getRecipeType = (recipeName) => {
  const name = recipeName.toLowerCase();
  
  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('risotto')) return 'Italian';
  if (name.includes('curry') || name.includes('masala') || name.includes('biryani')) return 'Indian';
  if (name.includes('thai') || name.includes('pad') || name.includes('tom')) return 'Thai';
  if (name.includes('chinese') || name.includes('szechuan') || name.includes('kung pao')) return 'Chinese';
  if (name.includes('japanese') || name.includes('sushi') || name.includes('teriyaki')) return 'Japanese';
  if (name.includes('mexican') || name.includes('taco') || name.includes('burrito')) return 'Mexican';
  if (name.includes('french') || name.includes('coq au vin') || name.includes('ratatouille')) return 'French';
  if (name.includes('greek') || name.includes('mediterranean')) return 'Mediterranean';
  if (name.includes('korean') || name.includes('kimchi') || name.includes('bulgogi')) return 'Korean';
  if (name.includes('vietnamese') || name.includes('pho') || name.includes('banh')) return 'Vietnamese';
  
  return 'International';
};

/**
 * Get base ingredients for recipe type
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {array} - Array of ingredients
 */
const getBaseIngredients = (recipeName, recipeType) => {
  const name = recipeName.toLowerCase();
  
  // Common base ingredients by type
  const baseIngredients = {
    'Italian': ['Olive oil', 'Garlic', 'Onion', 'Tomatoes', 'Fresh basil', 'Parmesan cheese', 'Salt', 'Black pepper'],
    'Indian': ['Onion', 'Garlic', 'Ginger', 'Tomatoes', 'Cumin', 'Coriander', 'Turmeric', 'Garam masala', 'Oil'],
    'Thai': ['Garlic', 'Ginger', 'Coconut milk', 'Fish sauce', 'Thai basil', 'Lime', 'Chilies', 'Oil'],
    'Chinese': ['Garlic', 'Ginger', 'Soy sauce', 'Sesame oil', 'Green onions', 'Rice wine', 'Cornstarch'],
    'Japanese': ['Soy sauce', 'Mirin', 'Sake', 'Dashi', 'Ginger', 'Garlic', 'Sesame oil'],
    'Mexican': ['Onion', 'Garlic', 'Tomatoes', 'Cilantro', 'Lime', 'Cumin', 'Chili powder', 'Oil'],
    'French': ['Butter', 'Onion', 'Garlic', 'White wine', 'Fresh herbs', 'Cream', 'Salt', 'Pepper'],
    'Mediterranean': ['Olive oil', 'Garlic', 'Lemon', 'Oregano', 'Tomatoes', 'Olives', 'Feta cheese'],
    'Korean': ['Garlic', 'Ginger', 'Soy sauce', 'Sesame oil', 'Gochujang', 'Green onions', 'Rice vinegar'],
    'Vietnamese': ['Fish sauce', 'Lime', 'Garlic', 'Ginger', 'Cilantro', 'Mint', 'Rice noodles']
  };
  
  let ingredients = baseIngredients[recipeType] || baseIngredients['International'] || ['Salt', 'Pepper', 'Oil'];
  
  // Add specific ingredients based on recipe name
  if (name.includes('chicken')) ingredients.unshift('Chicken breast');
  if (name.includes('beef')) ingredients.unshift('Beef');
  if (name.includes('pork')) ingredients.unshift('Pork');
  if (name.includes('fish') || name.includes('salmon')) ingredients.unshift('Fresh fish fillets');
  if (name.includes('shrimp')) ingredients.unshift('Large shrimp');
  if (name.includes('pasta')) ingredients.unshift('Pasta');
  if (name.includes('rice')) ingredients.unshift('Rice');
  if (name.includes('noodles')) ingredients.unshift('Noodles');
  
  return ingredients.slice(0, 12); // Limit to 12 ingredients
};

/**
 * Generate specific cooking instructions based on recipe name and ingredients
 * @param {string} recipeName - The recipe name
 * @param {array} ingredients - The recipe ingredients
 * @returns {array} - Array of cooking instructions
 */
const generateSpecificInstructions = (recipeName, ingredients) => {
  const name = recipeName.toLowerCase();

  // Specific instructions for exact recipe matches
  if (name.includes('truffle') && name.includes('risotto')) {
    return [
      "Heat mushroom stock in a separate pan and keep warm",
      "Clean and slice wild mushrooms, sauté until golden",
      "In heavy-bottomed pan, melt butter and sauté onions until translucent",
      "Add garlic and cook for 1 minute until fragrant",
      "Add Arborio rice and stir for 2 minutes until lightly toasted",
      "Pour in white wine and stir until completely absorbed",
      "Add warm stock one ladle at a time, stirring constantly",
      "Continue for 18-20 minutes until rice is creamy but al dente",
      "Fold in sautéed mushrooms, truffle oil, and Parmesan",
      "Season with salt and pepper, serve immediately"
    ];
  }

  if (name.includes('octopus') && name.includes('grilled')) {
    return [
      "Bring large pot of salted water to boil",
      "Add octopus and simmer for 45-60 minutes until tender",
      "Remove octopus and let cool, then cut into serving pieces",
      "Preheat grill to medium-high heat",
      "Marinate octopus in olive oil, lemon juice, garlic, and oregano",
      "Grill octopus for 3-4 minutes per side until charred",
      "Meanwhile, combine onion, olives, tomatoes, and herbs",
      "Arrange grilled octopus on platter with vegetable mixture",
      "Drizzle with remaining marinade and serve with crusty bread"
    ];
  }

  if (name.includes('thai') && name.includes('curry')) {
    return [
      "Heat oil in wok or large pan over medium-high heat",
      "Add green curry paste and fry for 1-2 minutes until fragrant",
      "Add thick coconut milk and cook until oil separates",
      "Add chicken pieces and cook until no longer pink",
      "Add remaining coconut milk, fish sauce, and palm sugar",
      "Bring to gentle simmer and add eggplant and bell pepper",
      "Cook for 8-10 minutes until vegetables are tender",
      "Add bamboo shoots and kaffir lime leaves",
      "Remove from heat and stir in Thai basil",
      "Serve hot over jasmine rice"
    ];
  }

  if (name.includes('korean') && name.includes('tofu')) {
    return [
      "Heat sesame oil in Korean stone pot or heavy saucepan",
      "Add kimchi and kimchi juice, stir-fry for 2-3 minutes",
      "Add garlic and gochujang, cook for another minute",
      "Pour in stock and bring to a boil",
      "Gently add chunks of soft tofu without breaking",
      "Season with soy sauce and salt, simmer for 5 minutes",
      "Crack eggs directly into the stew",
      "Let eggs poach for 2-3 minutes",
      "Garnish with sliced green onions and serve bubbling hot"
    ];
  }

  // Default risotto instructions
  if (name.includes('risotto')) {
    return [
      "Heat stock in a separate pan and keep warm",
      "Sauté onions in butter until translucent",
      "Add rice and stir for 2 minutes until lightly toasted",
      "Add wine and stir until absorbed",
      "Add warm stock one ladle at a time, stirring constantly",
      "Continue until rice is creamy but still al dente (18-20 minutes)",
      "Stir in cheese and seasonings",
      "Serve immediately while hot and creamy"
    ];
  }

  if (name.includes('curry')) {
    return [
      "Heat oil in heavy-bottomed pan",
      "Add whole spices and let them splutter",
      "Sauté onions until golden brown",
      "Add ginger-garlic paste and cook until fragrant",
      "Add ground spices and cook for 1 minute",
      "Add tomatoes and cook until mushy",
      "Add main ingredients and coconut milk",
      "Simmer until cooked through",
      "Garnish with fresh herbs and serve with rice"
    ];
  }

  if (name.includes('stir fry') || name.includes('stir-fry')) {
    return [
      "Prepare all ingredients and have them ready",
      "Heat wok over high heat until smoking",
      "Add oil and swirl to coat",
      "Add aromatics and stir for 30 seconds",
      "Add protein and cook until almost done",
      "Add vegetables in order of cooking time",
      "Add sauce and toss everything together",
      "Serve immediately over rice"
    ];
  }

  if (name.includes('salad')) {
    return [
      "Wash and dry all greens thoroughly",
      "Prepare dressing by whisking ingredients together",
      "Chop vegetables into bite-sized pieces",
      "Combine all salad ingredients in large bowl",
      "Add dressing just before serving",
      "Toss gently to coat evenly",
      "Serve immediately for best texture"
    ];
  }

  // Default instructions
  return generateInstructions(recipeName, getRecipeType(recipeName));
};

/**
 * Generate cooking instructions
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {array} - Array of cooking instructions
 */
const generateInstructions = (recipeName, recipeType) => {
  const name = recipeName.toLowerCase();
  
  if (name.includes('pasta')) {
    return [
      "Bring a large pot of salted water to boil",
      "Cook pasta according to package directions until al dente",
      "Heat olive oil in a large pan over medium heat",
      "Sauté garlic and onions until fragrant",
      "Add other ingredients and cook until tender",
      "Drain pasta and toss with sauce",
      "Season with salt, pepper, and fresh herbs",
      "Serve immediately with grated cheese"
    ];
  }
  
  if (name.includes('curry')) {
    return [
      "Heat oil in a heavy-bottomed pan",
      "Add whole spices and let them splutter",
      "Sauté onions until golden brown",
      "Add ginger-garlic paste and cook until fragrant",
      "Add tomatoes and cook until mushy",
      "Add ground spices and cook for 1 minute",
      "Add main ingredients and mix well",
      "Simmer until cooked through",
      "Garnish with fresh cilantro and serve"
    ];
  }
  
  if (name.includes('stir fry')) {
    return [
      "Prepare all ingredients (mise en place)",
      "Heat wok over high heat until smoking",
      "Add oil and swirl to coat",
      "Add aromatics and stir for 30 seconds",
      "Add protein and cook until almost done",
      "Add vegetables in order of cooking time",
      "Add sauce and toss everything together",
      "Cook until sauce coats ingredients",
      "Serve immediately over rice"
    ];
  }
  
  // Generic instructions
  return [
    "Prepare and organize all ingredients",
    "Heat cooking oil in appropriate pan",
    "Cook aromatics until fragrant",
    "Add main ingredients in order of cooking time",
    "Season with salt, pepper, and spices",
    "Cook until ingredients are properly done",
    "Adjust seasoning to taste",
    "Serve hot and enjoy"
  ];
};

/**
 * Generate description based on recipe name and type
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {string} - Recipe description
 */
const generateDescription = (recipeName, recipeType) => {
  const descriptions = {
    'Italian': `Authentic ${recipeName.toLowerCase()} prepared with traditional Italian techniques and the finest ingredients.`,
    'Chinese': `Classic ${recipeName.toLowerCase()} featuring bold flavors and traditional Chinese cooking methods.`,
    'Indian': `Aromatic ${recipeName.toLowerCase()} with authentic spices and traditional Indian cooking techniques.`,
    'Thai': `Fresh and vibrant ${recipeName.toLowerCase()} with the perfect balance of sweet, sour, salty, and spicy flavors.`,
    'French': `Elegant ${recipeName.toLowerCase()} showcasing refined French culinary techniques and premium ingredients.`,
    'Mexican': `Flavorful ${recipeName.toLowerCase()} with authentic Mexican spices and traditional cooking methods.`,
    'Japanese': `Delicate ${recipeName.toLowerCase()} prepared with precision and respect for Japanese culinary traditions.`,
    'Korean': `Bold and satisfying ${recipeName.toLowerCase()} featuring the complex flavors of Korean cuisine.`,
    'Mediterranean': `Fresh and healthy ${recipeName.toLowerCase()} inspired by the sun-soaked Mediterranean region.`
  };

  return descriptions[recipeType] || `Delicious ${recipeName.toLowerCase()} prepared with fresh, quality ingredients and traditional cooking methods.`;
};

/**
 * Generate realistic nutrition information based on recipe type
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {object} - Nutrition facts
 */
const generateRealisticNutrition = (recipeName, recipeType) => {
  const name = recipeName.toLowerCase();

  // Base nutrition by type
  const nutritionProfiles = {
    'Italian': { calories: [350, 550], protein: [15, 25], carbs: [40, 70], fat: [12, 25] },
    'Chinese': { calories: [300, 450], protein: [20, 35], carbs: [25, 45], fat: [10, 20] },
    'Indian': { calories: [400, 600], protein: [18, 30], carbs: [35, 55], fat: [15, 30] },
    'Thai': { calories: [350, 500], protein: [20, 30], carbs: [30, 50], fat: [12, 25] },
    'French': { calories: [450, 650], protein: [20, 35], carbs: [25, 45], fat: [20, 35] },
    'Mexican': { calories: [400, 550], protein: [18, 28], carbs: [35, 55], fat: [15, 25] },
    'Japanese': { calories: [250, 400], protein: [15, 25], carbs: [30, 50], fat: [8, 18] },
    'Korean': { calories: [300, 450], protein: [18, 28], carbs: [25, 45], fat: [10, 20] },
    'Mediterranean': { calories: [300, 450], protein: [15, 25], carbs: [25, 40], fat: [12, 22] }
  };

  const profile = nutritionProfiles[recipeType] || nutritionProfiles['Mediterranean'];

  // Adjust for specific ingredients
  let calorieMultiplier = 1;
  if (name.includes('fried') || name.includes('crispy')) calorieMultiplier = 1.3;
  if (name.includes('salad') || name.includes('soup')) calorieMultiplier = 0.7;
  if (name.includes('cheese') || name.includes('cream')) calorieMultiplier = 1.2;

  const calories = Math.floor((profile.calories[0] + Math.random() * (profile.calories[1] - profile.calories[0])) * calorieMultiplier);
  const protein = Math.floor(profile.protein[0] + Math.random() * (profile.protein[1] - profile.protein[0]));
  const carbs = Math.floor(profile.carbs[0] + Math.random() * (profile.carbs[1] - profile.carbs[0]));
  const fat = Math.floor(profile.fat[0] + Math.random() * (profile.fat[1] - profile.fat[0]));

  return {
    calories,
    protein: `${protein}g`,
    carbs: `${carbs}g`,
    fat: `${fat}g`,
    fiber: `${Math.floor(Math.random() * 8) + 2}g`,
    sodium: `${Math.floor(Math.random() * 600) + 400}mg`
  };
};

/**
 * Generate tags based on recipe name and type
 * @param {string} recipeName - The recipe name
 * @param {string} recipeType - The recipe type
 * @returns {array} - Recipe tags
 */
const generateTags = (recipeName, recipeType) => {
  const name = recipeName.toLowerCase();
  const tags = [recipeType];

  // Add cooking method tags
  if (name.includes('fried') || name.includes('crispy')) tags.push('Fried');
  if (name.includes('grilled') || name.includes('bbq')) tags.push('Grilled');
  if (name.includes('baked') || name.includes('roasted')) tags.push('Baked');
  if (name.includes('steamed')) tags.push('Steamed');
  if (name.includes('stir fry') || name.includes('wok')) tags.push('Stir-Fry');

  // Add dietary tags
  if (name.includes('vegetarian') || (!name.includes('chicken') && !name.includes('beef') && !name.includes('pork') && !name.includes('fish'))) {
    tags.push('Vegetarian');
  }
  if (name.includes('vegan')) tags.push('Vegan');
  if (name.includes('spicy') || name.includes('hot')) tags.push('Spicy');
  if (name.includes('healthy') || name.includes('salad')) tags.push('Healthy');

  // Add meal type tags
  if (name.includes('soup') || name.includes('broth')) tags.push('Soup');
  if (name.includes('salad')) tags.push('Salad');
  if (name.includes('dessert') || name.includes('cake') || name.includes('sweet')) tags.push('Dessert');

  tags.push('Homemade');

  return tags.slice(0, 4); // Limit to 4 tags
};

// getRecipeImage is now imported from imageUtils

export default {
  getRecipeDetails,
  getRecipeKey
};
