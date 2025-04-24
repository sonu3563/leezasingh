import { motion } from "framer-motion";
import {fadeIn} from '../../../variants';
import first from "../../assest/landingassests/categeories/1.png";
import second from "../../assest/landingassests/categeories/2.png";
import third from "../../assest/landingassests/categeories/3.png";
import four from "../../assest/landingassests/categeories/4.png";
import five from "../../assest/landingassests/categeories/5.png";
import six from "../../assest/landingassests/categeories/6.png";
import bg from "../../assest/landingassests/categeories/bg.png";
import seven from "../../assest/landingassests/categeories/7.png";
import eight from "../../assest/landingassests/categeories/8.png";
import nine from "../../assest/landingassests/categeories/9.png";

const jobCategories = [
  { title: "Graphic Designers", image: first },
  { title: "Authors", image: second },
  { title: "Filmmakers", image: third },
  { title: "Photographers", image: four },
  { title: "Fashion Designers", image: five },
  { title: "Musicians", image: six },
  { title: "Cullinary & Mixologists", image: seven },
  { title: "Event Producers", image: eight },
  { title: "Artists", image: nine },
];

const JobCategories = () => {
  return (
    <section
      className="py-20 bg-[#e7ebf5]"
      style={{
        backgroundImage: `url(${bg})`, // Correct way to apply the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-black mb-6">Opportunities by Category</h2>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 md:px-20 lg:px-30">
        {jobCategories.map((job, index) => (
          <motion.div
            key={index}
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.4 },
            }}
            className="bg-white shadow-lg overflow-hidden text-center border border-b-4 border-[#0C3891] rounded-lg"
          >
            <div className="w-40 h-40 mx-auto overflow-hidden flex justify-center items-center">
            <img
  src={job.image}
  alt={job.title}
  className="w-20 h-20 object-cover filter-blue"
/>

            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#0C3891]">{job.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default JobCategories;
