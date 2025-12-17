import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../ui/EventCard";
import AddEventForm from "../ui/AddEventForm";

function Events() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleSuccess = (event) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e._id === event._id);
      return exists
        ? prev.map((e) => (e._id === event._id ? event : e))
        : [event, ...prev];
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e._id !== id));
    setEditingEvent(null);
    setShowForm(false);
  };

  // 🔍 FILTER + SORT LOGIC
  const processedEvents = [...events]
    .filter((event) => {
      const q = search.toLowerCase();
      return (
        event.title?.toLowerCase().includes(q) ||
        event.collegeName?.toLowerCase().includes(q) ||
        event.clubName?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "za") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      // newest (default)
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h2 className="text-3xl font-bold">All Events</h2>

          <div className="flex flex-wrap gap-3">
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search events, college, club..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                border rounded-lg px-4 py-2
                w-64
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                border rounded-lg px-3 py-2
                bg-white
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">Title A–Z</option>
              <option value="za">Title Z–A</option>
            </select>

            <button
              onClick={() => {
                setEditingEvent(null);
                setShowForm(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Create Event
            </button>
          </div>
        </div>

        {/* FORM */}
        {showForm && (
          <AddEventForm
            editingEvent={editingEvent}
            onSuccess={handleSuccess}
            onDelete={handleDelete}
            onCancel={() => {
              setEditingEvent(null);
              setShowForm(false);
            }}
          />
        )}

        {/* EVENTS */}
        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : processedEvents.length === 0 ? (
          <p className="text-gray-500">No matching events found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isAdmin
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Events;
