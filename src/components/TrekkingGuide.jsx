import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Camera, Star, MapPin, Clock, Users } from 'lucide-react';

const TrekkingGuide = () => {
  const [selectedTrek, setSelectedTrek] = useState('adams-peak');

  const trekkingRoutes = {
    'adams-peak': {
      name: "Adam's Peak (Sri Pada)",
      difficulty: 'Moderate',
      duration: '4-6 hours',
      elevation: '2,243m',
      bestTime: 'Dec - Apr',
      description: 'Sacred mountain with stunning sunrise views',
      tips: [
        'Start climbing around 2 AM to catch sunrise',
        'Wear warm clothes - it gets cold at the top',
        'Bring flashlight and water',
        'Religious site - dress modestly'
      ],
      routes: [
        { name: 'Hatton/Nallathanniya', difficulty: 'Easy', time: '3-4h' },
        { name: 'Ratnapura', difficulty: 'Hard', time: '5-7h' },
        { name: 'Kuruwita', difficulty: 'Very Hard', time: '6-8h' }
      ]
    },
    'worlds-end': {
      name: "World's End",
      difficulty: 'Easy',
      duration: '3-4 hours',
      elevation: '2,140m',
      bestTime: 'Jan - Mar',
      description: 'Dramatic cliff with 870m drop and panoramic views',
      tips: [
        'Start early (6 AM) to avoid clouds',
        'Wear comfortable hiking shoes',
        'Bring jacket - it can be windy',
        'Entry through Horton Plains National Park'
      ],
      routes: [
        { name: 'Horton Plains Circuit', difficulty: 'Easy', time: '3-4h' }
      ]
    },
    'little-adams-peak': {
      name: "Little Adam's Peak",
      difficulty: 'Easy',
      duration: '1-2 hours',
      elevation: '1,141m',
      bestTime: 'Year round',
      description: 'Perfect for beginners with 360° views of Ella',
      tips: [
        'Great for sunrise or sunset',
        'Easy hike suitable for all ages',
        'Bring camera for tea plantation views',
        'Can be combined with Nine Arch Bridge visit'
      ],
      routes: [
        { name: 'Ella Town Trail', difficulty: 'Easy', time: '1-2h' }
      ]
    },
    'ella-rock': {
      name: 'Ella Rock',
      difficulty: 'Moderate',
      duration: '3-4 hours',
      elevation: '1,041m',
      bestTime: 'Dec - Mar',
      description: 'Challenging hike through tea estates with stunning views',
      tips: [
        'Follow railway track for part of the route',
        'Hire local guide to avoid getting lost',
        'Wear sturdy shoes - path can be slippery',
        'Start early to avoid afternoon heat'
      ],
      routes: [
        { name: 'Railway Track Route', difficulty: 'Moderate', time: '3-4h' }
      ]
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'moderate': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-orange-400 bg-orange-400/20';
      case 'very hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg">
          <Mountain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-black">Trekking Guide</h3>
          <p className="text-black/70 text-sm">Mountain Adventures</p>
        </div>
      </div>

      {/* Trek Selector */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(trekkingRoutes).map(([key, trek]) => (
          <motion.button
            key={key}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedTrek === key 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedTrek(key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-black font-medium text-sm">{trek.name}</div>
            <div className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getDifficultyColor(trek.difficulty)}`}>
              {trek.difficulty}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Trek Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTrek}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const trek = trekkingRoutes[selectedTrek];
            return (
              <div className="space-y-4">
                {/* Trek Info */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-400/30">
                  <h4 className="text-black font-semibold mb-2">{trek.name}</h4>
                  <p className="text-black/80 text-sm mb-3">{trek.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{trek.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mountain className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{trek.elevation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{trek.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(trek.difficulty)}`}>
                        {trek.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Routes */}
                <div>
                  <h5 className="text-white/80 text-sm font-medium mb-2">Available Routes</h5>
                  <div className="space-y-2">
                    {trek.routes.map((route, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <div>
                          <div className="text-black font-medium text-sm">{route.name}</div>
                          <div className="text-black/60 text-xs">{route.time}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(route.difficulty)}`}>
                          {route.difficulty}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h5 className="text-black/80 text-sm font-medium mb-2">Pro Tips</h5>
                  <div className="space-y-2">
                    {trek.tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-white/5 rounded text-black/70 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{tip}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TrekkingGuide;
