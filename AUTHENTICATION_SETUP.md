# 🔐 Authentication Setup & Testing Guide

## ✅ **Issues Fixed**

### 1. **Database Connection**
- ✅ Fixed `.env` file to point to correct database: `recipeapp` instead of `recipes`
- ✅ Updated User model to use `users` collection
- ✅ Updated Recipe model to use `recipes` collection

### 2. **Frontend Authentication**
- ✅ Fixed AuthForm component to call backend APIs
- ✅ Added proper signup API integration
- ✅ Added proper login API integration
- ✅ Added error handling and loading states
- ✅ Added token storage and user data persistence

### 3. **Backend Enhancements**
- ✅ Enhanced error logging for debugging
- ✅ Improved MongoDB connection logging
- ✅ Added detailed signup/login process logging

## 🚀 **Testing Steps**

### 1. **Test MongoDB Connection**
```bash
cd backend
node testConnection.js
```
This will show:
- Available collections in your database
- Number of users and recipes
- Sample data from each collection

### 2. **Test User Creation**
```bash
cd backend
node testUserCreation.js
```
This will:
- Create a test user in MongoDB
- Verify the user was saved correctly
- Test password hashing and verification
- List all users in the database

### 3. **Start the Application**
```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm start
```

### 4. **Test Signup Process**
1. Go to `http://localhost:3000`
2. Click "Sign Up" tab
3. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Create Account"
5. Check browser console for logs
6. Check MongoDB to see if user was created

### 5. **Test Login Process**
1. Go to login tab
2. Enter the credentials you just created
3. Click "Sign In"
4. Should redirect to dashboard
5. Check localStorage for token and user data

## 🔍 **Debugging**

### Backend Logs to Watch For:
```
🔗 Connecting to MongoDB: mongodb://localhost:27017/recipeapp
✅ MongoDB connected successfully
📊 Database: recipeapp
Server running on port 5000

📝 Signup attempt: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
🔐 Hashing password...
👤 Creating new user...
💾 Saving user to MongoDB...
✅ User saved successfully with ID: [ObjectId]
```

### Frontend Logs to Watch For:
```
📝 Attempting signup with: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
✅ Signup successful: { token: '...', user: { ... } }

🔐 Attempting login with: { email: 'john@example.com' }
✅ Login successful: { token: '...', user: { ... } }
```

## 🗄️ **Database Structure**

Your MongoDB should now have:

### `users` Collection:
```javascript
{
  _id: ObjectId("..."),
  firstName: "John",
  lastName: "Doe", 
  email: "john@example.com",
  password: "$2a$10$hashedpassword...",
  isPremium: false,
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### `recipes` Collection:
```javascript
{
  _id: ObjectId("..."),
  name: "Chicken Curry",
  chef: "Chef Kumar",
  ingredients: ["chicken", "curry powder", "onions"],
  instructions: ["Heat oil", "Add onions", "Add chicken"],
  cookingTime: 45,
  rating: 4.5,
  type: "Indian",
  // ... other fields
}
```

## 🛠️ **Common Issues & Solutions**

### Issue: "User not saving to MongoDB"
**Solution**: 
- Check if MongoDB is running: `mongod --version`
- Verify database name in `.env`: `MONGO_URI=mongodb://localhost:27017/recipeapp`
- Check backend logs for connection errors

### Issue: "Login not working"
**Solution**:
- Verify user exists in database
- Check password hashing (use test script)
- Check browser console for API errors
- Verify backend is running on port 5000

### Issue: "Frontend not calling backend"
**Solution**:
- Check browser Network tab for API calls
- Verify CORS is enabled in backend
- Check if backend URL is correct: `http://localhost:5000`

## 📱 **User Flow**

### Signup:
1. User fills signup form
2. Frontend validates passwords match
3. Frontend calls `POST /api/auth/signup`
4. Backend hashes password
5. Backend saves user to MongoDB `users` collection
6. Backend returns JWT token
7. Frontend stores token and redirects to dashboard

### Login:
1. User fills login form
2. Frontend calls `POST /api/auth/login`
3. Backend finds user in MongoDB
4. Backend verifies password with bcrypt
5. Backend returns JWT token and user data
6. Frontend stores token and redirects to dashboard

## 🎯 **Next Steps**

1. **Test the complete flow** using the steps above
2. **Add sample recipes** to test search functionality
3. **Verify premium status** is working correctly
4. **Test recipe search** with your MongoDB data

## 🔧 **Quick Commands**

```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ismaster')"

# View users in database
mongo recipeapp --eval "db.users.find().pretty()"

# View recipes in database  
mongo recipeapp --eval "db.recipes.find().pretty()"

# Clear users collection (for testing)
mongo recipeapp --eval "db.users.deleteMany({})"
```

Your authentication system is now fully connected to MongoDB! 🎉
