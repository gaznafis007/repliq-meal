import axios from "axios";

// In-memory cache for API responses
const cache = new Map();

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Axios instance with interceptors for caching
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Cache responses for 5 minutes
axiosInstance.interceptors.response.use(
  (response) => {
    const cacheKey = `${response.config.url}?${new URLSearchParams(response.config.params).toString()}`;
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });
    return response;
  },
  (error) => Promise.reject(error)
);

const HttpKit = {
  getTopRecipes: async () => {
    try {
      const cacheKey = `${BASE_URL}/filter.php?a=American`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        return cached.data.meals ? cached.data.meals.slice(0, 12) : [];
      }
      const response = await axiosInstance.get("/filter.php", {
        params: { a: "American" },
      });
      return response.data.meals ? response.data.meals.slice(0, 12) : [];
    } catch (error) {
      console.error("Error fetching top recipes:", error);
      throw new Error("Failed to fetch top recipes");
    }
  },

  searchRecipes: async (query, type = "name") => {
    try {
      let endpoint, params;
      switch (type) {
        case "name":
          endpoint = "/search.php";
          params = { s: query };
          break;
        case "ingredient":
          endpoint = "/filter.php";
          params = { i: query };
          break;
        case "category":
          endpoint = "/filter.php";
          params = { c: query };
          break;
        default:
          throw new Error("Invalid search type");
      }
      const cacheKey = `${BASE_URL}${endpoint}?${new URLSearchParams(params).toString()}`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        return cached.data.meals || [];
      }
      const response = await axiosInstance.get(endpoint, { params });
      return response.data.meals || [];
    } catch (error) {
      console.error(`Error searching recipes by ${type}:`, error);
      throw new Error(`Failed to search recipes by ${type}`);
    }
  },

  searchRecipesByName: async (query) => {
    return HttpKit.searchRecipes(query, "name");
  },

  searchRecipesByIngredient: async (ingredient) => {
    return HttpKit.searchRecipes(ingredient, "ingredient");
  },

  filterByCategory: async (category) => {
    return HttpKit.searchRecipes(category, "category");
  },

  getRecipeDetails: async (id) => {
    try {
      const cacheKey = `${BASE_URL}/lookup.php?i=${id}`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        return cached.data.meals ? cached.data.meals[0] : null;
      }
      const response = await axiosInstance.get("/lookup.php", {
        params: { i: id },
      });
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw new Error("Failed to fetch recipe details");
    }
  },

  getCategories: async () => {
    try {
      const cacheKey = `${BASE_URL}/categories.php`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        return cached.data.categories || [];
      }
      const response = await axiosInstance.get("/categories.php");
      return response.data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },

  filterByArea: async (area) => {
    try {
      const cacheKey = `${BASE_URL}/filter.php?a=${area}`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        return cached.data.meals || [];
      }
      const response = await axiosInstance.get("/filter.php", {
        params: { a: area },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by area:", error);
      throw new Error("Failed to filter recipes by area");
    }
  },
};


export default HttpKit;