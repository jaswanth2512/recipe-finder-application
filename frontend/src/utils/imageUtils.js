// Utility functions for handling recipe images

// High-quality food images from various sources
const foodImages = {
  // Italian dishes
  'truffle mushroom risotto': 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop&auto=format',
  'italian osso buco': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format',

  // Asian dishes
  'szechuan noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format',
  'korean tofu stew': 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop&auto=format',
  'thai green curry': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop&auto=format',
  'vietnamese pho': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',
  'japanese matcha cheesecake': 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop&auto=format',
  'miso glazed eggplant': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop&auto=format',
  
  // Mediterranean dishes
  'mediterranean grilled octopus': 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=600&h=400&fit=crop&auto=format',
  'greek spanakopita': 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=600&h=400&fit=crop&auto=format',
  'french ratatouille': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=600&h=400&fit=crop&auto=format',

  // American dishes
  'cajun blackened salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format',
  'argentinian steak': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',

  // Middle Eastern & African
  'moroccan tagine': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format',
  'persian jeweled rice': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop&auto=format',

  // Mexican
  'mexican mole poblano': 'https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=600&h=400&fit=crop&auto=format',

  // Indian
  'indian butter chicken': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop&auto=format',

  // Meat dishes
  'herb crusted lamb': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format',

  // Vegetarian/Vegan
  'caramelized onion tart': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&auto=format',
  'lemon basil sorbet': 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=400&fit=crop&auto=format',
  
  // Generic fallbacks
  'pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop&auto=format',
  'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop&auto=format',
  'salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format',
  'soup': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&auto=format',
  'curry': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop&auto=format',
  'steak': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format',
  'chicken': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=400&fit=crop&auto=format',
  'fish': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format',
  'dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop&auto=format',
  'bread': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&auto=format',
  'rice': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop&auto=format',
  'noodles': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format'
};

// Default fallback image
const defaultFoodImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop&auto=format';

/**
 * Get a high-quality image URL for a recipe
 * @param {string} recipeName - The name of the recipe
 * @param {string} recipeType - The type/category of the recipe
 * @returns {string} - Image URL
 */
export const getRecipeImage = (recipeName, recipeType = '') => {
  if (!recipeName) return defaultFoodImage;
  
  const name = recipeName.toLowerCase();
  
  // Try exact match first
  const exactMatch = Object.keys(foodImages).find(key => 
    name.includes(key.toLowerCase())
  );
  
  if (exactMatch) {
    return foodImages[exactMatch];
  }
  
  // Try partial matches for common ingredients/types
  const keywords = [
    'pasta', 'pizza', 'salad', 'soup', 'curry', 'steak', 'chicken', 
    'fish', 'dessert', 'bread', 'rice', 'noodles'
  ];
  
  for (const keyword of keywords) {
    if (name.includes(keyword)) {
      return foodImages[keyword];
    }
  }
  
  // Try recipe type
  if (recipeType) {
    const type = recipeType.toLowerCase();
    if (type.includes('dessert') || type.includes('sweet')) {
      return foodImages['dessert'];
    }
    if (type.includes('pasta')) {
      return foodImages['pasta'];
    }
    if (type.includes('curry')) {
      return foodImages['curry'];
    }
  }
  
  // Return default if no match found
  return defaultFoodImage;
};

/**
 * Get image with error handling and loading states
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} fallbackSrc - Fallback image URL
 * @returns {object} - Image props with error handling
 */
export const getImageProps = (src, alt, fallbackSrc = defaultFoodImage) => {
  return {
    src: src || fallbackSrc,
    alt: alt || 'Recipe image',
    onError: (e) => {
      if (e.target.src !== fallbackSrc) {
        e.target.src = fallbackSrc;
      }
    },
    loading: 'lazy'
  };
};

/**
 * Generate a placeholder image URL with text
 * @param {string} text - Text to display on placeholder
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = (text = 'Recipe', width = 600, height = 400) => {
  const encodedText = encodeURIComponent(text);
  return `https://via.placeholder.com/${width}x${height}/f59e0b/ffffff?text=${encodedText}`;
};

export default {
  getRecipeImage,
  getImageProps,
  getPlaceholderImage
};
