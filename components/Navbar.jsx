"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMenu, IoClose, IoCart, IoPerson } from "react-icons/io5";
import { useCart } from "@/hooks/useCart";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const { cart, wishlist } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-12 lg:px-7 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" passHref>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              aria-label="Home page"
            >
              <span className="text-2xl font-bold text-yellow-900">
                Tailus <span className="text-yellow-700">Feedus</span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6 text-gray-600 font-medium text-sm">
              <li>
                <Link href="/all-recipes" passHref>
                  <span className="hover:text-yellow-700 transition">
                    All Recipes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cart" passHref>
                  <span className="flex items-center hover:text-yellow-700 transition">
                    <IoCart className="mr-1" size={18} />
                    Cart ({cart.length})
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/wishlist" passHref>
                  <span className="flex items-center hover:text-yellow-700 transition">
                    <FaHeart className="mr-1" size={18} />
                    Wishlist ({wishlist.length})
                  </span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-yellow-800 font-semibold text-sm rounded-full hover:bg-yellow-100 transition"
                aria-label="Sign up"
              >
                <IoPerson className="inline mr-1" size={16} />
                Sign Up
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 font-semibold text-sm rounded-full hover:to-red-300 transition"
                aria-label="Log in"
              >
                <IoPerson className="inline mr-1" size={16} />
                Log In
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-yellow-900"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white py-6 px-6 animate-fade-in">
            <ul className="flex flex-col space-y-4 text-gray-600 font-medium text-sm">
              <li>
                <Link href="/all-recipes" passHref>
                  <span
                    className="block py-2 hover:text-yellow-700 transition"
                    onClick={toggleMenu}
                  >
                    All Recipes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cart" passHref>
                  <span
                    className="block py-2 hover:text-yellow-700 transition"
                    onClick={toggleMenu}
                  >
                    <IoCart className="inline mr-1" size={18} />
                    Cart ({cart.length})
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/wishlist" passHref>
                  <span className="flex items-center hover:text-yellow-700 transition">
                    <FaHeart className="mr-1" size={18} />
                    Wishlist ({wishlist.length})
                  </span>
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex flex-col space-y-4">
              <button
                type="button"
                className="w-full py-3 px-6 text-center text-yellow-800 font-semibold text-sm rounded-full hover:bg-yellow-100 transition"
                aria-label="Sign up"
                onClick={toggleMenu}
              >
                <IoPerson className="inline mr-1" size={16} />
                Sign Up
              </button>
              <button
                type="button"
                className="w-full py-3 px-6 text-center bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 font-semibold text-sm rounded-full hover:to-red-300 transition"
                aria-label="Log in"
                onClick={toggleMenu}
              >
                <IoPerson className="inline mr-1" size={16} />
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;