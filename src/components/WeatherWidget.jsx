import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Eye,
  Droplets,
  MapPin
} from 'lucide-react';

const WeatherWidget = () => {
  const [currentCity, setCurrentCity] = useState('Colombo');
  
  // Mock weather data for Sri Lankan cities
  const weatherData = {
    Colombo: {
      temp: 28,
      condition: 'Sunny',
      humidity: 75,
      windSpeed: 12,
      visibility: 10,
      icon: <Sun className="w-6 h-6 text-yellow-500" />
    },
    Kandy: {
      temp: 24,
      condition: 'Partly Cloudy',
      humidity: 80,
      windSpeed: 8,
      visibility: 8,
      icon: <Sun className="w-6 h-6 text-yellow-400" />
    },
    Galle: {
      temp: 29,
      condition: 'Light Rain',
      humidity: 85,
      windSpeed: 15,
      visibility: 6,
      icon: <CloudRain className="w-6 h-6 text-blue-500" />
    },
    Nuwara_Eliya: {
      temp: 18,
      condition: 'Cool',
      humidity: 90,
      windSpeed: 5,
      visibility: 12,
      icon: <Sun className="w-6 h-6 text-blue-400" />
    }
  };

  const cities = ['Colombo', 'Kandy', 'Galle', 'Nuwara_Eliya'];
  const weather = weatherData[currentCity];

  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-4 text-white"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Weather in Sri Lanka
        </h3>
        <select 
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
          className="bg-white/20 rounded-lg px-2 py-1 text-sm backdrop-blur-sm border-none outline-none"
        >
          {cities.map(city => (
            <option key={city} value={city} className="text-gray-800">
              {city.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      
      <motion.div 
        className="flex items-center gap-4"
        key={currentCity}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2">
          {weather.icon}
          <span className="text-2xl font-bold">{weather.temp}°C</span>
        </div>
        <div className="flex-1">
          <p className="font-medium">{weather.condition}</p>
          <div className="flex items-center gap-4 text-sm text-white/80 mt-1">
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              {weather.humidity}%
            </span>
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3" />
              {weather.windSpeed}km/h
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherWidget;
