
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{
        background: [
          "linear-gradient(135deg, #8844ee, #b62fce)",
          "linear-gradient(135deg, #b62fce, #ff66c4)",
          "linear-gradient(135deg, #ff66c4, #8844ee)",
          "linear-gradient(135deg, #8844ee, #b62fce)"
        ]
      }}
      transition={{
        background: {
          repeat: Infinity,
          duration: 4,
          ease: "linear"
        }
      }}
    >
      <div className="text-center space-y-2">
        <motion.h1
          className="text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Muna
        </motion.h1>
        <motion.p
          className="text-2xl font-thin text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Elevation
        </motion.p>
      </div>
      
      {/* Abstract animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden opacity-40"
        style={{ filter: "blur(40px)" }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-violet-500"
          animate={{
            x: [0, 60, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 9,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
