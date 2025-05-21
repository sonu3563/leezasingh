// OnlyEventsPage.js
import React from "react";
import Header from "../Header";
import EventsPage from "./EventsPage";
import Heading from "../Heading";
import Footer from "../../landing/components/Footer";
export default function EventHome() {
  return (
<div className="font-sans text-black">
<Heading />
      <EventsPage />

      {/* <footer className="bg-gray-100 text-center py-10">
        <div className="text-3xl font-bold mb-4">Logo</div>
        <div className="flex justify-center gap-6 text-sm mb-6">
          <a href="#">Terms & Condition</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="flex justify-center gap-4 text-lg mb-4">
          <a href="#">✕</a>
          <a href="#">𝔽</a>
          <a href="#">🅰</a>
          <a href="#">𝕚</a>
          <a href="#">◉</a>
        </div>
        <p className="text-xs text-gray-500">
          © All Rights Reserved 2024 | Event
        </p>
      </footer> */}
      <Footer/>
    </div>
  );
}
