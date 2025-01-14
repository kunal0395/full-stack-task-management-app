import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Foodie Delight</h2>
            <p className="text-gray-400">
              Your favorite meals delivered fast and fresh. Explore delicious options from our wide variety of restaurants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white">
                  Food Delivery
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Pickup Service
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Catering
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Exclusive Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="font-bold">Email:</span> support@foodiedelight.com
              </li>
              <li>
                <span className="font-bold">Phone:</span> +1 234 567 890
              </li>
              <li>
                <span className="font-bold">Address:</span> 123 Foodie Street, Flavor Town, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between">
          {/* Copyright Information */}
          <p className="text-gray-400 text-sm">&copy; 2025 Foodie Delight. All rights reserved.</p>
          
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
