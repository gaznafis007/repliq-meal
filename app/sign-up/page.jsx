"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IoPersonAdd } from "react-icons/io5";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useUser();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const success = signup(name, email, password);
    if (success) {
      toast.success("Account created successfully!");
      router.push("/login");
    } else {
      setError("Signup failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
          <h1 className="text-3xl font-bold text-yellow-900 mb-6 flex items-center">
            <IoPersonAdd className="mr-2" size={28} />
            Sign Up
          </h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Full name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Email address"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300"
                aria-label="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-b from-yellow-200 to-yellow-300 text-yellow-900 font-semibold rounded-full hover:to-red-300 transition"
              aria-label="Create account"
            >
              Create Account
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-900 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;