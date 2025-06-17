const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ Apply middleware first
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Load routes
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const mealPlanRoutes = require("./routes/mealPlanRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ✅ Register routes
console.log("🔗 Registering auth routes...");
app.use("/api/auth", authRoutes);
console.log("🔗 Registering recipe routes...");
app.use("/api/recipes", recipeRoutes);
console.log("🔗 Registering meal plan routes...");
app.use("/api/meal-plan", mealPlanRoutes);
console.log("🔗 Registering contact routes...");
app.use("/api/contact", contactRoutes);



// ✅ MongoDB Connection
console.log('🔗 Connecting to MongoDB:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
