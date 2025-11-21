import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

export default function BookCard({ book, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(book);
    setAdded(true);

    // Reset after 2 seconds (optional)
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="glass-card p-4 w-full flex flex-col">
      <div className="w-full h-56 rounded-lg overflow-hidden mb-3">
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{book.author}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-gray-800 font-bold">₹{Number(book.price).toLocaleString("en-IN")}</div>
          <div className="text-xs text-gray-500">{book.condition}</div>
        </div>

        <button
          onClick={handleAdd}
          disabled={added}
          className={`px-4 py-2 rounded-lg font-semibold flex items-center justify-center transition-all duration-300
            ${added 
              ? "bg-green-500 hover:bg-green-500 cursor-default text-white" 
              : "bg-white text-black hover:bg-gray-200"
            }
          `}
        >
          {added ? (
            <>
              <FiCheck className="mr-2" /> Added
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
