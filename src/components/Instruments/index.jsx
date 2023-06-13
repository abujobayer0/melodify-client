import TiltCard from "../tiltCard";

import { services } from "../../constansts";
import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";
import SectionWrapper from "../sectionWrapper";
const Instruments = () => {
  return (
    <>
      <motion.div
        className="bg-gradient-new   rounded "
        variants={textVariant()}
      >
        <p className="sm:text-[18px]  text-[14px] bg-dark text-gray-100 uppercase tracking-wider">
          Introduction
        </p>
        <h2 className="text-gray-100 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Instruments
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className=" text-secondary bg-dark p-4 rounded  md:px-10 px-5  text-center mx-auto text-gray-200 text-[17px] max-w-3xl leading-[30px]"
      >
        Explore our range of guitars, both acoustic and electric, that offer
        advanced features such as integrated tuners, digital effects, and online
        connectivity for learning resources. If youre interested in exploring
        the world of synthesis and sound design, our synthesizers and MIDI
        controllers offer endless possibilities for creating unique sounds and
        melodies.
      </motion.p>

      <div className="mt-20 grid grid-cols-1 xs:grid-cols-2 p-4 rounded bg-dark md:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <TiltCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Instruments, "instructors");
