import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Sun, Wind, Thermometer, Eye, Activity } from 'lucide-react';

const SurfingConditions = () => {
  const [selectedBeach, setSelectedBeach] = useState('arugam-bay');

  const surfSpots = {
    'arugam-bay': {
      name: 'Arugam Bay',
      region: 'East Coast',
      season: 'Apr - Oct',
      level: 'All Levels',
      waveHeight: '3-6 ft',
      windDirection: 'Offshore',
      waterTemp: '28°C',
      conditions: 'Excellent',
      forecast: [
        { day: 'Today', wave: '4-5 ft', wind: '12 mph SW', rating: 9 },
        { day: 'Tomorrow', wave: '3-4 ft', wind: '10 mph SW', rating: 8 },
        { day: 'Day 3', wave: '5-6 ft', wind: '15 mph SW', rating: 9 }
      ],
      breaks: [
        { name: 'Main Point', type: 'Right-hand', difficulty: 'Intermediate' },
        { name: 'Coconut Tree Hill', type: 'Right-hand', difficulty: 'Advanced' },
        { name: 'Baby Point', type: 'Right-hand', difficulty: 'Beginner' }
      ]
    },
    'hikkaduwa': {
      name: 'Hikkaduwa',
      region: 'South Coast',
      season: 'Nov - Apr',
      level: 'Beginner-Intermediate',
      waveHeight: '2-4 ft',
      windDirection: 'Offshore',
      waterTemp: '27°C',
      conditions: 'Good',
      forecast: [
        { day: 'Today', wave: '2-3 ft', wind: '8 mph NE', rating: 7 },
        { day: 'Tomorrow', wave: '3-4 ft', wind: '10 mph NE', rating: 8 },
        { day: 'Day 3', wave: '2-3 ft', wind: '6 mph NE', rating: 6 }
      ],
      breaks: [
        { name: 'Main Break', type: 'Both', difficulty: 'Beginner' },
        { name: 'North Point', type: 'Right-hand', difficulty: 'Intermediate' }
      ]
    },
    'mirissa': {
      name: 'Mirissa',
      region: 'South Coast',
      season: 'Nov - Apr',
      level: 'Intermediate',
      waveHeight: '3-5 ft',
      windDirection: 'Light Offshore',
      waterTemp: '27°C',
      conditions: 'Good',
      forecast: [
        { day: 'Today', wave: '3-4 ft', wind: '5 mph NE', rating: 7 },
        { day: 'Tomorrow', wave: '4-5 ft', wind: '8 mph NE', rating: 8 },
        { day: 'Day 3', wave: '3-4 ft', wind: '7 mph NE', rating: 7 }
      ],
      breaks: [
        { name: 'Coconut Tree Hill', type: 'Right-hand', difficulty: 'Intermediate' },
        { name: 'Secret Point', type: 'Left-hand', difficulty: 'Advanced' }
      ]
    },
    'weligama': {
      name: 'Weligama Bay',
      region: 'South Coast',
      season: 'Nov - Apr',
      level: 'All Levels',
      waveHeight: '2-5 ft',
      windDirection: 'Variable',
      waterTemp: '27°C',
      conditions: 'Very Good',
      forecast: [
        { day: 'Today', wave: '3-4 ft', wind: '6 mph E', rating: 8 },
        { day: 'Tomorrow', wave: '4-5 ft', wind: '8 mph E', rating: 9 },
        { day: 'Day 3', wave: '3-4 ft', wind: '5 mph E', rating: 8 }
      ],
      breaks: [
        { name: 'Lazy Left', type: 'Left-hand', difficulty: 'Beginner' },
        { name: 'Lazy Right', type: 'Right-hand', difficulty: 'Beginner' },
        { name: 'Plantation', type: 'Right-hand', difficulty: 'Intermediate' }
      ]
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400 bg-green-400/20';
    if (rating >= 6) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getConditionsColor = (conditions) => {
    switch (conditions.toLowerCase()) {
      case 'excellent': return 'text-green-400 bg-green-400/20';
      case 'very good': return 'text-emerald-400 bg-emerald-400/20';
      case 'good': return 'text-yellow-400 bg-yellow-400/20';
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
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <Waves className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-black">Surf Conditions</h3>
          <p className="text-black/70 text-sm">Live surf reports</p>
        </div>
      </div>

      {/* Beach Selector */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(surfSpots).map(([key, spot]) => (
          <motion.button
            key={key}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedBeach === key 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedBeach(key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-black font-medium text-sm">{spot.name}</div>
            <div className="text-black/60 text-xs">{spot.region}</div>
          </motion.button>
        ))}
      </div>

      {/* Surf Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBeach}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const spot = surfSpots[selectedBeach];
            return (
              <div className="space-y-4">
                {/* Current Conditions */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-400/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-700 font-semibold">{spot.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getConditionsColor(spot.conditions)}`}>
                      {spot.conditions}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-700 text-sm">{spot.waveHeight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-700 text-sm">{spot.windDirection}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-700 text-sm">{spot.waterTemp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-700 text-sm">{spot.level}</span>
                    </div>
                  </div>

                  <div className="text-gray-700 text-xs">
                    Best Season: {spot.season}
                  </div>
                </div>

                {/* 3-Day Forecast */}
                <div>
                  <h5 className="text-black/80 text-sm font-medium mb-2">3-Day Forecast</h5>
                  <div className="space-y-2">
                    {spot.forecast.map((day, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-black font-medium text-sm w-16">{day.day}</div>
                          <div className="text-black/70 text-sm">{day.wave}</div>
                          <div className="text-black/60 text-xs">{day.wind}</div>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full font-medium ${getRatingColor(day.rating)}`}>
                          {day.rating}/10
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Surf Breaks */}
                <div>
                  <h5 className="text-black/80 text-sm font-medium mb-2">Surf Breaks</h5>
                  <div className="space-y-2">
                    {spot.breaks.map((surfBreak, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div>
                          <div className="text-black font-medium text-sm">{surfBreak.name}</div>
                          <div className="text-black/60 text-xs">{surfBreak.type}</div>
                        </div>
                        <span className="text-black/70 text-xs bg-black/10 px-2 py-1 rounded">
                          {surfBreak.difficulty}
                        </span>
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

export default SurfingConditions;
