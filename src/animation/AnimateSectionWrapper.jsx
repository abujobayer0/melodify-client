import { motion } from "framer-motion";

const AnimatedSectionWrapper = ({ children }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSectionWrapper;
