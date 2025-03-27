import { motion } from "framer-motion";

export default function CreativesSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-20 bg-[#e7ebf5] overflow-hidden">
      {/* Image with Subtle Depth Effect */}
      <motion.div
        className="relative max-w-lg lg:max-w-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="border-4 border-blue-500 p-2 rounded-xl shadow-xl"
          whileHover={{ scale: 1.03, rotate: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"
            alt="Creatives at work"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="lg:ml-16 mt-12 lg:mt-0 max-w-2xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Title Animation */}
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Unlock <span className="text-blue-600">Endless</span> Possibilities
        </motion.h2>

        <motion.h3
          className="text-2xl font-semibold text-blue-600 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Why Join Us?
        </motion.h3>

        {/* Staggered List Items */}
        <motion.ul
          className="space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.2 },
            },
          }}
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
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <span className="text-blue-600 text-2xl">✔</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Smooth Button Animation */}
        <motion.button
          className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          Join as a Creative
        </motion.button>
      </motion.div>
    </section>
  );
}
