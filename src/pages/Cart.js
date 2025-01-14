import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurantData from "../assets/restaurantData";

const Cart = ({ isLoggedIn }) => {
  const [cart, setCart] = useState({});
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart.items || {});
      setCurrentRestaurant(savedCart.restaurant || null);
    }
  }, []);

  const handleRemoveFromCart = (id) => {
    const newCart = { ...cart };
    delete newCart[id];
    localStorage.setItem(
      "cart",
      JSON.stringify({ items: newCart, restaurant: currentRestaurant })
    );
    setCart(newCart);
  };

  const calculateTotal = () => {
    return Object.keys(cart).reduce((total, id) => {
      const item = restaurantData.flatMap((restaurant) =>
        restaurant.menu.flatMap((category) =>
          category.items.filter((i) => i.id === parseInt(id))
        )
      )[0];
      return total + (item ? parseFloat(item.price.slice(1)) * cart[id] : 0);
    }, 0);
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      alert("Please log in to continue.");
      return;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify({ items: cart, restaurant: currentRestaurant })
    );

    navigate("/order");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-[72px]">
      <header className="p-4 bg-blue-600 text-white text-center rounded-t-lg">
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </header>

      <main className="flex-grow p-8 max-w-6xl mx-auto bg-white shadow-2xl rounded-lg mt-8 mb-10">
        {!isLoggedIn && (
          <div className="text-center text-red-600 font-semibold mb-6">
            Please log in to place an order.
          </div>
        )}

        {Object.keys(cart).length === 0 ? (
          <div className="text-center mt-16">
            <svg
              className="w-20 h-20 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 7l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
            <p className="text-2xl text-gray-600 font-semibold mt-6">
              Your cart is empty!
            </p>
          </div>
        ) : (
          <div>
            <ul className="divide-y divide-gray-300">
              {Object.keys(cart).map((id) => {
                const item = restaurantData.flatMap((restaurant) =>
                  restaurant.menu.flatMap((category) =>
                    category.items.filter((i) => i.id === parseInt(id))
                  )
                )[0];

                return (
                  <li
                    key={id}
                    className="flex justify-between items-center py-6 px-6 hover:bg-gray-50 transition duration-300 ease-in-out gap-40"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {cart[id]} x{" "}
                        <span className="font-semibold text-gray-900">
                          {item.price}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(id)}
                      className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 text-right">
              <h2 className="text-2xl font-semibold text-gray-800">
                Total:{" "}
                <span className="text-green-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </h2>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
              disabled={!isLoggedIn}
            >
              Place Order
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
