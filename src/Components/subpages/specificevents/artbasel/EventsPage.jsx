import React from 'react';
// import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import test from "../../../assest/recentposts/miami-bayside-marketplace.jpg"

const EventsPage = () => {
    const navigate = useNavigate();
  
  return (
    <main className="max-w-5xl w-full mt-40 pb-40 px-6 mx-auto">
    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
    Miami Art Basel – August, 2025
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
        Step into a world where creativity knows no bounds at Miami Art Basel — the premier global stage for contemporary art and design. This electrifying event brings together the most influential artists, collectors, and tastemakers in a celebration of bold ideas and boundary-pushing expression.
        From immersive installations and thought-provoking exhibitions to exclusive brand activations, Art Basel is more than an art fair — it’s a cultural phenomenon. Whether you’re here to be inspired, connect, or simply experience something extraordinary, join us as we celebrate the spirit of artistic innovation in the vibrant heart of Miami.        </p>
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