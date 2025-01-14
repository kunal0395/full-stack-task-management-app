import React, { useRef } from "react";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import foodItems from "../assets/foodItems.js";

const FoodGrid = ({ onFoodItemClick }) => {
  // Create a ref to access the scrollable grid
  const gridRef = useRef(null);

  // Function to scroll the grid left
  const scrollLeft = () => {
    gridRef.current.scrollBy({
      left: -300, // Scroll left by 300px (adjustable)
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  // Function to scroll the grid right
  const scrollRight = () => {
    gridRef.current.scrollBy({
      left: 300, // Scroll right by 300px (adjustable)
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <div className="p-4">
      {/* Section Title with Decorative Lines */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-[37%] h-[1px] bg-black"></div>
        <h1 className="mx-4 text-2xl font-bold text-center">
          What's on your mind?
        </h1>
        <div className="w-[37%] h-[1px] bg-black"></div>
      </div>

      {/* Scrollable Grid with Navigation Arrows */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 hover:text-gray-600"
          onClick={scrollLeft}
        >
          <BiChevronLeftCircle size={40} />
        </button>

        {/* Scrollable Grid of Food Items */}
        <div
          ref={gridRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide px-8 m-10"
        >
          {/* Map through food items and display each item */}
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[150px] mx-2 cursor-pointer"
              onClick={() => onFoodItemClick(item.category)} // Handle item click event
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-center font-medium text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 hover:text-gray-600"
          onClick={scrollRight}
        >
          <BiChevronRightCircle size={40} />
        </button>
      </div>
    </div>
  );
};

export default FoodGrid;
