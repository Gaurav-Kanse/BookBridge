import { useState } from "react";

const ngos = [
  { id: 1, name: "Smile Foundation", location: "Mumbai" },
  { id: 2, name: "Hope Trust", location: "Pune" },
  { id: 3, name: "Care India", location: "Delhi" },
];

export default function Donate() {
  const [selectedNGO, setSelectedNGO] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Donate Books</h2>

      {!selectedNGO && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              className="glass-card p-6 rounded-xl cursor-pointer hover:scale-[1.03] transition-all border border-gray-200 hover:shadow-xl"
              onClick={() => setSelectedNGO(ngo)}
            >
              <h3 className="text-xl font-semibold">{ngo.name}</h3>
              <p className="text-gray-600">{ngo.location}</p>
            </div>
          ))}
        </div>
      )}

      {selectedNGO && (
        <div className="glass-card p-6 mt-6 rounded-xl animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">
            Donate to {selectedNGO.name}
          </h3>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Book Name"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white/70"
            />

            <input
              type="number"
              placeholder="Price (₹)"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white/70"
            />

            <input
              type="number"
              placeholder="Number of Books"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white/70"
            />

            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 hover:scale-[1.03] transition-all duration-200">
              Donate 📚
            </button>

            <button
              className="text-blue-600 font-medium underline mt-2"
              onClick={() => setSelectedNGO(null)}
            >
              ← Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
