import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Gift,
  Music,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const CulturalEvents = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  
  const events = [
    {
      name: "Kandy Esala Perahera",
      date: "July 15-25, 2025",
      location: "Kandy",
      type: "Religious Festival",
      description: "Grand procession with decorated elephants and traditional dancers",
      icon: "🐘",
      status: "upcoming",
      attendees: "500K+"
    },
    {
      name: "Sinhala & Tamil New Year",
      date: "April 13-14, 2025",
      location: "Island Wide",
      type: "Cultural Celebration",
      description: "Traditional games, foods, and family gatherings",
      icon: "🎊",
      status: "completed",
      attendees: "21M+"
    },
    {
      name: "Vesak Festival",
      date: "May 12, 2025",
      location: "Island Wide",
      type: "Buddhist Festival",
      description: "Colorful lanterns and acts of kindness",
      icon: "🏮",
      status: "completed",
      attendees: "15M+"
    },
    {
      name: "Galle Literary Festival",
      date: "January 18-22, 2025",
      location: "Galle Fort",
      type: "Cultural Event",
      description: "International writers and book enthusiasts gather",
      icon: "📚",
      status: "completed",
      attendees: "10K+"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const event = events[currentEvent];

  return (
    <motion.div 
      className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white overflow-hidden relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 text-6xl">🎭</div>
        <div className="absolute bottom-2 left-2 text-4xl">🎨</div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Cultural Events
          </h3>
          <div className="flex gap-1">
            {events.map((_, index) => (
              <motion.div
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentEvent ? 'bg-white' : 'bg-white/50'
                }`}
                animate={{ scale: index === currentEvent ? 1.2 : 1 }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{event.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">{event.name}</h4>
                <div className="flex items-center gap-4 text-sm text-white/90 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                event.status === 'upcoming' 
                  ? 'bg-green-400/20 text-green-100' 
                  : 'bg-blue-400/20 text-blue-100'
              }`}>
                {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
              </div>
            </div>

            <p className="text-white/90 text-sm leading-relaxed">
              {event.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {event.attendees} attendees
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                  {event.type}
                </span>
              </div>
              <motion.button
                className="flex items-center gap-1 text-sm font-medium bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ x: 2 }}
              >
                Explore
                <ChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CulturalEvents;
