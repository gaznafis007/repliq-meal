"use client";
import { useQuery } from "@tanstack/react-query";
import HttpKit from "@/common/helpers/HttpKit";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { IoArrowBack, IoShareSocial, IoCart, IoHeart, IoTrash } from "react-icons/io5";

import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";

const RecipeDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
    enabled: !!id,
  });

  const ingredients = recipe
    ? Object.keys(recipe)
        .filter((key) => key.startsWith("strIngredient") && recipe[key])
        .map((key, index) => ({
          ingredient: recipe[key],
          measure: recipe[`strMeasure${index + 1}`] || "",
        }))
    : [];

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAddToCart = () => {
    addToCart(recipe);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDelete = () => {
    const updatedRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]").filter(
      (r) => r.idMeal !== id
    );
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    toast.success("Recipe deleted successfully!");
    router.push("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <button
          onClick={() => router.push("/recipes")}
          className="inline-flex items-center mb-6 text-yellow-900 hover:underline"
          aria-label="Back to all recipes"
        >
          <IoArrowBack className="mr-2" size={20} />
          Back to All Recipes
        </button>
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
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <div className="md:flex md:space-x-6">
              <div className="relative w-full md:w-1/3 h-64">
                <Image
                  src={recipe.strMealThumb || "/images/home/food.webp"}
                  alt={recipe.strMeal}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="mt-4 md:mt-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-800">
                  {recipe.strMeal}
                </h1>
                <p className="text-gray-600 mt-2">
                  <strong>Category:</strong> {recipe.strCategory}
                </p>
                <p className="text-gray-600">
                  <strong>Area:</strong> {recipe.strArea}
                </p>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Ingredients
                  </h2>
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
              <h2 className="text-xl font-semibold text-gray-800">
                Instructions
              </h2>
              <p className="text-gray-600 mt-2 whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>
            {recipe.strYoutube && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Video Tutorial
                </h2>
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-900 hover:underline"
                  aria-label="Watch video tutorial on YouTube"
                >
                  <IoShareSocial className="mr-2" size={20} />
                  Watch on YouTube
                </a>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
                aria-label={`Add ${recipe.strMeal} to cart`}
              >
                <IoCart className="mr-2" size={20} />
                {added ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={() => console.log("Add to wishlist:", recipe.idMeal)}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-b from-green-200 to-green-300 text-green-900 rounded-full hover:to-green-400"
                aria-label={`Add ${recipe.strMeal} to wishlist`}
              >
                <IoHeart className="mr-2" size={20} />
                Add to Wishlist
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-b from-blue-200 to-blue-300 text-blue-900 rounded-full hover:to-blue-400"
                aria-label="Share recipe URL"
              >
                <IoShareSocial className="mr-2" size={20} />
                {copied ? "Copied!" : "Share"}
              </button>
              {user && recipe.userId === user.email && (
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-b from-red-200 to-red-300 text-red-900 rounded-full hover:to-red-400"
                  aria-label={`Delete ${recipe.strMeal}`}
                >
                  <IoTrash className="mr-2" size={20} />
                  Delete Recipe
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;