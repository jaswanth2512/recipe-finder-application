import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Ingredients from "./pages/Ingredients";
import MealPlanner from "./pages/MealPlanner";
import PhotoSearch from "./pages/PhotoSearch";
import RecipeDetails from "./pages/RecipeDetails";
import SearchRecipes from "./pages/SearchRecipes";
import SavedRecipes from "./pages/SavedRecipes";
import GroceryList from "./pages/GroceryList";
import Payment from "./pages/Payment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Chefs from "./pages/Chefs";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import AuthForm from "./components/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🚀 Default route shows Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* 🔐 Auth Routes */}
        <Route path="/login" element={<AuthForm type="Login" />} />
        <Route path="/signup" element={<AuthForm type="Signup" />} />

        {/* 💳 Payment Route */}
        <Route path="/payment" element={<Payment />} />

        {/* 📄 Public Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* 🛡️ Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/ingredients" element={<ProtectedRoute><Ingredients /></ProtectedRoute>} />
        <Route path="/meal-planner" element={<ProtectedRoute><MealPlanner /></ProtectedRoute>} />
        <Route path="/photo-search" element={<ProtectedRoute><PhotoSearch /></ProtectedRoute>} />
        <Route path="/search-recipes" element={<ProtectedRoute><SearchRecipes /></ProtectedRoute>} />
        <Route path="/saved-recipes" element={<ProtectedRoute><SavedRecipes /></ProtectedRoute>} />
        <Route path="/grocery-list" element={<ProtectedRoute><GroceryList /></ProtectedRoute>} />
        <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
