import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiCheck,
  FiX
} from 'react-icons/fi';

const GroceryList = () => {
  const navigate = useNavigate();
  const [groceryItems, setGroceryItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    loadGroceryList();
  }, []);

  const loadGroceryList = () => {
    try {
      const items = JSON.parse(localStorage.getItem('groceryList') || '[]');
      setGroceryItems(items);
    } catch (error) {
      console.error('Error loading grocery list:', error);
      setGroceryItems([]);
    }
  };

  const saveGroceryList = (items) => {
    try {
      localStorage.setItem('groceryList', JSON.stringify(items));
      setGroceryItems(items);
    } catch (error) {
      console.error('Error saving grocery list:', error);
      alert('Error saving grocery list. Please try again.');
    }
  };

  const handleToggleItem = (itemId) => {
    const updatedItems = groceryItems.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    saveGroceryList(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = groceryItems.filter(item => item.id !== itemId);
    saveGroceryList(updatedItems);
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    
    const newGroceryItem = {
      id: Date.now() + Math.random(),
      text: newItem.trim(),
      completed: false,
      addedFrom: 'Manual',
      addedAt: new Date().toISOString()
    };
    
    const updatedItems = [...groceryItems, newGroceryItem];
    saveGroceryList(updatedItems);
    setNewItem('');
    setIsAddingItem(false);
  };

  const handleClearCompleted = () => {
    const updatedItems = groceryItems.filter(item => !item.completed);
    saveGroceryList(updatedItems);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all items from your grocery list?')) {
      saveGroceryList([]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const completedCount = groceryItems.filter(item => item.completed).length;
  const totalCount = groceryItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 flex items-center bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <FiArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-2 mx-auto">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">SR</span>
          </div>
          <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            Grocery List
          </span>
        </div>
        <div className="w-24"></div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-green-50 rounded-full mb-6 border border-green-100"
          >
            <FiShoppingCart className="text-green-500 mr-2" />
            <span className="text-sm font-medium text-green-800">SHOPPING MADE EASY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Grocery <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">List</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Keep track of ingredients you need for your favorite recipes
          </motion.p>
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{completedCount} of {totalCount} items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              ></div>
            </div>
          </motion.div>
        )}

        {/* Add Item Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100"
        >
          {!isAddingItem ? (
            <button
              onClick={() => setIsAddingItem(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors"
            >
              <FiPlus size={20} />
              Add New Item
            </button>
          ) : (
            <div className="flex gap-3">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                placeholder="Enter grocery item..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FiCheck size={18} />
              </button>
              <button
                onClick={() => {
                  setIsAddingItem(false);
                  setNewItem('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Grocery Items */}
        {groceryItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Shopping Items</h3>
                <div className="flex gap-2">
                  {completedCount > 0 && (
                    <button
                      onClick={handleClearCompleted}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Clear Completed
                    </button>
                  )}
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {groceryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                    item.completed ? 'opacity-60' : ''
                  }`}
                >
                  <button
                    onClick={() => handleToggleItem(item.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      item.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {item.completed && <FiCheck size={12} />}
                  </button>

                  <div className="flex-1">
                    <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.text}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>From: {item.addedFrom}</span>
                      <span>Added: {formatDate(item.addedAt)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FiShoppingCart size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Your Grocery List is Empty</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Add ingredients from recipes or create your own shopping list to get started!
            </p>
            <button
              onClick={() => setIsAddingItem(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add First Item
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GroceryList;
