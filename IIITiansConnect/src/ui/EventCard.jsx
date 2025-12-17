import {
  CalendarDays,
  MapPin,
  Users,
  Pencil,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const EventCard = ({ event, isAdmin = false, onEdit }) => {
  const [expanded, setExpanded] = useState(false);

  const {
    title,
    description,
    date,
    banner,
    collegeName,
    clubName,
    link,
  } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className=" relative
        bg-white border rounded-2xl overflow-hidden
        transition-all duration-300
        hover:shadow-lg
      "
    >
      {/* ADMIN EDIT */}
      {isAdmin && (
        <button
          onClick={() => onEdit(event)}
          className="
            absolute top-3 right-3 z-10
            bg-white border rounded-full p-2
            hover:bg-gray-100
          "
        >
          <Pencil size={16} />
        </button>
      )}

      {/* BANNER */}
      <div className="h-44 bg-gray-200 overflow-hidden">
        <img
          src={banner?.url || "/event-placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className={`text-sm text-gray-600 transition-all duration-300 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {description || "No description provided."}
        </p>

        {/* META */}
        <div className="space-y-2 text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {formattedDate}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {collegeName || "College not specified"}
          </div>

          {clubName && (
            <div className="flex items-center gap-2">
              <Users size={16} />
              {clubName}
            </div>
          )}
        </div>

        {/* EXPANDED CONTENT */}
        {expanded && link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-4 inline-flex items-center gap-2
              text-sm font-medium text-indigo-600
              hover:underline
            "
          >
            <ExternalLink size={14} />
            Open Event Link
          </a>
        )}

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            mt-5 w-full flex items-center justify-center gap-2
            text-sm font-medium
            border border-indigo-600 text-indigo-600
            rounded-lg py-2
            hover:bg-indigo-600 hover:text-white
            transition
          "
        >
          {expanded ? (
            <>
              <ChevronUp size={16} /> Hide Details
            </>
          ) : (
            <>
              <ChevronDown size={16} /> View Details
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
