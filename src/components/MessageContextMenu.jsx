import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Download, 
  Edit3, 
  Trash2, 
  Flag, 
  ExternalLink 
} from 'lucide-react';

const MessageContextMenu = ({ isVisible, position, onClose, messageType, onAction }) => {
  const menuItems = [
    { 
      icon: <MessageSquare className="w-4 h-4" />, 
      label: 'Reply', 
      action: 'reply',
      show: messageType === 'bot'
    },
    { 
      icon: <Download className="w-4 h-4" />, 
      label: 'Save', 
      action: 'save',
      show: true
    },
    { 
      icon: <Edit3 className="w-4 h-4" />, 
      label: 'Edit', 
      action: 'edit',
      show: messageType === 'user'
    },
    { 
      icon: <ExternalLink className="w-4 h-4" />, 
      label: 'Share', 
      action: 'share',
      show: true
    },
    { 
      icon: <Flag className="w-4 h-4" />, 
      label: 'Report', 
      action: 'report',
      show: messageType === 'bot'
    },
    { 
      icon: <Trash2 className="w-4 h-4" />, 
      label: 'Delete', 
      action: 'delete',
      show: messageType === 'user',
      danger: true
    }
  ].filter(item => item.show);

  const handleAction = (action) => {
    onAction(action);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -10 }}
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-32"
        style={{ 
          left: position.x, 
          top: position.y,
          transform: 'translate(-50%, -100%)'
        }}
      >
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleAction(item.action)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors ${
              item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
            }`}
            whileHover={{ x: 2 }}
          >
            {item.icon}
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageContextMenu;
