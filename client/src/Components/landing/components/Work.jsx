import { motion } from "framer-motion";
import first from "../../assest/landingassests/categeories/1.png";
import second from "../../assest/landingassests/categeories/2.png";
import third from "../../assest/landingassests/categeories/3.png";
import four from "../../assest/landingassests/categeories/4.png";
import five from "../../assest/landingassests/categeories/5.png";
import six from "../../assest/landingassests/categeories/6.png";
import bg from "../../assest/landingassests/categeories/bg.png";

const jobCategories = [
  { title: "Graphic Designers", image: first },
  { title: "Writers", image: second },
  { title: "Filmmakers", image: third },
  { title: "Photographers", image: four },
  { title: "Fashion Designers", image: five },
  { title: "Musicians", image: six },
];

const JobCategories = () => {
  return (
    <section
      className="py-12 bg-[#e7ebf5]"
      style={{
        backgroundImage: `url(${bg})`, // Correct way to apply the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-black mb-6">Browse Job by Category</h2>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobCategories.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden text-center border  border-b-4 border-[#0C3891]"
          >
            <div className="w-40 h-40 mx-auto overflow-hidden  flex justify-center items-center"> {/* Corrected border class */}
              <img
                src={job.image}
                alt={job.title}
                className="w-20 h-20 object-cover" // Ensures image fits perfectly in the square
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JobCategories;
