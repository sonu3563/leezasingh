import React from "react";
import { motion } from "framer-motion";

const CompanySignup = () => {
  const features = [
    {
      title: "Custom AI Hiring Solutions",
      description: "Create job postings optimized for success, with AI-recommended formats and keywords."
    },
    {
      title: "Access A Diverse Talent Pool",
      description: "Discover skilled creatives whose portfolios match your needs."
    },
    {
      title: "Event Collaboration Opportunities",
      description: "Use events like Cannes and Martha’s Vineyard to build connections and promote your brand."
    },
    {
      title: "Enhanced Insights",
      description: "Gain AI-driven analytics to track the performance of your job postings and campaigns."
    }
  ];

  return (
    <section id="company-signup" className="py-16 bg-white flex flex-col md:flex-row items-center rounded-lg shadow-lg p-8">
      {/* Left Section */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col items-start"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-black mb-6">Companies</h2>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start bg-gray-100 p-6 shadow-md rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <span className="text-blue-700 text-2xl mr-4">✔</span>
              <div>
                <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          className="bg-blue-700 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-800 transition-all mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign up as a Company
        </motion.button>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
            alt="Company Meeting"
          className="w-4/5 rounded-lg shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default CompanySignup;
