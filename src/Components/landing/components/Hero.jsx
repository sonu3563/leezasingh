import { useEffect, useState ,useRef} from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {fadeIn} from '../../../variants';
import { ChevronDown, ChevronUp } from "lucide-react";
// import bgimage from "../Assets/desktopbg2.png";
// import heroimage from "../Assets/heroimg.png";
// import Box1 from "../Assets/Box1.png";
// import mobileBox from "../Assets/Mobile-[Box-1].png";
// import mobileBox4 from "../Assets/mobileBox-4.png";
// import Box2 from "../Assets/Box2.png";
// import box2 from "../Assets/Box-2.png";
// import box3 from "../Assets/Box -3.png";
// import Box3 from "../Assets/Box3.png";
// import Box4 from "../Assets/Box4.png";

// import reviews from "../Assets/Reviews.png";
import Recentpost from "./Recentpost";
import Work from "./Work";
import Testimonial from "./Testimonial";
// import Faq from "./Faq";
// import Assistance from "./Assistance";
import Footer from "./Footer";
import Features from "./Features";
import Creatives from "./Creatives";   //Company
import Company from "./Company";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import backgroundimage from '../../assest/landingassests/Rectangle 2.jpg';
import sideimage from '../../assest/landingassests/Group.png';
import logo from '../../assest/landingassests/objects.png';

function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // const menuVariants = {
  //   hidden: { height: 0, opacity: 0 },
  //   visible: { height: "15rem", opacity: 1 },
  //   exit: { height: 0, opacity: 0 },
  // };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSubNavOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
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
            className="absolute top-full left-0 mt-3 w-64 bg-white border border-gray-200 shadow-lg rounded-xl z-50 animate-fadeIn">
              <ul className="p-4 space-y-2 text-gray-800 font-medium">
                {["Cannes", "Martha’s Vineyard", "Art Basel Miami"].map((event) => (
                  <li
                    key={event}
                    className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {event}
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

      {/* Signup Button */}
      <div className="mx-4">
        <Link
          to="/signup"
          className="hidden md:block cursor-pointer text-sm font-semibold py-2 px-6 border text-white bg-[#0C3891] hover:bg-blue-700 rounded-full transition"
        >
          Signup
        </Link>
      </div>

      {/* Mobile Menu Button */}
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

      <div className="relative w-full h-screen overflow-hidden mt-16" id="home">
        {/* Background Image */}
        <img
          src={backgroundimage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 w-full">
            {/* Text Section */}
            <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left space-y-6">
              <motion.h1
                variants={fadeIn("up",0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once:false,amount:0.7}}
                className="text-2xl lg:text-5xl font-extrabold text-white leading-tight"
              >
                Elevate Your Creative Journey at Cannes and Martha’s Vineyard
              </motion.h1>

              <motion.p
                variants={fadeIn("up",0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once:false,amount:0.7}}
                className="text-gray-200 text-lg"
              >
                Join a global platform connecting talent and companies through
                exclusive events, curated opportunities, and personalized services.
              </motion.p>

              <motion.div
                variants={fadeIn("up",0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once:false,amount:0.7}}
                className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 mt-6"
              >
                <a
                  href="#about"
                  className="bg-white mb-4 text-[#0C3891] px-6 py-3 rounded-lg font-semibold transition transform hover:scale-110 hover:shadow-xl"
                >
                  Join the Creative Community <i className="bi bi-arrow-right ml-2" />
                </a>
              </motion.div>
            </div>

            {/* Floating Sidebar Image Section */}
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2.4,
                  delay: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="lg:w-1/2 flex justify-center items-center"
              >
                <img
                  src={sideimage}
                  className="w-full max-w-lg lg:max-w-2xl"
                  alt="Hero Image"
                />
              </motion.div>
          </div>
        </div>
      </div>

      <div id="Recentpost">
        <Recentpost />
      </div>
      <div id="Features">
        <Features />
      </div>
      <div id="Creatives">
        <Creatives />
      </div>
      <div id="Company">
        <Company />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="testimonial">
        <Testimonial />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default Hero;
