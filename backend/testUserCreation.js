const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testUserCreation = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    // Wait for connection
    await mongoose.connection.once('open', () => {
      console.log('✅ Connected to MongoDB');
    });

    // Test creating a user
    console.log('\n👤 Testing user creation...');
    
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    };

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('🗑️ Removing existing test user...');
      await User.deleteOne({ email: testUser.email });
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Create user
    console.log('💾 Creating user...');
    const user = new User({
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      email: testUser.email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    console.log('✅ User created successfully!');
    console.log('User details:', {
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      isPremium: savedUser.isPremium,
      createdAt: savedUser.createdAt
    });

    // Test finding the user
    console.log('\n🔍 Testing user lookup...');
    const foundUser = await User.findOne({ email: testUser.email });
    if (foundUser) {
      console.log('✅ User found in database!');
      console.log('Found user:', {
        id: foundUser._id,
        email: foundUser.email,
        firstName: foundUser.firstName
      });
    } else {
      console.log('❌ User not found in database');
    }

    // Test password verification
    console.log('\n🔐 Testing password verification...');
    const isPasswordValid = await bcrypt.compare(testUser.password, foundUser.password);
    console.log('Password valid:', isPasswordValid ? '✅ Yes' : '❌ No');

    // List all users
    console.log('\n📋 All users in database:');
    const allUsers = await User.find({}, 'firstName lastName email isPremium createdAt');
    console.log(`Found ${allUsers.length} users:`);
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - Premium: ${user.isPremium}`);
    });

    console.log('\n✅ Test completed successfully!');

  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the test
testUserCreation();
