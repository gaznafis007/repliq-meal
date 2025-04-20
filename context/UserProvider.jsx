"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // // Load user from localStorage on mount
  // useEffect(() => {
  //   const savedUser = localStorage.getItem("user");
  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  // }, []);

  // // Save user to localStorage on update
  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [user]);

  const signup = (name, email, password) => {
    const newUser = { name, email, password, recipes: [] };
    
    const existingUsers = JSON.parse(localStorage.getItem("user"));
    if(!existingUsers){
      localStorage.setItem("user", JSON.stringify([newUser]));
      setUser(newUser);
      return true;
    }
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      toast.error("User already exists. Please log in.");
      return false; // User already exists
    }
    else{
      localStorage.setItem("user", JSON.stringify([...existingUsers, ...newUser]));
    setUser(newUser);
    return true;
    }
  };

  const login = (email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("user"));
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return false; // Missing credentials
    }
    const authenticatedUser = savedUsers && savedUsers.find((user) => user.email === email && user.password === password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      return true; // Login successful
    } else {
      toast.error("Invalid email or password.");
      return false; // Invalid credentials
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

