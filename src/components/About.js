import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-[80px]">
      {/* Container for the content */}
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          About Us
        </h1>
        
        {/* Introduction Text */}
        <p className="text-lg text-gray-600 text-center mb-10">
          Welcome to <strong>FoodieExpress</strong>, your go-to destination for quick, delicious, and reliable food delivery. 
          Our mission is to bring the best local cuisines straight to your doorstep.
        </p>

        {/* Section for Vision and Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To revolutionize food delivery by connecting people with the best 
              restaurants and home chefs in their area, while delivering convenience and happiness.
            </p>
          </div>

          {/* Why Choose Us Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">
              Why Choose Us?
            </h3>
            <p className="text-gray-700">
              We prioritize speed, quality, and affordability. With thousands of restaurants to choose from, we guarantee something for every craving.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-10 bg-blue-500 text-white rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-3">
            Join Our Foodie Journey!
          </h3>
          <p>
            Be part of the growing FoodieExpress family and enjoy the best food delivery experience in town.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
