import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plane, 
  MessageCircle, 
  Settings, 
  Minimize2, 
  Maximize2, 
  Globe, 
  Compass,
  Eye,
  Mountain,
  Calendar,
  Train,
  Waves,
  Coffee
} from 'lucide-react';
import ChatBotIcon from './components/ChatBotIcon';
import SendingIcon from './components/SendingIcon';
import UseForm from './components/UseForm';
import ChatMessage from './components/ChatMessage';
import WeatherWidget from './components/WeatherWidget';
import DestinationCarousel from './components/DestinationCarousel';
import CulturalEvents from './components/CulturalEvents';
import CurrencyConverter from './components/CurrencyConverter';
import FoodRecommendations from './components/FoodRecommendations';
import TravelTipsWidget from './components/TravelTipsWidget';
import TrainScheduleWidget from './components/TrainScheduleWidget';
import TrekkingGuide from './components/TrekkingGuide';
import SurfingConditions from './components/SurfingConditions';
import TeaPlantationTours from './components/TeaPlantationTours';
import WildlifeSafaris from './components/WildlifeSafaris';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState('overview');
  const [activeExploreSection, setActiveExploreSection] = useState('destinations');
  const chatContainerRef = useRef(null);

  // Scroll to the latest message when chatHistory updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const generateChatBotResponse = async (history) => {
    const updateHistory = (text, imageUrl) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..." && msg.imageUrl !== "/icons/more.gif"), {role: "model", text, imageUrl}]);
    }

    // Enhanced response processing function
    const processResponse = (rawText) => {
      // Clean up HTML tags but preserve markdown-style formatting
      let cleanText = rawText.replace(/<[^>]*>/g, '').trim();
      
      // Improve formatting for better readability
      cleanText = cleanText
        // Ensure proper spacing after sections
        .replace(/([.!?])\s*([A-Z])/g, '$1\n\n$2')
        // Format bullet points consistently
        .replace(/[•·]/g, '•')
        // Ensure proper spacing around numbered lists
        .replace(/(\d+\.)\s*/g, '\n$1 ')
        // Clean up multiple newlines
        .replace(/\n{3,}/g, '\n\n')
        // Format headings (text followed by colon)
        .replace(/^([A-Z][^:]+:)/gm, '\n$1')
        .trim();
      
      return cleanText;
    };

    history = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: history
      })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message) || "Something went wrong";
      const rawResponseText = data.candidates[0].content.parts[0].text;
      const processedText = processResponse(rawResponseText);
      updateHistory(processedText);
    } catch(error) {
      console.log(error);
    }
  }

  const exploreSections = [
    { id: 'destinations', label: 'Destinations', icon: <MapPin className="w-4 h-4" /> },
    { id: 'wildlife', label: 'Wildlife', icon: <Eye className="w-4 h-4" /> },
    { id: 'trekking', label: 'Trekking', icon: <Mountain className="w-4 h-4" /> },
    { id: 'surfing', label: 'Surfing', icon: <Waves className="w-4 h-4" /> },
    { id: 'trains', label: 'Trains', icon: <Train className="w-4 h-4" /> },
    { id: 'tea', label: 'Tea Tours', icon: <Coffee className="w-4 h-4" /> }
  ];

  return (
    <div className="h-screen w-screen travel-bg overflow-hidden chat-container relative">
      {/* Enhanced Background with Sri Lankan Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Lotus Petals */}
        <motion.div 
          className="absolute top-20 left-20 w-16 h-16 opacity-20"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-6xl">🪷</div>
        </motion.div>
        
        {/* Floating Elephant */}
        <motion.div 
          className="absolute top-1/3 right-32 w-20 h-20 opacity-15"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-8xl">🐘</div>
        </motion.div>

        {/* Tea Leaves */}
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-12 h-12 opacity-25"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-4xl">🍃</div>
        </motion.div>

        {/* Traditional patterns */}
        <motion.div 
          className="absolute top-1/2 left-10 w-8 h-8 opacity-10"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <div className="text-3xl">🕸️</div>
        </motion.div>

        {/* Coconut palm */}
        <motion.div 
          className="absolute bottom-20 right-20 w-14 h-14 opacity-20"
          animate={{ 
            x: [0, 15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-5xl">🌴</div>
        </motion.div>

        {/* Abstract geometric shapes */}
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/5 to-emerald-500/5 rounded-full"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col min-h-0">
        {/* Enhanced Header */}
        <motion.header 
          className="glass-effect border-b border-white/20 px-6 py-4 shadow-xl backdrop-blur-xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
                  animate={{ 
                    boxShadow: [
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      "0 10px 15px -3px rgba(59, 130, 246, 0.4)",
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Plane className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                    CeylonGuide
                    <motion.span 
                      className="text-xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🇱🇰
                    </motion.span>
                  </h1>
                  <p className="text-black/90 text-sm flex items-center gap-1">
                    <span>Your AI-Powered Sri Lankan Travel Companion</span>
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      ✨
                    </motion.span>
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button 
                className="p-3 text-black/80 hover:text-black hover:bg-black/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
              </motion.button>
              <motion.button 
                className="p-3 text-black/80 hover:text-black hover:bg-black/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Enhanced Sidebar with New Features */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.aside 
                className="w-96 glass-effect border-r border-white/20 p-6 overflow-y-auto chat-scrollbar backdrop-blur-xl"
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Enhanced Sidebar Tabs */}
                <div className="flex gap-2 mb-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: <Globe className="w-4 h-4" /> },
                    { id: 'explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveSidebarTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all backdrop-blur-sm ${
                        activeSidebarTab === tab.id 
                          ? 'bg-white/20 text-black shadow-lg border border-white/30' 
                          : 'text-black/70 hover:bg-white/10 hover:text-gray-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab.icon}
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeSidebarTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <WeatherWidget />
                      <CurrencyConverter />
                      <CulturalEvents />
                      <TravelTipsWidget />
                    </motion.div>
                  )}

                  {activeSidebarTab === 'explore' && (
                    <motion.div
                      key="explore"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Explore Section Tabs */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {exploreSections.map((section) => (
                          <motion.button
                            key={section.id}
                            onClick={() => setActiveExploreSection(section.id)}
                            className={`flex items-center gap-2 p-3 rounded-lg text-xs font-medium transition-all ${
                              activeExploreSection === section.id 
                                ? 'bg-white/20 text-black border border-white/30' 
                                : 'text-black/70 hover:bg-black/10 hover:text-black'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {section.icon}
                            {section.label}
                          </motion.button>
                        ))}
                      </div>

                      {/* Dynamic Content Based on Selected Explore Section */}
                      <AnimatePresence mode="wait">
                        {activeExploreSection === 'destinations' && (
                          <motion.div
                            key="destinations"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <DestinationCarousel />
                            <div className="mt-4">
                              <FoodRecommendations />
                            </div>
                          </motion.div>
                        )}

                        {activeExploreSection === 'wildlife' && (
                          <motion.div
                            key="wildlife"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <WildlifeSafaris />
                          </motion.div>
                        )}

                        {activeExploreSection === 'trekking' && (
                          <motion.div
                            key="trekking"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <TrekkingGuide />
                          </motion.div>
                        )}

                        {activeExploreSection === 'surfing' && (
                          <motion.div
                            key="surfing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <SurfingConditions />
                          </motion.div>
                        )}

                        {activeExploreSection === 'trains' && (
                          <motion.div
                            key="trains"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <TrainScheduleWidget />
                          </motion.div>
                        )}

                        {activeExploreSection === 'tea' && (
                          <motion.div
                            key="tea"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <TeaPlantationTours />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <motion.div 
              className="flex-1 flex flex-col min-h-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Chat Messages Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto chat-scrollbar p-6 space-y-4 min-h-0 chat-messages"
              >
                {/* Enhanced Welcome Message */}
                <motion.div 
                  className="max-w-4xl mx-auto"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl"
                      animate={{ 
                        boxShadow: [
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <MessageCircle className="w-7 h-7 text-black" />
                    </motion.div>
                    <div className="glass-effect rounded-2xl rounded-tl-sm p-8 max-w-3xl shadow-xl border border-white/20 backdrop-blur-xl">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                          Welcome to TravelBot AI! 🇱🇰
                          <motion.span
                            className="inline-block"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          >
                            ✨
                          </motion.span>
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-700 text-sm font-medium">Online & Ready</span>
                          </div>
                          <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                            <span className="text-blue-700 text-sm font-medium">AI-Powered</span>
                          </div>
                          <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                            <span className="text-purple-700 text-sm font-medium">Sri Lanka Expert</span>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          I'm your advanced AI travel companion specialized in Sri Lankan tourism! Explore our comprehensive sidebar with real-time weather, train schedules, wildlife safari info, trekking guides, surfing conditions, and tea plantation tours.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                              <span className="text-blue-500">🏖️</span>
                              Comprehensive Travel Info
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Live wildlife safari schedules & conditions
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Real-time train schedules & routes
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Surfing conditions & weather reports
                              </li>
                            </ul>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                              <span className="text-purple-500">🎯</span>
                              Interactive Features
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                Tea plantation tours & tastings
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                Mountain trekking guides & tips
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                Cultural events & local experiences
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <motion.div 
                          className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-400"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 }}
                        >
                          <p className="text-gray-700 font-medium text-center">
                            💡 Explore the sidebar for live info, or ask me: "Plan a wildlife safari to Yala" or "Show me train routes to Ella"
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Chat History */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <AnimatePresence>
                    {chatHistory.map((chat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ChatMessage chat={chat} index={index} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Input Form */}
            <motion.div 
              className="flex-shrink-0 border-t border-white/20 bg-white/10 backdrop-blur-xl p-6 chat-input shadow-2xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="max-w-4xl mx-auto">
                <UseForm 
                  chatHistory={chatHistory} 
                  setChatHistory={setChatHistory} 
                  generateChatBotResponse={generateChatBotResponse} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
