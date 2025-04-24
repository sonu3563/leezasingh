import React, { useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { fadeIn } from '../../../variants';
import one from "../../assest/recentposts/Rectangle 4.png";
import second from "../../assest/recentposts/Rectangle 43.png";
import third from "../../assest/recentposts/miami-bayside-marketplace.jpg";

const Recentpost = () => {
  const posts = [
    {
      id: 1,
      img: one, // ✅ use the image directly
      date: "December 12",
      title: "40 Events",
      author: "Cannes",
      category: "Politics",
      link: "",
    },
    {
      id: 2,
      img: second,
      date: "July 17",
      title: "20 Events",
      author: "Martha’s Vineyar",
      category: "Sports",
      link: "",
    },
    {
      id: 3,
      img: third,
      date: "August 21",
      title: "25 Events",
      author: "Miami Art Basel",
      category: "Technology",
      link: "",
    },
  ];
  

  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start(i => ({
        x: `-${(i + 1) * 100}%`,
        transition: { duration: 1.5, ease: 'easeInOut' }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10" data-aos="fade-up">
          <motion.h2 
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Experience the Magic of Iconic Events
          </motion.h2>
          <motion.p 
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="text-gray-600 mt-2"
          >
            Step into the world of creativity and innovation at Cannes and Martha’s Vineyard. Connect with like-minded professionals, <br />
            showcase your talent, and unlock new opportunities.
          </motion.p>
        </div>

        {/* Slider with 3 cards visible */}
        <div className="overflow-hidden w-full">
          <div
            className="flex w-fit"
            animate={controls}
            custom={0}
          >
            {[...posts, ...posts].map((post, index) => (
              <div key={index} className="min-w-[33.3333%] p-2">
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.author}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm">{post.title}</p>
                    <h2 className="text-2xl md:text-4xl font-semibold">{post.author}</h2>
                  </div>
                  <a
                    href={post.link}
                    className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white text-blue-500"
                  >
                    <span>&#8594;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recentpost;
