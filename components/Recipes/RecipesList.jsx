"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name");

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch recipes based on search input and type
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", searchInput, searchType],
    queryFn: () => {
      if (!searchInput.trim()) return HttpKit.getTopRecipes();
      switch (searchType) {
        case "name":
          return HttpKit.searchRecipesByName(searchInput);
        case "ingredient":
          return HttpKit.searchRecipesByIngredient(searchInput);
        case "category":
          return HttpKit.filterByCategory(searchInput);
        default:
          return HttpKit.getTopRecipes();
      }
    },
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  // Handle search input change with debouncing
  const handleSearchChange = debounce((value) => {
    setSearchInput(value);
  }, 300);

  const handleDetailsOpen = (id) => {
    setRecipeId(id);
    setOpenDetails(true);
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-2xl font-bold text-gray-800">Top Recipes</h1>
        {/* Search form */}
        <div className="w-full mt-12">
          <div className="relative flex flex-col md:flex-row items-center p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2 gap-2">
            <div className="flex items-center w-full">
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
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 border rounded-full bg-white text-gray-700"
              aria-label="Select search type"
            >
              <option value="name">Name</option>
              <option value="ingredient">Ingredient</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
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
                <p>Loading recipes...</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">
                Error loading recipes: {error.message}
              </div>
            ) : recipes?.length > 0 ? (
              <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3 animate-fade-in">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe?.idMeal}
                    recipe={recipe}
                    handleDetailsOpen={handleDetailsOpen}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center col-span-3">No recipes found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
        <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default RecipesList;