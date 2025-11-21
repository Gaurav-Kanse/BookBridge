import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  // CartContext provides `cart` (array) — alias it to `items` for this page
  const { cart: items, updateQty, removeFromCart, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShipping(items.length > 0 ? 49 : 0);
    const discountValue = coupon === "BOOK10" ? subtotal * 0.1 : 0;
    setDiscount(discountValue);
    setTotal(subtotal + (items.length ? 49 : 0) - discountValue);
  }, [items, subtotal, coupon]);

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 pb-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center bg-gray-100 py-10 rounded-xl">
          <p className="text-lg mb-4">Your cart is currently empty</p>
          <Link
            to="/shop"
            className="text-blue-600 underline font-semibold hover:text-blue-800"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.author}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="px-3">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ₹{(item.qty * item.price).toLocaleString("en-IN")}
                  </p>
                  <button
                    className="text-red-500 text-sm hover:underline mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h3 className="text-xl font-semibold">Order Summary</h3>

            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹{shipping.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-₹{discount.toLocaleString("en-IN")}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={() => {
                alert("Order Successful! (Demo)");
                clearCart();
              }}
            >
              Place Order (COD)
            </button>

            {/* Coupon Apply */}
            <div>
              <input
                type="text"
                className="border w-full px-3 py-2 rounded mt-4"
                placeholder="Enter coupon (try BOOK10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
