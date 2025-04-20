"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoPerson, IoTrash } from "react-icons/io5";
import { toast } from "react-toastify";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  const userRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]").filter(
    (recipe) => recipe.userId === user.email
  );

  const handleDelete = (idMeal) => {
    const updatedRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]").filter(
      (recipe) => recipe.idMeal !== idMeal
    );
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));
    toast.success("Recipe deleted successfully!");
    router.refresh();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
          <h1 className="text-3xl font-bold text-yellow-900 mb-6 flex items-center">
            <IoPerson className="mr-2" size={28} />
            Your Profile
          </h1>
          <div className="mb-6">
            <p className="text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recipes</h2>
          {userRecipes.length === 0 ? (
            <p className="text-gray-600">You haven’t added any recipes yet.</p>
          ) : (
            <div className="space-y-4">
              {userRecipes.map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <Image
                  width={720}
                  height={360}
                    src={recipe.strMealThumb || "/images/home/food.webp"}
                    alt={recipe.strMeal}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <Link href={`/recipes/${recipe.idMeal}`}>
                      <span className="text-lg font-semibold text-gray-800 hover:text-yellow-900">
                        {recipe.strMeal}
                      </span>
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDelete(recipe.idMeal)}
                    className="p-2 text-red-600 hover:text-red-800"
                    aria-label={`Delete ${recipe.strMeal}`}
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Link href="/add-recipe">
            <button
              className="mt-6 px-6 py-3 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
              aria-label="Add a new recipe"
            >
              Add New Recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;