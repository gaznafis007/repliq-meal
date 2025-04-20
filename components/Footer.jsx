"use client";
import React from "react";
import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4 md:px-12 lg:px-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {/* Brand */}
          <div>
            <Link href="/" passHref>
              <span className="text-2xl font-bold text-yellow-700 cursor-pointer">
                Tailus <span className="text-yellow-500">Feedus</span>
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Discover and share delicious recipes with Tailus Feedus.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" passHref>
                  <span className="hover:text-yellow-300 transition" aria-label="Home page">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/all-recipes" passHref>
                  <span className="hover:text-yellow-300 transition" aria-label="All recipes">
                    All Recipes
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cart" passHref>
                  <span className="hover:text-yellow-300 transition" aria-label="Cart">
                    Cart
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-300 transition"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-300 transition"
                aria-label="View our GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-300 transition"
                aria-label="Connect on LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tailus Feedus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;