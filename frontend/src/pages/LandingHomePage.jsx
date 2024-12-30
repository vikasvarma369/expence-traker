"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { WavyBackground } from "../components/UI/wavy-background.jsx";

export function LandingHomePage() {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40 px-4">
      {/* Heading */}
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-bold inter-var text-center">
        Take Control of Your Finances
      </p>

      {/* Subheading */}
      <p className="text-sm sm:text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Track your expenses effortlessly and save smarter. Your journey to financial freedom starts here!
      </p>

      {/* Catchy Line */}
      <p className="text-xs sm:text-sm md:text-base mt-2 text-gray-200 italic text-center">
        "Because every penny counts."
      </p>

      {/* Login and Sign Up Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate("/login")} // Navigate to Login page
          className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")} // Navigate to Sign Up page
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>
    </WavyBackground>
  );
}
