import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Coffee, 
  Factory, 
  MapPin, 
  Clock, 
  Users, 
  Camera,
  ChevronRight 
} from 'lucide-react';

const TeaPlantationTours = () => {
  const [selectedPlantation, setSelectedPlantation] = useState('pedro');
  const [currentTime, setCurrentTime] = useState(new Date());

  const plantations = {
    'pedro': {
      name: 'Pedro Tea Estate',
      location: 'Nuwara Eliya',
      altitude: '1,868m',
      established: '1885',
      specialty: 'Orange Pekoe',
      rating: 4.8,
      duration: '2-3 hours',
      price: 'Rs 1,500',
      highlights: [
        'Oldest tea estate in Sri Lanka',
        'Traditional tea processing methods',
        'Panoramic mountain views',
        'Tea tasting session included'
      ],
      tours: [
        { time: '09:00', type: 'Morning Tour', available: 15 },
        { time: '14:00', type: 'Afternoon Tour', available: 8 },
        { time: '16:30', type: 'Sunset Tour', available: 12 }
      ],
      teaTypes: [
        { name: 'Orange Pekoe', strength: 'Medium', price: 'Rs 800/100g' },
        { name: 'Broken Orange Pekoe', strength: 'Strong', price: 'Rs 650/100g' },
        { name: 'Pekoe', strength: 'Light', price: 'Rs 750/100g' }
      ]
    },
    'damro': {
      name: 'Damro Tea Estate',
      location: 'Talawakelle',
      altitude: '1,200m',
      established: '1890',
      specialty: 'Earl Grey',
      rating: 4.6,
      duration: '2 hours',
      price: 'Rs 1,200',
      highlights: [
        'Award-winning Earl Grey production',
        'Modern processing facility',
        'Scenic valley location',
        'Interactive tea blending workshop'
      ],
      tours: [
        { time: '10:00', type: 'Standard Tour', available: 20 },
        { time: '15:00', type: 'Premium Tour', available: 5 }
      ],
      teaTypes: [
        { name: 'Earl Grey', strength: 'Medium', price: 'Rs 950/100g' },
        { name: 'English Breakfast', strength: 'Strong', price: 'Rs 700/100g' },
        { name: 'Ceylon Gold', strength: 'Medium', price: 'Rs 850/100g' }
      ]
    },
    'mackwoods': {
      name: 'Mackwoods Labookellie',
      location: 'Nuwara Eliya',
      altitude: '1,950m',
      established: '1841',
      specialty: 'High Grown Ceylon',
      rating: 4.9,
      duration: '2.5 hours',
      price: 'Rs 1,800',
      highlights: [
        'Highest altitude tea estate',
        'Premium Ceylon tea varieties',
        'Heritage tea factory',
        'Complimentary tea and cake'
      ],
      tours: [
        { time: '08:30', type: 'Early Bird Tour', available: 10 },
        { time: '11:00', type: 'Heritage Tour', available: 18 },
        { time: '14:30', type: 'Afternoon Delight', available: 6 }
      ],
      teaTypes: [
        { name: 'High Grown Ceylon', strength: 'Medium', price: 'Rs 1,200/100g' },
        { name: 'Silver Tips', strength: 'Light', price: 'Rs 2,500/100g' },
        { name: 'Golden Tips', strength: 'Light', price: 'Rs 1,800/100g' }
      ]
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getNextTour = (tours) => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return tours.find(tour => {
      const tourTime = parseInt(tour.time.split(':')[0]) * 60 + parseInt(tour.time.split(':')[1]);
      return tourTime > now;
    }) || tours[0];
  };

  const getStrengthColor = (strength) => {
    switch (strength.toLowerCase()) {
      case 'light': return 'text-yellow-400 bg-yellow-400/20';
      case 'medium': return 'text-orange-400 bg-orange-400/20';
      case 'strong': return 'text-red-400 bg-red-400/20';
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
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-black">Tea Plantation Tours</h3>
          <p className="text-black/70 text-sm">Ceylon Tea Experience</p>
        </div>
      </div>

      {/* Plantation Selector */}
      <div className="grid grid-cols-1 gap-2 mb-6">
        {Object.entries(plantations).map(([key, plantation]) => (
          <motion.button
            key={key}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedPlantation === key 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedPlantation(key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-black font-medium text-sm">{plantation.name}</div>
                <div className="text-black/60 text-xs">{plantation.location} • {plantation.altitude}</div>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm">⭐ {plantation.rating}</div>
                <div className="text-white/60 text-xs">{plantation.price}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Plantation Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPlantation}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const plantation = plantations[selectedPlantation];
            const nextTour = getNextTour(plantation.tours);
            
            return (
              <div className="space-y-4">
                {/* Plantation Info */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-400/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-black font-semibold">{plantation.name}</h4>
                    <div className="text-black/60 text-xs">Est. {plantation.established}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{plantation.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{plantation.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{plantation.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Factory className="w-4 h-4 text-green-400" />
                      <span className="text-black/80 text-sm">{plantation.altitude}</span>
                    </div>
                  </div>
                </div>

                {/* Next Tour */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg p-4 border border-amber-400/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-400 text-xs font-medium">NEXT TOUR</span>
                    <div className="flex items-center gap-1 text-black/60 text-xs">
                      <Clock className="w-3 h-3" />
                      {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-black font-semibold">{nextTour.time}</div>
                      <div className="text-black/80 text-sm">{nextTour.type}</div>
                      <div className="text-black/60 text-xs flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {nextTour.available} spots available
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-black/60" />
                  </div>
                </div>

                {/* Today's Tours */}
                <div>
                  <h5 className="text-black/80 text-sm font-medium mb-2">Today's Tours</h5>
                  <div className="space-y-2">
                    {plantation.tours.map((tour, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-black font-medium">{tour.time}</div>
                          <div className="text-black/70 text-sm">{tour.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-black/80 text-sm flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {tour.available}
                          </div>
                          <div className="text-black/60 text-xs">available</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tea Varieties */}
                <div>
                  <h5 className="text-black/80 text-sm font-medium mb-2">Tea Varieties</h5>
                  <div className="space-y-2">
                    {plantation.teaTypes.map((tea, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div>
                          <div className="text-black font-medium text-sm">{tea.name}</div>
                          <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${getStrengthColor(tea.strength)}`}>
                            {tea.strength}
                          </span>
                        </div>
                        <div className="text-black/80 text-sm">{tea.price}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h5 className="text-black/80 text-sm font-medium mb-2">Tour Highlights</h5>
                  <div className="space-y-2">
                    {plantation.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-white/5 rounded text-black/70 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
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

export default TeaPlantationTours;
