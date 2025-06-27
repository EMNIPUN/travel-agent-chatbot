import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Star, 
  Clock,
  Flame,
  Leaf,
  ChefHat,
  Heart,
  Info
} from 'lucide-react';

const FoodRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  
  const foodCategories = {
    popular: {
      title: "Must-Try Dishes",
      icon: <Star className="w-4 h-4" />,
      items: [
        {
          name: "Rice & Curry",
          description: "Traditional meal with rice and various curries",
          spice: 3,
          vegetarian: false,
          emoji: "🍛",
          price: "$$"
        },
        {
          name: "Kottu Roti",
          description: "Chopped roti stir-fried with vegetables and spices",
          spice: 2,
          vegetarian: true,
          emoji: "🥘",
          price: "$"
        },
        {
          name: "Hoppers (Appa)",
          description: "Bowl-shaped pancakes, perfect for breakfast",
          spice: 1,
          vegetarian: true,
          emoji: "🥞",
          price: "$"
        }
      ]
    },
    street: {
      title: "Street Food",
      icon: <ChefHat className="w-4 h-4" />,
      items: [
        {
          name: "Isso Wade",
          description: "Crispy prawn fritters with spicy sambol",
          spice: 4,
          vegetarian: false,
          emoji: "🍤",
          price: "$"
        },
        {
          name: "Samosa",
          description: "Deep-fried pastry with savory filling",
          spice: 2,
          vegetarian: true,
          emoji: "🥟",
          price: "$"
        },
        {
          name: "Wood Apple Juice",
          description: "Refreshing local fruit drink",
          spice: 0,
          vegetarian: true,
          emoji: "🧃",
          price: "$"
        }
      ]
    },
    sweets: {
      title: "Desserts",
      icon: <Heart className="w-4 h-4" />,
      items: [
        {
          name: "Wattalappam",
          description: "Steamed coconut custard with jaggery",
          spice: 0,
          vegetarian: true,
          emoji: "🍮",
          price: "$"
        },
        {
          name: "Kokis",
          description: "Crispy sweet treats, especially during New Year",
          spice: 0,
          vegetarian: true,
          emoji: "🍪",
          price: "$"
        },
        {
          name: "Curd & Honey",
          description: "Buffalo curd served with kithul treacle",
          spice: 0,
          vegetarian: true,
          emoji: "🍯",
          price: "$"
        }
      ]
    }
  };

  const categories = Object.keys(foodCategories);
  const currentCategory = foodCategories[selectedCategory];

  const getSpiceIndicator = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Flame 
        key={i} 
        className={`w-3 h-3 ${i < level ? 'text-red-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-4 text-black"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Utensils className="w-5 h-5" />
          Sri Lankan Cuisine
        </h3>
        <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          Updated Daily
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {foodCategories[category].icon}
            {foodCategories[category].title}
          </motion.button>
        ))}
      </div>

      {/* Food Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {currentCategory.items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{item.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-white/80">Spice:</span>
                      <div className="flex gap-0.5">
                        {getSpiceIndicator(item.spice)}
                      </div>
                    </div>
                    {item.vegetarian && (
                      <div className="flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-green-300" />
                        <span className="text-xs text-white/80">Vegetarian</span>
                      </div>
                    )}
                  </div>
                </div>
                <motion.button
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Info className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Food Tips */}
      <motion.div 
        className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h5 className="font-medium mb-2 flex items-center gap-2">
          <ChefHat className="w-4 h-4" />
          Pro Tips
        </h5>
        <ul className="text-xs text-white/90 space-y-1">
          <li>• Most restaurants serve meals on banana leaves for authentic experience</li>
          <li>• Ask for "less spicy" if you're not used to Sri Lankan heat levels</li>
          <li>• Try eating with your hands - it's traditional and enhances flavors!</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default FoodRecommendations;
