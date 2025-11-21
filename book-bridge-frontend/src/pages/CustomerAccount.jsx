import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CustomerAccount() {
  const { cart } = useCart();
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  const [customer] = useState({
    name: "John Doe",
    profile: "https://i.pravatar.cc/100?img=3", // fake avatar image
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8 bg-white/70 rounded-xl shadow-md p-4">
        <img
          src={customer.profile}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {customer.name}
          </h2>
          <p className="text-gray-600">Your Account Dashboard</p>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          Ordered Books ({cart.length})
        </h3>

        {cart.length === 0 ? (
          <p className="text-gray-600">No orders yet 📦</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                </div>
                <span className="font-semibold text-blue-600">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
