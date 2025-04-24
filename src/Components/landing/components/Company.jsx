import React from "react";
import { motion } from "framer-motion";
import {fadeIn} from '../../../variants';
import check2 from '../../assest/landingassests/categeories/check2.png';
import company from '../../assest/landingassests/categeories/companies.jpg';
import { useNavigate } from 'react-router-dom';

const CompanySignup = () => {
  const navigate = useNavigate();

  return (
    <section className="pb-20">
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 overflow-hidden">
        
        {/* Image with Subtle Depth Effect */}
        <motion.div
          className="relative max-w-lg lg:max-w-xl order-1 lg:order-2" // Ensure image comes first on small screens, second on large screens
          variants={fadeIn("up",0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.7}}
        >
          <motion.div
            className=" "
            variants={fadeIn("up",0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{once:false,amount:0.7}}
          >
            <img
              src={company}
              alt="Creatives at work"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="lg:ml-16 mt-12 lg:mt-0 max-w-2xl order-2 lg:order-1" // Ensure text comes second on small screens, first on large screens
          variants={fadeIn("up",0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.7}}
        >
          <motion.h3
            className="text-4xl font-bold text-[#0c3891] mb-5"
            variants={fadeIn("up",0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{once:false,amount:0.7}}
          >
            Companies
          </motion.h3>

          {/* Staggered List Items */}
          <motion.ul
            className="space-y-5"
            variants={fadeIn("up",0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{once:false,amount:0.7}}
          >
            {[
              { title: "Showcase Your Work", desc: "Build a dynamic portfolio that gets noticed by industry leaders." },
              { title: "AI-Powered Job Matching", desc: "Find tailored opportunities that align with your skills, experience, and interests." },
              { title: "Networking At Premier Events", desc: "Connect with professionals at top industry events." },
              { title: "Skill Development", desc: "Access AI-curated learning paths to grow your expertise." },
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-4"
                variants={fadeIn("up",0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{once:false,amount:0.7}}
              >
                <img src={check2} alt="" className="w-7" />
                <div>
                  <p className="text-xl font-bold text-[#0c3891]">{item.title}</p>
                  <p className="text-gray-600 text-base">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Smooth Button Animation */}
          <motion.button
            className="mt-8 px-8 py-3 bg-[#0c3891] text-white font-semibold rounded-lg shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/signup')}
          >
            Sign up as company
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanySignup;
