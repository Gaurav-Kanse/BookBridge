import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const showcase = [
  { cover: "https://covers.openlibrary.org/b/id/8231851-L.jpg", title: "The Alchemist" },
  { cover: "https://covers.openlibrary.org/b/id/7884866-L.jpg", title: "Harry Potter" },
  { cover: "https://covers.openlibrary.org/b/id/12249353-L.jpg", title: "Atomic Habits" },
  { cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg", title: "The Hobbit" },
  { cover: "https://covers.openlibrary.org/b/id/10909258-L.jpg", title: "Percy Jackson" },
  { cover: "https://covers.openlibrary.org/b/id/8231850-L.jpg", title: "Rich Dad Poor Dad" }
];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  // Slider auto-scroll
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let scrollAmount = 0;
    const step = el.children[0]?.offsetWidth + 24 || 220;
    const interval = setInterval(() => {
      el.scrollBy({ left: step, behavior: "smooth" });
      scrollAmount += step;
      if (scrollAmount >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        scrollAmount = 0;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    const el = ref.current;
    if (el) el.scrollBy({ left: -300, behavior: "smooth" });
  };
  const next = () => {
    const el = ref.current;
    if (el) el.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-6xl mx-auto px-6">
      {/* Abstract background blobs */}
      <div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-pink-200/30 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-purple-200/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-[200px] right-[-150px] w-[300px] h-[300px] bg-blue-200/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center z-10">
        <h1 className="hero-title text-6xl font-extrabold leading-tight text-gray-900">
          Discover, Read & Share — <span className="text-brandBlue">Stories that stay</span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl">
          Hand-picked collections, used & new books, and donations — all in one place.
        </p>

        <div className="mt-10 w-full max-w-xl flex shadow-lg rounded-full overflow-hidden z-10">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search books, authors, categories..."
            className="flex-1 px-5 py-3 outline-none"
          />
          <button onClick={handleSearch} className="px-5 py-3  hover:bg-blue-100 transition btn-primary">
            Search
          </button>
        </div>
      </section>

      <div className="h-12"></div>

      {/* Showcase Section */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Popular Picks</h2>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="btn-ghost">◀</button>
            <button onClick={next} className="btn-ghost">▶</button>
          </div>
        </div>

        <div ref={ref} className="flex gap-6 overflow-x-auto scroll-hide py-4">
          {showcase.map((b, i) => (
            <div key={i} className="w-44 flex-shrink-0">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={b.cover} alt={b.title} className="w-full h-64 object-cover" />
              </div>
              <div className="mt-3 text-center">
                <div className="font-medium">{b.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/shop" className="px-6 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300">
            Explore More →
          </Link>
        </div>
      </section>

      <div className="h-20"></div>

      {/* Tailwind animation for blobs */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
