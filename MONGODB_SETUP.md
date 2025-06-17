# MongoDB Integration Setup Guide

## 🎯 **Overview**
Your application now connects to your MongoDB database structure:
- **Users Collection**: Stores user authentication and premium status
- **Recipes Collection**: Stores recipe data for search functionality

## 🗄️ **Database Structure**

### Your MongoDB Database: `recipeapp`
```
recipeapp/
├── admin/
├── recipes/          ← Recipe data for search
└── users/           ← User authentication & premium status
```

## 🔧 **Backend Configuration**

### Models Updated:
- **User Model**: Uses `users` collection for authentication
- **Recipe Model**: Uses `recipes` collection for recipe search

### API Endpoints:
- `POST /api/auth/login` - User authentication with premium status check
- `POST /api/auth/signup` - User registration
- `GET /api/recipes/search` - Search recipes with filters
- `GET /api/recipes/search-by-ingredients` - Search by ingredients
- `GET /api/recipes/:id` - Get detailed recipe information

## 🚀 **Setup Instructions**

### 1. **Test MongoDB Connection**
```bash
cd backend
node testConnection.js
```
This will show you:
- Available collections in your database
- Number of users and recipes
- Sample data from each collection

### 2. **Start Backend Server**
```bash
cd backend
npm start
```

### 3. **Start Frontend**
```bash
cd frontend
npm start
```

## 📊 **Features Implemented**

### ✅ **User Authentication**
- Login validates against your `users` collection
- Premium status checking from MongoDB
- User data includes: firstName, lastName, email, isPremium

### ✅ **Recipe Search (SearchRecipes.jsx)**
- Connects to your `recipes` collection
- Search by recipe name, chef, ingredients
- Filter by cooking time, rating, recipe type
- Clickable recipe cards with detailed modal

### ✅ **Ingredients Search (Ingredients.jsx)**
- Updated to use your MongoDB `recipes` collection
- Search recipes by ingredients you have
- Shows matching ingredients for each recipe
- Beautiful card layout with recipe details

## 🔍 **How to Add Sample Data**

### Add Sample Recipes to MongoDB:
```javascript
// Connect to your MongoDB and run:
db.recipes.insertMany([
  {
    name: "Chicken Curry",
    chef: "Chef Kumar",
    ingredients: ["chicken", "curry powder", "onions", "tomatoes", "coconut milk"],
    instructions: ["Heat oil", "Add onions", "Add chicken", "Add spices", "Simmer"],
    cookingTime: 45,
    rating: 4.5,
    type: "Indian",
    servings: 4,
    difficulty: "Medium",
    nutrition: {
      calories: 350,
      protein: "25g",
      carbs: "15g",
      fat: "20g"
    }
  },
  {
    name: "Pasta Carbonara",
    chef: "Chef Mario",
    ingredients: ["pasta", "eggs", "bacon", "parmesan cheese", "black pepper"],
    instructions: ["Boil pasta", "Cook bacon", "Mix eggs and cheese", "Combine all"],
    cookingTime: 20,
    rating: 4.8,
    type: "Italian",
    servings: 2,
    difficulty: "Easy",
    nutrition: {
      calories: 450,
      protein: "18g",
      carbs: "55g",
      fat: "15g"
    }
  }
]);
```

### Add Sample Users:
```javascript
// For testing authentication:
db.users.insertOne({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "$2a$10$hashedpassword", // Use bcrypt to hash
  isPremium: false,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

## 🎨 **Frontend Updates**

### SearchRecipes Page:
- ✅ Connects to MongoDB recipes collection
- ✅ Real-time search with filters
- ✅ Clickable recipe cards
- ✅ Detailed recipe modal with ingredients and instructions

### Ingredients Page:
- ✅ Updated to use MongoDB backend
- ✅ Search recipes by ingredients you have
- ✅ Shows matched ingredients for each recipe
- ✅ Beautiful card layout with recipe images

## 🔐 **Authentication Flow**

1. **Login**: Validates against `users` collection
2. **Premium Check**: Reads `isPremium` field from user document
3. **Features**: Premium users get access to advanced features
4. **Session**: JWT token includes user ID and premium status

## 📱 **Usage**

### Search Recipes:
1. Go to Dashboard → Search Recipes
2. Enter recipe name, chef, or ingredients
3. Use filters for cooking time, rating, type
4. Click any recipe card for detailed view

### Search by Ingredients:
1. Go to Dashboard → Ingredients
2. Enter ingredients you have (comma-separated)
3. View recipes that use those ingredients
4. Click recipes for full details

## 🛠️ **Troubleshooting**

### No Recipes Found:
- Check if your `recipes` collection has data
- Run `node testConnection.js` to verify
- Add sample recipes using the MongoDB shell

### Authentication Issues:
- Verify `users` collection exists
- Check password hashing (use bcrypt)
- Ensure email field is unique

### Connection Errors:
- Make sure MongoDB is running on localhost:27017
- Check database name is `recipeapp`
- Verify collection names: `users` and `recipes`

## 🎯 **Next Steps**

1. **Add Real Recipe Data**: Import your recipe collection
2. **Test Authentication**: Create test users with different premium status
3. **Customize Search**: Adjust search parameters as needed
4. **Add More Features**: Implement favorites, meal planning, etc.

Your application is now fully connected to your MongoDB database! 🎉
