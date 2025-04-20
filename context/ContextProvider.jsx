"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add recipe to cart
  const addToCart = (recipe) => {
    setCart((prevCart) => {
      // Avoid duplicates
      if (prevCart.some((item) => item.idMeal === recipe.idMeal)) {
        return prevCart;
      }
      // Store minimal recipe data
      const cartItem = {
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
      };
      return [...prevCart, cartItem];
    });
  };

  // Remove recipe from cart
  const removeFromCart = (idMeal) => {
    setCart((prevCart) => prevCart.filter((item) => item.idMeal !== idMeal));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

