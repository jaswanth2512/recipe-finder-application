const mongoose = require('mongoose');
const User = require('./models/User');
const Recipe = require('./models/Recipe');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testConnection = async () => {
  try {
    console.log('🔗 Testing MongoDB connection...');
    
    // Test connection
    const connection = mongoose.connection;
    console.log('✅ Connected to MongoDB:', connection.name);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Available collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Test Users collection
    console.log('\n👥 Testing Users collection...');
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users in the database`);
    
    if (userCount > 0) {
      const sampleUser = await User.findOne();
      console.log('Sample user:', {
        email: sampleUser.email,
        firstName: sampleUser.firstName,
        isPremium: sampleUser.isPremium
      });
    }
    
    // Test Recipes collection
    console.log('\n🍳 Testing Recipes collection...');
    const recipeCount = await Recipe.countDocuments();
    console.log(`Found ${recipeCount} recipes in the database`);
    
    if (recipeCount > 0) {
      const sampleRecipe = await Recipe.findOne();
      console.log('Sample recipe:', {
        name: sampleRecipe.name,
        chef: sampleRecipe.chef,
        ingredients: sampleRecipe.ingredients?.slice(0, 3) || []
      });
    } else {
      console.log('⚠️  No recipes found. You may need to add some recipes to test the search functionality.');
    }
    
    console.log('\n✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing connection:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the test
testConnection();
