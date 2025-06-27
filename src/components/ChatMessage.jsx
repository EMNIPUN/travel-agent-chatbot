import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  User, 
  Loader2, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  MoreVertical,
  MapPin,
  Clock,
  Star,
  CheckCheck
} from 'lucide-react';

function ChatMessage({ chat, index }) {
  const isUser = chat.role === "user";
  const isThinking = chat.text === "Thinking..." || chat.imageUrl;
  const [showActions, setShowActions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Format message text with better parsing
  const formatMessage = (text) => {
    if (!text) return text;
    
    // Split into paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Handle bullet points
      if (paragraph.includes('•') || paragraph.includes('-')) {
        const lines = paragraph.split('\n');
        return (
          <div key={pIndex} className="space-y-1">
            {lines.map((line, lIndex) => {
              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return (
                  <div key={lIndex} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{line.replace(/^[•-]\s*/, '')}</span>
                  </div>
                );
              }
              return <p key={lIndex} className="mb-2">{line}</p>;
            })}
          </div>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(paragraph.trim())) {
        const lines = paragraph.split('\n');
        return (
          <ol key={pIndex} className="list-decimal list-inside space-y-1">
            {lines.map((line, lIndex) => (
              <li key={lIndex}>{line.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        );
      }
      
      // Regular paragraph
      return <p key={pIndex} className="mb-3 last:mb-0">{paragraph}</p>;
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chat.text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

  return (
    <motion.div 
      className={`flex items-start gap-4 ${isUser ? "justify-end" : "justify-start"} group`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
    >
      {/* Avatar for bot messages */}
      {!isUser && (
        <motion.div 
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2 + index * 0.1, 
            type: "spring", 
            stiffness: 300,
            damping: 20
          }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.div>
      )}

      {/* Message Content */}
      <div className={`max-w-4xl ${isUser ? "order-first" : ""} relative`}>
        {isThinking ? (
          // Enhanced Thinking indicator
          <motion.div 
            className="glass-effect rounded-2xl rounded-tl-sm px-6 py-4 flex items-center gap-3 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-5 h-5 text-blue-500" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-gray-700 font-medium">TravelBot is thinking...</span>
              <span className="text-gray-500 text-sm">Searching for the best travel advice</span>
            </div>
            <motion.div 
              className="flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className={`relative px-6 py-5 rounded-2xl shadow-lg ${
              isUser 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-sm" 
                : "glass-effect text-gray-800 rounded-tl-sm border border-white/20"
            }`}
            initial={{ scale: 0.8, opacity: 0, x: isUser ? 20 : -20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.01, y: -2 }}
          >
            {/* Message Status Indicator for User */}
            {isUser && (
              <motion.div 
                className="absolute -bottom-1 -right-1 bg-white/20 rounded-full p-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <CheckCheck className="w-3 h-3 text-white/80" />
              </motion.div>
            )}

            {/* Bot Message Header */}
            {!isUser && (
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/50">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">TravelBot AI</span>
                  <motion.div
                    className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </motion.div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            )}

            {/* Message Content */}
            <div className="break-words leading-relaxed whitespace-pre-wrap">
              {formatMessage(chat.text)}
            </div>

            {/* Travel-specific enhancements for bot messages */}
            {!isUser && chat.text && chat.text.length > 50 && (
              <motion.div 
                className="mt-4 pt-3 border-t border-gray-200/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Sri Lanka</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Verified Info</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* User Message Timestamp */}
            {isUser && (
              <div className="mt-3 text-xs text-white/70 text-right">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </motion.div>
        )}

        {/* Message Actions */}
        <AnimatePresence>
          {showActions && !isThinking && (
            <motion.div 
              className={`absolute -bottom-2 ${isUser ? 'left-0' : 'right-0'} flex items-center gap-1 bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1`}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {!isUser && (
                <>
                  <motion.button
                    onClick={handleLike}
                    className={`p-1.5 rounded-full transition-colors ${
                      isLiked ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    onClick={handleDislike}
                    className={`p-1.5 rounded-full transition-colors ${
                      isDisliked ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </motion.button>
                </>
              )}
              
              <motion.button
                onClick={handleCopy}
                className={`p-1.5 rounded-full transition-colors ${
                  isCopied ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className="w-3 h-3" />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-3 h-3" />
              </motion.button>
              
              <motion.button
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical className="w-3 h-3" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copy Feedback */}
        <AnimatePresence>
          {isCopied && (
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar for user messages */}
      {isUser && (
        <motion.div 
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2 + index * 0.1, 
            type: "spring", 
            stiffness: 300,
            damping: 20
          }}
        >
          <User className="w-6 h-6 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default ChatMessage;