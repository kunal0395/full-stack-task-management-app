import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory"));
    if (savedOrders?.length) {
      setOrderHistory(savedOrders);
    } else {
      alert("You have no previous orders.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      <header className="p-6 bg-blue-600 text-white text-center rounded-t-lg shadow-lg">
        <h1 className="text-4xl font-bold">Your Order History</h1>
      </header>
      <main className="p-8 max-w-7xl mx-auto bg-white shadow-xl rounded-lg mt-6">
        {orderHistory.length > 0 ? (
          orderHistory.map((order) => (
            <div key={order.orderId} className="border-b border-gray-300 py-6 mb-6">
              <h2 className="text-2xl font-semibold mb-3 text-blue-600">Order #{order.orderId}</h2>
              <p className="text-lg text-gray-800 mb-3"><strong>Total:</strong> ${order.total}</p>
              <p className="text-lg text-gray-800 mb-3"><strong>Address:</strong> {order.address}</p>
              <p className="text-lg text-gray-800 mb-3"><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <div className="mt-6">
                <h3 className="font-semibold text-xl mb-3">Order Items:</h3>
                <ul className="list-disc ml-6 space-y-3">
                  {Object.values(order.cartItems).map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      <span className="font-medium">{item.name}</span> x <span className="text-blue-600">{item.quantity}</span> - <span className="text-green-600">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No orders placed yet.</p>
        )}
      </main>
    </div>
  );
};

export default OrderHistory;
