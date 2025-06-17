const express = require("express");
const router = express.Router();
const { 
  signup, 
  sendSignupOTP, 
  verifySignupOTP, 
  login, 
  checkEmail, 
  upgradeToPremium, 
  forgotPassword, 
  verifyResetOTP, 
  resetPassword 
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

console.log("🔗 Auth routes loaded, functions available:", {
  signup: typeof signup,
  sendSignupOTP: typeof sendSignupOTP,
  verifySignupOTP: typeof verifySignupOTP,
  login: typeof login,
  checkEmail: typeof checkEmail,
  forgotPassword: typeof forgotPassword,
  verifyResetOTP: typeof verifyResetOTP,
  resetPassword: typeof resetPassword
});

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

// Test signup route
router.post("/test-signup", (req, res) => {
  res.json({
    message: "Test signup working!",
    body: req.body,
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
router.post("/signup", signup); // Direct signup (backward compatibility)
router.post("/send-signup-otp", sendSignupOTP); // Step 1: Send OTP for signup
router.post("/verify-signup-otp", verifySignupOTP); // Step 2: Verify OTP and complete signup
router.post("/login", login);
router.post("/check-email", checkEmail);

// Forgot password routes
console.log("🔗 Registering forgot password routes...");
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);

// Premium upgrade
router.post("/upgrade-premium", authMiddleware, upgradeToPremium);

module.exports = router;
