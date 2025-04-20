"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const isModalView = !!handleDetailsOpen; // Determine if used in RecipesList (modal) or AllRecipes (navigation)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      {isModalView ? (
        <div
          onClick={() => handleDetailsOpen(recipe.idMeal)}
          className="block cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleDetailsOpen(recipe.idMeal)}
          aria-label={`View details for ${recipe.strMeal}`}
        >
          <Image
          width={720}
          height={360}
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-xl font-semibold mt-2 text-gray-800">
            {recipe.strMeal}
          </h3>
          <p className="text-gray-600">{recipe.strCategory}</p>
        </div>
      ) : (
        <Link href={`/recipes/${recipe.idMeal}`} passHref>
          <div
            className="block cursor-pointer"
            aria-label={`View details for ${recipe.strMeal}`}
          >
            <Image
            width={720}
            height={360}
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2 text-gray-800">
              {recipe.strMeal}
            </h3>
            <p className="text-gray-600">{recipe.strCategory}</p>
          </div>
        </Link>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => console.log("Add to cart:", recipe.idMeal)}
          className="px-4 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
          aria-label={`Add ${recipe.strMeal} to cart`}
        >
          Add to Cart
        </button>
        <button
          onClick={() => console.log("Add to wishlist:", recipe.idMeal)}
          className="px-4 py-2 bg-gradient-to-b from-green-200 to-green-300 text-green-900 rounded-full hover:to-green-400"
          aria-label={`Add ${recipe.strMeal} to wishlist`}
        >
          Add to Wishlist
        </button>
        {isModalView && (
          <button
            onClick={() => handleDetailsOpen(recipe.idMeal)}
            className="px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-300 text-blue-900 rounded-full hover:to-blue-400"
            aria-label={`View details for ${recipe.strMeal}`}
          >
            Details
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;