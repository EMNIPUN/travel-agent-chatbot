import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <motion.div 
      className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-2xl max-w-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <span className="text-gray-500 text-sm font-medium">TravelBot is typing</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
