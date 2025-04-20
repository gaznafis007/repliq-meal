"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowForward } from "react-icons/io5";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-yellow-50 z-10 overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="relative z-10 max-w-lg md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-900 leading-tight">
              Savor Your Favorite Dishes at Home
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover mouthwatering recipes and bring culinary delights to your kitchen with ease.
            </p>
            <Link href="/all-recipes" passHref>
              <button
                className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 font-semibold rounded-full hover:to-red-300 transition"
                aria-label="Browse all recipes"
              >
                Browse Recipes
                <IoArrowForward className="ml-2" size={20} />
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative md:w-1/2 animate-fade-in">
            <Image
              src="/images/home/food.webp"
              alt="Delicious food illustration"
              width={600}
              height={500}
              priority
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-yellow-200 opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('/images/home/food-pattern.png')] bg-cover opacity-5"></div>
    </section>
  );
};

export default Hero;