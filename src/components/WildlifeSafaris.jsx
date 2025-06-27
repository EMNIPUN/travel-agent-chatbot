import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Binoculars, 
  Camera, 
  MapPin, 
  Clock, 
  Calendar,
  Star,
  Sunrise
} from 'lucide-react';

const WildlifeSafaris = () => {
  const [selectedPark, setSelectedPark] = useState('yala');

  const nationalParks = {
    'yala': {
      name: 'Yala National Park',
      location: 'Southern Province',
      area: '979 km²',
      established: '1938',
      bestTime: 'Feb - Jul',
      leopardDensity: 'Highest in world',
      rating: 4.9,
      price: 'USD 25',
      highlights: [
        'Sri Lankan leopards (35+ individuals)',
        'Sloth bears and elephants',
        'Over 215 bird species',
        'Ancient rock temples'
      ],
      wildlife: [
        { species: 'Sri Lankan Leopard', chance: 85, icon: '🐆' },
        { species: 'Asian Elephant', chance: 70, icon: '🐘' },
        { species: 'Sloth Bear', chance: 45, icon: '🐻' },
        { species: 'Water Buffalo', chance: 90, icon: '🐃' },
        { species: 'Peacock', chance: 95, icon: '🦚' },
        { species: 'Spotted Deer', chance: 100, icon: '🦌' }
      ],
      safariTimes: [
        { time: '06:00 - 10:00', type: 'Morning Safari', temp: '24°C', activity: 'High' },
        { time: '14:30 - 18:30', type: 'Evening Safari', temp: '28°C', activity: 'Very High' }
      ]
    },
    'udawalawe': {
      name: 'Udawalawe National Park',
      location: 'Sabaragamuwa Province',
      area: '308 km²',
      established: '1972',
      bestTime: 'May - Sep',
      leopardDensity: 'Moderate',
      rating: 4.7,
      price: 'USD 20',
      highlights: [
        'Large elephant herds (500+ elephants)',
        'Udawalawe Reservoir views',
        'Elephant Transit Home nearby',
        'Open grasslands perfect for viewing'
      ],
      wildlife: [
        { species: 'Asian Elephant', chance: 95, icon: '🐘' },
        { species: 'Water Buffalo', chance: 80, icon: '🐃' },
        { species: 'Sambar Deer', chance: 70, icon: '🦌' },
        { species: 'Wild Boar', chance: 60, icon: '🐗' },
        { species: 'Crocodile', chance: 50, icon: '🐊' },
        { species: 'Peacock', chance: 85, icon: '🦚' }
      ],
      safariTimes: [
        { time: '06:30 - 10:30', type: 'Morning Safari', temp: '25°C', activity: 'High' },
        { time: '15:00 - 19:00', type: 'Evening Safari', temp: '29°C', activity: 'High' }
      ]
    },
    'wilpattu': {
      name: 'Wilpattu National Park',
      location: 'North Western Province',
      area: '1,317 km²',
      established: '1938',
      bestTime: 'Feb - Oct',
      leopardDensity: 'High',
      rating: 4.6,
      price: 'USD 25',
      highlights: [
        'Largest national park in Sri Lanka',
        'Natural lakes (Villus)',
        'Dense forest cover',
        'Less crowded than Yala'
      ],
      wildlife: [
        { species: 'Sri Lankan Leopard', chance: 60, icon: '🐆' },
        { species: 'Asian Elephant', chance: 65, icon: '🐘' },
        { species: 'Sloth Bear', chance: 30, icon: '🐻' },
        { species: 'Spotted Deer', chance: 95, icon: '🦌' },
        { species: 'Purple-faced Langur', chance: 80, icon: '🐒' },
        { species: 'Painted Stork', chance: 70, icon: '🕊️' }
      ],
      safariTimes: [
        { time: '06:00 - 10:00', type: 'Morning Safari', temp: '26°C', activity: 'Medium' },
        { time: '14:30 - 18:30', type: 'Evening Safari', temp: '30°C', activity: 'High' }
      ]
    },
    'minneriya': {
      name: 'Minneriya National Park',
      location: 'North Central Province',
      area: '89 km²',
      established: '1997',
      bestTime: 'Jun - Sep',
      leopardDensity: 'Low',
      rating: 4.8,
      price: 'USD 15',
      highlights: [
        'The Great Elephant Gathering',
        '200-300 elephants in dry season',
        'Ancient Minneriya Tank',
        'Rich birdlife around the reservoir'
      ],
      wildlife: [
        { species: 'Asian Elephant', chance: 90, icon: '🐘' },
        { species: 'Toque Macaque', chance: 85, icon: '🐒' },
        { species: 'Purple Heron', chance: 75, icon: '🕊️' },
        { species: 'Spotted Deer', chance: 90, icon: '🦌' },
        { species: 'Wild Boar', chance: 55, icon: '🐗' },
        { species: 'Cormorant', chance: 80, icon: '🐦' }
      ],
      safariTimes: [
        { time: '06:30 - 10:30', type: 'Morning Safari', temp: '27°C', activity: 'Medium' },
        { time: '15:30 - 19:30', type: 'Evening Safari', temp: '31°C', activity: 'Very High' }
      ]
    }
  };

  const getChanceColor = (chance) => {
    if (chance >= 80) return 'text-green-400 bg-green-400/20';
    if (chance >= 60) return 'text-yellow-400 bg-yellow-400/20';
    if (chance >= 40) return 'text-orange-400 bg-orange-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getActivityColor = (activity) => {
    switch (activity.toLowerCase()) {
      case 'very high': return 'text-green-400 bg-green-400/20';
      case 'high': return 'text-emerald-400 bg-emerald-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
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
        <div className="p-2 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg">
          <Binoculars className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Wildlife Safaris</h3>
          <p className="text-white/70 text-sm">National Parks Guide</p>
        </div>
      </div>

      {/* Park Selector */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(nationalParks).map(([key, park]) => (
          <motion.button
            key={key}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedPark === key 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedPark(key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-white font-medium text-sm">{park.name}</div>
            <div className="text-white/60 text-xs">{park.location}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/80 text-xs">⭐ {park.rating}</span>
              <span className="text-white/60 text-xs">{park.price}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Park Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPark}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const park = nationalParks[selectedPark];
            
            return (
              <div className="space-y-4">
                {/* Park Info */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg p-4 border border-amber-400/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{park.name}</h4>
                    <div className="text-white/60 text-xs">Est. {park.established}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="text-white/80 text-sm">{park.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span className="text-white/80 text-sm">{park.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-white/80 text-sm">{park.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-white/80 text-sm">{park.leopardDensity}</span>
                    </div>
                  </div>
                </div>

                {/* Safari Times */}
                <div>
                  <h5 className="text-white/80 text-sm font-medium mb-2">Safari Times</h5>
                  <div className="space-y-2">
                    {park.safariTimes.map((safari, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {index === 0 ? <Sunrise className="w-4 h-4 text-yellow-400" /> : <Camera className="w-4 h-4 text-orange-400" />}
                            <div className="text-white font-medium text-sm">{safari.time}</div>
                          </div>
                          <div className="text-white/70 text-sm">{safari.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white/80 text-sm">{safari.temp}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getActivityColor(safari.activity)}`}>
                            {safari.activity}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Wildlife Spotting */}
                <div>
                  <h5 className="text-white/80 text-sm font-medium mb-2">Wildlife Spotting Chances</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {park.wildlife.map((animal, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{animal.icon}</span>
                          <div className="text-white/80 text-sm">{animal.species}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${animal.chance}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getChanceColor(animal.chance)}`}>
                            {animal.chance}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Park Highlights */}
                <div>
                  <h5 className="text-white/80 text-sm font-medium mb-2">Park Highlights</h5>
                  <div className="space-y-2">
                    {park.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-white/5 rounded text-white/70 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{highlight}</span>
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

export default WildlifeSafaris;
