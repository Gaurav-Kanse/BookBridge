import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Donate from "./pages/Donate";
import CustomerAccount from "./pages/CustomerAccount";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/account" element={<CustomerAccount />} />
        </Routes>
      </div>
    </>
  );
}
