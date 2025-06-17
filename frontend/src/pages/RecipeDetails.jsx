// ✅ Fully fixed SearchPage.jsx with image display, working pagination, and backend fetch

import React, { useState, useEffect } from 'react';
import { FiClock, FiBookmark, FiSearch, FiStar, FiFilter, FiHeart } from 'react-icons/fi';
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([4, 5]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [timeRange, setTimeRange] = useState([15, 45]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const recipeTypes = ['Grilled', 'Roasted', 'Baked', 'Steamed', 'Pan-fried', 'Stir-fried', 'Vegan', 'Keto'];

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/recipes?q=${query}`);
      const data = await response.json();
      const mapped = data.map((r, i) => ({
        _id: r._id || i.toString(),
        name: r.name,
        image: r.image.includes('unsplash') ? `${r.image}?auto=format&fit=crop&w=600&h=400&q=80` : r.image,
        cookingTime: r.cookingTime,
        rating: r.rating,
        type: r.type,
        chef: r.chef || 'Unknown'
      }));
      setResults(mapped);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredResults = results.filter((r) => {
    const ratingMatch = selectedRatings.includes(Math.floor(Number(r.rating)));
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(r.type);
    const timeMatch = r.cookingTime >= timeRange[0] && r.cookingTime <= timeRange[1];
    return ratingMatch && typeMatch && timeMatch;
  });

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="min-h-screen bg-amber-50 px-4 lg:px-16 py-8 text-gray-900">
      <div className="mb-10">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-8 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold text-white mb-4">Discover Culinary Delights</h1>
          <p className="text-amber-100 mb-6 max-w-2xl">
            Find the perfect recipe for any occasion from our collection of chef-curated dishes
          </p>
          <div className="relative max-w-3xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search recipes, ingredients, or chefs..."
              className="w-full pl-14 pr-4 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-lg"
            />
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-amber-600 text-xl" />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading recipes...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedResults.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    <FaStar className="mr-1" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 group-hover:text-amber-600 transition-colors">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">By {item.chef}</p>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <FiClock className="text-amber-500" />
                    {item.cookingTime} mins
                  </span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === i + 1
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
