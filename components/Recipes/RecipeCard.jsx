"use client";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const isModalView = !!handleDetailsOpen; // Determine if used in RecipesList (modal) or AllRecipes (navigation)
  const {addToCart, addToWishlist} = useCart()
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const handleAddToCart = () => {
    addToCart(recipe);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddWishlist = () =>{
    addToWishlist(recipe)
    setWishlisted(true)
    setTimeout(() => setWishlisted(false), 2000)
  }
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
        <Link href={`/all-recipes/${recipe.idMeal}`} passHref>
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
          onClick={handleAddToCart}
          className="px-4 py-2 inline-flex items-center bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
          aria-label={`Add ${recipe.strMeal} to cart`}
        >
          <IoCart className="mr-2" size={20} />
          {added ? "Added!" : "Add to Cart"}
        </button>
        <button
          onClick={handleAddWishlist}
          className={`p-2 bg-gray-50 ${wishlisted ? 'text-red-500' : 'text-slate-800'} rounded-full hover:bg-gray-100`}
          aria-label={`Add ${recipe.strMeal} to cart`}
        >
          <FaHeart size={20} />
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