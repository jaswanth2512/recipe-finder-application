const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  premiumStartDate: {
    type: Date,
    default: null,
  },
  premiumPlan: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: null,
  },
  paymentHistory: [{
    amount: Number,
    plan: String,
    date: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: String,
  }],
  mealPlannerPreferences: {
    dietType: {
      type: String,
      default: "mediterranean"
    },
    allergies: [String],
    calorieGoal: {
      type: Number,
      default: 2000
    },
    cuisinePreferences: [String],
    mealsPerDay: {
      type: Number,
      default: 3
    }
  },
}, {
  timestamps: true,
});

// Use the "users" collection in MongoDB
module.exports = mongoose.model("User", userSchema, "users");
