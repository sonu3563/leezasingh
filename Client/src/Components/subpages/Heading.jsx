import React, { useState, useRef } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { ChevronUp, ChevronDown, Menu, X } from 'react-feather'; // Icons from react-feather
import { Link } from 'react-router-dom'; // Assuming react-router is being used
import logo from "../assest/landingassests/objects.png";
import { motion, AnimatePresence } from "framer-motion";


const Heading = () => {
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const eventLinks = {
    "Cannes": "/EventHome",
    "Martha’s Vineyard": "/Martha",
    "Art Basel Miami": "/Artbasel",
  };

  return (
    <nav className="fixed top-0 left-0 w-full text-black shadow z-50 bg-white">
      <div className="container relative mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="mx-4">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            offset={0}
            className="cursor-pointer text-lg"
          >
            <img src={logo} alt="Logo" className="h-10" />
          </ScrollLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-6 lg:space-x-10 items-center relative">
          {/* Dropdown Toggle with Chevron */}
          <div className="relative">
            <button
              onClick={() => setIsSubNavOpen((prev) => !prev)}
              className="flex items-center space-x-1 text-gray-800 font-medium hover:text-blue-600 transition"
            >
              <span>Upcoming Events</span>
              {isSubNavOpen ? (
                <ChevronUp className="w-4 h-4 mt-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 mt-0.5" />
              )}
            </button>

            {/* Dropdown */}
            {isSubNavOpen && (
              <div 
                ref={dropdownRef}
                className="absolute top-full left-0 mt-3 w-64 bg-white border border-gray-200 shadow-lg rounded-xl z-50 animate-fadeIn"
              >
                <ul className="p-4 space-y-2 text-gray-800 font-medium">
                  {Object.entries(eventLinks).map(([event, link]) => (
                    <li key={event}>
                      <Link
                        to={link}
                        className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {event}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Other nav links */}
          <ScrollLink
            to="Recentpost"
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer hover:text-blue-600 font-medium transition duration-200"
          >
            Opportunities
          </ScrollLink>
          <ScrollLink
            to="work"
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer hover:text-blue-600 font-medium transition duration-200"
          >
            Join as a Companies
          </ScrollLink>
          <ScrollLink
            to="testimonial"
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer hover:text-blue-600 font-medium transition duration-200"
          >
            Join as a Creatives
          </ScrollLink>
        </div>

        {/* Signup button */}
        <div className="mx-4">
          <button
            to="/signup"
            className="hidden md:block cursor-pointer text-sm font-semibold py-2 px-6 border text-white bg-[#0C3891] hover:bg-blue-700 rounded-full transition"
          >
            Signup
          </button>
        </div>

        {/* Mobile Menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="sm:hidden bg-[#2e2e2e] text-white space-y-4 px-4 py-6"
          >
            <ScrollLink
              to="Recentpost"
              smooth={true}
              duration={900}
              offset={-50}
              className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upcoming Events
            </ScrollLink>
            <ScrollLink
              to="Recentpost"
              smooth={true}
              duration={900}
              offset={-50}
              className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Opportunities
            </ScrollLink>
            <ScrollLink
              to="work"
              smooth={true}
              duration={900}
              offset={-50}
              className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join as a Companies
            </ScrollLink>
            <ScrollLink
              to="testimonial"
              smooth={true}
              duration={900}
              offset={-50}
              className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join as a Creatives
            </ScrollLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Heading;
