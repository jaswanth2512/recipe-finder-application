const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class RecipeAPI {
  // Get all recipes with optional filters
  async getRecipes(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          queryParams.append(key, params[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/recipes?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  // Get featured recipes (top-rated)
  async getFeaturedRecipes() {
    try {
      return await this.getRecipes({ featured: true, limit: 4 });
    } catch (error) {
      console.error('Error fetching featured recipes:', error);
      throw error;
    }
  }

  // Get single recipe by ID
  async getRecipeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }

  // Search recipes by name or description
  async searchRecipes(searchTerm, filters = {}) {
    try {
      const params = {
        search: searchTerm,
        ...filters
      };
      
      return await this.getRecipes(params);
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }

  // Search recipes by ingredients
  async searchByIngredients(ingredients) {
    try {
      const ingredientString = Array.isArray(ingredients) 
        ? ingredients.join(',') 
        : ingredients;

      const response = await fetch(
        `${API_BASE_URL}/recipes/search/ingredients?ingredients=${encodeURIComponent(ingredientString)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching recipes by ingredients:', error);
      throw error;
    }
  }

  // Get recipes by type/category
  async getRecipesByType(type) {
    try {
      return await this.getRecipes({ type });
    } catch (error) {
      console.error('Error fetching recipes by type:', error);
      throw error;
    }
  }

  // Get recipes by difficulty
  async getRecipesByDifficulty(difficulty) {
    try {
      return await this.getRecipes({ difficulty });
    } catch (error) {
      console.error('Error fetching recipes by difficulty:', error);
      throw error;
    }
  }

  // Get recipes by cuisine
  async getRecipesByCuisine(cuisine) {
    try {
      return await this.getRecipes({ cuisine });
    } catch (error) {
      console.error('Error fetching recipes by cuisine:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const recipeAPI = new RecipeAPI();
export default recipeAPI;
