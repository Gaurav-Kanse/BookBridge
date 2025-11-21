import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match ❌");
      return;
    }

    localStorage.setItem(
      "bb_user",
      JSON.stringify({ name, email, phone, role })
    );

    alert("Account created successfully! 🎉 (Demo)");
    nav("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-gray-50 overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-pink-200/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[500px] h-[500px] bg-purple-200/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      {/* Glass card */}
      <div className="relative max-w-md w-full backdrop-blur-md bg-white/30 border border-white/20 rounded-3xl shadow-xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join BookBridge
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="form-field"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="form-field"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            type="number"
            className="form-field"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="form-field"
          />

          <input
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            className="form-field"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gray-800 text-white font-bold shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-900 font-semibold hover:underline">
            Login
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
        .form-field {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: rgba(255, 255, 255, 0.6);
          color: #333;
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
