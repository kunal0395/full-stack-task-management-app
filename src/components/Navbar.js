import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ cart, isLoggedIn, onLogoutClick, onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleCartClick = () => navigate("/cart");
  const handleOrderClick = () => navigate("/order-history");
  const handleLogout = () => {
    onLogoutClick();
    localStorage.removeItem("jwtToken");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-500">
          <Link to="/">Foodie</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-800 hover:text-orange-500 font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-orange-500 font-medium"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-orange-500 font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Cart and Authentication */}
        <div className="hidden md:flex items-center gap-6">
          {/* Cart */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={handleCartClick}
          >
            <FaShoppingCart className="text-orange-500 text-2xl" />
          </div>
          <div
            className="relative flex items-center cursor-pointer"
            onClick={handleOrderClick}
          >
            Orders
          </div>

          {/* Login/Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-orange-500 text-2xl focus:outline-none"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white border-t shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:text-orange-500 font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-orange-500 font-medium"
                onClick={toggleMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-orange-500 font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-800 hover:text-orange-500 font-medium"
                onClick={toggleMenu}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/order-history"
                className="text-gray-800 hover:text-orange-500 font-medium"
                onClick={toggleMenu}
              >
                Orders
              </Link>
            </li>
            <li>
              <div
                className="flex flex-col items-center gap-4"
                onClick={toggleMenu}
              >
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
                  >
                    Login
                  </button>
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
