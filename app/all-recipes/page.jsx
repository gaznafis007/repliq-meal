"use client";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard";

const AllRecipes = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [category, setCategory] = useState("");
  const recipesPerPage = 9;

  // Debounce function for search
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: HttpKit.getCategories,
  });

  // Fetch recipes
  const { data: recipes = [], isLoading, error } = useQuery({
    queryKey: ["allRecipes", searchInput, searchType, category],
    queryFn: async () => {
      if (category) {
        return await HttpKit.filterByCategory(category);
      }
      if (searchInput.trim()) {
        switch (searchType) {
          case "name":
            return await HttpKit.searchRecipesByName(searchInput);
          case "ingredient":
            return await HttpKit.searchRecipesByIngredient(searchInput);
          case "category":
            return await HttpKit.filterByCategory(searchInput);
          default:
            return await HttpKit.searchRecipes("", "name");
        }
      }
      return await HttpKit.searchRecipes("", "name");
    },
  });

  // Pagination logic
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const paginatedRecipes = recipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchChange = debounce((value) => {
    setSearchInput(value);
    setPage(1); // Reset to page 1 on search
  }, 300);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1); // Reset to page 1 on category change
  };

  const handleDetailsOpen = (id) => {
    // Handled by Link in RecipeCard
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">All Recipes</h1>
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex items-center w-full p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder={`Search by ${searchType}`}
                className="w-full p-4 rounded-full outline-none bg-transparent"
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label={`Search recipes by ${searchType}`}
              />
              <button
                type="button"
                title="Search"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
                aria-label="Trigger search"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">
                  Search
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-auto text-yellow-900 md:hidden"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="p-2 border rounded-full bg-white text-gray-700 w-full md:w-auto"
                aria-label="Select search type"
              >
                <option value="name">Name</option>
                <option value="ingredient">Ingredient</option>
                <option value="category">Category</option>
              </select>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="p-2 border rounded-full bg-white text-gray-700 w-full md:w-auto"
                aria-label="Select recipe category"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.idCategory} value={cat.strCategory}>
                    {cat.strCategory}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Recipes Grid */}
        {isLoading ? (
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 text-yellow-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              ></path>
            </svg>
            <p className="mt-2 text-gray-600">Loading recipes...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            Error loading recipes: {error.message}
          </div>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-600">No recipes found.</p>
        ) : (
          <>
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3 animate-fade-in">
              {paginatedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
            {/* Custom Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Previous page"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-full transition ${
                    page === i + 1
                      ? "bg-yellow-400 text-yellow-900"
                      : "bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 hover:to-red-300"
                  }`}
                  aria-label={`Page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;