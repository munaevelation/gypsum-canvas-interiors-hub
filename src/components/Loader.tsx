
import { motion } from "framer-motion";

const Loader = () => {
  // Animation variants for the bubbles
  const bubbleVariants = {
    animate: (i: number) => ({
      y: [0, -40, 0],
      x: [0, i * 20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3 + i * 0.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }
    })
  };

  // Create an array of bubbles
  const bubbles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: 20 + Math.random() * 30,
    initialX: (Math.random() - 0.5) * 300,
    initialY: (Math.random() - 0.5) * 300,
  }));

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-2 relative z-10">
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
      
      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `calc(50% + ${bubble.initialX}px)`,
              top: `calc(50% + ${bubble.initialY}px)`,
            }}
            custom={bubble.id % 5}
            variants={bubbleVariants}
            animate="animate"
          />
        ))}
      </div>
      
      {/* Additional circle animation around the text */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full border-2 border-white/20"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      {/* Second circle animation around the text */}
      <motion.div 
        className="absolute w-60 h-60 rounded-full border border-white/10"
        animate={{
          rotate: -360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
    </motion.div>
  );
};

export default Loader;
