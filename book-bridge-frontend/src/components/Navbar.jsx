import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    const onAuth = () => setLoggedIn(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", onAuth);
    window.addEventListener("authChanged", onAuth);
    return () => {
      window.removeEventListener("storage", onAuth);
      window.removeEventListener("authChanged", onAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    // keep demo user info separate
    localStorage.removeItem("bb_user");
    window.dispatchEvent(new Event("authChanged"));
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link to="/" className="text-2xl hero-title font-extrabold text-gray-900">
          BookBridge
        </Link>

        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="px-4 py-2 rounded-full hover:bg-gray-100 transition">Home</Link>
          <Link to="/shop" className="px-4 py-2 rounded-full hover:bg-gray-100 transition">Shop</Link>
          <Link to="/donate" className="px-4 py-2 rounded-full hover:bg-gray-100 transition">Donate</Link>
          <Link to="/cart" className="px-4 py-2 rounded-full hover:bg-gray-100 transition">Cart</Link>
        </div>

        <div className="flex items-center gap-4">

          {loggedIn ? (
            <>
              <Link
                to="/account"
                className="px-3 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition hidden sm:block"
              >
                Account
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-full border border-red-400 text-red-600 hover:bg-red-50 transition hidden sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition hidden sm:block"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-brandBlue text-black font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-blue-700 hover:text-white transition hidden sm:block"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Cart Icon button with badge */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
            title="Cart"
          >
            <FiShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}
