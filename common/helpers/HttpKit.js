"use client";
import axios from "axios";

const HttpKit = {
  async getTopRecipes() {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]");
    return [...response.data.meals, ...userRecipes];
  },

  async searchRecipesByName(name) {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]").filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(name.toLowerCase())
    );
    return [...(response.data.meals || []), ...userRecipes];
  },

  async searchRecipesByIngredient(ingredient) {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]").filter((recipe) =>
      recipe.ingredients.some((ing) => ing.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
    );
    const mealDetails = await Promise.all(
      response.data.meals.map(async (meal) => {
        const detailResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        return detailResponse.data.meals[0];
      })
    );
    return [...mealDetails, ...userRecipes];
  },

  async filterByCategory(category) {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]").filter(
      (recipe) => recipe.strCategory.toLowerCase() === category.toLowerCase()
    );
    const mealDetails = await Promise.all(
      response.data.meals.map(async (meal) => {
        const detailResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        return detailResponse.data.meals[0];
      })
    );
    return [...mealDetails, ...userRecipes];
  },

  async getRecipeDetails(id) {
    if (id.startsWith("user_")) {
      const userRecipes = JSON.parse(localStorage.getItem("userRecipes") || "[]");
      return userRecipes.find((recipe) => recipe.idMeal === id) || null;
    }
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },
};

export default HttpKit;