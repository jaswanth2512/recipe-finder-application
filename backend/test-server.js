const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.post("/api/auth/forgot-password", (req, res) => {
  console.log("✅ Forgot password route hit!");
  console.log("Body:", req.body);
  res.json({ message: "Test route working", email: req.body.email });
});

app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
