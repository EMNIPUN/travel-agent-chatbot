import React from 'react';

function ChatMessage({ chat }) {
  const isUser = chat.role === "user";
  const isThinking = chat.text === "Thinking...";

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center
          ${isUser ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-emerald-600 to-emerald-700'}`}>
          {isUser ? (
            <i className="fas fa-user text-white text-sm"></i>
          ) : (
            <i className="fas fa-robot text-white text-sm"></i>
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Sender Name */}
          <span className="text-xs text-gray-500 mb-1">
            {isUser ? 'You' : 'TravelBot'}
          </span>

          {/* Message Bubble */}
          <div className={`relative px-4 py-3 rounded-2xl 
            ${isUser 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
              : 'bg-white border border-gray-200 text-gray-700 shadow-sm'
            }
            ${isThinking ? 'min-w-[100px]' : ''}
          `}>
            {/* Thinking Animation */}
            {isThinking ? (
              <div className="flex gap-1 justify-center items-center h-5">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{chat.text}</p>
            )}

            {/* Message Tail */}
            <div className={`absolute top-4 ${isUser ? '-right-2' : '-left-2'} 
              w-4 h-4 transform rotate-45
              ${isUser 
                ? 'bg-blue-600' 
                : 'bg-white border-l border-t border-gray-200'
              }`}>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">
              {chat.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isUser && (
              <i className="fas fa-check-double text-xs text-blue-500"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;