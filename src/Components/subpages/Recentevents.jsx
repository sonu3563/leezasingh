import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import one from "../assest/recentposts/Rectangle 4.png";
import second from "../assest/recentposts/Rectangle 43.png";
import { Link, useNavigate } from "react-router-dom";
const events = [
  {
    title: "Cannes Lions Festival – June 16-20th, 2025",
    date: "2025-06-16 - 2025-06-20",
    location: "Conference",
    img: one,
    link: "/EventHome",
    mode: "Conference"
  },
  {
    title: "Martha’s Vineyard – August, 2025",
    date: "2025-08-03 - 2025-08-24",
    location: "Oak Bluffs",
    img: second,
    link: "/Martha",
    mode: "Conference"
  },
];

export default function Recentevents() {
    const navigate = useNavigate();
  
  return (
    <div className="w-full  px-6 py-10 bg-gray-50">
      <div className="flex flex-wrap justify-center gap-6 h-full">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#F6F6F6] rounded-2xl shadow-md overflow-hidden w-full sm:w-80 md:w-96 lg:w-1/3 xl:w-1/4"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-56 object-cover sm:h-64 md:h-72 lg:h-80 xl:h-96"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                {event.title}
              </h2>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 gap-2">
                <FiClock className="text-gray-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <span>{event.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">{event.mode}</p>
              <Link
  to={event.link} 
  className="inline-block mt-3 bg-black text-white text-sm sm:text-base font-medium px-4 py-2 rounded hover:bg-gray-800"
>
  Book Tickets
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
