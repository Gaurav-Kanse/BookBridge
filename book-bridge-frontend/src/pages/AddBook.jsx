import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const [form, setForm] = useState({ title: "", description: "", category: "", price: "", condition: "new" });
  const [file, setFile] = useState(null);
  const [cats, setCats] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/books/categories").then((r) => setCats(r.data)).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("price", form.price);
    fd.append("condition", form.condition);
    if (file) fd.append("image", file);

    try {
      await API.post("/books/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Uploaded");
      nav("/shop");
    } catch (err) {
      alert(err.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div className="card-soft p-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-3">Upload a Book</h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="p-2 border rounded" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="p-2 border rounded" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select className="p-2 border rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">Select category or type new</option>
          {cats.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <input className="p-2 border rounded" placeholder="Price (INR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <select className="p-2 border rounded" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
          <option value="new">New</option>
          <option value="old">Used</option>
        </select>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn-accent px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
}
