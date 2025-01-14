import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import RestrarantItem from "./components/RestaurantItem";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import restaurantData from "./assets/data/restaurantData";
import Order from "./pages/Order";
import OrderHistory from "./components/OrderHistory";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwtToken");
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={handleLogout}
        cart={cart}
      />
      <Routes>
        <Route path="*" element={<Menu />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-history" element={<OrderHistory/>} />
        <Route
          path="/restaurant/:id"
          element={<RestrarantItem cart={cart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={setCart}
              menuItems={(restaurantData?.foodCategories || [])
                .flatMap((category) => category.menu || [])
                .flatMap((menu) => menu.items || [])}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Routes>
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Footer />
    </Router>
  );
};

export default App;
