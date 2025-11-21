import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // demo login: store a token and basic user info
    localStorage.setItem("token", "demo-token");
    localStorage.setItem(
      "bb_user",
      JSON.stringify({ name: email.split("@")[0], role })
    );
    // notify other parts of the app
    window.dispatchEvent(new Event("authChanged"));
    alert("Logged in (demo)");
    navigate("/account");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-gray-50 overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-200/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[500px] h-[500px] bg-purple-200/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Glass card */}
      <div className="relative max-w-md w-full backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl shadow-xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1 text-center">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Login to continue to your dashboard
        </p>

        {/* Role selection */}
        <div className="flex gap-3 mb-6 w-full">
          <button
            onClick={() => setRole("buyer")}
            className={`flex-1 py-2 rounded-2xl font-medium transition-all duration-300 ${
              role === "buyer"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Buyer
          </button>
          <button
            onClick={() => setRole("seller")}
            className={`flex-1 py-2 rounded-2xl font-medium transition-all duration-300 ${
              role === "seller"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="w-full space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/70 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-300"
          />
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/70 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-300"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gray-800 text-white font-bold shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-sm mt-6 text-gray-700">
          No account?{" "}
          <Link to="/signup" className="text-gray-900 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>

      {/* Tailwind animation for blobs */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
