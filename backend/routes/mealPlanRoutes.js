const express = require("express");
const router = express.Router();
const MealPlan = require("../models/MealPlan");
const auth = require("../middleware/authMiddleware");

// Save meal plan
router.post("/save", auth, async (req, res) => {
  try {
    const existing = await MealPlan.findOne({ userId: req.user.id });
    if (existing) {
      existing.plan = req.body.plan;
      await existing.save();
    } else {
      await MealPlan.create({ userId: req.user.id, plan: req.body.plan });
    }
    res.json({ msg: "Plan saved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Load meal plan
router.get("/load", auth, async (req, res) => {
  try {
    const plan = await MealPlan.findOne({ userId: req.user.id });
    res.json(plan ? plan.plan : {});
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
