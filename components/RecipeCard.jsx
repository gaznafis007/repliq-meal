import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <Link href={`/recipes/${recipe.idMeal}`} passHref>
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
      </Link>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => console.log("Add to cart:", recipe.idMeal)}
          className="px-4 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full"
          aria-label={`Add ${recipe.strMeal} to cart`}
        >
          Add to Cart
        </button>
        <button
          onClick={() => console.log("Add to wishlist:", recipe.idMeal)}
          className="px-4 py-2 bg-gradient-to-b from-green-200 to-green-300 text-green-900 rounded-full"
          aria-label={`Add ${recipe.strMeal} to wishlist`}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
