import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import restaurantData from "../assets/data/restaurantData"; // Restaurant data import
import placeorder from "../assets/videos/placedorder.mp4"; // Video import for order confirmation

// Order component handling the order flow
const Order = ({ isLoggedIn }) => {
  const [cart, setCart] = useState({}); // State to store cart items
  const [step, setStep] = useState(1); // Step state for multi-step process
  const [address, setAddress] = useState(""); // User address state
  const [paymentMethod, setPaymentMethod] = useState(""); // Payment method state
  const navigate = useNavigate(); // Hook for navigation

  // Effect to load cart from localStorage if available
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (
      savedCart &&
      savedCart.items &&
      Object.keys(savedCart.items).length > 0
    ) {
      setCart(savedCart.items);
    } else {
      alert("Your cart is empty. Redirecting to the home page.");
      navigate("/"); // Redirect to home if cart is empty
    }
  }, [navigate]);

  const videoRef = useRef(null); // Reference for video element

  // Effect to set playback rate of the video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);

  // Function to calculate total order value
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

  // Function to handle the next step of the order flow
  const handleNextStep = () => {
    if (step === 1 && !address) {
      alert("Please provide your address.");
      return;
    }
    if (step === 2 && !paymentMethod) {
      alert("Please choose a payment method.");
      return;
    }
    setStep(step + 1); // Move to the next step
  };

  // Function to handle order placement
  const handlePlaceOrder = () => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }

    // Prepare order details
    const orderDetails = {
      orderId: new Date().getTime(),
      cartItems: Object.keys(cart).reduce((acc, id) => {
        const item = restaurantData.flatMap((restaurant) =>
          restaurant.menu.flatMap((category) =>
            category.items.filter((i) => i.id === parseInt(id))
          )
        )[0];
        if (item) {
          acc[id] = { ...item, quantity: cart[id] };
        }
        return acc;
      }, {}),
      total: calculateTotal().toFixed(2),
      address: address,
      paymentMethod: paymentMethod,
    };

    // Save order history in localStorage
    const existingOrders =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    existingOrders.push(orderDetails);
    localStorage.setItem("orderHistory", JSON.stringify(existingOrders));

    // Remove cart from localStorage and navigate to order history
    localStorage.removeItem("cart");
    alert("Your order has been placed successfully!");
    navigate("/order-history");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-[72px]">
      <header className="p-4 bg-blue-600 text-white text-center rounded-t-lg">
        <h1 className="text-3xl font-bold">Order Process</h1>
      </header>

      <main className="flex-grow p-4 sm:p-8 max-w-full sm:max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 w-full justify-center">
            {["Address", "Payment", "Confirmation"].map((label, index) => (
              <div key={index} className="flex items-center w-auto">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold ${
                    step > index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 2 && (
                  <div
                    className={`h-1 w-20 mx-1 ${
                      step > index + 1 ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Address Input */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Add Your Address</h2>
            <div className="flex justify-center">
              <input
                type="text"
                className="w-[300px] sm:w-[600px] max-w-full outline-none p-4 border border-gray-300 rounded-lg mb-6"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Review and Payment */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Review and Payment</h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <ul className="divide-y divide-gray-200">
                {Object.keys(cart).map((id) => {
                  const item = restaurantData.flatMap((restaurant) =>
                    restaurant.menu.flatMap((category) =>
                      category.items.filter((i) => i.id === parseInt(id))
                    )
                  )[0];

                  return (
                    <li
                      key={id}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <h4 className="text-gray-800">{item.name}</h4>
                        <p className="text-gray-600">
                          {cart[id]} x {item.price}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 text-right font-semibold">
                Total:{" "}
                <span className="text-green-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-4">Select Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-6"
              >
                <option value="">Select a payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
              <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div>
            <div className="mb-8">
              <video
                ref={videoRef}
                src={placeorder}
                autoPlay
                muted
                loop
                className="w-full rounded-lg shadow-lg max-h-60"
              />
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gray-400 text-white py-4 rounded-lg hover:bg-gray-500"
            >
              Go Back to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Order;
