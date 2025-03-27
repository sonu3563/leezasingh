import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      title: "User Registration & Profiles",
      description: "Creatives and companies can build optimized profiles with AI-driven suggestions."
    },
    {
      title: "Job Postings & AI Matching",
      description: "Smart job recommendations for creatives and companies based on data-driven insights."
    },
    {
      title: "Networking & Collaboration",
      description: "Connect with like-minded professionals and groups through AI-suggested chat rooms."
    },
    {
      title: "Learning & Growth",
      description: "Personalized learning paths to help users close skill gaps."
    },
    {
      title: "Event Recommendations",
      description: "Stay updated with industry-specific events tailored to your interests."
    }
  ];

  return (
    <section id="features" className="py-16 bg-white flex flex-col md:flex-row items-center">
      <motion.div 
        className="w-full md:w-1/2 flex flex-col items-center relative"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
          className="w-4/5 h-auto rounded-lg shadow-lg"
          alt="Main Feature"
        />
        <motion.img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
          className="absolute bottom-[-20px] left-10 border-4 border-white rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          alt="Secondary Feature"
        />
      </motion.div>

      <div className="w-full md:w-1/2 px-8">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Key Features That Set Us Apart
        </motion.h2>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start bg-white p-6 shadow-lg rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <span className="text-blue-500 text-2xl mr-4">✔</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
