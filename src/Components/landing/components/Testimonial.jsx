import React from 'react';
import Slider from 'react-slick';
import profile1 from "../Assets/profile1.jpeg";
import profile2 from "../Assets/profile2.jpeg";
import profile3 from "../Assets/Julie.jpg";
import profile4 from "../Assets/Johnny.jpeg";
import testimonialquatation from "../../assest/landingassests/categeories/testimonialquatation.png";
import Star from "../../assest/landingassests/categeories/star.png";
import { motion } from "framer-motion";
import {fadeIn} from '../../../variants';

const testimonials = [
  {
    id: 1,
    name: "Joseph",
    role: "Independent filmmaker",
    image: profile1,
    review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero dolore eius mollitia molestias architecto. Unde dignissimos sequi alias necessitatibus quod.",
    
},
  {
    id: 2,
    name: "Sarah",
    role: "Singer song writer",
    image: profile2,
    review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero dolore eius mollitia molestias architecto. Unde dignissimos sequi alias necessitatibus quod.",
  },
  {
    id: 3,
    name: "Julie",
    role: "Fashion photographer",
    image: profile3,
    review: "        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero dolore eius mollitia molestias architecto. Unde dignissimos sequi alias necessitatibus quod.",
  },
  {
    id: 4,
    name: "Johnny",
    role: "Large Business Owner",
    image: profile4,
    review: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero dolore eius mollitia molestias architecto. Unde dignissimos sequi alias necessitatibus quod.",
  },
];

// Set the initial order of the testimonials
const reorderedTestimonials = [
  testimonials[3], // Johnny
  testimonials[0], // Joseph
  testimonials[1], // Sarah
  testimonials[2], // Julie
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 10000,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonial = () => {
  return (
    <div className="py-14 mb-10 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto">
          <motion.h1 
          variants={fadeIn("up",0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{once:false,amount:0.7}}
          className="text-2xl md:text-4xl font-bold text-black">Creative Journeys</motion.h1>
        </div>
        <div className='py-10'>
          <Slider {...settings}>
            {reorderedTestimonials.map((testimonial) => (
              <motion.div
              variants={fadeIn("up",0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{once:false,amount:0.7}}
              key={testimonial.id} className="bg-gray-100 p-8 rounded-lg shadow-lg relative flex flex-col gap-4 mb-8 max-w-[95%] min-h-[380px]">
              {/* Quotation marks */}
              <div className="absolute top-1 left-8 text-4xl text-gray-400">
                <img src={testimonialquatation} alt="" />
              </div>
            
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4"
                />
              </div>
            
              <div className="mt-4 text-center">
                <p className="text-lg font-medium">
                  {testimonial.name}, {testimonial.role}
                </p>
              </div>
            
              <p className="text-base text-center mt-2">{testimonial.review}</p>
              
              <div className="flex justify-center my-6 gap-1">
                <img src={Star} alt="" className="w-8" />
                <img src={Star} alt="" className="w-8" />
                <img src={Star} alt="" className="w-8" />
                <img src={Star} alt="" className="w-8" />
                <img src={Star} alt="" className="w-8" />
              </div>
            </motion.div>
            
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

