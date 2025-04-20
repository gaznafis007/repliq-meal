"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IoAddCircle, IoTrash } from "react-icons/io5";
import { useUser } from "@/hooks/useUser";

const AddRecipe = () => {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [recipe, setRecipe] = useState({
    strMeal: "",
    strCategory: "",
    strArea: "",
    strMealThumb: "",
    ingredients: [{ ingredient: "", measure: "" }],
    strInstructions: "",
  });
  const [error, setError] = useState("");

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("ingredient") || name.startsWith("measure")) {
      const newIngredients = [...recipe.ingredients];
      newIngredients[index][name.startsWith("ingredient") ? "ingredient" : "measure"] = value;
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { ingredient: "", measure: "" }],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!recipe.strMeal || !recipe.strCategory || !recipe.strArea) {
        setError("All fields are required");
        return false;
      }
    } else if (step === 2) {
      if (recipe.ingredients.some((ing) => !ing.ingredient || !ing.measure)) {
        setError("All ingredients and measures are required");
        return false;
      }
    } else if (step === 3) {
      if (!recipe.strInstructions) {
        setError("Instructions are required");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const idMeal = `user_${Date.now()}`;
      const newRecipe = {
        ...recipe,
        idMeal,
        userId: user.email,
        ingredients: recipe.ingredients.reduce((acc, ing, i) => ({
          ...acc,
          [`strIngredient${i + 1}`]: ing.ingredient,
          [`strMeasure${i + 1}`]: ing.measure,
        }), {}),
      };
      const savedRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]");
      localStorage.setItem("userRecipes", JSON.stringify([...savedRecipes, newRecipe]));
      toast.success("Recipe added successfully!");
      router.push("/");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
          <h1 className="text-3xl font-bold text-yellow-900 mb-6 flex items-center">
            <IoAddCircle className="mr-2" size={28} />
            Add New Recipe
          </h1>
          {/* Progress Indicator */}
          <div className="flex justify-between mb-8">
            {["Basic Info", "Ingredients", "Instructions"].map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? "bg-yellow-500 text-white" : step === index + 1 ? "bg-yellow-300 text-yellow-900" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <div className="mb-4">
                  <label htmlFor="strMeal" className="block text-gray-700 mb-2">
                    Recipe Name
                  </label>
                  <input
                    id="strMeal"
                    name="strMeal"
                    type="text"
                    value={recipe.strMeal}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    aria-label="Recipe name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="strCategory" className="block text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    id="strCategory"
                    name="strCategory"
                    type="text"
                    value={recipe.strCategory}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    aria-label="Recipe category"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="strArea" className="block text-gray-700 mb-2">
                    Cuisine
                  </label>
                  <input
                    id="strArea"
                    name="strArea"
                    type="text"
                    value={recipe.strArea}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    aria-label="Cuisine"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="strMealThumb" className="block text-gray-700 mb-2">
                    Image URL (optional)
                  </label>
                  <input
                    id="strMealThumb"
                    name="strMealThumb"
                    type="text"
                    value={recipe.strMealThumb}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    aria-label="Recipe image URL"
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                {recipe.ingredients.map((ing, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <input
                      name="ingredient"
                      type="text"
                      value={ing.ingredient}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Ingredient"
                      className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      aria-label={`Ingredient ${index + 1}`}
                    />
                    <input
                      name="measure"
                      type="text"
                      value={ing.measure}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Measure"
                      className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      aria-label={`Measure ${index + 1}`}
                    />
                    {recipe.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-3 text-red-600 hover:text-red-800"
                        aria-label={`Remove ingredient ${index + 1}`}
                      >
                        <IoTrash size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-2 text-yellow-900 hover:underline"
                  aria-label="Add another ingredient"
                >
                  + Add Ingredient
                </button>
              </div>
            )}
            {step === 3 && (
              <div>
                <label htmlFor="strInstructions" className="block text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  id="strInstructions"
                  name="strInstructions"
                  value={recipe.strInstructions}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  rows="6"
                  aria-label="Recipe instructions"
                ></textarea>
              </div>
            )}
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
                  aria-label="Go to previous step"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
                  aria-label="Go to next step"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
                  aria-label="Submit recipe"
                >
                  Submit Recipe
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;