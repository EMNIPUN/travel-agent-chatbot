import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Heart, 
  AlertTriangle,
  CheckCircle,
  Info,
  Phone,
  MapPin,
  Clock,
  Droplets,
  Sun
} from 'lucide-react';

const TravelTipsWidget = () => {
  const [activeTab, setActiveTab] = useState('safety');
  
  const tipCategories = {
    safety: {
      title: "Safety Tips",
      icon: <Shield className="w-4 h-4" />,
      color: "from-red-500 to-red-600",
      tips: [
        {
          icon: <Phone className="w-5 h-5" />,
          title: "Emergency Numbers",
          content: "Police: 119 | Fire: 110 | Ambulance: 1990",
          type: "important"
        },
        {
          icon: <MapPin className="w-5 h-5" />,
          title: "Stay Connected",
          content: "Download offline maps and share your location with someone",
          type: "advice"
        },
        {
          icon: <Droplets className="w-5 h-5" />,
          title: "Water Safety",
          content: "Drink bottled water, especially in remote areas",
          type: "health"
        }
      ]
    },
    health: {
      title: "Health Tips",
      icon: <Heart className="w-4 h-4" />,
      color: "from-green-500 to-green-600",
      tips: [
        {
          icon: <Sun className="w-5 h-5" />,
          title: "Sun Protection",
          content: "Use SPF 30+ sunscreen, especially on beaches and highlands",
          type: "health"
        },
        {
          icon: <AlertTriangle className="w-5 h-5" />,
          title: "Mosquito Prevention",
          content: "Use repellent during dawn/dusk, especially in rural areas",
          type: "important"
        },
        {
          icon: <CheckCircle className="w-5 h-5" />,
          title: "Vaccinations",
          content: "No mandatory vaccines, but Hepatitis A/B recommended",
          type: "advice"
        }
      ]
    },
    cultural: {
      title: "Cultural Tips",
      icon: <Info className="w-4 h-4" />,
      color: "from-purple-500 to-purple-600",
      tips: [
        {
          icon: <Heart className="w-5 h-5" />,
          title: "Temple Etiquette",
          content: "Remove shoes, cover shoulders/knees, don't point feet at Buddha",
          type: "important"
        },
        {
          icon: <CheckCircle className="w-5 h-5" />,
          title: "Greeting",
          content: "Use 'Ayubowan' (may you live long) with hands in prayer position",
          type: "cultural"
        },
        {
          icon: <Clock className="w-5 h-5" />,
          title: "Sri Lankan Time",
          content: "Things move at a relaxed pace - embrace the 'island time'",
          type: "advice"
        }
      ]
    }
  };

  const tabs = Object.keys(tipCategories);
  const currentCategory = tipCategories[activeTab];

  const getIconColor = (type) => {
    switch (type) {
      case 'important': return 'text-red-500';
      case 'health': return 'text-green-500';
      case 'cultural': return 'text-purple-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <motion.div 
      className={`bg-gradient-to-r ${currentCategory.color} rounded-xl p-4 text-white`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          {currentCategory.icon}
          Travel Essentials
        </h3>
        <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
          <CheckCircle className="w-3 h-3" />
          Updated
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              activeTab === tab 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tipCategories[tab].icon}
            {tipCategories[tab].title}
          </motion.button>
        ))}
      </div>

      {/* Tips Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {currentCategory.tips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <div className="flex items-start gap-3">
                <div className="p-1 bg-white/20 rounded-lg">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                  <p className="text-white/90 text-xs leading-relaxed">{tip.content}</p>
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  tip.type === 'important' ? 'bg-red-300' :
                  tip.type === 'health' ? 'bg-green-300' :
                  tip.type === 'cultural' ? 'bg-purple-300' : 'bg-blue-300'
                }`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Quick Tip */}
      <motion.div 
        className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-white/90 text-center">
          💡 <strong>Quick Tip:</strong> Download the "TripAdvisor" and "Uber" apps for easy navigation and transport in Sri Lanka!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default TravelTipsWidget;
