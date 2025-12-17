import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import CollegeCard from "../ui/CollegeCard";
import { Search, MoreVertical } from "lucide-react";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("NONE");
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await api.get("/colleges");
        setColleges(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCollegeUpdate = (updatedCollege) => {
    setColleges((prev) =>
      prev.map((c) =>
        c._id === updatedCollege._id ? updatedCollege : c
      )
    );
  };

  // 🔍 SEARCH
  let filtered = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎛 FILTERS
  if (filter === "AZ") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (filter === "ZA") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (filter === "WEBSITE") {
    filtered = filtered.filter((c) => c.website);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading IIITs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mt-5 mb-3">
            Indian Institutes of Information Technology
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore official information about IIITs across India.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="max-w-md mx-auto mb-12 relative flex items-center">
          {/* Search icon */}
          <Search
            size={18}
            className="absolute left-3 text-gray-400"
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Search IIIT by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-12 py-2
              border rounded-xl
              text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          {/* 3-dot menu */}
          <div ref={menuRef} className="absolute right-2">
            <button
              onClick={() => setOpenMenu((p) => !p)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <MoreVertical size={18} />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 text-sm">
                <button
                  onClick={() => {
                    setFilter("AZ");
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Sort A–Z
                </button>

                <button
                  onClick={() => {
                    setFilter("ZA");
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Sort Z–A
                </button>

                <button
                  onClick={() => {
                    setFilter("WEBSITE");
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Has Website
                </button>

                <button
                  onClick={() => {
                    setFilter("NONE");
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RESULTS */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No colleges found.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((college) => (
              <CollegeCard
                key={college._id}
                college={college}
                onUpdated={handleCollegeUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Colleges;
