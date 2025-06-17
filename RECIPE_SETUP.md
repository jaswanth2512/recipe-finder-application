# Recipe Search Setup Guide

## 🚀 Quick Start

### 1. Setup Database
```bash
cd backend
npm run seed
```
This will populate your MongoDB database with sample recipes.

### 2. Start Backend Server
```bash
cd backend
npm start
```
Server will run on http://localhost:5000

### 3. Start Frontend
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

### 4. Access Recipe Search
- Navigate to Dashboard → Search Recipes
- Search for recipes or browse all available recipes
- Click any recipe card to view detailed information

## 📋 Features

### ✅ Recipe Search Page
- **Modern UI**: Clean, organized layout with gradient backgrounds
- **Search Functionality**: Search by recipe name, ingredients, or chef
- **Filter Options**: Filter by cooking time, rating, and recipe type
- **Responsive Design**: Works on all device sizes
- **No Pagination**: Smooth scrolling without page numbers

### ✅ Recipe Detail Modal
- **Complete Information**: 
  - Full ingredient list with quantities
  - Step-by-step cooking instructions
  - Nutritional information (calories, protein, carbs, fat, fiber, sugar)
  - Cooking time, prep time, servings, difficulty level
  - Chef information and recipe rating
- **Interactive Elements**: Save recipe and add to meal plan buttons
- **Professional Layout**: Beautiful, organized presentation

### ✅ Backend API
- **Search Endpoint**: `/api/recipes/search` with advanced filtering
- **Recipe Details**: `/api/recipes/:id` for individual recipe data
- **MongoDB Integration**: Connects to localhost:27017
- **Error Handling**: Graceful fallbacks and error responses

## 🗄️ Database Schema

### Recipe Model Fields:
- `name`: Recipe title
- `description`: Recipe description
- `image`: Recipe image URL
- `chef`: Chef name
- `cookingTime`: Cooking time in minutes
- `prepTime`: Preparation time in minutes
- `servings`: Number of servings
- `difficulty`: Easy, Medium, or Hard
- `type`: Recipe category (Grilled, Baked, Vegan, etc.)
- `rating`: Recipe rating (1-5)
- `ingredients`: Array of ingredient strings
- `instructions`: Array of instruction steps
- `nutrition`: Object with nutritional information
- `cuisine`: Cuisine type

## 🍽️ Sample Recipes Included

1. **Truffle Infused Mushroom Risotto** (Italian)
2. **Mediterranean Grilled Octopus** (Mediterranean)
3. **Korean Spicy Tofu Stew** (Korean, Vegan)
4. **Herb Crusted Rack of Lamb** (French)
5. **Thai Green Curry** (Thai)
6. **Quinoa Power Bowl** (Vegan, International)

## 🔧 Technical Details

### Frontend Technologies:
- React with Hooks
- Framer Motion for animations
- Axios for API calls
- Tailwind CSS for styling
- React Router for navigation

### Backend Technologies:
- Node.js with Express
- MongoDB with Mongoose
- CORS enabled
- RESTful API design

### API Endpoints:
- `GET /api/recipes/search` - Search recipes with filters
- `GET /api/recipes/:id` - Get detailed recipe information
- `GET /api/recipes` - Get all recipes with pagination

## 🐛 Error Handling

The application includes comprehensive error handling:
- **API Fallbacks**: Mock data if database is unavailable
- **Null Safety**: Safe access to nested object properties
- **Loading States**: Loading indicators during API calls
- **User Feedback**: Clear error messages for users

## 🎨 UI/UX Features

- **Smooth Animations**: Framer Motion transitions
- **Hover Effects**: Interactive recipe cards
- **Modal System**: Full-screen recipe details
- **Responsive Grid**: Adapts to different screen sizes
- **Professional Design**: Modern gradient backgrounds and clean typography

## 📱 Mobile Responsive

The recipe search page is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔄 Future Enhancements

Potential improvements that could be added:
- User recipe ratings and reviews
- Recipe favorites and collections
- Advanced search filters (dietary restrictions, cuisine types)
- Recipe sharing functionality
- Meal planning integration
- Shopping list generation from recipes

---

**Note**: Make sure MongoDB is running on localhost:27017 before starting the application.
