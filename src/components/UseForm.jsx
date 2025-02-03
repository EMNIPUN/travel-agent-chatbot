import React, { useRef } from 'react'

function UseForm({ setChatHistory, generateChatBotResponse, chatHistory }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = '';

    // Add user message to chat history
    setChatHistory((history) => [...history, { 
      role: "user", 
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setTimeout(() => {
      const thinkingMessage = {
        role: "model",
        text: "Thinking...", 
        imageUrl: "/icons/more.gif",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory((history) => [...history, thinkingMessage]);
      generateChatBotResponse([...chatHistory, { 
        role: "user", 
        text: `You are TravelAI, a professional Sri Lankan travel consultant. Please provide expert guidance on travel, destinations, transportation, and accommodations. For non-travel queries, respond with 'I specialize in travel-related inquiries only.' Query: ${userMessage}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200">
      <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me about traveling in Sri Lanka..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg pr-10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1.5"
            title="Attach file"
          >
            <i className="fas fa-paperclip"></i>
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            title="Voice input"
          >
            <i className="fas fa-microphone"></i>
          </button>
          
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <span>Send</span>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UseForm;