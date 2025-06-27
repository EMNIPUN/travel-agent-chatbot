import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Smile, 
  MapPin, 
  Camera, 
  Calendar, 
  Plane,
  Hotel,
  Utensils,
  Sun,
  Navigation,
  MicOff
} from 'lucide-react';

function UseForm({ setChatHistory, generateChatBotResponse, chatHistory }) {
  const inputRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  // Enhanced suggestions with categories
  const suggestionCategories = [
    {
      title: "Popular Destinations",
      icon: <MapPin className="w-4 h-4" />,
      suggestions: ["Best beaches in Sri Lanka", "Ancient cities to visit", "Hill country attractions", "National parks"]
    },
    {
      title: "Accommodation",
      icon: <Hotel className="w-4 h-4" />,
      suggestions: ["Luxury hotels in Colombo", "Beach resorts in Galle", "Eco lodges in Kandy", "Budget hostels"]
    },
    {
      title: "Food & Culture",
      icon: <Utensils className="w-4 h-4" />,
      suggestions: ["Traditional Sri Lankan food", "Street food recommendations", "Cultural experiences", "Local festivals"]
    },
    {
      title: "Weather & Travel",
      icon: <Sun className="w-4 h-4" />,
      suggestions: ["Best time to visit", "Weather today", "Monsoon seasons", "Packing tips"]
    }
  ];

  // Quick action buttons
  const quickActions = [
    { icon: <Plane className="w-5 h-5" />, label: "Flights", query: "Find flights to Sri Lanka" },
    { icon: <Hotel className="w-5 h-5" />, label: "Hotels", query: "Recommend hotels in Colombo" },
    { icon: <Navigation className="w-5 h-5" />, label: "Transport", query: "Transportation options in Sri Lanka" },
    { icon: <Camera className="w-5 h-5" />, label: "Activities", query: "Tourist activities and attractions" },
    { icon: <Calendar className="w-5 h-5" />, label: "Planning", query: "Help me plan my itinerary" },
    { icon: <Utensils className="w-5 h-5" />, label: "Food", query: "Local food and restaurants" }
  ];

  useEffect(() => {
    if (inputValue.length > 0) {
      setShowSuggestions(false);
      setIsTyping(true);
    } else {
      setShowSuggestions(true);
      setIsTyping(false);
    }
  }, [inputValue]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    
    inputRef.current.value = '';
    setInputValue('');
    setShowSuggestions(true);

    // Add user message to chat history
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    setTimeout(() => {
      const thinkingMessage = {
        role: "model",
        text: "Thinking...", 
        imageUrl: "/icons/more.gif", 
      };
  
      setChatHistory((history) => [...history, thinkingMessage]);

      generateChatBotResponse([...chatHistory, { role: "user", text: "your name is TravelAI, You are a helpful Sri Lankan tourist agent. Answer queries about travel, destinations, transportation, and accommodations in a friendly and informative manner. Format your responses with proper paragraphs and bullet points when listing items. When asked not related travel question give response message 'Please ask travel related questions only' "+ userMessage}]);
    }, 600);
  };

  const handleQuickAction = (query) => {
    inputRef.current.value = query;
    setInputValue(query);
    // Auto-submit after a short delay
    setTimeout(() => {
      handleFormSubmit({ preventDefault: () => {} });
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    inputRef.current.value = suggestion;
    setInputValue(suggestion);
    inputRef.current.focus();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
    if (!isRecording) {
      // Start recording
      console.log("Starting voice recording...");
    } else {
      // Stop recording
      console.log("Stopping voice recording...");
    }
  };

  return (
    <motion.div 
      className='glass-effect rounded-2xl p-6 shadow-xl sticky bottom-0 z-10'
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Quick Actions Bar */}
      <AnimatePresence>
        {showSuggestions && chatHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Quick Travel Assistance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuickAction(action.query)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/80 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Form */}
      <form className='flex items-center gap-3' onSubmit={handleFormSubmit}>
        {/* Attachment Button */}
        <motion.button
          type="button"
          className='p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex-shrink-0'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Paperclip className="w-5 h-5" />
        </motion.button>

        {/* Input Field Container */}
        <div className="flex-1 relative min-w-0">
          <input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Ask me anything about Sri Lankan travel...'
            className='w-full px-6 py-4 bg-white/90 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500 pr-12'
          />
          
          {/* Input Actions */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-xs text-blue-500 font-medium mr-2"
                >
                  typing...
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Emoji Button */}
            <motion.button
              type="button"
              className='p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smile className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Voice Recording Button */}
        <motion.button
          type="button"
          onClick={toggleRecording}
          className={`p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
            isRecording 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isRecording ? { 
            scale: [1, 1.1, 1],
            boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"]
          } : {}}
          transition={isRecording ? { duration: 1, repeat: Infinity } : {}}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </motion.button>

        {/* Send Button */}
        <motion.button
          type='submit'
          disabled={!inputValue.trim()}
          className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0'
          whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
          whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>

      {/* Smart Suggestions */}
      <AnimatePresence>
        {showSuggestions && chatHistory.length > 0 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2">
              {[
                "Tell me more about this",
                "What are the costs?",
                "Best time to visit?",
                "How to get there?"
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white/80 text-gray-700 text-sm rounded-full hover:bg-white hover:shadow-md transition-all duration-200 flex-shrink-0"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestion Categories for New Users */}
      <AnimatePresence>
        {showSuggestions && chatHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 pt-4 border-t border-white/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestionCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  className="bg-white/60 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                    {category.icon}
                    {category.title}
                  </h4>
                  <div className="space-y-2">
                    {category.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
                        whileHover={{ x: 5 }}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording Indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center justify-center gap-3 p-4 bg-red-50 rounded-xl"
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-600 font-medium">Recording... Tap to stop</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-red-400 rounded-full"
                  animate={{ 
                    height: [4, 12, 4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default UseForm;