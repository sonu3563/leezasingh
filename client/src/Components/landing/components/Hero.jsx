import { useEffect, useState } from "react";
import { Menu, MousePointerClickIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import logo from "../Assets/logo.png";
import bgimage from "../Assets/desktopbg2.png";
import heroimage from "../Assets/heroimg.png";
import Box1 from "../Assets/Box1.png";
import mobileBox from "../Assets/Mobile-[Box-1].png";
import mobileBox4 from "../Assets/mobileBox-4.png";
import Box2 from "../Assets/Box2.png";
import box2 from "../Assets/Box-2.png"
import box3 from "../Assets/Box -3.png"
import Box3 from "../Assets/Box3.png";
import Box4 from "../Assets/Box4.png";

import reviews from "../Assets/Reviews.png"
import Recentpost from "./Recentpost";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Faq from "./Faq";
import Assistance from "./Assistance";
import Footer from "./Footer";
import Features from "./Features";
import Creatives from "./Creatives";   //Company
import Company from "./Company"; 
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import backgroundimage from '../../assest/landingassests/Rectangle 2.jpg'
import sideimage from '../../assest/landingassests/Group.png'
import logo from '../../assest/landingassests/objects.png'
function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const [loaded, setLoaded] = useState(false);
  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "15rem", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };
  // useEffect(() => {
  //     setLoaded(true);
  // }, []);

  return (
    <>
    
      <nav className="fixed top-0 left-0 w-full text-black shadow z-50 bg-[#ffff]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div>
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              offset={0}
              className=" cursor-pointer text-lg"
            >
              <img src={logo} alt="Logo" className="h-10" />
            </ScrollLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-3 lg:space-x-8 items-center">
            <ScrollLink
              to="Recentpost"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:text-blue-500"
            >
              Upcoming Events
            </ScrollLink>
            <ScrollLink
              to="Recentpost"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:text-blue-500"
            >
            All Jobs 
            </ScrollLink>
            <ScrollLink
              to="work"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:text-blue-500"
            >
           Join as a Companies
            </ScrollLink>
            <ScrollLink
              to="testimonial"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:text-blue-500"
            >
              Join as a Creatives
            </ScrollLink>

            <ScrollLink
              to="subscription"
              className="cursor-pointer text-lg p-1 px-2 border text-white bg-[#0C3891] rounded-lg "
              smooth={true}
              duration={500}
              offset={-50}
            >
              Get Started
            </ScrollLink>
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
              // initial="hidden"
              // animate="visible"
              // exit="exit"
              // variants={menuVariants}
              // transition={{ duration: 0.5, ease: "easeInOut" }}
              // className="sm:hidden bg-[#2e2e2e] text-white space-y-1 overflow-hidden"
            >
              <ScrollLink
                to="features"
                smooth={true}
                duration={900}
                offset={-50}
                className="hover:bg-gray-700 cursor-pointer block px-4 py-2"
              >
                Upcoming Events
              </ScrollLink>
              <ScrollLink
                to="subscription"
                smooth={true}
                duration={900}
                offset={-50}
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
               All Jobs 
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

              <div className="flex items-end p-2">
                <ScrollLink
                  to="subscription"
                  className="w-full text-center text-xl py-2 px-4 border text-blue-600 bg-white rounded-lg hover:font-semibold"
                  smooth={true}
                  duration={500}
                  offset={-50}
                >
                  Get Started
                </ScrollLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>





      <div className="relative w-full h-screen" id="home">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            >
              Elevate Your Creative Journey at Cannes and Martha’s Vineyard
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-gray-200 text-lg"
            >
              Join a global platform connecting talent and companies through
              exclusive events, curated opportunities, and personalized services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 mt-6"
            >
              <a
                href="#about"
                className="bg-white text-[#0C3891] px-6 py-3 rounded-lg font-semibold transition transform hover:scale-110 hover:shadow-xl"
              >
                Join the Creative Community <i className="bi bi-arrow-right ml-2" />
              </a>
            </motion.div>
          </div>

          {/* Floating Sidebar Image Section */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: [0, -10, 0] }}
  transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
  className="lg:w-1/2 flex justify-center"
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
      {/* <div id="Company">
        <Company />
      </div> */}
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

      {/* <div id="faq">
        <Faq />
      </div> */}

      {/* <div id="assistance">
        <Assistance />
      </div> */}

      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default Hero;
