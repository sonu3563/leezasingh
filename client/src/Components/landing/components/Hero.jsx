import { useEffect, useState } from "react";
import { Menu, MousePointerClickIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../Assets/logo.png";
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
import Subscription from "./Subscription";
import Work from "./Work";
import Testimonial from "./Testimonial";
import Faq from "./Faq";
import Assistance from "./Assistance";
import Footer from "./Footer";
import Benifit from "./Benifit";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";


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
    
      <nav className="fixed top-0 left-0 w-full text-white shadow z-50 bg-[#2e2e2e]">
        <div className=" w-full mx-auto md:px-1 py-3 flex px-1 sm:px-2 lg:px-10 justify-between md:justify-between lg:justify-between  items-center">
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
          <div className="hidden md:flex md:space-x-3 lg:space-x-8">
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:underline cursor-pointer text-lg"
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="subscription"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:underline cursor-pointer text-lg"
            >
            Pricing
            </ScrollLink>
            <ScrollLink
              to="work"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:underline cursor-pointer text-lg"
            >
              How it Works
            </ScrollLink>
            <ScrollLink
              to="testimonial"
              smooth={true}
              duration={500}
              offset={-50}
              className="hover:underline cursor-pointer text-lg"
            >
              Testimonials
            </ScrollLink>

            <ScrollLink
              to="subscription"
              className="cursor-pointer text-lg p-1 px-2 border text-blue-600 bg-white rounded-lg hover:font-semibold"
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
                Features
              </ScrollLink>
              <ScrollLink
                to="subscription"
                smooth={true}
                duration={900}
                offset={-50}
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </ScrollLink>
              <ScrollLink
                to="work"
                smooth={true}
                duration={900}
                offset={-50}
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </ScrollLink>
              <ScrollLink
                to="testimonial"
                smooth={true}
                duration={900}
                offset={-50}
                className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
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



     



      <div id="subscription">
        <Subscription />
      </div>
      <div id="benifit">
        <Benifit />
      </div>
      <div id="work">
        <Work />
      </div>

      <div id="testimonial">
        <Testimonial />
      </div>

      <div id="faq">
        <Faq />
      </div>

      <div id="assistance">
        <Assistance />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </>
  );
}

export default Hero;
