"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useCart } from "@/hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

const SingleRecipe = ({ id, setIsOpen }) => {
  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
    enabled: !!id,
  });
  const { addToCart, addToWishlist } = useCart();
    const [added, setAdded] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const handleAddToCart = () => {
      addToCart(recipe);
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    };
    const handleAddWishlist = () => {
      addToWishlist(recipe);
      setWishlisted(true);
      setTimeout(() => setWishlisted(false), 2000);
    };
  // Extract ingredients
  const ingredients = recipe
    ? Object.keys(recipe)
        .filter((key) => key.startsWith("strIngredient") && recipe[key])
        .map((key, index) => ({
          ingredient: recipe[key],
          measure: recipe[`strMeasure${index + 1}`] || "",
        }))
    : [];

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
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
          <p className="mt-2 text-gray-600">Loading recipe...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading recipe: {error.message}
        </div>
      ) : !recipe ? (
        <p className="text-center text-gray-600">Recipe not found.</p>
      ) : (
        <div className="animate-fade-in">
          <div className="md:flex md:space-x-6">
            <div className="relative w-full md:w-1/3 h-64">
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 md:mt-0 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {recipe.strMeal}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Category:</strong> {recipe.strCategory}
              </p>
              <p className="text-gray-600">
                <strong>Area:</strong> {recipe.strArea}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Ingredients
                </h3>
                <ul className="list-disc pl-5 mt-2">
                  {ingredients.map(({ ingredient, measure }, index) => (
                    <li key={index} className="text-gray-600">
                      {measure} {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Instructions
            </h3>
            <p className="text-gray-600 mt-2 whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>
          {recipe.strYoutube && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Video Tutorial
              </h3>
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-900 hover:underline"
                aria-label="Watch video tutorial on YouTube"
              >
                Watch on YouTube
              </a>
            </div>
          )}
          {/* Cart/Wishlist Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 inline-flex items-center bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
              aria-label={`Add ${recipe.strMeal} to cart`}
            >
              <IoCart className="mr-2" size={20} />
              {added ? "Added!" : "Add to Cart"}
            </button>
            <button
              onClick={handleAddWishlist}
              className={`p-2 bg-gray-50 ${
                wishlisted ? "text-red-500" : "text-slate-800"
              } rounded-full hover:bg-gray-100`}
              aria-label={`Add ${recipe.strMeal} to cart`}
            >
              <FaHeart size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
