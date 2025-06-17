const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTPEmail, sendWelcomeEmail } = require("../services/emailService");

// Direct signup without OTP
exports.signup = async (req, res) => {
  console.log("🚀 DIRECT SIGNUP CALLED - NEW VERSION!");
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword,
      isPremium: false
    });
    await user.save();

    try {
      await sendWelcomeEmail(email, firstName);
    } catch (emailError) {
      console.log("Welcome email failed:", emailError.message);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      msg: "Account created successfully!",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isPremium: user.isPremium
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('🔐 Login attempt for email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found in database');
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log('✅ User found:', { id: user._id, email: user.email, isPremium: user.isPremium });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log('✅ Password verified, generating token...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log('✅ Login successful');
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isPremium: user.isPremium
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User with this email does not exist" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save OTP for password reset
    const otpRecord = new OTP({
      email,
      otp,
      userData: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password // Keep existing password
      }
    });
    await otpRecord.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.firstName);
      res.status(200).json({
        msg: "OTP sent to your email for password reset",
        email
      });
    } catch (emailError) {
      console.log("📧 Email sending failed, but OTP generated for testing:", otp);
      // For testing: show OTP in response when email fails
      res.status(200).json({
        msg: "Email service temporarily unavailable. For testing, your OTP is: " + otp,
        email,
        testOTP: otp // Remove this in production
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Verify OTP for password reset
exports.verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required" });
    }

    // Find OTP record
    const otpRecord = await OTP.findOne({ email, otp, verified: false });
    if (!otpRecord) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Mark OTP as verified but don't delete yet
    otpRecord.verified = true;
    await otpRecord.save();

    res.status(200).json({ 
      msg: "OTP verified successfully. You can now reset your password.",
      verified: true
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ msg: "Email, OTP, and new password are required" });
    }

    // Find verified OTP record
    const otpRecord = await OTP.findOne({ email, otp, verified: true });
    if (!otpRecord) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete OTP record
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ 
      msg: "Password reset successfully! You can now login with your new password."
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Check if email exists
exports.checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Upgrade user to premium
exports.upgradeToPremium = async (req, res) => {
  const { plan, paymentMethod, amount } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.isPremium = true;
    user.premiumStartDate = new Date();
    user.premiumPlan = plan;
    user.paymentHistory.push({
      amount,
      plan,
      paymentMethod,
      date: new Date()
    });

    await user.save();

    res.json({ 
      msg: "Successfully upgraded to premium",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isPremium: user.isPremium
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Step 1: Send OTP for signup verification
exports.sendSignupOTP = async (req, res) => {
  try {
    const { email, firstName } = req.body;

    // Validate required fields
    if (!email || !firstName) {
      return res.status(400).json({ msg: "Email and first name are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save or update OTP
    await OTP.findOneAndUpdate(
      { email },
      { email, otp, expiresAt: otpExpiry, type: 'signup' },
      { upsert: true, new: true }
    );

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, firstName);
      console.log("📧 OTP email sent successfully. OTP for testing:", otp);
      res.status(200).json({
        msg: "OTP sent to your email. Please verify to complete signup.",
        email,
        testOTP: otp // For testing - remove in production
      });
    } catch (emailError) {
      console.log("📧 Email sending failed, but OTP generated for testing:", otp);
      // For testing: show OTP in response when email fails
      res.status(200).json({
        msg: "Email service temporarily unavailable. For testing, your OTP is: " + otp,
        email,
        testOTP: otp // Remove this in production
      });
    }

  } catch (error) {
    console.error("Send signup OTP error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Step 2: Verify OTP and complete signup
exports.verifySignupOTP = async (req, res) => {
  try {
    const { email, otp, firstName, lastName, password } = req.body;

    // Validate required fields
    if (!email || !otp || !firstName || !lastName || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Find and verify OTP
    const otpRecord = await OTP.findOne({
      email,
      otp,
      type: 'signup',
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Check if user already exists (double check)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isPremium: false
    });

    await user.save();

    // Delete used OTP
    await OTP.deleteOne({ email, type: 'signup' });

    // Send welcome email
    try {
      await sendWelcomeEmail(email, firstName);
      console.log("✅ Welcome email sent successfully");
    } catch (emailError) {
      console.log("⚠️ Welcome email failed, but signup successful:", emailError.message);
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      msg: "Account created successfully! Welcome to Smart Recipes!",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isPremium: user.isPremium
      }
    });

  } catch (error) {
    console.error("Verify signup OTP error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
