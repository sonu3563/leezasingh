import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "./components/Script";
import FrontendRoutes from "./routes/frontend"; // Import Frontend Routes
import Head from "./components/Head"; // Import Head component

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Head Component */}
        <Head />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow-1">
          <FrontendRoutes /> {/* Render the frontend routes */}
        </main>

        {/* Footer */}
        <Footer />

        {/* Additional Scripts */}
        <Script />
      </div>
    </Router>
  );
};

export default App;
