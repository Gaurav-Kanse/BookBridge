import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useCart } from "../context/CartContext";

// Large catalog (placeholder covers)
const CATALOG = [
  { id: "b1", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 499, cover: "https://covers.openlibrary.org/b/id/7884866-L.jpg", condition: "new" },
  { id: "b2", title: "The Alchemist", author: "Paulo Coelho", price: 299, cover: "https://covers.openlibrary.org/b/id/8231851-L.jpg", condition: "old" },
  { id: "b3", title: "Atomic Habits", author: "James Clear", price: 350, cover: "https://covers.openlibrary.org/b/id/12249353-L.jpg", condition: "new" },
  { id: "b4", title: "The Hobbit", author: "J.R.R. Tolkien", price: 420, cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg", condition: "old" },
  { id: "b5", title: "Percy Jackson", author: "Rick Riordan", price: 380, cover: "https://covers.openlibrary.org/b/id/10909258-L.jpg", condition: "new" },
  { id: "b6", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 249, cover: "https://covers.openlibrary.org/b/id/8231850-L.jpg", condition: "old" },
  { id: "b7", title: "Sherlock Holmes", author: "Arthur Conan Doyle", price: 199, cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg", condition: "new" },
  { id: "b8", title: "The Fault in Our Stars", author: "John Green", price: 299, cover: "https://covers.openlibrary.org/b/id/8081976-L.jpg", condition: "old" },
  { id: "b9", title: "Sapiens", author: "Yuval Noah Harari", price: 599, cover: "https://covers.openlibrary.org/b/id/9273332-L.jpg", condition: "new" },
  { id: "b10", title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 259, cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg", condition: "new" },
  { id: "b11", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 450, cover: "https://covers.openlibrary.org/b/id/8232001-L.jpg", condition: "new" },
  { id: "b12", title: "Wings of Fire", author: "A.P.J. Abdul Kalam", price: 320, cover: "https://covers.openlibrary.org/b/id/8319251-L.jpg", condition: "old" },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Shop() {
  const { addToCart } = useCart();
  const query = useQuery();
  const q = query.get("search") || "";
  const [search, setSearch] = useState(q);
  const [books, setBooks] = useState(CATALOG);

  useEffect(() => {
    // If query param exists on page load, set search field
    setSearch(q);
  }, [q]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return books;
    return books.filter(
      b => b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s)
    );
  }, [search, books]);

  const handleAdd = (book) => {
    addToCart(book);
    alert(`${book.title} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Header + search */}
      <div className="flex items-center justify-between mt-8 mb-6">
        <h1 className="text-3xl font-bold">Shop</h1>
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search in shop..."
            className="px-4 py-2 rounded-full border w-72 focus:outline-none"
          />
          <button onClick={() => {}} className="btn-primary">
            Search
          </button>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(book => (
          <BookCard key={book.id} book={book} onAdd={handleAdd} />
        ))}
      </div>

      <div className="h-20"></div>
    </div>
  );
}
