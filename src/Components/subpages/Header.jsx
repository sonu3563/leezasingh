import React from "react";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between overflow-hidden
    p-6 bg-white shadow">
      <div className="text-3xl font-bold">Logo</div>
      <button className="bg-black text-white px-4 py-2 rounded font-bold"         onClick={() => navigate("/login")}
      >Login</button>
    </header>
  );
}
