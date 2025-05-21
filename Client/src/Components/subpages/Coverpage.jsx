import React from "react";
import cover from "../assest/subpages/cover.png";

export default function Coverpage() {
  return (
    <section
      className="relative h-[80vh] flex flex-col items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Where Creativity Meets Rhythm
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Explore the Fusion of Art, Music, <br /> and Innovation.
        </p>
        <button className="bg-white text-black px-6 py-3 rounded font-bold">
          Explore Now
        </button>
      </div>
    </section>
  );
}
