"use client";
import React from "react";

import Link from "next/link";
import { IoTrash, IoCart, IoArrowBack } from "react-icons/io5";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          <Link href="/recipes" passHref>
            <button
              className="inline-flex items-center text-yellow-900 hover:underline"
              aria-label="Continue shopping"
            >
              <IoArrowBack className="mr-2" size={20} />
              Continue Shopping
            </button>
          </Link>
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] animate-fade-in">
            <IoCart className="text-yellow-500 mb-4" size={64} />
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <Link href="/all-recipes" passHref>
              <button
                className="px-6 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 rounded-full hover:to-red-300"
                aria-label="Browse recipes"
              >
                Browse Recipes
              </button>
            </Link>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.idMeal}
                  className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <Image
                  width={720}
                  height={360}
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.strMeal}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.idMeal)}
                    className="p-2 text-red-600 hover:text-red-800"
                    aria-label={`Remove ${item.strMeal} from cart`}
                  >
                    <IoTrash size={20} />
                  </button>
                </div>
              ))}
            </div>
            {/* Cart Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearCart}
                className="px-6 py-2 bg-gradient-to-b from-red-200 to-red-300 text-red-900 rounded-full hover:to-red-400"
                aria-label="Clear all items from cart"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;