import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/checkout", { address });
      alert("Order placed. COD only. Order id: " + res.data.order_id);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed");
    }
  };

  return (
    <div className="card-soft p-6 max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-3">Checkout (Cash on Delivery)</h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <textarea className="p-2 border rounded" placeholder="Delivery address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <div className="text-sm text-gray-500">Only Cash on Delivery (COD) is available currently.</div>
        <button className="btn-accent px-4 py-2 rounded">Place Order (COD)</button>
      </form>
    </div>
  );
}
