# 🍳 Recipe Finder Application

A modern, full-stack web application for discovering, searching, and managing recipes. Built with React, Node.js, Express, and MongoDB.

![Recipe Finder](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## ✨ Features

### 🔍 Recipe Search & Discovery
- **Advanced Search**: Search by recipe name, ingredients, chef, or cuisine type
- **Smart Filters**: Filter by cooking time, difficulty level, rating, and dietary preferences
- **Recipe Details**: Comprehensive recipe information including ingredients, instructions, and nutrition facts
- **Visual Interface**: Beautiful, responsive design with recipe images and ratings

### 👤 User Management
- **Authentication System**: Secure signup/login with JWT tokens
- **User Profiles**: Personalized user accounts with preferences
- **Premium Features**: Enhanced functionality for premium users

### 🍽️ Meal Planning & Organization
- **Meal Planner**: Plan your weekly meals with drag-and-drop interface
- **Saved Recipes**: Save favorite recipes for quick access
- **Grocery Lists**: Auto-generate shopping lists from meal plans
- **Recipe Collections**: Organize recipes into custom collections

### 📱 Modern User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive UI**: Smooth animations and transitions with Framer Motion
- **3D Elements**: Enhanced visual experience with Three.js integration
- **Voice Features**: Voice reading capabilities for recipes

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with Hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics and animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-finder-app.git
   cd recipe-finder-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   echo "MONGO_URI=mongodb://localhost:27017/recipeapp" > .env
   echo "JWT_SECRET=your-secret-key" >> .env
   
   # Seed the database with sample recipes
   npm run seed
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Application**
   ```bash
   # Terminal 1: Start Backend (from backend directory)
   npm start
   
   # Terminal 2: Start Frontend (from frontend directory)
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
recipe-finder-app/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main App component
│   └── package.json        # Frontend dependencies
├── docs/                   # Documentation files
│   ├── AUTHENTICATION_SETUP.md
│   ├── RECIPE_SETUP.md
│   └── MONGODB_SETUP.md
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/recipeapp
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

### Database Setup

The application uses MongoDB. Make sure MongoDB is running and accessible at `localhost:27017`.

To populate the database with sample recipes:
```bash
cd backend
npm run seed
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Recipe Endpoints
- `GET /api/recipes` - Get all recipes (with pagination)
- `GET /api/recipes/search` - Search recipes with filters
- `GET /api/recipes/:id` - Get specific recipe details
- `POST /api/recipes` - Create new recipe (authenticated)

### Meal Plan Endpoints
- `GET /api/meal-plan` - Get user's meal plans
- `POST /api/meal-plan` - Create meal plan
- `PUT /api/meal-plan/:id` - Update meal plan
- `DELETE /api/meal-plan/:id` - Delete meal plan

## 🧪 Testing

### Backend Testing
```bash
cd backend
# Test database connection
node testConnection.js

# Test user creation
node testUserCreation.js

# Test recipe API
node testRecipeAPI.js
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Recipe data sourced from various culinary databases
- UI/UX inspiration from modern cooking applications
- Community feedback and contributions

## 📞 Support

If you have any questions or need help with setup, please check our documentation:
- [Authentication Setup Guide](./AUTHENTICATION_SETUP.md)
- [Recipe Setup Guide](./RECIPE_SETUP.md)
- [MongoDB Setup Guide](./MONGODB_SETUP.md)

Or create an issue in this repository.

---

**Happy Cooking! 🍳✨**
