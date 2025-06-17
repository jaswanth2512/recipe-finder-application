const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: Object, required: true },
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
