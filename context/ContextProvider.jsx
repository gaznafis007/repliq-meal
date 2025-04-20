"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedWishlist = localStorage.getItem("wishlist");
    if(savedWishlist){
        setWishlist(JSON.parse(savedWishlist))
    }
  }, []);

    // Add recipe to wishlist
    const addToWishlist = (recipe) =>{
        setWishlist((prevWishlist) => {
            // Avoid duplicates
            if (prevWishlist.some((item) => item.idMeal === recipe.idMeal)) {
                return prevWishlist;
            }
            // Store minimal recipe data
            const wishlistItem = {
                idMeal: recipe.idMeal,
                strMeal: recipe.strMeal,
                strMealThumb: recipe.strMealThumb,
            };
            localStorage.setItem("wishlist", JSON.stringify([...prevWishlist, wishlistItem]));
            return [...prevWishlist, wishlistItem];
        });

    }
    // Remove recipe from wishlist
    const removeFromWishlist = (idMeal) => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist.filter((item) => item.idMeal !== idMeal)));
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.idMeal !== idMeal));
    };

    // Clear wishlist
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem("wishlist");
    };


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
      localStorage.setItem("cart", JSON.stringify([...prevCart, cartItem]));
      return [...prevCart, cartItem];
    });
  };

  // Remove recipe from cart
  const removeFromCart = (idMeal) => {
      localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item.idMeal !== idMeal)));
    setCart((prevCart) => prevCart.filter((item) => item.idMeal !== idMeal));

  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </CartContext.Provider>
  );
};

