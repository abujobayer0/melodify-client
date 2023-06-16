import TiltCard from "../tiltCard";

import { services } from "../../constansts";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";
import SectionWrapper from "../sectionWrapper";
const Instruments = () => {
  return (
    <>
      <motion.div className="bg-gradient-new  pt-10  rounded ">
        <p className="sm:text-[18px]  text-[14px] bg-dark text-gray-100 uppercase tracking-wider">
          Quick View
        </p>
        <h2 className="text-gray-100 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Our Universe
        </h2>
      </motion.div>

      <motion.p className=" text-secondary bg-dark p-4 rounded  md:px-10 px-5  text-center mx-auto text-gray-200 text-[17px] max-w-3xl leading-[30px]">
        In our space learning platform, prepare to embark on an awe-inspiring
        cosmic journey as you delve into the mysteries of the universe. From
        exploring the wonders of our solar system to unraveling the secrets of
        distant galaxies, our carefully crafted curriculum offers a
        comprehensive understanding of space science.
      </motion.p>

      <div className="mt-20 grid grid-cols-1 xs:grid-cols-2 p-4 rounded bg-dark md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <TiltCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default Instruments;
