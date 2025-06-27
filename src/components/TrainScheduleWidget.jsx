import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Clock, MapPin, ChevronRight } from 'lucide-react';

const TrainScheduleWidget = () => {
  const [selectedRoute, setSelectedRoute] = useState('colombo-kandy');
  const [currentTime, setCurrentTime] = useState(new Date());

  const trainRoutes = {
    'colombo-kandy': {
      name: 'Colombo to Kandy',
      duration: '3h 30m',
      schedules: [
        { time: '05:55', train: 'Podi Menike', class: 'AC', price: 'Rs 400' },
        { time: '08:30', train: 'Intercity Express', class: '1st Class', price: 'Rs 300' },
        { time: '15:35', train: 'Udarata Menike', class: 'AC', price: 'Rs 400' },
        { time: '19:45', train: 'Night Mail', class: '2nd Class', price: 'Rs 180' }
      ]
    },
    'colombo-ella': {
      name: 'Colombo to Ella',
      duration: '7h 15m',
      schedules: [
        { time: '08:47', train: 'Badulla Express', class: '2nd Class', price: 'Rs 280' },
        { time: '15:35', train: 'Udarata Menike', class: 'AC', price: 'Rs 520' }
      ]
    },
    'kandy-ella': {
      name: 'Kandy to Ella',
      duration: '4h 30m',
      schedules: [
        { time: '11:10', train: 'Badulla Express', class: '2nd Class', price: 'Rs 160' },
        { time: '18:45', train: 'Udarata Menike', class: 'AC', price: 'Rs 280' }
      ]
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getNextTrain = (schedules) => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return schedules.find(schedule => {
      const scheduleTime = parseInt(schedule.time.split(':')[0]) * 60 + parseInt(schedule.time.split(':')[1]);
      return scheduleTime > now;
    }) || schedules[0];
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
          <Train className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Train Schedules</h3>
          <p className="text-white/70 text-sm">Sri Lanka Railways</p>
        </div>
      </div>

      {/* Route Selector */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        {Object.entries(trainRoutes).map(([key, route]) => (
          <motion.button
            key={key}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              selectedRoute === key 
                ? 'bg-white/20 border border-white/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedRoute(key)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-white font-medium text-sm">{route.name}</div>
            <div className="text-white/60 text-xs">{route.duration}</div>
          </motion.button>
        ))}
      </div>

      {/* Next Train */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRoute}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const route = trainRoutes[selectedRoute];
            const nextTrain = getNextTrain(route.schedules);
            return (
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-400/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-xs font-medium">NEXT DEPARTURE</span>
                  <div className="flex items-center gap-1 text-white/60 text-xs">
                    <Clock className="w-3 h-3" />
                    {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{nextTrain.time}</div>
                    <div className="text-white/80 text-sm">{nextTrain.train}</div>
                    <div className="text-white/60 text-xs">{nextTrain.class} • {nextTrain.price}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      {/* All Schedules */}
      <div className="mt-4 space-y-2">
        <h4 className="text-white/80 text-sm font-medium">Today's Schedule</h4>
        {trainRoutes[selectedRoute].schedules.map((schedule, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center gap-3">
              <div className="text-white font-medium">{schedule.time}</div>
              <div className="text-white/70 text-sm">{schedule.train}</div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm">{schedule.class}</div>
              <div className="text-white/60 text-xs">{schedule.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrainScheduleWidget;
