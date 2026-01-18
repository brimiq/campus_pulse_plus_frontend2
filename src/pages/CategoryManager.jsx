import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import { toast } from "react-hot-toast";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Default categories if API is not available
  const defaultCategories = [
    { id: "all", name: "All Categories" },
    { id: "facilities", name: "Facilities & Maintenance" },
    { id: "tech", name: "Tech Issues" },
    { id: "safety", name: "Safety" },
    { id: "housing", name: "Housing" },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/categories`);
      
      if (response.ok) {
        const data = await response.json();
        setCategories([{ id: "all", name: "All Categories" }, ...data]);
      } else {
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.log("Using default categories");
      setCategories(defaultCategories);
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryChange(e) {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    
    const category = categories.find(c => c.id === categoryId);
    if (category && categoryId !== "all") {
      toast.success(`Selected: ${category.name}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b-4 border-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors mb-4"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-black text-gray-900">
                CATEGORY MANAGER
              </h1>
              <p className="text-gray-600 mt-1">
                Select and manage post categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Select a Category
          </h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading categories...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Category Dropdown */}
              <div>
                <label
                  htmlFor="category-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Choose a category to filter posts:
                </label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full md:w-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Category Info */}
              {selectedCategory !== "all" && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Selected Category:</strong>{" "}
                    {categories.find((c) => c.id === selectedCategory)?.name}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Category ID: {selectedCategory}
                  </p>
                </div>
              )}

              {/* Quick Filter Buttons */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Quick Filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 5).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Selection */}
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          )}
        </div>

        {/* Category Stats */}
        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Available Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(1).map((category) => (
              <div
                key={category.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Click to select this category
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

