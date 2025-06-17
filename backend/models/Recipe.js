const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "A delicious recipe"
  },
  image: {
    type: String,
    required: true
  },
  chef: {
    type: String,
    default: "Chef Unknown"
  },
  cookingTime: {
    type: Number,
    default: 30 // in minutes
  },
  prepTime: {
    type: Number,
    default: 15 // in minutes
  },
  servings: {
    type: Number,
    default: 4
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  type: {
    type: String,
    default: 'Baked',
    enum: ['Grilled', 'Roasted', 'Baked', 'Steamed', 'Pan-fried', 'Stir-fried', 'Vegan', 'Keto']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.0
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String,
    required: true
  }],
  // Legacy field mapping
  steps: [{
    type: String
  }],
  nutrition: {
    calories: {
      type: Number,
      default: 250
    },
    protein: {
      type: String,
      default: '15g'
    },
    carbs: {
      type: String,
      default: '30g'
    },
    fat: {
      type: String,
      default: '8g'
    },
    fiber: {
      type: String,
      default: '2g'
    },
    sugar: {
      type: String,
      default: '5g'
    }
  },
  tags: [{
    type: String
  }],
  cuisine: {
    type: String,
    default: 'International'
  }
}, {
  timestamps: true
});

// Index for search functionality
recipeSchema.index({
  name: 'text',
  description: 'text',
  chef: 'text',
  ingredients: 'text',
  tags: 'text'
});

// Index for filtering
recipeSchema.index({ type: 1, rating: 1, cookingTime: 1 });

// Virtual to map steps to instructions for backward compatibility
recipeSchema.virtual('instructionsFromSteps').get(function() {
  return this.steps && this.steps.length > 0 ? this.steps : this.instructions;
});

// Specify the collection name: "recipes" to match your MongoDB structure
module.exports = mongoose.model("Recipe", recipeSchema, "recipes");
