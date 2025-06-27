import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Star, 
  MapPin, 
  Clock,
  Users,
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const DestinationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const destinations = [
    {
      name: "Sigiriya Rock Fortress",
      location: "Central Province",
      rating: 4.8,
      visitors: "500K+",
      image: "🏛️",
      description: "Ancient palace and fortress complex with stunning frescoes",
      tags: ["UNESCO", "History", "Adventure"]
    },
    {
      name: "Temple of the Tooth",
      location: "Kandy",
      rating: 4.7,
      visitors: "300K+",
      image: "🏯",
      description: "Sacred Buddhist temple housing the tooth relic of Buddha",
      tags: ["Religious", "Culture", "UNESCO"]
    },
    {
      name: "Yala National Park",
      location: "Southern Province",
      rating: 4.9,
      visitors: "200K+",
      image: "🐆",
      description: "Best wildlife safari destination with leopards and elephants",
      tags: ["Wildlife", "Safari", "Nature"]
    },
    {
      name: "Galle Fort",
      location: "Southern Coast",
      rating: 4.6,
      visitors: "400K+",
      image: "🏰",
      description: "Dutch colonial fortress by the sea with charming streets",
      tags: ["Colonial", "Beach", "UNESCO"]
    },
    {
      name: "Adam's Peak",
      location: "Central Highlands",
      rating: 4.8,
      visitors: "150K+",
      image: "⛰️",
      description: "Sacred mountain with breathtaking sunrise views",
      tags: ["Hiking", "Religious", "Sunrise"]
    }
  ];

  const nextDestination = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const currentDest = destinations[currentIndex];

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-500" />
          Top Destinations
        </h3>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={prevDestination}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={nextDestination}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-start gap-3">
            <div className="text-4xl">{currentDest.image}</div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{currentDest.name}</h4>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {currentDest.location}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{currentDest.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{currentDest.visitors} yearly</span>
                </div>
              </div>
            </div>
            <motion.button
              className="p-2 rounded-full hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </motion.button>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {currentDest.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {currentDest.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.button
              className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700"
              whileHover={{ x: 2 }}
            >
              Learn More
              <ExternalLink className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-1 mt-4">
        {destinations.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DestinationCarousel;
