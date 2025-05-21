import React from 'react';
// import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import test from "../../assest/recentposts/Rectangle 4.png"

const EventsPage = () => {
    const navigate = useNavigate();
  
  return (
    <main className="max-w-5xl w-full mt-40 pb-40 px-6 mx-auto">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
      Cannes Lions Festival – June 16-20th, 2025
    </h1>
  
    <img
      src={test}
      alt="Cannes Lions Festival"
      className="rounded-xl shadow-md mb-8 w-full h-auto object-cover max-h-[500px]"
    />
  
    <div className="grid md:grid-cols-3 gap-8">
      {/* About Section */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-2">About The Event</h2>
        <p className="text-gray-700 leading-relaxed">
          Every year in June, Cannes Lions brings the creative community together for a week in Cannes, France – to learn, network, explore and celebrate creativity in advertising and communications. Taking place from 16–20 June 2025, the Festival is where the world’s greatest creativity gets its moment in the spotlight. It’s where groundbreaking work from across the globe is awarded, and where today’s most influential thought leaders and industry titans come together on stage.
        </p>
      </div>
  
      {/* Info Card */}
      <div className="bg-[#F6F6F6] rounded-xl shadow p-6 space-y-4 h-fit">
        <button
          className="bg-black text-white px-4 py-2 rounded font-bold w-full"
          onClick={() => navigate("/login")}
        >
          Book Tickets
        </button>
  
        <div className="flex items-start gap-2 text-sm">
          <CalendarDays className="mt-1" />
          <div>
            <strong>Date and time</strong><br />
            2025-06-16 - 2025-06-20
          </div>
        </div>
  
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="mt-1" />
          <div>
            <strong>Location</strong><br />
            Cannes, France
          </div>
        </div>
  
        <div className="text-sm space-y-1">
          <p><strong>Event Type:</strong> Conference</p>
          <p><strong>Event Category:</strong> Other</p>
        </div>
      </div>
    </div>
  </main>
  
  );
};

export default EventsPage;